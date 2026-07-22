"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const LeafSprig = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
    <path d="M30 55 Q28 35 30 15" stroke="#6b7f4f" strokeWidth="2" />
    <ellipse cx="24" cy="30" rx="8" ry="4" fill="#8ba36a" opacity="0.75" transform="rotate(-30 24 30)" />
    <ellipse cx="36" cy="22" rx="8" ry="4" fill="#a3b87f" opacity="0.75" transform="rotate(25 36 22)" />
    <ellipse cx="30" cy="14" rx="6" ry="10" fill="#c9a0a8" opacity="0.8" />
  </svg>
);

const StripBotanical = ({ photos = [], filterStyle = "none" }) => {
  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5 bg-[#f3ede0] border border-[#c9c1a8]">
      <LeafSprig className="absolute -top-1 -left-1 w-16 h-16" />
      <LeafSprig className="absolute -bottom-1 -right-1 w-16 h-16 rotate-180" />

      <div className="text-center mb-4 relative z-10">
        <span className="font-display italic text-xl text-[#5c6b45] tracking-wide">Warta Rupa</span>
        <div className="w-16 h-px bg-[#8ba36a] mx-auto mt-2" />
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="bg-white p-1.5 shadow-sm border border-[#dcd4bd]">
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      <p className="text-center font-body italic text-[#6b7f4f] text-sm mt-4 relative z-10">
        pressed like petals, kept like memories
      </p>
    </div>
  );
};

export default StripBotanical;
