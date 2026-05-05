import { normalizeText } from '../src/utils/search';

describe('normalizeText', () => {
  it('lowercases input', () => {
    expect(normalizeText('Adrenalina')).toBe('adrenalina');
  });

  it('strips Spanish diacritics (á é í ó ú ñ)', () => {
    expect(normalizeText('Atención Médica')).toBe('atencion medica');
    expect(normalizeText('Niño')).toBe('nino');
    expect(normalizeText('Cefalée')).toBe('cefalee');
  });

  it('trims whitespace', () => {
    expect(normalizeText('  morfina  ')).toBe('morfina');
  });

  it('handles empty string', () => {
    expect(normalizeText('')).toBe('');
  });

  it('preserves digits and basic punctuation', () => {
    expect(normalizeText('Vitamin B12')).toBe('vitamin b12');
    expect(normalizeText('5-FU')).toBe('5-fu');
  });

  it('makes search cross-accent: pattern matches needle independently of accent', () => {
    const haystack = normalizeText('Paracetamól');
    const needle = normalizeText('paracetamol');
    expect(haystack.includes(needle)).toBe(true);
  });
});
