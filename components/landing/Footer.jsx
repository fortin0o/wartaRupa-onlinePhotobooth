import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cream pt-16 pb-8 px-6 border-t-[12px] border-ink">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="max-w-sm">
          <Link href='/' className='font-display font-black text-4xl tracking-tighter uppercase block mb-4'>
            Warta Rupa
          </Link>
          <p className="font-body text-xl italic mb-6">
            Pusat penerbitan kenangan visual seketika. Estetika masa lalu, teknologi masa kini.
          </p>
          <div className="rule-double w-24"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 font-ui">
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-lg uppercase border-b-2 border-ink pb-2">Navigasi</h4>
            <Link href="#features" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Fitur Spesial</Link>
            <Link href="#templates" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Katalog Cetakan</Link>
            <Link href="#pricing" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Biaya Berlangganan</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-black text-lg uppercase border-b-2 border-ink pb-2">Redaksi</h4>
            <Link href="/booth" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Buka Kamera</Link>
            <Link href="/dashboard" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Ruang Redaksi</Link>
            <Link href="/kontak" className="text-sm font-bold uppercase tracking-wider hover:text-accent">Kawat Berita (Kontak)</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-6 border-t-4 border-ink flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-ui font-bold uppercase tracking-widest">
        <p>HAK CIPTA &copy; {new Date().getFullYear()} KANTOR BERITA WARTA RUPA.</p>
        <div className="flex gap-6">
          <Link href="/syarat-ketentuan" className="hover:text-accent">Surat Perjanjian</Link>
          <Link href="/kebijakan-privasi" className="hover:text-accent">Tata Tertib</Link>
        </div>
      </div>
    </footer>
  );
}
