import React from 'react';
import NewspaperTemplate from './NewspaperTemplate';
import PhotostripTemplate from './PhotostripTemplate';

const PreviewScreen = ({ photos = [], onSelectTemplate, onBack }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold mb-2">Pilih Template</h2>
        <p className="font-garamond text-gray-600">
          Bagaimana Anda ingin mengabadikan momen ini?
        </p>
      </div>
      
      {/* Template Previews Container */}
      <div className="flex flex-col md:flex-row gap-12 justify-center items-start w-full max-w-5xl mb-12">
        
        {/* Newspaper Option */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="mb-4 text-center">
            <h3 className="font-playfair text-xl font-bold">Newspaper</h3>
            <p className="text-sm font-garamond text-gray-500">1 Foto Besar & 1 Foto Kecil</p>
          </div>
          
          {/* Scale wrapper to make it a preview thumbnail */}
          <div className="w-full max-w-[380px] bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer rounded-sm overflow-hidden" 
               onClick={() => onSelectTemplate('newspaper')}
               title="Pilih Newspaper">
            <div className="pointer-events-none origin-top" style={{ transform: 'scale(0.9)' }}>
              <NewspaperTemplate photos={photos} />
            </div>
          </div>
          
          <button 
            onClick={() => onSelectTemplate('newspaper')}
            className="mt-6 px-6 py-2 bg-black text-white rounded font-garamond hover:bg-gray-800 transition"
          >
            Pilih Template Ini
          </button>
        </div>

        {/* Photostrip Option */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="mb-4 text-center">
            <h3 className="font-playfair text-xl font-bold">Photostrip</h3>
            <p className="text-sm font-garamond text-gray-500">3 Foto Klasik</p>
          </div>
          
          {/* Scale wrapper */}
          <div className="bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer p-4 rounded-sm"
               onClick={() => onSelectTemplate('photostrip')}
               title="Pilih Photostrip">
            <div className="pointer-events-none">
              <PhotostripTemplate photos={photos} />
            </div>
          </div>
          
          <button 
            onClick={() => onSelectTemplate('photostrip')}
            className="mt-6 px-6 py-2 bg-black text-white rounded font-garamond hover:bg-gray-800 transition"
          >
            Pilih Template Ini
          </button>
        </div>
        
      </div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="px-8 py-3 border-2 border-gray-400 text-gray-600 rounded hover:bg-gray-200 hover:text-black transition-colors font-garamond text-lg mt-auto"
      >
        Ambil Ulang Foto
      </button>

    </div>
  );
};

export default PreviewScreen;
