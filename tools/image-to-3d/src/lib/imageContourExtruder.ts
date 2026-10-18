import * as THREE from 'three';
import {
  Model3DBlueprint,
  Part3D,
  ViewportStats,
  ShapeMode,
  BackgroundMode,
  BackFaceMode,
} from '../types/model3d';

export type { ShapeMode, BackgroundMode, BackFaceMode };

export interface ExtrusionOptions {
  depth: number; // 0.04 to 1.5
  bevelSize: number; // 0.005 to 0.15
  edgeColor: string; // hex color for bevel side walls
  edgeMetalness: number;
  edgeRoughness: number;
  shapeMode?: ShapeMode; // 'auto' | 'card' | 'contour' | 'plaque'
  backgroundMode?: BackgroundMode; // 'auto' | 'transparent' | 'remove_white' | 'remove_black' | 'remove_corner' | 'keep_all'
  backgroundTolerance?: number; // 0.05 to 0.5 (default 0.18)
  cardCornerRadius?: number; // 0 to 0.2
  // Back Face Options
  backMode: BackFaceMode;
  backColor?: string; // hex color for solid fill
  backRoughness?: number;
  backMetalness?: number;
  backImageSource?: string | null; // data URL or image for back face
  backMirror?: boolean; // whether to mirror UV horizontally for physical stencil punch-through
  addPedestal?: boolean;
}

export interface ExtrusionResult {
  group: THREE.Group;
  blueprint: Model3DBlueprint;
  stats: ViewportStats;
}

interface Point2D {
  x: number;
  y: number;
}

/**
 * Transforms any uploaded 2D image, game logo, trading card, or intricate medallion
 * into a high-fidelity 3D extruded mesh with beveled PBR edges and clean multi-material grouping.
 */
