import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';

export default function KontakPage() {
  return (
    <div className="bg-cream min-h-screen grain flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="border-4 border-ink p-2 hover-paper">
          <div className="border-2 border-ink bg-paper p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="font-display font-black text-5xl md:text-6xl uppercase border-b-4 border-ink inline-block pb-4 mb-4">
                Kawat Berita
              </h1>
              <p className="font-body text-xl italic mt-2">
                Hubungi dewan redaksi kami melalui telegram singkat.
              </p>
            </div>
            
            <form className="space-y-6 font-ui border-t-2 border-ink pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-black uppercase tracking-wider text-sm">Nama Lengkap</label>
                  <input type="text" id="name" className="border-2 border-ink bg-cream p-3 focus:outline-none focus:bg-white hover-paper" placeholder="Tulis nama Anda..." />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-black uppercase tracking-wider text-sm">Alamat Surel (Email)</label>
                  <input type="email" id="email" className="border-2 border-ink bg-cream p-3 focus:outline-none focus:bg-white hover-paper" placeholder="Tulis surel Anda..." />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-black uppercase tracking-wider text-sm">Isi Pesan</label>
                <textarea id="message" rows="5" className="border-2 border-ink bg-cream p-3 focus:outline-none focus:bg-white hover-paper resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <div className="pt-4 flex justify-between items-center border-t-2 border-dashed border-ink mt-8">
                <span className="text-xs uppercase font-bold tracking-widest text-ink/70">Biaya Kawat: Gratis</span>
                <button type="button" className="px-8 py-3 bg-ink text-cream font-black uppercase tracking-widest hover-paper transition-all">
                  Kirim Pesan →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
