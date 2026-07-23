import React, { useEffect, useMemo, useState } from 'react';
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

  // Auto-select tema pertama yang tersedia jika belum ada pilihan
  useEffect(() => {
    if (!selectedThemeId && availableThemes.length > 0) {
      onSelectTheme(availableThemes[0].family, availableThemes[0].id);
    }
  }, [selectedThemeId, availableThemes, onSelectTheme]);

  // Handle pindah kategori jika tema aktif tidak ada di kategori tsb
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

  // Object URL untuk pratinjau klip video singkat per foto (jika ada).
  const [clipUrls, setClipUrls] = useState([]);

  useEffect(() => {
    const urls = (videoClips || []).map((clip) => (clip ? URL.createObjectURL(clip) : null));
    setClipUrls(urls);
    return () => {
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [videoClips]);

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
    <div className="flex flex-col items-center min-h-screen bg-paper py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-bold mb-2">Pilih Gaya & Filter</h2>
        <p className="font-body italic text-gray-700">
          Cocokkan tampilan dengan foto yang baru saja kamu ambil.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl mb-6">
        {Object.keys(filters).map((fId) => (
          <button
            key={fId}
            onClick={() => onSelectFilter(fId)}
            className={`px-5 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-sm shadow-hard-sm transition-colors ${
              selectedFilterId === fId ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-white'
            }`}
          >
            {filterLabels[fId]}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="w-full max-w-5xl mb-10 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex justify-center gap-2 min-w-max px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider text-sm transition-colors ${
                activeCategory === cat ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Preview Besar (Sticky) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:sticky lg:top-24">
          <div className="bg-cream border-4 border-ink p-4 shadow-hard mb-6 flex justify-center w-full">
            {renderTheme(activeTheme)}
          </div>

          {activeTheme.family === 'newspaper' && (
            <div className="flex gap-3 mb-6">
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

          {/* Retake per-foto & Crop */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {photos.map((photo, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="relative group">
                  {clipUrls[i] ? (
                    <video
                      src={clipUrls[i]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-20 h-20 object-cover border-2 border-ink"
                      style={{ filter: filterStyle }}
                    />
                  ) : (
                    <img
                      src={photo}
                      alt={`Foto ${i + 1}`}
                      className="w-20 h-20 object-cover border-2 border-ink"
                      style={{ filter: filterStyle }}
                    />
                  )}
                  {/* Zoom/Crop Icon */}
                  <button 
                    onClick={() => setEditingPhotoIndex(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-white border border-ink flex items-center justify-center hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Sesuaikan Posisi Foto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </button>
                </div>
                <button
                  onClick={() => onRetake(i)}
                  className="text-xs font-ui font-bold uppercase tracking-wider border border-ink px-2 py-1 hover:bg-ink hover:text-cream transition-colors"
                >
                  Retake
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Tema */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {displayedThemes.map((theme) => {
              const isActive = theme.id === selectedThemeId;
              const isPopular = POPULAR_THEMES.includes(theme.id);
              
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.family, theme.id)}
                  className={`relative flex flex-col items-center bg-cream border-2 p-3 transition-all duration-200 ${
                    isActive ? 'border-accent shadow-hard scale-[1.02]' : 'border-ink hover:shadow-hard-sm hover:scale-[1.02]'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-2 -left-2 bg-ink text-white font-ui text-[10px] font-bold px-2 py-0.5 -rotate-3 border border-ink z-10 shadow-sm">
                      POPULER
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-ink rounded-full flex items-center justify-center border-2 border-cream z-10 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5EEDD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}

                  <div className="w-full text-center mb-2">
                    <h3 className="font-display text-sm font-bold leading-tight">{theme.name}</h3>
                  </div>
                  <div className="pointer-events-none flex items-center justify-center overflow-hidden w-full h-[240px]">
                    <div style={{ transform: 'scale(0.35)' }}>
                      {renderTheme(theme)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          Mulai Ulang
        </button>
        <button
          onClick={onNext}
          className="px-12 py-4 bg-ink text-cream font-ui font-bold uppercase tracking-widest shadow-hard-sm hover:bg-accent hover:border-accent transition-all"
        >
          Lanjut ke Hasil
        </button>
      </div>

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
