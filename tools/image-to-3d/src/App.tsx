import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import {
  BackFaceMode,
  LightingPreset,
  Model3DBlueprint,
  Part3D,
  RenderMode,
  ShapeMode,
  BackgroundMode,
  UnityGlbInclusionOptions,
  UnityPrefabItem,
  UnityTextureItem,
  ViewportStats,
} from './types/model3d';
import { HeaderBar } from './components/HeaderBar';
import { Viewport3D } from './components/Viewport3D';
import { InspectorTab, StudioInspector } from './components/StudioInspector';
import {
  downloadBlob,
  downloadDataUrl,
  exportToGlb,
  exportToGltf,
  exportToObj,
  exportUnityLightsAndTransformsJson,
  generateManifestJson,
} from './lib/glbExporter';
import { create3DFromImage, updateBackMaterialInGroup } from './lib/imageContourExtruder';
import { HtmlConversionOptions, parseThreeJsHtmlTo3D } from './lib/htmlSceneConverter';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [blueprint, setBlueprint] = useState<Model3DBlueprint | null>(null);
  const [, setHistory] = useState<Model3DBlueprint[]>([]);
  const [activeTab, setActiveTab] = useState<InspectorTab>('extrude');
  const [stats, setStats] = useState<ViewportStats>({
    triangles: 0,
    vertices: 0,
    drawCalls: 0,
    dimensions: { x: 0, y: 0, z: 0 },
    estimatedGlbKb: 0,
  });

  const [renderMode, setRenderMode] = useState<RenderMode>('pbr');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio');
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [showWireframeOverlay, setShowWireframeOverlay] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showShadows, setShowShadows] = useState<boolean>(true);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  // Unity Export Suite Main .GLB Inclusion Toggles (All ON by default)
  const [unityInclusion, setUnityInclusion] = useState<UnityGlbInclusionOptions>({
    includePropsDetails: true,
    includeBillboardsSprites: true,
    includeSceneLights: true,
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const htmlFileInputRef = useRef<HTMLInputElement | null>(null);
  const [cameraPresetTrigger, setCameraPresetTrigger] = useState<
    'hero' | 'front' | 'back' | 'side' | 'top' | 'iso' | null
  >(null);

  const handleTriggerCameraPreset = (
    preset: 'hero' | 'front' | 'back' | 'side' | 'top' | 'iso'
  ) => {
    setCameraPresetTrigger(preset);
    setTimeout(() => setCameraPresetTrigger(null), 150);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleExtrudeImage3D = async (
    imageSource: string,
    title: string,
    depth: number,
    bevelSize: number,
    edgeColor: string,
    backMode: BackFaceMode = 'repeat_front',
    backColor: string = '#18181b',
    backImageSource: string | null = null,
    backMirror: boolean = false,
    backRoughness: number = 0.4,
    backMetalness: number = 0.2,
    shapeMode: ShapeMode = 'auto',
    backgroundMode: BackgroundMode = 'auto',
    backgroundTolerance: number = 0.18,
    addPedestal: boolean = false
  ) => {
    setIsGenerating(true);
    setGenerationStep('Extracting Marching Squares contours & generating PBR bevels...');

    try {
      const result = await create3DFromImage(imageSource, title, {
        depth,
        bevelSize,
        edgeColor,
        edgeMetalness: 0.85,
        edgeRoughness: 0.25,
        shapeMode,
        backgroundMode,
        backgroundTolerance,
        backMode,
        backColor,
        backImageSource,
        backMirror,
        backRoughness,
        backMetalness,
        addPedestal,
      });

      const newBlueprint: Model3DBlueprint = {
        ...result.blueprint,
        customGroup: result.group,
        sourceImage: imageSource,
        shapeMode,
        backgroundMode,
        backImage: backImageSource || undefined,
        backMode,
        backColor,
        backRoughness,
        backMetalness,
        backMirror,
      };

      if (blueprint) {
        setHistory((prev) => [blueprint, ...prev.slice(0, 10)]);
      }
      setBlueprint(newBlueprint);
      setStats(result.stats);
      setSelectedPartId(null);
      setExplodedFactor(0);
      showToast(`3D mesh "${title}" generated! Ready for .GLB export.`);
    } catch (err: any) {
      console.error('Extrusion error:', err);
      showToast(err.message || 'Failed to generate 3D mesh from image', 'error');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleConvertHtmlScene3D = async (
    htmlContent: string,
    customTitle: string,
    options: HtmlConversionOptions = {}
  ) => {
    setIsGenerating(true);
    setGenerationStep('Executing Three.js HTML sandbox & extracting 1:1 3D scene...');

    try {
      const defaultInclusion: UnityGlbInclusionOptions = {
        includePropsDetails: true,
        includeBillboardsSprites: true,
        includeSceneLights: true,
      };
      setUnityInclusion(defaultInclusion);

      const result = await parseThreeJsHtmlTo3D(htmlContent, customTitle, options);

      if (blueprint) {
        setHistory((prev) => [blueprint, ...prev.slice(0, 10)]);
      }
      setBlueprint(result.blueprint);
      setStats(result.stats);
      setSelectedPartId(null);
      setExplodedFactor(0);
      setActiveTab('html2glb');

      if (options.autoExportGlb !== false) {
        const filename = `${(result.blueprint.title || 'threejs_scene')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')}.glb`;
        const glbBlob = await exportToGlb(result.group, filename, defaultInclusion);
        downloadBlob(glbBlob, filename);
        showToast(
          `Converted "${result.blueprint.title}" (1:1 scale, ${result.extractedMeshCount} meshes) & exported "${filename}"!`
        );
      } else {
        showToast(
          `Extracted "${result.blueprint.title}" (${result.extractedMeshCount} meshes, 1:1 scale) — Unity Export Suite ready!`
        );
      }
    } catch (err: any) {
      console.error('HTML to 3D conversion error:', err);
      showToast(err.message || 'Failed to convert Three.js HTML scene to 3D GLB', 'error');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleUpdateBackMaterialRealtime = async (options: {
    backMode: BackFaceMode;
    backColor: string;
    backImageSource: string | null;
    backRoughness: number;
    backMetalness: number;
  }) => {
    if (blueprint?.customGroup) {
      await updateBackMaterialInGroup(blueprint.customGroup, options);
      setBlueprint((prev) =>
        prev
          ? {
              ...prev,
              backMode: options.backMode,
              backColor: options.backColor,
              backImage: options.backImageSource || undefined,
              backRoughness: options.backRoughness,
              backMetalness: options.backMetalness,
            }
          : null
      );
    }
  };

  const handleUpdatePartMaterial = (
    partId: string,
    updates: Partial<Part3D['material']>
  ) => {
    setBlueprint((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        parts: prev.parts.map((p) => {
          if (p.id === partId) {
            return {
              ...p,
              material: {
                ...p.material,
                ...updates,
              },
            };
          }
          return p;
        }),
      };
    });
  };

  const handleExportGlb = async () => {
    if (!rootGroupRef.current) return;
    try {
      const filename = `${(blueprint?.title || 'mesh')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}.glb`;
      const blob = await exportToGlb(rootGroupRef.current, filename, unityInclusion);
      downloadBlob(blob, filename);
      showToast(
        `Downloaded 1:1 binary "${filename}" (Unity, Unreal, Godot & Blender ready).`
      );
    } catch (err) {
      console.error('Export GLB error:', err);
      showToast('Failed to export GLB file', 'error');
    }
  };

  const handleExportGltf = async () => {
    if (!rootGroupRef.current) return;
    try {
      const filename = `${(blueprint?.title || 'mesh')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}.gltf`;
      const blob = await exportToGltf(rootGroupRef.current, filename, unityInclusion);
      downloadBlob(blob, filename);
      showToast(`Downloaded glTF JSON "${filename}"!`);
    } catch (err) {
      showToast('Failed to export glTF file', 'error');
    }
  };

  const handleExportObj = () => {
    if (!rootGroupRef.current) return;
    try {
      const filename = `${(blueprint?.title || 'mesh')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}.obj`;
      const blob = exportToObj(rootGroupRef.current, blueprint?.title || 'Model');
      downloadBlob(blob, filename);
      showToast(`Downloaded Wavefront OBJ "${filename}"!`);
    } catch (err) {
      showToast('Failed to export OBJ file', 'error');
    }
  };

  const handleExportManifest = () => {
    if (!blueprint) return;
    try {
      const filename = `${blueprint.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}_manifest.json`;
      const blob = generateManifestJson(blueprint, stats);
      downloadBlob(blob, filename);
      showToast(
        `Downloaded game asset manifest "${filename}" with sockets & collision bounds!`
      );
    } catch (err) {
      showToast('Failed to export manifest JSON', 'error');
    }
  };

  const handleExportPrefabGlb = async (prefab: UnityPrefabItem) => {
    try {
      const filename = `${prefab.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}_prefab.glb`;
      const blob = await exportToGlb(prefab.prefabGroup, filename);
      downloadBlob(blob, filename);
      showToast(
        `Exported Unity prefab "${filename}" with origin pivot (X:0, minY:0, Z:0)!`
      );
    } catch (err) {
      console.error('Prefab GLB export error:', err);
      showToast(`Failed to export prefab "${prefab.name}"`, 'error');
    }
  };

  const handleExportAllPrefabsGlb = async () => {
    const prefabs = blueprint?.unitySuite?.prefabs || [];
    if (prefabs.length === 0) return;
    try {
      for (const prefab of prefabs) {
        const filename = `${prefab.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')}_prefab.glb`;
        const blob = await exportToGlb(prefab.prefabGroup, filename);
        downloadBlob(blob, filename);
      }
      showToast(`Exported ${prefabs.length} individual Unity prefabs (.GLB)!`);
    } catch (err) {
      console.error('Batch prefab export error:', err);
      showToast('Failed to export all prefabs', 'error');
    }
  };

  const handleExportTexturePng = (tex: UnityTextureItem) => {
    const filename = `${tex.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')}.png`;
    downloadDataUrl(tex.dataUrl, filename);
    showToast(`Downloaded texture "${filename}" (${tex.width}×${tex.height}px)!`);
  };

  const handleExportAllTexturesPng = () => {
    const textures = blueprint?.unitySuite?.textures || [];
    if (textures.length === 0) return;
    for (const tex of textures) {
      const filename = `${tex.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}.png`;
      downloadDataUrl(tex.dataUrl, filename);
    }
    showToast(`Exported ${textures.length} textures / sprites (.PNG)!`);
  };

  const handleExportLightsJson = () => {
    if (!blueprint) return;
    try {
      const filename = `${blueprint.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')}_unity_lights.json`;
      const blob = exportUnityLightsAndTransformsJson(blueprint, stats);
      downloadBlob(blob, filename);
      const count = blueprint.unitySuite?.lights.length || 0;
      showToast(
        `Exported "${filename}" (${count} lights in Unity Left-Handed coordinates)!`
      );
    } catch (err) {
      showToast('Failed to export Unity lights JSON', 'error');
    }
  };

  const handleDroppedFile = (file: File) => {
    const isHtmlOrJs =
      /\.(html?|js)$/i.test(file.name) ||
      file.type === 'text/html' ||
      file.type === 'text/javascript';

    if (isHtmlOrJs) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const htmlText = (e.target?.result as string) || '';
        const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        handleConvertHtmlScene3D(htmlText, cleanTitle, {
          centerOnGround: true,
          includeEnvironmentMeshes: false,
          autoExportGlb: true,
        });
      };
      reader.readAsText(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setActiveTab('extrude');
      handleExtrudeImage3D(dataUrl, cleanTitle, 0.14, 0.012, '#f59e0b');
    };
    reader.readAsDataURL(file);
  };

  const handleHeaderFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleDroppedFile(file);
    e.target.value = '';
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060717] font-sans text-zinc-100 flex flex-col">
      <HeaderBar
        blueprint={blueprint}
        stats={stats}
        onExportGlb={handleExportGlb}
        onUploadClick={() => fileInputRef.current?.click()}
        onUploadHtmlClick={() => {
          setActiveTab('html2glb');
          htmlFileInputRef.current?.click();
        }}
        isGenerating={isGenerating}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleHeaderFileUpload}
        className="hidden"
      />

      <input
        ref={htmlFileInputRef}
        type="file"
        accept=".html,.htm,.js,text/html"
        onChange={handleHeaderFileUpload}
        className="hidden"
      />

      <div className="relative flex-1 w-full h-[calc(100vh-48px)] flex overflow-hidden">
        <main className="relative flex-1 h-full overflow-hidden bg-[#050716]">
          <Viewport3D
            blueprint={blueprint}
            renderMode={renderMode}
            lightingPreset={lightingPreset}
            explodedFactor={explodedFactor}
            showWireframeOverlay={showWireframeOverlay}
            showGrid={showGrid}
            showShadows={showShadows}
            selectedPartId={selectedPartId}
            onSelectPart={setSelectedPartId}
            onStatsUpdated={setStats}
            rootGroupRef={rootGroupRef}
            cameraPresetTrigger={cameraPresetTrigger}
            onDropFile={handleDroppedFile}
            unityInclusion={unityInclusion}
          />
        </main>

        <StudioInspector
          blueprint={blueprint}
          stats={stats}
          activeTab={activeTab}
          onSetActiveTab={setActiveTab}
          renderMode={renderMode}
          onSetRenderMode={setRenderMode}
          lightingPreset={lightingPreset}
          onSetLightingPreset={setLightingPreset}
          explodedFactor={explodedFactor}
          onSetExplodedFactor={setExplodedFactor}
          showWireframeOverlay={showWireframeOverlay}
          onToggleWireframeOverlay={() => setShowWireframeOverlay(!showWireframeOverlay)}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}
          showShadows={showShadows}
          onToggleShadows={() => setShowShadows(!showShadows)}
          selectedPartId={selectedPartId}
          onSelectPart={setSelectedPartId}
          onUpdatePartMaterial={handleUpdatePartMaterial}
          onExportGlb={handleExportGlb}
          onExportGltf={handleExportGltf}
          onExportObj={handleExportObj}
          onExportManifest={handleExportManifest}
          unityInclusion={unityInclusion}
          onChangeUnityInclusion={setUnityInclusion}
          onExportPrefabGlb={handleExportPrefabGlb}
          onExportAllPrefabsGlb={handleExportAllPrefabsGlb}
          onExportTexturePng={handleExportTexturePng}
          onExportAllTexturesPng={handleExportAllTexturesPng}
          onExportLightsJson={handleExportLightsJson}
          onExtrudeImage3D={handleExtrudeImage3D}
          onConvertHtmlScene3D={handleConvertHtmlScene3D}
          onUpdateBackMaterialRealtime={handleUpdateBackMaterialRealtime}
          onTriggerCameraPreset={handleTriggerCameraPreset}
          isGenerating={isGenerating}
          generationStep={generationStep}
        />
      </div>

      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#120a2e]/95 via-[#1c0d3a]/95 to-[#0e0c29]/95 border border-purple-500/35 text-xs font-medium text-purple-100 shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(168,85,247,0.25)] animate-in fade-in slide-in-from-top-2 duration-150">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow-[0_0_6px_#34d399]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 drop-shadow-[0_0_6px_#f472b6]" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 text-purple-400 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
