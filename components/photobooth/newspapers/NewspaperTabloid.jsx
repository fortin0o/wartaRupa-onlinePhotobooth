"use client";
import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../../data/newspaperContent';
import { getFormattedDate, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/photobooth/templateUtils';

const NewspaperTabloid = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline().split(' ').slice(0, 6).join(' '), []);
  const article  = useMemo(() => getRandomArticle(), []);
  
  const today = getFormattedDate();

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

  return (
    <div className="bg-[#fcf8ed] text-black w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden relative border-4 border-black">

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div className="bg-[#d32f2f] flex justify-between items-center px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest shrink-0">
        <span>Edisi Terpanas</span>
        <span>{today}</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div className="text-center pt-3 pb-1 border-b-4 border-black shrink-0 relative bg-[#f5d020]">
        <h1 
          className="font-playfair text-6xl font-black leading-none tracking-tighter"
          style={{ textShadow: '2px 2px 0px #fff' }}
        >
          WARTA RUPA
        </h1>
        <p className="font-sans font-bold text-[10px] uppercase tracking-widest mt-1">
          Skandal Visual & Momen Eksklusif
        </p>
      </div>

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <div className="px-4 py-3 shrink-0 text-center">
        <h2 className="font-sans font-black text-[2rem] leading-[1.05] uppercase text-[#d32f2f] tracking-tight">
          {headline}!!
        </h2>
      </div>

      {/* ── MAIN CONTENT (FLEX) ──────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pb-4 overflow-hidden gap-3">
        
        {/* BIG PHOTO + STAMP */}
        <div className="relative border-4 border-black shrink-0">
          <img
            src={mainPhotoSrc}
            alt="Foto Utama"
            className="w-full h-[240px] object-cover"
            style={{ filter: filterStyle }}
          />
          {/* Stempel miring */}
          <div 
            className="absolute -bottom-3 -right-3 bg-[#d32f2f] text-white rounded-[50%] border-4 border-white flex items-center justify-center shadow-lg z-10"
            style={{ width: '80px', height: '50px', transform: 'rotate(-15deg)' }}
          >
            <span className="font-black text-[12px] tracking-wider">EKSKLUSIF</span>
          </div>
        </div>

        {/* 2 COLUMNS FOR TEXT & SMALL PHOTO */}
        <div className="flex gap-4 flex-1 overflow-hidden mt-1">
          <div className="flex-1 flex flex-col">
            <h3 className="font-black text-[12px] uppercase mb-1 text-[#d32f2f] border-b-2 border-black pb-1">
              Fakta Mengejutkan
            </h3>
            <p className="font-sans text-[11px] text-justify font-medium leading-snug">
              {article.split(' ').slice(0, 45).join(' ')}...
            </p>
          </div>
          
          <div className="w-[120px] flex flex-col shrink-0">
            <div className="border-2 border-black p-1 bg-white mb-2">
              <img
                src={smallPhotoSrc}
                alt="Foto Kecil"
                className="w-full h-[120px] object-cover"
                style={{ filter: filterStyle }}
              />
            </div>
            <p className="font-sans font-bold text-[9px] text-center uppercase leading-tight bg-black text-white py-1">
              Tertangkap Kamera!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewspaperTabloid;


