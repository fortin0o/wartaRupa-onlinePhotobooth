import React from 'react';

const StripPolaroid = ({ photos = [], filterStyle = "none" }) => {
  const placeholders = [
    'https://via.placeholder.com/400x400?text=1',
    'https://via.placeholder.com/400x400?text=2',
    'https://via.placeholder.com/400x400?text=3'
  ];
  
  const rotations = ['-rotate-2', 'rotate-3', '-rotate-1'];

  return (
    <div className="bg-[#e0ddd5] p-6 w-[240px] mx-auto flex flex-col gap-6 font-sans box-border shadow-none">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`bg-[#fafafa] p-3 pb-12 shadow-sm border border-gray-300 ${rotations[i]}`}>
          <div className="border border-gray-200 bg-gray-100">
            <img 
              src={photos[i] || placeholders[i]} 
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
