import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../data/newspaperContent';

const NewspaperTemplate = ({ bigPhoto, smallPhoto, filterStyle = "none", city = "Surakarta" }) => {
  const headline = useMemo(() => getRandomHeadline(), []);
  const article = useMemo(() => getRandomArticle(), []);
  
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const mainPhotoSrc = bigPhoto || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div id="newspaper-template" className="bg-[#f4ecd8] border-2 border-black p-4 text-black max-w-[380px] w-full mx-auto font-sans flex flex-col shadow-none box-border">
      
      <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-bold border-b-4 border-black pb-1 mb-3">
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>
      
      <div className="text-center mb-3">
        <h1 className="font-playfair text-5xl font-bold leading-none mb-1 tracking-tight">
          Warta Rupa
        </h1>
        <p className="font-garamond italic text-[13px] text-gray-800">
          capture the moment, make the news
        </p>
      </div>
      
      <div className="flex justify-between items-center text-[11px] font-bold uppercase border-y border-black py-1.5 mb-4">
        <span>{city}</span>
        <span>{today}</span>
      </div>
      
      <h2 className="font-playfair font-black text-3xl uppercase text-center leading-[1.1] mb-4">
        {headline}
      </h2>
      
      <div className="border-t border-black mb-3"></div>
      
      <div className="mb-1 border border-black p-0.5">
        <img 
          src={mainPhotoSrc} 
          alt="Foto Utama" 
          className="w-full aspect-[4/3] object-cover" 
          style={{ filter: filterStyle }}
        />
      </div>
      
      <div className="flex justify-between items-center text-[10px] uppercase text-gray-700 mb-5 font-bold">
        <span>Candid moment</span>
        <span>Vol. 01</span>
      </div>
      
      <h3 className="text-xs uppercase font-bold mb-2 tracking-wide">
        Sorotan Hari Ini
      </h3>
      
      <div className="flex gap-3 mb-6 items-start">
        <div className="w-[80px] h-[80px] shrink-0 border border-black p-0.5">
          <img 
            src={smallPhotoSrc} 
            alt="Foto Kecil" 
            className="w-full h-full object-cover" 
            style={{ filter: filterStyle }}
          />
        </div>
        <div className="font-garamond text-[11px] text-justify leading-relaxed flex-1">
          {article}
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-500 mt-auto pt-2 border-t border-gray-300">
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperTemplate;
