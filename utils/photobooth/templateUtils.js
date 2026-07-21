/**
 * templateUtils.js
 * Shared utilities untuk semua template newspaper dan strip.
 * Menghapus duplikasi: date formatting, filter composition, dan placeholder fallback.
 */

// ─── Date Formatting ──────────────────────────────────────────────────────────

/**
 * Kembalikan tanggal hari ini sebagai string terformat.
 * @param {'id-ID'|'en-GB'} locale - Default 'id-ID'
 * @param {Intl.DateTimeFormatOptions} options - Intl options
 */
export const getFormattedDate = (
  locale = 'id-ID',
  options = { day: 'numeric', month: 'long', year: 'numeric' }
) => new Date().toLocaleDateString(locale, options);

// ─── Filter Composition ───────────────────────────────────────────────────────

/**
 * Gabungkan baseFilter (misal grayscale) dengan userFilter pilihan user.
 * Dipakai oleh template yang punya filter bawaan (Vintage, ClassicBW).
 * @param {string} baseFilter - Filter CSS bawaan template, misal 'grayscale(1) contrast(1.1)'
 * @param {string} userFilter - filterStyle dari props (bisa 'none' atau CSS filter string)
 * @returns {string} Filter CSS gabungan
 */
export const buildCompositeFilter = (baseFilter, userFilter) => {
  if (!userFilter || userFilter === 'none') return baseFilter;
  return `${baseFilter} ${userFilter}`;
};

// ─── Local Placeholders ───────────────────────────────────────────────────────
// SVG data-URI lokal sebagai pengganti via.placeholder.com.
// Tidak bergantung pada layanan pihak ketiga yang bisa down.

const makePlaceholderSvg = (w, h, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#e5e5e5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/** Placeholder untuk slot foto besar (400x300) */
export const PLACEHOLDER_BIG   = makePlaceholderSvg(400, 300, 'Foto Besar');

/** Placeholder untuk slot foto kecil (150x150) */
export const PLACEHOLDER_SMALL = makePlaceholderSvg(150, 150, 'Foto Kecil');

/** Placeholder untuk slot strip (400x300) */
export const PLACEHOLDER_STRIP = makePlaceholderSvg(400, 300, 'Foto');
