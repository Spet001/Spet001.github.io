# How to Optimize a Three.js Scene for 120+ FPS

Building a rich 3D WebGL background in **Three.js** — complete with procedural shaders, orbital physics, asteroid fields, interactive companions, and particle trails — looks effortless when tested in isolation on a blank page at 60Hz.

However, once you embed that same `<canvas>` underneath a full-featured **React Single-Page Application (SPA)** with glassmorphism cards, animated project previews, custom cursors, and scroll-driven UI on a **165Hz gaming monitor (NVIDIA RTX 30+ Series)**, reality hits hard:
- **CPU usage spikes up to 50%.**
- **Frame rates swing wildly between 22 FPS and 200 FPS.**
- **Fast mouse sweeps (1000Hz polling) drag the framerate down to ~85 FPS.**
- **Scrolling past media cards tanks the framerate to ~22 FPS.**

In this engineering breakdown, we will walk through the exact profiling methodology and low-level optimizations used on **spet01.dev** to eliminate CPU/GPU bottlenecks, resolve Windows DWM / Chromium compositor contention, and lock our Three.js scenes (`Space 2.0` & `Sky 2.0`) at a stable **100–165 FPS**.

---

## Step 0: Measure First — Building a 1% Low FPS Telemetry HUD

Before touching a single shader or React component, you need a way to correlate **exact user interactions** with **instantaneous frame time spikes**. Standard browser DevTools performance recordings often add their own instrumentation overhead.

To profile in production conditions, I added a live **`fps` command** to the site's interactive CLI terminal (`Ctrl + K`). Using a lock-free ring buffer of the last 120 `requestAnimationFrame` deltas, the HUD calculates:
- **Current FPS** & **Frame Time (`ms`)**
- **1% Low FPS** (the worst 1% of frame times over the rolling window — the true indicator of micro-stuttering)

```javascript
// Rolling 120-frame ring buffer for 1% Low FPS & Frame Time telemetry
const frameTimes = new Float64Array(120);
let frameIdx = 0;
let frameCount = 0;
let lastFrameTime = performance.now();

function sampleFrame(now) {
    const dt = now - lastFrameTime;
    lastFrameTime = now;
    if (dt > 0 && dt < 500) {
        frameTimes[frameIdx] = dt;
        frameIdx = (frameIdx + 1) % 120;
        if (frameCount < 120) frameCount++;
    }
    // Sort active samples descending to extract the 99th percentile worst frame time
    const sorted = Array.from(frameTimes.subarray(0, frameCount)).sort((a, b) => b - a);
    const worstFrameMs = sorted[Math.max(0, Math.floor(frameCount * 0.05))];
    const onePercentLowFps = Math.round(1000 / worstFrameMs);
}
```

With the HUD running on a **165Hz monitor + NVIDIA RTX 30+ Series**, the initial baseline revealed four distinct regimes:

| Interaction State | Observed FPS | Primary Bottleneck |
| :--- | :--- | :--- |
| **Idle (No Input)** | `~165 FPS` (unstable) | CPU particle loops & GC pauses |
| **Slow Mouse Movement** | `~160 FPS` | Minor cursor DOM updates |
| **Rapid Continuous Mouse Sweep (1000Hz)** | **Drops to `~85 FPS`** | Unthrottled `mousemove` layout & React hover state |
| **Scrolling Over Media Cards** | **Drops to `~22 FPS`** | `backdrop-filter` Kawase blur + D3D11 `<video>` SwapChain mutex stalls |

Let's fix every single one of these bottlenecks from the GPU pipeline up to the browser compositor.

---

## Part 1: Moving Particle Physics from the CPU to GLSL Vertex Shaders

### The Problem: Per-Frame `Float32Array` Uploads Over PCIe
A common Three.js anti-pattern for rain, snow, starfields, or thruster plumes is iterating over a `Float32Array` of vertex positions in JavaScript every frame and setting `geometry.attributes.position.needsUpdate = true`:

```javascript
// ❌ ANTI-PATTERN: 900 particles × 165 FPS = 148,500 CPU iterations/sec + 165 PCIe buffer uploads/sec
const pos = rainGeometry.attributes.position.array;
for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3 + 1] -= velocities[i] * dt;
    if (pos[i * 3 + 1] < -halfHeight) pos[i * 3 + 1] = halfHeight;
}
rainGeometry.attributes.position.needsUpdate = true; // Calls gl.bufferSubData() every frame!
```

At 165Hz, mutating vertex arrays on the V8 main thread and issuing `gl.bufferSubData()` across the PCIe bus every 6 milliseconds wastes huge amounts of CPU time and stalls the WebGL command queue.

