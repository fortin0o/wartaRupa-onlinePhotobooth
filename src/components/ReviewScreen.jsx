import React, { useState } from 'react';
import { filters, filterLabels } from '../utils/filters';

const ReviewScreen = ({ photos, selectedTemplate, onRetake, onNext }) => {
  // State untuk Newspaper
  const [bigPhotoIndex, setBigPhotoIndex] = useState(0);
  
  // State Filter Foto
  const [selectedFilterId, setSelectedFilterId] = useState('normal');

  const handleFinalize = () => {
    if (selectedTemplate === 'newspaper') {
      const smallPhotoIndex = bigPhotoIndex === 0 ? 1 : 0;
      onNext([photos[bigPhotoIndex], photos[smallPhotoIndex]], selectedFilterId);
    } else {
      onNext(photos, selectedFilterId);
    }
  };

  const currentFilterStyle = filters[selectedFilterId] || 'none';

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f4ecd8] px-4 py-8">
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-playfair font-bold mb-2">Review Foto & Filter</h2>
        <p className="font-garamond text-xl text-gray-700">
          Tentukan filter warna dan cek kembali hasil jepretan Anda.
        </p>
      </div>

      {/* Pilihan Filter (UI Baris Tombol) */}
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl mb-8">
        {Object.keys(filters).map((fId) => (
          <button 
            key={fId}
            onClick={() => setSelectedFilterId(fId)}
            className={`px-5 py-2 border-2 border-black font-garamond font-bold tracking-wide transition-colors shadow-[2px_2px_0_0_#000] ${
              selectedFilterId === fId ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {filterLabels[fId]}
          </button>
        ))}
      </div>

      {/* Grid Foto */}
      <div className={`grid gap-8 w-full max-w-4xl mb-12 justify-center ${selectedTemplate === 'newspaper' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {photos.map((photo, index) => {
          const isBig = bigPhotoIndex === index;
          return (
            <div key={index} className="flex flex-col items-center bg-white border-4 border-black p-4 shadow-[8px_8px_0_0_#000] max-w-[320px] w-full">
              
              {/* Badge Peran (Hanya Newspaper) */}
              {selectedTemplate === 'newspaper' && (
                <div className="w-full text-center mb-4">
                  <span className={`font-garamond px-4 py-1 uppercase text-sm font-bold border-2 border-black ${isBig ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {isBig ? 'Foto Besar' : 'Foto Kecil'}
                  </span>
                </div>
              )}

              {/* Tampilan Foto dengan Filter CSS secara Real-time */}
              <div className="w-full aspect-[4/3] bg-gray-200 border-2 border-gray-300 overflow-hidden mb-6 relative">
                <img 
                  src={photo} 
                  alt={`Hasil ${index+1}`} 
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: currentFilterStyle }} 
                />
              </div>
              
              {/* Kontrol Foto */}
              <div className="flex flex-col gap-3 w-full mt-auto">
                <button 
                  onClick={() => onRetake(index)}
                  className="w-full py-2 border-2 border-black font-garamond font-bold hover:bg-gray-100 transition-colors shadow-[2px_2px_0_0_#000]"
                >
                  🔄 Retake
                </button>
                
                {selectedTemplate === 'newspaper' && (
                  <button 
                    onClick={() => setBigPhotoIndex(index)}
                    disabled={isBig}
                    className={`w-full py-2 font-garamond font-bold transition-colors border-2 ${
                      isBig ? 'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white border-black text-black hover:bg-gray-100 shadow-[2px_2px_0_0_#000]'
                    }`}
                  >
                    Jadikan Foto Besar
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      <button 
        onClick={handleFinalize}
        className="px-12 py-4 bg-black text-white font-garamond text-2xl font-bold shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all"
      >
        Lanjut ke Hasil
      </button>

    </div>
  );
};

export default ReviewScreen;
