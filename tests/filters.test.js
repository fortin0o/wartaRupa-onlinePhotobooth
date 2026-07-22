import { describe, it, expect } from 'vitest';
import { filters, filterLabels } from '../utils/filters';

describe('filters', () => {
  it('setiap filter punya label yang cocok', () => {
    const filterKeys = Object.keys(filters).sort();
    const labelKeys = Object.keys(filterLabels).sort();
    expect(filterKeys).toEqual(labelKeys);
  });

  it('filter "normal" selalu berupa CSS filter kosong (none)', () => {
    expect(filters.normal).toBe('none');
  });

  it('setiap nilai filter adalah string CSS filter yang valid (bukan kosong)', () => {
    Object.values(filters).forEach((value) => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });
});
