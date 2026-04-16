import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#ff4757', '#ffd93d', '#6bcb77', '#4d96ff',
  '#ff6bcd', '#ff9f43', '#a29bfe', '#00d2ff',
  '#fd79a8', '#55efc4', '#fdcb6e', '#e17055',
];

/**
 * @typedef {{ x: number, y: number, vx: number, vy: number, alpha: number, color: string, r: number }} Particle
 */

/**
 * @typedef {{ x: number, y: number, vx: number, vy: number, color: string, exploded: boolean, particles: Particle[], trail: { x: number, y: number }[] }} Shell
 */

/** @param {HTMLCanvasElement} canvas @returns {Shell} */
function createShell(canvas) {
  const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    vx: Math.cos(angle) * (Math.random() * 3 - 1.5),
    vy: -(Math.random() * 8 + 7),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    exploded: false,
    particles: [],
    trail: [],
  };
}

/** @param {Shell} shell */
function explode(shell) {
  const count = 60 + Math.floor(Math.random() * 40);
  shell.exploded = true;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    shell.particles.push({
      x: shell.x,
      y: shell.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: shell.color,
      r: Math.random() * 2.5 + 1,
    });
  }
}

/** @param {{ pageSpeed?: number }} props */
const FireworksCanvas = ({ pageSpeed = 1 }) => {
  const canvasRef = useRef(/** @type {HTMLCanvasElement | null} */ (null));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const speedMultiplier = Math.max(0.2, pageSpeed || 1);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /** @type {Shell[]} */
    let shells = [];
    let launchFrameCounter = 0;
    /** @type {number} */
    let animId = 0;

    const draw = () => {
      launchFrameCounter += speedMultiplier;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const launchInterval = 45;

      // Launch a new shell every ~45 frames
      if (launchFrameCounter >= launchInterval || shells.length === 0) {
        launchFrameCounter = 0;
        shells.push(createShell(canvas));
      }

      ctx.fillStyle = 'rgba(5,5,20,0.25)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      shells = shells.filter(shell => {
        if (!shell.exploded) {
          // Update shell position
          shell.trail.push({ x: shell.x, y: shell.y });
          if (shell.trail.length > 8) shell.trail.shift();

          shell.vy += 0.18 * speedMultiplier; // gravity scaled by time-step
          shell.x += shell.vx * speedMultiplier;
          shell.y += shell.vy * speedMultiplier;

          // Draw trail
          shell.trail.forEach((pt, i) => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = shell.color;
            ctx.globalAlpha = (i / shell.trail.length) * 0.5;
            ctx.fill();
          });
          ctx.globalAlpha = 1;

          // Explode slightly earlier for higher bursts
          if (shell.vy >= -2) explode(shell);
          return true;
        }

        // Update particles
        shell.particles.forEach(particle => {
          particle.x += particle.vx * speedMultiplier;
          particle.y += particle.vy * speedMultiplier;
          particle.vy += 0.08 * speedMultiplier;
          particle.vx *= Math.pow(0.97, speedMultiplier);
          particle.alpha -= 0.018 * speedMultiplier;

          if (particle.alpha > 0) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha;
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1;

        shell.particles = shell.particles.filter(p => p.alpha > 0);
        return shell.particles.length > 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [pageSpeed]);

  return (
    <>
      <style>{`
        @keyframes fireworksCardIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes colorCycle {
          0%   { color: #ff4757; }
          17%  { color: #ffd93d; }
          33%  { color: #6bcb77; }
          50%  { color: #4d96ff; }
          67%  { color: #ff6bcd; }
          83%  { color: #a29bfe; }
          100% { color: #ff4757; }
        }
        .fireworks-card {
          animation: fireworksCardIn 1s ease-out both;
        }
        .fireworks-title {
          animation: colorCycle 4s linear infinite;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </>
  );
};

export default FireworksCanvas;
