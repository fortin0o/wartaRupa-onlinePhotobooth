"use client";
import React from 'react';
import { buildCompositeFilter, PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const StripFilmNoir = ({ photos = [], filterStyle = "none" }) => {
  const noirFilter = buildCompositeFilter('grayscale(1) contrast(1.3) brightness(0.95)', filterStyle);

  return (
    <div className="w-[230px] mx-auto flex font-sans box-border bg-black relative overflow-hidden shadow-none">
      <div className="w-3 flex flex-col justify-around py-3 bg-[#111]">
        {Array(10).fill(0).map((_, i) => (
          <div key={`l-${i}`} className="w-1.5 h-2 bg-black rounded-[1px] mx-auto border border-[#333]" />
        ))}
      </div>

      <div className="flex-1 flex flex-col p-3">
        <div className="text-center mb-3 border-b-2 border-[#d4af37] pb-2">
          <span className="font-display font-black text-lg text-[#d4af37] tracking-[0.15em] uppercase">
            Warta Rupa
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {photos.map((photo, i) => (
            <div key={i} className="relative border border-[#d4af37]/60">
              <img
                src={photo || PLACEHOLDER_STRIP}
                alt={`Foto ${i + 1}`}
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: noirFilter }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <span className="font-display italic text-[10px] text-[#d4af37] tracking-widest">
            a picture, a secret, a story
          </span>
        </div>
      </div>

      <div className="w-3 flex flex-col justify-around py-3 bg-[#111]">
        {Array(10).fill(0).map((_, i) => (
          <div key={`r-${i}`} className="w-1.5 h-2 bg-black rounded-[1px] mx-auto border border-[#333]" />
        ))}
      </div>
    </div>
  );
};

export default StripFilmNoir;
