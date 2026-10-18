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
  color: string; // hex #rrggbb
  roughness: number; // 0.0 - 1.0
  metalness: number; // 0.0 - 1.0
  emissive?: string; // hex #rrggbb
  emissiveIntensity?: number; // 0.0 - 5.0
  opacity?: number; // 0.0 - 1.0
  transparent?: boolean;
  clearcoat?: number; // 0.0 - 1.0
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
  // Prism
  sides?: number;
  // Extrude Polygon
  polygonPoints?: [number, number][];
  extrudeDepth?: number;
  bevelEnabled?: boolean;
  bevelThickness?: number;
  bevelSize?: number;
  // Lathe
  lathePoints?: [number, number][];
  // Tube curve
  pathPoints?: [number, number, number][];
}

export interface Part3D {
  id: string;
  name: string;
  role: 'primary' | 'secondary' | 'accent' | 'detail';
  geometryType: GeometryType;
  params: PartGeometryParams;
  position: [number, number, number];
  rotation: [number, number, number]; // in degrees
  scale: [number, number, number];
  symmetrical: boolean; // if true, mirrored across X axis
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
  sourceType: 'text' | 'image' | 'preset';
  thumbnailUrl?: string;
  sourceImage?: string;
  shapeMode?: ShapeMode;
  backImage?: string;
  backMode?: BackFaceMode;
  backColor?: string;
  backRoughness?: number;
  backMetalness?: number;
  backMirror?: boolean;
  customGroup?: any;
  backgroundMode?: BackgroundMode;
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
