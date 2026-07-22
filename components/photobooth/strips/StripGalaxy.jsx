"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const STARS = [
  { top: '6%', left: '12%' }, { top: '14%', left: '80%' }, { top: '30%', left: '30%' },
  { top: '45%', left: '88%' }, { top: '60%', left: '8%' }, { top: '78%', left: '70%' },
  { top: '90%', left: '20%' }, { top: '20%', left: '55%' },
];

const StripGalaxy = ({ photos = [], filterStyle = "none" }) => {
  const galaxyBg = {
    background: 'radial-gradient(circle at 30% 20%, #3b2a6b 0%, #1a1035 55%, #0a0620 100%)',
  };

  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5" style={galaxyBg}>
      {STARS.map((s, i) => (
        <span key={i} className="absolute text-[10px]" style={{ top: s.top, left: s.left, color: '#f5d99a' }} aria-hidden="true">✦</span>
      ))}

      <div className="text-center mb-4 relative z-10">
        <span className="font-display font-bold text-xl text-[#f5d99a] tracking-wide">Warta Rupa</span>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="p-1 rounded-lg" style={{ border: '2px solid #f5d99a', boxShadow: '0 0 10px rgba(245,217,154,0.4)' }}>
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover rounded"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <p className="text-center font-body italic text-[#c9b8e8] text-xs mt-4 relative z-10">
        ✧ written in the stars ✧
      </p>
    </div>
  );
};

export default StripGalaxy;
