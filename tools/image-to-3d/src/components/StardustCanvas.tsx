import React, { useEffect, useRef } from 'react';

interface StardustParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  vx: number;
  vy: number;
  color: string;
  glow: boolean;
}

const COSMIC_COLORS = [
  '56, 189, 248',
  '168, 85, 247',
  '236, 72, 153',
  '251, 191, 36',
  '129, 140, 248',
  '248, 250, 252',
];

export const StardustCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const particleCount = Math.min(85, Math.floor((width * height) / 10000) + 35);
    const particles: StardustParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const color = COSMIC_COLORS[Math.floor(Math.random() * COSMIC_COLORS.length)];
      const radius = 0.6 + Math.random() * 1.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: 0.15 + Math.random() * 0.45,
        alpha: 0.2,
        twinkleSpeed: 0.012 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.48) * 0.18,
        vy: -0.06 - Math.random() * 0.18,
        color,
        glow: radius > 1.4,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.667, 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.phase += p.twinkleSpeed * delta;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        p.alpha = Math.max(0.08, p.baseAlpha + Math.sin(p.phase) * 0.28);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;

        if (p.glow) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.9})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-45 mix-blend-screen select-none"
      aria-hidden="true"
    />
  );
};
