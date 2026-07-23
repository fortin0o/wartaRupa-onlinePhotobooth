import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata = {
  title: 'Kebijakan Privasi | Warta Rupa',
  description: 'Tata tertib dan kebijakan privasi penggunaan aplikasi Warta Rupa online photobooth.',
};

export default function KebijakanPrivasiPage() {
  const date = '23 Juli 2026';

  return (
    <div className="bg-cream min-h-screen grain flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="border-4 border-ink p-2 hover-paper">
          <div className="border-2 border-ink bg-paper p-8 md:p-12">
            <div className="text-center mb-10 border-b-2 border-ink pb-8">
              <span className="font-ui text-sm uppercase tracking-widest font-bold mb-2 block">Dokumen Resmi No. 02</span>
              <h1 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
                Tata Tertib Privasi
              </h1>
              <p className="font-body text-lg italic">
                Terakhir diperbarui pada: {date}
              </p>
            </div>
            
            <div className="font-body text-lg space-y-6 leading-relaxed text-justify">
              <p>
                <span className="font-display font-black text-4xl float-left mr-2 mt-1 leading-none">K</span>ami di Warta Rupa sangat menjunjung tinggi kerahasiaan arsip visual Anda. Kami memahami bahwa gambar-gambar yang diambil merupakan kenangan pribadi yang tak ternilai harganya.
              </p>
              
              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">Pengolahan Data Lokal</h2>
              <p>
                Sistem kami dirancang untuk memproses semua gambar sepenuhnya di dalam peramban web (browser) Anda. Ini berarti <strong>tidak ada satu pun gambar, foto, atau video Anda yang diunggah ke server kami</strong>. Segala bentuk modifikasi, filter, dan proses penyusunan tata letak dilakukan secara lokal pada memori perangkat Anda.
              </p>
              
              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">Akses Kamera</h2>
              <p>
                Warta Rupa memerlukan izin akses ke kamera (webcam) perangkat Anda semata-mata untuk fungsi pengambilan gambar. Kami tidak merekam, memantau, atau menyimpan umpan video dari kamera Anda di luar sesi penggunaan yang aktif.
              </p>

              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">Kuki (Cookies) dan Analitik</h2>
              <p>
                Saat ini, kami tidak menggunakan pelacak (trackers) atau kuki pihak ketiga untuk memantau aktivitas pribadi Anda. Kami hanya menggunakan penyimpanan lokal (local storage) bawaan peramban Anda untuk menyimpan preferensi dasar demi kenyamanan penggunaan di masa mendatang.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