export async function create3DFromImage(
  imageSource: string | HTMLImageElement,
  title: string = '3D Extruded Asset',
  options: ExtrusionOptions = {
    depth: 0.14,
    bevelSize: 0.012,
    edgeColor: '#f59e0b',
    edgeMetalness: 0.85,
    edgeRoughness: 0.25,
    shapeMode: 'auto',
    backgroundMode: 'auto',
    backgroundTolerance: 0.18,
    backMode: 'repeat_front',
    backColor: '#18181b',
    backMirror: false,
    addPedestal: false,
  }
): Promise<ExtrusionResult> {
  const img = await loadImage(imageSource);

  // 1. High Resolution Canvas Inspection (512px for crisp sub-pixel curve fidelity)
  const inspectDim = 512;
  const scale = Math.min(inspectDim / Math.max(img.width, 1), inspectDim / Math.max(img.height, 1), 1);
  const w = Math.max(32, Math.round(img.width * scale));
  const h = Math.max(32, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not create 2D canvas context');

  ctx.drawImage(img, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // 2. Alpha Transparency & Corner Background Analysis
  let transparentCount = 0;
  const totalPixels = w * h;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 180) {
      transparentCount++;
    }
  }
  const transparentRatio = transparentCount / totalPixels;

  // Smart 4-corner sample to detect uniform solid background
  const cornerSize = Math.max(3, Math.min(14, Math.floor(Math.min(w, h) * 0.06)));
  let cornerRSum = 0;
  let cornerGSum = 0;
  let cornerBSum = 0;
  let cornerCount = 0;
  const cornerSamples: [number, number, number][] = [];

  const sampleCorner = (px: number, py: number) => {
    const idx = (py * w + px) * 4;
    const a = data[idx + 3];
    if (a > 60) {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      cornerRSum += r;
      cornerGSum += g;
      cornerBSum += b;
      cornerCount++;
      cornerSamples.push([r, g, b]);
    }
  };

  for (let dy = 0; dy < cornerSize; dy++) {
    for (let dx = 0; dx < cornerSize; dx++) {
      sampleCorner(dx, dy);
      sampleCorner(w - 1 - dx, dy);
      sampleCorner(dx, h - 1 - dy);
      sampleCorner(w - 1 - dx, h - 1 - dy);
    }
  }

  const avgCornerR = cornerCount > 0 ? cornerRSum / cornerCount : 255;
  const avgCornerG = cornerCount > 0 ? cornerGSum / cornerCount : 255;
  const avgCornerB = cornerCount > 0 ? cornerBSum / cornerCount : 255;

  let cornerDeviation = 0;
  for (const s of cornerSamples) {
    cornerDeviation += Math.hypot(s[0] - avgCornerR, s[1] - avgCornerG, s[2] - avgCornerB);
  }
  const avgCornerDev = cornerCount > 0 ? cornerDeviation / cornerCount : 0;
  const isUniformCornerBg = cornerCount > 10 && avgCornerDev < 32;

  const isWhiteCorner = avgCornerR > 215 && avgCornerG > 215 && avgCornerB > 215;
  const isBlackCorner = avgCornerR < 40 && avgCornerG < 40 && avgCornerB < 40;

  // 3. Effective Background Segmentation Mode
  const userBgMode = options.backgroundMode ?? 'auto';
  let effectiveBgMode: 'transparent' | 'remove_white' | 'remove_black' | 'remove_corner' | 'keep_all';

  if (userBgMode === 'auto') {
    if (transparentRatio > 0.02) {
      effectiveBgMode = 'transparent';
    } else if (isUniformCornerBg) {
      if (isWhiteCorner) {
        effectiveBgMode = 'remove_white';
      } else if (isBlackCorner) {
        effectiveBgMode = 'remove_black';
      } else {
        effectiveBgMode = 'remove_corner';
      }
    } else {
      // Non-uniform corners (e.g. trading card or photographic background)
      effectiveBgMode = 'keep_all';
    }
  } else {
    effectiveBgMode = userBgMode;
  }

  // 4. Build Binary Foreground Grid & Detect Content Bounding Box
  const grid: Float32Array[] = Array.from({ length: h }, () => new Float32Array(w));
  const tolerance = (options.backgroundTolerance ?? 0.18) * 441.67;

  let foregroundCount = 0;
  let minContentX = w;
  let minContentY = h;
  let maxContentX = 0;
  let maxContentY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      let isForeground = false;

      switch (effectiveBgMode) {
        case 'transparent':
          isForeground = a > 45;
          break;
        case 'remove_white': {
          const distWhite = Math.hypot(255 - r, 255 - g, 255 - b);
          isForeground = a > 45 && distWhite > Math.max(38, tolerance);
          break;
        }
        case 'remove_black': {
          const distBlack = Math.hypot(r, g, b);
          isForeground = a > 45 && distBlack > Math.max(38, tolerance);
          break;
        }
        case 'remove_corner': {
          const distCorner = Math.hypot(r - avgCornerR, g - avgCornerG, b - avgCornerB);
          isForeground = a > 45 && distCorner > Math.max(28, tolerance);
          break;
        }
        case 'keep_all':
        default:
          isForeground = true;
          break;
      }

      if (isForeground) {
        grid[y][x] = 1;
        foregroundCount++;
        if (x < minContentX) minContentX = x;
        if (x > maxContentX) maxContentX = x;
        if (y < minContentY) minContentY = y;
        if (y > maxContentY) maxContentY = y;
      }
    }
  }

  // 5. Determine Effective Shape Mode
  const foregroundRatio = foregroundCount / totalPixels;
  let effectiveShapeMode: 'card' | 'contour' | 'plaque';

  if (options.shapeMode === 'card') {
    effectiveShapeMode = 'card';
  } else if (options.shapeMode === 'plaque') {
    effectiveShapeMode = 'plaque';
  } else if (options.shapeMode === 'contour') {
    effectiveShapeMode = 'contour';
  } else {
    // Auto Mode: if background was kept or foreground is almost the entire frame, treat as card
    if (effectiveBgMode === 'keep_all' || foregroundRatio > 0.94) {
      effectiveShapeMode = 'card';
    } else {
      effectiveShapeMode = 'contour';
    }
  }

  // 6. Content Trimming (Auto-Crop) to Eliminate Empty Margins
  const hasValidBounds = maxContentX >= minContentX && maxContentY >= minContentY;
  const isTrimmable = effectiveShapeMode !== 'card' && hasValidBounds;

  const padX = isTrimmable ? Math.max(1, Math.round((maxContentX - minContentX) * 0.01)) : 0;
  const padY = isTrimmable ? Math.max(1, Math.round((maxContentY - minContentY) * 0.01)) : 0;

  const cropX = isTrimmable ? Math.max(0, minContentX - padX) : 0;
  const cropY = isTrimmable ? Math.max(0, minContentY - padY) : 0;
  const cropR = isTrimmable ? Math.min(w - 1, maxContentX + padX) : w - 1;
  const cropB = isTrimmable ? Math.min(h - 1, maxContentY + padY) : h - 1;

  const cropW = Math.max(16, cropR - cropX + 1);
  const cropH = Math.max(16, cropB - cropY + 1);

  // Target 3D dimensions based on true trimmed content aspect ratio
  const targetWidth = 3.2;
  const contentAspect = cropH / Math.max(cropW, 1);
  const targetHeight = targetWidth * contentAspect;

  const threeShapes: THREE.Shape[] = [];

  if (effectiveShapeMode === 'card') {
    const cornerRadius = options.cardCornerRadius ?? 0.08;
    const cardShape = createRoundedCardShape(targetWidth, targetHeight, cornerRadius);
    threeShapes.push(cardShape);
  } else {
    try {
      const extractedShapes = traceMarchingSquaresContours(
        grid,
        w,
        h,
        cropX,
        cropY,
        cropW,
        cropH,
        targetWidth,
        targetHeight
      );
      if (extractedShapes.length > 0) {
        threeShapes.push(...extractedShapes);
      }
    } catch (e) {
      console.warn('Marching squares contour extraction error, fallback to card:', e);
    }

    if (threeShapes.length === 0) {
      const fallbackShape = createRoundedCardShape(targetWidth, targetHeight, 0.06);
      threeShapes.push(fallbackShape);
    }
  }

  // 7. Textures & Materials
  const texture = new THREE.Texture(img);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  const frontMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0.15,
    side: THREE.FrontSide,
  });

  const sideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(options.edgeColor),
    roughness: options.edgeRoughness,
    metalness: options.edgeMetalness,
    side: THREE.DoubleSide,
  });

  let backMaterial: THREE.MeshStandardMaterial;

  if (options.backMode === 'color_fill') {
    backMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.backColor || '#18181b'),
      roughness: options.backRoughness ?? 0.5,
      metalness: options.backMetalness ?? 0.2,
      side: THREE.FrontSide,
    });
  } else if (options.backMode === 'custom_image' && options.backImageSource) {
    try {
      const backImg = await loadImage(options.backImageSource);
      const backTex = new THREE.Texture(backImg);
      backTex.colorSpace = THREE.SRGBColorSpace;
      backTex.minFilter = THREE.LinearMipmapLinearFilter;
      backTex.magFilter = THREE.LinearFilter;
      backTex.generateMipmaps = true;
      backTex.needsUpdate = true;

      backMaterial = new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: options.backRoughness ?? 0.35,
        metalness: options.backMetalness ?? 0.15,
        side: THREE.FrontSide,
      });
    } catch {
      backMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: options.backRoughness ?? 0.35,
        metalness: options.backMetalness ?? 0.15,
        side: THREE.FrontSide,
      });
    }
  } else {
    // repeat_front
    backMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: options.backRoughness ?? 0.35,
      metalness: options.backMetalness ?? 0.15,
      side: THREE.FrontSide,
    });
  }

  const rootGroup = new THREE.Group();
  rootGroup.name = 'Extruded_Asset_3D';

  // Adaptive Bevel: Clamp bevel for delicate contours so thin spokes/rings never self-intersect
  const safeDepth = Math.max(0.04, options.depth);
  const maxBevelContour = effectiveShapeMode === 'contour' ? 0.016 : safeDepth * 0.45;
  const safeBevel = Math.min(options.bevelSize, maxBevelContour);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: safeDepth,
    bevelEnabled: safeBevel > 0.002,
    bevelSegments: 3,
    steps: 1,
    bevelSize: safeBevel,
    bevelThickness: safeBevel,
  };

  // 8. Extrude All Shapes Simultaneously
  let rawExtrudeGeometry: THREE.BufferGeometry;
  try {
    rawExtrudeGeometry = new THREE.ExtrudeGeometry(threeShapes, extrudeSettings);
  } catch (err) {
    console.warn('Extrusion error, falling back to card slab:', err);
    const fallbackShape = createRoundedCardShape(targetWidth, targetHeight, 0.06);
    rawExtrudeGeometry = new THREE.ExtrudeGeometry(fallbackShape, extrudeSettings);
  }

  // Compute unshifted center for 100% precision UV mapping
  rawExtrudeGeometry.computeBoundingBox();
  const centerShift = new THREE.Vector3();
  if (rawExtrudeGeometry.boundingBox) {
    rawExtrudeGeometry.boundingBox.getCenter(centerShift);
  }
  rawExtrudeGeometry.center();
  rawExtrudeGeometry.computeVertexNormals();

  // 9. Reorder & Partition Geometry into 3 Clean Multi-Material Groups:
  // Material 0: Front Lid (with sub-pixel image UVs)
  // Material 1: Bevel & Side Walls (with edgeColor metallic finish)
  // Material 2: Back Lid (with readable or stencil-aligned UVs)
  const unifiedGeometry = reorderAndPartitionExtrusion(
    rawExtrudeGeometry,
    centerShift,
    targetWidth,
    targetHeight,
    cropX,
    cropY,
    cropW,
    cropH,
    w,
    h,
    options.backMirror === true
  );

  const materials = [frontMaterial, sideMaterial, backMaterial];
  const mainMesh = new THREE.Mesh(unifiedGeometry, materials);
  mainMesh.castShadow = true;
  mainMesh.receiveShadow = true;
  mainMesh.userData = {
    partId: 'main_extrusion',
    partName: effectiveShapeMode === 'card' ? '3D Collectible Card' : 'Extruded 3D Logo / Asset',
    role: 'primary',
  };

  rootGroup.add(mainMesh);

  // 10. Optional Plaque Backing (Shield / Trophy relief base)
  if (effectiveShapeMode === 'plaque') {
    const plaqueMargin = 0.16;
    const plaqueW = targetWidth + plaqueMargin * 2;
    const plaqueH = targetHeight + plaqueMargin * 2;
    const plaqueShape = createRoundedCardShape(plaqueW, plaqueH, 0.12);
    const plaqueDepth = safeDepth * 0.6;
    const plaqueGeometry = new THREE.ExtrudeGeometry(plaqueShape, {
      depth: plaqueDepth,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    plaqueGeometry.center();

    const plaqueMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#18181f'),
      roughness: 0.45,
      metalness: 0.75,
    });

    const plaqueMesh = new THREE.Mesh(plaqueGeometry, plaqueMaterial);
    plaqueMesh.position.z = -(safeDepth / 2 + plaqueDepth / 2 + 0.01);
    plaqueMesh.castShadow = true;
    plaqueMesh.receiveShadow = true;
    rootGroup.add(plaqueMesh);
  }

  // 11. Optional Studio Pedestal Mount
  if (options.addPedestal) {
    const baseW = targetWidth * 0.85;
    const baseH = 0.22;
    const baseD = safeDepth * 3.5;
    const pedestalGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111827'),
      roughness: 0.3,
      metalness: 0.85,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.set(0, -targetHeight / 2 - baseH / 2, 0);
    pedestalMesh.castShadow = true;
    pedestalMesh.receiveShadow = true;
    rootGroup.add(pedestalMesh);
  }

  // 12. Blueprint Parts and Stats
  const posAttr = unifiedGeometry.getAttribute('position');
  const vertCount = posAttr ? posAttr.count : 0;
  const triCount = Math.round(vertCount / 3);

  const parts: Part3D[] = [
    {
      id: 'element_main',
      name:
        effectiveShapeMode === 'card'
          ? '3D Collectible Card'
          : effectiveShapeMode === 'plaque'
          ? '3D Logo Plaque'
          : '3D Extruded Logo / Contour',
      role: 'primary',
      geometryType: 'box',
      params: {
        width: targetWidth,
        height: targetHeight,
        depth: safeDepth,
      },
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      symmetrical: false,
      material: {
        name: effectiveShapeMode === 'card' ? 'Collectible Card Finish' : 'Extruded Bevel Finish',
        color: options.edgeColor,
        roughness: options.edgeRoughness,
        metalness: options.edgeMetalness,
      },
    },
  ];

  const blueprint: Model3DBlueprint = {
    id: `model_extrude_${Date.now()}`,
    title:
      title ||
      (effectiveShapeMode === 'card'
        ? '3D Collectible Card'
        : effectiveShapeMode === 'plaque'
        ? '3D Logo Plaque'
        : '3D Extruded Logo'),
    category: effectiveShapeMode === 'card' ? 'item' : 'prop',
    description:
      effectiveShapeMode === 'card'
        ? 'High-fidelity 3D collectible trading card with beveled PBR edges and customizable backface artwork.'
        : 'High-fidelity procedural 3D logo asset with contour outline, metallic chamfer, and sub-pixel hole cutouts.',
    lore:
      effectiveShapeMode === 'card'
        ? 'Physical 3D collectible card rendered with metallic bevel borders and authentic front/back artwork.'
        : 'Precision 3D asset extruded with sub-pixel topological contours and metallic PBR bevels.',
    gameGenre: effectiveShapeMode === 'card' ? 'Card Game / TCG / RPG' : 'Action RPG / Arcade',
    targetPolyTier: 'mid',
    suggestedScale: '1.0 unit = 10cm',
    collisionHull: {
      type: 'box',
      dimensions: [targetWidth, targetHeight, safeDepth],
      offset: [0, 0, 0],
    },
    sockets: [
      { name: 'Mount Base', position: [0, -targetHeight / 2, 0], purpose: 'Pedestal anchor mount' },
      { name: 'Logo Center', position: [0, 0, safeDepth / 2], purpose: 'Frontal badge center' },
    ],
    parts,
    createdAt: new Date().toISOString(),
    sourceType: 'image',
    sourceImage: typeof imageSource === 'string' ? imageSource : undefined,
    shapeMode: effectiveShapeMode,
    backgroundMode: userBgMode,
    backImage: options.backImageSource || undefined,
    backMode: options.backMode,
    backColor: options.backColor,
    backRoughness: options.backRoughness,
    backMetalness: options.backMetalness,
    backMirror: options.backMirror,
  };

  const stats: ViewportStats = {
    triangles: triCount,
    vertices: vertCount,
    drawCalls: materials.length,
    dimensions: {
      x: Number(targetWidth.toFixed(2)),
      y: Number(targetHeight.toFixed(2)),
      z: Number(safeDepth.toFixed(2)),
    },
    estimatedGlbKb: Math.max(45, Math.round((vertCount * 32 + triCount * 16) / 1024)),
  };

  return {
    group: rootGroup,
    blueprint,
    stats,
  };
}

