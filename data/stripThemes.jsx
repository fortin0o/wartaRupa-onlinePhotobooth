import StripClassic from '../components/photobooth/strips/StripClassic';
import StripFilmReel from '../components/photobooth/strips/StripFilmReel';
import StripPolaroid from '../components/photobooth/strips/StripPolaroid';
import StripCute from '../components/photobooth/strips/StripCute';
import StripDenim from '../components/photobooth/strips/StripDenim';
import StripPolaroidStripes from '../components/photobooth/strips/StripPolaroidStripes';
import StripPlayfulBlob from '../components/photobooth/strips/StripPlayfulBlob';
import StripY2KSticker from '../components/photobooth/strips/StripY2KSticker';
import StripDisposable from '../components/photobooth/strips/StripDisposable';
import StripScrapbook from '../components/photobooth/strips/StripScrapbook';
import StripFilmBox from '../components/photobooth/strips/StripFilmBox';


export const stripThemes = [
  {
    id: "classic",
    name: "Classic",
    component: StripClassic,
    desc: "Minimalis, frame putih",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "filmreel",
    name: "Film Reel",
    component: StripFilmReel,
    desc: "Roll film analog",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "polaroid",
    name: "Polaroid",
    component: StripPolaroid,
    desc: "Tumpukan gaya polaroid",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "cute",
    name: "Cute Pastel",
    component: StripCute,
    desc: "Warna ceria & membulat",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "denim",
    name: "Denim Scrapbook",
    component: StripDenim,
    desc: "Gaya jahitan denim",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "polaroidstripes",
    name: "Polaroid Stripes",
    component: StripPolaroidStripes,
    desc: "Pola checker & starburst",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "playfulblob",
    name: "Playful Blob",
    component: StripPlayfulBlob,
    desc: "Blob organik & washi tape",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "y2ksticker",
    name: "Y2K Sticker Booth",
    component: StripY2KSticker,
    desc: "Holografik, stiker & washi ala purikura",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "disposable",
    name: "Kamera Sekali Pakai",
    component: StripDisposable,
    desc: "Cap tanggal digital & vignette film",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "scrapbook",
    name: "Scrapbook Klasik",
    component: StripScrapbook,
    desc: "Bunga, pita & cap lilin",
    supportedCounts: [2, 3, 4],
  },
  {
    id: "filmbox",
    name: "Kotak Film Retro",
    component: StripFilmBox,
    desc: "Blok warna kuning-merah & lubang sprocket",
    supportedCounts: [2, 3, 4],
  }
];
