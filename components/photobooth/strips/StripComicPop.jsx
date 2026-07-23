"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const StripComicPop = ({ photos = [], filterStyle = "none" }) => {
  const halftoneBg = {
    backgroundColor: '#ffe600',
    backgroundImage: 'radial-gradient(#111 1.2px, transparent 1.2px)',
    backgroundSize: '8px 8px',
  };

  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-4 border-4 border-black" style={halftoneBg}>
      <div className="text-center mb-4 relative z-10">
        <div className="inline-block bg-[#e0392b] border-4 border-black px-4 py-1 -rotate-2 shadow-[3px_3px_0_#111]">
          <span className="font-ui font-black text-lg text-white uppercase tracking-wide">Warta Rupa!</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="bg-white p-1 border-4 border-black shadow-[4px_4px_0_#111]">
            <LivePhoto
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 relative z-10">
        <div className="relative bg-white border-4 border-black px-4 py-2 rounded-2xl">
          <span className="font-ui font-black text-sm uppercase text-[#1a3fd9]">POW! Nice shot!</span>
          <div
            className="absolute -bottom-2 left-6 w-0 h-0"
            style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111' }}
          />
        </div>
      </div>
    </div>
  );
};

export default StripComicPop;

