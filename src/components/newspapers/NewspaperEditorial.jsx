import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

const NewspaperEditorial = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article  = useMemo(() => getRandomArticle(), []);

  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const mainPhotoSrc  = bigPhoto   || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div
      className="bg-white text-black max-w-[380px] w-full mx-auto flex flex-col shadow-none box-border overflow-hidden"
      style={{ border: '1px solid #ddd' }}
    >

      {/* ── TOP META BAR ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-5 py-2 text-[9px] tracking-[0.25em] uppercase"
        style={{ fontFamily: '"Archivo", sans-serif', borderBottom: '1px solid #ddd', color: '#999' }}
      >
        <span>Warta Rupa Studio</span>
        <span>{today}</span>
        <span>Vol. 01</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-4">
        <h1
          className="text-[3.5rem] leading-[0.95] tracking-[-0.04em] text-black font-archivo"
          style={{ fontWeight: 600, letterSpacing: '-0.04em' }}
        >
          Warta<br />Rupa
        </h1>
        <p
          className="mt-3 text-[11px] text-[#aaa] tracking-[0.18em] uppercase font-archivo"
          style={{ fontWeight: 400 }}
        >
          capture the moment, make the news
        </p>
      </div>

      {/* ── THIN RULE ────────────────────────────────────── */}
      <div className="mx-5 mb-6" style={{ height: '1px', backgroundColor: '#111' }} />

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <div className="px-5 mb-6">
        <h2
          className="font-archivo text-[1.55rem] leading-[1.1] text-black"
          style={{ fontWeight: 600, letterSpacing: '-0.025em' }}
        >
          {headline}
        </h2>
      </div>

      {/* ── FOTO BESAR — full bleed, nempel ke tepi ──────── */}
      <div className="relative w-full mb-0">
        <img
          src={mainPhotoSrc}
          alt="Foto Utama"
          className="w-full aspect-[4/3] object-cover block"
          style={{ filter: filterStyle }}
        />

        {/* ── FOTO KECIL — mengambang di pojok kanan-bawah, overlap ── */}
        <div
          className="absolute bottom-0 right-4 translate-y-1/2"
          style={{ width: '88px', height: '88px', border: '3px solid white' }}
        >
          <img
            src={smallPhotoSrc}
            alt="Foto Kecil"
            className="w-full h-full object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>
      </div>

      {/* ── ARTIKEL ──────────────────────────────────────── */}
      {/* Padding kiri-kanan besar + margin top besar untuk whitespace */}
      <div className="px-5 pt-14 pb-8">
        <div
          className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3 font-archivo"
          style={{ fontWeight: 500 }}
        >
          Sorotan Hari Ini
        </div>
        <p className="font-garamond text-[13px] text-gray-700 leading-relaxed">
          {article}
        </p>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div
        className="mx-5 mb-5 pt-4 flex justify-between items-center"
        style={{ borderTop: '1px solid #ddd' }}
      >
        <span
          className="text-[9px] text-[#bbb] tracking-[0.25em] uppercase font-archivo"
          style={{ fontWeight: 400 }}
        >
          @warta.rupa
        </span>
        <span
          className="text-[9px] text-[#bbb] tracking-[0.15em] uppercase font-archivo"
          style={{ fontWeight: 400 }}
        >
          Editorial Edition
        </span>
      </div>

    </div>
  );
};

export default NewspaperEditorial;
