"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/photobooth/templateUtils';

const StripFilmBox = ({ photos = [], filterStyle = "none" }) => {
  const holes = Array(10).fill(0);

  return (
    <div className="w-[240px] mx-auto flex font-sans box-border bg-[#f7c600] relative overflow-hidden shadow-none">
      {/* Lubang sprocket kiri */}
      <div className="w-3 flex flex-col justify-around py-3 bg-black">
        {holes.map((_, i) => (
          <div key={`l-${i}`} className="w-1.5 h-1.5 bg-[#f7c600] rounded-[1px] mx-auto" />
        ))}
      </div>

      <div className="flex-1 flex flex-col p-3">
        <div className="bg-[#e0392b] text-white text-center py-1.5 mb-3 -mx-1">
          <span className="font-ui font-black text-sm uppercase tracking-widest">Warta Rupa</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {photos.map((photo, i) => (
            <div key={i} className="bg-black p-1 border-2 border-black">
              <img
                src={photo || PLACEHOLDER_STRIP}
                alt={`Foto ${i + 1}`}
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: filterStyle }}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <span className="font-ui font-black text-[10px] text-black uppercase tracking-[0.2em]">
            Color Film · 200
          </span>
        </div>
      </div>

      {/* Lubang sprocket kanan */}
      <div className="w-3 flex flex-col justify-around py-3 bg-black">
        {holes.map((_, i) => (
          <div key={`r-${i}`} className="w-1.5 h-1.5 bg-[#f7c600] rounded-[1px] mx-auto" />
        ))}
      </div>
    </div>
  );
};

export default StripFilmBox;
