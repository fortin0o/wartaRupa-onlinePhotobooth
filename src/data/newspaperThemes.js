import NewspaperVintage   from '../components/newspapers/NewspaperVintage';
import NewspaperTabloid   from '../components/newspapers/NewspaperTabloid';
import NewspaperClassicBW from '../components/newspapers/NewspaperClassicBW';
import NewspaperEditorial from '../components/newspapers/NewspaperEditorial';
import NewspaperBold      from '../components/newspapers/NewspaperBold';
import NewspaperZine      from '../components/newspapers/NewspaperZine';

export const newspaperThemes = [
  {
    id: 'vintage',
    name: 'Vintage Classic',
    component: NewspaperVintage,
    desc: 'Koran jadul krem klasik',
  },
  {
    id: 'tabloid',
    name: 'Tabloid Gosip',
    component: NewspaperTabloid,
    desc: 'Stempel merah & kuning dramatis',
  },
  {
    id: 'classicbw',
    name: 'Koran Jadul B&W',
    component: NewspaperClassicBW,
    desc: 'Monokrom 2-kolom, fold line',
  },
  {
    id: 'editorial',
    name: 'Majalah Editorial',
    component: NewspaperEditorial,
    desc: 'Minimalis, full-bleed, Archivo',
  },
  {
    id: 'bold',
    name: 'Sport / Kriminal',
    component: NewspaperBold,
    desc: 'Background hitam, aksen kuning',
  },
  {
    id: 'zine',
    name: 'Zine Cutout',
    component: NewspaperZine,
    desc: 'Ransom note, washi tape, DIY',
  },
];
