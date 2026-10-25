import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  bakeUVRepeat,
  bakeUVRepeatOnGeometryAndMaterial,
  buildOriginPivotPrefabGroup,
  classifyMeshForUnity,
  extractScriptsFromHtml,
  transformThreeJsCodeForSandbox,
  isLikelyEnvironmentBackdrop,
  parseThreeJsHtmlTo3D,
  sanitizeSceneForGLB,
} from './htmlSceneConverter';

// Minimal DOM shim for running in Node.js test runner
if (typeof globalThis.window === 'undefined') {
  const mockCanvas = {
    width: 512,
    height: 512,
    style: {},
    toDataURL: () =>
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    getContext: () => ({
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      fillRect: () => {},
      clearRect: () => {},
      strokeRect: () => {},
      drawImage: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      arc: () => {},
      fill: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} }),
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
      putImageData: () => {},
    }),
  };

  (globalThis as any).Event =
    globalThis.Event ||
    class MockEvent {
      type: string;
      constructor(type: string) {
        this.type = type;
      }
    };

  (globalThis as any).document = {
    createElement: (tag: string) => {
      if (tag.toLowerCase() === 'canvas') return { ...mockCanvas };
      return {
        style: {},
        appendChild: (c: any) => c,
        removeChild: (c: any) => c,
        addEventListener: () => {},
        removeEventListener: () => {},
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 1024, height: 768 }),
      };
    },
    getElementById: () => ({ style: {}, appendChild: () => {} }),
    querySelector: () => ({ style: {}, appendChild: () => {} }),
    querySelectorAll: () => [],
    body: { appendChild: () => {}, removeChild: () => {}, style: {} },
    documentElement: { style: {} },
  };
  (globalThis as any).window = globalThis;
}

