import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  LightingPreset,
  Model3DBlueprint,
  Part3D,
  RenderMode,
  ViewportStats,
} from '../types/model3d';
import {
  applyRenderMode,
  buildModelFromBlueprint,
  BuildResult,
  updateExplodedView,
} from '../lib/meshBuilder';
import {
  RotateCcw,
  Maximize2,
  Compass,
  Layers,
  Sparkles,
  Info,
  Upload,
} from 'lucide-react';
import { StardustCanvas } from './StardustCanvas';

interface Viewport3DProps {
  blueprint: Model3DBlueprint | null;
  renderMode: RenderMode;
  lightingPreset: LightingPreset;
  explodedFactor: number;
  showWireframeOverlay: boolean;
  showGrid: boolean;
  showShadows: boolean;
  selectedPartId: string | null;
  onSelectPart: (partId: string | null) => void;
  onStatsUpdated: (stats: ViewportStats) => void;
  rootGroupRef: React.MutableRefObject<THREE.Group | null>;
  cameraPresetTrigger?: 'hero' | 'front' | 'back' | 'side' | 'top' | 'iso' | null;
  onDropFile?: (file: File) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  blueprint,
  renderMode,
  lightingPreset,
  explodedFactor,
  showWireframeOverlay,
  showGrid,
  showShadows,
  selectedPartId,
  onSelectPart,
  onStatsUpdated,
  rootGroupRef,
  cameraPresetTrigger,
  onDropFile,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const contactShadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  const buildResultRef = useRef<BuildResult | null>(null);
  const [autoTurntable, setAutoTurntable] = useState(true);
  const [hoveredPartName, setHoveredPartName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050716);
    scene.fog = new THREE.FogExp2(0x050716, 0.022);
    sceneRef.current = scene;

    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 1;
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const colorType = Math.random();
      if (colorType > 0.75) {
        starColors[i * 3] = 0.0;
        starColors[i * 3 + 1] = 0.85;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorType > 0.5) {
        starColors[i * 3] = 0.75;
        starColors[i * 3 + 1] = 0.35;
        starColors[i * 3 + 2] = 1.0;
      } else if (colorType > 0.25) {
        starColors[i * 3] = 0.5;
        starColors[i * 3 + 1] = 0.7;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 0.95;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 1.0;
      }
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);
    cameraRef.current = camera;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = !isHeadless;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2 + 0.05;
      controls.minDistance = 1;
      controls.maxDistance = 30;
      controls.target.set(0, 1.0, 0);
      controlsRef.current = controls;
    } catch (e) {
      console.warn('WebGL Renderer could not be initialized:', e);
    }

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x180b2b, 0.75);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    const d = 5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const grid = new THREE.GridHelper(18, 36, 0x00f0ff, 0x162044);
    grid.position.y = -0.005;
    scene.add(grid);
    gridHelperRef.current = grid;

    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    contactShadowPlaneRef.current = shadowPlane;

    const handleResize = () => {
      if (!container || !rendererRef.current || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (controls) {
        controls.update();
      }
      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
    };

    if (renderer) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (controls) controls.dispose();
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoTurntable;
      controlsRef.current.autoRotateSpeed = 1.2;
    }
  }, [autoTurntable]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (buildResultRef.current) {
      scene.remove(buildResultRef.current.rootGroup);
      buildResultRef.current.rootGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else if (child.material) {
            child.material.dispose();
          }
        }
      });
      buildResultRef.current = null;
    }

    if (!blueprint) {
      rootGroupRef.current = null;
      onStatsUpdated({
        triangles: 0,
        vertices: 0,
        drawCalls: 0,
        dimensions: { x: 0, y: 0, z: 0 },
        estimatedGlbKb: 0,
      });
      return;
    }

    const result = buildModelFromBlueprint(blueprint);
    buildResultRef.current = result;
    rootGroupRef.current = result.rootGroup;
    scene.add(result.rootGroup);

    applyRenderMode(result.rootGroup, renderMode, showWireframeOverlay);
    updateExplodedView(result.partsMap, result.basePositions, explodedFactor);

    onStatsUpdated(result.stats);

    const bbox = new THREE.Box3().setFromObject(result.rootGroup);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bbox.getCenter(center);
    bbox.getSize(size);

    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.copy(center);
      const maxDim = Math.max(size.x, size.y, size.z, 1.5);
      const fov = cameraRef.current.fov * (Math.PI / 180);
      const cameraDistance = (maxDim / 2 / Math.tan(fov / 2)) * 1.5;

      cameraRef.current.position.set(
        center.x + cameraDistance * 0.75,
        center.y + cameraDistance * 0.5,
        center.z + cameraDistance * 0.75
      );
      cameraRef.current.lookAt(center);
      controlsRef.current.update();
    }
  }, [blueprint]);

  useEffect(() => {
    if (buildResultRef.current) {
      applyRenderMode(buildResultRef.current.rootGroup, renderMode, showWireframeOverlay);

      if (buildResultRef.current.collisionGroup) {
        buildResultRef.current.collisionGroup.visible = renderMode === 'collision';
      }
      if (buildResultRef.current.socketsGroup) {
        buildResultRef.current.socketsGroup.visible = renderMode === 'collision';
      }
    }
  }, [renderMode, showWireframeOverlay]);

  useEffect(() => {
    if (buildResultRef.current) {
      updateExplodedView(
        buildResultRef.current.partsMap,
        buildResultRef.current.basePositions,
        explodedFactor
      );
    }
  }, [explodedFactor]);

  useEffect(() => {
    if (!keyLightRef.current || !hemiLightRef.current || !rimLightRef.current || !sceneRef.current)
      return;

    switch (lightingPreset) {
      case 'cyber':
        sceneRef.current.background = new THREE.Color(0x050508);
        keyLightRef.current.color.setHex(0x00f0ff);
        keyLightRef.current.intensity = 2.2;
        hemiLightRef.current.color.setHex(0x3b82f6);
        hemiLightRef.current.groundColor.setHex(0x701a75);
        rimLightRef.current.color.setHex(0xff007f);
        rimLightRef.current.intensity = 2.5;
        break;

      case 'studio':
        sceneRef.current.background = new THREE.Color(0x09090b);
        keyLightRef.current.color.setHex(0xfff7ed);
        keyLightRef.current.intensity = 2.2;
        hemiLightRef.current.color.setHex(0x93c5fd);
        hemiLightRef.current.groundColor.setHex(0x1e293b);
        rimLightRef.current.color.setHex(0x38bdf8);
        rimLightRef.current.intensity = 1.4;
        break;

      case 'sunlight':
        sceneRef.current.background = new THREE.Color(0x0f172a);
        keyLightRef.current.color.setHex(0xfef08a);
        keyLightRef.current.intensity = 3.0;
        hemiLightRef.current.color.setHex(0x60a5fa);
        hemiLightRef.current.groundColor.setHex(0x451a03);
        rimLightRef.current.color.setHex(0xfb923c);
        rimLightRef.current.intensity = 1.0;
        break;

      case 'hangar':
        sceneRef.current.background = new THREE.Color(0x030712);
        keyLightRef.current.color.setHex(0xe2e8f0);
        keyLightRef.current.intensity = 1.8;
        hemiLightRef.current.color.setHex(0x475569);
        hemiLightRef.current.groundColor.setHex(0x0f172a);
        rimLightRef.current.color.setHex(0x22c55e);
        rimLightRef.current.intensity = 1.2;
        break;
    }
  }, [lightingPreset]);

  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
    if (contactShadowPlaneRef.current) {
      contactShadowPlaneRef.current.visible = showShadows;
    }
  }, [showGrid, showShadows]);

  useEffect(() => {
    if (!buildResultRef.current) return;

    buildResultRef.current.partsMap.forEach((meshes, partId) => {
      const isSelected = partId === selectedPartId;
      meshes.forEach((mesh) => {
        const mat = mesh.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          if (isSelected) {
            mat.emissive = new THREE.Color(0x00f0ff);
            mat.emissiveIntensity = 2.0;
          } else {

            const orig = mesh.userData.originalMaterial;
            if (orig) {
              mat.emissive.copy(orig.emissive || new THREE.Color(0x000000));
              mat.emissiveIntensity = orig.emissiveIntensity || 0;
            }
          }
        }
      });
    });
  }, [selectedPartId]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mountRef.current || !cameraRef.current || !buildResultRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(
      buildResultRef.current.rootGroup.children,
      true
    );

    const hit = intersects.find((i) => i.object instanceof THREE.Mesh && i.object.userData.partId);

    if (hit && hit.object.userData.partId) {
      onSelectPart(hit.object.userData.partId);
    } else {

    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!mountRef.current || !cameraRef.current || !buildResultRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(
      buildResultRef.current.rootGroup.children,
      true
    );

    const hit = intersects.find((i) => i.object instanceof THREE.Mesh && i.object.userData.partId);
    if (hit) {
      setHoveredPartName(hit.object.userData.partName || null);
    } else {
      setHoveredPartName(null);
    }
  };

  const setCameraPreset = (preset: 'hero' | 'front' | 'back' | 'side' | 'top' | 'iso') => {
    if (!controlsRef.current || !cameraRef.current || !buildResultRef.current) return;

    const target = controlsRef.current.target;
    const bbox = new THREE.Box3().setFromObject(buildResultRef.current.rootGroup);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const dist = Math.max(size.x, size.y, size.z, 2) * 1.8;

    switch (preset) {
      case 'hero':
        cameraRef.current.position.set(target.x + dist * 0.75, target.y + dist * 0.5, target.z + dist * 0.75);
        break;
      case 'front':
        cameraRef.current.position.set(target.x, target.y + dist * 0.1, target.z + dist);
        break;
      case 'back':
        cameraRef.current.position.set(target.x, target.y + dist * 0.1, target.z - dist);
        break;
      case 'side':
        cameraRef.current.position.set(target.x + dist, target.y + dist * 0.1, target.z);
        break;
      case 'top':
        cameraRef.current.position.set(target.x, target.y + dist * 1.2, target.z + 0.01);
        break;
      case 'iso':
        cameraRef.current.position.set(target.x + dist * 0.8, target.y + dist * 0.8, target.z + dist * 0.8);
        break;
    }

    cameraRef.current.lookAt(target);
    controlsRef.current.update();
  };

  useEffect(() => {
    if (cameraPresetTrigger) {
      setCameraPreset(cameraPresetTrigger);
    }
  }, [cameraPresetTrigger]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onDropFile) {
      onDropFile(file);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-[#050716]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      />

      <StardustCanvas />

      {isDragOver && (
        <div className="absolute inset-0 z-30 bg-[#080518]/85 backdrop-blur-md border-2 border-dashed border-pink-400 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-100 shadow-[inset_0_0_60px_rgba(236,72,153,0.3)]">
          <Upload className="w-10 h-10 text-pink-300 mb-2 animate-bounce drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
          <span className="text-sm font-semibold text-white">Drop Image to Extrude 3D Mesh</span>
          <span className="text-xs text-purple-200 mt-1">Supports PNG, JPG, WebP</span>
        </div>
      )}

      {!blueprint && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-none">
          <div className="max-w-md w-full bg-gradient-to-b from-[#0e0a29]/95 via-[#140b36]/95 to-[#0b0822]/95 border border-purple-500/30 rounded-2xl p-8 text-center shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-md pointer-events-auto">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[2px] mx-auto mb-4 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
              <div className="w-full h-full bg-[#0a0720] rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-cyan-300" />
              </div>
            </div>
            <h2 className="text-base font-bold bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-300 bg-clip-text text-transparent mb-2">
              Drop 2D Artwork to Extrude 3D Mesh
            </h2>
            <p className="text-xs text-purple-200/80 mb-6 leading-relaxed">
              Transform logos, trading cards, and emblems into watertight .GLB assets with PBR bevel walls, Marching Squares isolines, and dual-sided back textures. 100% procedural code.
            </p>
            <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-cyan-400 text-white text-xs font-semibold cursor-pointer transition-all shadow-[0_0_20px_rgba(192,38,211,0.5)] border border-pink-400/40">
              <Upload className="w-4 h-4" />
              <span>Select Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && onDropFile) onDropFile(file);
                }}
                className="hidden"
              />
            </label>
            <div className="mt-3.5 text-[11px] text-purple-300/60 font-mono">
              PNG (transparent alpha), JPG, WebP
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 bg-[#0b0c24]/90 border border-purple-500/25 rounded-md p-0.5 text-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <button
            onClick={() => setCameraPreset('front')}
            className="px-2 py-1 rounded hover:bg-cyan-950/40 font-mono text-[10px] text-cyan-300/80 hover:text-cyan-200 transition-colors"
            title="Front View (Z+)"
          >
            FRONT
          </button>
          <button
            onClick={() => setCameraPreset('back')}
            className="px-2 py-1 rounded hover:bg-cyan-950/40 font-mono text-[10px] text-cyan-300/80 hover:text-cyan-200 transition-colors"
            title="Back View (Z-)"
          >
            BACK
          </button>
          <button
            onClick={() => setCameraPreset('hero')}
            className="px-2 py-1 rounded hover:bg-purple-950/40 font-mono text-[10px] text-purple-300/80 hover:text-purple-200 transition-colors"
            title="Hero Angle (45°)"
          >
            HERO
          </button>
          <button
            onClick={() => setCameraPreset('side')}
            className="px-2 py-1 rounded hover:bg-cyan-950/40 font-mono text-[10px] text-cyan-300/80 hover:text-cyan-200 transition-colors"
            title="Side View (X+)"
          >
            SIDE
          </button>
          <button
            onClick={() => setCameraPreset('top')}
            className="px-2 py-1 rounded hover:bg-cyan-950/40 font-mono text-[10px] text-cyan-300/80 hover:text-cyan-200 transition-colors"
            title="Top View (Y+)"
          >
            TOP
          </button>
          <button
            onClick={() => setCameraPreset('iso')}
            className="px-2 py-1 rounded hover:bg-pink-950/40 font-mono text-[10px] text-pink-300/80 hover:text-pink-200 transition-colors"
            title="Isometric View"
          >
            ISO
          </button>

          <span className="w-px h-3.5 bg-purple-500/30 mx-0.5" />

          <button
            onClick={() => setAutoTurntable(!autoTurntable)}
            className={`p-1 rounded transition-colors ${
              autoTurntable
                ? 'bg-zinc-800 text-zinc-100'
                : 'hover:bg-zinc-800 text-zinc-500'
            }`}
            title="Toggle 360° Turntable Rotation"
          >
            <RotateCcw
              className={`w-3 h-3 ${autoTurntable ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
            />
          </button>
        </div>

        {hoveredPartName && (
          <div className="bg-[#121215]/90 border border-[#27272a] rounded px-2 py-1 text-[10px] font-mono text-zinc-300 shadow-md flex items-center gap-1.5">
            <Info className="w-3 h-3 text-zinc-400" />
            <span>{hoveredPartName}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 z-10 pointer-events-none hidden sm:block">
        <div className="bg-[#121215]/80 border border-[#27272a]/80 rounded px-2 py-1 text-[10px] font-mono text-zinc-500 flex items-center gap-3">
          <span>LMB: Rotate</span>
          <span>RMB: Pan</span>
          <span>Scroll: Zoom</span>
        </div>
      </div>
    </div>
  );
};
