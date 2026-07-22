import { describe, it, expect } from 'vitest';
import { newspaperThemes } from '../data/newspaperThemes';

describe('newspaperThemes', () => {
  it('punya setidaknya satu tema', () => {
    expect(newspaperThemes.length).toBeGreaterThan(0);
  });

  it('setiap tema punya id, name, component, desc, dan supportedCounts', () => {
    newspaperThemes.forEach((theme) => {
      expect(theme.id, 'id harus ada').toBeTruthy();
      expect(theme.name, `${theme.id}: name harus ada`).toBeTruthy();
      expect(theme.component, `${theme.id}: component harus ada`).toBeTypeOf('function');
      expect(theme.desc, `${theme.id}: desc harus ada`).toBeTruthy();
      expect(Array.isArray(theme.supportedCounts), `${theme.id}: supportedCounts harus array`).toBe(true);
    });
  });

  it('semua id unik (tidak boleh ada tema dobel)', () => {
    const ids = newspaperThemes.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('semua tema newspaper mendukung foto berjumlah 2 (kontrak layout bigPhoto/smallPhoto)', () => {
    newspaperThemes.forEach((theme) => {
      expect(theme.supportedCounts, theme.id).toContain(2);
    });
  });
});
