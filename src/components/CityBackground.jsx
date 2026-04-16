import React, { useEffect, useRef } from 'react';

const BUILDINGS = [
  { x: 0,   w: 70,  h: 180, color: '#1a1a2e', windows: [[10,20],[10,50],[10,80],[10,110],[40,20],[40,50],[40,80],[40,110]] },
  { x: 60,  w: 50,  h: 240, color: '#16213e', windows: [[10,20],[10,55],[10,90],[10,125],[10,160],[30,20],[30,55],[30,90],[30,125],[30,160]] },
  { x: 100, w: 90,  h: 160, color: '#0f3460', windows: [[10,20],[10,50],[10,80],[40,20],[40,50],[40,80],[65,20],[65,50],[65,80]] },
  { x: 180, w: 55,  h: 300, color: '#1a1a2e', windows: [[10,20],[10,60],[10,100],[10,140],[10,180],[10,220],[30,20],[30,60],[30,100],[30,140],[30,180],[30,220]] },
  { x: 225, w: 80,  h: 200, color: '#16213e', windows: [[10,20],[10,60],[10,100],[10,140],[40,20],[40,60],[40,100],[40,140],[60,20],[60,60],[60,100],[60,140]] },
  { x: 295, w: 60,  h: 260, color: '#0d1b4b', windows: [[10,20],[10,65],[10,110],[10,155],[10,200],[35,20],[35,65],[35,110],[35,155],[35,200]] },
  { x: 345, w: 100, h: 140, color: '#1a1a2e', windows: [[10,20],[10,50],[10,80],[40,20],[40,50],[40,80],[70,20],[70,50],[70,80]] },
  { x: 435, w: 65,  h: 280, color: '#16213e', windows: [[10,20],[10,65],[10,110],[10,155],[10,200],[10,240],[35,20],[35,65],[35,110],[35,155],[35,200],[35,240]] },
  { x: 490, w: 85,  h: 190, color: '#0f3460', windows: [[10,20],[10,60],[10,100],[10,140],[40,20],[40,60],[40,100],[40,140],[65,20],[65,60],[65,100],[65,140]] },
  { x: 565, w: 55,  h: 230, color: '#1a1a2e', windows: [[10,20],[10,60],[10,100],[10,140],[10,180],[30,20],[30,60],[30,100],[30,140],[30,180]] },
  { x: 610, w: 90,  h: 170, color: '#16213e', windows: [[10,20],[10,55],[10,90],[10,125],[40,20],[40,55],[40,90],[40,125],[65,20],[65,55],[65,90],[65,125]] },
  { x: 690, w: 70,  h: 250, color: '#0d1b4b', windows: [[10,20],[10,60],[10,100],[10,140],[10,180],[10,220],[40,20],[40,60],[40,100],[40,140],[40,180],[40,220]] },
];

const WINDOW_COLORS = ['#ffd700', '#ffecb3', '#fff9c4', '#ffe082', '#ffffff', '#ffab40'];

function seededColor(seed) {
  return WINDOW_COLORS[seed % WINDOW_COLORS.length];
}

const CityBackground = () => {
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

    // Twinkling light particles (stars + street lights reflection)
    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 1000,
      y: Math.random() * 400,
      r: 0.5 + (i % 3) * 0.5,
      alpha: 0.3 + (i % 5) * 0.14,
      speed: 0.002 + (i % 4) * 0.001,
      offset: i * 0.4,
    }));

    let animationFrame = 0;
    let animId;

    const draw = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      animationFrame++;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw buildings
      const scaleX = canvasWidth / 760;
      BUILDINGS.forEach((building, buildingIndex) => {
        const buildingX = building.x * scaleX;
        const buildingWidth = building.w * scaleX;
        const buildingHeight = building.h * (canvasHeight / 400);

        ctx.fillStyle = building.color;
        ctx.fillRect(buildingX, canvasHeight - buildingHeight, buildingWidth, buildingHeight);

        // Draw windows
        building.windows.forEach(([ windowX, windowY ], windowIndex) => {
          const lit = Math.sin(animationFrame * 0.01 + buildingIndex * 1.7 + windowIndex * 0.9) > -0.3;
          if (lit) {
            const windowColor = seededColor(buildingIndex * 13 + windowIndex * 7);
            ctx.fillStyle = windowColor;
            ctx.globalAlpha = 0.6 + 0.4 * Math.abs(Math.sin(animationFrame * 0.008 + buildingIndex + windowIndex));
            ctx.fillRect(
              buildingX + windowX * scaleX,
              canvasHeight - buildingHeight + windowY * (canvasHeight / 400),
              8 * scaleX,
              10 * (canvasHeight / 400),
            );
            ctx.globalAlpha = 1;
          }
        });
      });

      // Stars
      particles.forEach(particle => {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(animationFrame * particle.speed + particle.offset));
        ctx.beginPath();
        ctx.arc(particle.x * scaleX, particle.y * (canvasHeight / 400), particle.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = particle.alpha * twinkle;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Ground / street glow
      const groundGrad = ctx.createLinearGradient(0, canvasHeight - 40, 0, canvasHeight);
      groundGrad.addColorStop(0, 'rgba(30,20,50,0.8)');
      groundGrad.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, canvasHeight - 40, canvasWidth, 40);

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
        @keyframes cityGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,100,0,0.2); }
          50%       { text-shadow: 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,100,0,0.4); }
        }
        @keyframes cityCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .city-title {
          animation: cityGlow 2.5s ease-in-out infinite;
        }
        .city-card {
          animation: cityCardIn 1s ease-out both;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </>
  );
};

export default CityBackground;
