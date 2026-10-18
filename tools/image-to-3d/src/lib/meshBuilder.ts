import * as THREE from 'three';
import { Model3DBlueprint, Part3D, RenderMode, ViewportStats } from '../types/model3d';
import { getProceduralTexture, getUvCheckerTexture } from './proceduralTextures';

// Shared materials for special render modes
let normalMaterial: THREE.MeshNormalMaterial | null = null;
let clayMaterial: THREE.MeshStandardMaterial | null = null;
let uvCheckerMaterial: THREE.MeshBasicMaterial | null = null;

function getSpecialMaterial(mode: RenderMode): THREE.Material | null {
  if (mode === 'normals') {
    if (!normalMaterial) {
      normalMaterial = new THREE.MeshNormalMaterial({ wireframe: false });
    }
    return normalMaterial;
  }
  if (mode === 'clay') {
    if (!clayMaterial) {
      clayMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        roughness: 0.85,
        metalness: 0.05,
      });
    }
    return clayMaterial;
  }
  if (mode === 'uv') {
    if (!uvCheckerMaterial) {
      uvCheckerMaterial = new THREE.MeshBasicMaterial({
        map: getUvCheckerTexture(),
      });
    }
    return uvCheckerMaterial;
  }
  return null;
}

export interface BuildResult {
  rootGroup: THREE.Group;
  partsMap: Map<string, THREE.Mesh[]>; // part id -> meshes (including mirrored)
  basePositions: Map<THREE.Mesh, THREE.Vector3>;
  collisionGroup: THREE.Group;
  socketsGroup: THREE.Group;
  stats: ViewportStats;
}

