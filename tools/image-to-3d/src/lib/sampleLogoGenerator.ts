export function generateSampleFrontLogo(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;

  ctx.beginPath();
  ctx.roundRect(140, 160, 744, 340, 36);
  ctx.fillStyle = '#1e1b4b';
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(154, 174, 716, 312, 28);
  ctx.fillStyle = '#312e81';
  ctx.fill();

  ctx.clip();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 20;
  for (let x = -200; x < 1200; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 100);
    ctx.lineTo(x + 200, 600);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  drawStar(ctx, 512, 160, 5, 42, 20, '#fbbf24', '#d97706');
  drawStar(ctx, 220, 200, 4, 24, 10, '#38bdf8', '#0284c7');
  drawStar(ctx, 804, 200, 4, 24, 10, '#38bdf8', '#0284c7');
  ctx.restore();

  ctx.save();
  ctx.font = '900 110px "Impact", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.lineWidth = 22;
  ctx.strokeStyle = '#0f172a';
  ctx.lineJoin = 'miter';
  ctx.strokeText('SPARKY', 512, 280);

  const textGrad = ctx.createLinearGradient(512, 220, 512, 340);
  textGrad.addColorStop(0, '#fef08a');
  textGrad.addColorStop(0.45, '#f59e0b');
  textGrad.addColorStop(1, '#ea580c');

  ctx.fillStyle = textGrad;
  ctx.fillText('SPARKY', 512, 280);

  ctx.font = '900 106px "Impact", "Arial Black", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillText('SPARKY', 512, 275);
  ctx.restore();

  ctx.save();
  ctx.translate(512, 375);
  ctx.rotate(-0.04);

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.roundRect(-220, -32, 440, 64, 16);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#fef08a';
  ctx.stroke();

  ctx.font = '900 48px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#450a0a';
  ctx.strokeText('⚡ RUSH! ⚡', 0, 0);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('⚡ RUSH! ⚡', 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(512, 440);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(-240, -18, 480, 36, 18);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#0284c7';
  ctx.stroke();

  ctx.font = 'bold 20px "Arial", sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🐾 PURRILS IN PAWSVILLE 🐾', 0, 0);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function generateSampleBackCard(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(140, 160, 744, 340, 36);

  const bgGrad = ctx.createRadialGradient(512, 330, 40, 512, 330, 420);
  bgGrad.addColorStop(0, '#1e293b');
  bgGrad.addColorStop(0.7, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fill();

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(165, 185, 694, 290, 24);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(512, 310, 85, 0, Math.PI * 2);
  ctx.fillStyle = '#1e1b4b';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  drawPaw(ctx, 512, 315, 42);
  ctx.restore();

  ctx.save();
  ctx.font = 'bold 22px "Arial Black", sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '4px';
  ctx.fillText('COLLECTIBLE GAME ASSET', 512, 218);

  ctx.font = '600 16px "Courier New", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('SERIAL #SPK-9002-3D  •  EDITION: VERIFIED .GLB', 512, 435);
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('★ ★ ★ ★ ★  LEGENDARY TROPHY', 512, 458);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function generateSampleYuGiOhCard(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 875;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#c26227';
  ctx.fillRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, 'rgba(235, 130, 60, 0.3)');
  grad.addColorStop(0.5, 'rgba(150, 65, 20, 0.4)');
  grad.addColorStop(1, 'rgba(235, 130, 60, 0.3)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, w - 12, h - 12);

  ctx.save();
  ctx.fillStyle = '#df894c';
  ctx.fillRect(36, 32, w - 72, 48);
  ctx.strokeStyle = '#5a2505';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 32, w - 72, 48);

  ctx.font = '900 24px "Georgia", serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 4;
  ctx.fillText('DRAGÃO CELESTIAL DE RAIO', 48, 64);

  ctx.beginPath();
  ctx.arc(w - 60, 56, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#eab308';
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#713f12';
  ctx.textAlign = 'center';
  ctx.fillText('光', w - 60, 62);
  ctx.restore();

  ctx.save();
  for (let i = 0; i < 8; i++) {
    const starX = w - 75 - i * 26;
    drawStar(ctx, starX, 98, 5, 10, 5, '#eab308', '#ca8a04');
  }
  ctx.restore();

  const artX = 54;
  const artY = 118;
  const artW = w - 108;
  const artH = 390;

  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 6;
  ctx.strokeRect(artX, artY, artW, artH);

  const artGrad = ctx.createRadialGradient(
    artX + artW / 2,
    artY + artH / 2,
    30,
    artX + artW / 2,
    artY + artH / 2,
    artW / 1.3
  );
  artGrad.addColorStop(0, '#38bdf8');
  artGrad.addColorStop(0.3, '#1d4ed8');
  artGrad.addColorStop(0.7, '#0f172a');
  artGrad.addColorStop(1, '#020617');
  ctx.fillStyle = artGrad;
  ctx.fillRect(artX, artY, artW, artH);

  ctx.save();
  ctx.clip();
  for (let s = 0; s < 18; s++) {
    const sx = artX + (s * 37) % artW;
    const sy = artY + ((s * 59) % artH);
    drawStar(ctx, sx, sy, 4, 12, 3, 'rgba(255, 255, 255, 0.85)', 'rgba(56, 189, 248, 0.6)');
  }

  const cx = artX + artW / 2;
  const cy = artY + artH / 2 + 10;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 80);
  ctx.lineTo(cx + 60, cy - 20);
  ctx.lineTo(cx + 120, cy + 40);
  ctx.lineTo(cx + 40, cy + 40);
  ctx.lineTo(cx + 30, cy + 90);
  ctx.lineTo(cx, cy + 50);
  ctx.lineTo(cx - 30, cy + 90);
  ctx.lineTo(cx - 40, cy + 40);
  ctx.lineTo(cx - 120, cy + 40);
  ctx.lineTo(cx - 60, cy - 20);
  ctx.closePath();
  ctx.fillStyle = '#fef08a';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  const loreX = 42;
  const loreY = 524;
  const loreW = w - 84;
  const loreH = 285;

  ctx.fillStyle = '#fde68a';
  ctx.fillRect(loreX, loreY, loreW, loreH);
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 4;
  ctx.strokeRect(loreX, loreY, loreW, loreH);

  ctx.font = 'bold 16px "Georgia", serif';
  ctx.fillStyle = '#000000';
  ctx.fillText('[Dragão / Efeito / 3D Holográfico]', loreX + 12, loreY + 28);

  ctx.font = '13px "Georgia", serif';
  ctx.fillStyle = '#1c1917';
  ctx.fillText('Não pode ser destruído por efeitos de cartas normais.', loreX + 12, loreY + 54);
  ctx.fillText('Uma vez por turno: você pode extrudar este card para o', loreX + 12, loreY + 76);
  ctx.fillText('espaço 3D com malha PBR, profundidade e chanfro metálico.', loreX + 12, loreY + 98);
  ctx.fillText('O verso exibe o lendário turbilhão espiral de batalha.', loreX + 12, loreY + 120);

  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(loreX + 12, loreY + loreH - 45);
  ctx.lineTo(loreX + loreW - 12, loreY + loreH - 45);
  ctx.stroke();

  ctx.font = '900 20px "Arial Black", sans-serif';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'right';
  ctx.fillText('ATK / 3000   DEF / 2500', loreX + loreW - 16, loreY + loreH - 16);

  ctx.save();
  const holoX = w - 48;
  const holoY = h - 50;
  const holoGrad = ctx.createLinearGradient(holoX, holoY, holoX + 24, holoY + 24);
  holoGrad.addColorStop(0, '#fef08a');
  holoGrad.addColorStop(0.3, '#38bdf8');
  holoGrad.addColorStop(0.7, '#c084fc');
  holoGrad.addColorStop(1, '#4ade80');
  ctx.fillStyle = holoGrad;
  ctx.fillRect(holoX, holoY, 24, 24);
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(holoX, holoY, 24, 24);

  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#000000';
  ctx.fillText('89204719', 42, h - 34);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function generateSampleYuGiOhBack(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 875;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#3a180b';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#1a0802';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, w - 14, h - 14);

  const innerMargin = 38;
  const innerW = w - innerMargin * 2;
  const innerH = h - innerMargin * 2;

  const bgGrad = ctx.createRadialGradient(
    w / 2,
    h / 2,
    50,
    w / 2,
    h / 2,
    h / 1.5
  );
  bgGrad.addColorStop(0, '#92400e');
  bgGrad.addColorStop(0.4, '#5c220a');
  bgGrad.addColorStop(0.8, '#2d0f04');
  bgGrad.addColorStop(1, '#1b0802');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(innerMargin, innerMargin, innerW, innerH);

  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 4;
  ctx.strokeRect(innerMargin, innerMargin, innerW, innerH);

  ctx.save();
  ctx.translate(w / 2, h / 2);

  for (let ring = 0; ring < 24; ring++) {
    ctx.rotate(0.18);
    ctx.beginPath();
    const rX = 70 + ring * 8;
    const rY = 90 + ring * 12;
    ctx.ellipse(0, 0, rX, rY, ring * 0.1, 0, Math.PI * 2);
    ctx.strokeStyle = ring % 2 === 0 ? 'rgba(217, 119, 6, 0.25)' : 'rgba(254, 215, 170, 0.12)';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.translate(w / 2, h / 2);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.ellipse(0, 0, 95, 125, 0, 0, Math.PI * 2);
  const ovalGrad = ctx.createLinearGradient(-95, -125, 95, 125);
  ovalGrad.addColorStop(0, '#fef08a');
  ovalGrad.addColorStop(0.3, '#d97706');
  ovalGrad.addColorStop(0.7, '#78350f');
  ovalGrad.addColorStop(1, '#fef08a');
  ctx.fillStyle = ovalGrad;
  ctx.fill();

  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(0, 0, 75, 105, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#1c0a03';
  ctx.fill();

  ctx.beginPath();
  for (let a = 0; a < Math.PI * 6; a += 0.1) {
    const rad = 5 + a * 8;
    const sx = Math.cos(a) * rad * 0.75;
    const sy = Math.sin(a) * rad;
    if (a === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.font = '900 18px "Georgia", serif';
  ctx.fillStyle = '#b45309';
  ctx.textAlign = 'center';
  ctx.fillText('✦  YU-GI-OH TCG 3D ASSET  ✦', w / 2, h - 60);
  ctx.fillText('✦  OFFICIAL COLLECTIBLE BACK  ✦', w / 2, 65);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function generateSamplePokemonBack(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 875;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, w, h);

  const innerMargin = 32;
  const innerW = w - innerMargin * 2;
  const innerH = h - innerMargin * 2;

  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, h / 1.5);
  bgGrad.addColorStop(0, '#0284c7');
  bgGrad.addColorStop(0.5, '#1e40af');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(innerMargin, innerMargin, innerW, innerH);

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 8;
  ctx.strokeRect(innerMargin, innerMargin, innerW, innerH);

  ctx.save();
  ctx.translate(w / 2, h / 2);

  const ballR = 105;

  ctx.beginPath();
  ctx.arc(0, 0, ballR, Math.PI, 0, false);
  ctx.fillStyle = '#dc2626';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, ballR, 0, Math.PI, false);
  ctx.fillStyle = '#f8fafc';
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-ballR, -10, ballR * 2, 20);

  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, ballR, 0, Math.PI * 2);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.4);
  ctx.beginPath();
  ctx.ellipse(0, 0, 150, 220, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.restore();

  ctx.font = '900 24px "Arial Black", sans-serif';
  ctx.fillStyle = '#fbbf24';
  ctx.textAlign = 'center';
  ctx.fillText('COLLECTIBLE TRADING CARD', w / 2, 70);
  ctx.fillText('POCKET MONSTERS 3D', w / 2, h - 55);

  return canvas.toDataURL('image/png');
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fillColor: string,
  strokeColor: string
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
}

function drawPaw(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {

  ctx.beginPath();
  ctx.ellipse(cx, cy + size * 0.2, size * 0.55, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();

  const toeOffsets = [
    { dx: -size * 0.45, dy: -size * 0.25, rx: size * 0.2, ry: size * 0.26, rot: -0.3 },
    { dx: -size * 0.16, dy: -size * 0.48, rx: size * 0.2, ry: size * 0.28, rot: -0.1 },
    { dx: size * 0.16, dy: -size * 0.48, rx: size * 0.2, ry: size * 0.28, rot: 0.1 },
    { dx: size * 0.45, dy: -size * 0.25, rx: size * 0.2, ry: size * 0.26, rot: 0.3 },
  ];

  for (const t of toeOffsets) {
    ctx.beginPath();
    ctx.ellipse(cx + t.dx, cy + t.dy, t.rx, t.ry, t.rot, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function generateSampleLogoOnWhiteBg(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(512, 260);

  ctx.beginPath();
  ctx.moveTo(0, -180);
  ctx.lineTo(240, -120);
  ctx.lineTo(200, 100);
  ctx.quadraticCurveTo(120, 220, 0, 260);
  ctx.quadraticCurveTo(-120, 220, -200, 100);
  ctx.lineTo(-240, -120);
  ctx.closePath();

  ctx.fillStyle = '#7c2d12';
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#eab308';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -150);
  ctx.lineTo(200, -100);
  ctx.lineTo(165, 80);
  ctx.quadraticCurveTo(100, 180, 0, 220);
  ctx.quadraticCurveTo(-100, 180, -165, 80);
  ctx.lineTo(-200, -100);
  ctx.closePath();
  ctx.fillStyle = '#991b1b';
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(0, 20, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#450a0a';
  ctx.beginPath();
  ctx.arc(0, 20, 42, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.save();
  ctx.font = '900 80px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#18181b';
  ctx.strokeText('DRAGON', 512, 450);
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('DRAGON', 512, 450);

  ctx.font = 'bold 36px "Arial Black", sans-serif';
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#18181b';
  ctx.strokeText('LEGEND 3D', 512, 520);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('LEGEND 3D', 512, 520);
  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}
