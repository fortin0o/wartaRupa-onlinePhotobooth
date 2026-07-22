"use client";
import React, { useState, useEffect } from 'react';
import { getRandomHeadline, getRandomArticle, headlines, articleSentences } from '../../../data/newspaperContent';
import { getFormattedDate, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/templateUtils';

// Nilai awal deterministik (sama di server & client) supaya tidak terjadi
// hydration mismatch — pemilihan acak sesungguhnya baru terjadi di client
// lewat useEffect di bawah, setelah hydration selesai.
const DEFAULT_HEADLINE = headlines[0];
const DEFAULT_ARTICLE = [...articleSentences, ...articleSentences, ...articleSentences].join(' ');

const NewspaperEditorial = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const [headline, setHeadline] = useState(() => DEFAULT_HEADLINE.split(' ').slice(0, 8).join(' '));
  const [article, setArticle] = useState(DEFAULT_ARTICLE);

  useEffect(() => {
    setHeadline(getRandomHeadline().split(' ').slice(0, 8).join(' '));
    setArticle(getRandomArticle());
  }, []);

  const today = getFormattedDate('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

  return (
    <div
      className="bg-white text-black w-[480px] h-[640px] mx-auto flex flex-col shadow-none box-border overflow-hidden"
      style={{ border: '1px solid #ddd' }}
    >

      {/* ── TOP META BAR ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-5 py-2 text-[9px] tracking-[0.2em] uppercase whitespace-nowrap shrink-0"
        style={{ fontFamily: '"Archivo", sans-serif', borderBottom: '1px solid #ddd', color: '#999' }}
      >
        <span>Warta Rupa Studio</span>
        <span>{today}</span>
        <span>Vol. 01</span>
      </div>

      {/* ── MASTHEAD & HEADLINE ──────────────────────────── */}
      <div className="flex-1 px-5 pt-6 flex flex-col justify-center">
        <h1
          className="text-[4rem] leading-[0.9] tracking-[-0.04em] text-black font-archivo"
          style={{ fontWeight: 600 }}
        >
          Warta<br />Rupa
        </h1>
        <p
          className="mt-2 mb-6 text-[11px] text-[#aaa] tracking-[0.18em] uppercase font-archivo"
          style={{ fontWeight: 400 }}
        >
          capture the moment, make the news
        </p>
        
        <h2
          className="font-archivo text-[1.5rem] leading-[1.1] text-black"
          style={{ fontWeight: 600, letterSpacing: '-0.025em' }}
        >
          {headline}
        </h2>
      </div>

      {/* ── FOTO BESAR — full bleed, nempel ke tepi ──────── */}
      <div className="relative w-full h-[300px] shrink-0 border-y border-[#ddd]">
        <img
          src={mainPhotoSrc}
          alt="Foto Utama"
          className="w-full h-full object-cover block"
          style={{ filter: filterStyle }}
        />

        {/* ── FOTO KECIL — mengambang ── */}
        <div
          className="absolute -bottom-6 right-6"
          style={{ width: '80px', height: '80px', border: '3px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          <img
            src={smallPhotoSrc}
            alt="Foto Kecil"
            className="w-full h-full object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>
      </div>

      {/* ── FOOTER ARTIKEL ───────────────────────────────── */}
      <div className="px-5 pt-8 pb-3 shrink-0 flex items-end justify-between">
        <div className="flex-1 pr-12">
          <div
            className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1 font-archivo"
            style={{ fontWeight: 500 }}
          >
            Sorotan Hari Ini
          </div>
          <p className="font-garamond text-[12px] text-gray-700 leading-snug text-justify">
            {article.split(' ').slice(0, 25).join(' ')}...
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1 text-[8px] text-[#bbb] tracking-[0.15em] uppercase font-archivo">
          <span>@warta.rupa</span>
          <span>Editorial Ed.</span>
        </div>
      </div>

    </div>
  );
};

export default NewspaperEditorial;


