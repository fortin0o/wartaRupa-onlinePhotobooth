import React from 'react';

const ResultScreen = ({ template, photos, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4ecd8] p-4">
      <h2 className="text-3xl font-playfair mb-8 font-bold">Hasil Akhir</h2>
      
      <div className="bg-white p-8 shadow-2xl mb-8 border border-gray-200">
        <p className="font-garamond text-center text-gray-600 mb-4">
          Menampilkan hasil untuk template: <span className="font-bold capitalize">{template}</span>
        </p>
        <div className={`bg-gray-100 flex items-center justify-center ${template === 'photostrip' ? 'aspect-[1/3] w-48 mx-auto' : 'aspect-[3/4] w-full max-w-md'}`}>
          <p className="font-garamond text-gray-400 text-center px-4">Gambar Siap Download</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onReset}
          className="px-6 py-2 border-2 border-black rounded hover:bg-gray-100 font-garamond"
        >
          Mulai Baru
        </button>
        <button 
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-garamond"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
