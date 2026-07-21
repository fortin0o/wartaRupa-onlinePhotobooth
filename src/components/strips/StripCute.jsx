import React from 'react';
import { PLACEHOLDER_STRIP } from '../../utils/templateUtils';

const StripCute = ({ photos = [], filterStyle = "none" }) => {
  const placeholders = [PLACEHOLDER_STRIP, PLACEHOLDER_STRIP, PLACEHOLDER_STRIP];

  return (
    <div className="bg-pink-100 border-4 border-dashed border-pink-300 p-4 w-[220px] mx-auto flex flex-col gap-4 font-sans box-border shadow-none rounded-2xl">
      
      <div className="text-center font-bold text-pink-500 font-garamond text-lg tracking-widest mb-1 mt-1">
        ✧ WARTA RUPA ✧
      </div>

      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-white p-2 rounded-2xl shadow-sm border border-pink-200">
          <img 
            src={photos[i] || placeholders[i]} 
            alt={`Cute ${i+1}`} 
            className="w-full aspect-[4/3] object-cover rounded-xl" 
            style={{ filter: filterStyle }}
          />
        </div>
      ))}
      
    </div>
  );
};

export default StripCute;
