import { describe, it, expect } from 'vitest';
import { parseArgs } from '../src/cli.js';

describe('parseArgs', () => {
  it('parses a subcommand with flags', () => {
    const a = parseArgs(['resolve', '--project', 'atlas', '--production']);
    expect(a.command).toBe('resolve');
    expect(a.flags.project).toBe('atlas');
    expect(a.flags.production).toBe(true);
  });

  it('returns an empty command when none is given', () => {
    expect(parseArgs([]).command).toBe('');
  });
});
