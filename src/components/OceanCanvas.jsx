import React, { useEffect, useRef } from 'react';

const FISH_COLORS = [
  '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
  '#ff9f43', '#fd79a8', '#a29bfe', '#00d2ff',
];

function createFish(i, canvasWidth, canvasHeight) {
  const dir = i % 2 === 0 ? 1 : -1;
  return {
    x: dir === 1 ? -60 : canvasWidth + 60,
    y: canvasHeight * 0.35 + (i * 71) % (canvasHeight * 0.55),
    dir,
    speed: 0.7 + (i % 5) * 0.25,
    color: FISH_COLORS[i % FISH_COLORS.length],
    size: 18 + (i % 4) * 8,
    wave: i * 1.1,
    amplitude: 18 + (i % 3) * 12,
  };
}

function createBubble(i, canvasWidth, canvasHeight) {
  return {
    x: (i * 137) % canvasWidth,
    y: canvasHeight + 20,
    r: 3 + (i % 5) * 3,
    speed: 0.5 + (i % 4) * 0.3,
    alpha: 0.3 + (i % 3) * 0.15,
  };
}

const OceanCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fishList = Array.from({ length: 10 }, (_, i) => createFish(i, canvas.width, canvas.height));
    const bubbles  = Array.from({ length: 20 }, (_, i) => createBubble(i, canvas.width, canvas.height));

    let animationFrame = 0;
    let animId;

    const drawFish = (fish) => {
      ctx.save();
      ctx.translate(fish.x, fish.y);
      if (fish.dir === -1) ctx.scale(-1, 1);

      const size = fish.size;
      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = fish.color;
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(-size - size * 0.8, -size * 0.5);
      ctx.lineTo(-size - size * 0.8,  size * 0.5);
      ctx.closePath();
      ctx.fillStyle = fish.color;
      ctx.fill();

      // Eye
      ctx.beginPath();
      ctx.arc(size * 0.5, -size * 0.15, size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(size * 0.52, -size * 0.15, size * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#222';
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.ellipse(-size * 0.1, -size * 0.2, size * 0.25, size * 0.12, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      animationFrame++;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      grad.addColorStop(0, '#0077b6');
      grad.addColorStop(0.5, '#0096c7');
      grad.addColorStop(1, '#023e8a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Caustic light rays
      for (let i = 0; i < 6; i++) {
        const rayX = canvasWidth * (0.1 + i * 0.16);
        const rayGradient = ctx.createLinearGradient(rayX, 0, rayX + 40, canvasHeight * 0.6);
        rayGradient.addColorStop(0, 'rgba(100,200,255,0.12)');
        rayGradient.addColorStop(1, 'rgba(100,200,255,0)');
        ctx.beginPath();
        ctx.moveTo(rayX, 0);
        ctx.lineTo(rayX + 40, canvasHeight * 0.6);
        ctx.lineTo(rayX - 10, canvasHeight * 0.6);
        ctx.closePath();
        ctx.fillStyle = rayGradient;
        ctx.fill();
      }

      // Bubbles
      bubbles.forEach(bubble => {
        bubble.y -= bubble.speed;
        bubble.x += Math.sin(animationFrame * 0.02 + bubble.y * 0.02) * 0.5;
        if (bubble.y < -bubble.r * 2) {
          bubble.y = canvasHeight + bubble.r;
          bubble.x = Math.random() * canvasWidth;
        }
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150,220,255,${bubble.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Fish
      fishList.forEach(fish => {
        fish.x += fish.dir * fish.speed;
        fish.y += Math.sin(animationFrame * 0.025 + fish.wave) * 0.4;

        // Reset when off-screen
        if (fish.dir === 1 && fish.x > canvasWidth + 80) {
          fish.x = -60;
          fish.y = canvasHeight * 0.35 + Math.random() * (canvasHeight * 0.5);
        }
        if (fish.dir === -1 && fish.x < -80) {
          fish.x = canvasWidth + 60;
          fish.y = canvasHeight * 0.35 + Math.random() * (canvasHeight * 0.5);
        }

        drawFish(fish);
      });

      // Seabed
      const bedGrad = ctx.createLinearGradient(0, canvasHeight - 60, 0, canvasHeight);
      bedGrad.addColorStop(0, '#d4a35a');
      bedGrad.addColorStop(1, '#c49040');
      ctx.fillStyle = bedGrad;
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight);
      for (let x = 0; x <= canvasWidth; x += 40) {
        const bump = Math.sin((x + animationFrame * 0.3) * 0.05) * 10;
        ctx.lineTo(x, canvasHeight - 50 + bump);
      }
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.closePath();
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes oceanCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes waveTitle {
          0%, 100% { text-shadow: 0 0 20px rgba(0,220,255,0.4); }
          50%       { text-shadow: 0 0 40px rgba(0,220,255,0.8), 0 0 80px rgba(0,150,255,0.3); }
        }
        .ocean-card {
          animation: oceanCardIn 1s ease-out both;
        }
        .ocean-title {
          animation: waveTitle 3s ease-in-out infinite;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </>
  );
};

export default OceanCanvas;
