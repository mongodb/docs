import { describe, it, expect } from 'vitest';
import { extract } from '../src/extract.js';
import { wrapTokens, selfToken, wrapTextToken } from '../src/inline.js';

const SOURCE = `---
fileId: intro.txt
description: Learn about the Stable API.
---

# Introduction

See the [guide](/guide) with \`mongosh\`.

<Note>
  Back up first.
</Note>

<Image src="/d.png" alt="A diagram" />

\`\`\`js
const x = 1;
\`\`\`

- One
- Two
`;

describe('extract', () => {
  const content = extract(SOURCE);
  const splitContent = extract(SOURCE, { splitTextWraps: true });

  it('extracts allowlisted frontmatter (description only; fileId excluded)', () => {
    expect(content.payload['frontmatter.description']).toBe('Learn about the Stable API.');
    expect(content.payload['frontmatter.fileId']).toBeUndefined();
  });

  it('extracts headings and paragraphs under disciplined keys', () => {
    expect(content.payload['heading[0]']).toBe('Introduction');
    const { open, close } = wrapTokens(0);
    const s1 = selfToken(1);
    // The pair keeps the link's label inside its sentence, so the backend
    // translates "See the guide with mongosh." as one string.
    expect(content.payload['paragraph[0]']).toBe(`See the ${open}guide${close} with ${s1}.`);
    expect(content.payload['paragraph[0]#w0']).toBeUndefined();
  });

  it('travels a text-only wrapper label as its own inner payload entry with splitTextWraps', () => {
    const w0 = wrapTextToken(0);
    const s1 = selfToken(1);
    expect(splitContent.payload['paragraph[0]']).toBe(`See the ${w0} with ${s1}.`);
    // The link's label travels as its own inner payload entry.
    expect(splitContent.payload['paragraph[0]#w0']).toBe('guide');
  });

  it('recurses into container components', () => {
    expect(content.payload['note[0].paragraph[0]']).toBe('Back up first.');
  });

  it('extracts translatable props but not src', () => {
    expect(content.payload['image[0].@alt']).toBe('A diagram');
    expect(content.payload['image[0].@src']).toBeUndefined();
    const entry = content.manifest.entries.get('image[0].@alt');
    expect(entry?.kind).toBe('prop');
    expect(entry && 'attr' in entry ? entry.attr : null).toBe('alt');
  });

  it('recurses into lists', () => {
    expect(content.payload['list[0].item[0].paragraph[0]']).toBe('One');
    expect(content.payload['list[0].item[1].paragraph[0]']).toBe('Two');
  });

  it('excludes code blocks', () => {
    const keys = Object.keys(content.payload);
    expect(keys.some((k) => k.startsWith('code'))).toBe(false);
  });

  it('collects inline tokens as non_translatable_terms', () => {
    const { open, close } = wrapTokens(0);
    expect(content.non_translatable_terms).toContain(open);
    expect(content.non_translatable_terms).toContain(close);
    expect(content.non_translatable_terms).toContain(selfToken(1));
  });

  it('has one manifest entry per payload key, with no inner entries in the pair form', () => {
    const blockKeys = Object.keys(content.payload).filter((k) => !/#w\d+$/.test(k));
    const innerKeys = Object.keys(content.payload).filter((k) => /#w\d+$/.test(k));
    expect(innerKeys).toEqual([]);
    expect(blockKeys.length).toBeGreaterThan(0);
    expect(content.manifest.entries.size).toBe(blockKeys.length);
    for (const key of blockKeys) {
      expect(content.manifest.entries.has(key)).toBe(true);
    }
  });

  it('has one manifest entry per payload key, excluding wrap-text inner entries, with splitTextWraps', () => {
    const blockKeys = Object.keys(splitContent.payload).filter((k) => !/#w\d+$/.test(k));
    const innerKeys = Object.keys(splitContent.payload).filter((k) => /#w\d+$/.test(k));
    expect(innerKeys).toEqual(['paragraph[0]#w0']);
    expect(splitContent.manifest.entries.size).toBe(blockKeys.length);
    for (const key of blockKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(true);
    }
    for (const key of innerKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(false);
    }
  });
});

const INCLUDE_REPLACEMENT_SOURCE = `# Quick Start

<Include src="/_includes/tutorial/facts/atlasui-quick-start-atlas">
  <Replacement name="fts">
    <>MongoDB Search</>
  </Replacement>

  <Replacement name="database-name">
    <>\`sample_mflix\` database</>
  </Replacement>

  <Replacement name="ui-org-menu">
    <><Icon target="office" name="icon-mms" /> <Guilabel>Organizations</Guilabel> menu</>
  </Replacement>

  <Replacement name="service">
    <Reference refKey="service" type="replacement" />
  </Replacement>
</Include>
`;

describe('extract — replacements inside includes', () => {
  const content = extract(INCLUDE_REPLACEMENT_SOURCE);
  const splitContent = extract(INCLUDE_REPLACEMENT_SOURCE, { splitTextWraps: true });

  it('extracts replacement body text, which renders inside the included file', () => {
    const { open, close } = wrapTokens(0);
    expect(content.payload['include[0].replacement[0].paragraph[0]']).toBe(
      `${open}MongoDB Search${close}`,
    );
  });

  it('travels replacement body text as an inner entry with splitTextWraps', () => {
    const w0 = wrapTextToken(0);
    expect(splitContent.payload['include[0].replacement[0].paragraph[0]']).toBe(w0);
    expect(splitContent.payload['include[0].replacement[0].paragraph[0]#w0']).toBe('MongoDB Search');
  });

  it('placeholders code literals inside a replacement body', () => {
    const { open, close } = wrapTokens(0);
    expect(content.payload['include[0].replacement[1].paragraph[0]']).toBe(
      `${open}${selfToken(1)} database${close}`,
    );
  });

  it('keeps inline components in a replacement body while exposing their visible text', () => {
    const outer = wrapTokens(0);
    const guilabel = wrapTokens(2);
    expect(content.payload['include[0].replacement[2].paragraph[0]']).toBe(
      `${outer.open}${selfToken(1)} ${guilabel.open}Organizations${guilabel.close} menu${outer.close}`,
    );
  });

  it('exposes a replacement component visible text as an inner entry with splitTextWraps', () => {
    expect(splitContent.payload['include[0].replacement[2].paragraph[0]#w0']).toBe('Organizations');
  });

  it('extracts no text for a pass-through replacement holding only a Reference', () => {
    const keys = Object.keys(content.payload);
    expect(keys.some((k) => k.startsWith('include[0].replacement[3]'))).toBe(false);
  });

  it('does not treat include src or replacement name as translatable', () => {
    expect(content.payload['include[0].@src']).toBeUndefined();
    expect(content.payload['include[0].replacement[0].@name']).toBeUndefined();
  });

  it('has one manifest entry per payload key, excluding wrap-text inner entries, with splitTextWraps', () => {
    const blockKeys = Object.keys(splitContent.payload).filter((k) => !/#w\d+$/.test(k));
    const innerKeys = Object.keys(splitContent.payload).filter((k) => /#w\d+$/.test(k));
    expect(innerKeys).toEqual([
      'include[0].replacement[0].paragraph[0]#w0',
      'include[0].replacement[2].paragraph[0]#w0',
    ]);
    expect(splitContent.manifest.entries.size).toBe(blockKeys.length);
    for (const key of blockKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(true);
    }
    for (const key of innerKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(false);
    }
  });
});

const INLINE_REF_SOURCE = `---
fileId: ref.txt
description: Cross references.
---

See the <Reference name="config/ui-settings" title="Ops Manager Application Settings." /> page.

The <Abbr tooltip="Application Programming Interface">API</Abbr> is useful.
`;

describe('extract — inline JSX translatable props', () => {
  const content = extract(INLINE_REF_SOURCE);
  const splitContent = extract(INLINE_REF_SOURCE, { splitTextWraps: true });

  it('inlines the Reference title between an attr-wrap pair (not a separate prop entry)', () => {
    // The title is NOT a separate prop payload entry — it is inlined into the
    // block string between an open/close pair so the translator sees it in
    // context.
    expect(content.payload['paragraph[0].reference[0].@title']).toBeUndefined();
    const { open, close } = wrapTokens(0);
    expect(content.payload['paragraph[0]']).toBe(
      `See the ${open}Ops Manager Application Settings.${close} page.`,
    );
  });

  it('extracts the Reference title as an inner entry with splitTextWraps (not a separate prop entry)', () => {
    expect(splitContent.payload['paragraph[0].reference[0].@title']).toBeUndefined();
    const w0 = wrapTextToken(0);
    expect(splitContent.payload['paragraph[0]']).toBe(`See the ${w0} page.`);
    expect(splitContent.payload['paragraph[0]#w0']).toBe('Ops Manager Application Settings.');
  });

  it('does not extract non-translatable attributes from inline Reference', () => {
    expect(content.payload['paragraph[0].reference[0].@name']).toBeUndefined();
  });

  it('extracts the tooltip from an inline Abbr', () => {
    expect(content.payload['paragraph[1].abbr[0].@tooltip']).toBe(
      'Application Programming Interface',
    );
    const entry = content.manifest.entries.get('paragraph[1].abbr[0].@tooltip');
    expect(entry?.kind).toBe('prop');
    expect(entry && 'attr' in entry ? entry.attr : null).toBe('tooltip');
  });

  it('still extracts the block text containing the inlined title', () => {
    expect(content.payload['paragraph[0]']).toBeDefined();
    expect(content.payload['paragraph[0]']).toContain('See the');
    expect(content.payload['paragraph[0]']).toContain('page.');
  });

  it('has one manifest entry per payload key, excluding wrap-text inner entries, with splitTextWraps', () => {
    const blockKeys = Object.keys(splitContent.payload).filter((k) => !/#w\d+$/.test(k));
    const innerKeys = Object.keys(splitContent.payload).filter((k) => /#w\d+$/.test(k));
    expect(innerKeys).toEqual(['paragraph[0]#w0']);
    expect(splitContent.manifest.entries.size).toBe(blockKeys.length);
    for (const key of blockKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(true);
    }
    for (const key of innerKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(false);
    }
  });
});

const TARGET_DEFINITION_SOURCE = `<Target id="mongodb-query-op.-regex" name="query" term="$regex">
  Provides regular expression capabilities for pattern matching *strings* in queries.
</Target>
`;

describe('extract — <Target> definition bodies', () => {
  const content = extract(TARGET_DEFINITION_SOURCE);
  const splitContent = extract(TARGET_DEFINITION_SOURCE, { splitTextWraps: true });

  it('extracts the visible prose inside a <Target> (definition) block', () => {
    // RST definition and target directives (`.. query::`, `.. _label:`) become
    // <Target> elements that wrap reader-visible description text. That text
    // must reach the payload; treating <Target> as a verbatim reference drops
    // it and leaks English into translated pages.
    const values = Object.values(content.payload);
    expect(values.some((v) => v.includes('Provides regular expression capabilities'))).toBe(true);
  });

  it('does not extract the <Target> identifier attributes (id/name/term)', () => {
    const keys = Object.keys(content.payload);
    expect(keys.some((k) => /\.@(id|name|term)$/.test(k))).toBe(false);
  });

  it('has one manifest entry per payload key, excluding wrap-text inner entries, with splitTextWraps', () => {
    const blockKeys = Object.keys(splitContent.payload).filter((k) => !/#w\d+$/.test(k));
    const innerKeys = Object.keys(splitContent.payload).filter((k) => /#w\d+$/.test(k));
    expect(innerKeys.length).toBeGreaterThan(0);
    expect(splitContent.manifest.entries.size).toBe(blockKeys.length);
    for (const key of blockKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(true);
    }
    for (const key of innerKeys) {
      expect(splitContent.manifest.entries.has(key)).toBe(false);
    }
  });
});
