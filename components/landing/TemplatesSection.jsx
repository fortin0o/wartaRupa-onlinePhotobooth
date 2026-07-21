export default function TemplatesSection() {
  const templates = [
    { id: 'vintage', name: 'Vintage Classic', type: 'Koran', desc: 'Tata letak halaman depan tradisional dengan dua kolom berita.' },
    { id: 'tabloid', name: 'Tabloid Gosip', type: 'Koran', desc: 'Cetak tebal, stempel merah dramatis untuk berita sensasional.' },
    { id: 'classic', name: 'Classic Strip', type: 'Pita Foto', desc: 'Tiga bingkai vertikal minimalis berlatar putih bersih.' },
    { id: 'filmreel', name: 'Roll Film', type: 'Pita Foto', desc: 'Menyerupai potongan seluloid film analog klasik.' },
  ];

  return (
    <section id="templates" className="px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
      <div className="text-center mb-12">
        <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
          Katalog Cetakan
        </h2>
        <div className="rule-double w-64 mx-auto mb-4"></div>
        <p className="font-body text-xl max-w-2xl mx-auto">
          Tersedia 13 desain siap pakai. Pilih dari koleksi kami yang terus bertambah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map(t => (
          <div key={t.id} className="group border-2 border-ink bg-cream p-4 hover:bg-paper hover:shadow-[6px_6px_0_0_#111] transition-all duration-300 cursor-pointer">
            <div className="aspect-[3/4] border-2 border-ink bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-ink opacity-5 group-hover:opacity-0 transition-opacity"></div>
              <span className="font-ui font-bold text-xs uppercase tracking-widest bg-ink text-cream px-3 py-1 z-10">Pratinjau</span>
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-display font-bold text-xl leading-tight pr-2">{t.name}</h3>
              <span className="font-ui text-[10px] font-bold uppercase tracking-wider border border-ink px-1.5 py-0.5 whitespace-nowrap">{t.type}</span>
            </div>
            <p className="font-body text-md leading-snug opacity-90">{t.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="font-ui text-sm font-bold uppercase tracking-widest opacity-60">
          ...Dan 9 Cetakan Ekstra Lainnya di Studio Kamera
        </p>
      </div>
    </section>
  );
}