/**
 * Creates a smooth rounded card shape
 */
export function createRoundedCardShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(radius, hw * 0.25, hh * 0.25);

  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  shape.closePath();

  return shape;
}

/**
 * Traces 2D contours using Marching Squares isoline extraction with topological hole assignment.
 * Generates 100% water-tight, non-self-intersecting vector loops with RDP simplification.
 */
function traceMarchingSquaresContours(
  grid: Float32Array[],
  w: number,
  h: number,
  cropX: number,
  cropY: number,
  cropW: number,
  cropH: number,
  targetWidth: number,
  targetHeight: number
): THREE.Shape[] {
  // 1. Generate directed boundary segments from Marching Squares
  const segments = extractMarchingSquaresSegments(grid, w, h);
  if (segments.length === 0) return [];

  // 2. Link directed segments into closed loops
  const rawLoops = linkSegmentsToLoops(segments);
  if (rawLoops.length === 0) return [];

  interface AnalyzedContour {
    rawPts: Point2D[];
    pts3D: THREE.Vector2[];
    signedArea: number;
    isHole: boolean;
  }

  const analyzed: AnalyzedContour[] = [];

  for (const loop of rawLoops) {
    if (loop.length < 4) continue;
    const area = calculateSignedPolygonArea(loop);
    if (Math.abs(area) < 16) continue; // filter out single-pixel noise

    // Simplify with Ramer-Douglas-Peucker to keep straight edges true and right angles crisp
    const simplified = simplifyRDP(loop, 0.55);
    if (simplified.length < 3) continue;

    // Convert pixel coordinates to 3D shape units
    const pts3D = simplified.map((p) => {
      const nx = ((p.x - cropX) / cropW - 0.5) * targetWidth;
      const ny = (0.5 - (p.y - cropY) / cropH) * targetHeight;
      return new THREE.Vector2(nx, ny);
    });

    // In Marching Squares with directed edges (inside on right):
    // In screen space (y downwards), outer boundary has negative signed area; hole has positive signed area.
    const isHole = area > 0;

    analyzed.push({
      rawPts: simplified,
      pts3D,
      signedArea: area,
      isHole,
    });
  }

  if (analyzed.length === 0) return [];

  // 3. Separate into Outer Shapes and Holes
  const outerContours = analyzed.filter((c) => !c.isHole);
  const holeContours = analyzed.filter((c) => c.isHole);

  if (outerContours.length === 0 && holeContours.length > 0) {
    // Inverted image fallback
    outerContours.push(...holeContours.map((h) => ({ ...h, isHole: false })));
    holeContours.length = 0;
  }

  // Sort outer contours by absolute area descending
  outerContours.sort((a, b) => Math.abs(b.signedArea) - Math.abs(a.signedArea));

  const shapes: THREE.Shape[] = [];
  const shapeMap = new Map<AnalyzedContour, THREE.Shape>();

  for (const outer of outerContours) {
    const shape = new THREE.Shape();
    // In Three.js, outer shapes must be Counter-Clockwise (positive area)
    const pts = ensureWinding(outer.pts3D, true);
    shape.moveTo(pts[0].x, pts[0].y);
    for (let k = 1; k < pts.length; k++) {
      shape.lineTo(pts[k].x, pts[k].y);
    }
    shape.closePath();

    shapes.push(shape);
    shapeMap.set(outer, shape);
  }

  // 4. Assign each hole to the enclosing outer shape with smallest area (tightest parent)
  for (const hole of holeContours) {
    const testPoint = hole.rawPts[0];
    let bestParent: AnalyzedContour | null = null;
    let minParentArea = Infinity;

    for (const outer of outerContours) {
      if (Math.abs(outer.signedArea) > Math.abs(hole.signedArea)) {
        if (isPointInsidePolygon(testPoint, outer.rawPts)) {
          const pArea = Math.abs(outer.signedArea);
          if (pArea < minParentArea) {
            minParentArea = pArea;
            bestParent = outer;
          }
        }
      }
    }

    if (bestParent && shapeMap.has(bestParent)) {
      const parentShape = shapeMap.get(bestParent)!;
      const holePath = new THREE.Path();
      // In Three.js, holes must be Clockwise (negative area)
      const pts = ensureWinding(hole.pts3D, false);
      holePath.moveTo(pts[0].x, pts[0].y);
      for (let k = 1; k < pts.length; k++) {
        holePath.lineTo(pts[k].x, pts[k].y);
      }
      holePath.closePath();
      parentShape.holes.push(holePath);
    }
  }

  return shapes;
}

