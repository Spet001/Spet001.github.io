import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Model3DBlueprint,
  Part3D,
  UnityExportSuiteData,
  UnityLightItem,
  UnityNodeCategory,
  UnityPrefabItem,
  UnityTextureItem,
  ViewportStats,
} from '../types/model3d';

export interface HtmlConversionOptions {
  centerOnGround?: boolean;
  includeEnvironmentMeshes?: boolean;
  autoExportGlb?: boolean;
  includePropsDetails?: boolean;
  includeBillboardsSprites?: boolean;
  includeSceneLights?: boolean;
}

export interface HtmlConversionResult {
  group: THREE.Group;
  blueprint: Model3DBlueprint;
  stats: ViewportStats;
  extractedMeshCount: number;
  unitySuite: UnityExportSuiteData;
  warnings: string[];
}

const PROP_NAME_KEYWORDS = [
  'prop',
  'detail',
  'crate',
  'barrel',
  'box',
  'container',
  'rack',
  'server',
  'console',
  'terminal',
  'bench',
  'table',
  'chair',
  'desk',
  'pillar',
  'column',
  'pipe',
  'vent',
  'lamp',
  'bulb',
  'fixture',
  'lantern',
  'crystal',
  'core',
  'drone',
  'turret',
  'item',
  'pickup',
  'obstacle',
  'cover',
  'barricade',
  'locker',
  'cabinet',
  'monitor',
  'screen',
  'sign',
  'debris',
  'rock',
  'tree',
  'bush',
  'statue',
];

const BILLBOARD_NAME_KEYWORDS = [
  'sprite',
  'billboard',
  '2.5d',
  'cutout',
  'card_sprite',
  'foliage_card',
];

function cleanZero(n: number): number {
  const rounded = Number(n.toFixed(4));
  return Object.is(rounded, -0) ? 0 : rounded;
}

/**
 * Directly multiplies a BufferGeometry's UV coordinates by (repeatX, repeatY) + (offsetX, offsetY).
 * Essential because standard glTF 2.0 / GLTFExporter does not export `texture.repeat` without `KHR_texture_transform`.
 */
export function bakeUVRepeat(
  geometry: THREE.BufferGeometry,
  repeatX: number,
  repeatY: number,
  offsetX: number = 0,
  offsetY: number = 0
): THREE.BufferGeometry {
  const uvAttr = geometry.getAttribute('uv');
  if (!uvAttr || uvAttr.count === 0) return geometry;

  const clonedUv = uvAttr.clone();
  for (let i = 0; i < clonedUv.count; i++) {
    const u = clonedUv.getX(i) * repeatX + offsetX;
    const v = clonedUv.getY(i) * repeatY + offsetY;
    clonedUv.setXY(i, u, v);
  }
  clonedUv.needsUpdate = true;
  geometry.setAttribute('uv', clonedUv);
  return geometry;
}

/**
 * Traverses a mesh's geometry UVs and material textures (`map`, `emissiveMap`, `normalMap`, `roughnessMap`, `metalnessMap`, `bumpMap`):
 * 1. Preserves original `texture.repeat` and `texture.offset` in `tex.userData.__origRepeat` so shared textures across multiple meshes bake every mesh cleanly.
 * 2. If `texture.repeat.x > 1` or `repeat.y > 1` (or != 1) and vertex UVs are in [0..1], clones the UV attribute and multiplies vertex UVs directly by `repeat.x` and `repeat.y`.
 * 3. Sets `wrapS = THREE.RepeatWrapping`, `wrapT = THREE.RepeatWrapping`, and resets `map.repeat.set(1, 1)` so Unity imports tiling natively without `KHR_texture_transform`.
 */
export function bakeUVRepeatOnGeometryAndMaterial(
  geometry: THREE.BufferGeometry,
  material: THREE.Material | undefined | null
): void {
  if (!geometry || !material) return;
  const uvAttr = geometry.getAttribute('uv');
  if (!uvAttr || uvAttr.count === 0) return;

  let minU = Infinity;
  let maxU = -Infinity;
  let minV = Infinity;
  let maxV = -Infinity;
  for (let i = 0; i < uvAttr.count; i++) {
    const u = uvAttr.getX(i);
    const v = uvAttr.getY(i);
    if (u < minU) minU = u;
    if (u > maxU) maxU = u;
    if (v < minV) minV = v;
    if (v > maxV) maxV = v;
  }

  const spanU = maxU - minU;
  const spanV = maxV - minV;
  const uvsAlreadyTiled =
    spanU > 1.05 || spanV > 1.05 || maxU > 1.05 || maxV > 1.05 || minU < -0.05 || minV < -0.05;

  const anyMat = material as any;
  const texSlots = [
    'map',
    'emissiveMap',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'bumpMap',
    'alphaMap',
  ] as const;

  let targetRx = 1;
  let targetRy = 1;
  let targetOx = 0;
  let targetOy = 0;
  let foundRepeatTransform = false;

  for (const slot of texSlots) {
    const tex = anyMat[slot] as THREE.Texture | undefined;
    if (!tex) continue;

    if (!tex.userData) tex.userData = {};
    if (!tex.userData.__origRepeat) {
      tex.userData.__origRepeat = {
        x: tex.repeat?.x ?? 1,
        y: tex.repeat?.y ?? 1,
        ox: tex.offset?.x ?? 0,
        oy: tex.offset?.y ?? 0,
      };
    }

    const orig = tex.userData.__origRepeat;
    if (
      Math.abs(orig.x - 1) > 1e-4 ||
      Math.abs(orig.y - 1) > 1e-4 ||
      Math.abs(orig.ox) > 1e-4 ||
      Math.abs(orig.oy) > 1e-4
    ) {
      if (!foundRepeatTransform) {
        targetRx = orig.x;
        targetRy = orig.y;
        targetOx = orig.ox;
        targetOy = orig.oy;
        foundRepeatTransform = true;
      }
    }
  }

  if (foundRepeatTransform && !uvsAlreadyTiled) {
    bakeUVRepeat(geometry, targetRx, targetRy, targetOx, targetOy);
  }

  if (foundRepeatTransform || uvsAlreadyTiled) {
    for (const slot of texSlots) {
      const tex = anyMat[slot] as THREE.Texture | undefined;
      if (!tex) continue;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 1);
      tex.offset.set(0, 0);
      tex.needsUpdate = true;
    }
  }
}

/**
 * Converts a THREE.Texture's underlying `.image` (HTMLCanvasElement, HTMLImageElement, ImageBitmap, DataTexture)
 * into a `.PNG` data URL (`data:image/png;base64,...`).
 */
export function extractTextureToPngDataUrl(
  tex: THREE.Texture | undefined | null
): { dataUrl: string; width: number; height: number } | null {
  if (!tex || !tex.image) return null;
  const img = tex.image as any;

  try {
    if (typeof img.toDataURL === 'function') {
      const dataUrl = img.toDataURL('image/png');
      return {
        dataUrl,
        width: Number(img.width) || 256,
        height: Number(img.height) || 256,
      };
    }

    if (typeof document !== 'undefined') {
      const w = Number(img.width || img.videoWidth || 256);
      const h = Number(img.height || img.videoHeight || 256);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (img instanceof Uint8Array || img instanceof Uint8ClampedArray || img.data) {
          const rawData = img.data || img;
          if (rawData.length >= w * h * 4 && typeof ImageData !== 'undefined') {
            const iData = new ImageData(new Uint8ClampedArray(rawData.buffer || rawData), w, h);
            ctx.putImageData(iData, 0, 0);
            return { dataUrl: canvas.toDataURL('image/png'), width: w, height: h };
          }
        } else if (typeof ctx.drawImage === 'function') {
          ctx.drawImage(img, 0, 0, w, h);
          return { dataUrl: canvas.toDataURL('image/png'), width: w, height: h };
        }
      }
    }
  } catch {
    // Ignore tainted or non-serializable image
  }
  return null;
}

/**
 * Classifies a Mesh or Sprite into a Unity Export Suite category:
 * - `'billboard'`: `THREE.Sprite` or vertical planes (`min(x, z) <= 0.16 && y >= 0.2`) with `material.transparent === true`
 * - `'prop'`: Objects/groups named as a prop/detail OR with `BoundingBox <= 3.6m`
 * - `'architecture'`: Structural floors, walls, ceilings, and large level geometry (`> 3.6m`)
 */
