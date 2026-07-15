import React from 'react';

const HomeScreen = ({ onSelectTemplate }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f4ecd8] py-12 px-4">
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 tracking-tight">
          Warta Rupa
        </h1>
        <p className="text-xl font-garamond italic text-gray-700">
          Pilih gaya ceritamu sebelum mulai mengambil gambar.
        </p>
      </div>
      
      {/* Template Selection Container */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-stretch">
        
        {/* Newspaper Card */}
        <div className="flex-1 bg-white border-2 border-black p-6 flex flex-col hover:shadow-[8px_8px_0_0_#000] transition-shadow duration-300">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold uppercase tracking-widest border-b-2 border-black inline-block pb-1">Newspaper</h2>
            <p className="font-garamond text-gray-600 mt-2">Gaya koran vintage, 2 foto</p>
          </div>
          
          {/* Visual Grid Preview */}
          <div className="flex-1 bg-[#f4ecd8] border border-gray-300 p-4 flex flex-col gap-2 min-h-[250px] mb-6">
            <div className="w-full flex-1 border-2 border-dashed border-gray-400 bg-white/50 flex flex-col items-center justify-center">
              <span className="text-gray-500 font-garamond text-lg font-bold">Slot 1</span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">Foto Besar</span>
            </div>
            <div className="w-1/3 aspect-square border-2 border-dashed border-gray-400 bg-white/50 flex flex-col items-center justify-center self-start">
              <span className="text-gray-500 font-garamond font-bold">Slot 2</span>
              <span className="text-gray-400 text-[10px] uppercase">Kecil</span>
            </div>
          </div>
          
          <button 
            onClick={() => onSelectTemplate('newspaper', 2)}
            className="w-full py-4 border-2 border-black text-black font-garamond text-xl font-bold hover:bg-black hover:text-white transition-colors"
          >
            Pilih Template Ini
          </button>
        </div>

        {/* Photostrip Card */}
        <div className="flex-1 bg-white border-2 border-black p-6 flex flex-col hover:shadow-[8px_8px_0_0_#000] transition-shadow duration-300">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold uppercase tracking-widest border-b-2 border-black inline-block pb-1">Photostrip</h2>
            <p className="font-garamond text-gray-600 mt-2">Strip klasik 3 foto vertikal</p>
          </div>
          
          {/* Visual Grid Preview */}
          <div className="flex-1 bg-gray-100 border border-gray-300 p-4 flex flex-col gap-2 min-h-[250px] mb-6 w-3/5 mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-full flex-1 border-2 border-dashed border-gray-400 bg-white/50 flex flex-col items-center justify-center min-h-[60px]">
                <span className="text-gray-500 font-garamond font-bold">Slot {num}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onSelectTemplate('photostrip', 3)}
            className="w-full py-4 border-2 border-black text-black font-garamond text-xl font-bold hover:bg-black hover:text-white transition-colors"
          >
            Pilih Template Ini
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default HomeScreen;
