"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const TAPE_COLORS = ['rgba(255,196,138,0.7)', 'rgba(168,213,186,0.7)', 'rgba(168,196,240,0.7)', 'rgba(240,168,214,0.7)'];
const ROTATIONS = ['-6deg', '4deg', '-3deg', '5deg'];

const StripWashiCollage = ({ photos = [], filterStyle = "none" }) => {
  return (
    <div className="w-[240px] mx-auto flex flex-col font-sans box-border relative overflow-hidden p-5 bg-[#f6f1e7]">
      <div className="text-center mb-5 relative">
        <span className="font-script font-bold text-2xl text-[#6b5a45]">Warta Rupa</span>
      </div>

      <div className="flex flex-col gap-5">
        {photos.map((photo, i) => (
          <div key={i} className="relative flex justify-center" style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})` }}>
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 z-20"
              style={{ background: TAPE_COLORS[i % TAPE_COLORS.length], boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
            />
            <div className="bg-white p-1.5 shadow-md border border-gray-200 w-full">
              <LivePhoto
                src={photo || PLACEHOLDER_STRIP}
                alt={`Foto ${i + 1}`}
                className="w-full aspect-[4/3] object-cover"
                style={{ filter: filterStyle }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-script text-[#8a7256] text-lg mt-5">journal of little moments</p>
    </div>
  );
};

export default StripWashiCollage;

