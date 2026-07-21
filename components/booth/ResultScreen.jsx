import React, { useRef, useState, useEffect, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { stripThemes } from '@/data/stripThemes';
import { newspaperThemes } from '@/data/newspaperThemes';
import { filters } from '@/utils/filters';

const ResultScreen = ({ template, stripThemeId, newspaperThemeId, photos, videoClips, selectedFilterId, onReset }) => {
  const templateRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [exportError, setExportError] = useState(null);

  const [gifUrl, setGifUrl] = useState(null);
  const [isGeneratingGif, setIsGeneratingGif] = useState(false);
  const [gifError, setGifError] = useState(null);

  const hasCompleteVideoClips = videoClips && videoClips.length > 0 && videoClips.every(Boolean);

  const filterStyle = filters[selectedFilterId] || 'none';

  const generateImage = useCallback(async () => {
    if (!templateRef.current) return;
    setIsGenerating(true);
    setExportError(null);
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
      setExportError('Gagal membuat gambar. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  }, [template, photos, selectedFilterId]);

  const generateGif = useCallback(async () => {
    if (!hasCompleteVideoClips) return;
    setIsGeneratingGif(true);
    setGifError(null);
    try {
      const { buildBoomerangGif } = await import('@/utils/gifExport');
      const blob = await buildBoomerangGif(videoClips, selectedFilterId);
      setGifUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(blob);
      });
    } catch (err) {
      console.error('Gagal membuat GIF:', err);
      setGifError('Gagal membuat GIF. Silakan coba lagi.');
    } finally {
      setIsGeneratingGif(false);
    }
  }, [videoClips, selectedFilterId, hasCompleteVideoClips]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  // GIF boomerang dibuat otomatis di latar belakang begitu layar hasil tampil,
  // supaya sudah siap dipratonton saat pengguna melihat ke panelnya.
  useEffect(() => {
    generateGif();
  }, [generateGif]);

  useEffect(() => {
    return () => {
      if (gifUrl) URL.revokeObjectURL(gifUrl);
    };
  }, [gifUrl]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `warta-rupa-${timestamp}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleDownloadGif = () => {
    if (!gifUrl) return;
    const link = document.createElement('a');
    link.download = `warta-rupa-boomerang-${Date.now()}.gif`;
    link.href = gifUrl;
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
    <div className="flex flex-col items-center min-h-screen bg-cream p-4 pb-12 sm:pb-16 overflow-y-auto">

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
        <h2 className="text-3xl font-display font-bold mb-2">Hasil Akhir</h2>
        <p className="font-body text-gray-600">
          Preview persis seperti yang akan Anda download.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
        {/* Panel Gambar (PNG) */}
        <div className="flex flex-col items-center">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-ink shadow-hard w-full min-h-[300px]">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-ink rounded-full animate-spin mb-4"></div>
              <p className="font-body text-lg animate-pulse">Menyiapkan hasil...</p>
            </div>
          ) : exportError ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-accent shadow-hard w-full min-h-[300px] text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="font-display font-bold text-xl mb-2">Oops, Gagal!</p>
              <p className="font-body text-gray-600 mb-6">{exportError}</p>
              <button
                onClick={generateImage}
                className="px-6 py-2 bg-ink text-cream font-ui font-bold uppercase tracking-wider hover:bg-accent transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-white border-2 border-ink shadow-hard mb-6">
                <img
                  src={imageUrl}
                  alt="Hasil Photobooth"
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </div>
              <button
                onClick={handleDownload}
                className="w-full max-w-xs px-6 py-3 bg-ink text-cream border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors shadow-hard-sm"
              >
                Download PNG
              </button>
            </>
          )}
        </div>

        {/* Panel GIF Boomerang */}
        <div className="flex flex-col items-center">
          {!hasCompleteVideoClips ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-ink shadow-hard w-full min-h-[300px] text-center">
              <p className="font-body text-gray-500">
                GIF boomerang tidak tersedia untuk sesi ini (kamera/browser tidak mendukung perekaman video).
              </p>
            </div>
          ) : isGeneratingGif ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-ink shadow-hard w-full min-h-[300px]">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-ink rounded-full animate-spin mb-4"></div>
              <p className="font-body text-lg animate-pulse">Membuat GIF boomerang...</p>
            </div>
          ) : gifError ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-accent shadow-hard w-full min-h-[300px] text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="font-display font-bold text-xl mb-2">Oops, Gagal!</p>
              <p className="font-body text-gray-600 mb-6">{gifError}</p>
              <button
                onClick={generateGif}
                className="px-6 py-2 bg-ink text-cream font-ui font-bold uppercase tracking-wider hover:bg-accent transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : gifUrl ? (
            <>
              <div className="p-3 bg-white border-2 border-ink shadow-hard mb-6 w-full flex justify-center">
                <img
                  src={gifUrl}
                  alt="GIF Boomerang"
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </div>
              <button
                onClick={handleDownloadGif}
                className="w-full max-w-xs px-6 py-3 bg-ink text-cream border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors shadow-hard-sm"
              >
                Download GIF
              </button>
            </>
          ) : null}
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-8 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-white transition-colors"
      >
        Buat Ulang
      </button>

    </div>
  );
};

export default ResultScreen;