test('extractScriptsFromHtml extracts title, script tags, and importmap', () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Starfighter Turret</title>
        <script type="importmap">
          { "imports": { "three": "https://unpkg.com/three@0.170.0/build/three.module.js" } }
        </script>
        <script src="https://cdn.example.com/three.min.js"></script>
      </head>
      <body>
        <script type="module">
          import * as THREE from 'three';
          const scene = new THREE.Scene();
        </script>
      </body>
    </html>
  `;

  const result = extractScriptsFromHtml(html);
  assert.equal(result.title, 'Starfighter Turret');
  assert.equal(result.scripts.length, 1);
  assert.ok(result.scripts[0].includes('new THREE.Scene()'));
  assert.equal(
    result.importMap['three'],
    'https://unpkg.com/three@0.170.0/build/three.module.js'
  );
});

test('transformThreeJsCodeForSandbox rewrites ES module imports cleanly', () => {
  const code = `
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { Scene, Mesh as MyMesh } from 'https://unpkg.com/three@0.160.0/build/three.module.js';
    export default function init() {}
  `;

  const transformed = transformThreeJsCodeForSandbox(code);
  assert.ok(!transformed.includes('import '));
  assert.ok(transformed.includes('const THREE = __THREE__;'));
  assert.ok(transformed.includes('const { OrbitControls } = __ADDONS__;'));
  assert.ok(transformed.includes('const { Scene, Mesh: MyMesh } = __THREE__;'));
});

test('bakeUVRepeatOnGeometryAndMaterial bakes texture.repeat into vertex UVs and resets repeat to (1,1)', () => {
  const planeGeo = new THREE.PlaneGeometry(140, 140);
  const canvas = document.createElement('canvas');
  const floorTex = new THREE.CanvasTexture(canvas as HTMLCanvasElement);
  floorTex.repeat.set(36, 36);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorTex });

  bakeUVRepeatOnGeometryAndMaterial(planeGeo, floorMat);

  const uvAttr = planeGeo.getAttribute('uv');
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (let i = 0; i < uvAttr.count; i++) {
    maxU = Math.max(maxU, uvAttr.getX(i));
    maxV = Math.max(maxV, uvAttr.getY(i));
  }

  assert.equal(maxU, 36);
  assert.equal(maxV, 36);
  assert.equal(floorTex.wrapS, THREE.RepeatWrapping);
  assert.equal(floorTex.wrapT, THREE.RepeatWrapping);
  assert.equal(floorTex.repeat.x, 1);
  assert.equal(floorTex.repeat.y, 1);

  // Also test a second geometry sharing the same texture instance!
  const secondPlaneGeo = new THREE.PlaneGeometry(140, 140);
  bakeUVRepeatOnGeometryAndMaterial(secondPlaneGeo, floorMat);
  const uvAttr2 = secondPlaneGeo.getAttribute('uv');
  let maxU2 = -Infinity;
  for (let i = 0; i < uvAttr2.count; i++) {
    maxU2 = Math.max(maxU2, uvAttr2.getX(i));
  }
  assert.equal(maxU2, 36);
});

test('bakeUVRepeatOnGeometryAndMaterial does not double-multiply when script already called bakeUVRepeat', () => {
  const planeGeo = new THREE.PlaneGeometry(140, 140);
  bakeUVRepeat(planeGeo, 36, 36);

  const canvas = document.createElement('canvas');
  const floorTex = new THREE.CanvasTexture(canvas as HTMLCanvasElement);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorTex });

  bakeUVRepeatOnGeometryAndMaterial(planeGeo, floorMat);

  const uvAttr = planeGeo.getAttribute('uv');
  let maxU = -Infinity;
  for (let i = 0; i < uvAttr.count; i++) {
    maxU = Math.max(maxU, uvAttr.getX(i));
  }
  assert.equal(maxU, 36);
  assert.equal(floorTex.wrapS, THREE.RepeatWrapping);
  assert.equal(floorTex.wrapT, THREE.RepeatWrapping);
});

test('classifyMeshForUnity classifies props (<=3.6m or named prop), 2.5D billboards/sprites, and architecture', () => {
  // 1. Small crate (1.2m) -> prop
  const crateMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
  );
  assert.equal(classifyMeshForUnity(crateMesh, new THREE.Vector3(1.2, 1.2, 1.2)), 'prop');

  // 2. Transparent vertical plane -> billboard
  const treeBillboard = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 4.0),
    new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.9 })
  );
  assert.equal(classifyMeshForUnity(treeBillboard, new THREE.Vector3(2.5, 4.0, 0.01)), 'billboard');

  // 3. Large arena floor (140x0.4x140m) -> architecture
  const floorMesh = new THREE.Mesh(
    new THREE.BoxGeometry(140, 0.4, 140),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  floorMesh.name = 'Arena_Floor';
  assert.equal(classifyMeshForUnity(floorMesh, new THREE.Vector3(140, 0.4, 140)), 'architecture');
});

test('buildOriginPivotPrefabGroup recalculates pivot at (X: 0, minY: 0, Z: 0)', () => {
  const crate = new THREE.Mesh(
    new THREE.BoxGeometry(2, 3, 2),
    new THREE.MeshStandardMaterial({ color: 0xffaa00 })
  );
  // Position crate far away at (25, 11.5, -40) so its bottom Y is at 10.0
  crate.position.set(25, 11.5, -40);
  crate.updateMatrixWorld(true);
  const { prefabGroup, dimensions } = buildOriginPivotPrefabGroup(crate, 'Supply_Crate');

  assert.equal(dimensions[0], 2);
  assert.equal(dimensions[1], 3);
  assert.equal(dimensions[2], 2);

  const box = new THREE.Box3().setFromObject(prefabGroup);
  const center = box.getCenter(new THREE.Vector3());
  assert.ok(Math.abs(center.x) < 1e-4, `Expected X center 0, got ${center.x}`);
  assert.ok(Math.abs(box.min.y) < 1e-4, `Expected minY 0, got ${box.min.y}`);
  assert.ok(Math.abs(center.z) < 1e-4, `Expected Z center 0, got ${center.z}`);
});

test('Unity Export Suite: 1:1 Scale, UV Repeat Baking, Prefab Deduplication, PNG Texture Extraction, and Left-Handed Lights', async () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Outcaster 2.5D Map Mockup</title></head>
      <body>
        <script>
          window.onload = function() {
            const scene = new THREE.Scene();
            const mapGroup = new THREE.Group();

            // Procedural floor CanvasTexture with 36x36 repeat on a 140x140m floor
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#141e30';
            ctx.fillRect(0, 0, 256, 256);

            const floorTexture = new THREE.CanvasTexture(canvas);
            floorTexture.wrapS = THREE.RepeatWrapping;
            floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set(36, 36);

            const floorGeo = new THREE.BoxGeometry(140, 0.4, 140);
            const floorMat = new THREE.MeshStandardMaterial({
              map: floorTexture,
              metalness: 0.25,
              roughness: 0.75
            });
            const floorMesh = new THREE.Mesh(floorGeo, floorMat);
            floorMesh.name = 'Arena_Floor';
            floorMesh.position.set(0, -0.2, 0);
            mapGroup.add(floorMesh);

            // 4 repeated Supply Crate props (1.5 x 1.5 x 1.5 m -> <= 3.6m)
            for (let i = 0; i < 4; i++) {
              const crate = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 1.5, 1.5),
                new THREE.MeshStandardMaterial({ color: 0xd97706, map: floorTexture })
              );
              crate.name = 'Supply_Crate_' + i;
              crate.position.set(10 + i * 4, 0.75, -5);
              mapGroup.add(crate);
            }

            // 2.5D Sprite Billboard
            const spriteMat = new THREE.SpriteMaterial({ map: floorTexture, transparent: true });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.name = 'Torch_Billboard';
            sprite.scale.set(2, 3, 1);
            sprite.position.set(-12, 1.5, 8);
            mapGroup.add(sprite);

            // Scene PointLights at known Right-Handed coordinates
            const pt = new THREE.PointLight(0x00f0ff, 5, 30);
            pt.name = 'Cyan_Torch_Light';
            pt.position.set(15, 4, -20);
            mapGroup.add(pt);

            scene.add(mapGroup);
          };
        </script>
      </body>
    </html>
  `;

  const result = await parseThreeJsHtmlTo3D(html);
  assert.equal(result.blueprint.title, 'Outcaster 2.5D Map Mockup');

  // 1. Verify 1:1 original world scale in meters (140m x 140m, never shrunk to 2.8m)
  assert.equal(result.stats.dimensions.x, 140);
  assert.equal(result.stats.dimensions.z, 140);

  // 2. Verify Unity Export Suite metadata is populated
  const suite = result.blueprint.unitySuite;
  assert.ok(suite, 'Expected blueprint.unitySuite to be populated');
  assert.equal(suite!.counts.propMeshes, 4);
  assert.equal(suite!.counts.billboardSprites, 1);

  // 3. Verify repeated props (4 identical 1.5m crates + 1 sprite) are deduplicated cleanly
  const supplyCratePrefab = suite!.prefabs.find((p) => p.name.includes('Supply Crate'));
  assert.ok(supplyCratePrefab);
  assert.equal(supplyCratePrefab!.count, 4);
  assert.equal(supplyCratePrefab!.dimensions[0], 1.5);

  // 4. Verify PNG Texture extraction
  assert.ok(suite!.textures.length >= 1);
  assert.ok(suite!.textures[0].dataUrl.startsWith('data:image/png'));

  // 5. Verify Lights & Transforms JSON data has Left-Handed Unity coordinates (X negated)
  assert.equal(suite!.lights.length, 1);
  const lightItem = suite!.lights[0];
  assert.equal(lightItem.colorHex, '#00f0ff');
  assert.equal(lightItem.intensity, 5);
  assert.equal(lightItem.range, 30);
  assert.equal(lightItem.position.x, -15);
  assert.equal(lightItem.position.y, 4.4); // shifted by ground alignment (+0.4m)
  assert.equal(lightItem.position.z, -20);
});

