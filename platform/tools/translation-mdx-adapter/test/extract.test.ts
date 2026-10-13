import { describe, it, expect } from 'vitest';
import { extract } from '../src/extract.js';
import { wrapTokens, selfToken } from '../src/inline.js';

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

  it('extracts allowlisted frontmatter (description only; fileId excluded)', () => {
    expect(content.payload['frontmatter.description']).toBe('Learn about the Stable API.');
    expect(content.payload['frontmatter.fileId']).toBeUndefined();
  });

  it('extracts headings and paragraphs under disciplined keys', () => {
    expect(content.payload['heading[0]']).toBe('Introduction');
    const { open, close } = wrapTokens(0);
    const s1 = selfToken(1);
    expect(content.payload['paragraph[0]']).toBe(`See the ${open}guide${close} with ${s1}.`);
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

  it('has one manifest entry per payload key', () => {
    expect(content.manifest.entries.size).toBe(Object.keys(content.payload).length);
    for (const key of Object.keys(content.payload)) {
      expect(content.manifest.entries.has(key)).toBe(true);
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

  it('extracts replacement body text, which renders inside the included file', () => {
    const { open, close } = wrapTokens(0);
    expect(content.payload['include[0].replacement[0].paragraph[0]']).toBe(
      `${open}MongoDB Search${close}`,
    );
  });

  it('placeholders code literals inside a replacement body', () => {
    const { open, close } = wrapTokens(0);
    expect(content.payload['include[0].replacement[1].paragraph[0]']).toBe(
      `${open}${selfToken(1)} database${close}`,
    );
  });

  it('keeps inline components in a replacement body while exposing their visible text', () => {
    const outer = wrapTokens(0);
    const label = wrapTokens(2);
    expect(content.payload['include[0].replacement[2].paragraph[0]']).toBe(
      `${outer.open}${selfToken(1)} ${label.open}Organizations${label.close} menu${outer.close}`,
    );
  });

  it('extracts no text for a pass-through replacement holding only a Reference', () => {
    const keys = Object.keys(content.payload);
    expect(keys.some((k) => k.startsWith('include[0].replacement[3]'))).toBe(false);
  });

  it('does not treat include src or replacement name as translatable', () => {
    expect(content.payload['include[0].@src']).toBeUndefined();
    expect(content.payload['include[0].replacement[0].@name']).toBeUndefined();
  });

  it('has one manifest entry per payload key', () => {
    expect(content.manifest.entries.size).toBe(Object.keys(content.payload).length);
    for (const key of Object.keys(content.payload)) {
      expect(content.manifest.entries.has(key)).toBe(true);
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

  it('inlines the Reference title into the block string (not a separate prop entry)', () => {
    // The title is NOT a separate payload entry — it travels inside the
    // block string so the translator sees it in context.
    expect(content.payload['paragraph[0].reference[0].@title']).toBeUndefined();
    // The block string contains the title text between wrap tokens.
    expect(content.payload['paragraph[0]']).toContain('Ops Manager Application Settings.');
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

  it('has one manifest entry per payload key', () => {
    expect(content.manifest.entries.size).toBe(Object.keys(content.payload).length);
    for (const key of Object.keys(content.payload)) {
      expect(content.manifest.entries.has(key)).toBe(true);
    }
  });
});
