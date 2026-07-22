"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const StripPolaroidStripes = ({ photos = [], filterStyle = "none" }) => {
  // Pola checkerboard biru navy dan putih
  const checkerboardBg = {
    background: 'repeating-conic-gradient(#1a2f4f 0 25%, transparent 0 50%) 50% / 20px 20px',
    backgroundColor: '#ffffff'
  };

  // Komponen inline SVG Starburst (bintang bersudut delapan)
  const Starburst = ({ className, style }) => (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 24 24" 
      fill="#f5a623"
    >
      <polygon points="12,0 14.5,8 22,6 17,12 22,18 14.5,16 12,24 9.5,16 2,18 7,12 2,6 9.5,8" />
    </svg>
  );

  return (
    <div
      className="p-5 w-[260px] mx-auto flex flex-col font-sans box-border relative overflow-hidden shadow-none"
      style={checkerboardBg}
    >
      {/* Dekorasi Bintang Acak */}
      <Starburst className="absolute top-[27%] left-1 w-10 h-10 drop-shadow-md z-20" style={{ transform: 'rotate(15deg)' }} />
      <Starburst className="absolute top-[62%] right-1 w-12 h-12 drop-shadow-md z-20" style={{ transform: 'rotate(-10deg)' }} />
      <Starburst className="absolute top-[6%] right-3 w-8 h-8 drop-shadow-md z-20" style={{ transform: 'rotate(5deg)' }} />

      {/* Kontainer Foto Polaroid */}
      <div className="flex-1 flex flex-col gap-6 py-2 z-10 relative">
        {photos.map((photo, i) => (
          <div key={i} className="bg-white p-3 shadow-[4px_4px_12px_rgba(0,0,0,0.35)] relative">
            <div className="bg-gray-100 border border-gray-200">
              <img
                src={photo || PLACEHOLDER_STRIP}
                alt={`Photo ${i+1}`}
                className="w-full aspect-square object-cover" 
                style={{ filter: filterStyle }}
              />
            </div>
            
            {/* 3 Titik Oranye */}
            <div className="flex justify-center gap-2 mt-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#f5a623]"></div>
              <div className="w-2 h-2 rounded-full bg-[#f5a623]"></div>
              <div className="w-2 h-2 rounded-full bg-[#f5a623]"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Teks di Bagian Bawah */}
      <div className="mt-6 mb-2 text-center bg-white/95 py-4 px-2 shadow-[4px_4px_0px_#1a2f4f] z-10 relative border-2 border-[#1a2f4f]">
        <div className="font-playfair font-black text-[22px] leading-none text-[#1a2f4f] tracking-widest">
          MOMENTS
        </div>
        <div className="font-playfair font-bold text-lg leading-tight text-[#f5a623] tracking-wider mt-1">
          WITH FRIENDS
        </div>
      </div>
    </div>
  );
};

export default StripPolaroidStripes;


