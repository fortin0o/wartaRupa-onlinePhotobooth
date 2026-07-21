export default function PricingSection() {
  const plans = [
    {
      name: 'Edisi Publik',
      price: 'Gratis',
      period: 'Selamanya',
      desc: 'Sampel percobaan untuk penggunaan personal dan hiburan.',
      features: ['Akses 13 Tata Letak', 'Kamar Gelap Standar', 'Ekspor PNG & GIF', 'Kamera Peramban'],
      cta: 'Coba Sekarang',
      highlight: false
    },
    {
      name: 'Edisi Studio',
      price: 'Rp 99.000',
      period: '/ hajatan',
      desc: 'Langganan per acara untuk perayaan berskala menengah.',
      features: ['Semua Hak Edisi Publik', 'Akses Ruang Redaksi', 'Arsip Acara (7 Hari)', 'Cap Air Kustom', 'Ekspor Sinema'],
      cta: 'Beli Edisi Studio',
      highlight: true
    },
    {
      name: 'Edisi Sindikat',
      price: 'Hubungi Redaksi',
      period: 'Kustom',
      desc: 'Penerbitan label putih untuk acara berskala besar.',
      features: ['Semua Hak Edisi Studio', 'Dukungan Lensa DSLR', 'Layar Siaran Langsung', 'Desain Tata Letak Kustom', 'Arsip Permanen'],
      cta: 'Kirim Telegram',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="bg-cream px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
          Biaya Berlangganan
        </h2>
        <div className="rule-double w-64 mx-auto mb-4"></div>
        <p className="font-body text-xl max-w-2xl mx-auto italic">
          Pilih edisi yang sesuai dengan kebutuhan penerbitan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map(p => (
          <div key={p.name} className={`p-8 border-2 border-ink ${p.highlight ? 'bg-ink text-cream relative scale-105 shadow-[12px_12px_0_0_#d9381e]' : 'bg-paper shadow-[8px_8px_0_0_#111]'}`}>
            {p.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-cream text-[10px] font-ui font-bold uppercase px-4 py-1.5 tracking-widest border-2 border-ink">Pilihan Redaktur</div>}
            
            <h3 className="font-display font-black text-3xl uppercase mb-2 border-b-2 border-current pb-2">{p.name}</h3>
            <div className="mb-4 pt-2">
              <span className="font-display font-bold text-4xl">{p.price}</span>
              <span className="font-ui text-sm font-bold uppercase tracking-wider ml-2 opacity-80">{p.period}</span>
            </div>
            
            <p className="font-body text-lg italic mb-6 opacity-90 leading-tight min-h-[3rem]">{p.desc}</p>
            
            <div className="rule-single mb-6 border-current opacity-30"></div>
            
            <ul className="space-y-3 mb-10 min-h-[12rem]">
              {p.features.map(f => (
                <li key={f} className="flex items-start font-body text-lg">
                  <span className={`mr-3 ${p.highlight ? 'text-accent' : 'text-ink'}`}>●</span> {f}
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-4 font-ui font-black text-sm uppercase tracking-widest border-2 transition-all duration-200 ${p.highlight ? 'bg-cream text-ink border-cream hover:bg-transparent hover:text-cream' : 'bg-ink text-cream border-ink hover:bg-transparent hover:text-ink'}`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
