export default function FeaturesSection() {
  const features = [
    { title: 'Ekspor Gambar Gerak', desc: 'Cetak momen dalam format GIF animasi berulang atau Video Boomerang yang interaktif.' },
    { title: 'Kamar Gelap Instan', desc: 'Efek warna pudar, sepia, dan monokrom diaplikasikan seketika tanpa waktu tunggu.' },
    { title: 'Mesin Klien Sepenuhnya', desc: 'Privasi absolut. Tidak ada satupun foto Anda yang dikirim ke server kami.' },
  ];

  return (
    <section id="features" className="px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-6 leading-tight">
            Fitur Spesial<br />Edisi Ini
          </h2>
          <div className="rule-double mb-8"></div>
          <p className="font-body text-xl italic mb-8">
            Berita baik: Warta Rupa lebih dari sekadar cetakan statis.
          </p>
          
          <div className="space-y-8">
            {features.map(f => (
              <div key={f.title} className="border-l-4 border-ink pl-6 py-1">
                <h3 className="font-display font-bold text-2xl uppercase mb-2">{f.title}</h3>
                <p className="font-body text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7">
          <div className="border-4 border-ink p-2 h-full min-h-[400px]">
            <div className="w-full h-full border-2 border-ink bg-paper flex items-center justify-center relative overflow-hidden group">
              {/* Halftone pattern background */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #111 2px, transparent 2.5px)', backgroundSize: '12px 12px' }}></div>
              <div className="bg-cream border-2 border-ink px-8 py-6 text-center z-10 shadow-[8px_8px_0_0_#111] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                <h4 className="font-display font-black text-3xl uppercase mb-2">Area Demonstrasi</h4>
                <p className="font-ui text-sm font-bold tracking-widest uppercase">Sedang Dibangun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
