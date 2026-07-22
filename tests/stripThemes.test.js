import { describe, it, expect } from 'vitest';
import { stripThemes } from '../data/stripThemes';

describe('stripThemes', () => {
  it('punya setidaknya satu tema', () => {
    expect(stripThemes.length).toBeGreaterThan(0);
  });

  it('setiap tema punya id, name, component, desc, dan supportedCounts', () => {
    stripThemes.forEach((theme) => {
      expect(theme.id, 'id harus ada').toBeTruthy();
      expect(theme.name, `${theme.id}: name harus ada`).toBeTruthy();
      expect(theme.component, `${theme.id}: component harus ada`).toBeTypeOf('function');
      expect(theme.desc, `${theme.id}: desc harus ada`).toBeTruthy();
      expect(Array.isArray(theme.supportedCounts), `${theme.id}: supportedCounts harus array`).toBe(true);
    });
  });

  it('semua id unik (tidak boleh ada tema dobel)', () => {
    const ids = stripThemes.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('semua tema strip mendukung foto 2, 3, dan 4 (kontrak StyleFilterScreen)', () => {
    stripThemes.forEach((theme) => {
      expect(theme.supportedCounts, theme.id).toEqual(expect.arrayContaining([2, 3, 4]));
    });
  });
});
