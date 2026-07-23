"use client";
import React, { useState, useEffect } from 'react';
import { getRandomHeadline, getRandomArticle, headlines, articleSentences } from '../../../data/newspaperContent';
import { getFormattedDate, buildCompositeFilter, PLACEHOLDER_BIG, PLACEHOLDER_SMALL } from '../../../utils/templateUtils';
import { LivePhoto } from '@/components/booth/LivePhoto';

// Nilai awal deterministik (sama di server & client) supaya tidak terjadi
// hydration mismatch — pemilihan acak sesungguhnya baru terjadi di client
// lewat useEffect di bawah, setelah hydration selesai.
const DEFAULT_HEADLINE = headlines[0];
const DEFAULT_ARTICLE = [...articleSentences, ...articleSentences, ...articleSentences].join(' ');

const NewspaperVintage = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const [headline, setHeadline] = useState(() => DEFAULT_HEADLINE.split(' ').slice(0, 5).join(' '));
  const [article, setArticle] = useState(DEFAULT_ARTICLE);

  useEffect(() => {
    setHeadline(getRandomHeadline().split(' ').slice(0, 5).join(' '));
    setArticle(getRandomArticle());
  }, []);

  // Gabungkan grayscale vintage dengan filter pilihan user (pola sama dengan NewspaperClassicBW)
  const vintageFilter = buildCompositeFilter('grayscale(1) contrast(1.1)', filterStyle);
  
  const today = getFormattedDate('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

  const mainPhotoSrc  = bigPhoto   || PLACEHOLDER_BIG;
  const smallPhotoSrc = smallPhoto || PLACEHOLDER_SMALL;

  return (
    <div 
      className="bg-[#f0ebe1] text-[#1a1a1a] mx-auto font-sans flex flex-col shadow-none box-border relative overflow-hidden"
      style={{ 
        width: '480px', 
        height: '640px', 
        padding: '24px 28px' 
      }}
    >
      
      {/* Top Header - THE SOCIETY */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-[3px] bg-[#1a1a1a] mb-[2px]"></div>
        <div className="w-full h-[1px] bg-[#1a1a1a] mb-2"></div>
        
        <h1 
          className="font-playfair font-black text-center uppercase tracking-tighter"
          style={{ fontSize: '4.5rem', lineHeight: '0.8', margin: '8px 0', transform: 'scaleY(1.3)' }}
        >
          Warta Rupa
        </h1>
        
        <div className="w-full h-[1px] bg-[#1a1a1a] mt-6 mb-[2px]"></div>
      </div>
      
      {/* Meta Bar */}
      <div className="flex justify-between items-center text-[9px] font-black tracking-widest uppercase py-1.5 w-full">
        <span>VOL. 19, NO.190</span>
        <span className="text-xl leading-none">✻</span>
        <span>WARTARUPA.COM</span>
        <span className="text-xl leading-none">✻</span>
        <span>{today}</span>
      </div>
      
      <div className="w-full h-[1px] bg-[#1a1a1a] mb-[2px]"></div>
      <div className="w-full h-[3px] bg-[#1a1a1a] mb-3"></div>
      
      {/* Breaking News */}
      <h2 className="font-playfair font-black text-[2.75rem] uppercase text-center leading-[1] tracking-tight mb-3">
        BREAKING NEWS
      </h2>
      
      <div className="w-full h-[2px] bg-[#1a1a1a] mb-4"></div>
      
      {/* 2 Column Layout */}
      <div className="flex gap-4 flex-1 overflow-hidden">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-playfair font-bold text-[1rem] uppercase leading-tight tracking-tight mb-2 line-clamp-3">
            {headline}
          </h3>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-2 line-clamp-4">
            {article.split(' ').slice(0, 20).join(' ')}...
          </p>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-2 line-clamp-5 overflow-hidden">
            {article.split(' ').slice(20, 45).join(' ')}...
          </p>
          
          {/* Quote / Small Photo Box */}
          <div className="mt-auto border-2 border-[#1a1a1a] p-2 flex flex-col items-center justify-center">
            <LivePhoto 
              src={smallPhotoSrc} 
              alt="Foto Kecil" 
              className="w-full h-[80px] object-cover mb-2" 
              style={{ filter: vintageFilter }}
            />
            <span className="font-playfair font-bold text-[9px] uppercase text-center leading-tight">
              &ldquo;Candid moments captured in perfect unity.&rdquo;
            </span>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex-[1.2] flex flex-col">
          <div className="border border-[#1a1a1a] p-1 mb-3">
            <LivePhoto 
              src={mainPhotoSrc} 
              alt="Foto Utama" 
              className="w-full aspect-[4/3] object-cover" 
              style={{ filter: vintageFilter }}
            />
          </div>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-2 line-clamp-4">
            {article.split(' ').slice(45, 65).join(' ')}...
          </p>
          <p className="font-garamond text-[10px] text-justify leading-snug mt-auto line-clamp-3">
            {article.split(' ').slice(65, 80).join(' ')}...
          </p>
        </div>
        
      </div>

    </div>
  );
};

export default NewspaperVintage;