### The Fix: Stateless Procedural GLSL Vertex Shaders (`STATIC_DRAW`)
If a particle follows a deterministic trajectory (falling rain, drifting stars, swaying clouds), **the CPU should never touch its position after initialization**.

Instead, upload the initial position (`position`), velocity (`aSpeed`), and phase offset (`aPhase`) **once** as static `THREE.BufferAttribute` streams, and pass a single `uniform float uTime` per frame. The GPU's vertex processors calculate the wrapping position in parallel using `mod()`:

```glsl
// ✅ GPU-DRIVEN VERTEX SHADER: Zero CPU loops, zero PCIe buffer uploads per frame
uniform float uTime;
uniform float uBoxHeight;
uniform float uWindX;

attribute float aSpeed;
attribute float aPhase;

void main() {
    vec3 pos = position;

    // Deterministic vertical wrapping on the GPU
    float fallDist = uTime * aSpeed + aPhase;
    pos.y = (uBoxHeight * 0.5) - mod(fallDist, uBoxHeight);

    // Wind drift with horizontal wrap
    pos.x += sin(uTime * 0.7 + aPhase) * uWindX;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = clamp(180.0 / -mvPosition.z, 1.5, 6.0);
    gl_Position = projectionMatrix * mvPosition;
}
```

Now your JavaScript render loop for 1,000+ particles is reduced to **one single line**:
```javascript
rainMaterial.uniforms.uTime.value = elapsedTime;
```

---

## Part 2: Zero-Allocation Particle Pools & `THREE.InstancedMesh`

### 1. Eliminating Garbage Collection Spikes on Interactive Trails
When the user moves the rocket cursor across the screen, it emits a continuous trail of fire and smoke particles. Originally, spawning a trail particle allocated a `new THREE.Mesh()`, appended it to the `THREE.Scene`, and called `scene.remove()` + `material.dispose()` when its alpha reached zero.

Moving the mouse rapidly for 3 seconds allocated and destroyed **hundreds of Three.js objects**, triggering V8 Major GC sweeps and WebGL uniform/program re-validation right in the middle of mouse movement.

**The Solution:** Pre-allocate a fixed-size **Ring Buffer** inside a single `THREE.Points` geometry (`MAX_PARTICLES = 180`) at startup:
- Every particle slot is initialized with `alpha = 0.0` (discarded in the fragment shader via `if (vAlpha <= 0.01) discard;`).
- Spawning a particle simply overwrites the current `writeCursor = (writeCursor + 1) % MAX_PARTICLES` index in pre-allocated `Float32Array` buffers.
- **Zero `new` allocations, zero `scene.add()`, zero `.dispose()`, and 1 single draw call** regardless of how fast the mouse moves.

