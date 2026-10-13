import { describe, it, expect } from 'vitest';
import { extract } from '../src/extract.js';
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
