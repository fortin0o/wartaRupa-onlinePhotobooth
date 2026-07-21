import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getSupportedRecordingMimeType } from '../../utils/videoExport';

// â”€â”€â”€ Named Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const COUNTDOWN_SECONDS = 3;
const JPEG_QUALITY = 0.9;
const CLIP_START_AT_COUNTDOWN = 2; // mulai rekam saat hitung mundur menyentuh angka ini (~2 detik sebelum jepret)

/** Kembalikan pesan error yang spesifik per tipe DOMException kamera. */
const getCameraErrorMessage = (err) => {
  if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
    return 'Izin kamera ditolak. Buka pengaturan browser dan izinkan akses kamera, lalu muat ulang halaman.';
  }
  if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
    return 'Tidak ada kamera yang ditemukan. Pastikan perangkat Anda memiliki kamera yang terhubung.';
  }
  if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
    return 'Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi tersebut dan coba lagi.';
  }
  return 'Gagal mengakses kamera. Pastikan tidak ada aplikasi lain yang menggunakannya.';
};

const CameraScreen = ({ requiredPhotoCount = 3, retakeIndex = null, onCapture, onCaptureRetake, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [hasPermission, setHasPermission] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(true);
  
  // State alur pengambilan foto berurutan
  const [confirmedPhotos, setConfirmedPhotos] = useState([]);
  const [confirmedClips, setConfirmedClips] = useState([]);
  const [currentDraft, setCurrentDraft] = useState(null);
  const [currentDraftClip, setCurrentDraftClip] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const recorderRef = useRef(null);
  const clipChunksRef = useRef([]);

  const initCamera = useCallback(async () => {
    setCameraError(null);
    setIsRequestingPermission(true);
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
      setCameraError(getCameraErrorMessage(err));
    } finally {
      setIsRequestingPermission(false);
    }
  }, []);

  useEffect(() => {
    initCamera();
    return () => {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [initCamera]);

  const startClipRecording = () => {
    const stream = videoRef.current?.srcObject;
    const mimeType = getSupportedRecordingMimeType();
    if (!stream || !mimeType) return;

    clipChunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) clipChunksRef.current.push(e.data);
    };
    recorder.start();
    recorderRef.current = recorder;
  };

  const stopClipRecording = () => new Promise((resolve) => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === 'inactive') {
      resolve(null);
      return;
    }
    recorder.onstop = () => {
      resolve(clipChunksRef.current.length ? new Blob(clipChunksRef.current, { type: recorder.mimeType }) : null);
    };
    recorder.stop();
  });

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
    
    return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  };

  const startCountdownAndCapture = async () => {
    if (isCounting) return;
    setIsCounting(true);

    let isRecordingClip = false;
    for (let c = COUNTDOWN_SECONDS; c > 0; c--) {
      setCountdown(c);
      if (c === CLIP_START_AT_COUNTDOWN) {
        startClipRecording();
        isRecordingClip = true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setCountdown(null);
    const photoData = captureFrame();
    const clipBlob = isRecordingClip ? await stopClipRecording() : null;

    if (photoData) {
      setCurrentDraft(photoData);
      setCurrentDraftClip(clipBlob);
    } else {
      alert('Gagal menangkap frame kamera. Pastikan kamera aktif dan coba lagi.');
    }
    setIsCounting(false);
  };

  const handleRetake = () => {
    setCurrentDraft(null);
    setCurrentDraftClip(null);
  };

  const handleNext = () => {
    // Mode Retake Individual
    if (retakeIndex !== null) {
      onCaptureRetake(currentDraft, currentDraftClip);
      setCurrentDraft(null);
      setCurrentDraftClip(null);
      return;
    }

    // Mode Normal berurutan
    const newPhotos = [...confirmedPhotos, currentDraft];
    const newClips = [...confirmedClips, currentDraftClip];
    setConfirmedPhotos(newPhotos);
    setConfirmedClips(newClips);
    setCurrentDraft(null);
    setCurrentDraftClip(null);

    // Jika slot sudah penuh
    if (newPhotos.length >= requiredPhotoCount) {
      onCapture(newPhotos, newClips);
    }
  };

  const isRetakeMode = retakeIndex !== null;
  const currentPhotoNumber = isRetakeMode ? retakeIndex + 1 : confirmedPhotos.length + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-paper px-4 py-8 relative">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header & Indikator */}
      <div className="w-full max-w-[480px] flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          disabled={isCounting}
          className={`px-4 py-2 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-ink hover:text-cream transition-colors ${isCounting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Kembali
        </button>
        <div className="font-display text-xl font-bold bg-cream px-4 py-2 border-2 border-ink shadow-hard-sm">
          {isRetakeMode ? `Ambil Ulang Foto Ke-${currentPhotoNumber}` : `Foto ${Math.min(currentPhotoNumber, requiredPhotoCount)} dari ${requiredPhotoCount}`}
        </div>
      </div>

      {/* Box Kamera Container */}
      <div className="w-full max-w-[480px] bg-cream border-4 border-ink p-4 shadow-hard">

        {/* Aspect Ratio Wrapper (4:3) */}
        <div className="relative w-full aspect-[4/3] bg-gray-900 border-2 border-gray-300 overflow-hidden flex items-center justify-center">
          
          {/* Video selalu ada di DOM agar videoRef.current valid saat initCamera() meng-assign srcObject */}
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={`absolute inset-0 w-full h-full object-cover -scale-x-100 ${currentDraft || !hasPermission ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Overlay: foto draft setelah capture */}
          {currentDraft && (
            <img 
              src={currentDraft} 
              alt="Draft Foto" 
              className="absolute inset-0 w-full h-full object-cover z-10" 
            />
          )}

          {/* Overlay: spinner saat meminta izin */}
          {isRequestingPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20">
              <div className="w-10 h-10 border-4 border-gray-500 border-t-white rounded-full animate-spin mb-4" />
              <p className="font-body text-gray-300">Menghubungkan kamera...</p>
            </div>
          )}

          {/* Overlay: error state jika izin ditolak / kamera tidak ditemukan */}
          {!isRequestingPermission && !hasPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 p-6 text-center">
              <h3 className="text-xl font-display mb-2 text-white">Kamera Tidak Tersedia</h3>
              <p className="font-body text-gray-400 mb-6">{cameraError}</p>
              <button
                onClick={initCamera}
                className="px-6 py-2 bg-cream text-ink font-ui font-bold uppercase tracking-wider hover:bg-white transition"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Overlay: countdown */}
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="text-8xl font-display font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse">
                {countdown}
              </div>
            </div>
          )}
        </div>


        {/* Kontrol Bawah Box */}
        {hasPermission && !isRequestingPermission && (
          <div className="mt-6 flex justify-center items-center h-16">
            {!currentDraft ? (
              <button
                onClick={startCountdownAndCapture}
                disabled={isCounting}
                className={`w-16 h-16 bg-accent rounded-full border-4 border-ink shadow-hard-sm hover:translate-y-1 hover:shadow-none transition-all ${isCounting ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : ''}`}
                title="Ambil Foto"
              ></button>
            ) : (
              <div className="flex gap-4 w-full">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Retake
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 bg-ink text-cream border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors shadow-hard-sm"
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

