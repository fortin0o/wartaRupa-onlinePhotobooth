"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/photobooth/templateUtils';

const StripNeonDiner = ({ photos = [], filterStyle = "none" }) => {
  const checkerBg = {
    backgroundImage: 'repeating-conic-gradient(#1a1a1a 0 25%, #fff 0 50%)',
    backgroundSize: '16px 16px',
  };

  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border bg-[#1a1a1a] relative overflow-hidden">
      <div className="text-center py-4 border-b-4 border-[#ff2d78]">
        <span
          className="font-ui font-black text-xl uppercase tracking-wider"
          style={{ color: '#ff2d78', textShadow: '0 0 6px #ff2d78, 0 0 14px #ff2d78' }}
        >
          Warta Rupa
        </span>
        <div className="font-ui text-[9px] uppercase tracking-[0.3em] mt-1" style={{ color: '#3df2ff', textShadow: '0 0 6px #3df2ff' }}>
          open 24 hours
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {photos.map((photo, i) => (
          <div key={i} className="p-1 bg-white">
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <div className="h-4" style={checkerBg} />
    </div>
  );
};

export default StripNeonDiner;
