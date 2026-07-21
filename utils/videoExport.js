import { filters } from './filters';

const MIME_TYPE_CANDIDATES = [
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
  'video/mp4',
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

/** Muat sebuah Blob video ke HTMLVideoElement dan tunggu metadata siap. */
const loadClip = (blob) => new Promise((resolve, reject) => {
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.src = URL.createObjectURL(blob);
  video.onloadedmetadata = () => resolve(video);
  video.onerror = reject;
});

/**
 * Mainkan satu klip video secara penuh, menggambar tiap frame ke canvas
 * dengan filter CSS yang diterapkan, lalu selesai saat klip berakhir.
 */
const playClipOntoCanvas = (video, ctx, width, height, filterCss) => new Promise((resolve, reject) => {
  let rafId;

  const draw = () => {
    ctx.filter = filterCss;
    ctx.drawImage(video, 0, 0, width, height);
    if (!video.ended && !video.paused) {
      rafId = requestAnimationFrame(draw);
    }
  };

  video.onended = () => {
    cancelAnimationFrame(rafId);
    resolve();
  };
  video.onerror = reject;

  video.currentTime = 0;
  video.play().then(() => {
    rafId = requestAnimationFrame(draw);
  }).catch(reject);
});

/**
 * Gabungkan klip-klip video pendek (per-foto) menjadi satu video boomerang:
 * diputar maju sesuai urutan pengambilan, lalu diputar lagi dengan urutan klip terbalik.
 * @param {Blob[]} clipBlobs
 * @param {string} filterId - kunci dari utils/filters.js
 * @returns {Promise<Blob>}
 */
export async function buildBoomerangVideo(clipBlobs, filterId) {
  const mimeType = getSupportedRecordingMimeType();
  if (!mimeType) {
    throw new Error('Perekaman video tidak didukung di browser ini.');
  }
  if (!clipBlobs || clipBlobs.some((c) => !c)) {
    throw new Error('Klip video belum lengkap untuk semua foto.');
  }

  const filterCss = filters[filterId] || 'none';
  const clips = await Promise.all(clipBlobs.map(loadClip));

  const width = clips[0].videoWidth;
  const height = clips[0].videoHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const outputStream = canvas.captureStream(30);
  const outputChunks = [];
  const recorder = new MediaRecorder(outputStream, { mimeType });
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) outputChunks.push(e.data);
  };

  const finished = new Promise((resolve) => {
    recorder.onstop = resolve;
  });

  recorder.start();

  const forwardOrder = clips;
  const reverseOrder = [...clips].reverse();
  const sequence = [...forwardOrder, ...reverseOrder];

  for (const clip of sequence) {
    await playClipOntoCanvas(clip, ctx, width, height, filterCss);
  }

  recorder.stop();
  await finished;

  clips.forEach((clip) => URL.revokeObjectURL(clip.src));

  return new Blob(outputChunks, { type: mimeType });
}