export function classifyMeshForUnity(
  obj: THREE.Object3D,
  worldBoxSize: THREE.Vector3
): UnityNodeCategory {
  if ((obj as any).isLight) return 'light';
  if ((obj as any).isSprite || obj.userData?.isConvertedSprite) return 'billboard';

  // Build combined hierarchy name from object and its parent groups
  const names: string[] = [];
  let curr: THREE.Object3D | null = obj;
  while (curr) {
    if (curr.name) names.push(curr.name.toLowerCase());
    curr = curr.parent;
  }
  const fullPathName = names.join(' ');

  if (BILLBOARD_NAME_KEYWORDS.some((kw) => fullPathName.includes(kw))) {
    return 'billboard';
  }

  // Check if vertical plane with transparent material
  const mesh = obj as THREE.Mesh;
  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const hasTransparentMat = mats.some(
    (m) => m && (m.transparent === true || (m as any).alphaTest > 0)
  );
  const minHoriz = Math.min(worldBoxSize.x, worldBoxSize.z);
  const maxHoriz = Math.max(worldBoxSize.x, worldBoxSize.z);
  if (hasTransparentMat && minHoriz <= 0.18 && worldBoxSize.y >= 0.2 && maxHoriz <= 8.0) {
    return 'billboard';
  }

  // Check if named as a prop/detail (and not a huge floor/wall > 15m)
  const maxDim = Math.max(worldBoxSize.x, worldBoxSize.y, worldBoxSize.z);
  const minDim = Math.min(worldBoxSize.x, worldBoxSize.y, worldBoxSize.z);
  const isFloorOrWall =
    fullPathName.includes('floor') ||
    fullPathName.includes('ground') ||
    fullPathName.includes('ceiling') ||
    fullPathName.includes('roof') ||
    (fullPathName.includes('wall') && maxDim > 3.6);

  if (!isFloorOrWall) {
    if (PROP_NAME_KEYWORDS.some((kw) => fullPathName.includes(kw)) && maxDim <= 12.0) {
      return 'prop';
    }
    // Specification: BoundingBox <= 3.6m is classified as a 3D Prop & Detail
    if (maxDim <= 3.6 && !(maxDim > 3.0 && minDim < 0.05)) {
      return 'prop';
    }
  }

  return 'architecture';
}

/**
 * Pure helper to extract JavaScript code blocks from an HTML string or return raw JS if no HTML tags exist.
 */
export function extractScriptsFromHtml(input: string): {
  title: string;
  scripts: string[];
  importMap: Record<string, string>;
} {
  const trimmed = input.trim();
  let title = 'Three.js Scene Asset';
  const scripts: string[] = [];
  const importMap: Record<string, string> = {};

  const titleMatch = trimmed.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1].trim()) {
    title = titleMatch[1].trim().replace(/\s+/g, ' ').slice(0, 60);
  }

  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  let foundScriptTags = false;

  while ((match = scriptRegex.exec(trimmed)) !== null) {
    foundScriptTags = true;
    const attrs = match[1] || '';
    const content = match[2] || '';

    if (/type\s*=\s*["']importmap["']/i.test(attrs)) {
      try {
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed.imports === 'object') {
          Object.assign(importMap, parsed.imports);
        }
      } catch {
        // Ignore malformed importmap
      }
      continue;
    }

    if (/\bsrc\s*=/i.test(attrs) && !content.trim()) {
      continue;
    }

    if (content.trim()) {
      scripts.push(content);
    }
  }

  if (
    !foundScriptTags &&
    trimmed.length > 0 &&
    !trimmed.startsWith('<!DOCTYPE') &&
    !trimmed.startsWith('<html')
  ) {
    scripts.push(trimmed);
  }

  return { title, scripts, importMap };
}

/**
 * Transforms ES module import statements from Three.js HTML code
 * so standalone HTML files execute cleanly inside the sandbox.
 */
export function transformThreeJsCodeForSandbox(code: string): string {
  let transformed = code;

  transformed = transformed.replace(
    /import\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+['"][^'"]*three(?:\.module)?(?:\.min)?(?:\.js)?['"]\s*;?/gi,
    'const $1 = __THREE__;'
  );

  transformed = transformed.replace(
    /import\s+([A-Za-z_$][\w$]*)\s+from\s+['"][^'"]*three(?:\.module)?(?:\.min)?(?:\.js)?['"]\s*;?/gi,
    'const $1 = __THREE__;'
  );

  transformed = transformed.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"][^'"]*three(?:\.module)?(?:\.min)?(?:\.js)?['"]\s*;?/gi,
    (_full, importsList: string) => {
      const destructured = importsList
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const parts = item.split(/\s+as\s+/i);
          return parts.length === 2 ? `${parts[0].trim()}: ${parts[1].trim()}` : item;
        })
        .join(', ');
      return `const { ${destructured} } = __THREE__;`;
    }
  );

  transformed = transformed.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"][^'"]*(?:three\/addons\/|three\/examples\/jsm\/)[^'"]+['"]\s*;?/gi,
    (_full, importsList: string) => {
      const destructured = importsList
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const parts = item.split(/\s+as\s+/i);
          return parts.length === 2 ? `${parts[0].trim()}: ${parts[1].trim()}` : item;
        })
        .join(', ');
      return `const { ${destructured} } = __ADDONS__;`;
    }
  );

  transformed = transformed.replace(
    /import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?/g,
    '/* external import stripped */'
  );

  transformed = transformed.replace(/\bexport\s+default\s+/g, '');
  transformed = transformed.replace(/\bexport\s+(const|let|var|function|class)\b/g, '$1');

  return transformed;
}

/**
 * Sanitizes a Three.js Object3D / Group before passing it to `GLTFExporter`.
 */
export function sanitizeSceneForGLB(rootObject: THREE.Object3D): THREE.Group {
  const cleanGroup = new THREE.Group();
  cleanGroup.name = rootObject.name || 'Sanitized_Scene';

  rootObject.updateMatrixWorld(true);

  const toRemove: THREE.Object3D[] = [];
  rootObject.traverse((node) => {
    if ((node as any).isLight) {
      toRemove.push(node);
    }
  });
  toRemove.forEach((light) => {
    if (light.parent) {
      light.parent.remove(light);
    }
  });

  rootObject.traverse((node) => {
    if ((node as any).isLight) return;

    if (node instanceof THREE.Mesh && node.geometry) {
      node.updateMatrix();
      node.updateMatrixWorld(true);

      if (Array.isArray(node.material)) {
        const mats = node.material;
        const groups = node.geometry.groups;

        if (groups && groups.length > 0 && mats.length > 1) {
          const indicesByMat = new Map<number, number[]>();
          const indexAttr = node.geometry.getIndex();
          const posAttr = node.geometry.getAttribute('position');

          if (posAttr) {
            for (const grp of groups) {
              const matIdx = Math.min(grp.materialIndex ?? 0, mats.length - 1);
              if (!indicesByMat.has(matIdx)) {
                indicesByMat.set(matIdx, []);
              }
              const list = indicesByMat.get(matIdx)!;
              const end = grp.start + grp.count;
              for (let i = grp.start; i < end; i++) {
                list.push(indexAttr ? indexAttr.getX(i) : i);
              }
            }

            if (indicesByMat.size > 1) {
              indicesByMat.forEach((vertIndices, matIdx) => {
                const subGeo = node.geometry.clone();
                subGeo.clearGroups();
                subGeo.setIndex(vertIndices);
                subGeo.applyMatrix4(node.matrixWorld);
                const selectedMat = mats[matIdx] || mats[4] || mats[0];
                const cleanMat = normalizeMaterialForGlb(
                  selectedMat,
                  `${node.name || 'Mesh'}_Face_${matIdx}`
                );
                bakeUVRepeatOnGeometryAndMaterial(subGeo, cleanMat);
                const subMesh = new THREE.Mesh(subGeo, cleanMat);
                subMesh.name = `${node.name || 'Part'}_Mat${matIdx}`;
                subMesh.userData = {
                  ...node.userData,
                  partId: node.userData.partId || `${subMesh.name}_${Math.random()}`,
                };
                cleanGroup.add(subMesh);
              });
              return;
            }
          }
        }

        const primaryMaterial = mats[4] || mats[0];
        const clonedGeo = node.geometry.clone();
        clonedGeo.clearGroups();
        clonedGeo.applyMatrix4(node.matrixWorld);
        const cleanMat = normalizeMaterialForGlb(primaryMaterial, node.name || 'Part_Mat');
        bakeUVRepeatOnGeometryAndMaterial(clonedGeo, cleanMat);
        const singleMesh = new THREE.Mesh(clonedGeo, cleanMat);
        singleMesh.name = node.name || 'Part';
        singleMesh.userData = {
          ...node.userData,
          partId: node.userData.partId || `part_${Math.random()}`,
        };
        cleanGroup.add(singleMesh);
      } else {
        const clonedGeo = node.geometry.clone();
        clonedGeo.applyMatrix4(node.matrixWorld);
        const cleanMat = normalizeMaterialForGlb(node.material, node.name || 'Part_Mat');
        bakeUVRepeatOnGeometryAndMaterial(clonedGeo, cleanMat);
        const singleMesh = new THREE.Mesh(clonedGeo, cleanMat);
        singleMesh.name = node.name || 'Part';
        singleMesh.userData = {
          ...node.userData,
          partId: node.userData.partId || `part_${Math.random()}`,
        };
        cleanGroup.add(singleMesh);
      }
    }
  });

  return cleanGroup;
}

/**
 * Checks whether a Mesh is likely an infinite skybox or shadow catcher (> 250m)
 * while preserving architectural map floors and walls.
 */
