import React, { useRef, useState, useEffect, useCallback } from 'react';

const CameraScreen = ({ requiredPhotoCount = 3, retakeIndex = null, onCapture, onCaptureRetake, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [hasPermission, setHasPermission] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  
  // State alur pengambilan foto berurutan
  const [confirmedPhotos, setConfirmedPhotos] = useState([]);
  const [currentDraft, setCurrentDraft] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const initCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasPermission(false);
      setCameraError('Gagal mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
    }
  }, []);

  useEffect(() => {
    initCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [initCamera]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const startCountdownAndCapture = async () => {
    if (isCounting) return;
    setIsCounting(true);
    
    for (let c = 3; c > 0; c--) {
      setCountdown(c);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCountdown(null);
    const photoData = captureFrame();
    if (photoData) {
      setCurrentDraft(photoData);
    }
    setIsCounting(false);
  };

  const handleRetake = () => {
    setCurrentDraft(null);
  };

  const handleNext = () => {
    // Mode Retake Individual
    if (retakeIndex !== null) {
      onCaptureRetake(currentDraft);
      setCurrentDraft(null);
      return;
    }

    // Mode Normal berurutan
    const newPhotos = [...confirmedPhotos, currentDraft];
    setConfirmedPhotos(newPhotos);
    setCurrentDraft(null);
    
    // Jika slot sudah penuh
    if (newPhotos.length >= requiredPhotoCount) {
      onCapture(newPhotos);
    }
  };

  const isRetakeMode = retakeIndex !== null;
  const currentPhotoNumber = isRetakeMode ? retakeIndex + 1 : confirmedPhotos.length + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4ecd8] px-4 py-8 relative">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header & Indikator */}
      <div className="w-full max-w-[480px] flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          disabled={isCounting}
          className={`px-4 py-2 border-2 border-black font-garamond font-bold hover:bg-black hover:text-white transition-colors ${isCounting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Kembali
        </button>
        <div className="font-playfair text-xl font-bold bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000]">
          {isRetakeMode ? `Ambil Ulang Foto Ke-${currentPhotoNumber}` : `Foto ${Math.min(currentPhotoNumber, requiredPhotoCount)} dari ${requiredPhotoCount}`}
        </div>
      </div>

      {/* Box Kamera Container */}
      <div className="w-full max-w-[480px] bg-white border-4 border-black p-4 shadow-[8px_8px_0_0_#000]">
        
        {/* Aspect Ratio Wrapper (4:3) */}
        <div className="relative w-full aspect-[4/3] bg-gray-900 border-2 border-gray-300 overflow-hidden flex items-center justify-center">
          
          {!hasPermission ? (
            <div className="text-center p-6 text-white">
              <h3 className="text-xl font-playfair mb-2">Izin Kamera Ditolak</h3>
              <p className="font-garamond text-gray-400 mb-6">{cameraError}</p>
              <button 
                onClick={initCamera}
                className="px-6 py-2 bg-white text-black rounded font-garamond hover:bg-gray-200 transition"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className={`absolute inset-0 w-full h-full object-cover -scale-x-100 ${currentDraft ? 'opacity-0' : 'opacity-100'}`}
              />
              
              {currentDraft && (
                <img 
                  src={currentDraft} 
                  alt="Draft Foto" 
                  className="absolute inset-0 w-full h-full object-cover z-10" 
                />
              )}

              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-8xl font-playfair font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Kontrol Bawah Box */}
        {hasPermission && (
          <div className="mt-6 flex justify-center items-center h-16">
            {!currentDraft ? (
              <button 
                onClick={startCountdownAndCapture}
                disabled={isCounting}
                className={`w-16 h-16 bg-red-600 rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] hover:bg-red-700 transition-all ${isCounting ? 'opacity-50 cursor-not-allowed transform-none shadow-[2px_2px_0_0_#000]' : ''}`}
                title="Ambil Foto"
              ></button>
            ) : (
              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleRetake}
                  className="flex-1 py-3 border-2 border-black font-garamond text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Retake
                </button>
                <button 
                  onClick={handleNext}
                  className="flex-1 py-3 bg-black text-white border-2 border-black font-garamond text-lg font-bold hover:bg-gray-800 transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
                >
                  {isRetakeMode ? 'Simpan' : (currentPhotoNumber >= requiredPhotoCount ? 'Selesai' : 'Lanjut')}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CameraScreen;
