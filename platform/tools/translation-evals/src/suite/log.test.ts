import { describe, expect, it, vi } from 'vitest';
import { formatLogLine, logLine } from './log.js';

const at = new Date('2026-11-12T14:11:04.778Z');

describe('formatLogLine', () => {
  it('renders a stage completion with duration', () => {
    expect(
      formatLogLine({ scope: '1/2', event: 'done', subject: 'stage=translate', attrs: { dur: '132.7s' } }, at),
    ).toBe('2026-11-12T14:11:04Z [1/2] done  stage=translate dur=132.7s');
  });

  it('renders a batch banner with no subject', () => {
    expect(
      formatLogLine({ scope: 'suite', event: 'begin', attrs: { id: 'manual-sweep', iterations: 2 } }, at),
    ).toBe('2026-11-12T14:11:04Z [suite] begin id=manual-sweep iterations=2');
  });

  it('omits undefined attrs and quotes values containing spaces', () => {
    expect(
      formatLogLine(
        { scope: '1/2', event: 'info', subject: 'eval', attrs: { experiment: 'a b', rows: 140, x: undefined } },
        at,
      ),
    ).toBe('2026-11-12T14:11:04Z [1/2] info  eval experiment="a b" rows=140');
  });

  it('omits the scope when unset (standalone run)', () => {
    expect(formatLogLine({ event: 'warn', subject: 'scrape', attrs: { status: 404 } }, at)).toBe(
      '2026-11-12T14:11:04Z warn  scrape status=404',
    );
  });

  it('leaves a five-letter begin unpadded and pads a four-letter event', () => {
    expect(formatLogLine({ scope: 'base', event: 'begin', subject: 'stage=resolve' }, at)).toBe(
      '2026-11-12T14:11:04Z [base] begin stage=resolve',
    );
    expect(formatLogLine({ scope: 'base', event: 'done', subject: 'stage=resolve' }, at)).toBe(
      '2026-11-12T14:11:04Z [base] done  stage=resolve',
    );
  });

  it('escapes double quotes inside quoted attr values', () => {
    expect(
      formatLogLine({ event: 'fail', subject: 'iteration', attrs: { err: 'boom "x" end' } }, at),
    ).toBe('2026-11-12T14:11:04Z fail  iteration err="boom \\"x\\" end"');
  });

  it('collapses newlines in attr values so the line stays one line', () => {
    const rendered = formatLogLine({ event: 'info', subject: 'scrape', attrs: { msg: 'a\nb' } }, at);
    expect(rendered).toBe('2026-11-12T14:11:04Z info  scrape msg="a b"');
    expect(rendered).not.toMatch(/[\r\n]/);
  });
});

describe('logLine', () => {
  it('prints the formatted line to console.log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      logLine({ scope: '1/2', event: 'done', subject: 'stage=eval', attrs: { dur: '1.0s' } });
      expect(String(spy.mock.calls[0]?.[0])).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z \[1\/2\] done {2}stage=eval dur=1\.0s$/,
      );
    } finally {
      spy.mockRestore();
    }
  });
});
