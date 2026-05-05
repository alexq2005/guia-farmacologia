/**
 * Tests for the activation code SHA-256 validation.
 *
 * The premium system relies on this — if these break, paid users may lose
 * access OR free users may bypass the paywall. Both are bad.
 *
 * We test the pure-JS SHA-256 indirectly through validateActivationCode,
 * because the implementation is hand-rolled (no external SHA-256 lib in the
 * release bundle).
 */

import { validateActivationCode } from '../src/utils/activation';

// react-native-encrypted-storage is imported in activation.ts but only used by
// the async functions (isActivated, saveActivation, clearActivation). Since we
// only test validateActivationCode (synchronous, pure), we just need a stub.
jest.mock('react-native-encrypted-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

describe('validateActivationCode', () => {
  it('returns true for the documented activation code', () => {
    // The code "021$Lexus$021" is documented in MEMORY.md and DEVELOPMENT.md
    // as the official activation code for v1.0.0. If this test fails, either
    // the code rotated (update both the test and ACTIVATION_HASH) or the
    // SHA-256 implementation broke.
    expect(validateActivationCode('021$Lexus$021')).toBe(true);
  });

  it('returns false for a near-miss (case sensitivity)', () => {
    expect(validateActivationCode('021$lexus$021')).toBe(false);
    expect(validateActivationCode('021$LEXUS$021')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(validateActivationCode('')).toBe(false);
  });

  it('returns false for arbitrary input', () => {
    expect(validateActivationCode('admin')).toBe(false);
    expect(validateActivationCode('password123')).toBe(false);
    expect(validateActivationCode('aaaaaaaaaaaaaaaa')).toBe(false);
  });

  it('trims surrounding whitespace before validating', () => {
    expect(validateActivationCode('  021$Lexus$021  ')).toBe(true);
    expect(validateActivationCode('\t021$Lexus$021\n')).toBe(true);
  });

  it('does not match if internal whitespace is altered', () => {
    expect(validateActivationCode('021 $Lexus$021')).toBe(false);
    expect(validateActivationCode('021$Lex us$021')).toBe(false);
  });

  it('handles non-ASCII characters without crashing', () => {
    // Sanity check that the UTF-8 encoding path in the SHA-256 doesn't blow up
    expect(() => validateActivationCode('contraseñá')).not.toThrow();
    expect(validateActivationCode('contraseñá')).toBe(false);
  });
});
