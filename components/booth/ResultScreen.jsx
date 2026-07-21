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

  const [isGeneratingGif, setIsGeneratingGif] = useState(false);
  const [gifError, setGifError] = useState(null);
  const gifUrlRef = useRef(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoUrlRef = useRef(null);
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

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  useEffect(() => {
    return () => {
      if (gifUrlRef.current) URL.revokeObjectURL(gifUrlRef.current);
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `warta-rupa-${timestamp}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleDownloadGif = async () => {
    if (isGeneratingGif) return;

    if (gifUrlRef.current) {
      const link = document.createElement('a');
      link.download = `warta-rupa-boomerang-${Date.now()}.gif`;
      link.href = gifUrlRef.current;
      link.click();
      return;
    }

    setIsGeneratingGif(true);
    setGifError(null);
    try {
      const { buildBoomerangGif } = await import('@/utils/gifExport');
      const blob = await buildBoomerangGif(photos, selectedFilterId);
      const url = URL.createObjectURL(blob);
      gifUrlRef.current = url;

      const link = document.createElement('a');
      link.download = `warta-rupa-boomerang-${Date.now()}.gif`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Gagal membuat GIF:', err);
      setGifError('Gagal membuat GIF. Silakan coba lagi.');
    } finally {
      setIsGeneratingGif(false);
    }
  };

  const handleDownloadVideo = async () => {
    if (isGeneratingVideo) return;

    if (videoUrlRef.current) {
      const link = document.createElement('a');
      link.download = `warta-rupa-boomerang-${Date.now()}.webm`;
      link.href = videoUrlRef.current;
      link.click();
      return;
    }

    setIsGeneratingVideo(true);
    setVideoError(null);
    try {
      const { buildBoomerangVideo } = await import('@/utils/videoExport');
      const blob = await buildBoomerangVideo(videoClips, selectedFilterId);
      const url = URL.createObjectURL(blob);
      videoUrlRef.current = url;

      const link = document.createElement('a');
      link.download = `warta-rupa-boomerang-${Date.now()}.webm`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Gagal membuat video:', err);
      setVideoError('Gagal membuat video. Silakan coba lagi.');
    } finally {
      setIsGeneratingVideo(false);
    }
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
          Preview gambar persis seperti yang akan Anda download.
        </p>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-ink shadow-hard mb-8 min-w-[300px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-ink rounded-full animate-spin mb-4"></div>
          <p className="font-body text-lg animate-pulse">Menyiapkan hasil...</p>
        </div>
      ) : exportError ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-accent shadow-hard mb-8 min-w-[300px] text-center">
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
          <div className="mb-8 p-3 bg-white border-2 border-ink shadow-hard">
            <img
              src={imageUrl}
              alt="Hasil Photobooth"
              className="max-h-[65vh] w-auto object-contain mx-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={onReset}
              className="flex-1 px-6 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Buat Ulang
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-ink text-cream border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors shadow-hard-sm"
            >
              Download PNG
            </button>
          </div>

          <div className="w-full max-w-md mt-4">
            <button
              onClick={handleDownloadGif}
              disabled={isGeneratingGif}
              className={`w-full px-6 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider transition-colors shadow-hard-sm ${isGeneratingGif ? 'opacity-50 cursor-not-allowed bg-white text-ink' : 'bg-white text-ink hover:bg-ink hover:text-cream'}`}
            >
              {isGeneratingGif ? 'Membuat GIF...' : 'Download GIF Boomerang'}
            </button>
            {gifError && (
              <p className="font-body text-sm text-accent mt-2 text-center">{gifError}</p>
            )}
          </div>

          {hasCompleteVideoClips && (
            <div className="w-full max-w-md mt-4">
              <button
                onClick={handleDownloadVideo}
                disabled={isGeneratingVideo}
                className={`w-full px-6 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider transition-colors shadow-hard-sm ${isGeneratingVideo ? 'opacity-50 cursor-not-allowed bg-white text-ink' : 'bg-white text-ink hover:bg-ink hover:text-cream'}`}
              >
                {isGeneratingVideo ? 'Membuat Video Boomerang... (butuh beberapa detik)' : 'Download Video Boomerang'}
              </button>
              {videoError && (
                <p className="font-body text-sm text-accent mt-2 text-center">{videoError}</p>
              )}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default ResultScreen;
