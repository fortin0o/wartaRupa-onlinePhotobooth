"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const StripNeonCyberpunk = ({ photos = [], filterStyle = "none" }) => {
  const gridBg = {
    backgroundColor: '#0a0014',
    backgroundImage:
      'linear-gradient(rgba(255,0,200,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)',
    backgroundSize: '14px 14px',
  };

  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-4" style={gridBg}>
      <div className="text-center mb-4 relative z-10">
        <span
          className="font-ui font-black text-xl uppercase tracking-widest"
          style={{ color: '#0ff', textShadow: '0 0 6px #0ff, 2px 2px 0 #f0c' }}
        >
          Warta Rupa
        </span>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="p-1"
            style={{ border: '2px solid #0ff', boxShadow: '0 0 8px #0ff, inset 0 0 8px rgba(0,255,255,0.3)' }}
          >
            <LivePhoto
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4 relative z-10">
        <span className="font-ui font-bold text-[10px] uppercase tracking-[0.3em]" style={{ color: '#f0c', textShadow: '0 0 4px #f0c' }}>
          ▲ system online ▲
        </span>
      </div>
    </div>
  );
};

export default StripNeonCyberpunk;

