import React, { useEffect, useMemo } from 'react';
import { stripThemes } from '@/data/stripThemes';
import { newspaperThemes } from '@/data/newspaperThemes';
import { filters, filterLabels } from '@/utils/filters';

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
  onNext,
  onBack,
}) => {
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

  // Auto-select tema pertama yang tersedia jika belum ada pilihan.
  useEffect(() => {
    if (!selectedThemeId && availableThemes.length > 0) {
      onSelectTheme(availableThemes[0].family, availableThemes[0].id);
    }
  }, [selectedThemeId, availableThemes, onSelectTheme]);

  const activeTheme = availableThemes.find((t) => t.id === selectedThemeId) || availableThemes[0];
  const filterStyle = filters[selectedFilterId] || 'none';
  const otherBigIndex = bigPhotoIndex === 0 ? 1 : 0;

  // Object URL untuk pratinjau klip video singkat per foto (jika ada).
  const clipUrls = useMemo(
    () => (videoClips || []).map((clip) => (clip ? URL.createObjectURL(clip) : null)),
    [videoClips]
  );

  useEffect(() => {
    return () => {
      clipUrls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [clipUrls]);

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
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl mb-10">
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

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Preview Besar */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="bg-cream border-4 border-ink p-4 shadow-hard mb-6 flex justify-center">
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

          {/* Retake per-foto */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {photos.map((photo, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableThemes.map((theme) => {
              const isActive = theme.id === selectedThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.family, theme.id)}
                  className={`flex flex-col items-center bg-cream border-2 p-3 transition-all ${
                    isActive ? 'border-accent shadow-hard' : 'border-ink hover:shadow-hard-sm'
                  }`}
                >
                  <div className="w-full text-center mb-2">
                    <h3 className="font-display text-sm font-bold leading-tight">{theme.name}</h3>
                  </div>
                  <div className="pointer-events-none flex justify-center overflow-hidden w-full h-[140px]">
                    <div className="origin-top" style={{ transform: 'scale(0.35)' }}>
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
    </div>
  );
};

export default StyleFilterScreen;
