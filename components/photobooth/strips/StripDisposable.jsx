"use client";
import React from 'react';
import { getFormattedDate, PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const StripDisposable = ({ photos = [], filterStyle = "none" }) => {
  const dateStamp = getFormattedDate('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });

  return (
    <div className="w-[220px] mx-auto flex flex-col font-sans box-border bg-[#1a1a1a] p-2 shadow-none">
      {/* Header ala kemasan kamera sekali pakai */}
      <div className="bg-[#f5c400] text-black text-center py-2 mb-2 border-b-4 border-[#e0392b]">
        <span className="font-ui font-black text-sm uppercase tracking-widest">Warta Rupa</span>
        <div className="font-ui text-[9px] font-bold uppercase tracking-wider">400 Speed Film</div>
      </div>

      <div className="flex flex-col gap-2">
        {photos.map((photo, i) => (
          <div key={i} className="relative bg-black overflow-hidden">
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover opacity-95"
              style={{ filter: filterStyle }}
            />
            {/* Vignette halus */}
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px 6px rgba(0,0,0,0.5)' }} />
            {/* Cap tanggal digital */}
            <div
              className="absolute bottom-1.5 right-2 text-[10px] font-bold tracking-wider"
              style={{ color: '#ff8a3d', fontFamily: 'monospace', textShadow: '0 0 3px rgba(255,138,61,0.6)' }}
            >
              {dateStamp}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-2 py-1">
        <span className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-[#e0392b]">
          Kodachrome Style
        </span>
      </div>
    </div>
  );
};

export default StripDisposable;