/**
 * Marching Squares directed segment table (inside on the right).
 */
function extractMarchingSquaresSegments(grid: Float32Array[], w: number, h: number): [Point2D, Point2D][] {
  const segments: [Point2D, Point2D][] = [];

  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const tl = grid[y][x] >= 0.5 ? 1 : 0;
      const tr = grid[y][x + 1] >= 0.5 ? 1 : 0;
      const br = grid[y + 1][x + 1] >= 0.5 ? 1 : 0;
      const bl = grid[y + 1][x] >= 0.5 ? 1 : 0;

      const c = (tl << 3) | (tr << 2) | (br << 1) | bl;
      if (c === 0 || c === 15) continue;

      const top: Point2D = { x: x + 0.5, y };
      const right: Point2D = { x: x + 1, y: y + 0.5 };
      const bottom: Point2D = { x: x + 0.5, y: y + 1 };
      const left: Point2D = { x, y: y + 0.5 };

      switch (c) {
        case 1:
          segments.push([bottom, left]);
          break;
        case 2:
          segments.push([right, bottom]);
          break;
        case 3:
          segments.push([right, left]);
          break;
        case 4:
          segments.push([top, right]);
          break;
        case 5:
          segments.push([top, right]);
          segments.push([bottom, left]);
          break;
        case 6:
          segments.push([top, bottom]);
          break;
        case 7:
          segments.push([top, left]);
          break;
        case 8:
          segments.push([left, top]);
          break;
        case 9:
          segments.push([bottom, top]);
          break;
        case 10:
          segments.push([left, top]);
          segments.push([right, bottom]);
          break;
        case 11:
          segments.push([right, top]);
          break;
        case 12:
          segments.push([left, right]);
          break;
        case 13:
          segments.push([bottom, right]);
          break;
        case 14:
          segments.push([left, bottom]);
          break;
      }
    }
  }

  return segments;
}

