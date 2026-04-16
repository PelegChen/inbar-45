import React from 'react';

const CLOUDS_BG = [
  { id: 0, x: 10, y: 15, scale: 1.1, dur: 28, del: 0 },
  { id: 1, x: 40, y: 30, scale: 0.8, dur: 22, del: -8 },
  { id: 2, x: 65, y: 12, scale: 1.3, dur: 34, del: -15 },
  { id: 3, x: 80, y: 40, scale: 0.7, dur: 26, del: -5 },
];

const PlaneBackground = () => (
  <>
    <style>{`
      @keyframes cloudDrift {
        0%   { transform: translateX(-120px); }
        100% { transform: translateX(calc(100vw + 200px)); }
      }
      @keyframes planeFly {
        0%   { transform: translateX(-200px) translateY(0px); }
        20%  { transform: translateX(15vw)   translateY(-18px); }
        40%  { transform: translateX(30vw)   translateY(8px); }
        60%  { transform: translateX(55vw)   translateY(-12px); }
        80%  { transform: translateX(75vw)   translateY(5px); }
        100% { transform: translateX(calc(100vw + 200px)) translateY(-10px); }
      }
      @keyframes bannerWave {
        0%, 100% { transform: skewX(-2deg); }
        50%       { transform: skewX(2deg); }
      }
      @keyframes cardAppear {
        from { opacity: 0; transform: scale(0.9) translateY(20px); }
        to   { opacity: 1; transform: scale(1)   translateY(0); }
      }
      .cloud-bg {
        position: absolute;
        animation: cloudDrift var(--dur) linear var(--del) infinite;
        opacity: 0.85;
      }
      .plane-group {
        position: absolute;
        top: 22%;
        animation: planeFly 12s ease-in-out infinite;
      }
      .banner {
        animation: bannerWave 1.2s ease-in-out infinite;
        transform-origin: left center;
      }
      .plane-card {
        animation: cardAppear 1s ease-out both;
      }
    `}</style>

    {/* Background clouds */}
    {CLOUDS_BG.map(c => (
      <div
        key={c.id}
        className="cloud-bg"
        style={{
          left: `${c.x}%`,
          top: `${c.y}%`,
          '--dur': `${c.dur}s`,
          '--del': `${c.del}s`,
          transform: `scale(${c.scale})`,
        }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <ellipse cx="60" cy="40" rx="55" ry="22" fill="rgba(255,255,255,0.7)" />
          <ellipse cx="40" cy="32" rx="28" ry="20" fill="rgba(255,255,255,0.8)" />
          <ellipse cx="75" cy="30" rx="24" ry="18" fill="rgba(255,255,255,0.75)" />
        </svg>
      </div>
    ))}

    {/* Airplane with banner */}
    <div className="plane-group">
      <svg width="90" height="40" viewBox="0 0 90 40" fill="none">
        {/* Fuselage */}
        <ellipse cx="38" cy="20" rx="36" ry="10" fill="#e8eaf6" />
        {/* Nose cone */}
        <ellipse cx="72" cy="20" rx="10" ry="7" fill="#c5cae9" />
        <path d="M82 20 Q90 20 88 22 L82 22 Z" fill="#9fa8da" />
        {/* Tail fin */}
        <path d="M6 20 Q0 8 12 12 L18 20 Z" fill="#9fa8da" />
        <path d="M8 20 Q4 28 14 26 L18 20 Z" fill="#c5cae9" />
        {/* Main wing */}
        <path d="M30 20 Q40 5 55 8 L50 20 Z" fill="#9fa8da" />
        <path d="M30 20 Q38 32 50 30 L50 20 Z" fill="#c5cae9" />
        {/* Window */}
        <ellipse cx="52" cy="18" rx="5" ry="4" fill="#81d4fa" />
        <ellipse cx="38" cy="18" rx="5" ry="4" fill="#81d4fa" />
      </svg>
      {/* Trailing banner */}
      <div
        className="banner"
        style={{
          position: 'absolute',
          left: '-140px',
          top: '10px',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '4px',
          padding: '4px 10px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          color: '#e53935',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderLeft: '3px solid #e53935',
        }}
      >
        🎂 Happy Birthday!
      </div>
    </div>
  </>
);

export default PlaneBackground;
