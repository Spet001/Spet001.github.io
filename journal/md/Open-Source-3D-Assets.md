# Open Source 3D Assets! (Low Poly & Game Models)

> **License & Public Release Notice:**
> All 3D assets showcased and used in this portfolio — from the low-poly space simulation to game prototypes like *Atirei o Pau no Gato* — are now **100% Open Source and Free to Use**.
> You can download the `.glb` / `.gltf` files directly, import them into **Blender, Unity, Unreal Engine 5, Godot, or Three.js**, and use them in your games, web experiments, or hobby projects with zero restrictions.

---

## 🎮 Interactive 3D Model Gallery & Inspector

Use your mouse or touch to rotate, pan, and zoom any model below. You can inspect the geometry and download the raw `.glb` files directly.

<div class="interactive-model-gallery" style="margin: 2rem 0; padding: 1.5rem; background: rgba(5, 5, 5, 0.7); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 1rem; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
<div style="height: 420px; width: 100%; position: relative; border-radius: 0.75rem; overflow: hidden; background: radial-gradient(circle at center, rgba(0, 170, 255, 0.08) 0%, rgba(0,0,0,0.6) 80%);">
<model-viewer id="journal-model-viewer" src="/3d/jet.glb" alt="3D Open Source Model Preview" auto-rotate camera-controls shadow-intensity="1.2" exposure="1.2" style="width: 100%; height: 100%; background: transparent;"></model-viewer>
</div>
<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;" id="journal-model-buttons">
<button data-model-src="/3d/jet.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/jet.glb'; document.getElementById('journal-model-download').href='/3d/jet.glb'; document.getElementById('journal-model-download').setAttribute('download', 'jet.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(0,170,255,0.15); border: 1px solid rgba(0,170,255,0.4); color: #00aaff; cursor: pointer;">🚀 Jet</button>
<button data-model-src="/3d/Astronaut.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/Astronaut.glb'; document.getElementById('journal-model-download').href='/3d/Astronaut.glb'; document.getElementById('journal-model-download').setAttribute('download', 'Astronaut.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">👨‍🚀 Astronaut</button>
<button data-model-src="/3d/rocket.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/rocket.glb'; document.getElementById('journal-model-download').href='/3d/rocket.glb'; document.getElementById('journal-model-download').setAttribute('download', 'rocket.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">🛰️ Rocket</button>
<button data-model-src="/3d/Paratrooper.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/Paratrooper.glb'; document.getElementById('journal-model-download').href='/3d/Paratrooper.glb'; document.getElementById('journal-model-download').setAttribute('download', 'Paratrooper.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">🪂 Paratrooper</button>
<button data-model-src="/3d/space_chicken!.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/space_chicken!.glb'; document.getElementById('journal-model-download').href='/3d/space_chicken!.glb'; document.getElementById('journal-model-download').setAttribute('download', 'space_chicken.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">🐔 Space Chicken</button>
<button data-model-src="/3d/jailson.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/jailson.glb'; document.getElementById('journal-model-download').href='/3d/jailson.glb'; document.getElementById('journal-model-download').setAttribute('download', 'jailson.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,165,0,0.15); border: 1px solid rgba(255,165,0,0.4); color: #ffa500; cursor: pointer;">🍊 Jailson Mendes</button>
<button data-model-src="/3d/orange.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/orange.glb'; document.getElementById('journal-model-download').href='/3d/orange.glb'; document.getElementById('journal-model-download').setAttribute('download', 'orange.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,120,0,0.15); border: 1px solid rgba(255,120,0,0.4); color: #ff7800; cursor: pointer;">🍊 Cosmic Orange</button>
<button data-model-src="/3d/cop.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/cop.glb'; document.getElementById('journal-model-download').href='/3d/cop.glb'; document.getElementById('journal-model-download').setAttribute('download', 'cop.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">👮 Cop (Pau no Gato)</button>
<button data-model-src="/3d/moon_test.glb" onclick="document.getElementById('journal-model-viewer').src='/3d/moon_test.glb'; document.getElementById('journal-model-download').href='/3d/moon_test.glb'; document.getElementById('journal-model-download').setAttribute('download', 'moon_test.glb');" style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; cursor: pointer;">🌕 Test Moon (RuTracker)</button>
</div>
<div style="margin-top: 1rem; text-align: center;">
<a id="journal-model-download" href="/3d/jet.glb" download="jet.glb" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.4rem; background: #059669; color: #ffffff; text-decoration: none; border-radius: 0.5rem; font-size: 0.8rem; font-weight: 700; transition: background 0.2s;">📥 Download Selected .GLB Asset</a>
</div>
</div>

---

## 🛠️ The Story Behind the Assets

When building custom browser engines, interactive portfolios, and experimental physics prototypes, commercial 3D assets are often **over-engineered, excessively high-poly, or bogged down by restrictive licensing**. 

WebGL in particular is notoriously sensitive to heavy geometries and multiple PBR texture passes. Loading multiple 100MB meshes causes dropped frames, memory spikes, and stuttering. Every model in this collection was crafted or tailored specifically for **maximum visual style with microscopic performance cost**.

Here is the origin story of each asset in the collection:

### 1. 🌕 The Test Moon (`moon_test.glb`) vs. The Weird Russian Site (RuTracker)
Before the current high-detail lunar surface model was added to the *Space 2.0* theme, I needed a lightweight celestial sphere to test orbital mechanics, lighting reflection vectors, and camera depth.

That first test model is **`moon_test.glb`** — an unpretentious, clean low-poly lunar sphere.

