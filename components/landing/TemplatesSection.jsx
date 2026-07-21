import { newspaperThemes } from '@/data/newspaperThemes';
import { stripThemes } from '@/data/stripThemes';

export default function TemplatesSection() {
  const featured = [
    { ...newspaperThemes.find((t) => t.id === 'vintage'), type: 'Koran' },
    { ...newspaperThemes.find((t) => t.id === 'tabloid'), type: 'Koran' },
    { ...stripThemes.find((t) => t.id === 'classic'), type: 'Pita Foto' },
    { ...stripThemes.find((t) => t.id === 'filmreel'), type: 'Pita Foto' },
  ];

  return (
    <section id="templates" className="bg-cream px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
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
        {featured.map((t) => {
          const ThemeComponent = t.component;
          return (
            <div key={t.id} className="group border-2 border-ink bg-cream p-4 hover:bg-paper hover:shadow-[6px_6px_0_0_#111] transition-all duration-300">
              <div className="h-72 border-2 border-ink bg-paper mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="pointer-events-none" style={{ transform: 'scale(0.38)' }}>
                  <ThemeComponent />
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display font-bold text-xl leading-tight pr-2">{t.name}</h3>
                <span className="font-ui text-[10px] font-bold uppercase tracking-wider border border-ink px-1.5 py-0.5 whitespace-nowrap">{t.type}</span>
              </div>
              <p className="font-body text-md leading-snug opacity-90">{t.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <p className="font-ui text-sm font-bold uppercase tracking-widest opacity-60">
          ...Dan 9 Cetakan Ekstra Lainnya di Studio Kamera
        </p>
      </div>
    </section>
  );
}
