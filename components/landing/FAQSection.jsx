'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'Apakah foto saya disimpan di server?',
    a: 'Tidak. Seluruh proses — pengambilan, pengeditan template, hingga ekspor — berjalan langsung di browser Anda. Tidak ada foto atau video yang diunggah ke server kami.',
  },
  {
    q: 'Apakah saya perlu membayar untuk menggunakan Warta Rupa?',
    a: 'Tidak untuk penggunaan personal. Edisi Publik gratis selamanya dengan akses ke seluruh 13 tata letak. Edisi Studio & Sindikat adalah opsi tambahan untuk kebutuhan acara berskala besar.',
  },
  {
    q: 'Perangkat dan browser apa saja yang didukung?',
    a: 'Browser modern (Chrome, Edge, Firefox, Safari terbaru) di desktop maupun mobile dengan akses kamera. Fitur video boomerang membutuhkan dukungan perekaman video bawaan browser — jika tidak tersedia, foto dan unduhan PNG tetap berjalan normal.',
  },
  {
    q: 'Bagaimana cara kerja fitur Video Boomerang?',
    a: 'Saat hitung mundur berlangsung, kami merekam klip singkat sekitar 2 detik untuk tiap foto. Setelah sesi selesai, klip-klip tersebut digabungkan menjadi satu video singkat yang diputar maju lalu mundur — seluruhnya diproses langsung di perangkat Anda.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-paper px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
      <div className="text-center mb-12">
        <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
          Tanya Jawab
        </h2>
        <div className="rule-double w-64 mx-auto mb-4"></div>
        <p className="font-body text-xl max-w-2xl mx-auto">
          Pertanyaan yang paling sering diajukan seputar Warta Rupa.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="border-2 border-ink bg-cream">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex justify-between items-center gap-4 px-6 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display font-bold text-lg md:text-xl">{item.q}</span>
                <span className="font-ui text-2xl leading-none shrink-0">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 border-t-2 border-ink pt-4">
                  <p className="font-body text-lg leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
