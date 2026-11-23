import { describe, it, expect } from 'vitest';
import { tokensIn } from './adapter-tokens.js';

describe('tokensIn', () => {
  it('finds adapter tokens and leaves a bare U+E000 alone', () => {
    expect(tokensIn('x \u{E000}O1\u{E001} y')).toEqual(['\u{E000}O1\u{E001}']);
    expect(tokensIn('x \u{E000} y')).toEqual([]);
  });
});
