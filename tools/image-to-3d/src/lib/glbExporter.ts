import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {
  Model3DBlueprint,
  UnityGlbInclusionOptions,
  UnityNodeCategory,
  ViewportStats,
} from '../types/model3d';
import { bakeUVRepeatOnGeometryAndMaterial } from './htmlSceneConverter';

/**
 * Prepares a cloned export group sanitized for `GLTFExporter` with `{ onlyVisible: true }`:
 * - Preserves 1:1 original world scale in meters
 * - Applies Unity Export Suite visibility toggles:
 *   - `includePropsDetails` (`'prop'`)
 *   - `includeBillboardsSprites` (`'billboard'`)
 *   - `includeSceneLights` (`'light'` / `isLight`)
 * - Automatically bakes `texture.repeat` / `texture.offset` directly into geometry UVs (`bakeUVRepeatOnGeometryAndMaterial`)
 * - Resolves multi-material arrays on `THREE.Mesh` (`material[4] || material[0]` or group-mapped)
 */
export function buildSanitizedExportGroup(
  rootGroup: THREE.Group,
  name: string,
  unityInclusion?: UnityGlbInclusionOptions
): THREE.Group {
  const exportGroup = new THREE.Group();
  exportGroup.name = name;

  const includePropsDetails = unityInclusion?.includePropsDetails ?? true;
  const includeBillboardsSprites = unityInclusion?.includeBillboardsSprites ?? true;
  const includeSceneLights = unityInclusion?.includeSceneLights ?? true;

  rootGroup.updateMatrixWorld(true);

  rootGroup.traverse((child) => {
    // Handle Scene Lights (`isLight`) controlled by `includeSceneLights` and exported via `{ onlyVisible: true }`
    if ((child as any).isLight) {
      const clonedLight = child.clone() as THREE.Light;
      const exportIntensity =
        child.userData?.exportIntensity ?? (child as THREE.Light).intensity ?? 1;
      clonedLight.intensity = exportIntensity;
      clonedLight.position.setFromMatrixPosition(child.matrixWorld);
      clonedLight.visible = Boolean(includeSceneLights && child.visible !== false);
      clonedLight.updateMatrix();
      exportGroup.add(clonedLight);
      return;
    }

    if (child instanceof THREE.Mesh && (child.userData.partId || child.geometry)) {
      let parentCheck: THREE.Object3D | null = child.parent;
      let isHiddenHelper = false;
      while (parentCheck) {
        if (
          parentCheck.name === 'Collision_Visualizers' ||
          parentCheck.name === 'Sockets_Visualizers'
        ) {
          isHiddenHelper = true;
          break;
        }
        parentCheck = parentCheck.parent;
      }
      if (isHiddenHelper) return;

      const cat = child.userData?.unityCategory as UnityNodeCategory | undefined;
      let isNodeVisible = child.visible !== false;
      if (cat === 'prop' && !includePropsDetails) {
        isNodeVisible = false;
      } else if (cat === 'billboard' && !includeBillboardsSprites) {
        isNodeVisible = false;
      }

      child.updateMatrix();
      child.updateMatrixWorld(true);

      const clonedGeo = child.geometry.clone();
      clonedGeo.applyMatrix4(child.matrixWorld);

      let finalMaterial: THREE.Material | THREE.Material[];

      if (Array.isArray(child.material)) {
        if (
          child.geometry.groups &&
          child.geometry.groups.length === 3 &&
          child.material.length === 3
        ) {
          finalMaterial = child.material.slice();
          finalMaterial.forEach((m) => bakeUVRepeatOnGeometryAndMaterial(clonedGeo, m));
        } else {
          clonedGeo.clearGroups();
          finalMaterial = child.material[4] || child.material[0];
          bakeUVRepeatOnGeometryAndMaterial(clonedGeo, finalMaterial);
        }
      } else {
        finalMaterial = child.material;
        bakeUVRepeatOnGeometryAndMaterial(clonedGeo, finalMaterial);
      }

      const cleanMesh = new THREE.Mesh(clonedGeo, finalMaterial);
      cleanMesh.name = child.name || 'Part';
      cleanMesh.visible = isNodeVisible;
      cleanMesh.updateMatrix();

      exportGroup.add(cleanMesh);
    }
  });

  return exportGroup;
}