Later on, while hunting for a more realistic lunar topology map that wouldn't crash browser WebGL contexts, I ended up down a deep internet rabbit hole on a bizarre Russian forum / torrent tracker (**RuTracker**). Among obscure archive threads from 2008, I found an authorless, raw topographic moon mesh that had the exact crater density I wanted! The footer of this portfolio still jokingly attributes the moon to: *"Moon by Unknown (Downloaded from a mysterious Russian site)"*. Both models are preserved here for modders and developers!

---

### 2. 🍊 The Legendary Jailson Mendes (`jailson.glb`)
An unmistakable icon of Brazilian internet meme culture. Immortalized in low-poly 3D geometry:

- **Origin**: Created as a funny experimental model and now featured as the central character in the hidden **`DELICIA`** CLI Easter Egg!
- **Cosmic Presence**: When you type `delicia` in the interactive SpetTerm console (`Ctrl+K`), the moon is swapped for Jailson, and the surrounding asteroid field transforms completely into tumbling **3D Cosmic Oranges** (`orange.glb`) in deep space (*"Ai que delícia, cara!"*).
- **Specs**: Clean quad topology, retro flat-shaded colors, zero external texture dependencies.

---

### 3. 👮 The Cop (`cop.glb`) from *Atirei o Pau no Gato*
This character model was used in my Unreal Engine 5 FPS (First-Person Shooter) game, ***Atirei o Pau no Gato***, created for **GameJam+ 25/26**:

- **Context**: An intentionally generic low-poly policeman model (not Brazilian — just the classic archetypal arcade cop) featured as one of the humorous adversaries in the chaotic jam shooter.
- **Topology & Rig**: Clean low-poly vertex layout (1.84 MB) optimized for real-time skeletal mesh animation, low draw call overhead, and ragdoll physics in Unreal Engine 5.

---

### 4. 🐔 The Celestial Space Chicken (`space_chicken!.glb`)
What happens when cosmic asteroid fields get too boring? You turn them into chickens.

- **Origin**: Modeled for the **`chicken!`** Easter Egg command in SpetTerm.
- **The "MORE" Command**: When you invoke poultry overload in the terminal, this exact model scales up into a colossal 45-unit **Spinning Chicken Moon** that warps lunar gravity.
- **Style**: Cute, chunky, low-poly poultry with distinct beak, comb, and wing geometry.

---

### 5. 🚀 Supersonic Jet, Astronaut, Rocket & Paratrooper
The core fleet powering the interactive hero simulation:

- **Jet (`jet.glb`)**: A sleek aerodynamic fighter jet with twin engine exhaust ports that emit particle physics trails following your cursor. Its texture map is intentionally composed of simple shades of gray (grayscale) to keep file size and GPU texture memory usage microscopic while looking sharp under dynamic Three.js lighting.
- **Astronaut (`Astronaut.glb`)**: The iconic explorer tethered by a spring physics rope, piloted in real-time via `Arrow Keys` or `W/A/S/D`.
- **Rocket (`rocket.glb`)**: A standard, classic rocket ship. Just like the jet, its texture is composed purely of shades of gray (grayscale) to keep memory overhead to an absolute minimum and prevent WebGL shader stalls.
- **Paratrooper (`Paratrooper.glb`)**: Lightweight character model with deployed canopy, used in the *Sky 2.0* interactive physics simulation.

---

## 📦 Direct Asset Download Directory

All models are exported in the standard **glTF 2.0 Binary (`.glb`)** container format, containing embedded geometries, materials, and vertex colors:

| Model | Filename | File Size (MB) | Primary Use Case | Direct Download |
| :--- | :--- | :--- | :--- | :--- |
| **Supersonic Jet** | `jet.glb` | 8.04 MB | Vehicle, Dogfight Sim (Grayscale) | [Download `.glb`](/3d/jet.glb) |
| **Tethered Astronaut** | `Astronaut.glb` | 10.38 MB | Character, Space Sim | [Download `.glb`](/3d/Astronaut.glb) |
| **Rocket** | `rocket.glb` | 6.76 MB | Standard Rocket (Grayscale) | [Download `.glb`](/3d/rocket.glb) |
| **Paratrooper** | `Paratrooper.glb` | 12.63 MB | Character, Physics Tether | [Download `.glb`](/3d/Paratrooper.glb) |
| **Space Chicken** | `space_chicken!.glb` | 11.65 MB | Mascot, Humor, Easter Egg | [Download `.glb`](/3d/space_chicken!.glb) |
| **Jailson Mendes** | `jailson.glb` | 11.23 MB | Character, Brazilian Meme | [Download `.glb`](/3d/jailson.glb) |
| **Cosmic Orange** | `orange.glb` | 0.43 MB | Easter Egg Asteroids, Delícia Mode | [Download `.glb`](/3d/orange.glb) |
| **Cop (Police)** | `cop.glb` | 1.84 MB | Generic Cop, GameJam+ 25/26 FPS | [Download `.glb`](/3d/cop.glb) |
| **Test Moon** | `moon_test.glb` | 7.26 MB | Celestial Body, RuTracker Tests | [Download `.glb`](/3d/moon_test.glb) |

---

## 💡 How to Import Into Your Projects

### Three.js (Web):
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/path/to/jailson.glb', (gltf) => {
    scene.add(gltf.scene);
});
```

### Unity:
1. Drag the `.glb` file directly into your `Assets/Models` folder (requires the *glTFast* package from Unity Package Manager).
2. Drag the prefab into your scene hierarchy.

### Unreal Engine 5:
1. Open Content Browser -> Click **Import**.
2. Select the `.glb` container. UE5 will automatically create static meshes, materials, and hierarchy trees.

Enjoy the models, and feel free to use them in whatever creative or chaotic projects you build!
