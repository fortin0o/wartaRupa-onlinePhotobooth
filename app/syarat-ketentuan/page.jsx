import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function SyaratKetentuanPage() {
  const date = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-cream min-h-screen grain flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="border-4 border-ink p-2 hover-paper">
          <div className="border-2 border-ink bg-paper p-8 md:p-12">
            <div className="text-center mb-10 border-b-2 border-ink pb-8">
              <span className="font-ui text-sm uppercase tracking-widest font-bold mb-2 block">Dokumen Resmi No. 01</span>
              <h1 className="font-display font-black text-4xl md:text-5xl uppercase mb-4">
                Surat Perjanjian
              </h1>
              <p className="font-body text-lg italic">
                Terakhir diperbarui pada: {date}
              </p>
            </div>
            
            <div className="font-body text-lg space-y-6 leading-relaxed text-justify">
              <p>
                <span className="font-display font-black text-4xl float-left mr-2 mt-1 leading-none">D</span>engan menggunakan layanan Warta Rupa, Anda dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum dalam surat perjanjian ini.
              </p>
              
              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">1. Penggunaan Layanan</h2>
              <p>
                Warta Rupa menyediakan fasilitas photobooth digital yang beroperasi sepenuhnya pada peramban web (browser) pengguna. Layanan ini diberikan "sebagaimana adanya" tanpa jaminan ketersediaan mutlak setiap saat.
              </p>
              
              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">2. Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh tata letak, desain koran, dan templat yang disediakan oleh Warta Rupa adalah hak milik intelektual pengembang. Pengguna diberikan hak pakai non-eksklusif untuk keperluan pribadi dan non-komersial.
              </p>

              <h2 className="font-display font-bold text-2xl uppercase mt-8 mb-4 border-b border-ink pb-2">3. Penyangkalan (Disclaimer)</h2>
              <p>
                Pihak redaksi Warta Rupa tidak bertanggung jawab atas hilangnya data foto akibat kesalahan peramban atau perangkat pengguna. Karena layanan ini memproses gambar secara lokal, pengguna wajib menyimpan (export) hasil foto sebelum menutup halaman redaksi.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
