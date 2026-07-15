import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

// Rotasi acak tapi konsisten per render (stabil via useMemo)
const ROTATE_OPTIONS = [-2, -1.5, -1, 0.5, 1, 1.5, 2];

const NewspaperBold = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article  = useMemo(() => getRandomArticle(), []);
  const headlineRotate = useMemo(
    () => ROTATE_OPTIONS[Math.floor(Math.random() * ROTATE_OPTIONS.length)],
    []
  );

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const mainPhotoSrc  = bigPhoto   || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div
      className="text-white w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden"
      style={{ background: '#0a0a0a', border: '6px solid #f5d020' }}
    >

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-black"
        style={{ background: '#f5d020', borderBottom: '3px solid #0a0a0a' }}
      >
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div
        className="text-center px-4 py-5"
        style={{ borderBottom: '6px solid #f5d020' }}
      >
        <h1
          className="font-playfair text-5xl font-black leading-none tracking-tight text-white"
        >
          Warta <span style={{ color: '#f5d020' }}>Rupa</span>
        </h1>
        <p className="font-garamond italic text-[12px] mt-2" style={{ color: '#aaa' }}>
          capture the moment, make the news
        </p>
      </div>

      {/* ── META BAR ─────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[11px] font-black uppercase px-4 py-1.5 text-black"
        style={{ background: '#f5d020', borderBottom: '3px solid #0a0a0a' }}
      >
        <span>Surakarta</span>
        <span>{today}</span>
        <span>Vol. 01</span>
      </div>

      {/* ── HEADLINE — stempel kasar miring ──────────────── */}
      <div className="px-5 py-5 flex justify-center">
        <div
          style={{
            transform: `rotate(${headlineRotate}deg)`,
            display: 'inline-block',
          }}
        >
          <h2
            className="font-playfair font-black uppercase text-center leading-[1.1]"
            style={{
              fontSize: '1.85rem',
              letterSpacing: '0.06em',
              color: '#f5d020',
              border: '3px solid white',
              padding: '8px 14px',
              background: '#0a0a0a',
              textShadow: '2px 2px 0 #000, -1px -1px 0 #333',
            }}
          >
            {headline}
          </h2>
        </div>
      </div>

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="mx-4 mb-4" style={{ height: '3px', background: '#f5d020' }} />

      {/* ── FOTO BESAR ───────────────────────────────────── */}
      <div
        className="mx-4 mb-1"
        style={{ border: '6px solid white' }}
      >
        <img
          src={mainPhotoSrc}
          alt="Foto Utama"
          className="w-full aspect-[3/4] object-cover block"
          style={{ filter: filterStyle }}
        />
      </div>

      {/* ── CAPTION ──────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[10px] uppercase mx-4 mb-4 font-black"
        style={{ color: '#f5d020' }}
      >
        <span>Candid Moment</span>
        <span>Vol. 01</span>
      </div>

      {/* ── SECTION LABEL ────────────────────────────────── */}
      <div className="mx-4 mb-3 flex items-center gap-2">
        <div style={{ flex: 1, height: '2px', background: 'white' }} />
        <span
          className="text-[10px] font-black uppercase tracking-widest px-2"
          style={{ color: '#f5d020', background: '#0a0a0a', whiteSpace: 'nowrap' }}
        >
          Sorotan Hari Ini
        </span>
        <div style={{ flex: 1, height: '2px', background: 'white' }} />
      </div>

      {/* ── ARTIKEL + FOTO KECIL ─────────────────────────── */}
      <div className="mx-4 mb-5 flex gap-3 items-start">
        <div style={{ width: '80px', height: '80px', flexShrink: 0, border: '4px solid #f5d020' }}>
          <img
            src={smallPhotoSrc}
            alt="Foto Kecil"
            className="w-full h-full object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>
        <p
          className="font-garamond text-[12px] text-justify leading-relaxed flex-1 text-white"
        >
          {article}
        </p>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div
        className="text-center text-[10px] py-2 font-black uppercase tracking-widest mt-auto text-black"
        style={{ background: '#f5d020', borderTop: '3px solid #0a0a0a' }}
      >
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperBold;
