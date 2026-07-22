import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="bg-cream min-h-screen grain flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="border-4 border-ink p-2 hover-paper">
          <div className="border-2 border-ink bg-paper p-8">
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase border-b-4 border-ink pb-4 mb-6">
              Ruang Redaksi
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-body text-xl italic mb-6">
                  Selamat datang di pusat komando Warta Rupa. Tempat arsip visual diproses dan dicetak.
                </p>
                <div className="rule-double mb-6"></div>
                <div className="space-y-4 font-ui">
                  <div className="border-2 border-ink p-4 hover-paper bg-cream transition-all">
                    <h2 className="font-black text-xl uppercase mb-2">Status Mesin Cetak</h2>
                    <p className="text-sm">Semua sistem beroperasi normal. Tinta penuh, kertas tersedia.</p>
                  </div>
                  <div className="border-2 border-ink p-4 hover-paper bg-cream transition-all">
                    <h2 className="font-black text-xl uppercase mb-2">Arsip Tersimpan</h2>
                    <p className="text-sm">Tidak ada arsip yang disimpan di server. Privasi terjamin sepenuhnya.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center border-2 border-dashed border-ink p-8 bg-cream hover-paper transition-all">
                <div className="text-6xl mb-4">🖨️</div>
                <h3 className="font-display font-black text-2xl uppercase mb-4 text-center">Mulai Terbitkan Baru</h3>
                <Link href="/booth" className="px-8 py-4 bg-ink text-cream font-ui font-black text-lg uppercase tracking-widest hover-paper inline-block text-center mt-2">
                  Buka Kamera →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
