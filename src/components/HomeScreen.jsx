import React, { useState } from 'react';
import { stripThemes } from '../data/stripThemes';
import { newspaperThemes } from '../data/newspaperThemes';

const HomeScreen = ({ onSelectTemplate }) => {
  const [showThemeSelection, setShowThemeSelection] = useState(false);
  const [showNewspaperThemeSelection, setShowNewspaperThemeSelection] = useState(false);

  // ── Shared: render a theme-selection grid ─────────────────────────────────
  const ThemeGrid = ({ themes, templateType, photoCount, onBack, bgColor = 'bg-[#f4ecd8]', previewScale = 0.62, previewH = 'h-[280px]' }) => (
    <div className={`flex flex-col items-center min-h-screen ${bgColor} py-12 px-4`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-playfair font-bold mb-4">
          Pilih Tema {templateType === 'photostrip' ? 'Photostrip' : 'Newspaper'}
        </h2>
        <p className="font-garamond italic text-gray-700">
          {themes.length} tema tersedia — pilih yang paling sesuai mood-mu.
        </p>
      </div>

      <div
        className="w-full max-w-7xl gap-5 items-stretch"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
      >
        {themes.map(theme => {
          const ThemeComponent = theme.component;
          return (
            <div
              key={theme.id}
              onClick={() => onSelectTemplate(templateType, photoCount, theme.id)}
              className="flex flex-col items-center h-full bg-white border border-gray-300 p-4 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full text-center mb-4">
                <h3 className="font-playfair text-lg font-bold border-b-2 border-black inline-block pb-1">{theme.name}</h3>
                <p className="text-xs font-garamond text-gray-500 mt-1">{theme.desc}</p>
              </div>

              <div className={`pointer-events-none flex justify-center mb-4 overflow-hidden w-full ${previewH}`}>
                <div className="origin-top" style={{ transform: `scale(${previewScale})` }}>
                  <ThemeComponent />
                </div>
              </div>

              <button className="w-full py-2.5 bg-black text-white font-garamond font-bold mt-auto text-sm hover:bg-gray-800 transition-colors">
                Pilih Tema
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-12 px-8 py-3 border-2 border-black font-garamond font-bold hover:bg-gray-200 transition-colors"
      >
        Kembali ke Menu Utama
      </button>
    </div>
  );

  if (showThemeSelection) {
    return (
      <ThemeGrid
        themes={stripThemes}
        templateType="photostrip"
        photoCount={3}
        onBack={() => setShowThemeSelection(false)}
      />
    );
  }

  if (showNewspaperThemeSelection) {
    return (
      <ThemeGrid
        themes={newspaperThemes}
        templateType="newspaper"
        photoCount={2}
        onBack={() => setShowNewspaperThemeSelection(false)}
        previewScale={0.58}
        previewH="h-[300px]"
      />
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f4ecd8] py-12 px-4">
      
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 tracking-tight">
          Warta Rupa
        </h1>
        <p className="text-xl font-garamond italic text-gray-700">
          Pilih gaya ceritamu sebelum mulai mengambil gambar.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-stretch">
        
        {/* Newspaper Card */}
        <div className="flex-1 bg-white border-2 border-black p-6 flex flex-col hover:shadow-[8px_8px_0_0_#000] transition-shadow duration-300">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-2xl font-bold uppercase tracking-widest border-b-2 border-black inline-block pb-1">Newspaper</h2>
            <p className="font-garamond text-gray-600 mt-2">Gaya koran vintage, 2 foto</p>
          </div>
          
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
            onClick={() => setShowNewspaperThemeSelection(true)}
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
          
          <div className="flex-1 bg-gray-100 border border-gray-300 p-4 flex flex-col gap-2 min-h-[250px] mb-6 w-3/5 mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="w-full flex-1 border-2 border-dashed border-gray-400 bg-white/50 flex flex-col items-center justify-center min-h-[60px]">
                <span className="text-gray-500 font-garamond font-bold">Slot {num}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowThemeSelection(true)}
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
