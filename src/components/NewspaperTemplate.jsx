import React, { useMemo } from 'react';
import { getRandomHeadline, getRandomArticle } from '../data/newspaperContent';

const NewspaperTemplate = ({ bigPhoto, smallPhoto, city = "Surakarta" }) => {
  // Gunakan useMemo agar judul dan artikel tidak berubah-ubah saat re-render
  const headline = useMemo(() => getRandomHeadline(), []);
  const article = useMemo(() => getRandomArticle(), []);
  
  // Format tanggal hari ini
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Pastikan kita punya fallback image jika props kosong
  const mainPhotoSrc = bigPhoto || 'https://via.placeholder.com/400x300?text=Foto+Besar';
  const smallPhotoSrc = smallPhoto || 'https://via.placeholder.com/150?text=Foto+Kecil';

  return (
    <div id="newspaper-template" className="bg-[#f4ecd8] border-2 border-black p-4 text-black max-w-[380px] w-full mx-auto font-sans flex flex-col shadow-none">
      
      {/* 1. Header baris kecil */}
      <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-bold border-b-4 border-black pb-1 mb-3">
        <span>Breaking News</span>
        <span>Special Issue</span>
      </div>
      
      {/* 2 & 3. Brand & Tagline */}
      <div className="text-center mb-3">
        <h1 className="font-playfair text-5xl font-bold leading-none mb-1 tracking-tight">
          Warta Rupa
        </h1>
        <p className="font-garamond italic text-[13px] text-gray-800">
          capture the moment, make the news
        </p>
      </div>
      
      {/* 4. Baris info (Kota & Tanggal) */}
      <div className="flex justify-between items-center text-[11px] font-bold uppercase border-y border-black py-1.5 mb-4">
        <span>{city}</span>
        <span>{today}</span>
      </div>
      
      {/* 5. Judul Besar Random */}
      <h2 className="font-playfair font-black text-3xl uppercase text-center leading-[1.1] mb-4">
        {headline}
      </h2>
      
      {/* 6. Garis Pembatas Tipis */}
      <div className="border-t border-black mb-3"></div>
      
      {/* 7. Foto Besar */}
      <div className="mb-1 border border-black p-0.5">
        <img 
          src={mainPhotoSrc} 
          alt="Foto Utama" 
          className="w-full aspect-[4/3] object-cover grayscale sepia-[0.2]" 
        />
      </div>
      
      {/* 8. Baris kecil di bawah foto */}
      <div className="flex justify-between items-center text-[10px] uppercase text-gray-700 mb-5 font-bold">
        <span>Candid moment</span>
        <span>Vol. 01</span>
      </div>
      
      {/* 9. Sub-headline */}
      <h3 className="text-xs uppercase font-bold mb-2 tracking-wide">
        Sorotan Hari Ini
      </h3>
      
      {/* 10. Baris Flex: Foto Kecil & Paragraf Artikel */}
      <div className="flex gap-3 mb-6 items-start">
        <div className="w-[80px] h-[80px] shrink-0 border border-black p-0.5">
          <img 
            src={smallPhotoSrc} 
            alt="Foto Kecil" 
            className="w-full h-full object-cover grayscale sepia-[0.2]" 
          />
        </div>
        <div className="font-garamond text-[11px] text-justify leading-relaxed flex-1">
          {article}
        </div>
      </div>
      
      {/* 11. Footer Kecil */}
      <div className="text-center text-[10px] text-gray-500 mt-auto pt-2 border-t border-gray-300">
        @warta.rupa
      </div>

    </div>
  );
};

export default NewspaperTemplate;
