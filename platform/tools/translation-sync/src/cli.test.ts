import { describe, expect, it } from 'vitest';
import { parseArgs, validateScope } from './cli.js';

describe('parseArgs', () => {
  it('parses a subcommand and flags', () => {
    expect(parseArgs(['sync', '--locale', 'es', '--dry-run'])).toEqual({
      command: 'sync',
      flags: { locale: 'es', 'dry-run': true },
    });
  });

  it('treats a bare flag as boolean', () => {
    const { flags } = parseArgs(['resolve-target', '--locale', 'pt-br']);
    expect(flags.locale).toBe('pt-br');
  });
});

describe('validateScope', () => {
  it('accepts a plain directory name and the empty (all) scope', () => {
    expect(validateScope('voyageai')).toBe('voyageai');
    expect(validateScope('nested/path')).toBe('nested/path');
    expect(validateScope('')).toBe('');
  });

  it('rejects traversal and absolute scopes', () => {
    expect(() => validateScope('..')).toThrow(/relative path/);
    expect(() => validateScope('../secrets')).toThrow(/relative path/);
    expect(() => validateScope('foo/../bar')).toThrow(/relative path/);
    expect(() => validateScope('/etc')).toThrow(/relative path/);
    expect(() => validateScope('C:\\Windows')).toThrow(/relative path/);
  });
});
