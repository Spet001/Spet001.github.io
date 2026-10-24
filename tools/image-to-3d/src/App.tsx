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
  ViewportStats,
} from './types/model3d';
import { HeaderBar } from './components/HeaderBar';
import { Viewport3D } from './components/Viewport3D';
import { StudioInspector } from './components/StudioInspector';
import {
  downloadBlob,
  exportToGlb,
  exportToGltf,
  exportToObj,
  generateManifestJson,
} from './lib/glbExporter';
import { create3DFromImage, updateBackMaterialInGroup } from './lib/imageContourExtruder';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [blueprint, setBlueprint] = useState<Model3DBlueprint | null>(null);
  const [history, setHistory] = useState<Model3DBlueprint[]>([]);
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

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cameraPresetTrigger, setCameraPresetTrigger] = useState<'hero' | 'front' | 'back' | 'side' | 'top' | 'iso' | null>(null);

  const handleTriggerCameraPreset = (preset: 'hero' | 'front' | 'back' | 'side' | 'top' | 'iso') => {
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

  const handleUpdateBackMaterialRealtime = async (options: {
    backMode: BackFaceMode;
    backColor: string;
    backImageSource: string | null;
    backRoughness: number;
    backMetalness: number;
  }) => {
    if (blueprint?.customGroup) {
      await updateBackMaterialInGroup(blueprint.customGroup, options);
      setBlueprint((prev) => (prev ? {
        ...prev,
        backMode: options.backMode,
        backColor: options.backColor,
        backImage: options.backImageSource || undefined,
        backRoughness: options.backRoughness,
        backMetalness: options.backMetalness,
      } : null));
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
      const filename = `${(blueprint?.title || 'mesh').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.glb`;
      const blob = await exportToGlb(rootGroupRef.current, filename);
      downloadBlob(blob, filename);
      showToast(`Downloaded standard binary "${filename}" (Unreal, Unity, Godot & Blender compatible).`);
    } catch (err) {
      console.error('Export GLB error:', err);
      showToast('Failed to export GLB file', 'error');
    }
  };

  const handleExportGltf = async () => {
    if (!rootGroupRef.current) return;
    try {
      const filename = `${(blueprint?.title || 'mesh').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.gltf`;
      const blob = await exportToGltf(rootGroupRef.current, filename);
      downloadBlob(blob, filename);
      showToast(`Downloaded glTF JSON "${filename}"!`);
    } catch (err) {
      showToast('Failed to export glTF file', 'error');
    }
  };

  const handleExportObj = () => {
    if (!rootGroupRef.current) return;
    try {
      const filename = `${(blueprint?.title || 'mesh').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.obj`;
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
      const filename = `${blueprint.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_manifest.json`;
      const blob = generateManifestJson(blueprint, stats);
      downloadBlob(blob, filename);
      showToast(`Downloaded game asset manifest "${filename}" with sockets & collision bounds!`);
    } catch (err) {
      showToast('Failed to export manifest JSON', 'error');
    }
  };

  const handleDroppedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      handleExtrudeImage3D(dataUrl, cleanTitle, 0.14, 0.012, '#f59e0b');
    };
    reader.readAsDataURL(file);
  };

  const handleHeaderFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleDroppedFile(file);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060717] font-sans text-zinc-100 flex flex-col">

      <HeaderBar
        blueprint={blueprint}
        stats={stats}
        onExportGlb={handleExportGlb}
        onUploadClick={() => fileInputRef.current?.click()}
        isGenerating={isGenerating}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
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
          />
        </main>

        <StudioInspector
          blueprint={blueprint}
          stats={stats}
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
          onExtrudeImage3D={handleExtrudeImage3D}
          onUpdateBackMaterialRealtime={handleUpdateBackMaterialRealtime}
          onTriggerCameraPreset={handleTriggerCameraPreset}
          isGenerating={isGenerating}
          generationStep={generationStep}
        />
      </div>

      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#120a2e]/95 via-[#1c0d3a]/95 to-[#0e0c29]/95 border border-purple-500/35 text-xs font-medium text-purple-100 shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(168,85,247,0.25)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow-[0_0_6px_#34d399]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 drop-shadow-[0_0_6px_#f472b6]" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-purple-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