export function isLikelyEnvironmentBackdrop(mesh: THREE.Mesh): boolean {
  const name = (mesh.name || '').toLowerCase();
  if (
    name.includes('skybox') ||
    name.includes('skydome') ||
    name.includes('shadowplane') ||
    name.includes('contactshadow') ||
    name.includes('ground_plane_infinite')
  ) {
    return true;
  }

  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (mat instanceof THREE.ShadowMaterial) {
    return true;
  }

  mesh.geometry.computeBoundingBox();
  const bb = mesh.geometry.boundingBox;
  if (bb) {
    const size = new THREE.Vector3();
    bb.getSize(size);
    size.multiply(mesh.scale);
    const maxDim = Math.max(size.x, size.y, size.z);
    const minDim = Math.min(size.x, size.y, size.z);
    if (maxDim > 250 && minDim < 0.2) {
      return true;
    }
    if (maxDim > 200 && mat && (mat as THREE.Material).side === THREE.BackSide) {
      return true;
    }
  }

  return false;
}

function expandInstancedMesh(instanced: THREE.InstancedMesh): THREE.Mesh[] {
  const result: THREE.Mesh[] = [];
  const count = Math.min(instanced.count, 500);
  const instanceMatrix = new THREE.Matrix4();
  const worldMatrix = instanced.matrixWorld;

  for (let i = 0; i < count; i++) {
    instanced.getMatrixAt(i, instanceMatrix);
    const combinedMatrix = new THREE.Matrix4().multiplyMatrices(worldMatrix, instanceMatrix);

    const geo = instanced.geometry.clone();
    geo.applyMatrix4(combinedMatrix);

    const mat = Array.isArray(instanced.material)
      ? instanced.material.map((m) => m.clone())
      : instanced.material.clone();

    if (instanced.instanceColor && !Array.isArray(mat) && 'color' in mat) {
      const c = new THREE.Color();
      instanced.getColorAt(i, c);
      (mat as THREE.MeshStandardMaterial).color.multiply(c);
    }

    const m = new THREE.Mesh(geo, mat);
    m.name = `${instanced.name || 'Instance'}_${i + 1}`;
    m.castShadow = true;
    m.receiveShadow = true;
    result.push(m);
  }
  return result;
}

/**
 * Converts any non-PBR material into a clean MeshStandardMaterial with SRGBColorSpace on color textures.
 */
export function normalizeMaterialForGlb(
  mat: THREE.Material | undefined | null,
  fallbackName: string
): THREE.MeshStandardMaterial {
  if (!mat) {
    return new THREE.MeshStandardMaterial({ name: fallbackName, color: 0x94a3b8 });
  }

  const anyMat = mat as any;

  const ensureTextureReady = (tex: any, isColorMap: boolean = false) => {
    if (!tex) return null;
    if (!tex.userData) tex.userData = {};
    if (!tex.userData.__origRepeat) {
      tex.userData.__origRepeat = {
        x: tex.repeat?.x ?? 1,
        y: tex.repeat?.y ?? 1,
        ox: tex.offset?.x ?? 0,
        oy: tex.offset?.y ?? 0,
      };
    }
    if (isColorMap) {
      tex.colorSpace = THREE.SRGBColorSpace;
    }
    if (tex.image && typeof tex.image.toDataURL === 'function') {
      tex.needsUpdate = true;
    }
    return tex;
  };

  if (mat instanceof THREE.MeshStandardMaterial) {
    const cloned = mat.clone();
    cloned.name = cloned.name || fallbackName;
    cloned.map = ensureTextureReady(cloned.map, true);
    cloned.emissiveMap = ensureTextureReady(cloned.emissiveMap, true);
    cloned.normalMap = ensureTextureReady(cloned.normalMap, false);
    cloned.roughnessMap = ensureTextureReady(cloned.roughnessMap, false);
    cloned.metalnessMap = ensureTextureReady(cloned.metalnessMap, false);
    cloned.bumpMap = ensureTextureReady(cloned.bumpMap, false);
    return cloned;
  }

  const color =
    anyMat.color instanceof THREE.Color
      ? anyMat.color.clone()
      : new THREE.Color(0xffffff);

  const emissive =
    anyMat.emissive instanceof THREE.Color
      ? anyMat.emissive.clone()
      : new THREE.Color(0x000000);

  let roughness = 0.65;
  let metalness = 0.12;

  if (typeof anyMat.shininess === 'number') {
    roughness = Math.max(0.15, Math.min(0.92, 1 - anyMat.shininess / 120));
  }
  if (typeof anyMat.roughness === 'number') {
    roughness = anyMat.roughness;
  }
  if (typeof anyMat.metalness === 'number') {
    metalness = anyMat.metalness;
  }

  const mapTex = ensureTextureReady(anyMat.map, true);

  return new THREE.MeshStandardMaterial({
    name: mat.name || fallbackName,
    color,
    emissive,
    emissiveIntensity: typeof anyMat.emissiveIntensity === 'number' ? anyMat.emissiveIntensity : 1,
    roughness,
    metalness,
    map: mapTex,
    emissiveMap: ensureTextureReady(anyMat.emissiveMap, true),
    normalMap: ensureTextureReady(anyMat.normalMap, false),
    roughnessMap: ensureTextureReady(anyMat.roughnessMap, false),
    metalnessMap: ensureTextureReady(anyMat.metalnessMap, false),
    alphaMap: ensureTextureReady(anyMat.alphaMap, false),
    bumpMap: ensureTextureReady(anyMat.bumpMap, false),
    transparent: Boolean(mat.transparent),
    opacity: typeof mat.opacity === 'number' ? mat.opacity : 1,
    side: mat.side ?? THREE.FrontSide,
    vertexColors: Boolean(mat.vertexColors),
  });
}

/**
 * Builds a standalone, Unity-ready Prefab `THREE.Group` for a source Mesh/Prop
 * with its pivot recalculated at the origin `(X: 0, Y: minimum base 0, Z: 0)`,
 * preserving 1:1 scale in meters and baking any UV repeats.
 */
export function buildOriginPivotPrefabGroup(
  sourceMesh: THREE.Mesh,
  prefabName: string
): {
  prefabGroup: THREE.Group;
  dimensions: [number, number, number];
  colorHex: string;
  thumbnailDataUrl?: string;
} {
  const prefabGroup = new THREE.Group();
  prefabGroup.name = prefabName.replace(/[^a-zA-Z0-9_-]/g, '_');

  // Extract local scale from world matrix so prefab is 1:1 meters in unrotated orientation
  const worldScale = new THREE.Vector3();
  sourceMesh.matrixWorld.decompose(new THREE.Vector3(), new THREE.Quaternion(), worldScale);

  const baseGeo = sourceMesh.geometry.clone();
  const scaleMat = new THREE.Matrix4().makeScale(
    Math.abs(worldScale.x) || 1,
    Math.abs(worldScale.y) || 1,
    Math.abs(worldScale.z) || 1
  );
  baseGeo.applyMatrix4(scaleMat);
  baseGeo.computeBoundingBox();

  const bb = baseGeo.boundingBox || new THREE.Box3();
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bb.getCenter(center);
  bb.getSize(size);

  // Recalculate pivot at origin: X = 0 (center), Y = 0 (minimum base), Z = 0 (center)
  const pivotOffset = new THREE.Matrix4().makeTranslation(-center.x, -bb.min.y, -center.z);
  baseGeo.applyMatrix4(pivotOffset);
  if (!baseGeo.attributes.normal) {
    baseGeo.computeVertexNormals();
  }

  let colorHex = '#38bdf8';
  let thumbnailDataUrl: string | undefined;

  if (Array.isArray(sourceMesh.material)) {
    const mats = sourceMesh.material;
    const groups = baseGeo.groups;
    const primaryMat = mats[4] || mats[0];
    if (primaryMat && (primaryMat as any).color) {
      colorHex = `#${(primaryMat as any).color.getHexString()}`;
    }
    for (const m of mats) {
      if (m && (m as any).map) {
        const extracted = extractTextureToPngDataUrl((m as any).map);
        if (extracted) {
          thumbnailDataUrl = extracted.dataUrl;
          break;
        }
      }
    }

    const uniqueMats = new Set(mats.filter(Boolean));
    if (groups && groups.length > 0 && uniqueMats.size > 1) {
      const indicesByMat = new Map<number, number[]>();
      const indexAttr = baseGeo.getIndex();
      for (const grp of groups) {
        const matIdx = Math.min(grp.materialIndex ?? 0, mats.length - 1);
        if (!indicesByMat.has(matIdx)) indicesByMat.set(matIdx, []);
        const list = indicesByMat.get(matIdx)!;
        const end = grp.start + grp.count;
        for (let i = grp.start; i < end; i++) {
          list.push(indexAttr ? indexAttr.getX(i) : i);
        }
      }

      indicesByMat.forEach((vertIndices, matIdx) => {
        if (vertIndices.length === 0) return;
        const subGeo = baseGeo.clone();
        subGeo.clearGroups();
        subGeo.setIndex(vertIndices);
        const chosenMat = normalizeMaterialForGlb(
          mats[matIdx] || mats[4] || mats[0],
          `${prefabName}_Face_${matIdx}`
        );
        bakeUVRepeatOnGeometryAndMaterial(subGeo, chosenMat);
        const subMesh = new THREE.Mesh(subGeo, chosenMat);
        subMesh.name = `${prefabName}_Face_${matIdx}`;
        subMesh.userData = { partId: `${prefabName}_face_${matIdx}` };
        prefabGroup.add(subMesh);
      });
    } else {
      const cleanGeo = baseGeo.clone();
      cleanGeo.clearGroups();
      const cleanMat = normalizeMaterialForGlb(primaryMat, `${prefabName}_Mat`);
      bakeUVRepeatOnGeometryAndMaterial(cleanGeo, cleanMat);
      const mesh = new THREE.Mesh(cleanGeo, cleanMat);
      mesh.name = prefabName;
      mesh.userData = { partId: `${prefabName}_main` };
      prefabGroup.add(mesh);
    }
  } else {
    const cleanGeo = baseGeo.clone();
    cleanGeo.clearGroups();
    const cleanMat = normalizeMaterialForGlb(sourceMesh.material, `${prefabName}_Mat`);
    bakeUVRepeatOnGeometryAndMaterial(cleanGeo, cleanMat);
    if (cleanMat.color) {
      colorHex = `#${cleanMat.color.getHexString()}`;
    }
    if (cleanMat.map) {
      const extracted = extractTextureToPngDataUrl(cleanMat.map);
      if (extracted) thumbnailDataUrl = extracted.dataUrl;
    }
    const mesh = new THREE.Mesh(cleanGeo, cleanMat);
    mesh.name = prefabName;
    mesh.userData = { partId: `${prefabName}_main` };
    prefabGroup.add(mesh);
  }

  return {
    prefabGroup,
    dimensions: [
      Number(Math.max(0.01, size.x).toFixed(2)),
      Number(Math.max(0.01, size.y).toFixed(2)),
      Number(Math.max(0.01, size.z).toFixed(2)),
    ],
    colorHex,
    thumbnailDataUrl,
  };
}

