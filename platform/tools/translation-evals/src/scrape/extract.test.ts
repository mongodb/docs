import { describe, it, expect } from 'vitest';
import { jitterMs, isSkippableStatus } from './browser.js';

describe('scrape helpers', () => {
  it('jitter stays within 5000-8000ms', () => {
    for (let i = 0; i < 50; i++) {
      const j = jitterMs();
      expect(j).toBeGreaterThanOrEqual(5000);
      expect(j).toBeLessThan(8000);
    }
  });

  it('skips 403 and 404 only', () => {
    expect(isSkippableStatus(403)).toBe(true);
    expect(isSkippableStatus(404)).toBe(true);
    expect(isSkippableStatus(200)).toBe(false);
    expect(isSkippableStatus(500)).toBe(false);
  });
});
