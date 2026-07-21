export default function HowItWorksSection() {
  const steps = [
    { n: '1', title: 'Pilih Cetakan', desc: 'Tersedia 13 variasi layout eksklusif. Dari halaman depan koran hingga pita foto klasik.' },
    { n: '2', title: 'Siapkan Gaya', desc: 'Kamera terhubung seketika di peramban Anda. Manfaatkan fitur hitung mundur dan pratinjau.' },
    { n: '3', title: 'Sentuhan Akhir', desc: 'Aplikasikan filter ruang gelap: Monokrom, Sepia, atau Vintage klasik untuk nuansa pudar.' },
    { n: '4', title: 'Bawa Pulang', desc: 'Simpan ke perangkat Anda dalam format gambar statis (PNG) maupun gerak (GIF/Video).' },
  ];

  return (
    <section id="how-it-works" className="bg-paper px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
      <div className="border-2 border-ink p-1">
        <div className="border border-ink p-8 bg-paper">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase border-b-2 border-ink inline-block pb-2 mb-4">
              Panduan Penggunaan
            </h2>
            <p className="font-body text-xl max-w-2xl mx-auto italic">
              Empat langkah sederhana untuk mengabadikan potret diri Anda ke dalam sejarah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.n} className="relative">
                <div className="text-6xl font-display font-black text-ink opacity-20 mb-2 leading-none">
                  0{step.n}
                </div>
                <h3 className="font-display font-bold text-2xl uppercase mb-3 border-b border-ink pb-2">
                  {step.title}
                </h3>
                <p className="font-body text-lg text-justify leading-relaxed">
                  {step.desc}
                </p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-2xl opacity-50">
                    +
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
