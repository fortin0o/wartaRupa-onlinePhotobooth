"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/photobooth/templateUtils';

const StripDenim = ({ photos = [], filterStyle = "none" }) => {
  const denimBackground = {
    background: 'repeating-linear-gradient(45deg, #2d4a6b, #2d4a6b 2px, #34527a 2px, #34527a 4px)'
  };

  // Efek kertas robek (torn paper) di atas dan bawah bingkai
  const tornPaperClipPath = {
    clipPath: 'polygon(0% 2%, 5% 0%, 10% 3%, 15% 1%, 20% 4%, 25% 0%, 30% 2%, 35% 1%, 40% 3%, 45% 0%, 50% 2%, 55% 1%, 60% 4%, 65% 0%, 70% 3%, 75% 1%, 80% 4%, 85% 0%, 90% 2%, 95% 1%, 100% 3%, 100% 97%, 95% 100%, 90% 98%, 85% 99%, 80% 96%, 75% 100%, 70% 98%, 65% 99%, 60% 97%, 55% 100%, 50% 98%, 45% 99%, 40% 97%, 35% 99%, 30% 97%, 25% 100%, 20% 98%, 15% 99%, 10% 97%, 5% 100%, 0% 98%)'
  };

  return (
    <div
      className="p-4 w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden shadow-none"
      style={denimBackground}
    >
      {/* Dekorasi 1: Bintang Outline */}
      <svg 
        className="absolute top-4 left-4 w-8 h-8 text-blue-200/50" 
        viewBox="0 0 24 24" 
        style={{ transform: 'rotate(-15deg)' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Dekorasi 2: Hati Outline */}
      <svg 
        className="absolute top-1/3 right-3 w-10 h-10 text-white/40" 
        viewBox="0 0 24 24" 
        style={{ transform: 'rotate(20deg)' }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Dekorasi 3: Kancing Jeans */}
      <svg 
        className="absolute bottom-6 left-6 w-8 h-8 text-[#a9b8c9]/70" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2"/>
        <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      </svg>

      {/* Dekorasi 4: Kancing Jeans Lainnya */}
      <svg 
        className="absolute top-[65%] left-3 w-6 h-6 text-[#a9b8c9]/60" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
      </svg>

      {/* Wrapper Foto */}
      <div className="flex-1 flex flex-col gap-6 py-6 z-10 relative">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="bg-white p-3 shadow-lg flex flex-col items-center"
            style={tornPaperClipPath}
          >
            <div className="bg-gray-200 w-full mb-2">
              <img
                src={photo || PLACEHOLDER_STRIP}
                alt={`Denim Photo ${i+1}`}
                className="w-full aspect-[4/3] object-cover" 
                style={{ filter: filterStyle }}
              />
            </div>
          </div>
        ))}
        
        <div className="text-center mt-2 bg-white/10 mx-4 py-2 border border-white/30 rounded backdrop-blur-sm">
          <span className="font-playfair text-[11px] text-white uppercase tracking-[0.2em] font-bold drop-shadow-md">
            Warta Rupa
          </span>
        </div>
      </div>
    </div>
  );
};

export default StripDenim;


