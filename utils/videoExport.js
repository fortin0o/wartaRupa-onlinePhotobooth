import { filters } from './filters';

const MIME_TYPE_CANDIDATES = [
  'video/mp4',
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
];

let cachedMimeType;

/**
 * Deteksi format rekaman video yang didukung browser saat ini.
 * Mengembalikan null jika MediaRecorder tidak tersedia sama sekali
 * (mis. Safari lama) — pemanggil harus menonaktifkan fitur video secara halus.
 */
export function getSupportedRecordingMimeType() {
  if (cachedMimeType !== undefined) return cachedMimeType;

  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    cachedMimeType = null;
    return cachedMimeType;
  }

  cachedMimeType = MIME_TYPE_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type)) || null;
  return cachedMimeType;
}

const FRAMES_PER_CLIP = 4;
const ASSUMED_CLIP_DURATION = 1.8;
const MAX_DIMENSION = 360;
const FRAME_DELAY_MS = 150;

const loadClip = (blob) => new Promise((resolve, reject) => {
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.src = URL.createObjectURL(blob);
  video.onloadedmetadata = () => resolve(video);
  video.onerror = reject;
});

const seekTo = (video, time) => new Promise((resolve, reject) => {
  const onSeeked = () => {
    video.removeEventListener('seeked', onSeeked);
    resolve();
  };
  video.addEventListener('seeked', onSeeked);
  video.onerror = reject;
  video.currentTime = time;
});

/**
 * Bangun video boomerang dari klip video singkat per-foto: ambil beberapa frame
 * dari tiap klip, lalu enkode jadi satu video (WebM/MP4).
 * @param {Blob[]} clipBlobs
 * @param {string} filterId
 * @returns {Promise<{blob: Blob, ext: string}>}
 */
export async function buildBoomerangVideo(clipBlobs, filterId) {
  if (!clipBlobs || clipBlobs.some((c) => !c)) {
    throw new Error('Klip video belum lengkap untuk semua foto.');
  }

  const filterCss = filters[filterId] || 'none';
  const clips = await Promise.all(clipBlobs.map(loadClip));

  const scale = Math.min(MAX_DIMENSION / clips[0].videoWidth, MAX_DIMENSION / clips[0].videoHeight, 1);
  const width = Math.round(clips[0].videoWidth * scale);
  const height = Math.round(clips[0].videoHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Ambil beberapa frame merata dari tiap klip, urutan maju.
  const forwardFrames = [];
  for (const clip of clips) {
    for (let i = 0; i < FRAMES_PER_CLIP; i++) {
      const t = (ASSUMED_CLIP_DURATION * i) / FRAMES_PER_CLIP;
      await seekTo(clip, t);
      ctx.filter = filterCss;
      ctx.drawImage(clip, 0, 0, width, height);
      forwardFrames.push(ctx.getImageData(0, 0, width, height));
    }
  }

  // Boomerang: maju lalu mundur berdasarkan urutan klip.
  const reverseFrames = [...forwardFrames].reverse();
  const allFrames = [...forwardFrames, ...reverseFrames];

  clips.forEach((clip) => URL.revokeObjectURL(clip.src));

  const mimeType = getSupportedRecordingMimeType() || 'video/webm';
  const stream = canvas.captureStream(30); // 30 FPS untuk rekaman stream
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2500000 });
  const chunks = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve({ blob, ext: 'mp4' });
    };
    recorder.onerror = reject;

    recorder.start();

    let frameIndex = 0;
    const drawNextFrame = () => {
      if (frameIndex < allFrames.length) {
        ctx.putImageData(allFrames[frameIndex], 0, 0);
        frameIndex++;
        setTimeout(drawNextFrame, FRAME_DELAY_MS);
      } else {
        setTimeout(() => recorder.stop(), FRAME_DELAY_MS);
      }
    };

    drawNextFrame();
  });
}
