import NewspaperVintage   from '../components/photobooth/newspapers/NewspaperVintage';
import NewspaperTabloid   from '../components/photobooth/newspapers/NewspaperTabloid';
import NewspaperClassicBW from '../components/photobooth/newspapers/NewspaperClassicBW';
import NewspaperEditorial from '../components/photobooth/newspapers/NewspaperEditorial';
import NewspaperBold      from '../components/photobooth/newspapers/NewspaperBold';
import NewspaperZine      from '../components/photobooth/newspapers/NewspaperZine';

export const newspaperThemes = [
  {
    id: 'vintage',
    name: 'Vintage Classic',
    component: NewspaperVintage,
    desc: 'Koran jadul krem klasik',
    supportedCounts: [2],
  },
  {
    id: 'tabloid',
    name: 'Tabloid Gosip',
    component: NewspaperTabloid,
    desc: 'Stempel merah & kuning dramatis',
    supportedCounts: [2],
  },
  {
    id: 'classicbw',
    name: 'Koran Jadul B&W',
    component: NewspaperClassicBW,
    desc: 'Monokrom 2-kolom, fold line',
    supportedCounts: [2],
  },
  {
    id: 'editorial',
    name: 'Majalah Editorial',
    component: NewspaperEditorial,
    desc: 'Minimalis, full-bleed, Archivo',
    supportedCounts: [2],
  },
  {
    id: 'bold',
    name: 'Sport / Kriminal',
    component: NewspaperBold,
    desc: 'Background hitam, aksen kuning',
    supportedCounts: [2],
  },
  {
    id: 'zine',
    name: 'Zine Cutout',
    component: NewspaperZine,
    desc: 'Ransom note, washi tape, DIY',
    supportedCounts: [2],
  },
];
