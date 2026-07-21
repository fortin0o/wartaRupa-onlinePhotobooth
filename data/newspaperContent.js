export const headlines = [
  "BEST COUPLE OF THE WEEK",
  "CAUGHT ON CAMERA: PURE CHAOS",
  "BREAKING: FRIENDSHIP GOALS ACHIEVED",
  "TERSANGKA UTAMA KASUS BAPER",
  "SUSPECT DECLARED MOST ICONIC DUO",
  "DICARI: DUA ORANG PALING FOTOGENIK",
  "SCANDAL: TERLALU KECE UNTUK DILIHAT",
  "EXCLUSIVE: RAHASIA TAMPIL MEMPESONA",
  "VIRAL: KELAKUAN ABSURD TERTANGKAP LENSA",
  "WANTED: GAYA PALING AWKWARD TAPI GEMAS",
  "SHOCKING: THEY CAME, THEY POSED, THEY CONQUERED",
  "KASUS DITUTUP: BUKTI KESERUAN HARI INI",
  "LATEST: SENYUM PALING MANIS TAHUN INI",
  "TERCIDUK: LAGI-LAGI BIKIN HEBOH PHOTOBOOTH",
  "HOT NEWS: AESTHETIC OVERLOAD DETECTED"
];

export const articleSentences = [
  "From the moment they stepped in, it wasn't just about taking pictures.",
  "No script, no direction, just genuine chaos and good energy.",
  "Mereka datang tanpa persiapan, namun hasilnya sungguh luar biasa.",
  "Terlihat jelas ada aura kebahagiaan yang tak tertandingi di sini.",
  "Some say it's staged, but true art simply happens in the moment.",
  "Sebuah bukti nyata bahwa senyuman spontan adalah filter alami terbaik.",
  "The cameras flashed, and history was instantly captured in a frame.",
  "Tidak ada yang menduga momen ini akan menjadi sangat epik.",
  "It is undeniable that their presence changed the atmosphere entirely.",
  "Setiap jepretan menceritakan sepotong memori yang tak terlupakan hari ini."
];

export const getRandomHeadline = () => {
  const randomIndex = Math.floor(Math.random() * headlines.length);
  return headlines[randomIndex];
};

export const getRandomArticle = () => {
  // Beberapa template newspaper memotong artikel ini berdasarkan jumlah kata
  // (mis. slice(100, 125)) untuk mengisi kolom teks yang panjang. Gabungkan
  // beberapa putaran kalimat teracak agar hasilnya selalu cukup panjang
  // (~300+ kata) dan tidak menyisakan ruang kosong di template manapun.
  const shuffleOnce = () => [...articleSentences].sort(() => 0.5 - Math.random());
  return [...shuffleOnce(), ...shuffleOnce(), ...shuffleOnce()].join(" ");
};