test('sanitizeSceneForGLB strips lights by default and converts multi-material meshes for GLTFExporter', () => {
  const root = new THREE.Group();
  const light = new THREE.PointLight(0xffffff, 1);
  root.add(light);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const m0 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const m4 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const multiMesh = new THREE.Mesh(boxGeo, [m0, m0, m0, m0, m4, m0]);
  multiMesh.name = 'TestPillar';
  root.add(multiMesh);

  const sanitized = sanitizeSceneForGLB(root);
  let lights = 0;
  let meshes = 0;
  sanitized.traverse((n) => {
    if ((n as any).isLight) lights++;
    if (n instanceof THREE.Mesh) {
      meshes++;
      assert.ok(!Array.isArray(n.material));
    }
  });

  assert.equal(lights, 0);
  assert.ok(meshes >= 1);
});

test('isLikelyEnvironmentBackdrop identifies only infinite planes (> 250m) and shadow catchers while keeping map floors', () => {
  const arenaFloorGeo = new THREE.BoxGeometry(140, 0.2, 140);
  const arenaFloorMesh = new THREE.Mesh(
    arenaFloorGeo,
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  assert.equal(isLikelyEnvironmentBackdrop(arenaFloorMesh), false);

  const infiniteGroundGeo = new THREE.PlaneGeometry(500, 500);
  infiniteGroundGeo.rotateX(-Math.PI / 2);
  const infiniteGroundMesh = new THREE.Mesh(
    infiniteGroundGeo,
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  assert.equal(isLikelyEnvironmentBackdrop(infiniteGroundMesh), true);
});
