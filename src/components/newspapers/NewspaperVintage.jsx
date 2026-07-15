import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../../data/newspaperContent';

const NewspaperVintage = ({ bigPhoto, smallPhoto, filterStyle = "none" }) => {
  const headline = useMemo(() => getRandomHeadline().split(' ').slice(0, 5).join(' '), []); // keep it short for this layout
  const article  = useMemo(() => getRandomArticle(), []);
  
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).toUpperCase();

  const mainPhotoSrc  = bigPhoto   || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

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
          <h3 className="font-playfair font-bold text-[1rem] uppercase leading-tight tracking-tight mb-2">
            {headline}
          </h3>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-3">
            {article.split(' ').slice(0, 35).join(' ')}...
          </p>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-3">
            {article.split(' ').slice(35, 65).join(' ')}...
          </p>
          
          {/* Quote / Small Photo Box */}
          <div className="mt-auto border-2 border-[#1a1a1a] p-2 flex flex-col items-center justify-center">
            <img 
              src={smallPhotoSrc} 
              alt="Foto Kecil" 
              className="w-full h-[80px] object-cover mb-2" 
              style={{ filter: filterStyle, filter: 'grayscale(1) contrast(1.1)' }}
            />
            <span className="font-playfair font-bold text-[9px] uppercase text-center leading-tight">
              "Candid moments captured in perfect unity."
            </span>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex-[1.2] flex flex-col">
          <div className="border border-[#1a1a1a] p-1 mb-3">
            <img 
              src={mainPhotoSrc} 
              alt="Foto Utama" 
              className="w-full aspect-[4/3] object-cover" 
              style={{ filter: filterStyle }}
            />
          </div>
          <p className="font-garamond text-[10px] text-justify leading-snug mb-2">
            {article.split(' ').slice(65, 100).join(' ')}...
          </p>
          <p className="font-garamond text-[10px] text-justify leading-snug mt-auto">
            {article.split(' ').slice(100, 125).join(' ')}...
          </p>
        </div>
        
      </div>

    </div>
  );
};

export default NewspaperVintage;
