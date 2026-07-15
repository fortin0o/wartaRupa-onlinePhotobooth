import React from 'react';

const HomeScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4ecd8] p-4 text-center">
      <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 tracking-tight">
        Warta Rupa
      </h1>
      <p className="text-xl font-garamond italic text-gray-700 mb-12 max-w-lg">
        Abadikan momenmu dalam lembaran koran vintage atau strip foto klasik.
      </p>
      
      <button 
        onClick={onStart}
        className="px-8 py-4 bg-black text-white rounded-md text-xl font-garamond hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
      >
        Mulai Foto
      </button>
    </div>
  );
};

export default HomeScreen;
