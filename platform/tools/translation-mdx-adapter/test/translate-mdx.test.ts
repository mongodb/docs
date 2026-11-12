import { describe, it, expect } from 'vitest';
import { extract } from '../src/extract.js';
import { wrapTokens } from '../src/inline.js';
import { parseMdx, stringifyMdx } from '../src/mdast.js';
import { translateMdx } from '../src/translate-mdx.js';
import { ReconstructionError } from '../src/reconstruct.js';

const SOURCE = `# Setup

Install with \`brew\` and read the [guide](/g).

<Note>
  Keep MongoDB running.
</Note>
`;

describe('translateMdx', () => {
  it('round-trips identically when translate is the identity function', async () => {
    const translate = async (payload: Record<string, string>) => ({ ...payload });
    const out = await translateMdx(SOURCE, translate);
    const baseline = stringifyMdx(parseMdx(SOURCE));
    expect(out).toBe(baseline);
  });

  it('applies a translation cycle while preserving structure and opaque tokens', async () => {
    const translate = async (payload: Record<string, string>) => {
      const out: Record<string, string> = {};
      for (const [key, value] of Object.entries(payload)) {
        out[key] = `» ${value}`;
      }
      return out;
    };
    const out = await translateMdx(SOURCE, translate);
    expect(out).toContain('# » Setup');
    expect(out).toContain('» Keep MongoDB running.');
    expect(out).toContain('<Note>');
    expect(out).toContain('/g');
    expect(out).toContain('brew');
  });

  it('passes deduped adapter tokens plus caller-supplied terms, and the matching payload keys', async () => {
    const recorded: { payload?: Record<string, string>; terms?: string[] } = {};
    const spy = async (payload: Record<string, string>, terms: string[]) => {
      recorded.payload = payload;
      recorded.terms = terms;
      return { ...payload };
    };

    await translateMdx(SOURCE, spy, { nonTranslatableTerms: ['MongoDB'] });

    const expected = extract(SOURCE);
    expect(recorded.terms).toBeDefined();
    for (const token of expected.non_translatable_terms) {
      expect(recorded.terms).toContain(token);
    }
    expect(recorded.terms).toContain('MongoDB');
    expect(recorded.terms!.length).toBe(new Set(recorded.terms).size);

    expect(recorded.payload).toBeDefined();
    expect(Object.keys(recorded.payload!).sort()).toEqual(
      Object.keys(expected.payload).sort(),
    );
  });

  it('re-translates with the wrapped text split out when a pair cannot be rebuilt', async () => {
    // A backend that reorders an open/close pair (AWS Translate does this when
    // Spanish word order moves the wrapped phrase) leaves the rebuild unable
    // to pair the tokens. The fallback re-sends the file with the wrapped text
    // as its own entry, where there is no pair to invert.
    const { open, close } = wrapTokens(0);
    const swap = (value: string, a: string, b: string) =>
      value.split(a).join('\u0000').split(b).join(a).split('\u0000').join(b);
    let calls = 0;
    const translate = async (payload: Record<string, string>) => {
      calls++;
      if (calls === 1) {
        return Object.fromEntries(
          Object.entries(payload).map(([key, value]) => [key, swap(value, open, close)]),
        );
      }
      return { ...payload };
    };

    const out = await translateMdx('Read the [guide](/g) now.\n', translate);

    expect(calls).toBe(2);
    expect(out).toContain('guide');
  });

  it('does not re-send the file when a key fails outright', async () => {
    let calls = 0;
    const translate = async (payload: Record<string, string>) => {
      calls++;
      return { ...payload, 'heading[0]': null };
    };

    await expect(translateMdx(SOURCE, translate as never)).rejects.toThrow(/heading\[0\]/);
    expect(calls).toBe(1);
  });

  it('propagates a reconstruction failure when a key is dropped or replaced with null', async () => {
    const translate = async (payload: Record<string, string>) => ({
      ...payload,
      'heading[0]': null,
    });
    await expect(
      translateMdx(SOURCE, translate as never),
    ).rejects.toThrow(/heading\[0\]/);
    await expect(
      translateMdx(SOURCE, translate as never),
    ).rejects.toBeInstanceOf(ReconstructionError);
  });
});
