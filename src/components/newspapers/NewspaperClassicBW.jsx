import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

const NewspaperClassicBW = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article  = useMemo(() => getRandomArticle(), []);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Gabungkan grayscale wajib + filter pilihan user.
  // grayscale(1) contrast(1.1) selalu di depan supaya tema tetap B&W total.
  // Filter user (brightness, fade, dll.) diterapkan di atasnya.
  const bwFilter = filterStyle && filterStyle !== 'none'
    ? `grayscale(1) contrast(1.1) ${filterStyle}`
    : 'grayscale(1) contrast(1.1)';

  const mainPhotoSrc  = bigPhoto   || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div
      className="bg-white text-black max-w-[380px] w-full mx-auto font-sans flex flex-col shadow-none box-border relative overflow-hidden"
      style={{ border: '4px solid #111' }}
    >

      {/* ── FOLD LINE (garis lipatan koran) ─────────────── */}
      {/* Diposisikan di 50% tinggi elemen, pointer-events-none */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{ top: '50%', height: '1px', backgroundColor: '#bbb' }}
        aria-hidden="true"
      />

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-3 py-[3px] text-[9px] font-black uppercase tracking-[0.2em]"
        style={{ borderBottom: '1px solid #111' }}
      >
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div
        className="text-center py-3 px-4"
        style={{ borderBottom: '4px solid #111' }}
      >
        <h1 className="font-playfair text-5xl font-black leading-none tracking-tight mb-1">
          Warta Rupa
        </h1>
        <div
          className="my-2"
          style={{ height: '2px', background: '#111' }}
        />
        <p className="font-garamond italic text-[12px] text-gray-600">
          capture the moment, make the news
        </p>
      </div>

      {/* ── META BAR ─────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[11px] font-black uppercase px-3 py-1 bg-[#f0f0f0]"
        style={{ borderBottom: '3px solid #111' }}
      >
        <span>Surakarta</span>
        <span>{today}</span>
        <span>Vol. 01</span>
      </div>

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-2">
        <h2
          className="font-playfair font-black text-[2rem] uppercase leading-[1.05] text-center text-black"
        >
          {headline}
        </h2>
      </div>

      {/* ── DOUBLE RULE ──────────────────────────────────── */}
      <div className="mx-4 mb-3" style={{ borderTop: '3px solid #111', paddingTop: '3px', borderBottom: '1px solid #111', paddingBottom: '3px' }} />

      {/* ── FOTO BESAR ───────────────────────────────────── */}
      <div className="mx-4 mb-1" style={{ border: '1px solid #333' }}>
        <img
          src={mainPhotoSrc}
          alt="Foto Utama"
          className="w-full aspect-[4/3] object-cover"
          style={{ filter: bwFilter }}
        />
      </div>

      {/* ── CAPTION ──────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[10px] uppercase text-gray-500 mx-4 mb-4 font-black"
      >
        <span>Candid Moment</span>
        <span className="italic font-garamond text-gray-400 normal-case font-normal">grayscale rendition</span>
      </div>

      {/* ── SEKSI ARTIKEL ────────────────────────────────── */}
      <div className="mx-4 mb-5">
        {/* Section label */}
        <div className="flex items-center gap-0 mb-2">
          <div style={{ flex: 1, height: '2px', backgroundColor: '#111' }} />
          <span className="text-[10px] font-black uppercase tracking-widest px-2 bg-white">
            Sorotan Hari Ini
          </span>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#111' }} />
        </div>

        {/* 2-kolom layout koran */}
        <div className="flex gap-3 items-start">
          <div className="w-[76px] h-[76px] shrink-0" style={{ border: '1px solid #333' }}>
            <img
              src={smallPhotoSrc}
              alt="Foto Kecil"
              className="w-full h-full object-cover"
              style={{ filter: bwFilter }}
            />
          </div>

          {/* Teks 2-kolom */}
          <div
            className="font-garamond text-[11px] text-justify leading-relaxed flex-1 text-black"
            style={{ columnCount: 2, columnGap: '10px', columnRule: '1px solid #ccc' }}
          >
            {/* Perbanyak isi agar kolom terlihat */}
            {article} {article}
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div
        className="text-center text-[10px] text-gray-500 py-2 font-black uppercase tracking-widest mt-auto bg-[#f0f0f0]"
        style={{ borderTop: '2px solid #111' }}
      >
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperClassicBW;