export async function exportToGlb(
  rootGroup: THREE.Group,
  filename: string = 'model.glb',
  unityInclusion?: UnityGlbInclusionOptions
): Promise<Blob> {
  const exporter = new GLTFExporter();
  const exportGroup = buildSanitizedExportGroup(
    rootGroup,
    filename.replace(/\.(glb|gltf)$/i, ''),
    unityInclusion
  );

  return new Promise((resolve, reject) => {
    exporter.parse(
      exportGroup,
      (result) => {
        if (result instanceof ArrayBuffer) {
          const blob = new Blob([result], { type: 'model/gltf-binary' });
          resolve(blob);
        } else {
          const jsonString = JSON.stringify(result, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
          resolve(blob);
        }
      },
      (error) => {
        console.error('Error exporting GLB:', error);
        reject(error);
      },
      {
        binary: true,
        embedImages: true,
        onlyVisible: true,
      }
    );
  });
}

export async function exportToGltf(
  rootGroup: THREE.Group,
  filename: string = 'model.gltf',
  unityInclusion?: UnityGlbInclusionOptions
): Promise<Blob> {
  const exporter = new GLTFExporter();
  const exportGroup = buildSanitizedExportGroup(
    rootGroup,
    filename.replace(/\.(glb|gltf)$/i, ''),
    unityInclusion
  );

  return new Promise((resolve, reject) => {
    exporter.parse(
      exportGroup,
      (result) => {
        const jsonString = JSON.stringify(result, null, 2);
        const blob = new Blob([jsonString], { type: 'model/gltf+json' });
        resolve(blob);
      },
      (error) => reject(error),
      {
        binary: false,
        embedImages: true,
        onlyVisible: true,
      }
    );
  });
}

export function exportToObj(
  rootGroup: THREE.Group,
  name: string = 'model'
): Blob {
  let output = `# Forge3D Wavefront OBJ Exporter\n# Model: ${name}\n\n`;

  let vertexOffset = 1;
  let normalOffset = 1;
  let uvOffset = 1;

  rootGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.userData.partId && child.visible) {
      const geometry = child.geometry;
      const positionAttr = geometry.getAttribute('position');
      const normalAttr = geometry.getAttribute('normal');
      const uvAttr = geometry.getAttribute('uv');
      const indexAttr = geometry.getIndex();

      output += `o ${child.name || 'Part'}\n`;

      const matrix = child.matrixWorld;

      const v = new THREE.Vector3();
      for (let i = 0; i < positionAttr.count; i++) {
        v.fromBufferAttribute(positionAttr, i);
        v.applyMatrix4(matrix);
        output += `v ${v.x.toFixed(4)} ${v.y.toFixed(4)} ${v.z.toFixed(4)}\n`;
      }

      if (uvAttr) {
        for (let i = 0; i < uvAttr.count; i++) {
          output += `vt ${uvAttr.getX(i).toFixed(4)} ${uvAttr.getY(i).toFixed(4)}\n`;
        }
      }

      if (normalAttr) {
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
        const n = new THREE.Vector3();
        for (let i = 0; i < normalAttr.count; i++) {
          n.fromBufferAttribute(normalAttr, i);
          n.applyMatrix3(normalMatrix).normalize();
          output += `vn ${n.x.toFixed(4)} ${n.y.toFixed(4)} ${n.z.toFixed(4)}\n`;
        }
      }

      output += `s 1\n`;
      if (indexAttr) {
        for (let i = 0; i < indexAttr.count; i += 3) {
          const a = indexAttr.getX(i) + vertexOffset;
          const b = indexAttr.getX(i + 1) + vertexOffset;
          const c = indexAttr.getX(i + 2) + vertexOffset;

          if (uvAttr && normalAttr) {
            const uva = indexAttr.getX(i) + uvOffset;
            const uvb = indexAttr.getX(i + 1) + uvOffset;
            const uvc = indexAttr.getX(i + 2) + uvOffset;

            const na = indexAttr.getX(i) + normalOffset;
            const nb = indexAttr.getX(i + 1) + normalOffset;
            const nc = indexAttr.getX(i + 2) + normalOffset;

            output += `f ${a}/${uva}/${na} ${b}/${uvb}/${nb} ${c}/${uvc}/${nc}\n`;
          } else {
            output += `f ${a} ${b} ${c}\n`;
          }
        }
      } else {
        for (let i = 0; i < positionAttr.count; i += 3) {
          const a = i + vertexOffset;
          const b = i + 1 + vertexOffset;
          const c = i + 2 + vertexOffset;
          output += `f ${a} ${b} ${c}\n`;
        }
      }

      vertexOffset += positionAttr.count;
      if (uvAttr) uvOffset += uvAttr.count;
      if (normalAttr) normalOffset += normalAttr.count;
      output += `\n`;
    }
  });

  return new Blob([output], { type: 'text/plain' });
}

