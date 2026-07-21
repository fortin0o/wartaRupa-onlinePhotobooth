"use client";
import React from 'react';
import { PLACEHOLDER_STRIP } from '../../../utils/photobooth/templateUtils';

// Blob border-radius yang berbeda untuk tiap foto
const blobShapes = [
  { borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%' },
  { borderRadius: '60% 40% 45% 55% / 40% 60% 50% 60%' },
  { borderRadius: '50% 50% 60% 40% / 60% 50% 40% 55%' },
];

// Warna aksen bergantian (coral & biru)
const accentColors = ['#e0604a', '#4a6fe0', '#e0604a'];

// Label washi tape statis
const washiLabels = ['✦ bestie', '♡ vibes', '✿ today'];
const washiRotations = ['-2deg', '3deg', '-3deg'];

// Komponen smiley face SVG minimalis
const SmileyFace = ({ cx, cy, r, color, style }) => (
  <svg
    viewBox="0 0 60 60"
    style={{
      position: 'absolute',
      width: `${r * 2}px`,
      height: `${r * 2}px`,
      ...style
    }}
    aria-hidden="true"
  >
    {/* Wajah */}
    <circle cx="30" cy="30" r="28" fill={color} opacity="0.85" />
    {/* Mata kiri */}
    <circle cx="21" cy="24" r="3" fill="white" />
    {/* Mata kanan */}
    <circle cx="39" cy="24" r="3" fill="white" />
    {/* Senyum */}
    <path
      d="M 19 36 Q 30 46 41 36"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const StripPlayfulBlob = ({ photos = [], filterStyle = "none" }) => {
  const placeholders = [PLACEHOLDER_STRIP, PLACEHOLDER_STRIP, PLACEHOLDER_STRIP];

  return (
    <div
      className="w-[260px] mx-auto flex flex-col font-sans box-border relative overflow-hidden shadow-none min-h-[720px] py-6 px-5"
      style={{ backgroundColor: '#faf3e0' }}
    >
      {/* Smiley Dekorasi 1 — sudut kiri atas */}
      <SmileyFace
        r={22}
        color="#f7c4ba"
        style={{ top: '8px', left: '4px', transform: 'rotate(-15deg)' }}
      />

      {/* Smiley Dekorasi 2 — sudut kanan bawah */}
      <SmileyFace
        r={18}
        color="#b4c8f7"
        style={{ bottom: '50px', right: '4px', transform: 'rotate(10deg)' }}
      />

      {/* Foto-foto */}
      <div className="flex flex-col gap-8 mt-10 z-10 relative">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex justify-center">
            {/* Blob Aksen Berwarna di belakang foto (offset sedikit) */}
            <div
              className="absolute inset-0"
              style={{
                ...blobShapes[i],
                backgroundColor: accentColors[i],
                transform: 'translate(6px, 6px)',
              }}
            />

            {/* Blob Foto */}
            <div
              className="relative overflow-hidden w-full"
              style={{
                ...blobShapes[i],
                aspectRatio: '1 / 1',
              }}
            >
              <img
                src={photos[i] || placeholders[i]}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: filterStyle }}
              />
            </div>

            {/* Washi Tape Label */}
            <div
              className="absolute bottom-2 right-4 z-20 px-2 py-0.5 text-[10px] font-bold tracking-widest text-gray-600"
              style={{
                backgroundColor: i % 2 === 0 ? '#fff9e6' : '#eef2ff',
                borderRadius: '3px',
                transform: `rotate(${washiRotations[i]})`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                fontFamily: 'serif',
              }}
            >
              {washiLabels[i]}
            </div>
          </div>
        ))}
      </div>

      {/* Teks bawah */}
      <div className="mt-8 text-center z-10 relative">
        <span
          className="font-playfair font-bold text-[13px] tracking-[0.2em] uppercase"
          style={{ color: '#b07050' }}
        >
          Warta Rupa ✦
        </span>
      </div>
    </div>
  );
};

export default StripPlayfulBlob;


