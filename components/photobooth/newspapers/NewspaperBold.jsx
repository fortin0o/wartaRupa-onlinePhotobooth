"use client";
import React, { useState, useEffect } from 'react';
import { getRandomHeadline, getRandomArticle, headlines, articleSentences } from '../../../data/newspaperContent';
import { getFormattedDate, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/templateUtils';

// Rotasi acak tapi konsisten per render
const ROTATE_OPTIONS = [-2, -1.5, -1, 0.5, 1, 1.5, 2];

// Nilai awal deterministik (sama di server & client) supaya tidak terjadi
// hydration mismatch — pemilihan acak sesungguhnya baru terjadi di client
// lewat useEffect di bawah, setelah hydration selesai.
const DEFAULT_HEADLINE = headlines[0];
const DEFAULT_ARTICLE = [...articleSentences, ...articleSentences, ...articleSentences].join(' ');

const NewspaperBold = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const [headline, setHeadline] = useState(() => DEFAULT_HEADLINE.split(' ').slice(0, 6).join(' '));
  const [article, setArticle] = useState(DEFAULT_ARTICLE);
  const [headlineRotate, setHeadlineRotate] = useState(ROTATE_OPTIONS[0]);

  useEffect(() => {
    setHeadline(getRandomHeadline().split(' ').slice(0, 6).join(' '));
    setArticle(getRandomArticle());
    setHeadlineRotate(ROTATE_OPTIONS[Math.floor(Math.random() * ROTATE_OPTIONS.length)]);
  }, []);

  const today = getFormattedDate();

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

  return (
    <div
      className="text-white w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden relative"
      style={{ background: '#0a0a0a', border: '6px solid #f5d020' }}
    >

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-black shrink-0"
        style={{ background: '#f5d020', borderBottom: '3px solid #0a0a0a' }}
      >
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div
        className="text-center px-4 py-4 shrink-0"
        style={{ borderBottom: '6px solid #f5d020' }}
      >
        <h1 className="font-playfair text-5xl font-black leading-none tracking-tight text-white">
          Warta <span style={{ color: '#f5d020' }}>Rupa</span>
        </h1>
      </div>

      {/* ── META BAR ─────────────────────────────────────── */}
      <div
        className="flex justify-between items-center text-[11px] font-black uppercase px-4 py-1.5 text-black shrink-0"
        style={{ background: '#f5d020', borderBottom: '3px solid #0a0a0a' }}
      >
        <span>Surakarta</span>
        <span>{today}</span>
        <span>Vol. 01</span>
      </div>

      {/* ── HEADLINE & CONTENT (FLEX) ────────────────────── */}
      <div className="flex-1 flex flex-col px-5 py-4 overflow-hidden gap-3">
        
        {/* Headline Stempel */}
        <div className="flex justify-center shrink-0 mb-1">
          <div style={{ transform: `rotate(${headlineRotate}deg)`, display: 'inline-block' }}>
            <h2
              className="font-playfair font-black uppercase text-center leading-[1.1]"
              style={{
                fontSize: '1.6rem',
                letterSpacing: '0.04em',
                color: '#f5d020',
                border: '3px solid white',
                padding: '6px 12px',
                background: '#0a0a0a',
                textShadow: '2px 2px 0 #000, -1px -1px 0 #333',
              }}
            >
              {headline}
            </h2>
          </div>
        </div>

        {/* Foto Besar */}
        <div className="w-full shrink-0 border-4 border-white">
          <img
            src={mainPhotoSrc}
            alt="Foto Utama"
            className="w-full h-[220px] object-cover block"
            style={{ filter: filterStyle }}
          />
        </div>

        {/* Artikel + Foto Kecil */}
        <div className="flex flex-1 gap-3 overflow-hidden mt-1">
          <div className="w-[100px] h-full flex flex-col shrink-0 gap-2">
            <div className="border-4 border-[#f5d020]">
              <img
                src={smallPhotoSrc}
                alt="Foto Kecil"
                className="w-full h-[100px] object-cover block"
                style={{ filter: filterStyle }}
              />
            </div>
            <span className="text-[9px] font-black uppercase text-[#f5d020] text-center leading-tight">
              Sorotan Hari Ini
            </span>
          </div>
          
          <p className="font-garamond text-[12px] text-justify leading-snug flex-1 text-white pr-1">
            {article.split(' ').slice(0, 50).join(' ')}...
          </p>
        </div>

      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div
        className="text-center text-[10px] py-1.5 font-black uppercase tracking-widest text-black shrink-0"
        style={{ background: '#f5d020', borderTop: '3px solid #0a0a0a' }}
      >
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperBold;