/**
 * Generates a Unity-ready JSON file containing all scene lights (with Left-Handed Unity positions,
 * Hex color, range, and intensity) and prefab instance transforms.
 */
export function exportUnityLightsAndTransformsJson(
  blueprint: Model3DBlueprint,
  stats: ViewportStats
): Blob {
  const lights = blueprint.unitySuite?.lights || [];
  const prefabs = blueprint.unitySuite?.prefabs || [];

  const payload = {
    schemaVersion: '1.0.0',
    sceneTitle: blueprint.title,
    coordinateSystem: 'Unity Left-Handed (X: -RightHandedX, Y: Up, Z: Forward, 1 unit = 1 meter)',
    dimensionsMeters: stats.dimensions,
    lightsCount: lights.length,
    lights: lights.map((l) => ({
      id: l.id,
      name: l.name,
      type: l.type,
      position: l.position,
      colorHex: l.colorHex,
      range: l.range,
      intensity: l.intensity,
      ...(l.decay !== undefined ? { decay: l.decay } : {}),
      ...(l.angleDeg !== undefined ? { spotAngleDeg: l.angleDeg } : {}),
      threeJsRightHandedPosition: l.threeJsPosition,
    })),
    prefabGroups: prefabs.map((p) => ({
      id: p.id,
      prefabName: p.name,
      category: p.category,
      instanceCount: p.count,
      dimensionsMeters: {
        width: p.dimensions[0],
        height: p.dimensions[1],
        depth: p.dimensions[2],
      },
      pivotOrigin: { x: 0, y: 0, z: 0 },
      instances: p.instances,
    })),
  };

  return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
}

export function generateManifestJson(
  blueprint: Model3DBlueprint,
  stats: ViewportStats
): Blob {
  const manifest = {
    schemaVersion: '1.0.0',
    title: blueprint.title,
    category: blueprint.category,
    genre: blueprint.gameGenre,
    description: blueprint.description,
    lore: blueprint.lore,
    dimensionsMeters: stats.dimensions,
    metrics: {
      triangles: stats.triangles,
      vertices: stats.vertices,
      drawCalls: stats.drawCalls,
      estimatedGlbKb: stats.estimatedGlbKb,
    },
    collisionHull: blueprint.collisionHull,
    sockets: blueprint.sockets,
    gameEngineGuidance: {
      unrealEngine: {
        importScale: 100,
        forwardAxis: 'X',
        upAxis: 'Z',
        socketUsage: 'Sockets can be converted directly into StaticMesh Sockets in UE5 Mesh Editor.',
      },
      unity: {
        importScale: 1,
        forwardAxis: 'Z',
        upAxis: 'Y',
      },
      godot4: {
        importScale: 1,
        collisionShape: blueprint.collisionHull?.type === 'capsule' ? 'CapsuleShape3D' : 'BoxShape3D',
      },
    },
    partsHierarchy: blueprint.parts.map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      geometryType: p.geometryType,
      symmetrical: p.symmetrical,
      material: {
        name: p.material.name,
        colorHex: p.material.color,
        roughness: p.material.roughness,
        metalness: p.material.metalness,
        emissive: p.material.emissive,
      },
    })),
  };

  return new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