export function buildModelFromBlueprint(blueprint?: Model3DBlueprint | null): BuildResult {
  const rootGroup = new THREE.Group();
  rootGroup.name = `Model_${blueprint?.id || 'empty'}`;

  const modelContent = new THREE.Group();
  modelContent.name = 'Model_Meshes';
  rootGroup.add(modelContent);

  const partsMap = new Map<string, THREE.Mesh[]>();
  const basePositions = new Map<THREE.Mesh, THREE.Vector3>();

  let totalTriangles = 0;
  let totalVertices = 0;
  let drawCalls = 0;

  if (blueprint?.customGroup) {
    const custom = blueprint.customGroup as THREE.Group;
    custom.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const cloned = child.clone();
        cloned.material = Array.isArray(child.material)
          ? child.material.map((m) => m.clone())
          : child.material.clone();
        cloned.userData = { ...child.userData, originalMaterial: cloned.material };
        modelContent.add(cloned);
        basePositions.set(cloned, cloned.position.clone());

        const partId = cloned.userData.partId || `part_${Math.random()}`;
        if (!partsMap.has(partId)) partsMap.set(partId, []);
        partsMap.get(partId)!.push(cloned);

        const geo = cloned.geometry;
        const triCount = geo.index ? geo.index.count / 3 : geo.attributes.position.count / 3;
        totalTriangles += triCount;
        totalVertices += geo.attributes.position.count;
        drawCalls++;
      }
    });
  } else if (blueprint?.parts && blueprint.parts.length > 0) {
    blueprint.parts.forEach((part) => {
      const geometry = createGeometry(part);
      const material = createMaterial(part);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = part.id;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Position, rotation, scale
      mesh.position.set(part.position[0], part.position[1], part.position[2]);
      mesh.rotation.set(
        THREE.MathUtils.degToRad(part.rotation[0]),
        THREE.MathUtils.degToRad(part.rotation[1]),
        THREE.MathUtils.degToRad(part.rotation[2])
      );
      mesh.scale.set(part.scale[0], part.scale[1], part.scale[2]);

      mesh.userData = {
        partId: part.id,
        partName: part.name,
        role: part.role,
        originalMaterial: material,
        isMirrored: false,
      };

      modelContent.add(mesh);
      basePositions.set(mesh, mesh.position.clone());

      const meshesList = [mesh];

      // Compute stats
      const triCount = geometry.index
        ? geometry.index.count / 3
        : geometry.attributes.position.count / 3;
      totalTriangles += triCount;
      totalVertices += geometry.attributes.position.count;
      drawCalls++;

      // Handle Symmetry (duplicate across X axis)
      if (part.symmetrical && Math.abs(part.position[0]) > 0.001) {
        const mirrorGeo = geometry.clone();
        const mirrorMat = material.clone();
        const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMat);
        mirrorMesh.name = `${part.id}_mirror`;
        mirrorMesh.castShadow = true;
        mirrorMesh.receiveShadow = true;

        mirrorMesh.position.set(-part.position[0], part.position[1], part.position[2]);
        mirrorMesh.rotation.set(
          THREE.MathUtils.degToRad(part.rotation[0]),
          THREE.MathUtils.degToRad(-part.rotation[1]),
          THREE.MathUtils.degToRad(-part.rotation[2])
        );
        mirrorMesh.scale.set(part.scale[0], part.scale[1], part.scale[2]);

        mirrorMesh.userData = {
          partId: part.id,
          partName: `${part.name} (Mirrored)`,
          role: part.role,
          originalMaterial: mirrorMat,
          isMirrored: true,
        };

        modelContent.add(mirrorMesh);
        basePositions.set(mirrorMesh, mirrorMesh.position.clone());
        meshesList.push(mirrorMesh);

        totalTriangles += triCount;
        totalVertices += geometry.attributes.position.count;
        drawCalls++;
      }

      partsMap.set(part.id, meshesList);
    });
  }

  // Calculate Bounding Box
  const bbox = new THREE.Box3().setFromObject(modelContent);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  // Center the model slightly so its base sits on ground level
  const min = bbox.min;
  if (min.y < 0) {
    modelContent.position.y = -min.y;
  }

  // Create Collision Hull visualization group
  const collisionGroup = new THREE.Group();
  collisionGroup.name = 'Collision_Visualizers';
  collisionGroup.visible = false;
  rootGroup.add(collisionGroup);

  if (blueprint?.collisionHull) {
    const cType = blueprint.collisionHull.type;
    const [cdx, cdy, cdz] = blueprint.collisionHull.dimensions;
    const [cox, coy, coz] = blueprint.collisionHull.offset;

    let cGeo: THREE.BufferGeometry;
    if (cType === 'capsule') {
      const radius = Math.min(cdx, cdz) / 2;
      const length = Math.max(0.1, cdy - radius * 2);
      cGeo = new THREE.CapsuleGeometry(radius, length, 8, 16);
    } else if (cType === 'cylinder') {
      cGeo = new THREE.CylinderGeometry(cdx / 2, cdx / 2, cdy, 16);
    } else {
      cGeo = new THREE.BoxGeometry(cdx, cdy, cdz);
    }

    const cMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const cMesh = new THREE.Mesh(cGeo, cMat);
    cMesh.position.set(cox, coy + (min.y < 0 ? -min.y : 0), coz);
    collisionGroup.add(cMesh);
  }

  // Create Sockets visualization group
  const socketsGroup = new THREE.Group();
  socketsGroup.name = 'Sockets_Visualizers';
  socketsGroup.visible = false;
  rootGroup.add(socketsGroup);

  if (blueprint?.sockets && blueprint.sockets.length > 0) {
    const socketGeo = new THREE.OctahedronGeometry(0.08, 0);
    const socketMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });

    blueprint.sockets.forEach((s) => {
      const sMesh = new THREE.Mesh(socketGeo, socketMat);
      sMesh.position.set(s.position[0], s.position[1] + (min.y < 0 ? -min.y : 0), s.position[2]);
      sMesh.name = `socket_${s.name}`;
      socketsGroup.add(sMesh);
    });
  }

  // Estimate GLB size (approx 32 bytes per vertex + indices + material buffers)
  const estimatedGlbKb = Math.max(8, Math.round((totalVertices * 40 + totalTriangles * 6) / 1024));

  const stats: ViewportStats = {
    triangles: Math.round(totalTriangles),
    vertices: totalVertices,
    drawCalls,
    dimensions: {
      x: Number(size.x.toFixed(2)),
      y: Number(size.y.toFixed(2)),
      z: Number(size.z.toFixed(2)),
    },
    estimatedGlbKb,
  };

  return {
    rootGroup,
    partsMap,
    basePositions,
    collisionGroup,
    socketsGroup,
    stats,
  };
}

export function updateExplodedView(
  partsMap: Map<string, THREE.Mesh[]>,
  basePositions: Map<THREE.Mesh, THREE.Vector3>,
  explodeFactor: number
) {
  partsMap.forEach((meshes) => {
    meshes.forEach((mesh) => {
      const basePos = basePositions.get(mesh);
      if (!basePos) return;

      if (explodeFactor <= 0.001) {
        mesh.position.copy(basePos);
      } else {
        // Move outward from origin
        const dir = basePos.clone();
        if (dir.length() < 0.1) {
          dir.set(0, 1, 0);
        } else {
          dir.normalize();
        }

        const distance = 1.2 * explodeFactor;
        mesh.position.copy(basePos).addScaledVector(dir, distance);
      }
    });
  });
}

export function applyRenderMode(
  rootGroup: THREE.Group,
  mode: RenderMode,
  wireframeOverlay: boolean
) {
  const specialMat = getSpecialMaterial(mode);

  rootGroup.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.userData.partId) {
        if (specialMat) {
          child.material = specialMat;
        } else {
          // Restore original material
          const orig = child.userData.originalMaterial;
          if (orig) {
            if (Array.isArray(orig)) {
              orig.forEach((m) => {
                if (m && typeof m === 'object' && 'wireframe' in m) {
                  m.wireframe = mode === 'wireframe' || wireframeOverlay;
                }
              });
            } else if (typeof orig === 'object' && 'wireframe' in orig) {
              orig.wireframe = mode === 'wireframe' || wireframeOverlay;
            }
            child.material = orig;
          }
        }
      }
    }
  });
}