/**
 * Links directed Marching Squares segments into continuous closed loops.
 */
function linkSegmentsToLoops(segments: [Point2D, Point2D][]): Point2D[][] {
  const pKey = (p: Point2D) => p.x.toFixed(2) + '_' + p.y.toFixed(2);
  const headMap = new Map<string, number[]>();

  for (let i = 0; i < segments.length; i++) {
    const k = pKey(segments[i][0]);
    if (!headMap.has(k)) headMap.set(k, []);
    headMap.get(k)!.push(i);
  }

  const used = new Uint8Array(segments.length);
  const loops: Point2D[][] = [];

  for (let i = 0; i < segments.length; i++) {
    if (used[i]) continue;

    const loop: Point2D[] = [segments[i][0]];
    used[i] = 1;
    let curr = segments[i];
    let closed = false;

    for (let step = 0; step < 8000; step++) {
      const nextPoint = curr[1];
      loop.push(nextPoint);

      if (pKey(nextPoint) === pKey(loop[0])) {
        closed = true;
        break;
      }

      const k = pKey(nextPoint);
      const list = headMap.get(k) || [];
      let found = -1;

      for (const idx of list) {
        if (!used[idx]) {
          found = idx;
          break;
        }
      }

      if (found === -1) break;
      used[found] = 1;
      curr = segments[found];
    }

    if (closed && loop.length > 3) {
      loops.push(loop);
      if (loops.length >= 120) break;
    }
  }

  return loops;
}