### 2. Merging Asteroid Fields into `THREE.InstancedMesh`
Each `gl.drawElements()` call in WebGL carries driver validation overhead in ANGLE (Chromium's OpenGL-to-D3D11 translation layer). Rendering 28 individual asteroids with unique positions, rotations, scales, and colors as separate `THREE.Mesh` objects issues 28 draw calls per frame.

By packing all asteroids into a single `THREE.InstancedMesh(sharedGeo, sharedMat, ASTEROID_COUNT)` and updating a `THREE.Matrix4` dummy object per instance via `instancedMesh.setMatrixAt(i, dummy.matrix)`, all 28 asteroids render in **1 single instanced draw call** (`gl.drawElementsInstancedANGLE`).

---

## Part 3: The Surprising Culprit — Why `<video>` & Animated GIFs Tank WebGL FPS

After optimizing the Three.js scene itself, our `fps` HUD revealed something shocking:
> **Whenever the project cards containing animated previews ("optimized GIFs" / `<video>`) scrolled into the viewport, the framerate plummeted from 165 FPS down to ~22–45 FPS.**

Why would a tiny 400×208 animation inside a DOM card cripple an NVIDIA RTX 30+ Series GPU running Three.js?

### Why Animated GIFs & Animated WebPs Burn 30–50% CPU
Browsers do **not** hardware-accelerate animated `.gif` or animated `.webp` decoding on the GPU. Every time an animated GIF/WebP advances a frame (10–30 times per second):
1. Chromium's Blink image decoder decompresses the full frame on a **CPU worker thread**.
2. The compositor invalidates the affected DOM tile and uploads a new bitmap texture to the GPU, dirtying any overlapping glassmorphism layers.

### Why HTML5 `<video>` (`.mp4`) Inside Rounded Cards Stalls WebGL (`CrGpuMain`)
The standard web performance advice is *"replace GIFs with `<video autoplay loop muted playsinline>`"*. While `<video>` uses hardware decoding (`D3D11VideoDecoder`), it triggers a severe GPU thread bottleneck on Windows 10/11 when combined with a full-screen WebGL `<canvas>` at 165Hz:

1. **DirectComposition & MPO Overlay Failure:** On Windows, Chromium tries to promote `<video>` elements to hardware **MPO (Multiplane Overlays)** so the display controller composites the video directly without touching the 3D engine. However, because our `<video>` lives inside a project card with `border-radius: 16px; overflow: hidden` (`rounded-2xl`) and a semi-transparent gradient overlay (`bg-gradient-to-t`), **Windows DWM cannot use hardware MPO overlays**.
2. **`DXGIKeyedMutex` Contention on `CrGpuMain`:** Because MPO fails, Chromium's GPU process (`CrGpuMain`) must composite the decoded NV12 video frame into the main Direct3D 11 render target. Every video tick, `CrGpuMain` acquires a **`DXGIKeyedMutex`** shared with ANGLE's D3D11 device, executes an NV12-to-RGB pixel shader, and applies a Skia **`SkRRect` rounded-corner alpha mask**.
3. **VSync Cadence Throttling:** Having multiple active `IDXGISwapChain1` video surfaces alongside an uncapped 165Hz WebGL SwapChain causes DWM / G-Sync cadence arbitration to stall `CrGpuMain`, dragging the entire browser tab down!

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ❌ HTML5 <video> inside rounded-2xl card over 165Hz WebGL Canvas           │
├────────────────────────────────────────────────────────────────────────────┤
│ MediaFoundation D3D11VideoDecoder ──► IDXGISwapChain1 (NV12)               │
│                                            │                               │
│   (MPO Overlay blocked by border-radius & gradient overlay!)               │
│                                            ▼                               │
│ CrGpuMain: Acquire DXGIKeyedMutex ──► NV12-to-RGB Shader ──► SkRRect Mask  │
│                    ▲                                                       │
│                    └── STALLS Three.js WebGL ANGLE D3D11 Context!          │
└────────────────────────────────────────────────────────────────────────────┘
```

### The Ultimate Solution: Pre-Cropped GPU `translate3d` Sprite Sheets

How do game engines display animated UI previews without video decoders or CPU GIF decoders? **Texture Atlases (Sprite Sheets)!**

Using `ffmpeg`, we pre-rendered our 5-second `.mp4` card previews into static **5×10 and 5×12 JPEG Sprite Sheets**, pre-cropped to the exact `400×208` aspect ratio of the project cards:

```bash
# Convert a 5s MP4 preview into a 5x10 GPU Sprite Sheet (2000x2080 JPEG, ~690 KB)
ffmpeg -y -i "spet01.dev.mp4" \
  -vf "fps=10,scale=400:208:force_original_aspect_ratio=increase,crop=400:208,tile=5x10" \
  -frames:v 1 -q:v 4 "spet01_sprite.jpg"
```

Then, inside React, we replace `<video>` with an `overflow-hidden` viewport containing an `<img>` scaled to `cols * 100%` by `rows * 100%`, and step frames using **`transform: translate3d(-X%, -Y%, 0)`** directly on the DOM `ref`:

```javascript
// ✅ ZERO-OVERHEAD GPU SPRITE SHEET STEPPER
const stepFrame = () => {
    if (!isVisible || document.hidden) return;
    // Pause sprite stepping during active scrolling to dedicate 100% budget to 165Hz scroll
    if (performance.now() - lastGlobalScrollTime < 140) return;

    frame = (frame + 1) % sprite.frames;
    const col = frame % sprite.cols;
    const row = Math.floor(frame / sprite.cols);

    // Pure GPU compositor transform: 0 Layout, 0 Paint, 0 Tile Re-Rasterization
    img.style.transform = `translate3d(-${col * (100 / sprite.cols)}%, -${row * (100 / sprite.rows)}%, 0)`;
};
```

Why is this so fast?
- **Decoded Once:** `img.decode()` uploads the static JPEG into a GPU texture **once** on page load (**0% ongoing CPU decoding**).
- **Zero Video SwapChains:** No `MediaFoundation` decoder, no `DXGIKeyedMutex` lock, and no NV12 conversion stalling WebGL.
- **Zero Paint / Tile Invalidation:** Updating `transform: translate3d(...)` on a promoted layer is handled purely by Chromium's compositor thread by shifting UV coordinates of an existing quad.

---

## Part 4: Compositor Fill-Rate (`backdrop-filter`) & 1000Hz Mouse Coalescing

### 1. Removing `backdrop-filter: blur()` Over Full-Screen WebGL
Glassmorphism (`backdrop-filter: blur(16px)`) looks great on static backgrounds. Over a live 165Hz WebGL canvas, however, **every single DOM element with `backdrop-filter`** forces the browser compositor to:
1. Read back the underlying WebGL framebuffer region (`glCopyTexSubImage2D`).
2. Downsample and execute a multi-pass **Dual-Kawase Gaussian Blur shader** on every frame.

When scrolling past 15 project cards with `backdrop-filter: blur(16px)` and `border-radius: 16px`, the GPU performs **15×2 = 30 extra full-tile blur passes per frame** (`4,950 blur passes per second` at 165Hz!).

Replacing `backdrop-filter: blur(16px)` on scrolling cards with a high-opacity dark tint (`rgba(12, 18, 30, 0.92)`) paired with a crisp specular inner border (`inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`) looks virtually identical over a dark space scene while cutting scroll GPU fill-rate by **over 70%**.

### 2. Releasing Animation `RenderSurface` Layers (`backwards` vs. `both`)
Our project cards used a fade-in keyframe animation:
```css
/* ❌ Leaving fill-mode: both keeps a permanent 3D transform & RenderSurface on all 15 cards! */
.project-card-animate {
    animation: cardFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```
When a CSS keyframe ends at `transform: translateY(0) scale(1)` with `animation-fill-mode: both`, Chromium retains an active `cc::RenderSurfaceImpl` backing texture for every card forever. Changing the final keyframe to `transform: none` and `animation-fill-mode: backwards` frees those compositor surfaces immediately after the 320ms intro finishes.

### 3. Coalescing 1000Hz Gaming Mouse Input into `requestAnimationFrame`
Modern gaming mice poll at **1000Hz to 4000Hz**. In Chromium, raw `mousemove` handlers can fire hundreds of times per second.
1. **Custom Cursor:** Updating `cursor.style.left` / `cursor.style.top` and calling `e.target.closest('a, button')` inside `mousemove` dirties DOM styles and runs selector traversal 1,000 times per second. Coalescing cursor updates into a single `requestAnimationFrame` callback using `cursor.style.transform = translate3d(${x}px, ${y}px, 0)` caps work to once per monitor refresh.
2. **Hover Tooltips (`useState` vs. CSS `group-hover`):** Sweeping the mouse rapidly across project tag badges previously triggered `onMouseEnter={() => setIsHovered(true)}`. Because the site uses runtime Tailwind CSS, mounting/unmounting tooltip nodes in React triggered Tailwind's `MutationObserver` on the entire DOM tree! Replacing React hover state with pure CSS `group-hover/tags:opacity-100` eliminated all React re-renders during mouse sweeps.

### 4. Downscaling 3K Card Thumbnails (VRAM Budgeting)
Several project card thumbnails (`400×200` CSS pixels on screen) were originally 3K AI-upscaled images (`2752×1536`, ~2.5 MB each). Even when compressed on disk, a `2752×1536` image requires **16.9 MB of uncompressed RGBA8 VRAM** (+33% for mipmaps) when uploaded to a GPU tile! Downscaling card thumbnails to `960p` reduced per-card texture memory by **88%** and eliminated tile-upload stutters when scrolling fast.

---

## Final Results (NVIDIA RTX 30+ Series @ 165Hz)

| Metric / Scenario | Before Optimization | After Optimization |
| :--- | :--- | :--- |
| **Idle Framerate** | `30–200 FPS` (unstable) | **`140–165 FPS` (locked)** |
| **Fast 1000Hz Mouse Sweep** | `~85 FPS` | **`120–160 FPS`** |
| **Scrolling Past Animated Cards** | `~22 FPS` | **`100–145+ FPS`** |
| **Card Preview CPU Decode Overhead** | `30–50% CPU` (GIF / Video mutex) | **`0% CPU` (Static GPU Sprite Sheet)** |
| **Card Thumbnail VRAM Footprint** | `~135 MB` uncompressed RGBA8 | **`~16 MB` uncompressed RGBA8 (-88%)** |

Want to test the live telemetry yourself right now? Press **`Ctrl + K`** (or click the **CLI** button in the top navigation bar), type **`fps`**, and watch the real-time frame time and 1% Low counter in the top-right corner as you fly through the scene!
