import Link from 'next/link';

export default function HeroSection() {
  const date = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="bg-cream px-6 pt-12 pb-16 max-w-7xl mx-auto border-b-4 border-ink">
      {/* Masthead */}
      <div className="text-center mb-8 border-b-2 border-ink pb-6">
        <div className="flex justify-between items-end border-b border-ink pb-2 mb-4 font-ui text-xs md:text-sm uppercase tracking-widest">
          <span>Edisi Digital</span>
          <span>{date}</span>
          <span>Gratis</span>
        </div>
        <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase mb-4">
          Warta Rupa
        </h1>
        <p className="font-body italic text-xl md:text-2xl max-w-2xl mx-auto">
          &ldquo;Merangkai Kenangan dalam Lembaran Berita&rdquo;
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 lg:border-r-2 border-ink lg:pr-8">
          <h2 className="font-display font-black text-5xl md:text-6xl leading-[1.1] mb-6">
            REVOLUSI PHOTOBOOTH: KINI HADIR DI BROWSER ANDA
          </h2>
          <div className="columns-1 md:columns-2 gap-8 font-body text-lg leading-relaxed text-justify mb-8">
            <p className="mb-4">
              <span className="text-5xl font-display font-black float-left mr-3 leading-none mt-1">S</span>ebuah inovasi terbaru dalam dunia fotografi instan telah diluncurkan. Warta Rupa menghadirkan pengalaman photobooth autentik langsung ke perangkat Anda tanpa perlu mengunduh aplikasi apa pun. 
            </p>
            <p className="mb-4">
              Sistem ini memadukan estetika koran klasik dan gaya photostrip analog dengan teknologi masa kini. Menggunakan kamera webcam standar, siapa saja kini dapat mengabadikan momen berharga mereka dengan gaya redaksional yang elegan.
            </p>
            <p>
              Dilengkapi dengan belasan template unik dan kemampuan ekspor ke format digital modern seperti PNG, GIF animasi, dan Video Boomerang, Warta Rupa siap menjadi pelengkap di setiap acara penting Anda.
            </p>
          </div>
          
          <Link href="/booth" className="inline-block px-8 py-4 bg-ink text-cream font-ui font-black text-xl uppercase tracking-widest hover-paper">
            Mulai Sesi Foto →
          </Link>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 mt-8 lg:mt-0">
          <div className="border-2 border-ink p-5 bg-paper shadow-hard-sm hover-paper">
            <h3 className="font-display font-black text-2xl uppercase border-b-2 border-ink pb-2 mb-4">Sorotan Utama</h3>
            <ul className="font-body text-lg space-y-4">
              <li className="flex gap-3"><strong className="text-xl">13</strong> <span className="leading-tight">Template Editorial & Photostrip Eksklusif</span></li>
              <li className="flex gap-3"><strong className="text-xl">4</strong> <span className="leading-tight">Filter Analog Real-time</span></li>
              <li className="flex gap-3"><strong className="text-xl">∞</strong> <span className="leading-tight">Export GIF & Video Tanpa Batas</span></li>
              <li className="flex gap-3"><strong className="text-xl">0</strong> <span className="leading-tight">Data Disimpan di Server (Privasi 100%)</span></li>
            </ul>
          </div>
          <div className="aspect-[4/3] border-2 border-ink bg-ink text-cream p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover-paper">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative z-10">
              <h4 className="font-display font-black text-3xl mb-3">Ruang Iklan</h4>
              <p className="font-ui text-sm opacity-90 max-w-[200px] mx-auto">Tempat ini bisa menjadi foto Anda. Coba kamera kami sekarang.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