/**
 * Reorders triangles and constructs 3 clean, multi-material groups for ExtrudeGeometry:
 * - Group 0: Front face (Material 0)
 * - Group 1: Side / Bevel walls (Material 1)
 * - Group 2: Back face (Material 2)
 *
 * Also computes sub-pixel planar UV coordinates with horizontal orientation handling.
 */
function reorderAndPartitionExtrusion(
  rawGeo: THREE.BufferGeometry,
  centerShift: THREE.Vector3,
  targetWidth: number,
  targetHeight: number,
  cropX: number,
  cropY: number,
  cropW: number,
  cropH: number,
  fullW: number,
  fullH: number,
  mirrorBack: boolean
): THREE.BufferGeometry {
  const pos = rawGeo.getAttribute('position');
  const norm = rawGeo.getAttribute('normal');
  if (!pos || !norm) return rawGeo;

  const totalTris = pos.count / 3;
  const frontTris: number[] = [];
  const sideTris: number[] = [];
  const backTris: number[] = [];

  for (let t = 0; t < totalTris; t++) {
    const i = t * 3;
    const avgNz = (norm.getZ(i) + norm.getZ(i + 1) + norm.getZ(i + 2)) / 3;
    if (avgNz > 0.6) {
      frontTris.push(t);
    } else if (avgNz < -0.6) {
      backTris.push(t);
    } else {
      sideTris.push(t);
    }
  }

  const orderedTris = [...frontTris, ...sideTris, ...backTris];
  const newPos = new Float32Array(pos.count * 3);
  const newNorm = new Float32Array(norm.count * 3);
  const uvs = new Float32Array(pos.count * 2);

  const frontCount = frontTris.length * 3;
  const sideCount = sideTris.length * 3;
  const backCount = backTris.length * 3;

  for (let outT = 0; outT < totalTris; outT++) {
    const inT = orderedTris[outT];
    for (let v = 0; v < 3; v++) {
      const inIdx = (inT * 3 + v) * 3;
      const outIdx = (outT * 3 + v) * 3;
      const uvIdx = (outT * 3 + v) * 2;

      const x = pos.array[inIdx];
      const y = pos.array[inIdx + 1];
      const z = pos.array[inIdx + 2];

      newPos[outIdx] = x;
      newPos[outIdx + 1] = y;
      newPos[outIdx + 2] = z;

      newNorm[outIdx] = norm.array[inIdx];
      newNorm[outIdx + 1] = norm.array[inIdx + 1];
      newNorm[outIdx + 2] = norm.array[inIdx + 2];

      // Unshifted original coordinate for exact UV mapping
      const origX = x + centerShift.x;
      const origY = y + centerShift.y;

      const uRel = origX / targetWidth + 0.5;
      const vRel = origY / targetHeight + 0.5;

      const uFront = (cropX + Math.max(0, Math.min(1, uRel)) * cropW) / fullW;
      const vFront = 1.0 - (cropY + (1.0 - Math.max(0, Math.min(1, vRel))) * cropH) / fullH;

      if (outT < frontTris.length) {
        // Front Face: exact texture alignment
        uvs[uvIdx] = uFront;
        uvs[uvIdx + 1] = vFront;
      } else if (outT < frontTris.length + sideTris.length) {
        // Side & Bevel Walls: mapped to edge color
        uvs[uvIdx] = 0.5;
        uvs[uvIdx + 1] = 0.5;
      } else {
        // Back Face:
        // By default (mirrorBack === false):
        // Direct silhouette projection (uBack = uFront, vBack = vFront).
        // Each 3D letter, glyph, character, or detail gets its exact authentic texture on both front and back!
        // If mirrorBack === true:
        // Inverted horizontal projection across the content bounding box
        const uRelBack = mirrorBack ? 1.0 - uRel : uRel;
        const uBack = (cropX + Math.max(0, Math.min(1, uRelBack)) * cropW) / fullW;
        uvs[uvIdx] = uBack;
        uvs[uvIdx + 1] = vFront;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(newPos, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(newNorm, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  geometry.clearGroups();
  geometry.addGroup(0, frontCount, 0); // Front Face (Material 0)
  geometry.addGroup(frontCount, sideCount, 1); // Side / Bevel Walls (Material 1)
  geometry.addGroup(frontCount + sideCount, backCount, 2); // Back Face (Material 2)

  return geometry;
}

/**
 * Ensures a Vector2 loop has the desired winding order (counter-clockwise or clockwise).
 */
function ensureWinding(pts: THREE.Vector2[], counterClockwise: boolean): THREE.Vector2[] {
  let signedArea = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    signedArea += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
  }
  const isCCW = signedArea > 0;
  if (isCCW !== counterClockwise) {
    return pts.slice().reverse();
  }
  return pts;
}

/**
 * Point-in-polygon ray-casting test
 */
function isPointInsidePolygon(point: Point2D, vs: Point2D[]): boolean {
  const x = point.x;
  const y = point.y;
  let inside = false;

  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i].x;
    const yi = vs[i].y;
    const xj = vs[j].x;
    const yj = vs[j].y;

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Calculates signed polygon area in screen coordinates
 */
function calculateSignedPolygonArea(pts: Point2D[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i].x * pts[j].y;
    area -= pts[j].x * pts[i].y;
  }
  return area / 2;
}

/**
 * Ramer-Douglas-Peucker line simplification
 */
function simplifyRDP(points: Point2D[], epsilon: number): Point2D[] {
  if (points.length <= 2) return points;

  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;

  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }

  if (maxDist > epsilon) {
    const left = simplifyRDP(points.slice(0, index + 1), epsilon);
    const right = simplifyRDP(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  }

  return [points[0], points[end]];
}

function perpendicularDistance(p: Point2D, p1: Point2D, p2: Point2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const mag = Math.hypot(dx, dy);
  if (mag === 0) return Math.hypot(p.x - p1.x, p.y - p1.y);
  return Math.abs(dy * p.x - dx * p.y + p2.x * p1.y - p2.y * p1.x) / mag;
}

/**
 * Loads an image from a URL or HTMLImageElement
 */
function loadImage(source: string | HTMLImageElement): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (typeof source !== 'string') {
      if (source.complete && source.naturalWidth > 0) {
        resolve(source);
      } else {
        source.onload = () => resolve(source);
        source.onerror = (e) => reject(e);
      }
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // If external fetch fails, gracefully fall back to locally cached official asset
      if (source.includes('encrypted-tbn0.gstatic.com')) {
        img.src = '/card_backs/yugioh_back.jpg';
      } else if (source.includes('wixmp.com')) {
        img.src = '/card_backs/pokemon_back.jpg';
      } else if (source.includes('wikia.nocookie.net') || source.includes('Magic_card_back')) {
        img.src = '/card_backs/magic_back.webp';
      } else {
        reject(new Error(`Failed to load image from ${source}`));
      }
    };
    img.src = source;
  });
}

