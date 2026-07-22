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

  const [instaStoryUrl, setInstaStoryUrl] = useState(null);
  const [isGeneratingInstaStory, setIsGeneratingInstaStory] = useState(false);
  const [instaStoryError, setInstaStoryError] = useState(null);

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
      const gifBlob = await buildBoomerangGif(videoClips, selectedFilterId);
      setGifUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(gifBlob);
      });
    } catch (err) {
      console.error('Gagal membuat GIF:', err);
      setGifError('Gagal membuat GIF. Silakan coba lagi.');
    } finally {
      setIsGeneratingGif(false);
    }
  }, [videoClips, selectedFilterId, hasCompleteVideoClips]);

  const generateInstaStory = useCallback(async () => {
    if (!imageUrl) return;
    setIsGeneratingInstaStory(true);
    setInstaStoryError(null);
    try {
      const { buildInstaStoryImage } = await import('@/utils/instaStoryExport');
      const blob = await buildInstaStoryImage(imageUrl);
      setInstaStoryUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return URL.createObjectURL(blob);
      });
    } catch (err) {
      console.error('Gagal membuat Insta Story:', err);
      setInstaStoryError('Gagal membuat Insta Story. Silakan coba lagi.');
    } finally {
      setIsGeneratingInstaStory(false);
    }
  }, [imageUrl]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  // GIF boomerang & Insta Story dibuat otomatis di latar belakang begitu layar
  // hasil tampil, supaya sudah siap dipratonton saat pengguna melihat kartunya.
  useEffect(() => {
    generateGif();
  }, [generateGif]);

  useEffect(() => {
    generateInstaStory();
  }, [generateInstaStory]);

  useEffect(() => {
    return () => {
      if (gifUrl) URL.revokeObjectURL(gifUrl);
      if (instaStoryUrl) URL.revokeObjectURL(instaStoryUrl);
    };
  }, [gifUrl, instaStoryUrl]);

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

  const handleDownloadInstaStory = () => {
    if (!instaStoryUrl) return;
    const link = document.createElement('a');
    link.download = `warta-rupa-instastory-${Date.now()}.png`;
    link.href = instaStoryUrl;
    link.click();
  };

  // Klik kartu = aksi utamanya: kalau gagal, coba lagi; kalau sudah siap, langsung download.
  const handlePngCardClick = () => {
    if (exportError) { generateImage(); return; }
    if (imageUrl) handleDownload();
  };

  const handleGifCardClick = () => {
    if (!hasCompleteVideoClips) return;
    if (gifError) { generateGif(); return; }
    if (gifUrl) handleDownloadGif();
  };

  const handleInstaStoryCardClick = () => {
    if (instaStoryError) { generateInstaStory(); return; }
    if (instaStoryUrl) handleDownloadInstaStory();
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
          Pilih format di bawah — klik kartunya untuk langsung mengunduh.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start mb-8">
        {/* Preview Besar (PNG) */}
        <div className="flex justify-center">
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
            <div className="p-3 bg-white border-2 border-ink shadow-hard">
              <img
                src={imageUrl}
                alt="Hasil Photobooth"
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
          )}
        </div>

        {/* Daftar Kartu Format — klik kartu untuk download */}
        <div className="flex flex-col gap-4 w-full">
          {/* Kartu PNG */}
          <button
            onClick={handlePngCardClick}
            disabled={isGenerating}
            className="group flex items-center gap-4 bg-cream border-2 border-ink p-3 text-left transition-shadow hover:shadow-hard-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <div className="w-16 h-16 shrink-0 border border-ink bg-white flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-ink rounded-full animate-spin" />
              ) : exportError ? (
                <span className="text-xl">⚠️</span>
              ) : (
                <img src={imageUrl} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent">●</span>
                <span className="font-ui font-bold text-sm uppercase tracking-widest">Bingkai (PNG)</span>
              </div>
              <p className="font-body text-sm text-gray-600 truncate">
                {isGenerating ? 'Menyiapkan...' : exportError ? 'Gagal — klik untuk coba lagi' : 'Klik untuk unduh'}
              </p>
            </div>
          </button>

          {/* Kartu GIF */}
          <button
            onClick={handleGifCardClick}
            disabled={!hasCompleteVideoClips}
            className="group flex items-center gap-4 bg-cream border-2 border-ink p-3 text-left transition-shadow hover:shadow-hard-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <div className="w-16 h-16 shrink-0 border border-ink bg-white flex items-center justify-center overflow-hidden">
              {!hasCompleteVideoClips ? (
                <span className="text-xl">🚫</span>
              ) : isGeneratingGif ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-ink rounded-full animate-spin" />
              ) : gifError ? (
                <span className="text-xl">⚠️</span>
              ) : (
                <img src={gifUrl} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent">●</span>
                <span className="font-ui font-bold text-sm uppercase tracking-widest">GIF Boomerang</span>
              </div>
              <p className="font-body text-sm text-gray-600 truncate">
                {!hasCompleteVideoClips
                  ? 'Tidak tersedia untuk sesi ini'
                  : isGeneratingGif
                  ? 'Membuat GIF...'
                  : gifError
                  ? 'Gagal — klik untuk coba lagi'
                  : 'Klik untuk unduh'}
              </p>
            </div>
          </button>

          {/* Kartu Insta Story */}
          <button
            onClick={handleInstaStoryCardClick}
            disabled={isGenerating || isGeneratingInstaStory}
            className="group flex items-center gap-4 bg-cream border-2 border-ink p-3 text-left transition-shadow hover:shadow-hard-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <div className="w-16 h-16 shrink-0 border border-ink bg-white flex items-center justify-center overflow-hidden">
              {isGenerating || isGeneratingInstaStory ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-ink rounded-full animate-spin" />
              ) : instaStoryError ? (
                <span className="text-xl">⚠️</span>
              ) : instaStoryUrl ? (
                <img src={instaStoryUrl} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent">●</span>
                <span className="font-ui font-bold text-sm uppercase tracking-widest">Insta Story</span>
              </div>
              <p className="font-body text-sm text-gray-600 truncate">
                {isGenerating || isGeneratingInstaStory
                  ? 'Menyiapkan...'
                  : instaStoryError
                  ? 'Gagal — klik untuk coba lagi'
                  : 'Klik untuk unduh'}
              </p>
            </div>
          </button>
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
