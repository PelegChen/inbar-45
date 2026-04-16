import React from 'react';

const CLOUDS = [
  { id: 0, top: 8,  left: -10, scale: 1.4, dur: 40, del: 0,   opacity: 0.95 },
  { id: 1, top: 22, left: -10, scale: 1.0, dur: 55, del: -18, opacity: 0.85 },
  { id: 2, top: 12, left: -10, scale: 1.8, dur: 70, del: -35, opacity: 0.90 },
  { id: 3, top: 35, left: -10, scale: 0.8, dur: 45, del: -10, opacity: 0.80 },
  { id: 4, top: 5,  left: -10, scale: 1.2, dur: 60, del: -25, opacity: 0.88 },
  { id: 5, top: 48, left: -10, scale: 1.6, dur: 80, del: -40, opacity: 0.75 },
];

const CloudSVG = ({ opacity }) => (
  <svg width="180" height="90" viewBox="0 0 180 90" fill="none" style={{ opacity }}>
    <ellipse cx="90" cy="65" rx="82" ry="28" fill="white" />
    <ellipse cx="58" cy="50" rx="38" ry="30" fill="white" />
    <ellipse cx="110" cy="45" rx="42" ry="32" fill="white" />
    <ellipse cx="80" cy="38" rx="30" ry="24" fill="white" />
  </svg>
);

const CloudBackground = () => (
  <>
    <style>{`
      @keyframes cloudFloat {
        0%   { transform: translateX(-220px) scale(var(--scale)); }
        100% { transform: translateX(calc(100vw + 220px)) scale(var(--scale)); }
      }
      @keyframes cardBob {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-10px); }
      }
      @keyframes softPulse {
        0%, 100% { text-shadow: 0 0 20px rgba(100,160,255,0.3); }
        50%       { text-shadow: 0 0 40px rgba(100,160,255,0.6); }
      }
      .cloud-item {
        position: absolute;
        animation: cloudFloat var(--dur) linear var(--del) infinite;
      }
      .cloud-card {
        animation: cardBob 5s ease-in-out infinite;
      }
      .cloud-title {
        animation: softPulse 3s ease-in-out infinite;
      }
    `}</style>

    {CLOUDS.map(c => (
      <div
        key={c.id}
        className="cloud-item"
        style={{
          top: `${c.top}%`,
          '--dur': `${c.dur}s`,
          '--del': `${c.del}s`,
          '--scale': c.scale,
        }}
      >
        <CloudSVG opacity={c.opacity} />
      </div>
    ))}

    {/* Sun in the background */}
    <div style={{
      position: 'absolute',
      top: '8%',
      right: '12%',
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 38% 38%, #fffde7, #ffd700 60%, #ffb300)',
      boxShadow: '0 0 60px 20px rgba(255,210,0,0.35)',
      zIndex: 1,
    }} />
  </>
);

export default CloudBackground;