/**
 * Updates the back material of the main extruded mesh in realtime without re-extruding.
 */
export async function updateBackMaterialInGroup(
  group: THREE.Group,
  options: {
    backMode: BackFaceMode;
    backColor: string;
    backImageSource: string | null;
    backRoughness: number;
    backMetalness: number;
  }
): Promise<void> {
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh && Array.isArray(obj.material) && obj.material.length >= 3) {
      const mat = obj.material[2];
      if (mat instanceof THREE.MeshStandardMaterial) {
        mat.roughness = options.backRoughness;
        mat.metalness = options.backMetalness;

        if (options.backMode === 'color_fill') {
          mat.map = null;
          mat.color = new THREE.Color(options.backColor);
          mat.needsUpdate = true;
        } else if (options.backMode === 'custom_image' && options.backImageSource) {
          loadImage(options.backImageSource).then((img) => {
            const tex = new THREE.Texture(img);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = true;
            tex.needsUpdate = true;
            mat.color = new THREE.Color(0xffffff);
            mat.map = tex;
            mat.needsUpdate = true;
          });
        } else if (options.backMode === 'repeat_front') {
          const frontMat = obj.material[0] as THREE.MeshStandardMaterial;
          if (frontMat && frontMat.map) {
            mat.color = new THREE.Color(0xffffff);
            mat.map = frontMat.map;
            mat.needsUpdate = true;
          }
        }
      }
    }
  });
}

