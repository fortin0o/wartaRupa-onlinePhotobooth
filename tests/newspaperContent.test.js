import { describe, it, expect } from 'vitest';
import { getRandomArticle, getRandomHeadline, headlines } from '../data/newspaperContent';

// Regresi untuk bug "ruang kosong" di template newspaper: beberapa template
// memotong artikel ini hingga kata ke-125 (NewspaperVintage). Jika artikel
// terlalu pendek, potongan kata itu kosong dan layout jadi berlubang.
describe('getRandomArticle', () => {
  it('selalu mengembalikan cukup kata untuk template yang paling rakus (125 kata)', () => {
    for (let i = 0; i < 20; i++) {
      const wordCount = getRandomArticle().split(' ').length;
      expect(wordCount).toBeGreaterThanOrEqual(125);
    }
  });
});

describe('getRandomHeadline', () => {
  it('selalu mengembalikan salah satu headline yang terdaftar', () => {
    for (let i = 0; i < 10; i++) {
      expect(headlines).toContain(getRandomHeadline());
    }
  });
});
