import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { stripThemes } from '../data/stripThemes';
import { newspaperThemes } from '../data/newspaperThemes';
import { filters } from '../utils/filters';

const ResultScreen = ({ template, stripThemeId, newspaperThemeId, photos, selectedFilterId, onReset }) => {
  const templateRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const filterStyle = filters[selectedFilterId] || 'none';

  useEffect(() => {
    const generateImage = async () => {
      if (!templateRef.current) return;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const dataUrl = await toPng(templateRef.current, { 
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        });
        
        setImageUrl(dataUrl);
      } catch (err) {
        console.error('Gagal memproses gambar:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateImage();
  }, [template, photos, selectedFilterId]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `warta-rupa-${timestamp}.png`;
    link.href = imageUrl;
    link.click();
  };

  // Resolve strip component
  const StripComponent = stripThemeId
    ? (stripThemes.find(t => t.id === stripThemeId)?.component || stripThemes[0].component)
    : null;

  // Resolve newspaper component
  const NewspaperComponent = template === 'newspaper'
    ? (newspaperThemes.find(t => t.id === newspaperThemeId)?.component || newspaperThemes[0].component)
    : null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pb-12 sm:pb-16 overflow-y-auto">
      
      {/* Hidden Container: Target render untuk html-to-image */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <div ref={templateRef}>
          {template === 'newspaper' && NewspaperComponent ? (
            <NewspaperComponent
              bigPhoto={photos[0]}
              smallPhoto={photos[1]}
              filterStyle={filterStyle}
            />
          ) : StripComponent ? (
            <StripComponent
              photos={photos}
              filterStyle={filterStyle}
            />
          ) : null}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold mb-2">Hasil Akhir</h2>
        <p className="font-garamond text-gray-600">
          Preview gambar persis seperti yang akan Anda download.
        </p>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded shadow-lg mb-8 min-w-[300px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="font-garamond text-lg animate-pulse">Menyiapkan hasil...</p>
        </div>
      ) : (
        <>
          <div className="mb-8 p-3 bg-white shadow-2xl border border-gray-200">
            <img 
              src={imageUrl} 
              alt="Hasil Photobooth" 
              className="max-h-[65vh] w-auto object-contain mx-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button 
              onClick={onReset}
              className="flex-1 px-6 py-3 border-2 border-black rounded hover:bg-gray-200 font-garamond text-lg transition-colors"
            >
              Buat Ulang
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-black text-white rounded font-garamond text-lg hover:bg-gray-800 shadow-xl transition-transform hover:-translate-y-1"
            >
              Download PNG
            </button>
          </div>
        </>
      )}
      
    </div>
  );
};

export default ResultScreen;
