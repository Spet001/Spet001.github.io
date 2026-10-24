import React from 'react';
import { Download, Upload } from 'lucide-react';
import { Model3DBlueprint, ViewportStats } from '../types/model3d';

interface HeaderBarProps {
  blueprint: Model3DBlueprint | null;
  stats: ViewportStats;
  onExportGlb: () => void;
  onUploadClick?: () => void;
  isGenerating: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  blueprint,
  stats,
  onExportGlb,
  onUploadClick,
  isGenerating,
}) => {
  return (
    <header className="h-12 w-full flex items-center justify-between px-4 bg-gradient-to-r from-[#060719]/95 via-[#0f0b2a]/95 via-[#180930]/95 to-[#0b0c22]/95 border-b border-purple-500/25 backdrop-blur-xl text-zinc-100 select-none shrink-0 z-20 shadow-[0_4px_30px_rgba(139,92,246,0.15)]">

      <div className="flex items-center gap-3">
        <a
          href="/"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-slate-200 hover:text-white transition-all shadow-sm"
          title="Return to SpetDev Portfolio"
        >
          <span className="text-cyan-400 font-bold">←</span>
          <span>Portfolio</span>
        </a>

        <span className="font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
          Spet's Quick 3D Studio
        </span>

        <span className="text-purple-400/40 text-xs">/</span>

        <span className="text-xs text-purple-200/90 font-medium truncate max-w-[220px]">
          {blueprint?.title || 'Empty Workspace'}
        </span>
      </div>

      {blueprint && stats.triangles > 0 ? (
        <div className="hidden md:flex items-center gap-3 text-xs font-mono">
          <span className="text-cyan-400 font-medium">{stats.triangles.toLocaleString()} tris</span>
          <span className="text-purple-400/40">·</span>
          <span className="text-violet-400 font-medium">{stats.vertices.toLocaleString()} verts</span>
          <span className="text-purple-400/40">·</span>
          <span className="text-fuchsia-300">
            {stats.dimensions.x} × {stats.dimensions.y} × {stats.dimensions.z} m
          </span>
          <span className="text-purple-400/40">·</span>
          <span className="text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            ~{stats.estimatedGlbKb} KB
          </span>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        {onUploadClick && (
          <button
            onClick={onUploadClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gradient-to-r from-[#111036]/90 to-[#220d3f]/90 hover:from-[#1a184e] hover:to-[#2e1256] text-purple-200 hover:text-white border border-purple-500/30 transition-all shadow-[0_0_15px_rgba(147,51,234,0.15)]"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Image</span>
          </button>
        )}

        <button
          onClick={onExportGlb}
          disabled={!blueprint || isGenerating}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-cyan-400 text-white transition-all shadow-[0_0_20px_rgba(192,38,211,0.5)] border border-pink-400/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export .GLB</span>
        </button>
      </div>
    </header>
  );
};
