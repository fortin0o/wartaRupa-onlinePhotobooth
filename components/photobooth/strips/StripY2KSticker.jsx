"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const STICKERS = ['✦', '♡', '★', '✧'];

const StripY2KSticker = ({ photos = [], filterStyle = "none" }) => {
  const holographicBg = {
    background: 'linear-gradient(135deg, #ffd6f5 0%, #d6e4ff 25%, #d6fff5 50%, #fff6d6 75%, #ffd6f5 100%)',
  };

  return (
    <div
      className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5 rounded-3xl border-4 border-white shadow-none"
      style={holographicBg}
    >
      {/* Dekorasi bintang & hati */}
      <span className="absolute top-3 left-3 text-xl -rotate-[15deg]" aria-hidden="true">⋆</span>
      <span className="absolute top-4 right-5 text-lg rotate-[10deg]" aria-hidden="true">♡</span>
      <span className="absolute bottom-24 left-4 text-lg" aria-hidden="true">✧</span>
      <span className="absolute bottom-4 right-4 text-xl rotate-[8deg]" aria-hidden="true">☆</span>

      <div className="text-center mb-4 relative z-10">
        <span
          className="font-round font-bold text-2xl text-[#b34fc9] tracking-wide"
          style={{ textShadow: '1px 1px 0 #fff' }}
        >
          warta rupa
        </span>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="bg-white p-1.5 rounded-2xl shadow-md border-2 border-white relative">
            <div className="absolute -top-2 -right-2 bg-[#ffe3f3] border border-[#f0a8dc] rounded-full w-7 h-7 flex items-center justify-center text-xs rotate-12 shadow-sm">
              {STICKERS[i % STICKERS.length]}
            </div>
            <LivePhoto
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover rounded-xl"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4 relative z-10">
        <span className="font-round font-semibold text-xs text-[#7a5ea8] tracking-widest uppercase">
          ✧ pretty moments ✧
        </span>
      </div>
    </div>
  );
};

export default StripY2KSticker;

