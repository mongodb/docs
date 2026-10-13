import { describe, it, expect } from 'vitest';
import { extract } from '../src/extract.js';
import { parseMdx, stringifyMdx } from '../src/mdast.js';
import { reconstruct, validateTranslation, ReconstructionError } from '../src/reconstruct.js';
import { wrapTokens } from '../src/inline.js';

const SOURCE = `---
fileId: intro.txt
description: Learn about the Stable API.
---

# Introduction

See the [guide](/guide) with \`mongosh\`.

<Image src="/d.png" alt="A diagram" />

\`\`\`js
const x = 1;
\`\`\`
`;

describe('round-trip identity', () => {
  it('reconstructs the normalized source when translation is the identity', () => {
    const content = extract(SOURCE);
    const identity: Record<string, string> = { ...content.payload };
    const out = reconstruct(identity, content);
    const baseline = stringifyMdx(parseMdx(SOURCE));
    expect(out).toBe(baseline);
  });
});

describe('applying a real translation', () => {
  it('writes translated blocks, props, and frontmatter; preserves non-translatables', () => {
    const content = extract(SOURCE);
    const translated: Record<string, string> = {
      ...content.payload,
      'heading[0]': 'Introducción',
      'frontmatter.description': 'Conozca la API estable.',
      'image[0].@alt': 'Un diagrama',
    };
    const out = reconstruct(translated, content);
    expect(out).toContain('Introducción');
    expect(out).toContain('description: Conozca la API estable.');
    expect(out).toContain('fileId: intro.txt');  // non-allowlisted, preserved
    expect(out).toContain('alt="Un diagrama"');
    expect(out).toContain('/guide');       // link url preserved
    expect(out).toContain('const x = 1;'); // code preserved
    expect(out).toContain('mongosh');      // inline code restored
  });
});

describe('validation failures', () => {
  it('throws naming a missing key', () => {
    const content = extract(SOURCE);
    const translated: Record<string, string> = { ...content.payload };
    delete translated['heading[0]'];
    expect(() => reconstruct(translated, content)).toThrow(ReconstructionError);
    expect(() => reconstruct(translated, content)).toThrow('heading[0]');
  });

  it('throws naming a failed (null) key', () => {
    const content = extract(SOURCE);
    const translated: Record<string, string | null> = { ...content.payload, 'heading[0]': null };
    expect(() => reconstruct(translated, content)).toThrow('heading[0]');
  });

  it('throws naming a dropped placeholder token', () => {
    const content = extract(SOURCE);
    const { close } = wrapTokens(0);
    const broken = content.payload['paragraph[0]'].replace(close, '');
    const translated: Record<string, string> = { ...content.payload, 'paragraph[0]': broken };
    expect(() => reconstruct(translated, content)).toThrow(close);
  });

  it('validateTranslation passes for a complete payload', () => {
    const content = extract(SOURCE);
    expect(() => validateTranslation(content, { ...content.payload })).not.toThrow();
  });
});

const INLINE_REF_SOURCE = `See the <Reference name="config/ui-settings" title="Ops Manager Application Settings." /> page.`;

const INLINE_ABBR_SOURCE = `The <Abbr tooltip="Application Programming Interface">API</Abbr> works.`;

describe('reconstruct — inline JSX translatable props', () => {
  it('writes a translated inline Reference title from the block string back to the attribute', () => {
    const content = extract(INLINE_REF_SOURCE);
    // The title is inlined in the block string — translate the whole block.
    const { open, close } = wrapTokens(0);
    const translated: Record<string, string> = {
      ...content.payload,
      'paragraph[0]': `Consulte la ${open}Configuración de Ops Manager.${close} página.`,
    };
    const out = reconstruct(translated, content);
    expect(out).toContain('title="Configuración de Ops Manager."');
    expect(out).toContain('name="config/ui-settings"');
  });

  it('applies a translated tooltip to an inline Abbr, keeping the acronym verbatim', () => {
    const content = extract(INLINE_ABBR_SOURCE);
    const translated: Record<string, string> = {
      ...content.payload,
      'paragraph[0].abbr[0].@tooltip': 'Interfaz de programación de aplicaciones',
    };
    const out = reconstruct(translated, content);
    expect(out).toContain('tooltip="Interfaz de programación de aplicaciones"');
    expect(out).toContain('>API<');
  });

  it('round-trips identically when translation is the identity', () => {
    const content = extract(INLINE_REF_SOURCE);
    const out = reconstruct({ ...content.payload }, content);
    const baseline = stringifyMdx(parseMdx(INLINE_REF_SOURCE));
    expect(out).toBe(baseline);
  });
});
