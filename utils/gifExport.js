import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { filters } from './filters';

/**
 * Muat data URL foto menjadi HTMLImageElement.
 */
const loadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

/**
 * Gambar satu foto ke canvas offscreen dengan filter CSS diterapkan,
 * kembalikan ImageData RGBA pada dimensi target.
 */
const drawFrame = (img, maxDimension, filterCss) => {
  const scale = Math.min(maxDimension / img.width, maxDimension / img.height, 1);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.filter = filterCss === 'none' ? 'none' : filterCss;
  ctx.drawImage(img, 0, 0, width, height);

  return { imageData: ctx.getImageData(0, 0, width, height), width, height };
};

/**
 * Bangun urutan indeks ping-pong (maju lalu mundur) tanpa duplikasi tahan di titik balik.
 * Contoh untuk n=4: [0,1,2,3,2,1]
 */
const buildPingPongSequence = (n) => {
  if (n <= 1) return [0];
  const forward = Array.from({ length: n }, (_, i) => i);
  const backward = forward.slice(1, -1).reverse();
  return [...forward, ...backward];
};

/**
 * Bangun GIF boomerang (maju-mundur) dari foto-foto yang diambil, sepenuhnya di sisi klien.
 * @param {string[]} photoDataUrls - data URL JPEG hasil capture
 * @param {string} filterId - kunci dari utils/filters.js (normal/bw/sepia/vintage)
 * @param {{ maxDimension?: number, frameDelayMs?: number }} [options]
 * @returns {Promise<Blob>}
 */
export async function buildBoomerangGif(photoDataUrls, filterId, options = {}) {
  const { maxDimension = 480, frameDelayMs = 550 } = options;
  const filterCss = filters[filterId] || 'none';

  if (!photoDataUrls || photoDataUrls.length === 0) {
    throw new Error('Tidak ada foto untuk dijadikan GIF.');
  }

  const images = await Promise.all(photoDataUrls.map(loadImage));
  const frames = images.map((img) => drawFrame(img, maxDimension, filterCss));
  const { width, height } = frames[0];

  // Palet warna gabungan dari semua frame unik agar warna konsisten antar-frame.
  const combinedPixels = new Uint8Array(frames.length * width * height * 4);
  frames.forEach((frame, i) => {
    combinedPixels.set(frame.imageData.data, i * width * height * 4);
  });
  const palette = quantize(combinedPixels, 256);

  const gif = GIFEncoder();
  const sequence = buildPingPongSequence(frames.length);

  sequence.forEach((frameIndex) => {
    const indexedPixels = applyPalette(frames[frameIndex].imageData.data, palette, 'floyd-steinberg');
    gif.writeFrame(indexedPixels, width, height, { palette, delay: frameDelayMs });
  });

  gif.finish();
  return new Blob([gif.bytes()], { type: 'image/gif' });
}
