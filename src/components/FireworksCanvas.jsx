import React, { useEffect, useRef } from 'react';

const COLORS = [
  '#ff4757', '#ffd93d', '#6bcb77', '#4d96ff',
  '#ff6bcd', '#ff9f43', '#a29bfe', '#00d2ff',
  '#fd79a8', '#55efc4', '#fdcb6e', '#e17055',
];

function createShell(canvas, speedMultiplier) {
  const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    vx: Math.cos(angle) * (Math.random() * 3 - 1.5) * speedMultiplier,
    vy: -(Math.random() * 8 + 7) * speedMultiplier,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    exploded: false,
    particles: [],
    trail: [],
  };
}

function explode(shell, speedMultiplier) {
  const count = 60 + Math.floor(Math.random() * 40);
  shell.exploded = true;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = (Math.random() * 4 + 1) * speedMultiplier;
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

const FireworksCanvas = ({ pageSpeed = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const speedMultiplier = Math.max(0.2, pageSpeed || 1);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let shells = [];
    let launchFrameCounter = 0;
    let animId;

    const draw = () => {
      launchFrameCounter += speedMultiplier;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const launchInterval = Math.max(8, 45 / speedMultiplier);

      // Launch a new shell every ~45 frames
      if (launchFrameCounter >= launchInterval || shells.length === 0) {
        launchFrameCounter = 0;
        shells.push(createShell(canvas, speedMultiplier));
      }

      ctx.fillStyle = 'rgba(5,5,20,0.25)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      shells = shells.filter(shell => {
        if (!shell.exploded) {
          // Update shell position
          shell.trail.push({ x: shell.x, y: shell.y });
          if (shell.trail.length > 8) shell.trail.shift();

          shell.vy += 0.18 * speedMultiplier; // gravity
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

          // Explode when going up slows
          if (shell.vy >= -1) explode(shell, speedMultiplier);
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
