"use client";
import React from 'react';
import { getFormattedDate, PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const StripMuseumLabel = ({ photos = [], filterStyle = "none" }) => {
  const today = getFormattedDate('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="w-[220px] mx-auto flex flex-col font-sans box-border bg-[#faf9f6] p-6 shadow-none">
      <div className="flex flex-col gap-6">
        {photos.map((photo, i) => (
          <div key={i} className="flex flex-col">
            <LivePhoto
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
            <div className="border-t border-black/70 mt-2 pt-1.5">
              <p className="font-display italic text-[11px] text-gray-800">
                Untitled, potret No. {i + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-3 border-t-2 border-black text-center">
        <p className="font-display text-sm tracking-wide">Warta Rupa</p>
        <p className="font-ui text-[8px] uppercase tracking-[0.25em] text-gray-500 mt-1">{today}</p>
      </div>
    </div>
  );
};

export default StripMuseumLabel;

