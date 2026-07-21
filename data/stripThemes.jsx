import StripClassic from '../components/photobooth/strips/StripClassic';
import StripFilmReel from '../components/photobooth/strips/StripFilmReel';
import StripPolaroid from '../components/photobooth/strips/StripPolaroid';
import StripCute from '../components/photobooth/strips/StripCute';
import StripDenim from '../components/photobooth/strips/StripDenim';
import StripPolaroidStripes from '../components/photobooth/strips/StripPolaroidStripes';
import StripPlayfulBlob from '../components/photobooth/strips/StripPlayfulBlob';


export const stripThemes = [
  { 
    id: "classic", 
    name: "Classic", 
    component: StripClassic, 
    desc: "Minimalis, frame putih" 
  },
  { 
    id: "filmreel", 
    name: "Film Reel", 
    component: StripFilmReel, 
    desc: "Roll film analog" 
  },
  { 
    id: "polaroid", 
    name: "Polaroid", 
    component: StripPolaroid, 
    desc: "Tumpukan gaya polaroid" 
  },
  { 
    id: "cute", 
    name: "Cute Pastel", 
    component: StripCute, 
    desc: "Warna ceria & membulat" 
  },
  {
    id: "denim",
    name: "Denim Scrapbook",
    component: StripDenim,
    desc: "Gaya jahitan denim"
  },
  {
    id: "polaroidstripes",
    name: "Polaroid Stripes",
    component: StripPolaroidStripes,
    desc: "Pola checker & starburst"
  },
  {
    id: "playfulblob",
    name: "Playful Blob",
    component: StripPlayfulBlob,
    desc: "Blob organik & washi tape"
  }
];

