import { stripThemes } from '@/data/stripThemes';

export default function ShowcaseSection() {
  const sample = stripThemes.find((t) => t.id === 'polaroid');
  const SampleComponent = sample.component;

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto border-b-4 border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase mb-6 leading-tight">
            Bukan Sekadar<br />Mockup
          </h2>
          <div className="rule-double mb-8"></div>
          <p className="font-body text-xl mb-6">
            Setiap tata letak di katalog kami adalah tampilan asli — hasil akhir Anda akan persis seperti ini, lengkap dengan foto dan filter pilihan Anda sendiri.
          </p>
          <p className="font-body text-lg text-gray-700">
            Setelah sesi foto selesai, sistem juga otomatis merangkai klip singkat dari tiap jepretan menjadi satu video boomerang — diputar maju lalu mundur — siap diunduh berdampingan dengan hasil cetakan Anda.
          </p>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
          <div className="border-4 border-ink p-3 shadow-hard bg-white">
            <SampleComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
