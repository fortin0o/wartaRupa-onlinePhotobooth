import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b-2 border-ink bg-cream sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-black text-xl uppercase tracking-tighter hover:text-accent">
          Warta Rupa
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#how-it-works" className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent">Cara Kerja</Link>
          <Link href="#templates" className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent">Katalog</Link>
          <Link href="#features" className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent">Fitur Ekstra</Link>
          <Link href="#pricing" className="text-sm font-ui font-bold uppercase tracking-wider hover:text-accent">Harga</Link>
        </div>
        <Link href="/booth" className="px-4 py-1.5 border-2 border-ink font-ui font-bold text-sm uppercase tracking-widest hover:bg-ink hover:text-cream transition-colors">
          Buka Kamera
        </Link>
      </div>
    </nav>
  );
}
