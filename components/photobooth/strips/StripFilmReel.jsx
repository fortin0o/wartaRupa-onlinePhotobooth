"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const StripFilmReel = ({ photos = [], filterStyle = "none" }) => {
  // Bikin lubang-lubang film
  const holes = Array(12).fill(0);

  return (
    <div className="bg-[#111] p-1 w-[220px] mx-auto flex font-sans box-border relative overflow-hidden shadow-none">
      
      {/* Lubang Film Kiri */}
      <div className="w-4 flex flex-col justify-between py-2 items-center z-10 opacity-70 gap-2">
        {holes.map((_, i) => (
          <div key={`l-${i}`} className="w-2 h-3 bg-[#e5e5e5] rounded-[1px]"></div>
        ))}
      </div>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col gap-2 py-4">
        {photos.map((photo, i) => (
          <div key={i} className="bg-black border-y-2 border-[#222]">
            <LivePhoto
              src={photo || PLACEHOLDER_STRIP}
              alt={`Film ${i+1}`}
              className="w-full aspect-[4/3] object-cover opacity-90 sepia-[0.2]" 
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
        
        <div className="text-center mt-2">
          <span className="font-playfair text-[10px] text-[#888] uppercase tracking-[0.2em] font-bold">Warta Rupa</span>
        </div>
      </div>

      {/* Lubang Film Kanan */}
      <div className="w-4 flex flex-col justify-between py-2 items-center z-10 opacity-70 gap-2">
        {holes.map((_, i) => (
          <div key={`r-${i}`} className="w-2 h-3 bg-[#e5e5e5] rounded-[1px]"></div>
        ))}
      </div>
      
    </div>
  );
};

export default StripFilmReel;



