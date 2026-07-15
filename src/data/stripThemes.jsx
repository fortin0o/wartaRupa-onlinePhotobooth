import StripClassic from '../components/strips/StripClassic';
import StripFilmReel from '../components/strips/StripFilmReel';
import StripPolaroid from '../components/strips/StripPolaroid';
import StripCute from '../components/strips/StripCute';

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
  }
];
