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
