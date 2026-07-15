import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

const stampLabels = ['EXCLUSIVE', 'BREAKING', 'TERUNGKAP', 'VIRAL', 'HOT TAKE', 'RAHASIA'];

const NewspaperTabloid = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article  = useMemo(() => getRandomArticle(), []);
  const stamp    = useMemo(() => stampLabels[Math.floor(Math.random() * stampLabels.length)], []);

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const mainPhotoSrc  = bigPhoto  || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div className="bg-[#fcf8ed] text-black w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden relative">

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div className="bg-[#d32f2f] flex justify-between items-center px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest">
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div className="text-center py-3 px-4 border-b-4 border-black">
        {/* Nama brand dengan aksen kuning */}
        <div className="inline-block relative">
          <span
            className="font-playfair text-5xl font-black leading-none tracking-tight relative z-10"
            style={{ WebkitTextStroke: '1px black' }}
          >
            Warta Rupa
          </span>
          {/* Underline kuning tebal */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#f5d020] -z-0 translate-y-1" />
        </div>
        <p className="font-garamond italic text-[12px] text-gray-700 mt-2">
          capture the moment, make the news
        </p>
      </div>

      {/* ── META BAR ─────────────────────────────────────── */}
      <div className="flex justify-between items-center text-[11px] font-black uppercase px-3 py-1 bg-[#f5d020] border-b-2 border-black">
        <span>Surakarta</span>
        <span>{today}</span>
      </div>

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-2">
        <h2
          className="font-playfair font-black text-[2rem] uppercase leading-[1.05] text-center"
          style={{
            textShadow: '-1px -1px 0 #d32f2f, 1px -1px 0 #d32f2f, -1px 1px 0 #d32f2f, 1px 1px 0 #d32f2f',
            WebkitTextStroke: '0.5px #d32f2f',
          }}
        >
          {headline}
        </h2>
      </div>

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="h-[3px] mx-4 mb-3 bg-gradient-to-r from-[#d32f2f] via-black to-[#d32f2f]" />

      {/* ── FOTO BESAR + STEMPEL ─────────────────────────── */}
      <div className="mx-4 mb-1 border-2 border-black relative">
        <img
          src={mainPhotoSrc}
          alt="Foto Utama"
          className="w-full aspect-[4/3] object-cover"
          style={{ filter: filterStyle }}
        />

        {/* Stempel Oval Miring */}
        <div
          className="absolute bottom-3 right-3 flex items-center justify-center"
          style={{ transform: 'rotate(-15deg)' }}
        >
          <div className="bg-[#d32f2f] border-[3px] border-white rounded-full w-[68px] h-[56px] flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-[11px] uppercase tracking-wide text-center leading-tight">
              {stamp}
            </span>
          </div>
        </div>
      </div>

      {/* ── CAPTION ──────────────────────────────────────── */}
      <div className="flex justify-between items-center text-[10px] uppercase text-gray-600 mx-4 mb-4 font-black">
        <span>Candid Moment</span>
        <span>Vol. 01</span>
      </div>

      {/* ── SEKSI ARTIKEL + FOTO KECIL ───────────────────── */}
      <div className="mx-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#d32f2f] h-[3px] flex-1" />
          <h3 className="text-[11px] font-black uppercase tracking-widest text-[#d32f2f] whitespace-nowrap">
            Sorotan Hari Ini
          </h3>
          <div className="bg-[#d32f2f] h-[3px] flex-1" />
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-[80px] h-[80px] shrink-0 border-2 border-black">
            <img
              src={smallPhotoSrc}
              alt="Foto Kecil"
              className="w-full h-full object-cover"
              style={{ filter: filterStyle }}
            />
          </div>
          <p className="font-garamond text-[11px] text-justify leading-relaxed flex-1">
            {article}
          </p>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div className="bg-black text-white text-center text-[10px] py-1.5 font-black uppercase tracking-widest mt-auto">
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperTabloid;
