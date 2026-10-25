export type GeometryType =
  | 'box'
  | 'cylinder'
  | 'sphere'
  | 'cone'
  | 'capsule'
  | 'torus'
  | 'prism'
  | 'lathe'
  | 'extrude_polygon'
  | 'tube_curve';

export type PatternType =
  | 'clean'
  | 'panel_lines'
  | 'carbon_fiber'
  | 'hex_grid'
  | 'brushed_metal'
  | 'hazard_stripes'
  | 'circuit'
  | 'rune_glow';

export interface PartMaterial {
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
  transparent?: boolean;
  clearcoat?: number;
  pattern?: PatternType;
}

export interface PartGeometryParams {
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  radiusTop?: number;
  radiusBottom?: number;
  radialSegments?: number;
  tubularSegments?: number;
  tubeRadius?: number;

  sides?: number;

  polygonPoints?: [number, number][];
  extrudeDepth?: number;
  bevelEnabled?: boolean;
  bevelThickness?: number;
  bevelSize?: number;

  lathePoints?: [number, number][];

  pathPoints?: [number, number, number][];
}

export interface Part3D {
  id: string;
  name: string;
  role: 'primary' | 'secondary' | 'accent' | 'detail';
  geometryType: GeometryType;
  params: PartGeometryParams;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  symmetrical: boolean;
  material: PartMaterial;
}

export interface ModelSocket {
  name: string;
  position: [number, number, number];
  purpose: string;
}

export interface CollisionHull {
  type: 'box' | 'capsule' | 'cylinder';
  dimensions: [number, number, number];
  offset: [number, number, number];
}

export type UnityNodeCategory = 'architecture' | 'prop' | 'billboard' | 'light';

export interface UnityGlbInclusionOptions {
  includePropsDetails: boolean;
  includeBillboardsSprites: boolean;
  includeSceneLights: boolean;
}

export interface UnityPrefabItem {
  id: string;
  name: string;
  signature: string;
  count: number;
  dimensions: [number, number, number];
  category: 'prop' | 'billboard';
  thumbnailDataUrl?: string;
  colorHex: string;
  prefabGroup: any;
  instances: Array<{
    name: string;
    unityPosition: { x: number; y: number; z: number };
    unityRotationEulerDeg: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }>;
}

export interface UnityTextureItem {
  id: string;
  name: string;
  filename: string;
  slot: 'map' | 'emissiveMap' | 'sprite';
  width: number;
  height: number;
  dataUrl: string;
  usedByMeshes: string[];
}

export interface UnityLightItem {
  id: string;
  name: string;
  type: string;
  colorHex: string;
  intensity: number;
  range: number;
  decay?: number;
  angleDeg?: number;
  /** Position converted to Unity Left-Handed coordinate system (X inverted: -x, y, z) */
  position: { x: number; y: number; z: number };
  /** Original Three.js Right-Handed position (for reference) */
  threeJsPosition: { x: number; y: number; z: number };
  rotationEulerDeg?: { x: number; y: number; z: number };
}

export interface UnityExportSuiteData {
  prefabs: UnityPrefabItem[];
  textures: UnityTextureItem[];
  lights: UnityLightItem[];
  counts: {
    architectureMeshes: number;
    propMeshes: number;
    billboardSprites: number;
    sceneLights: number;
  };
}

export interface Model3DBlueprint {
  id: string;
  title: string;
  category: 'vehicle' | 'weapon' | 'prop' | 'character_robot' | 'architecture' | 'item';
  description: string;
  lore: string;
  gameGenre: string;
  targetPolyTier: 'low' | 'mid' | 'high';
  suggestedScale: string;
  collisionHull: CollisionHull;
  sockets: ModelSocket[];
  parts: Part3D[];
  createdAt: string;
  promptUsed?: string;
  sourceType: 'text' | 'image' | 'preset' | 'html';
  thumbnailUrl?: string;
  sourceImage?: string;
  sourceHtml?: string;
  shapeMode?: ShapeMode;
  backImage?: string;
  backMode?: BackFaceMode;
  backColor?: string;
  backRoughness?: number;
  backMetalness?: number;
  backMirror?: boolean;
  customGroup?: any;
  backgroundMode?: BackgroundMode;
  unitySuite?: UnityExportSuiteData;
}

export type ShapeMode = 'auto' | 'card' | 'contour' | 'plaque';
export type BackgroundMode =
  | 'auto'
  | 'transparent'
  | 'remove_white'
  | 'remove_black'
  | 'remove_corner'
  | 'keep_all';
export type BackFaceMode = 'repeat_front' | 'color_fill' | 'custom_image';

export type RenderMode =
  | 'pbr'
  | 'wireframe'
  | 'normals'
  | 'clay'
  | 'uv'
  | 'collision';

export type LightingPreset =
  | 'cyber'
  | 'studio'
  | 'sunlight'
  | 'hangar';

export interface ViewportStats {
  triangles: number;
  vertices: number;
  drawCalls: number;
  dimensions: { x: number; y: number; z: number };
  estimatedGlbKb: number;
}