/**
 * Computes a deterministic signature from a Mesh's local dimensions + material/texture properties
 * so repeated props across the scene are automatically grouped into single Unity Prefabs.
 */
function computePropSignature(
  mesh: THREE.Mesh,
  textureSignatureMap: Map<THREE.Texture, string>
): { signature: string; baseLabel: string } {
  mesh.geometry.computeBoundingBox();
  const bb = mesh.geometry.boundingBox || new THREE.Box3();
  const localSize = new THREE.Vector3();
  bb.getSize(localSize);

  const worldScale = new THREE.Vector3();
  mesh.matrixWorld.decompose(new THREE.Vector3(), new THREE.Quaternion(), worldScale);

  const sx = Math.abs(localSize.x * (worldScale.x || 1));
  const sy = Math.abs(localSize.y * (worldScale.y || 1));
  const sz = Math.abs(localSize.z * (worldScale.z || 1));

  // Sort horizontal X/Z so 90-degree rotated instances match the same prefab signature
  const hMin = Math.round(Math.min(sx, sz) * 20) / 20;
  const hMax = Math.round(Math.max(sx, sz) * 20) / 20;
  const vH = Math.round(sy * 20) / 20;
  const sizeKey = `${hMin.toFixed(2)}x${vH.toFixed(2)}x${hMax.toFixed(2)}`;

  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const matParts: string[] = [];

  for (const m of mats) {
    if (!m) continue;
    const anyM = m as any;
    const col = anyM.color instanceof THREE.Color ? anyM.color.getHexString() : 'ffffff';
    const emi = anyM.emissive instanceof THREE.Color ? anyM.emissive.getHexString() : '000000';
    let texId = 'notex';
    if (anyM.map) {
      if (!textureSignatureMap.has(anyM.map)) {
        const extracted = extractTextureToPngDataUrl(anyM.map);
        const hash = extracted
          ? `${extracted.width}x${extracted.height}_${extracted.dataUrl.slice(-48)}`
          : `tex_${textureSignatureMap.size + 1}`;
        textureSignatureMap.set(anyM.map, hash);
      }
      texId = textureSignatureMap.get(anyM.map)!;
    }
    matParts.push(`${col}_${emi}_${texId}`);
  }

  const rawName = (mesh.name || mesh.parent?.name || 'Prop')
    .replace(/[_-]?\d+$/g, '')
    .replace(/[_-]+/g, ' ')
    .trim();
  const baseLabel = rawName && rawName.toLowerCase() !== 'scene' ? rawName : `Prop ${sizeKey}m`;

  return {
    signature: `${sizeKey}__${matParts.join('|')}`,
    baseLabel,
  };
}

/**
 * Executes a Three.js HTML/JS snippet inside an isolated capture sandbox and builds:
 * - Full 1:1 original scale `.GLB` scene group (never shrinking meshes to 2.8m)
 * - Automatic vertex UV repeat baking (`bakeUVRepeatOnGeometryAndMaterial`)
 * - Categorized nodes (`architecture`, `prop`, `billboard`, `light`) for `{ onlyVisible: true }` GLB export toggles
 * - Unity Export Suite data:
 *   1. Deduplicated Individual Prefabs (`.GLB`) with pivot recalculated at `(X: 0, Y: base 0, Z: 0)`
 *   2. Extracted `.PNG` Textures & Sprites (`material.map`, `emissiveMap`, `SpriteMaterial.map`)
 *   3. Scene Lights & Transforms (`.JSON`) converted to Unity's Left-Handed coordinate system
 */
