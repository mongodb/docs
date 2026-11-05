import { describe, it, expect } from 'vitest';
import { COMMANDS } from '../commands/index.js';

describe('suite command', () => {
  it('is registered', () => {
    expect(typeof COMMANDS.suite).toBe('function');
  });

  it('requires --config', async () => {
    await expect(COMMANDS.suite!({})).rejects.toThrow(/--config/);
  });
});
