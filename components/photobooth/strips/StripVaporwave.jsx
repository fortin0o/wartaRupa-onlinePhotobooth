"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const StripVaporwave = ({ photos = [], filterStyle = "none" }) => {
  const skyBg = {
    background: 'linear-gradient(180deg, #2b1b5e 0%, #7b3fa0 35%, #ff6ec7 65%, #ffd36e 100%)',
  };
  const gridBg = {
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
    backgroundSize: '16px 10px',
    maskImage: 'linear-gradient(to bottom, transparent, black 40%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%)',
  };

  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5" style={skyBg}>
      <div className="absolute bottom-0 left-0 right-0 h-24" style={gridBg} />

      <div className="text-center mb-4 relative z-10">
        <span
          className="font-ui font-black text-2xl uppercase tracking-[0.15em]"
          style={{ color: '#fff', textShadow: '2px 2px 0 #3fd9e8, -2px -2px 0 #ff6ec7' }}
        >
          Warta Rupa
        </span>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="p-1 bg-white/90" style={{ boxShadow: '0 0 12px rgba(255,255,255,0.6)' }}>
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <p className="text-center font-ui font-bold text-white text-[10px] tracking-[0.3em] uppercase mt-4 relative z-10" style={{ textShadow: '0 0 6px rgba(255,255,255,0.8)' }}>
        aesthetic memories
      </p>
    </div>
  );
};

export default StripVaporwave;