export async function parseThreeJsHtmlTo3D(
  htmlContent: string,
  customTitle?: string,
  options: HtmlConversionOptions = {}
): Promise<HtmlConversionResult> {
  const {
    centerOnGround = true,
    includeEnvironmentMeshes = false,
    includePropsDetails = true,
    includeBillboardsSprites = true,
    includeSceneLights = true,
  } = options;

  const warnings: string[] = [];
  const { title: extractedTitle, scripts } = extractScriptsFromHtml(htmlContent);
  const finalTitle = (customTitle && customTitle.trim()) || extractedTitle || 'Three.js Scene';

  if (scripts.length === 0) {
    throw new Error(
      'No JavaScript or <script> tags found in the provided HTML. Please upload an HTML file containing a Three.js scene.'
    );
  }

  const capturedScenes: THREE.Scene[] = [];
  const capturedGroups: THREE.Group[] = [];
  const capturedMeshes: THREE.Mesh[] = [];
  const capturedSprites: THREE.Sprite[] = [];
  const capturedLights: THREE.Light[] = [];
  let renderedScene: THREE.Object3D | null = null;

  // Hook THREE.Object3D.prototype.add globally during execution
  const origObject3DAdd = THREE.Object3D.prototype.add;
  THREE.Object3D.prototype.add = function (...objects: THREE.Object3D[]) {
    if ((this as any).isScene && !capturedScenes.includes(this as THREE.Scene)) {
      capturedScenes.push(this as THREE.Scene);
    } else if (
      (this as any).isGroup &&
      !this.parent &&
      !capturedGroups.includes(this as THREE.Group)
    ) {
      capturedGroups.push(this as THREE.Group);
    }

    for (const obj of objects) {
      if (!obj) continue;
      if ((obj as any).isLight && !capturedLights.includes(obj as THREE.Light)) {
        capturedLights.push(obj as THREE.Light);
      }
      if ((obj as any).isSprite && !capturedSprites.includes(obj as THREE.Sprite)) {
        capturedSprites.push(obj as THREE.Sprite);
      }
      if ((obj as any).isMesh && !capturedMeshes.includes(obj as THREE.Mesh)) {
        capturedMeshes.push(obj as THREE.Mesh);
      }
      if (typeof obj.traverse === 'function') {
        obj.traverse((child) => {
          if ((child as any).isLight && !capturedLights.includes(child as THREE.Light)) {
            capturedLights.push(child as THREE.Light);
          }
          if ((child as any).isSprite && !capturedSprites.includes(child as THREE.Sprite)) {
            capturedSprites.push(child as THREE.Sprite);
          }
          if ((child as any).isMesh && !capturedMeshes.includes(child as THREE.Mesh)) {
            capturedMeshes.push(child as THREE.Mesh);
          }
        });
      }
    }
    return origObject3DAdd.apply(this, objects);
  };

  const OriginalScene = THREE.Scene;
  const OriginalGroup = THREE.Group;
  const OriginalMesh = THREE.Mesh;
  const OriginalInstancedMesh = THREE.InstancedMesh;
  const OriginalSprite = THREE.Sprite;

  class TrackedScene extends OriginalScene {
    constructor() {
      super();
      if (!capturedScenes.includes(this)) {
        capturedScenes.push(this);
      }
    }
  }

  class TrackedGroup extends OriginalGroup {
    constructor() {
      super();
      if (!capturedGroups.includes(this)) {
        capturedGroups.push(this);
      }
    }
  }

  class TrackedMesh extends OriginalMesh {
    constructor(
      geometry?: THREE.BufferGeometry,
      material?: THREE.Material | THREE.Material[]
    ) {
      super(geometry, material);
      if (!capturedMeshes.includes(this)) {
        capturedMeshes.push(this);
      }
    }
  }

  class TrackedInstancedMesh extends OriginalInstancedMesh {
    constructor(
      geometry: THREE.BufferGeometry | undefined,
      material: THREE.Material | THREE.Material[] | undefined,
      count: number
    ) {
      super(geometry, material, count);
      if (!capturedMeshes.includes(this as unknown as THREE.Mesh)) {
        capturedMeshes.push(this as unknown as THREE.Mesh);
      }
    }
  }

  class TrackedSprite extends OriginalSprite {
    constructor(material?: THREE.SpriteMaterial) {
      super(material);
      if (!capturedSprites.includes(this)) {
        capturedSprites.push(this);
      }
    }
  }

  class SandboxWebGLRenderer {
    domElement: HTMLCanvasElement;
    shadowMap = {
      enabled: true,
      type: THREE.PCFSoftShadowMap,
      autoUpdate: true,
      needsUpdate: false,
    };
    capabilities = {
      getMaxAnisotropy: () => 8,
      isWebGL2: true,
      precision: 'highp',
      maxTextures: 16,
      maxVertexTextures: 16,
      maxTextureSize: 4096,
      maxCubemapSize: 4096,
    };
    outputColorSpace = THREE.SRGBColorSpace;
    toneMapping = THREE.ACESFilmicToneMapping;
    toneMappingExposure = 1.0;
    info = {
      render: { calls: 0, triangles: 0, frame: 0 },
      memory: { geometries: 0, textures: 0 },
    };

    constructor(params?: { canvas?: HTMLCanvasElement }) {
      this.domElement = params?.canvas || document.createElement('canvas');
      this.domElement.width = 1024;
      this.domElement.height = 768;
    }
    setSize(w: number, h: number) {
      this.domElement.width = w;
      this.domElement.height = h;
    }
    setViewport() {}
    setScissor() {}
    setScissorTest() {}
    setPixelRatio() {}
    setClearColor() {}
    setClearAlpha() {}
    clear() {}
    clearDepth() {}
    setAnimationLoop(cb: ((time: number) => void) | null) {
      if (typeof cb === 'function') {
        try {
          cb(16.67);
        } catch {
          // ignore single tick error
        }
      }
    }
    render(scene: THREE.Object3D, _camera?: THREE.Camera) {
      if (scene) {
        renderedScene = scene;
        if ((scene as any).isScene && !capturedScenes.includes(scene as THREE.Scene)) {
          capturedScenes.push(scene as THREE.Scene);
        }
      }
    }
    compile() {}
    dispose() {}
    getContext() {
      return {
        getExtension: () => null,
        getParameter: () => 'WebGL 2.0',
        fenceSync: () => ({}),
        flush: () => {},
        getSyncParameter: () => 0x9119,
        deleteSync: () => {},
      };
    }
  }

  class SandboxPMREMGenerator {
    constructor() {}
    fromScene() {
      return { texture: new THREE.Texture(), dispose: () => {} };
    }
    fromEquirectangular() {
      return { texture: new THREE.Texture(), dispose: () => {} };
    }
    compileEquirectangularShader() {}
    dispose() {}
  }

  class SandboxOrbitControls {
    target = new THREE.Vector3();
    enableDamping = true;
    dampingFactor = 0.05;
    autoRotate = false;
    autoRotateSpeed = 1.0;
    minDistance = 0.1;
    maxDistance = 1000;
    maxPolarAngle = Math.PI;
    minPolarAngle = 0;
    enableZoom = true;
    enablePan = true;
    enabled = true;
    constructor() {}
    update() {
      return false;
    }
    addEventListener() {}
    removeEventListener() {}
    dispose() {}
  }

  const sandboxThree: Record<string, any> = Object.assign({}, THREE, {
    Scene: TrackedScene,
    Group: TrackedGroup,
    Mesh: TrackedMesh,
    InstancedMesh: TrackedInstancedMesh,
    Sprite: TrackedSprite,
    WebGLRenderer: SandboxWebGLRenderer,
    PMREMGenerator: SandboxPMREMGenerator,
    OrbitControls: SandboxOrbitControls,
  });

  const sandboxAddons: Record<string, any> = {
    OrbitControls: SandboxOrbitControls,
    RoomEnvironment,
  };

  const dummyContainer = document.createElement('div');
  dummyContainer.style.width = '1024px';
  dummyContainer.style.height = '768px';
  Object.defineProperty(dummyContainer, 'clientWidth', { value: 1024 });
  Object.defineProperty(dummyContainer, 'clientHeight', { value: 768 });

  const dummyCanvas = document.createElement('canvas');
  dummyCanvas.width = 1024;
  dummyCanvas.height = 768;
  dummyContainer.appendChild(dummyCanvas);

  const lifecycleCallbacks: Array<() => void> = [];

  const createDummyElement = (idOrSelector: string) => {
    if (idOrSelector.toLowerCase().includes('canvas')) return dummyCanvas;
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientWidth', { value: 1024 });
    Object.defineProperty(el, 'clientHeight', { value: 768 });
    Object.defineProperty(el, 'offsetWidth', { value: 1024 });
    Object.defineProperty(el, 'offsetHeight', { value: 768 });
    return el;
  };

  const docProxy = new Proxy(document, {
    get(target, prop) {
      if (prop === 'readyState') return 'complete';
      if (prop === 'body' || prop === 'documentElement') {
        return {
          appendChild: (child: any) => child,
          removeChild: (child: any) => child,
          insertBefore: (child: any) => child,
          prepend: () => {},
          style: {},
          clientWidth: 1024,
          clientHeight: 768,
          offsetWidth: 1024,
          offsetHeight: 768,
          addEventListener: () => {},
          removeEventListener: () => {},
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
            width: 1024,
            height: 768,
            right: 1024,
            bottom: 768,
          }),
          classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
        };
      }
      if (prop === 'getElementById') {
        return (id: string) => createDummyElement(id || '');
      }
      if (prop === 'querySelector') {
        return (sel: string) => createDummyElement(sel || '');
      }
      if (prop === 'querySelectorAll') {
        return () => [];
      }
      if (prop === 'createElement') {
        return (tag: string) => {
          const el = document.createElement(tag);
          if (tag.toLowerCase() === 'canvas') {
            (el as HTMLCanvasElement).width = 512;
            (el as HTMLCanvasElement).height = 512;
          }
          return el;
        };
      }
      if (prop === 'addEventListener') {
        return (event: string, handler: any) => {
          if (
            (event === 'DOMContentLoaded' || event === 'load' || event === 'readystatechange') &&
            typeof handler === 'function'
          ) {
            lifecycleCallbacks.push(() => handler(new Event(event)));
          }
        };
      }
      const val = (target as any)[prop];
      return typeof val === 'function' ? val.bind(target) : val;
    },
    set(target, prop, value) {
      if (prop === 'onload' && typeof value === 'function') {
        lifecycleCallbacks.push(() => value(new Event('load')));
        return true;
      }
      (target as any)[prop] = value;
      return true;
    },
  });

  let rafExecutedCount = 0;
  const sandboxRequestAnimationFrame = (cb: FrameRequestCallback): number => {
    if (rafExecutedCount < 2 && typeof cb === 'function') {
      rafExecutedCount++;
      try {
        cb(16.67 * rafExecutedCount);
      } catch {
        // ignore animation error
      }
    }
    return rafExecutedCount;
  };

  const customWinState: Record<string, any> = {};

  const winProxy = new Proxy(window, {
    get(target, prop) {
      if (prop in customWinState) return customWinState[prop as string];
      if (prop === 'THREE') return sandboxThree;
      if (prop === 'OrbitControls') return SandboxOrbitControls;
      if (prop === 'bakeUVRepeat') return bakeUVRepeat;
      if (prop === 'document') return docProxy;
      if (prop === 'innerWidth') return 1024;
      if (prop === 'innerHeight') return 768;
      if (prop === 'devicePixelRatio') return 1;
      if (prop === 'requestAnimationFrame') return sandboxRequestAnimationFrame;
      if (prop === 'cancelAnimationFrame') return () => {};
      if (prop === 'setInterval') return () => 0;
      if (prop === 'setTimeout') {
        return (fn: any, delay?: number) => {
          if (typeof fn === 'function' && (!delay || delay <= 250)) {
            lifecycleCallbacks.push(() => fn());
          }
          return 0;
        };
      }
      if (prop === 'addEventListener') {
        return (event: string, handler: any) => {
          if (
            (event === 'load' || event === 'DOMContentLoaded') &&
            typeof handler === 'function'
          ) {
            lifecycleCallbacks.push(() => handler(new Event(event)));
          }
        };
      }
      const val = (target as any)[prop];
      return typeof val === 'function' ? val.bind(target) : val;
    },
    set(_target, prop, value) {
      customWinState[prop as string] = value;
      if ((prop === 'onload' || prop === 'onpageshow') && typeof value === 'function') {
        lifecycleCallbacks.push(() => value(new Event('load')));
      }
      return true;
    },
  });

  try {
    let combinedSource = scripts.map(transformThreeJsCodeForSandbox).join('\n;\n');

    if (!/\b(?:const|let|var)\s+THREE\b/.test(combinedSource)) {
      combinedSource = `const THREE = __THREE__;\n` + combinedSource;
    }
    if (!/\b(?:const|let|var)\s+\{?\s*OrbitControls\b/.test(combinedSource)) {
      combinedSource = `const OrbitControls = __ADDONS__.OrbitControls;\n` + combinedSource;
    }

    const runner = new Function(
      '__THREE__',
      '__ADDONS__',
      'window',
      'self',
      'globalThis',
      'document',
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'setTimeout',
      'setInterval',
      combinedSource
    );

    runner(
      sandboxThree,
      sandboxAddons,
      winProxy,
      winProxy,
      winProxy,
      docProxy,
      sandboxRequestAnimationFrame,
      () => {},
      winProxy.setTimeout,
      () => 0
    );

    let safetyCounter = 0;
    while (lifecycleCallbacks.length > 0 && safetyCounter < 25) {
      safetyCounter++;
      const cb = lifecycleCallbacks.shift()!;
      try {
        cb();
      } catch (cbErr: any) {
        warnings.push(`Onload callback note: ${cbErr?.message || String(cbErr)}`);
      }
    }
  } catch (err: any) {
    warnings.push(`Script execution note: ${err?.message || String(err)}`);
  } finally {
    THREE.Object3D.prototype.add = origObject3DAdd;
  }

  const rootScene: THREE.Object3D | null =
    renderedScene ||
    (capturedScenes.length > 0 ? capturedScenes[capturedScenes.length - 1] : null) ||
    (customWinState.scene instanceof THREE.Object3D ? customWinState.scene : null);

  const rawMeshes: THREE.Mesh[] = [];
  const sourcePropsForPrefabs: Array<{
    mesh: THREE.Mesh;
    category: 'prop' | 'billboard';
    worldPos: THREE.Vector3;
    worldRotEuler: THREE.Euler;
    worldScale: THREE.Vector3;
  }> = [];
  const rawLights: THREE.Light[] = [];

  const visitedSourceNodes = new Set<THREE.Object3D>();
  const extractedTexturesMap = new Map<string, UnityTextureItem>();

  const registerTextureFromMaterial = (
    tex: THREE.Texture | undefined | null,
    slot: 'map' | 'emissiveMap' | 'sprite',
    meshName: string
  ) => {
    if (!tex) return;
    const pngInfo = extractTextureToPngDataUrl(tex);
    if (!pngInfo) return;

    // Deduplicate by PNG content signature
    const key = `${slot}_${pngInfo.width}x${pngInfo.height}_${pngInfo.dataUrl.slice(-64)}`;
    if (extractedTexturesMap.has(key)) {
      const existing = extractedTexturesMap.get(key)!;
      if (meshName && !existing.usedByMeshes.includes(meshName)) {
        existing.usedByMeshes.push(meshName);
      }
      return;
    }

    const idx = extractedTexturesMap.size + 1;
    const cleanBase = (tex.name || meshName || `texture_${idx}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    const slotSuffix = slot === 'emissiveMap' ? 'emissive' : slot === 'sprite' ? 'sprite' : 'albedo';
    const filename = `${cleanBase || `tex_${idx}`}_${slotSuffix}.png`;

    extractedTexturesMap.set(key, {
      id: `tex_${idx}`,
      name: `${meshName || `Asset ${idx}`} (${slot === 'emissiveMap' ? 'Emissive' : slot === 'sprite' ? '2.5D Sprite' : 'Albedo'})`,
      filename,
      slot,
      width: pngInfo.width,
      height: pngInfo.height,
      dataUrl: pngInfo.dataUrl,
      usedByMeshes: meshName ? [meshName] : [],
    });
  };

  // Convert THREE.Sprite to a vertical plane Mesh so GLTFExporter can export 2.5D sprites natively
  const processSpriteNode = (sprite: THREE.Sprite) => {
    if (visitedSourceNodes.has(sprite)) return;
    visitedSourceNodes.add(sprite);

    sprite.updateMatrix();
    sprite.updateMatrixWorld(true);

    const spriteMat = sprite.material;
    const mapTex = spriteMat?.map || null;
    const spriteName = sprite.name || `Billboard_Sprite_${rawMeshes.length + 1}`;
    if (mapTex) {
      registerTextureFromMaterial(mapTex, 'sprite', spriteName);
    }

    const planeGeo = new THREE.PlaneGeometry(1, 1);
    planeGeo.applyMatrix4(sprite.matrixWorld);
    planeGeo.computeVertexNormals();

    const stdMat = normalizeMaterialForGlb(
      new THREE.MeshStandardMaterial({
        name: `${spriteName}_Mat`,
        map: mapTex,
        color: spriteMat?.color ? spriteMat.color.clone() : new THREE.Color(0xffffff),
        transparent: true,
        opacity: spriteMat?.opacity ?? 1,
        alphaTest: 0.05,
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      `${spriteName}_Mat`
    );
    bakeUVRepeatOnGeometryAndMaterial(planeGeo, stdMat);

    const bakedSpriteMesh = new THREE.Mesh(planeGeo, stdMat);
    bakedSpriteMesh.name = spriteName;
    bakedSpriteMesh.userData = {
      isConvertedSprite: true,
      unityCategory: 'billboard' as UnityNodeCategory,
    };
    rawMeshes.push(bakedSpriteMesh);

    const worldPos = new THREE.Vector3();
    const worldQuat = new THREE.Quaternion();
    const worldScale = new THREE.Vector3();
    sprite.matrixWorld.decompose(worldPos, worldQuat, worldScale);
    const localPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), stdMat);
    localPlane.name = spriteName;
    localPlane.matrixWorld.copy(sprite.matrixWorld);

    sourcePropsForPrefabs.push({
      mesh: localPlane,
      category: 'billboard',
      worldPos,
      worldRotEuler: new THREE.Euler().setFromQuaternion(worldQuat),
      worldScale,
    });
  };

  const processMeshNode = (obj: THREE.Mesh) => {
    if (visitedSourceNodes.has(obj) || !obj.geometry || (obj as any).isLight) return;
    visitedSourceNodes.add(obj);

    if (!includeEnvironmentMeshes && isLikelyEnvironmentBackdrop(obj)) {
      return;
    }

    obj.updateMatrix();
    obj.updateMatrixWorld(true);

    const posAttr = obj.geometry.getAttribute('position');
    if (!posAttr || posAttr.count === 0) return;

    // Measure world bounding box of this object to classify ('architecture' | 'prop' | 'billboard')
    const worldGeoProbe = obj.geometry.clone();
    worldGeoProbe.applyMatrix4(obj.matrixWorld);
    worldGeoProbe.computeBoundingBox();
    const worldSize = new THREE.Vector3();
    if (worldGeoProbe.boundingBox) {
      worldGeoProbe.boundingBox.getSize(worldSize);
    }

    const unityCategory = classifyMeshForUnity(obj, worldSize);
    const meshLabel = obj.name || obj.parent?.name || `Mesh_${rawMeshes.length + 1}`;

    // Register textures for Unity Export Suite (.PNG extractor)
    const matList = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const m of matList) {
      if (!m) continue;
      const anyM = m as any;
      if (anyM.map) {
        registerTextureFromMaterial(
          anyM.map,
          unityCategory === 'billboard' ? 'sprite' : 'map',
          meshLabel
        );
      }
      if (anyM.emissiveMap) {
        registerTextureFromMaterial(anyM.emissiveMap, 'emissiveMap', meshLabel);
      }
    }

    // Track prop/billboard for Individual Prefab grouping
    if (unityCategory === 'prop' || unityCategory === 'billboard') {
      const worldPos = new THREE.Vector3();
      const worldQuat = new THREE.Quaternion();
      const worldScale = new THREE.Vector3();
      obj.matrixWorld.decompose(worldPos, worldQuat, worldScale);
      sourcePropsForPrefabs.push({
        mesh: obj,
        category: unityCategory,
        worldPos,
        worldRotEuler: new THREE.Euler().setFromQuaternion(worldQuat),
        worldScale,
      });
    }

    // Handle multi-material arrays on a single THREE.Mesh
    if (Array.isArray(obj.material)) {
      const mats = obj.material;
      const groups = obj.geometry.groups;

      const uniqueMats = new Set(mats.filter(Boolean));
      if (groups && groups.length > 0 && uniqueMats.size > 1) {
        const indicesByMat = new Map<number, number[]>();
        const indexAttr = obj.geometry.getIndex();

        for (const grp of groups) {
          const matIdx = Math.min(grp.materialIndex ?? 0, mats.length - 1);
          if (!indicesByMat.has(matIdx)) {
            indicesByMat.set(matIdx, []);
          }
          const list = indicesByMat.get(matIdx)!;
          const end = grp.start + grp.count;
          for (let i = grp.start; i < end; i++) {
            list.push(indexAttr ? indexAttr.getX(i) : i);
          }
        }

        if (indicesByMat.size > 1) {
          indicesByMat.forEach((vertIndices, matIdx) => {
            if (vertIndices.length === 0) return;
            const subGeo = obj.geometry.clone();
            subGeo.clearGroups();
            subGeo.setIndex(vertIndices);
            subGeo.applyMatrix4(obj.matrixWorld);
            if (!subGeo.attributes.normal) {
              subGeo.computeVertexNormals();
            }

            const chosenMat = mats[matIdx] || mats[4] || mats[0];
            const cleanMat = normalizeMaterialForGlb(
              chosenMat,
              `${obj.name || 'Mesh'}_Face_${matIdx}`
            );
            bakeUVRepeatOnGeometryAndMaterial(subGeo, cleanMat);

            const bakedSubMesh = new THREE.Mesh(subGeo, cleanMat);
            bakedSubMesh.name = obj.name
              ? `${obj.name}_Face_${matIdx}`
              : `Scene_Mesh_Face_${matIdx}`;
            bakedSubMesh.castShadow = true;
            bakedSubMesh.receiveShadow = true;
            bakedSubMesh.userData = {
              unityCategory,
            };
            rawMeshes.push(bakedSubMesh);
          });
          return;
        }
      }

      const primaryMaterial = mats[4] || mats[0];
      const clonedGeo = obj.geometry.clone();
      clonedGeo.clearGroups();
      clonedGeo.applyMatrix4(obj.matrixWorld);
      if (!clonedGeo.attributes.normal) {
        clonedGeo.computeVertexNormals();
      }
      const cleanMat = normalizeMaterialForGlb(
        primaryMaterial,
        `${obj.name || 'Part'}_Mat`
      );
      bakeUVRepeatOnGeometryAndMaterial(clonedGeo, cleanMat);

      const bakedMesh = new THREE.Mesh(clonedGeo, cleanMat);
      bakedMesh.name = obj.name || '';
      bakedMesh.castShadow = true;
      bakedMesh.receiveShadow = true;
      bakedMesh.userData = { unityCategory };
      rawMeshes.push(bakedMesh);
      return;
    }

    // Standard single-material Mesh
    const clonedGeo = obj.geometry.clone();
    clonedGeo.clearGroups();
    clonedGeo.applyMatrix4(obj.matrixWorld);
    if (!clonedGeo.attributes.normal) {
      clonedGeo.computeVertexNormals();
    }

    const cleanMat = normalizeMaterialForGlb(obj.material, `${obj.name || 'Part'}_Mat`);
    bakeUVRepeatOnGeometryAndMaterial(clonedGeo, cleanMat);

    const bakedMesh = new THREE.Mesh(clonedGeo, cleanMat);
    bakedMesh.name = obj.name || '';
    bakedMesh.castShadow = true;
    bakedMesh.receiveShadow = true;
    bakedMesh.userData = { unityCategory };
    rawMeshes.push(bakedMesh);
  };

  const collectFromObject = (root: THREE.Object3D) => {
    root.updateMatrixWorld(true);
    root.traverse((obj) => {
      if ((obj as any).isLight) {
        if (!visitedSourceNodes.has(obj)) {
          visitedSourceNodes.add(obj);
          obj.updateMatrixWorld(true);
          rawLights.push(obj as THREE.Light);
        }
        return;
      }

      if ((obj as any).isSprite || obj instanceof THREE.Sprite) {
        processSpriteNode(obj as THREE.Sprite);
        return;
      }

      if (obj instanceof THREE.InstancedMesh) {
        if (!visitedSourceNodes.has(obj)) {
          visitedSourceNodes.add(obj);
          const expanded = expandInstancedMesh(obj);
          expanded.forEach((m) => processMeshNode(m));
        }
      } else if (obj instanceof THREE.Mesh) {
        processMeshNode(obj);
      }
    });
  };

  if (rootScene) {
    collectFromObject(rootScene);
  }

  for (const sc of capturedScenes) {
    collectFromObject(sc);
  }

  for (const grp of capturedGroups) {
    collectFromObject(grp);
  }

  if (rawMeshes.length === 0 && capturedMeshes.length > 0) {
    for (const m of capturedMeshes) {
      collectFromObject(m);
    }
  }

  for (const sp of capturedSprites) {
    processSpriteNode(sp);
  }

  for (const lt of capturedLights) {
    if (!visitedSourceNodes.has(lt)) {
      visitedSourceNodes.add(lt);
      lt.updateMatrixWorld(true);
      rawLights.push(lt);
    }
  }

  if (rawMeshes.length === 0) {
    throw new Error(
      'No 3D meshes (THREE.Mesh) were found in the HTML file. Make sure your code creates Three.js geometries and meshes.'
    );
  }

  // Assemble the extracted group in 1:1 original world scale (meters)
  const outputGroup = new THREE.Group();
  outputGroup.name = finalTitle.replace(/[^a-zA-Z0-9_-]/g, '_');

  const rawBox = new THREE.Box3();
  for (const m of rawMeshes) {
    m.geometry.computeBoundingBox();
    if (m.geometry.boundingBox) {
      rawBox.union(m.geometry.boundingBox);
    }
  }

  const rawCenter = new THREE.Vector3();
  const rawSize = new THREE.Vector3();
  rawBox.getCenter(rawCenter);
  rawBox.getSize(rawSize);

  const sceneOffset = new THREE.Vector3(
    -rawCenter.x,
    centerOnGround ? -rawBox.min.y : -rawCenter.y,
    -rawCenter.z
  );

  // Guaranteed 1:1 original vertex scale in meters (never normalized/shrunk to 2.8m)
  const parts: Part3D[] = [];
  let totalTriangles = 0;
  let totalVertices = 0;

  let architectureMeshesCount = 0;
  let propMeshesCount = 0;
  let billboardSpritesCount = 0;

  rawMeshes.forEach((mesh, idx) => {
    const partId = `html_part_${idx + 1}`;
    const partName =
      mesh.name && mesh.name.trim() ? mesh.name.trim() : `Scene Mesh ${idx + 1}`;
    const unityCategory: UnityNodeCategory =
      (mesh.userData?.unityCategory as UnityNodeCategory) || 'architecture';

    if (unityCategory === 'prop') propMeshesCount++;
    else if (unityCategory === 'billboard') billboardSpritesCount++;
    else architectureMeshesCount++;

    const translation = new THREE.Matrix4().makeTranslation(
      sceneOffset.x,
      sceneOffset.y,
      sceneOffset.z
    );
    mesh.geometry.applyMatrix4(translation);
    mesh.geometry.computeBoundingBox();
    mesh.geometry.computeBoundingSphere();

    const partBox = mesh.geometry.boundingBox!;
    const partCenter = new THREE.Vector3();
    const partSize = new THREE.Vector3();
    partBox.getCenter(partCenter);
    partBox.getSize(partSize);

    // Shift vertices so mesh.position holds the part's real 3D offset in meters
    mesh.geometry.translate(-partCenter.x, -partCenter.y, -partCenter.z);
    mesh.position.copy(partCenter);

    const primaryMat = Array.isArray(mesh.material)
      ? (mesh.material[0] as THREE.MeshStandardMaterial)
      : (mesh.material as THREE.MeshStandardMaterial);

    // Clamp large horizontal floor planes to prevent top-down directional glare
    const isLargeFloorPlane =
      partSize.x >= 8 && partSize.z >= 8 && partSize.y <= Math.max(1.5, partSize.x * 0.08);
    if (isLargeFloorPlane && primaryMat) {
      primaryMat.roughness = Math.max(primaryMat.roughness ?? 0.88, 0.88);
      primaryMat.metalness = Math.min(primaryMat.metalness ?? 0.08, 0.1);
      primaryMat.needsUpdate = true;
    }

    const hexColor =
      primaryMat && primaryMat.color
        ? `#${primaryMat.color.getHexString()}`
        : '#38bdf8';
    const roughness = primaryMat?.roughness ?? 0.5;
    const metalness = primaryMat?.metalness ?? 0.2;
    const emissiveHex =
      primaryMat && primaryMat.emissive && primaryMat.emissive.getHex() !== 0
        ? `#${primaryMat.emissive.getHexString()}`
        : undefined;

    // Apply initial visibility from Unity Export Suite toggles
    if (unityCategory === 'prop') {
      mesh.visible = includePropsDetails;
    } else if (unityCategory === 'billboard') {
      mesh.visible = includeBillboardsSprites;
    } else {
      mesh.visible = true;
    }

    mesh.userData = {
      ...mesh.userData,
      partId,
      partName,
      unityCategory,
      role:
        unityCategory === 'architecture'
          ? 'primary'
          : unityCategory === 'prop'
          ? 'secondary'
          : 'detail',
      originalMaterial: mesh.material,
    };

    outputGroup.add(mesh);

    const posAttr = mesh.geometry.getAttribute('position');
    const indexAttr = mesh.geometry.getIndex();
    const vCount = posAttr ? posAttr.count : 0;
    const tCount = indexAttr ? indexAttr.count / 3 : vCount / 3;

    totalVertices += vCount;
    totalTriangles += tCount;

    parts.push({
      id: partId,
      name: partName,
      role:
        unityCategory === 'architecture'
          ? 'primary'
          : unityCategory === 'prop'
          ? 'secondary'
          : 'detail',
      geometryType: 'box',
      params: {
        width: Number(partSize.x.toFixed(2)),
        height: Number(partSize.y.toFixed(2)),
        depth: Number(partSize.z.toFixed(2)),
      },
      position: [
        Number(partCenter.x.toFixed(3)),
        Number(partCenter.y.toFixed(3)),
        Number(partCenter.z.toFixed(3)),
      ],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      symmetrical: false,
      material: {
        name: primaryMat?.name || `${partName}_Mat`,
        color: hexColor,
        roughness: Number(roughness.toFixed(2)),
        metalness: Number(metalness.toFixed(2)),
        emissive: emissiveHex,
        emissiveIntensity: primaryMat?.emissiveIntensity ?? 1,
      },
    });
  });

  // ============================================================================
  // Process Scene Lights for Unity Export Suite (.JSON & GLTFExporter `{ onlyVisible: true }`)
  // ============================================================================
  const unityLights: UnityLightItem[] = [];
  rawLights.forEach((light, idx) => {
    const worldPos = new THREE.Vector3().setFromMatrixPosition(light.matrixWorld);
    const relPos = worldPos.add(sceneOffset);

    const lightId = `scene_light_${idx + 1}`;
    const lightName = light.name && light.name.trim() ? light.name.trim() : `${light.type || 'Light'}_${idx + 1}`;
    const colorHex = `#${light.color ? light.color.getHexString() : 'ffffff'}`;
    const intensity = Number((light.intensity ?? 1).toFixed(3));
    const range = Number(((light as any).distance ?? 10).toFixed(3));

    // Convert Three.js Right-Handed (X, Y, Z) to Unity Left-Handed coordinate system (-X, Y, Z)
    const unityPos = {
      x: cleanZero(-relPos.x),
      y: cleanZero(relPos.y),
      z: cleanZero(relPos.z),
    };
    const threePos = {
      x: cleanZero(relPos.x),
      y: cleanZero(relPos.y),
      z: cleanZero(relPos.z),
    };

    unityLights.push({
      id: lightId,
      name: lightName,
      type: light.type || 'PointLight',
      colorHex,
      intensity,
      range,
      decay: typeof (light as any).decay === 'number' ? (light as any).decay : undefined,
      angleDeg:
        typeof (light as any).angle === 'number'
          ? Number(THREE.MathUtils.radToDeg((light as any).angle).toFixed(1))
          : undefined,
      position: unityPos,
      threeJsPosition: threePos,
    });

    // Attach cloned light node to outputGroup so GLTFExporter `{ onlyVisible: true }` includes/excludes it via `light.visible`
    const clonedLight = light.clone();
    clonedLight.name = lightName;
    clonedLight.position.copy(relPos);
    clonedLight.visible = includeSceneLights;
    clonedLight.userData = {
      unityCategory: 'light' as UnityNodeCategory,
      exportIntensity: intensity,
      lightId,
    };
    outputGroup.add(clonedLight);
  });

  // ============================================================================
  // Group Repeated Props by Size + Texture Signature for Individual Prefabs (.GLB)
  // ============================================================================
  const textureSignatureMap = new Map<THREE.Texture, string>();
  const prefabGroupsMap = new Map<
    string,
    {
      baseLabel: string;
      category: 'prop' | 'billboard';
      sourceMesh: THREE.Mesh;
      instances: UnityPrefabItem['instances'];
    }
  >();

  for (const item of sourcePropsForPrefabs) {
    const { signature, baseLabel } = computePropSignature(item.mesh, textureSignatureMap);
    const relPos = item.worldPos.clone().add(sceneOffset);
    const instanceRecord = {
      name: item.mesh.name || baseLabel,
      unityPosition: {
        x: cleanZero(-relPos.x),
        y: cleanZero(relPos.y),
        z: cleanZero(relPos.z),
      },
      unityRotationEulerDeg: {
        x: cleanZero(THREE.MathUtils.radToDeg(item.worldRotEuler.x)),
        y: cleanZero(-THREE.MathUtils.radToDeg(item.worldRotEuler.y)),
        z: cleanZero(-THREE.MathUtils.radToDeg(item.worldRotEuler.z)),
      },
      scale: {
        x: cleanZero(item.worldScale.x),
        y: cleanZero(item.worldScale.y),
        z: cleanZero(item.worldScale.z),
      },
    };

    if (!prefabGroupsMap.has(signature)) {
      prefabGroupsMap.set(signature, {
        baseLabel,
        category: item.category,
        sourceMesh: item.mesh,
        instances: [instanceRecord],
      });
    } else {
      prefabGroupsMap.get(signature)!.instances.push(instanceRecord);
    }
  }

  const unityPrefabs: UnityPrefabItem[] = [];
  let prefabIndex = 1;
  prefabGroupsMap.forEach((entry, signature) => {
    const cleanPrefabName =
      entry.baseLabel && entry.baseLabel !== 'Part'
        ? entry.baseLabel
        : `Prefab_Prop_${prefabIndex}`;
    const built = buildOriginPivotPrefabGroup(entry.sourceMesh, cleanPrefabName);

    unityPrefabs.push({
      id: `prefab_${prefabIndex}`,
      name: cleanPrefabName,
      signature,
      count: entry.instances.length,
      dimensions: built.dimensions,
      category: entry.category,
      thumbnailDataUrl: built.thumbnailDataUrl,
      colorHex: built.colorHex,
      prefabGroup: built.prefabGroup,
      instances: entry.instances,
    });
    prefabIndex++;
  });

  // Sort prefabs so most-repeated props appear first
  unityPrefabs.sort((a, b) => b.count - a.count);

  const unitySuite: UnityExportSuiteData = {
    prefabs: unityPrefabs,
    textures: Array.from(extractedTexturesMap.values()),
    lights: unityLights,
    counts: {
      architectureMeshes: architectureMeshesCount,
      propMeshes: propMeshesCount,
      billboardSprites: billboardSpritesCount,
      sceneLights: unityLights.length,
    },
  };

  // Compute dimensions from visible mesh geometry only
  const finalBox = new THREE.Box3();
  for (const m of rawMeshes) {
    const b = new THREE.Box3().setFromObject(m);
    finalBox.union(b);
  }
  const finalSize = new THREE.Vector3();
  finalBox.getSize(finalSize);

  const estimatedGlbKb = Math.max(
    12,
    Math.round((totalVertices * 42 + totalTriangles * 6) / 1024)
  );

  const stats: ViewportStats = {
    triangles: Math.round(totalTriangles),
    vertices: totalVertices,
    drawCalls: rawMeshes.length,
    dimensions: {
      x: Number(finalSize.x.toFixed(2)),
      y: Number(finalSize.y.toFixed(2)),
      z: Number(finalSize.z.toFixed(2)),
    },
    estimatedGlbKb,
  };

  const blueprint: Model3DBlueprint = {
    id: `html_3d_${Date.now()}`,
    title: finalTitle,
    category: 'architecture',
    description: `Extracted from Three.js HTML scene at 1:1 meter scale (${rawMeshes.length} meshes, ${unityPrefabs.length} prefab types, ${unitySuite.textures.length} textures, ${unityLights.length} lights).`,
    lore: 'Converted directly from client-side Three.js HTML code into a Unity-ready 1:1 binary .GLB asset.',
    gameGenre: 'Unity 3D / Universal Engine Asset',
    targetPolyTier: totalTriangles > 15000 ? 'high' : totalTriangles > 3000 ? 'mid' : 'low',
    suggestedScale: '1 unit = 1 meter (1:1 Original Scale)',
    collisionHull: {
      type: 'box',
      dimensions: [
        Number(Math.max(0.2, finalSize.x).toFixed(2)),
        Number(Math.max(0.2, finalSize.y).toFixed(2)),
        Number(Math.max(0.2, finalSize.z).toFixed(2)),
      ],
      offset: [0, Number((finalSize.y / 2).toFixed(2)), 0],
    },
    sockets: [
      {
        name: 'root_origin',
        position: [0, 0, 0],
        purpose: 'Ground Pivot Origin',
      },
      {
        name: 'top_mount',
        position: [0, Number(finalSize.y.toFixed(2)), 0],
        purpose: 'Top Attachment Point',
      },
    ],
    parts,
    createdAt: new Date().toISOString(),
    sourceType: 'html',
    sourceHtml: htmlContent,
    customGroup: outputGroup,
    unitySuite,
  };

  return {
    group: outputGroup,
    blueprint,
    stats,
    extractedMeshCount: rawMeshes.length,
    unitySuite,
    warnings,
  };
}
