"use client";
import React, { useState, useEffect } from 'react';
import { getRandomHeadline, getRandomArticle, headlines, articleSentences } from '../../../data/newspaperContent';
import { getFormattedDate, buildCompositeFilter, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/templateUtils';

// Nilai awal deterministik (sama di server & client) supaya tidak terjadi
// hydration mismatch — pemilihan acak sesungguhnya baru terjadi di client
// lewat useEffect di bawah, setelah hydration selesai.
const DEFAULT_HEADLINE = headlines[0];
const DEFAULT_ARTICLE = [...articleSentences, ...articleSentences, ...articleSentences].join(' ');

const NewspaperClassicBW = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const [headline, setHeadline] = useState(() => DEFAULT_HEADLINE.split(' ').slice(0, 7).join(' '));
  const [article, setArticle] = useState(DEFAULT_ARTICLE);

  useEffect(() => {
    setHeadline(getRandomHeadline().split(' ').slice(0, 7).join(' '));
    setArticle(getRandomArticle());
  }, []);
  
  const today = getFormattedDate();

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

  // Gabungkan grayscale dengan filter user
  const bwFilter = buildCompositeFilter('grayscale(1) contrast(1.1)', filterStyle);

  return (
    <div
      className="bg-white text-black w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border relative overflow-hidden"
      style={{ border: '4px solid #111', padding: '16px' }}
    >
      
      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center shrink-0">
        <h1 className="font-playfair text-6xl font-bold uppercase tracking-tighter mb-1" style={{ letterSpacing: '-0.05em' }}>
          Warta Rupa
        </h1>
        <div className="w-full h-[3px] bg-[#111] mb-1" />
        
        <div className="flex justify-between items-center w-full text-[9px] uppercase font-bold tracking-widest px-1">
          <span>Edisi Klasik</span>
          <span>{today}</span>
          <span>Vol. 01</span>
        </div>
        
        <div className="w-full h-[1px] bg-[#111] mt-1 mb-4" />
      </div>

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <div className="shrink-0 mb-4 px-2">
        <h2 className="font-playfair font-black text-3xl uppercase text-center leading-[1] tracking-tight line-clamp-2">
          {headline}
        </h2>
      </div>

      {/* ── CONTENT GRID ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden gap-4">
        
        <div className="w-full border-2 border-[#111] p-1 shrink-0">
          <img
            src={mainPhotoSrc}
            alt="Foto Utama"
            className="w-full h-[220px] object-cover"
            style={{ filter: bwFilter }}
          />
        </div>

        <div className="flex gap-4 flex-1 overflow-hidden border-t-2 border-[#111] pt-3">
          {/* Kolom Kiri - Teks */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ columnCount: 1 }}>
            <h3 className="font-bold text-[10px] uppercase mb-1 border-b border-[#111] pb-1">
              Sorotan Hari Ini
            </h3>
            <p className="font-garamond text-[11px] text-justify leading-snug line-clamp-6">
              {article.split(' ').slice(0, 45).join(' ')}...
            </p>
          </div>
          
          {/* Kolom Kanan - Foto Kecil & Teks */}
          <div className="w-[140px] flex flex-col shrink-0">
            <div className="border border-[#111] p-0.5 mb-2">
              <img
                src={smallPhotoSrc}
                alt="Foto Kecil"
                className="w-full h-[120px] object-cover"
                style={{ filter: bwFilter }}
              />
            </div>
            <p className="font-garamond text-[11px] text-justify leading-snug line-clamp-4">
              {article.split(' ').slice(45, 65).join(' ')}...
            </p>
          </div>
        </div>

      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div className="shrink-0 mt-3 pt-2 border-t-2 border-[#111] text-center text-[10px] uppercase font-bold tracking-widest">
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperClassicBW;


