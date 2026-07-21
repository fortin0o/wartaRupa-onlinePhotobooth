import React from 'react';

const COUNT_OPTIONS = [
  { count: 2, label: '2 Foto', tagline: 'Duo momen — cocok untuk gaya koran maupun strip.' },
  { count: 3, label: '3 Foto', tagline: 'Strip klasik tiga bingkai vertikal.' },
  { count: 4, label: '4 Foto', tagline: 'Strip penuh, empat momen berturut-turut.' },
];

const CountPickerScreen = ({ onSelectCount }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-paper py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-black mb-4 tracking-tight uppercase">
          Warta Rupa
        </h1>
        <p className="text-xl font-body italic text-gray-700">
          Berapa foto yang ingin kamu ambil untuk sesi ini?
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-stretch">
        {COUNT_OPTIONS.map(({ count, label, tagline }) => (
          <button
            key={count}
            onClick={() => onSelectCount(count)}
            className="flex-1 bg-cream border-2 border-ink p-8 flex flex-col items-center text-center hover:shadow-hard transition-shadow duration-300"
          >
            <span className="font-display font-black text-7xl mb-4">{count}</span>
            <h2 className="font-ui text-xl font-bold uppercase tracking-widest border-b-2 border-ink pb-2 mb-4">
              {label}
            </h2>
            <p className="font-body text-gray-600 flex-1">{tagline}</p>
            <span className="mt-6 w-full py-3 border-2 border-ink font-ui font-bold uppercase tracking-wider hover:bg-ink hover:text-cream transition-colors">
              Pilih
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountPickerScreen;
