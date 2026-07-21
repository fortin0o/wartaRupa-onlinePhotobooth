import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { filters } from './filters';

const FRAMES_PER_CLIP = 4;
const FRAME_DELAY_MS = 150;
// Klip direkam ~2 detik (lihat CLIP_START_AT_COUNTDOWN di CameraScreen.jsx).
// Pakai durasi asumsi yang sedikit lebih pendek dari itu, bukan video.duration,
// karena blob hasil MediaRecorder sering melaporkan duration = Infinity.
const ASSUMED_CLIP_DURATION = 1.8;
const MAX_DIMENSION = 360;

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
 * Bangun GIF boomerang dari klip video singkat per-foto: ambil beberapa frame
 * dari tiap klip (maju sesuai urutan pengambilan, lalu mundur berdasarkan
 * urutan klip), lalu enkode jadi satu GIF animasi. GIF dipakai khusus agar
 * hasilnya bisa dibuka di HP manapun tanpa masalah kompatibilitas codec.
 * @param {Blob[]} clipBlobs
 * @param {string} filterId - kunci dari utils/filters.js
 * @returns {Promise<Blob>}
 */
export async function buildBoomerangGif(clipBlobs, filterId) {
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
      forwardFrames.push(ctx.getImageData(0, 0, width, height).data);
    }
  }

  // Boomerang: maju lalu mundur berdasarkan urutan klip (sama seperti utils/videoExport.js).
  const reverseFrames = [...forwardFrames].reverse();
  const allFrames = [...forwardFrames, ...reverseFrames];

  // Palet warna gabungan dari semua frame agar warna konsisten antar-frame.
  const combinedPixels = new Uint8Array(allFrames.length * width * height * 4);
  allFrames.forEach((frame, i) => combinedPixels.set(frame, i * width * height * 4));
  const palette = quantize(combinedPixels, 256);

  const gif = GIFEncoder();
  allFrames.forEach((frame) => {
    const indexedPixels = applyPalette(frame, palette, 'floyd-steinberg');
    gif.writeFrame(indexedPixels, width, height, { palette, delay: FRAME_DELAY_MS });
  });
  gif.finish();

  clips.forEach((clip) => URL.revokeObjectURL(clip.src));

  return new Blob([gif.bytes()], { type: 'image/gif' });
}
