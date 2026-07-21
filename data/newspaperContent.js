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
  // Ambil secara acak antara 2 sampai 3 kalimat
  const count = Math.floor(Math.random() * 2) + 2; 
  
  // Duplikasi dan acak array kalimat
  const shuffled = [...articleSentences].sort(() => 0.5 - Math.random());
  
  // Ambil 'count' kalimat teratas dan gabungkan dengan spasi
  return shuffled.slice(0, count).join(" ");
};
