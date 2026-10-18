import React, { useState, useEffect } from 'react';
import {
  Upload,
  Download,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import {
  BackgroundMode,
  BackFaceMode,
  LightingPreset,
  Model3DBlueprint,
  Part3D,
  RenderMode,
  ShapeMode,
  ViewportStats,
} from '../types/model3d';
import { OFFICIAL_CARD_BACKS } from '../lib/presetModels';

interface StudioInspectorProps {
  blueprint: Model3DBlueprint | null;
  stats: ViewportStats;
  renderMode: RenderMode;
  onSetRenderMode: (mode: RenderMode) => void;
  lightingPreset: LightingPreset;
  onSetLightingPreset: (preset: LightingPreset) => void;
  explodedFactor: number;
  onSetExplodedFactor: (val: number) => void;
  showWireframeOverlay: boolean;
  onToggleWireframeOverlay: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showShadows: boolean;
  onToggleShadows: () => void;
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
  onUpdatePartMaterial: (partId: string, updates: Partial<Part3D['material']>) => void;
  onExportGlb: () => void;
  onExportGltf: () => void;
  onExportObj: () => void;
  onExportManifest: () => void;
  onExtrudeImage3D: (
    imageSource: string,
    title: string,
    depth: number,
    bevelSize: number,
    edgeColor: string,
    backMode?: BackFaceMode,
    backColor?: string,
    backImageSource?: string | null,
    backMirror?: boolean,
    backRoughness?: number,
    backMetalness?: number,
    shapeMode?: ShapeMode,
    backgroundMode?: BackgroundMode,
    backgroundTolerance?: number,
    addPedestal?: boolean
  ) => void;
  onUpdateBackMaterialRealtime?: (options: {
    backMode: BackFaceMode;
    backColor: string;
    backImageSource: string | null;
    backRoughness: number;
    backMetalness: number;
  }) => void;
  onTriggerCameraPreset?: (preset: 'hero' | 'front' | 'back' | 'side' | 'top' | 'iso') => void;
  isGenerating: boolean;
  generationStep: string;
}

export const StudioInspector: React.FC<StudioInspectorProps> = ({
  blueprint,
  stats,
  renderMode,
  onSetRenderMode,
  lightingPreset,
  onSetLightingPreset,
  explodedFactor,
  onSetExplodedFactor,
  showWireframeOverlay,
  onToggleWireframeOverlay,
  showGrid,
  onToggleGrid,
  showShadows,
  onToggleShadows,
  selectedPartId,
  onSelectPart,
  onUpdatePartMaterial,
  onExportGlb,
  onExportGltf,
  onExportObj,
  onExportManifest,
  onExtrudeImage3D,
  onUpdateBackMaterialRealtime,
  onTriggerCameraPreset,
  isGenerating,
  generationStep,
}) => {
  const [activeTab, setActiveTab] = useState<'extrude' | 'shading' | 'materials'>('extrude');

  // Extruder parameters
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extrudeDepth, setExtrudeDepth] = useState<number>(0.14);
  const [extrudeBevel, setExtrudeBevel] = useState<number>(0.012);
  const [extrudeEdgeColor, setExtrudeEdgeColor] = useState<string>('#f59e0b');
  const [extrudeTitle, setExtrudeTitle] = useState<string>('Custom 3D Mesh');
  const [shapeMode, setShapeMode] = useState<ShapeMode>('auto');
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('auto');
  const [backgroundTolerance, setBackgroundTolerance] = useState<number>(0.18);
  const [addPedestal, setAddPedestal] = useState<boolean>(false);

  // Backface parameters
  const [backMode, setBackMode] = useState<BackFaceMode>('repeat_front');
  const [backColor, setBackColor] = useState<string>('#18181b');
  const [backImage, setBackImage] = useState<string | null>(null);
  const [backMirror, setBackMirror] = useState<boolean>(false);
  const [backRoughness, setBackRoughness] = useState<number>(0.4);
  const [backMetalness, setBackMetalness] = useState<number>(0.2);

  // Sync blueprint state
  useEffect(() => {
    if (!blueprint) return;
    if (blueprint.sourceImage && !uploadedImage) {
      setUploadedImage(blueprint.sourceImage);
    }
    if (blueprint.title && blueprint.title !== 'Custom 3D Mesh') {
      setExtrudeTitle(blueprint.title);
    }
    if (blueprint.shapeMode) {
      setShapeMode(blueprint.shapeMode);
    }
    if (blueprint.backgroundMode) {
      setBackgroundMode(blueprint.backgroundMode);
    }
    if (blueprint.backMode) {
      setBackMode(blueprint.backMode);
    }
    if (blueprint.backColor) {
      setBackColor(blueprint.backColor);
    }
    if (blueprint.backImage) {
      setBackImage(blueprint.backImage);
    }
    if (blueprint.backRoughness !== undefined) {
      setBackRoughness(blueprint.backRoughness);
    }
    if (blueprint.backMetalness !== undefined) {
      setBackMetalness(blueprint.backMetalness);
    }
    if (blueprint.backMirror !== undefined) {
      setBackMirror(blueprint.backMirror);
    }
  }, [blueprint]);

  // Handle uploaded file
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedImage(dataUrl);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setExtrudeTitle(cleanTitle);

      onExtrudeImage3D(
        dataUrl,
        cleanTitle,
        extrudeDepth,
        extrudeBevel,
        extrudeEdgeColor,
        backMode,
        backColor,
        backImage,
        backMirror,
        backRoughness,
        backMetalness,
        shapeMode,
        backgroundMode,
        backgroundTolerance,
        addPedestal
      );
    };
    reader.readAsDataURL(file);
  };

  const handleBackImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setBackImage(dataUrl);
      setBackMode('custom_image');
      triggerExtrusion({ backM: 'custom_image', backImg: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const triggerExtrusion = (override?: {
    image?: string;
    title?: string;
    depth?: number;
    bevel?: number;
    edgeColor?: string;
    backM?: BackFaceMode;
    backC?: string;
    backImg?: string | null;
    backMirr?: boolean;
    backR?: number;
    backMtl?: number;
    sMode?: ShapeMode;
    bgMode?: BackgroundMode;
    bgTol?: number;
    pedestal?: boolean;
  }) => {
    const img = override?.image ?? uploadedImage;
    if (!img) return;

    onExtrudeImage3D(
      img,
      override?.title ?? extrudeTitle,
      override?.depth ?? extrudeDepth,
      override?.bevel ?? extrudeBevel,
      override?.edgeColor ?? extrudeEdgeColor,
      override?.backM ?? backMode,
      override?.backC ?? backColor,
      override?.backImg !== undefined ? override.backImg : backImage,
      override?.backMirr !== undefined ? override.backMirr : backMirror,
      override?.backR ?? backRoughness,
      override?.backMtl ?? backMetalness,
      override?.sMode ?? shapeMode,
      override?.bgMode ?? backgroundMode,
      override?.bgTol ?? backgroundTolerance,
      override?.pedestal !== undefined ? override.pedestal : addPedestal
    );
  };

  const selectedPart = blueprint?.parts?.find((p) => p.id === selectedPartId) || blueprint?.parts?.[0] || null;

  return (
    <aside className="w-80 h-full flex flex-col bg-gradient-to-b from-[#07081b]/95 via-[#0e0a29]/95 to-[#160731]/95 border-l border-purple-500/25 text-zinc-100 select-none shrink-0 z-10 backdrop-blur-xl shadow-[-12px_0_40px_rgba(0,0,0,0.7)]">
      {/* Tab Switcher - Clean typographic tabs */}
      <div className="flex items-center border-b border-purple-500/25 bg-[#050616]/90 px-2.5 py-2 gap-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => setActiveTab('extrude')}
          className={`flex-1 py-1.5 text-xs rounded-md transition-all text-center font-medium ${
            activeTab === 'extrude'
              ? 'bg-gradient-to-r from-violet-600/35 via-fuchsia-600/25 to-pink-600/35 text-pink-200 font-semibold border border-pink-400/50 shadow-[0_0_16px_rgba(236,72,153,0.35)]'
              : 'text-zinc-400 hover:text-pink-200 hover:bg-pink-950/20 border border-transparent'
          }`}
        >
          Extruder
        </button>
        <button
          onClick={() => setActiveTab('shading')}
          className={`flex-1 py-1.5 text-xs rounded-md transition-all text-center font-medium ${
            activeTab === 'shading'
              ? 'bg-gradient-to-r from-cyan-600/35 via-blue-600/25 to-indigo-600/35 text-cyan-200 font-semibold border border-cyan-400/50 shadow-[0_0_16px_rgba(6,182,212,0.35)]'
              : 'text-zinc-400 hover:text-cyan-200 hover:bg-cyan-950/20 border border-transparent'
          }`}
        >
          Viewport
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-1.5 text-xs rounded-md transition-all text-center font-medium ${
            activeTab === 'materials'
              ? 'bg-gradient-to-r from-amber-600/30 via-purple-600/25 to-violet-600/35 text-amber-200 font-semibold border border-amber-400/50 shadow-[0_0_16px_rgba(245,158,11,0.35)]'
              : 'text-zinc-400 hover:text-amber-200 hover:bg-amber-950/20 border border-transparent'
          }`}
        >
          Materials
        </button>
      </div>

      {/* Panel Scrollable Content (CSS Selector 2) - Galaxy multi-colored sections */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs scrollbar-thin scrollbar-thumb-purple-900/50">
        {/* TAB 1: 2D-TO-3D EXTRUDER */}
        {activeTab === 'extrude' && (
          <div className="space-y-4">
            {/* Section 1: Source Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase text-pink-300">
                  Source Artwork
                </span>
                {uploadedImage && (
                  <span className="text-[10px] text-pink-300/80 font-mono">1 Image Loaded</span>
                )}
              </div>

              <label className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-pink-500/30 hover:border-pink-400/80 bg-gradient-to-br from-[#120926]/85 to-[#1d0a33]/85 hover:from-[#190c36] hover:to-[#260e42] cursor-pointer transition-all text-center shadow-[0_0_18px_rgba(236,72,153,0.12)]">
                {uploadedImage ? (
                  <div className="flex items-center gap-3 w-full">
                    <img
                      src={uploadedImage}
                      alt="Source"
                      className="w-12 h-12 object-contain rounded bg-[#090616] border border-pink-500/40 p-1 shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    />
                    <div className="text-left overflow-hidden flex-1">
                      <span className="text-xs font-semibold text-pink-100 truncate block">
                        {extrudeTitle}
                      </span>
                      <span className="text-[10px] text-pink-300/70 block">Click to replace file</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 py-2">
                    <Upload className="w-5 h-5 text-pink-400 mx-auto mb-1 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]" />
                    <span className="text-xs font-medium text-pink-200 block">Upload 2D Image</span>
                    <span className="text-[10px] text-purple-300/60 block">PNG (transparent), JPG, WebP</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Title input */}
              <div className="space-y-1 pt-1">
                <label className="text-[10px] font-mono uppercase text-pink-300/80 block">
                  Asset Title
                </label>
                <input
                  type="text"
                  value={extrudeTitle}
                  onChange={(e) => setExtrudeTitle(e.target.value)}
                  onBlur={() => {
                    if (uploadedImage) triggerExtrusion({ title: extrudeTitle });
                  }}
                  className="w-full bg-[#0a0822] border border-pink-500/30 rounded px-2.5 py-1.5 text-xs text-pink-100 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/50 shadow-inner"
                  placeholder="Asset Title..."
                />
              </div>
            </div>

            {/* Section 2: Geometry Type */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 block">
                Mesh Geometry
              </span>
              <div className="grid grid-cols-2 gap-1 bg-[#090b24] p-1 rounded-lg border border-cyan-500/30">
                {[
                  { id: 'auto', label: 'Auto Detect' },
                  { id: 'contour', label: 'Contour Logo' },
                  { id: 'plaque', label: 'Emblem Plaque' },
                  { id: 'card', label: 'Card Slab' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const s = item.id as ShapeMode;
                      setShapeMode(s);
                      triggerExtrusion({ sMode: s });
                    }}
                    className={`py-1.5 text-xs rounded transition-all font-medium text-center ${
                      shapeMode === item.id
                        ? 'bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-cyan-200 border border-cyan-400/60 shadow-[0_0_14px_rgba(6,182,212,0.3)]'
                        : 'text-zinc-400 hover:text-cyan-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Background Removal */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300 block">
                Background Cleanup
              </span>
              <div className="grid grid-cols-3 gap-1 bg-[#081324] p-1 rounded-lg border border-emerald-500/30">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'transparent', label: 'Alpha' },
                  { id: 'remove_white', label: 'White' },
                  { id: 'remove_black', label: 'Black' },
                  { id: 'remove_corner', label: 'Corners' },
                  { id: 'keep_all', label: 'None' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const bg = item.id as BackgroundMode;
                      setBackgroundMode(bg);
                      triggerExtrusion({ bgMode: bg });
                    }}
                    className={`py-1 text-xs rounded transition-all text-center ${
                      backgroundMode === item.id
                        ? 'bg-gradient-to-r from-emerald-600/40 to-teal-600/40 text-emerald-200 font-medium border border-emerald-400/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                        : 'text-zinc-400 hover:text-emerald-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Dimensions & Bevel */}
            <div className="space-y-2.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-violet-300 block">
                Extrusion & Bevel
              </span>

              {/* Depth */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Extrusion Depth</span>
                  <span className="text-violet-300 font-medium">{extrudeDepth.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="0.04"
                  max="0.50"
                  step="0.01"
                  value={extrudeDepth}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setExtrudeDepth(val);
                    triggerExtrusion({ depth: val });
                  }}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </div>

              {/* Bevel */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Bevel Radius</span>
                  <span className="text-violet-300 font-medium">{extrudeBevel.toFixed(3)} m</span>
                </div>
                <input
                  type="range"
                  min="0.004"
                  max="0.040"
                  step="0.002"
                  value={extrudeBevel}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setExtrudeBevel(val);
                    triggerExtrusion({ bevel: val });
                  }}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </div>

              {/* Edge Finish Color - Starlight Palette */}
              <div className="flex items-center justify-between p-2 rounded bg-gradient-to-r from-[#140d33]/80 to-[#220c3a]/80 border border-violet-500/30">
                <span className="text-xs text-violet-200">Bevel Wall Color</span>
                <div className="flex items-center gap-1.5">
                  {[
                    '#f59e0b',
                    '#ec4899',
                    '#8b5cf6',
                    '#06b6d4',
                    '#10b981',
                    '#e2e8f0',
                    '#18181b',
                  ].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => {
                        setExtrudeEdgeColor(hex);
                        triggerExtrusion({ edgeColor: hex });
                      }}
                      className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                        extrudeEdgeColor.toLowerCase() === hex.toLowerCase()
                          ? 'scale-125 border-white ring-2 ring-violet-400/60 shadow-[0_0_10px_currentColor]'
                          : 'border-zinc-700 hover:scale-110'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                  <input
                    type="color"
                    value={extrudeEdgeColor}
                    onChange={(e) => {
                      setExtrudeEdgeColor(e.target.value);
                      triggerExtrusion({ edgeColor: e.target.value });
                    }}
                    className="w-4 h-4 rounded border border-violet-500/40 cursor-pointer bg-transparent ml-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Back Face Configuration */}
            <div className="space-y-2 border-t border-purple-500/25 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300">
                  Back Face Material
                </span>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('back')}
                  className="text-[10px] font-mono text-cyan-300 hover:text-cyan-100 underline cursor-pointer"
                >
                  View Rear (Z-)
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-[#160d26] p-1 rounded-lg border border-amber-500/30">
                {[
                  { id: 'repeat_front', label: 'Repeat' },
                  { id: 'color_fill', label: 'Solid' },
                  { id: 'custom_image', label: 'Custom' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const bm = item.id as BackFaceMode;
                      setBackMode(bm);
                      triggerExtrusion({ backM: bm });
                    }}
                    className={`py-1 text-xs rounded transition-all text-center ${
                      backMode === item.id
                        ? 'bg-gradient-to-r from-amber-600/40 to-pink-600/40 text-amber-200 font-medium border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'text-zinc-400 hover:text-amber-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {backMode === 'repeat_front' && (
                <div className="p-2.5 rounded bg-[#150e2e]/70 border border-purple-500/25 space-y-2 text-xs">
                  <div className="text-[11px] text-purple-200/90 leading-snug">
                    Front texture mapped onto back face with independent UV coordinates.
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={backMirror}
                      onChange={(e) => {
                        setBackMirror(e.target.checked);
                        triggerExtrusion({ backM: 'repeat_front', backMirr: e.target.checked });
                      }}
                      className="rounded accent-purple-400 cursor-pointer"
                    />
                    <span className="text-zinc-200">
                      Mirror horizontal coordinates
                    </span>
                  </label>
                  <div className="text-[10px] text-purple-300/70 font-mono">
                    {backMirror
                      ? 'Mirrored stencil orientation.'
                      : 'Upright 1:1 orientation (readable directly from rear view).'}
                  </div>
                </div>
              )}

              {backMode === 'color_fill' && (
                <div className="flex items-center justify-between p-2 rounded bg-[#150e2e]/70 border border-purple-500/25 text-xs">
                  <span className="text-zinc-200">Back Surface Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={backColor}
                      onChange={(e) => {
                        setBackColor(e.target.value);
                        if (onUpdateBackMaterialRealtime) {
                          onUpdateBackMaterialRealtime({
                            backMode: 'color_fill',
                            backColor: e.target.value,
                            backImageSource: backImage,
                            backRoughness,
                            backMetalness,
                          });
                        }
                      }}
                      className="w-5 h-5 rounded border border-purple-500/40 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[10px] text-purple-300 uppercase">{backColor}</span>
                  </div>
                </div>
              )}

              {backMode === 'custom_image' && (
                <div className="p-2.5 rounded bg-[#150e2e]/70 border border-purple-500/25 space-y-2.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-purple-200 block text-[11px] font-medium">
                      Upload Custom Back Image
                    </span>
                    <label className="flex items-center justify-center gap-2 p-2 rounded border border-dashed border-purple-500/40 hover:border-purple-300 bg-[#0e0924] cursor-pointer transition-all text-center">
                      <Upload className="w-3.5 h-3.5 text-pink-400" />
                      <span className="text-[11px] text-pink-200">
                        {backImage ? 'Replace Back Image' : 'Select Back Artwork'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-purple-300/80 block text-[10px] font-mono">
                      Official card backs:
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const yugioh = OFFICIAL_CARD_BACKS.YUGIOH;
                          setBackMode('custom_image');
                          setBackImage(yugioh);
                          if (onUpdateBackMaterialRealtime) {
                            onUpdateBackMaterialRealtime({
                              backMode: 'custom_image',
                              backColor,
                              backImageSource: yugioh,
                              backRoughness,
                              backMetalness,
                            });
                          }
                          triggerExtrusion({ backM: 'custom_image', backImg: yugioh });
                        }}
                        className="py-1 px-1 rounded bg-[#1c1236]/90 hover:bg-[#2b1950] border border-amber-500/40 text-[10px] text-amber-200 text-center transition-colors shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                        title="Load Official Yu-Gi-Oh Card Back"
                      >
                        Yu-Gi-Oh
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const poke = OFFICIAL_CARD_BACKS.POKEMON;
                          setBackMode('custom_image');
                          setBackImage(poke);
                          if (onUpdateBackMaterialRealtime) {
                            onUpdateBackMaterialRealtime({
                              backMode: 'custom_image',
                              backColor,
                              backImageSource: poke,
                              backRoughness,
                              backMetalness,
                            });
                          }
                          triggerExtrusion({ backM: 'custom_image', backImg: poke });
                        }}
                        className="py-1 px-1 rounded bg-[#0e1c3a]/90 hover:bg-[#152c5c] border border-cyan-500/40 text-[10px] text-cyan-200 text-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                        title="Load Official Pokémon Card Back"
                      >
                        Pokémon
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const magic = OFFICIAL_CARD_BACKS.MAGIC;
                          setBackMode('custom_image');
                          setBackImage(magic);
                          if (onUpdateBackMaterialRealtime) {
                            onUpdateBackMaterialRealtime({
                              backMode: 'custom_image',
                              backColor,
                              backImageSource: magic,
                              backRoughness,
                              backMetalness,
                            });
                          }
                          triggerExtrusion({ backM: 'custom_image', backImg: magic });
                        }}
                        className="py-1 px-1 rounded bg-[#1e0f38]/90 hover:bg-[#301658] border border-purple-500/40 text-[10px] text-purple-200 text-center transition-colors shadow-[0_0_8px_rgba(168,85,247,0.15)]"
                        title="Load Official Magic: The Gathering Card Back"
                      >
                        Magic
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rebuild Button - Galaxy Cosmic Gradient */}
            <div className="border-t border-purple-500/25 pt-3">
              <button
                type="button"
                disabled={!uploadedImage || isGenerating}
                onClick={() => {
                  if (!uploadedImage) return;
                  triggerExtrusion();
                }}
                className="w-full py-2.5 rounded-md bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-[0_0_22px_rgba(192,38,211,0.45)] border border-pink-400/40"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{generationStep || 'Building Mesh...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rebuild 3D Mesh</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SHADING & VIEWPORT */}
        {activeTab === 'shading' && (
          <div className="space-y-4">
            {/* Shading Mode */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 block">
                Render Mode
              </span>
              <div className="grid grid-cols-2 gap-1 bg-[#090b24] p-1 rounded-lg border border-cyan-500/30">
                {[
                  { id: 'pbr', label: 'PBR Material' },
                  { id: 'wireframe', label: 'Wireframe' },
                  { id: 'normals', label: 'Surface Normals' },
                  { id: 'clay', label: 'Clay MatCap' },
                  { id: 'uv', label: 'UV Checker' },
                  { id: 'collision', label: 'Collision Hull' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => onSetRenderMode(mode.id as RenderMode)}
                    className={`py-1.5 text-xs rounded transition-all text-center ${
                      renderMode === mode.id
                        ? 'bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-cyan-200 font-medium border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-zinc-400 hover:text-cyan-200'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Rig */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-violet-300 block">
                Lighting Environment
              </span>
              <div className="grid grid-cols-2 gap-1 bg-[#100b28] p-1 rounded-lg border border-purple-500/30">
                {[
                  { id: 'studio', label: 'Studio Neutral' },
                  { id: 'cyber', label: 'Cyber Cosmic' },
                  { id: 'sunlight', label: 'Sunlight Day' },
                  { id: 'hangar', label: 'Deep Space Nebula' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSetLightingPreset(preset.id as LightingPreset)}
                    className={`py-1.5 text-xs rounded transition-all text-center ${
                      lightingPreset === preset.id
                        ? 'bg-gradient-to-r from-violet-600/40 to-pink-600/40 text-purple-200 font-medium border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : 'text-zinc-400 hover:text-purple-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Views */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-pink-300 block">
                Camera Presets
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('front')}
                  className="py-1 px-1.5 rounded bg-[#101438]/90 hover:bg-[#171f54] border border-cyan-500/30 text-[11px] text-cyan-200 text-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.12)]"
                >
                  Front (Z+)
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('back')}
                  className="py-1 px-1.5 rounded bg-[#101438]/90 hover:bg-[#171f54] border border-cyan-500/30 text-[11px] text-cyan-200 text-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.12)]"
                >
                  Back (Z-)
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('hero')}
                  className="py-1 px-1.5 rounded bg-[#1c1038]/90 hover:bg-[#2c1956] border border-purple-500/30 text-[11px] text-purple-200 text-center transition-colors shadow-[0_0_8px_rgba(168,85,247,0.12)]"
                >
                  Hero (45°)
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('side')}
                  className="py-1 px-1.5 rounded bg-[#101438]/90 hover:bg-[#171f54] border border-cyan-500/30 text-[11px] text-cyan-200 text-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.12)]"
                >
                  Side (X+)
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('top')}
                  className="py-1 px-1.5 rounded bg-[#101438]/90 hover:bg-[#171f54] border border-cyan-500/30 text-[11px] text-cyan-200 text-center transition-colors shadow-[0_0_8px_rgba(6,182,212,0.12)]"
                >
                  Top (Y+)
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerCameraPreset?.('iso')}
                  className="py-1 px-1.5 rounded bg-[#1c1038]/90 hover:bg-[#2c1956] border border-pink-500/30 text-[11px] text-pink-200 text-center transition-colors shadow-[0_0_8px_rgba(236,72,153,0.12)]"
                >
                  Isometric
                </button>
              </div>
            </div>

            {/* Exploded View Slider */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 uppercase">Exploded Assembly</span>
                <span className="text-pink-300 font-medium">{Math.round(explodedFactor * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedFactor}
                onChange={(e) => onSetExplodedFactor(parseFloat(e.target.value))}
                className="w-full accent-pink-400 cursor-pointer"
              />
            </div>

            {/* Viewport Toggles */}
            <div className="space-y-1.5 border-t border-purple-500/25 pt-3">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 block">
                Viewport Overlays
              </span>
              <div className="space-y-1">
                <label className="flex items-center justify-between p-2 rounded bg-gradient-to-r from-[#0d1033]/70 to-[#180f3d]/70 border border-cyan-500/25 cursor-pointer text-xs hover:border-cyan-400/50 transition-colors">
                  <span className="text-zinc-200">Wireframe Mesh Overlay</span>
                  <input
                    type="checkbox"
                    checked={showWireframeOverlay}
                    onChange={onToggleWireframeOverlay}
                    className="rounded accent-cyan-400 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded bg-gradient-to-r from-[#0d1033]/70 to-[#180f3d]/70 border border-cyan-500/25 cursor-pointer text-xs hover:border-cyan-400/50 transition-colors">
                  <span className="text-zinc-200">Ground Reference Grid</span>
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={onToggleGrid}
                    className="rounded accent-cyan-400 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded bg-gradient-to-r from-[#0d1033]/70 to-[#180f3d]/70 border border-cyan-500/25 cursor-pointer text-xs hover:border-cyan-400/50 transition-colors">
                  <span className="text-zinc-200">Ground Contact Shadows</span>
                  <input
                    type="checkbox"
                    checked={showShadows}
                    onChange={onToggleShadows}
                    className="rounded accent-cyan-400 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PARTS & MATERIALS */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            {!blueprint ? (
              <div className="p-4 rounded bg-[#150e2e]/70 border border-purple-500/25 text-center space-y-1 text-zinc-300">
                <span className="text-xs font-semibold block text-amber-300">No Mesh Loaded</span>
                <span className="text-[11px] text-purple-200/70 block">
                  Upload an image in the Extruder tab to inspect and edit PBR material properties.
                </span>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 block">
                    Part Hierarchy ({blueprint.parts?.length || 1})
                  </span>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {(blueprint.parts || []).map((part) => {
                      const isSelected = part.id === selectedPartId;
                      return (
                        <button
                          key={part.id}
                          onClick={() => onSelectPart(part.id)}
                          className={`w-full flex items-center justify-between p-2 rounded text-left transition-all border text-xs ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-600/30 to-purple-600/30 border-amber-400 text-amber-100 font-semibold shadow-[0_0_14px_rgba(245,158,11,0.25)]'
                              : 'bg-[#150e2e]/60 border-purple-500/25 text-zinc-300 hover:bg-[#201545]/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <div
                              className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                              style={{ backgroundColor: part.material.color }}
                            />
                            <span className="truncate">{part.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-300/80 shrink-0 capitalize">
                            {part.geometryType}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedPart && (
                  <div className="space-y-3 p-3 bg-gradient-to-br from-[#160d33]/80 to-[#220d3f]/80 rounded-lg border border-amber-500/30 text-xs shadow-inner">
                    <span className="text-[11px] font-mono uppercase text-amber-300 block border-b border-purple-500/25 pb-1.5">
                      {selectedPart.name} Properties
                    </span>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-200">Color</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={selectedPart.material.color}
                            onChange={(e) =>
                              onUpdatePartMaterial(selectedPart.id, { color: e.target.value })
                            }
                            className="w-5 h-5 rounded border border-amber-500/40 cursor-pointer bg-transparent"
                          />
                          <span className="font-mono text-[10px] text-amber-300 uppercase">
                            {selectedPart.material.color}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-zinc-400">Roughness</span>
                          <span className="text-amber-300">
                            {Math.round(selectedPart.material.roughness * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={selectedPart.material.roughness}
                          onChange={(e) =>
                            onUpdatePartMaterial(selectedPart.id, {
                              roughness: parseFloat(e.target.value),
                            })
                          }
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-zinc-400">Metalness</span>
                          <span className="text-amber-300">
                            {Math.round(selectedPart.material.metalness * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={selectedPart.material.metalness}
                          onChange={(e) =>
                            onUpdatePartMaterial(selectedPart.id, {
                              metalness: parseFloat(e.target.value),
                            })
                          }
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer Export Action - Galactic Multi-Color Gradients */}
      <div className="p-3 border-t border-purple-500/25 bg-[#050616]/95 space-y-2">
        <button
          onClick={onExportGlb}
          disabled={!blueprint || isGenerating}
          className="w-full py-2.5 rounded-md bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(192,38,211,0.5)] border border-pink-400/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Download className="w-4 h-4" />
          <span>Export Binary .GLB</span>
          {stats.estimatedGlbKb > 0 && (
            <span className="text-[10px] font-mono text-pink-200/90 font-normal">
              (~{stats.estimatedGlbKb} KB)
            </span>
          )}
        </button>

        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <button
            onClick={onExportGltf}
            disabled={!blueprint || isGenerating}
            className="py-1 rounded bg-[#0f173b]/85 hover:bg-[#18265e] text-cyan-200 hover:text-white text-center border border-cyan-500/30 disabled:opacity-40 transition-colors shadow-[0_0_8px_rgba(6,182,212,0.1)]"
          >
            .GLTF
          </button>
          <button
            onClick={onExportObj}
            disabled={!blueprint || isGenerating}
            className="py-1 rounded bg-[#201238]/85 hover:bg-[#321c58] text-pink-200 hover:text-white text-center border border-pink-500/30 disabled:opacity-40 transition-colors shadow-[0_0_8px_rgba(236,72,153,0.1)]"
          >
            .OBJ
          </button>
          <button
            onClick={onExportManifest}
            disabled={!blueprint || isGenerating}
            className="py-1 rounded bg-[#102430]/85 hover:bg-[#183a4d] text-emerald-200 hover:text-white text-center border border-emerald-500/30 disabled:opacity-40 transition-colors shadow-[0_0_8px_rgba(52,211,153,0.1)]"
          >
            Manifest
          </button>
        </div>
      </div>
    </aside>
  );
};
