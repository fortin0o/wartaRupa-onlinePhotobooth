'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'Cara Kerja' },
  { href: '#templates', label: 'Katalog' },
  { href: '#features', label: 'Fitur Ekstra' },
  { href: '#faq', label: 'FAQ' },
  { href: '#pricing', label: 'Harga' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b-2 border-ink bg-cream sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-black text-xl uppercase tracking-tighter hover:text-accent" onClick={() => setIsOpen(false)}>
          Warta Rupa
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/booth" className="px-4 py-1.5 border-2 border-ink font-ui font-bold text-sm uppercase tracking-widest hover:bg-ink hover:text-cream transition-colors">
            Buka Kamera
          </Link>
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 border-2 border-ink shrink-0"
            aria-label="Buka menu navigasi"
            aria-expanded={isOpen}
          >
            <span className={`block w-5 h-0.5 bg-ink transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-ink transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-ink transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t-2 border-ink bg-cream px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
