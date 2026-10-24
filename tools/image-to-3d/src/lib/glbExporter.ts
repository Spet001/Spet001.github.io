import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Model3DBlueprint, ViewportStats } from '../types/model3d';

export async function exportToGlb(
  rootGroup: THREE.Group,
  filename: string = 'model.glb'
): Promise<Blob> {
  const exporter = new GLTFExporter();

  const exportGroup = new THREE.Group();
  exportGroup.name = filename.replace(/\.(glb|gltf)$/i, '');

  rootGroup.traverse((child) => {

    if (child instanceof THREE.Mesh && child.userData.partId) {
      const clonedMesh = child.clone();
      clonedMesh.material = Array.isArray(child.material) ? child.material.slice() : child.material;
      clonedMesh.geometry = child.geometry.clone();
      clonedMesh.geometry.applyMatrix4(child.matrixWorld);
      clonedMesh.position.set(0, 0, 0);
      clonedMesh.rotation.set(0, 0, 0);
      clonedMesh.scale.set(1, 1, 1);
      clonedMesh.updateMatrix();
      exportGroup.add(clonedMesh);
    }
  });

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
      }
    );
  });
}

export async function exportToGltf(
  rootGroup: THREE.Group,
  filename: string = 'model.gltf'
): Promise<Blob> {
  const exporter = new GLTFExporter();
  const exportGroup = new THREE.Group();
  exportGroup.name = filename.replace(/\.(glb|gltf)$/i, '');

  rootGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.userData.partId) {
      const clonedMesh = child.clone();
      clonedMesh.material = Array.isArray(child.material) ? child.material.slice() : child.material;
      clonedMesh.geometry = child.geometry.clone();
      clonedMesh.geometry.applyMatrix4(child.matrixWorld);
      clonedMesh.position.set(0, 0, 0);
      clonedMesh.rotation.set(0, 0, 0);
      clonedMesh.scale.set(1, 1, 1);
      clonedMesh.updateMatrix();
      exportGroup.add(clonedMesh);
    }
  });

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
    if (child instanceof THREE.Mesh && child.userData.partId) {
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
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
