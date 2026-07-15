import React, { useRef, useState, useEffect, useCallback } from 'react';

const CameraScreen = ({ onCapture, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [hasPermission, setHasPermission] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
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
      setCameraError('Gagal mengakses kamera. Pastikan Anda telah memberikan izin akses kamera dan menggunakan koneksi yang aman (HTTPS/localhost).');
    }
  }, []);

  useEffect(() => {
    initCamera();
    return () => {
      // Cleanup camera on unmount
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
    
    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Mirror the image since we are using facingMode 'user'
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const startCaptureSequence = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setPhotos([]);
    
    const capturedPhotos = [];
    
    for (let i = 0; i < 3; i++) {
      // Countdown
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setCountdown(null);
      
      // Flash effect could be added here
      const photoData = captureFrame();
      if (photoData) {
        capturedPhotos.push(photoData);
        setPhotos([...capturedPhotos]);
      }
      
      // Wait a bit before next countdown, unless it's the last photo
      if (i < 2) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
    
    // Wait briefly for user to see the 3rd thumbnail before proceeding
    setTimeout(() => {
      onCapture(capturedPhotos);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Hidden Canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
        <button 
          onClick={onBack}
          disabled={isCapturing}
          className={`px-4 py-2 font-garamond border border-white/50 rounded hover:bg-white/10 transition ${isCapturing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Kembali
        </button>
        <div className="font-garamond text-lg tracking-widest">
          {isCapturing ? `Foto ${photos.length + 1}/3` : 'WARTA RUPA'}
        </div>
      </div>

      {/* Main Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900">
        {!hasPermission ? (
          <div className="text-center p-6 max-w-md">
            <div className="mb-4 text-4xl">📷</div>
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
              className="w-full h-full object-cover -scale-x-100"
            />
            
            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-9xl font-playfair font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnails Overlay */}
      <div className="absolute right-4 top-20 flex flex-col gap-2 z-10">
        {photos.map((photo, index) => (
          <div key={index} className="w-16 h-24 md:w-24 md:h-32 border-2 border-white rounded overflow-hidden shadow-lg bg-black">
            <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      {hasPermission && (
        <div className="absolute bottom-0 left-0 w-full p-6 pb-10 flex justify-center bg-gradient-to-t from-black/80 to-transparent z-10">
          {!isCapturing && photos.length === 0 && (
            <button 
              onClick={startCaptureSequence}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
            >
              <div className="w-16 h-16 bg-white rounded-full border-2 border-black group-active:bg-gray-200 transition-colors"></div>
            </button>
          )}
          
          {isCapturing && (
            <div className="font-garamond text-xl animate-pulse">
              Mengambil foto...
            </div>
          )}
          
          {!isCapturing && photos.length === 3 && (
            <div className="font-garamond text-xl">
              Memproses foto...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraScreen;
