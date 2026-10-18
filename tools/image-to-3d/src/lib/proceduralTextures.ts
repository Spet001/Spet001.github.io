import * as THREE from 'three';
import { PatternType } from '../types/model3d';

const textureCache = new Map<string, THREE.CanvasTexture>();

export function getProceduralTexture(
  pattern: PatternType,
  baseColorHex: string = '#888888',
  repeat: [number, number] = [2, 2]
): THREE.CanvasTexture {
  const cacheKey = `${pattern}_${baseColorHex}_${repeat[0]}x${repeat[1]}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // Parse base color
  const threeColor = new THREE.Color(baseColorHex);
  const r = Math.floor(threeColor.r * 255);
  const g = Math.floor(threeColor.g * 255);
  const b = Math.floor(threeColor.b * 255);

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, 512, 512);

  switch (pattern) {
    case 'panel_lines': {
      // Sci-fi armor panel seams and rivets
      ctx.strokeStyle = `rgba(${Math.max(0, r - 70)}, ${Math.max(0, g - 70)}, ${Math.max(0, b - 70)}, 0.8)`;
      ctx.lineWidth = 3;

      // Draw grid panels
      const gridSize = 128;
      for (let x = 0; x <= 512; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(512, x);
        ctx.stroke();
      }

      // Panel bevel highlight
      ctx.strokeStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, 0.4)`;
      ctx.lineWidth = 1;
      for (let x = 1; x <= 512; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + 2, 2);
        ctx.lineTo(x + 2, 510);
        ctx.stroke();
      }

      // Corner rivets
      ctx.fillStyle = `rgba(${Math.max(0, r - 90)}, ${Math.max(0, g - 90)}, ${Math.max(0, b - 90)}, 0.9)`;
      for (let x = gridSize; x < 512; x += gridSize) {
        for (let y = gridSize; y < 512; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x - 8, y - 8, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case 'carbon_fiber': {
      // 2x2 carbon weave
      const step = 8;
      for (let x = 0; x < 512; x += step) {
        for (let y = 0; y < 512; y += step) {
          const isDark = ((x / step) % 2 === 0) !== ((y / step) % 2 === 0);
          ctx.fillStyle = isDark
            ? `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 0.85)`
            : `rgba(${Math.min(255, r + 25)}, ${Math.min(255, g + 25)}, ${Math.min(255, b + 25)}, 0.9)`;
          ctx.fillRect(x, y, step, step);
        }
      }
      break;
    }

    case 'hex_grid': {
      // Futuristic honeycomb lattice
      ctx.strokeStyle = `rgba(${Math.min(255, r + 80)}, ${Math.min(255, g + 90)}, ${Math.min(255, b + 100)}, 0.75)`;
      ctx.lineWidth = 2;
      const hexRadius = 24;
      const hexWidth = hexRadius * Math.sqrt(3);
      const hexHeight = hexRadius * 2;
      const rowDist = hexHeight * 0.75;

      for (let y = 0; y < 512 + hexHeight; y += rowDist) {
        const row = Math.floor(y / rowDist);
        const xOffset = (row % 2) * (hexWidth / 2);
        for (let x = -hexWidth; x < 512 + hexWidth; x += hexWidth) {
          drawHexagon(ctx, x + xOffset, y, hexRadius - 2);
        }
      }
      break;
    }

    case 'brushed_metal': {
      // Fine linear streaks
      ctx.lineWidth = 1;
      for (let i = 0; i < 400; i++) {
        const y = Math.random() * 512;
        const alpha = Math.random() * 0.25;
        const isBright = Math.random() > 0.5;
        ctx.strokeStyle = isBright
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      break;
    }

    case 'hazard_stripes': {
      // High-contrast industrial yellow & black hazard stripes
      const stripeWidth = 32;
      ctx.fillStyle = '#facc15'; // vivid hazard yellow
      ctx.fillRect(0, 0, 512, 512);

      ctx.fillStyle = '#18181b'; // dark zinc black
      ctx.beginPath();
      for (let x = -512; x < 1024; x += stripeWidth * 2) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + stripeWidth, 0);
        ctx.lineTo(x + stripeWidth + 512, 512);
        ctx.lineTo(x + 512, 512);
        ctx.closePath();
      }
      ctx.fill();
      break;
    }

    case 'circuit': {
      // Cyber PCB circuit tracks
      ctx.strokeStyle = `rgba(${Math.min(255, r + 90)}, ${Math.min(255, g + 110)}, ${Math.min(255, b + 120)}, 0.65)`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const tracks = [
        [[30, 30], [120, 30], [160, 70], [160, 200]],
        [[200, 50], [250, 50], [280, 80], [350, 80]],
        [[50, 250], [100, 250], [140, 290], [140, 420]],
        [[300, 200], [300, 320], [380, 400], [480, 400]],
        [[400, 100], [450, 150], [450, 260], [500, 310]],
      ];

      for (const track of tracks) {
        ctx.beginPath();
        ctx.moveTo(track[0][0], track[0][1]);
        for (let i = 1; i < track.length; i++) {
          ctx.lineTo(track[i][0], track[i][1]);
        }
        ctx.stroke();

        // Node dots
        ctx.fillStyle = '#00f0ff';
        const start = track[0];
        const end = track[track.length - 1];
        ctx.beginPath();
        ctx.arc(start[0], start[1], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(end[0], end[1], 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'rune_glow': {
      // Magical glowing runes
      ctx.strokeStyle = `rgba(${Math.min(255, r + 100)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 120)}, 0.8)`;
      ctx.lineWidth = 3;
      ctx.shadowColor = baseColorHex;
      ctx.shadowBlur = 12;

      // Draw mystical circles
      ctx.beginPath();
      ctx.arc(256, 256, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(256, 256, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Inscribed star
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(256, 256);
        ctx.lineTo(256 + Math.cos(angle) * 180, 256 + Math.sin(angle) * 180);
        ctx.stroke();
      }
      break;
    }

    default:
      // Clean smooth surface
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.colorSpace = THREE.SRGBColorSpace;

  textureCache.set(cacheKey, texture);
  return texture;
}

export function getUvCheckerTexture(): THREE.CanvasTexture {
  const cacheKey = 'uv_checker_standard';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const size = 64;
    for (let x = 0; x < 512; x += size) {
      for (let y = 0; y < 512; y += size) {
        const isOdd = ((x / size) + (y / size)) % 2 === 1;
        ctx.fillStyle = isOdd ? '#27272a' : '#e4e4e7';
        ctx.fillRect(x, y, size, size);

        // Print coordinates
        ctx.fillStyle = isOdd ? '#71717a' : '#a1a1aa';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`U${x / size}V${y / size}`, x + 6, y + 20);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.colorSpace = THREE.SRGBColorSpace;

  textureCache.set(cacheKey, texture);
  return texture;
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const px = x + radius * Math.cos(angle);
    const py = y + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}