function createGeometry(part: Part3D): THREE.BufferGeometry {
  const p = part.params || {};

  switch (part.geometryType) {
    case 'box':
      return new THREE.BoxGeometry(p.width ?? 1, p.height ?? 1, p.depth ?? 1);

    case 'cylinder':
      return new THREE.CylinderGeometry(
        p.radiusTop ?? 0.5,
        p.radiusBottom ?? 0.5,
        p.height ?? 1,
        p.radialSegments ?? 24
      );

    case 'sphere':
      return new THREE.SphereGeometry(
        p.radius ?? 0.5,
        p.radialSegments ?? 24,
        Math.floor((p.radialSegments ?? 24) * 0.75)
      );

    case 'cone':
      return new THREE.ConeGeometry(
        p.radius ?? 0.5,
        p.height ?? 1,
        p.radialSegments ?? 24
      );

    case 'capsule':
      return new THREE.CapsuleGeometry(
        p.radius ?? 0.4,
        p.height ?? 0.8,
        8,
        p.radialSegments ?? 16
      );

    case 'torus':
      return new THREE.TorusGeometry(
        p.radius ?? 0.8,
        p.tubeRadius ?? 0.15,
        p.radialSegments ?? 16,
        p.tubularSegments ?? 32
      );

    case 'prism': {
      const sides = p.sides ?? 6;
      return new THREE.CylinderGeometry(
        p.radius ?? 0.5,
        p.radius ?? 0.5,
        p.height ?? 1,
        sides
      );
    }

    case 'extrude_polygon': {
      const shape = new THREE.Shape();
      const points = p.polygonPoints;

      if (points && points.length >= 3) {
        shape.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          shape.lineTo(points[i][0], points[i][1]);
        }
        shape.closePath();
      } else {
        // Fallback diamond/wedge profile
        shape.moveTo(-0.5, -0.5);
        shape.lineTo(0.5, -0.5);
        shape.lineTo(0.7, 0.2);
        shape.lineTo(0, 0.6);
        shape.lineTo(-0.7, 0.2);
        shape.closePath();
      }

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: p.extrudeDepth ?? 0.4,
        bevelEnabled: p.bevelEnabled ?? true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: p.bevelSize ?? 0.05,
        bevelThickness: p.bevelThickness ?? 0.05,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      return geo;
    }

    case 'lathe': {
      let lathePoints: THREE.Vector2[] = [];
      if (p.lathePoints && p.lathePoints.length >= 2) {
        lathePoints = p.lathePoints.map(([x, y]) => new THREE.Vector2(x, y));
      } else {
        // Default turbine / vase curve
        lathePoints = [
          new THREE.Vector2(0.1, -0.5),
          new THREE.Vector2(0.4, -0.3),
          new THREE.Vector2(0.5, 0.0),
          new THREE.Vector2(0.35, 0.3),
          new THREE.Vector2(0.2, 0.5),
        ];
      }
      return new THREE.LatheGeometry(lathePoints, p.radialSegments ?? 24);
    }

    case 'tube_curve': {
      let curvePoints: THREE.Vector3[] = [];
      if (p.pathPoints && p.pathPoints.length >= 2) {
        curvePoints = p.pathPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z));
      } else {
        // Smooth curved arch
        curvePoints = [
          new THREE.Vector3(-0.5, 0, 0),
          new THREE.Vector3(-0.3, 0.4, 0.1),
          new THREE.Vector3(0.3, 0.4, -0.1),
          new THREE.Vector3(0.5, 0, 0),
        ];
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      return new THREE.TubeGeometry(
        curve,
        p.tubularSegments ?? 24,
        p.tubeRadius ?? 0.08,
        8,
        false
      );
    }

    default:
      return new THREE.BoxGeometry(1, 1, 1);
  }
}

function createMaterial(part: Part3D): THREE.MeshStandardMaterial {
  const m = part.material;

  const matConfig: THREE.MeshStandardMaterialParameters = {
    color: new THREE.Color(m.color || '#94a3b8'),
    roughness: m.roughness ?? 0.5,
    metalness: m.metalness ?? 0.2,
    transparent: m.transparent ?? (m.opacity !== undefined && m.opacity < 1),
    opacity: m.opacity ?? 1.0,
  };

  if (m.emissive && m.emissive !== '#000000') {
    matConfig.emissive = new THREE.Color(m.emissive);
    matConfig.emissiveIntensity = m.emissiveIntensity ?? 1.5;
  }

  // Apply procedural pattern texture if defined
  if (m.pattern && m.pattern !== 'clean') {
    const tex = getProceduralTexture(m.pattern, m.color || '#94a3b8');
    matConfig.map = tex;
  }

  const mat = new THREE.MeshStandardMaterial(matConfig);
  mat.name = m.name || `${part.name}_Mat`;
  return mat;
}
