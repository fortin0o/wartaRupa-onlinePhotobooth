"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/templateUtils';

const StripPolaroid = ({ photos = [], filterStyle = "none" }) => {
  const rotations = ['-rotate-2', 'rotate-3', '-rotate-1'];

  return (
    <div className="bg-[#e0ddd5] p-6 w-[240px] mx-auto flex flex-col gap-6 font-sans box-border shadow-none">
      {photos.map((photo, i) => (
        <div key={i} className={`bg-[#fafafa] p-3 pb-12 shadow-sm border border-gray-300 ${rotations[i % rotations.length]}`}>
          <div className="border border-gray-200 bg-gray-100">
            <img
              src={photo || PLACEHOLDER_STRIP}
              alt={`Polaroid ${i+1}`}
              className="w-full aspect-square object-cover" 
              style={{ filter: filterStyle }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StripPolaroid;


