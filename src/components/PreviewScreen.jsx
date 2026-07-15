import React from 'react';

const PreviewScreen = ({ photos, onSelectTemplate, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4ecd8] p-4">
      <h2 className="text-3xl font-playfair mb-8 font-bold">Pilih Template</h2>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* Template Newspaper */}
        <div 
          className="flex-1 bg-white p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
          onClick={() => onSelectTemplate('newspaper')}
        >
          <h3 className="font-playfair text-xl font-bold mb-4 text-center border-b-2 border-black pb-2">Newspaper</h3>
          <div className="aspect-[3/4] bg-gray-100 flex flex-col items-center justify-center p-4">
            <p className="font-garamond text-gray-500">Preview Newspaper</p>
            <p className="text-xs mt-2 text-gray-400">1 Foto Besar, 1 Kecil + Teks</p>
          </div>
        </div>

        {/* Template Photostrip */}
        <div 
          className="flex-1 bg-white p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
          onClick={() => onSelectTemplate('photostrip')}
        >
          <h3 className="font-playfair text-xl font-bold mb-4 text-center border-b-2 border-black pb-2">Photostrip</h3>
          <div className="aspect-[1/3] bg-gray-100 flex flex-col items-center justify-center p-4 mx-auto w-1/2">
            <p className="font-garamond text-gray-500 text-center">Preview Photostrip</p>
            <p className="text-xs mt-2 text-gray-400 text-center">3 Foto Vertikal</p>
          </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="mt-12 px-8 py-3 border-2 border-black rounded hover:bg-black hover:text-white transition-colors font-garamond text-lg"
      >
        Kembali ke Kamera
      </button>
    </div>
  );
};

export default PreviewScreen;
