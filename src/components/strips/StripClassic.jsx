import React from 'react';
import { getFormattedDate, PLACEHOLDER_STRIP } from '../../utils/templateUtils';

const StripClassic = ({ photos = [], filterStyle = "none" }) => {
  const today = getFormattedDate('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' });
  
  const placeholders = [PLACEHOLDER_STRIP, PLACEHOLDER_STRIP, PLACEHOLDER_STRIP];

  return (
    <div className="bg-[#fafafa] border border-gray-300 p-3 w-[200px] mx-auto flex flex-col font-sans box-border shadow-none">
      <div className="flex flex-col gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-gray-200 bg-white">
            <img 
              src={photos[i] || placeholders[i]} 
              alt={`Strip ${i+1}`} 
              className="w-full aspect-[4/3] object-cover" 
              style={{ filter: filterStyle }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-400">
        <span className="tracking-widest">{today}</span>
        <span className="font-playfair font-bold text-gray-500">Warta Rupa</span>
      </div>
    </div>
  );
};

export default StripClassic;
