import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

// ── Konfigurasi per-karakter (font, ukuran, rotasi) ────────────────────────
const CHAR_FONTS = [
  '"Playfair Display", serif',
  '"Courier New", "Courier", monospace',
  '"EB Garamond", serif',
  '"Courier New", monospace',
  '"Georgia", serif',
  '"Playfair Display", serif',
];
const CHAR_SIZES   = ['1.1rem', '1.3rem', '0.95rem', '1.25rem', '1rem', '1.4rem', '0.9rem'];
const CHAR_ROTATES = [-8, -6, -4, -2, 0, 1, 3, 5, 7, -3, 6, -7, 2, -5, 4, 8, -1];
const CHAR_WEIGHTS = ['400', '700', '900', '400', '700'];

// Washi tape definitions (pastel, posisi & rotasi berbeda)
const WASHI_TAPES = [
  { color: 'rgba(255, 200, 150, 0.55)', rotate: '-35deg', top: '-10px', left: '20px',  width: '70px', height: '20px' },
  { color: 'rgba(180, 220, 255, 0.55)', rotate: '8deg',   top: '-8px',  right: '30px', width: '55px', height: '18px' },
  { color: 'rgba(200, 255, 200, 0.55)', rotate: '-6deg',  bottom: '-8px', left: '40px', width: '65px', height: '18px' },
];

// Deterministik pseudo-random dari index (stabil tanpa seed library)
const stableRand = (index, mod) => (index * 2654435761 + 17) % mod;

const NewspaperZine = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article  = useMemo(() => getRandomArticle(), []);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const mainPhotoSrc  = bigPhoto   || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  // Pre-compute per-character styles (stable across re-renders)
  const charStyles = useMemo(() =>
    headline.split('').map((char, i) => ({
      char,
      font:   CHAR_FONTS[stableRand(i + 3, CHAR_FONTS.length)],
      size:   char === ' ' ? '1rem' : CHAR_SIZES[stableRand(i + 7, CHAR_SIZES.length)],
      rotate: char === ' ' ? 0       : CHAR_ROTATES[stableRand(i + 13, CHAR_ROTATES.length)],
      weight: CHAR_WEIGHTS[stableRand(i + 5, CHAR_WEIGHTS.length)],
    })),
    [headline]
  );

  // Noise texture via repeating-radial-gradient
  const noiseBg = {
    backgroundColor: '#f9f6f0',
    backgroundImage: [
      'repeating-radial-gradient(circle at 10% 20%, rgba(0,0,0,0.018) 0, rgba(0,0,0,0.018) 1px, transparent 1px, transparent 100%)',
      'repeating-radial-gradient(circle at 80% 60%, rgba(0,0,0,0.014) 0, rgba(0,0,0,0.014) 1px, transparent 1px, transparent 100%)',
    ].join(', '),
  };

  return (
    <div
      className="text-black max-w-[380px] w-full mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden"
      style={{ ...noiseBg, border: '2px solid #555' }}
    >

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black"
        style={{ borderBottom: '2px dashed #555', fontFamily: '"Courier New", monospace' }}
      >
        <span>★ ZINE ISSUE ★</span>
        <span>{today}</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3" style={{ borderBottom: '2px solid #000' }}>
        <h1
          className="font-playfair text-5xl font-black leading-none text-center"
          style={{ letterSpacing: '-0.02em' }}
        >
          Warta Rupa
        </h1>
        <p
          className="text-center text-[11px] mt-2 italic"
          style={{ fontFamily: '"Courier New", monospace', color: '#666' }}
        >
          — capture the moment, make the news —
        </p>
      </div>

      {/* ── HEADLINE — ransom note style ─────────────────── */}
      <div className="px-4 py-5 flex flex-wrap justify-center items-end gap-x-[2px] gap-y-[6px]">
        {charStyles.map((s, i) =>
          s.char === ' '
            ? <span key={i} className="inline-block w-[0.4rem]" />
            : (
              <span
                key={i}
                className="inline-block leading-none px-[2px] py-[1px] bg-white"
                style={{
                  fontFamily: s.font,
                  fontSize:   s.size,
                  fontWeight: s.weight,
                  transform:  `rotate(${s.rotate}deg)`,
                  boxShadow:  '0 1px 2px rgba(0,0,0,0.15)',
                  lineHeight: '1.15',
                  border:     '0.5px solid rgba(0,0,0,0.08)',
                }}
              >
                {s.char}
              </span>
            )
        )}
      </div>

      {/* ── DIVIDER dashed ───────────────────────────────── */}
      <div className="mx-4 mb-4" style={{ borderTop: '1px dashed #999' }} />

      {/* ── FOTO BESAR — miring DIY + washi tape ─────────── */}
      <div className="mx-6 mb-2 relative">
        {/* Washi tape elements */}
        {WASHI_TAPES.map((tape, i) => (
          <div
            key={i}
            className="absolute z-20 pointer-events-none"
            style={{
              background: tape.color,
              transform:  `rotate(${tape.rotate})`,
              top:    tape.top    ?? 'auto',
              bottom: tape.bottom ?? 'auto',
              left:   tape.left   ?? 'auto',
              right:  tape.right  ?? 'auto',
              width:  tape.width,
              height: tape.height,
              borderRadius: '2px',
            }}
          />
        ))}

        {/* Foto wrapper miring -1.5deg (kesan DIY) */}
        <div
          className="relative"
          style={{
            transform: 'rotate(-1.5deg)',
            border: '3px solid #333',
            padding: '3px',
            background: '#fff',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.25)',
          }}
        >
          <img
            src={mainPhotoSrc}
            alt="Foto Utama"
            className="w-full aspect-[4/3] object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>
      </div>

      {/* ── CAPTION ──────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[10px] uppercase mx-4 mb-4 font-black"
        style={{ fontFamily: '"Courier New", monospace', color: '#777' }}
      >
        <span>candid moment</span>
        <span>vol. 01</span>
      </div>

      {/* ── SECTION LABEL ────────────────────────────────── */}
      <div className="mx-4 mb-2">
        <span
          className="text-[10px] font-black uppercase tracking-widest"
          style={{ fontFamily: '"Courier New", monospace', borderBottom: '1px solid #000' }}
        >
          [ sorotan hari ini ]
        </span>
      </div>

      {/* ── ARTIKEL + FOTO KECIL ─────────────────────────── */}
      <div className="mx-4 mb-5 flex gap-3 items-start">
        {/* Foto kecil sedikit miring ke arah lain */}
        <div
          style={{
            width: '78px', height: '78px', flexShrink: 0,
            transform: 'rotate(1.5deg)',
            border: '2px solid #555',
            padding: '2px',
            background: '#fff',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          }}
        >
          <img
            src={smallPhotoSrc}
            alt="Foto Kecil"
            className="w-full h-full object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>
        <p
          className="text-[11px] text-justify leading-relaxed flex-1 text-black"
          style={{ fontFamily: '"Courier New", monospace' }}
        >
          {article}
        </p>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div
        className="text-center text-[10px] py-2 font-black uppercase tracking-widest"
        style={{
          fontFamily: '"Courier New", monospace',
          borderTop: '2px dashed #555',
          color: '#555',
        }}
      >
        @warta.rupa ✂ cut here ✂
      </div>

    </div>
  );
};

export default NewspaperZine;
