import React from 'react';

const STARS = [
  [12,8],[28,15],[45,5],[60,20],[75,10],[88,18],
  [20,30],[55,25],[80,35],[35,40],[65,12],[90,5],
];

const SunriseBackground = () => (
  <>
    <style>{`
      @keyframes nightFadeOut {
        0%   { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes dawnFadeIn {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes sunRise {
        0%   { transform: translateX(-50%) translateY(160px); opacity: 0.2; }
        30%  { opacity: 1; }
        100% { transform: translateX(-50%) translateY(-10px); opacity: 1; }
      }
      @keyframes sunGlow {
        0%, 100% { box-shadow: 0 0 60px 30px rgba(255,210,0,0.5); }
        50%       { box-shadow: 0 0 120px 60px rgba(255,210,0,0.8); }
      }
      @keyframes starsFadeOut {
        0%   { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes greetingAppear {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes raysPulse {
        0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
        50%       { opacity: 1;   transform: translateX(-50%) scale(1.08); }
      }
      .night-sky  { animation: nightFadeOut 4s ease-out 0.3s forwards; }
      .dawn-sky   { animation: dawnFadeIn  4s ease-out 0.3s forwards; opacity: 0; }
      .stars      { animation: starsFadeOut 3s ease-out 0.5s forwards; }
      .sun        { animation: sunRise 4.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s forwards,
                               sunGlow 3s ease-in-out 4.8s infinite; }
      .sun-rays   { animation: raysPulse 3s ease-in-out 4.8s infinite; }
      .greeting   { animation: greetingAppear 1.2s ease-out 3.8s both; }
    `}</style>

    {/* Dawn gradient sky */}
    <div
      className="dawn-sky"
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #ff6b35 0%, #ff9a3c 25%, #ffd700 55%, #87ceeb 100%)',
      }}
    />

    {/* Night sky */}
    <div
      className="night-sky"
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #05050f 0%, #0d0d2b 50%, #1a1a5e 100%)',
      }}
    />

    {/* Stars */}
    <div className="stars" style={{ position: 'absolute', inset: 0 }}>
      {STARS.map(([l, t], i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${l}%`, top: `${t}%`,
          width: i % 3 === 0 ? '3px' : '2px',
          height: i % 3 === 0 ? '3px' : '2px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.8)',
        }} />
      ))}
    </div>

    {/* Sun rays */}
    <div
      className="sun-rays"
      style={{
        position: 'absolute',
        bottom: '29%',
        left: '50%',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,220,60,0.35) 0%, transparent 70%)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }}
    />

    {/* Sun */}
    <div
      className="sun"
      style={{
        position: 'absolute',
        bottom: '31%',
        left: '50%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, #fffde7, #ffd700 60%, #ff9800)',
        transform: 'translateX(-50%) translateY(160px)',
        opacity: 0,
      }}
    />

    {/* Ground / hills */}
    <div style={{
      position: 'absolute', bottom: 0, width: '100%', height: '32%',
      background: 'linear-gradient(180deg, #2e8b2e 0%, #1a6b1a 100%)',
      borderRadius: '60% 60% 0 0 / 30% 30% 0 0',
    }} />

    {/* Secondary hill (left) */}
    <div style={{
      position: 'absolute', bottom: 0, left: '-5%', width: '45%', height: '22%',
      background: 'linear-gradient(180deg, #246824 0%, #1a5c1a 100%)',
      borderRadius: '60% 60% 0 0 / 30% 30% 0 0',
    }} />

    {/* Secondary hill (right) */}
    <div style={{
      position: 'absolute', bottom: 0, right: '-5%', width: '45%', height: '22%',
      background: 'linear-gradient(180deg, #246824 0%, #1a5c1a 100%)',
      borderRadius: '60% 60% 0 0 / 30% 30% 0 0',
    }} />
  </>
);

export default SunriseBackground;
