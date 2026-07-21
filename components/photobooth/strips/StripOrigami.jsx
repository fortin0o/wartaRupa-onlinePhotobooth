"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/photobooth/templateUtils';

const CraneSilhouette = ({ className }) => (
  <svg viewBox="0 0 60 40" className={className} fill="#b8cbd9" aria-hidden="true">
    <path d="M2 30 L20 20 L30 5 L34 18 L58 10 L38 22 L44 34 L28 26 L18 36 Z" />
  </svg>
);

const StripOrigami = ({ photos = [], filterStyle = "none" }) => {
  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5 bg-[#eef2f5]">
      <CraneSilhouette className="absolute top-3 right-3 w-14 h-10 opacity-80" />

      <div className="text-center mb-4">
        <span className="font-display font-bold text-xl text-[#4a6472] tracking-wide">Warta Rupa</span>
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-8 h-px bg-[#9db3bf] rotate-12" />
          <div className="w-8 h-px bg-[#9db3bf] -rotate-12" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {photos.map((photo, i) => {
          const colors = ['#dce8ee', '#e8dce0', '#e0e8dc'];
          return (
            <div
              key={i}
              className="relative p-2"
              style={{
                backgroundColor: colors[i % colors.length],
                clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)',
              }}
            >
              <img
                src={photo || PLACEHOLDER_STRIP}
                alt={`Foto ${i + 1}`}
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: filterStyle }}
              />
            </div>
          );
        })}
      </div>

      <p className="text-center font-body text-[#4a6472] text-xs italic mt-4">folded with care, kept with love</p>
    </div>
  );
};

export default StripOrigami;
