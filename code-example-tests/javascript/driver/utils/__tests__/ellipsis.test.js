const { matchWithEllipsis, isTruncatedValue } = require('../ellipsis');

describe('ellipsis.js - Extended Coverage', () => {
  describe('isTruncatedValue', () => {
    it('should identify truncated strings', () => {
      expect(isTruncatedValue('someValue...')).toBe('truncated');
      expect(isTruncatedValue('...')).toBe(true);
      expect(isTruncatedValue('normalValue')).toBe(false);
      expect(isTruncatedValue('')).toBe(false);
      expect(isTruncatedValue(null)).toBe(false);
      expect(isTruncatedValue(undefined)).toBe(false);
      expect(isTruncatedValue(123)).toBe(false);
    });
  });

  describe('matchWithEllipsis - Uncovered Scenarios', () => {
    it('should handle expected exhausted with actual remaining', () => {
      const expected = [];
      const actual = [1, 2, 3];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle actual exhausted with all ellipsis expected', () => {
      const expected = ['...', '...'];
      const actual = [];
      expect(matchWithEllipsis(expected, actual)).toBe(true);
    });

    it('should handle actual exhausted with mixed expected (non-ellipsis)', () => {
      const expected = ['...', 'value', '...'];
      const actual = [];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle truncated string matching', () => {
      const expected = ['someValue...'];
      const actual = ['someValueWithMoreText'];
      expect(matchWithEllipsis(expected, actual)).toBe(true);
    });

    it('should handle truncated string mismatch', () => {
      const expected = ['someValue...'];
      const actual = ['differentValue'];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle truncated non-string (should not match)', () => {
      const expected = ['someValue...'];
      const actual = [123];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle complex ellipsis backtracking', () => {
      const expected = ['...', 'specific', '...'];
      const actual = ['a', 'b', 'specific', 'c', 'd'];
      expect(matchWithEllipsis(expected, actual)).toBe(true);
    });

    it('should handle ellipsis backtracking failure', () => {
      const expected = ['...', 'missing', '...'];
      const actual = ['a', 'b', 'c'];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle non-ellipsis element mismatch with backtracking', () => {
      const expected = ['specific', 'value'];
      const actual = ['wrong', 'value'];
      expect(matchWithEllipsis(expected, actual)).toBe(false);
    });

    it('should handle nested array matching with ellipsis', () => {
      const expected = [['...'], '...'];
      const actual = [['a', 'b'], 'c'];
      expect(matchWithEllipsis(expected, actual)).toBe(true);
    });

    it('should handle nested object matching with ellipsis', () => {
      const expected = [{ key: '...' }, '...'];
      const actual = [{ key: 'anyValue', extra: 'ignored' }, 'anything'];
      expect(matchWithEllipsis(expected, actual)).toBe(true);
    });
  });
});
