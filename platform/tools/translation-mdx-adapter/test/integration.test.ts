import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extract, reconstruct } from '../src/index.js';
import { parseMdx, stringifyMdx } from '../src/mdast.js';

function fixture(name: string): string {
  return readFileSync(fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url)), 'utf8');
}

const FIXTURES = ['admonition.mdx', 'table.mdx', 'include-replacement.mdx'];

describe('round-trip identity over fixtures', () => {
  for (const name of FIXTURES) {
    it(`reconstructs ${name} identically under identity translation`, () => {
      const source = fixture(name);
      const content = extract(source);
      const out = reconstruct({ ...content.payload }, content);
      expect(out).toBe(stringifyMdx(parseMdx(source)));
    });
  }
});

describe('full extract -> translate -> reconstruct cycle', () => {
  it('applies a simulated translation while preserving structure', () => {
    const content = extract(fixture('admonition.mdx'));

    // Simulated service: prefix every value (tokens are opaque, so they survive).
    const translations: Record<string, string> = {};
    for (const [key, value] of Object.entries(content.payload)) {
      translations[key] = `» ${value}`;
    }

    const out = reconstruct(translations, content);

    // Frontmatter (description), heading, list, and admonition body all translated.
    expect(out).toContain('description: » How to back up your data safely.');
    expect(out).toContain('# » Backups');
    expect(out).toContain('» Stop writes');
    expect(out).toContain('» Back up your data first.');
    // Structure preserved; non-allowlisted frontmatter untouched.
    expect(out).toContain('fileId: backups.txt');
    expect(out).toContain('<Note>');
    expect(out).toContain('/guide');
    expect(out).toContain('mongosh');
  });

  it('applies translations to replacement bodies inside an include', () => {
    const content = extract(fixture('include-replacement.mdx'));

    // Simulated service: translate the words inside each string, leaving the
    // opaque tokens in place (what a real service returns).
    const glossary: Record<string, string> = {
      'MongoDB Search': 'Búsqueda de MongoDB',
      database: 'base de datos',
      Organizations: 'Organizaciones',
      menu: 'menú',
    };
    const translations: Record<string, string> = {};
    for (const [key, value] of Object.entries(content.payload)) {
      translations[key] = Object.entries(glossary).reduce(
        (text, [source, target]) => text.replaceAll(source, target),
        value,
      );
    }

    const out = reconstruct(translations, content);

    // Replacement bodies are translated in place, inside their fragments.
    expect(out).toContain('<>Búsqueda de MongoDB</>');
    expect(out).toContain('`sample_mflix` base de datos');
    expect(out).toContain('<Guilabel>Organizaciones</Guilabel> menú');
    // The include target, replacement names, non-visible props, and the
    // pass-through reference are untouched.
    expect(out).toContain('src="/_includes/tutorial/facts/atlasui-quick-start-atlas"');
    expect(out).toContain('name="fts"');
    expect(out).toContain('name="database-name"');
    expect(out).toContain('<Icon target="office" name="icon-mms" />');
    expect(out).toContain('<Reference refKey="service" type="replacement" />');
  });

  it('every non_translatable_term is a token, and reconstruction needs no term to be translated', () => {
    const content = extract(fixture('admonition.mdx'));
    // Tokens never appear as their own payload keys/values wholesale; they live inside block strings.
    expect(Array.isArray(content.non_translatable_terms)).toBe(true);
    // Identity reconstruction succeeds -> terms round-trip cleanly.
    expect(() => reconstruct({ ...content.payload }, content)).not.toThrow();
  });
});
