"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { getRandomHeadline, getRandomArticle, headlines, articleSentences } from '../../../data/newspaperContent';
import { getFormattedDate, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

const CHAR_FONTS = ['"Playfair Display", serif', '"Courier New", monospace', '"EB Garamond", serif', '"Georgia", serif'];
const CHAR_SIZES   = ['1.1rem', '1.3rem', '0.95rem', '1.25rem', '1rem'];
const CHAR_ROTATES = [-8, -6, -4, -2, 0, 1, 3, 5, 7, -3, 6, -7, 2];
const CHAR_WEIGHTS = ['400', '700', '900'];
const WASHI_TAPES = [
  { color: 'rgba(255, 200, 150, 0.55)', rotate: '-35deg', top: '-10px', left: '20px',  width: '70px', height: '20px' },
  { color: 'rgba(180, 220, 255, 0.55)', rotate: '8deg',   top: '-8px',  right: '30px', width: '55px', height: '18px' },
  { color: 'rgba(200, 255, 200, 0.55)', rotate: '-6deg',  bottom: '-8px', left: '40px', width: '65px', height: '18px' },
];

const stableRand = (index, mod) => (index * 2654435761 + 17) % mod;

// Nilai awal deterministik (sama di server & client) supaya tidak terjadi
// hydration mismatch — pemilihan acak sesungguhnya baru terjadi di client
// lewat useEffect di bawah, setelah hydration selesai.
const DEFAULT_HEADLINE = headlines[0];
const DEFAULT_ARTICLE = [...articleSentences, ...articleSentences, ...articleSentences].join(' ');

const NewspaperZine = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const [headline, setHeadline] = useState(() => DEFAULT_HEADLINE.split(' ').slice(0, 5).join(' '));
  const [article, setArticle] = useState(DEFAULT_ARTICLE);

  useEffect(() => {
    setHeadline(getRandomHeadline().split(' ').slice(0, 5).join(' '));
    setArticle(getRandomArticle());
  }, []);

  const today = getFormattedDate();

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

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

  const noiseBg = {
    backgroundColor: '#f9f6f0',
    backgroundImage: 'repeating-radial-gradient(circle at 10% 20%, rgba(0,0,0,0.018) 0, rgba(0,0,0,0.018) 1px, transparent 1px, transparent 100%)',
  };

  return (
    <div
      className="text-black w-[480px] h-[640px] mx-auto font-sans flex flex-col shadow-none box-border overflow-hidden relative"
      style={{ ...noiseBg, border: '2px solid #555', padding: '12px' }}
    >

      {/* ── HEADER STRIP ─────────────────────────────────── */}
      <div
        className="flex justify-between items-center px-2 py-1 text-[10px] uppercase tracking-[0.2em] font-black shrink-0 mb-3"
        style={{ borderBottom: '2px dashed #555', fontFamily: '"Courier New", monospace' }}
      >
        <span>★ ZINE ISSUE ★</span>
        <span>{today}</span>
      </div>

      {/* ── MASTHEAD ─────────────────────────────────────── */}
      <div className="shrink-0 mb-4 px-2 flex justify-between items-end border-b-2 border-black pb-2">
        <h1 className="font-playfair text-[3.5rem] font-black leading-none tracking-tighter">
          Warta Rupa
        </h1>
        <p className="text-[9px] italic text-[#666]" style={{ fontFamily: '"Courier New", monospace' }}>
          cut here &rarr;
        </p>
      </div>

      {/* ── CONTENT FLEX ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden px-2 gap-4">
        
        {/* Headline Ransom Note */}
        <div className="flex flex-wrap justify-center items-end gap-x-[1px] gap-y-[4px] shrink-0">
          {charStyles.map((s, i) =>
            s.char === ' '
              ? <span key={i} className="inline-block w-[0.3rem]" />
              : (
                <span
                  key={i}
                  className="inline-block leading-none px-[2px] py-[1px] bg-white"
                  style={{
                    fontFamily: s.font, fontSize: s.size, fontWeight: s.weight,
                    transform: `rotate(${s.rotate}deg)`, boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {s.char}
                </span>
              )
          )}
        </div>

        {/* Foto Besar Miring */}
        <div className="relative shrink-0 mx-6 mt-2 mb-2">
          {WASHI_TAPES.map((tape, i) => (
            <div
              key={i} className="absolute z-20 pointer-events-none"
              style={{
                background: tape.color, transform: `rotate(${tape.rotate})`,
                top: tape.top ?? 'auto', bottom: tape.bottom ?? 'auto',
                left: tape.left ?? 'auto', right: tape.right ?? 'auto',
                width: tape.width, height: tape.height, borderRadius: '2px',
              }}
            />
          ))}
          <div className="relative bg-white p-1 border-2 border-[#333] shadow-[3px_3px_0_rgba(0,0,0,0.25)]" style={{ transform: 'rotate(-1.5deg)' }}>
            <LivePhoto src={mainPhotoSrc} alt="Foto Utama" className="w-full h-[220px] object-cover block" style={{ filter: filterStyle }} />
          </div>
        </div>

        {/* Artikel + Foto Kecil */}
        <div className="flex flex-1 gap-4 overflow-hidden px-1 items-start">
          <div className="w-[100px] shrink-0 relative bg-white p-1 border border-[#555] shadow-[2px_2px_0_rgba(0,0,0,0.2)]" style={{ transform: 'rotate(2deg)' }}>
            <LivePhoto src={smallPhotoSrc} alt="Foto Kecil" className="w-full h-[100px] object-cover block" style={{ filter: filterStyle }} />
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <span className="text-[10px] font-black uppercase tracking-widest mb-1 border-b border-black inline-block w-fit" style={{ fontFamily: '"Courier New", monospace' }}>
              [ sorotan hari ini ]
            </span>
            <p className="text-[11px] text-justify leading-snug flex-1 text-black" style={{ fontFamily: '"Courier New", monospace' }}>
              {article.split(' ').slice(0, 40).join(' ')}...
            </p>
          </div>
        </div>

      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div className="text-center text-[9px] pt-1.5 font-black uppercase tracking-widest shrink-0 mt-2" style={{ fontFamily: '"Courier New", monospace', borderTop: '2px dashed #555', color: '#555' }}>
        @warta.rupa ✂ cut here ✂
      </div>

    </div>
  );
};

export default NewspaperZine;



