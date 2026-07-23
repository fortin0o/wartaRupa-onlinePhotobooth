import React, { useEffect, useMemo, useState, useRef } from 'react';
import { stripThemes } from '@/data/stripThemes';
import { newspaperThemes } from '@/data/newspaperThemes';
import { filters, filterLabels } from '@/utils/filters';
import CropModal from './CropModal';

const CATEGORIES = ['Editorial Koran', 'Photostrip Klasik', 'Playful & Aesthetic'];

const getCategoryForTheme = (id) => {
  const editorial = ['vintage', 'tabloid', 'classicbw', 'editorial', 'bold', 'zine', 'filmnoir', 'museumlabel'];
  const photostrip = ['classic', 'filmreel', 'polaroid', 'polaroidstripes', 'filmbox'];
  if (editorial.includes(id)) return 'Editorial Koran';
  if (photostrip.includes(id)) return 'Photostrip Klasik';
  return 'Playful & Aesthetic';
};

const POPULAR_THEMES = ['vintage', 'classic', 'y2ksticker'];

const StyleFilterScreen = ({
  photos,
  videoClips,
  requiredPhotoCount,
  selectedTemplate,
  selectedThemeId,
  selectedFilterId,
  bigPhotoIndex,
  onSelectTheme,
  onSelectFilter,
  onSelectBigPhoto,
  onRetake,
  onUpdatePhoto,
  onNext,
  onBack,
}) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState(null);
  const previewRef = useRef(null);

  const availableThemes = useMemo(() => {
    const strips = stripThemes
      .filter((t) => t.supportedCounts.includes(requiredPhotoCount))
      .map((t) => ({ ...t, family: 'photostrip' }));
    const newspapers = requiredPhotoCount === 2
      ? newspaperThemes
        .filter((t) => t.supportedCounts.includes(requiredPhotoCount))
        .map((t) => ({ ...t, family: 'newspaper' }))
      : [];
    return [...newspapers, ...strips];
  }, [requiredPhotoCount]);

  const displayedThemes = useMemo(() => {
    return availableThemes.filter(t => getCategoryForTheme(t.id) === activeCategory);
  }, [availableThemes, activeCategory]);

  useEffect(() => {
    if (!selectedThemeId && availableThemes.length > 0) {
      onSelectTheme(availableThemes[0].family, availableThemes[0].id);
    }
  }, [selectedThemeId, availableThemes, onSelectTheme]);

  useEffect(() => {
    if (displayedThemes.length > 0) {
      const isCurrentThemeInCat = displayedThemes.some(t => t.id === selectedThemeId);
      if (!isCurrentThemeInCat) {
        onSelectTheme(displayedThemes[0].family, displayedThemes[0].id);
      }
    }
  }, [activeCategory, displayedThemes, selectedThemeId, onSelectTheme]);

  const activeTheme = availableThemes.find((t) => t.id === selectedThemeId) || availableThemes[0];
  const filterStyle = filters[selectedFilterId] || 'none';
  const otherBigIndex = bigPhotoIndex === 0 ? 1 : 0;

  // Object URL untuk pratinjau klip video singkat per foto
  const [clipUrls, setClipUrls] = useState([]);
  useEffect(() => {
    const urls = (videoClips || []).map((clip) => (clip ? URL.createObjectURL(clip) : null));
    setClipUrls(urls);
    return () => {
      urls.forEach((url) => { if (url) URL.revokeObjectURL(url); });
    };
  }, [videoClips]);

  // Handle klik gambar pada preview besar untuk membuka Crop Modal
  const handlePreviewClick = (e) => {
    if (e.target.tagName === 'IMG') {
      const src = e.target.getAttribute('src');
      const index = photos.findIndex(p => p === src);
      if (index !== -1) setEditingPhotoIndex(index);
    }
  };

  const renderTheme = (theme) => {
    if (!theme) return null;
    const ThemeComponent = theme.component;
    if (theme.family === 'newspaper') {
      return (
        <ThemeComponent
          bigPhoto={photos[bigPhotoIndex]}
          smallPhoto={photos[otherBigIndex]}
          filterStyle={filterStyle}
        />
      );
    }
    return <ThemeComponent photos={photos} filterStyle={filterStyle} />;
  };

  if (!activeTheme) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-paper overflow-hidden font-sans relative">
      
      {/* CSS global khusus komponen ini untuk interaksi klik gambar */}
      <style>{`
        .preview-click-target img { 
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .preview-click-target img:hover { 
          opacity: 0.85; 
          filter: brightness(0.9); 
          outline: 3px dashed #1a1a1a;
          outline-offset: -3px;
        }
      `}</style>

      {/* KIRI - STATIC (PREVIEW UTAMA) */}
      <div className="w-full lg:w-[55%] h-full flex flex-col items-center p-6 relative lg:overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Tombol Kembali (Absolute di Kiri Atas) */}
        <div className="absolute top-6 left-6 z-10 hidden lg:block">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-cream border-2 border-ink font-ui font-bold uppercase tracking-wider shadow-hard-sm hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            &larr; Mulai Ulang
          </button>
        </div>

        <div className="text-center mb-6 mt-16 lg:mt-6 max-w-md">
          <h2 className="text-4xl font-display font-black uppercase tracking-tight mb-2">Review & Edit</h2>
          <p className="font-body italic text-gray-700 bg-white border border-gray-300 px-3 py-1 inline-block">
            Tips: Klik foto di dalam preview untuk menggeser/zoom
          </p>
        </div>

        {/* PREVIEW WRAPPER */}
        <div 
          className="bg-cream border-4 border-ink p-4 shadow-hard flex justify-center w-full max-w-2xl group preview-click-target transition-transform hover:scale-[1.01]"
          onClick={handlePreviewClick}
          ref={previewRef}
        >
          <div className="pointer-events-auto">
            {renderTheme(activeTheme)}
          </div>
        </div>

        {/* Togle Big Photo untuk Newspaper */}
        {activeTheme.family === 'newspaper' && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onSelectBigPhoto(0)}
              disabled={bigPhotoIndex === 0}
              className={`px-4 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-sm transition-colors ${
                bigPhotoIndex === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-cream hover:bg-white shadow-hard-sm'
              }`}
            >
              Foto 1 Jadi Besar
            </button>
            <button
              onClick={() => onSelectBigPhoto(1)}
              disabled={bigPhotoIndex === 1}
              className={`px-4 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-sm transition-colors ${
                bigPhotoIndex === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-cream hover:bg-white shadow-hard-sm'
              }`}
            >
              Foto 2 Jadi Besar
            </button>
          </div>
        )}

        {/* ACTION BUTTON (Lanjut ke Hasil) - Dipindah ke Panel Kiri */}
        <div className="mt-8 mb-4 w-full max-w-2xl flex justify-center">
          <button
            onClick={onNext}
            className="w-full py-4 bg-ink text-cream font-ui font-black text-xl uppercase tracking-widest border-4 border-ink shadow-[6px_6px_0px_#1a1a1a] hover:bg-white hover:text-ink hover:translate-y-1 hover:shadow-[2px_2px_0px_#1a1a1a] transition-all"
          >
            Lanjut ke Hasil Akhir &rarr;
          </button>
        </div>

        {/* Retake Thumbnails */}
        <div className="mt-4 border-t-2 border-ink pt-6 w-full max-w-lg mb-20 lg:mb-0">
          <h4 className="text-center font-display font-bold uppercase text-sm mb-4">Daftar Jepretan</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {photos.map((photo, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {clipUrls[i] ? (
                  <video src={clipUrls[i]} autoPlay loop muted playsInline className="w-16 h-16 object-cover border-2 border-ink" style={{ filter: filterStyle }} />
                ) : (
                  <img src={photo} alt={`Foto ${i + 1}`} className="w-16 h-16 object-cover border-2 border-ink" style={{ filter: filterStyle }} />
                )}
                <button
                  onClick={() => onRetake(i)}
                  className="text-[10px] font-ui font-bold uppercase tracking-widest border border-ink px-2 py-1 hover:bg-ink hover:text-cream transition-colors"
                >
                  Retake
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KANAN - SCROLLABLE (FILTER & TEMPLATES) */}
      <div className="w-full lg:w-[45%] h-full overflow-y-auto bg-cream border-t-4 lg:border-t-0 lg:border-l-4 border-ink p-4 lg:p-8 pb-32" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* FILTER WARNA (Card Newspaper Style) */}
        <div className="border-2 border-ink p-5 mb-8 bg-white shadow-[6px_6px_0px_#1a1a1a]">
          <h3 className="font-playfair font-black text-2xl uppercase border-b-2 border-ink pb-2 mb-4">Filter Warna</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(filters).map((fId) => (
              <button
                key={fId}
                onClick={() => onSelectFilter(fId)}
                className={`flex-1 min-w-[100px] px-3 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-xs transition-colors ${
                  selectedFilterId === fId ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-gray-100'
                }`}
              >
                {filterLabels[fId]}
              </button>
            ))}
          </div>
        </div>

        {/* TABS KATEGORI TEMPLATE */}
        <div className="mb-6">
          <h3 className="font-playfair font-black text-2xl uppercase border-b-4 border-ink pb-2 mb-4">Katalog Template</h3>
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-xs transition-colors ${
                  activeCategory === cat ? 'bg-ink text-cream' : 'bg-white text-ink hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TEMPLATE GRID */}
        <div className="grid grid-cols-2 gap-4">
          {displayedThemes.map((theme) => {
            const isActive = theme.id === selectedThemeId;
            const isPopular = POPULAR_THEMES.includes(theme.id);
            
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.family, theme.id)}
                className={`relative flex flex-col items-center bg-white border-2 p-3 transition-all duration-200 ${
                  isActive ? 'border-accent shadow-hard scale-[1.02] z-10' : 'border-ink hover:shadow-hard-sm hover:scale-[1.02]'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-2 -left-2 bg-ink text-white font-ui text-[10px] font-bold px-2 py-0.5 -rotate-3 border border-ink z-20 shadow-sm">
                    POPULER
                  </div>
                )}
                {isActive && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-ink rounded-full flex items-center justify-center border-2 border-cream z-20 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5EEDD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                )}

                <div className="w-full text-center mb-2">
                  <h3 className="font-display text-xs font-bold leading-tight">{theme.name}</h3>
                </div>
                <div className="pointer-events-none flex items-center justify-center overflow-hidden w-full h-[180px] bg-gray-50 border border-gray-200">
                  <div style={{ transform: 'scale(0.28)' }}>
                    {renderTheme(theme)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CROP MODAL */}
      {editingPhotoIndex !== null && (
        <CropModal
          photoUrl={photos[editingPhotoIndex]}
          onClose={() => setEditingPhotoIndex(null)}
          onSave={(newPhotoBase64) => {
            onUpdatePhoto(editingPhotoIndex, newPhotoBase64);
            setEditingPhotoIndex(null);
          }}
        />
      )}
    </div>
  );
};

export default StyleFilterScreen;
