"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const FloralCorner = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
    <path
      d="M5 55 Q10 30 30 25 Q20 15 25 5 Q35 15 35 28 Q45 15 55 20 Q45 30 40 40 Q50 45 55 55"
      stroke="#a8785a"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
    <circle cx="25" cy="20" r="3" fill="#d99a8a" opacity="0.7" />
    <circle cx="38" cy="30" r="2.5" fill="#c9a86a" opacity="0.7" />
  </svg>
);

const StripScrapbook = ({ photos = [], filterStyle = "none" }) => {
  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5 bg-[#faf3e6] border-2 border-[#c9a86a]">
      <FloralCorner className="absolute top-0 left-0 w-14 h-14" />
      <FloralCorner className="absolute bottom-0 right-0 w-14 h-14 rotate-180" />

      {/* Pita judul */}
      <div className="relative z-10 text-center mb-4">
        <div className="inline-block bg-[#c98a7d] text-white px-4 py-1 relative shadow-sm">
          <span className="font-script font-bold text-xl">Warta Rupa</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {photos.map((photo, i) => (
          <div key={i} className="bg-white p-2 shadow-sm border border-[#e2d3b8]">
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Foto ${i + 1}`}
              className="w-full aspect-[4/3] object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>

      {/* Wax seal badge */}
      <div className="flex justify-center mt-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-[#a8453a] flex items-center justify-center shadow-md border-2 border-[#8a352c]">
          <span className="font-script text-white text-lg font-bold">W</span>
        </div>
      </div>

      <p className="font-script text-center text-[#7a5a45] text-lg mt-2 relative z-10">
        setiap momen, tersimpan selamanya
      </p>
    </div>
  );
};

export default StripScrapbook;
