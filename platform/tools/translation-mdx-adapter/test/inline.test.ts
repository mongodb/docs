import { describe, it, expect } from 'vitest';
import type { PhrasingContent } from 'mdast';
import { serializeInline, restoreInline, wrapTokens, selfToken } from '../src/inline.js';

const t = (value: string): PhrasingContent => ({ type: 'text', value });

describe('serializeInline', () => {
  it('passes plain text through with no placeholders', () => {
    const { text, placeholders, tokens } = serializeInline([t('Hello world')]);
    expect(text).toBe('Hello world');
    expect(placeholders).toEqual([]);
    expect(tokens).toEqual([]);
  });

  it('wraps a link, keeping its label inline and url in the record', () => {
    const link: PhrasingContent = {
      type: 'link',
      url: '/stable-api',
      children: [t('Stable API')],
    } as PhrasingContent;
    const { text, placeholders, tokens } = serializeInline([t('See '), link, t(' for details.')]);
    const { open, close } = wrapTokens(0);
    expect(text).toBe(`See ${open}Stable API${close} for details.`);
    expect(placeholders).toHaveLength(1);
    expect(placeholders[0].kind).toBe('wrap');
    expect((placeholders[0] as any).node.type).toBe('link');
    expect((placeholders[0] as any).node.url).toBe('/stable-api');
    expect((placeholders[0] as any).node.children).toEqual([]);
    expect(tokens).toEqual([open, close]);
  });

  it('emits a self token for inline code', () => {
    const code: PhrasingContent = { type: 'inlineCode', value: 'mongosh' } as PhrasingContent;
    const { text, placeholders, tokens } = serializeInline([t('Run '), code, t('.')]);
    const s0 = selfToken(0);
    expect(text).toBe(`Run ${s0}.`);
    expect(placeholders[0].kind).toBe('opaque');
    expect(tokens).toEqual([s0]);
  });

  it('numbers multiple placeholders uniquely and nests wraps', () => {
    const inner: PhrasingContent = { type: 'link', url: '/x', children: [t('here')] } as PhrasingContent;
    const strong: PhrasingContent = { type: 'strong', children: [t('click '), inner] } as PhrasingContent;
    const { text, tokens } = serializeInline([strong]);
    const outer = wrapTokens(0);
    const innerTok = wrapTokens(1);
    expect(text).toBe(`${outer.open}click ${innerTok.open}here${innerTok.close}${outer.close}`);
    expect(tokens).toEqual([outer.open, outer.close, innerTok.open, innerTok.close]);
  });

  it('recurses into an inline container component (registry default), translating its child text', () => {
    const guilabel: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Guilabel',
      attributes: [],
      children: [t('Save')],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('Open '), guilabel, t('.')]);
    const { open, close } = wrapTokens(0);
    expect(text).toBe(`Open ${open}Save${close}.`);
    expect(placeholders[0].kind).toBe('wrap');
    expect((placeholders[0] as any).node.type).toBe('mdxJsxTextElement');
    expect((placeholders[0] as any).node.name).toBe('Guilabel');
    expect((placeholders[0] as any).node.children).toEqual([]);
  });

  it('keeps an inline opaque component (e.g. Abbr) opaque, not recursing into its children', () => {
    const abbr: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Abbr',
      attributes: [],
      children: [t('API')],
    } as unknown as PhrasingContent;
    const { text, placeholders, tokens } = serializeInline([t('the '), abbr, t(' spec')]);
    const s0 = selfToken(0);
    expect(text).toBe(`the ${s0} spec`);
    expect(placeholders[0].kind).toBe('opaque');
    expect(tokens).toEqual([s0]);
  });

  it('translates the visible label of an inline reference component, preserving attributes', () => {
    const refrole: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'RefRole',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'type', value: 'label' },
        { type: 'mdxJsxAttribute', name: 'name', value: 'sharding-background' },
      ],
      children: [t('sharded cluster')],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('See a '), refrole, t('.')]);
    const { open, close } = wrapTokens(0);
    expect(text).toBe(`See a ${open}sharded cluster${close}.`);
    expect(placeholders).toHaveLength(1);
    expect(placeholders[0].kind).toBe('wrap');
    const node = (placeholders[0] as any).node;
    expect(node.name).toBe('RefRole');
    expect(node.children).toEqual([]);
    expect(node.attributes).toEqual([
      { type: 'mdxJsxAttribute', name: 'type', value: 'label' },
      { type: 'mdxJsxAttribute', name: 'name', value: 'sharding-background' },
    ]);
  });

  it('does not translate an inline-code child inside a reference component', () => {
    const refrole: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'RefRole',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'type', value: 'binary' },
        { type: 'mdxJsxAttribute', name: 'name', value: 'bin.mongos' },
      ],
      children: [{ type: 'inlineCode', value: 'mongos' }],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([refrole]);
    const outer = wrapTokens(0);
    const innerSelf = selfToken(1);
    expect(text).toBe(`${outer.open}${innerSelf}${outer.close}`);
    expect(text).not.toContain('mongos');
    expect(placeholders).toHaveLength(2);
    expect(placeholders[0].kind).toBe('wrap');
    expect((placeholders[0] as any).node.name).toBe('RefRole');
    expect(placeholders[1].kind).toBe('opaque');
    expect((placeholders[1] as any).node.type).toBe('inlineCode');
    expect((placeholders[1] as any).node.value).toBe('mongos');
  });

  it('keeps a childless (self-closing) reference component opaque when no primaryTextProp value is present', () => {
    const ref: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Reference',
      attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: 'x' }],
      children: [],
    } as unknown as PhrasingContent;
    const { text, placeholders, tokens } = serializeInline([ref]);
    const s0 = selfToken(0);
    expect(text).toBe(s0);
    expect(placeholders).toHaveLength(1);
    expect(placeholders[0].kind).toBe('opaque');
    expect(tokens).toEqual([s0]);
  });

  it('inlines the title of a self-closing Reference as an attr-wrap', () => {
    const ref: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Reference',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'name', value: 'reference/config' },
        { type: 'mdxJsxAttribute', name: 'title', value: 'Ops Manager Settings.' },
      ],
      children: [],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('See '), ref, t('.')]);
    const { open, close } = wrapTokens(0);
    expect(text).toBe(`See ${open}Ops Manager Settings.${close}.`);
    expect(placeholders).toHaveLength(1);
    expect(placeholders[0].kind).toBe('attr-wrap');
    const p = placeholders[0] as { kind: 'attr-wrap'; attr: string; node: { name: string } };
    expect(p.attr).toBe('title');
    expect(p.node.name).toBe('Reference');
  });
});

describe('restoreInline', () => {
  it('round-trips plain text', () => {
    const nodes = restoreInline('Hello world', []);
    expect(nodes).toEqual([{ type: 'text', value: 'Hello world' }]);
  });

  it('round-trips a link unchanged', () => {
    const link: PhrasingContent = { type: 'link', url: '/stable-api', children: [t('Stable API')] } as PhrasingContent;
    const { text, placeholders } = serializeInline([t('See '), link, t(' for details.')]);
    const nodes = restoreInline(text, placeholders);
    expect(nodes).toHaveLength(3);
    expect(nodes[0]).toEqual({ type: 'text', value: 'See ' });
    expect(nodes[1].type).toBe('link');
    expect((nodes[1] as any).url).toBe('/stable-api');
    expect((nodes[1] as any).children).toEqual([{ type: 'text', value: 'Stable API' }]);
    expect(nodes[2]).toEqual({ type: 'text', value: ' for details.' });
  });

  it('handles a translated string where the wrapped span moved and its label changed', () => {
    const link: PhrasingContent = { type: 'link', url: '/stable-api', children: [t('Stable API')] } as PhrasingContent;
    const { placeholders } = serializeInline([t('See '), link, t(' for details.')]);
    const { open, close } = wrapTokens(0);
    // Simulated translation: reordered, label translated, tokens preserved.
    const translated = `Consulte ${open}API estable${close} para obtener detalles.`;
    const nodes = restoreInline(translated, placeholders);
    const linkNode = nodes.find((n) => n.type === 'link') as any;
    expect(linkNode.url).toBe('/stable-api');
    expect(linkNode.children).toEqual([{ type: 'text', value: 'API estable' }]);
  });

  it('throws, naming the token, when a close token is missing', () => {
    const link: PhrasingContent = { type: 'link', url: '/x', children: [t('y')] } as PhrasingContent;
    const { text, placeholders } = serializeInline([link]);
    const { close } = wrapTokens(0);
    const broken = text.replace(close, ''); // translator dropped the close token
    expect(() => restoreInline(broken, placeholders)).toThrow(close);
  });

  it('throws, naming the token, when a self (opaque) token is silently dropped', () => {
    const code: PhrasingContent = { type: 'inlineCode', value: 'mongosh' } as PhrasingContent;
    const { text, placeholders } = serializeInline([t('Run '), code, t('.')]);
    const s0 = selfToken(0);
    const broken = text.replace(s0, ''); // translator dropped the self token entirely
    expect(() => restoreInline(broken, placeholders)).toThrow(s0);
  });

  it('round-trips an inline container component, reproducing it with translated children', () => {
    const guilabel: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Guilabel',
      attributes: [],
      children: [t('Save')],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('Open '), guilabel, t('.')]);
    const nodes = restoreInline(text, placeholders);
    const restored = nodes.find((n) => n.type === 'mdxJsxTextElement') as any;
    expect(restored.name).toBe('Guilabel');
    expect(restored.children).toEqual([{ type: 'text', value: 'Save' }]);
  });

  it('round-trips an inline reference component, reproducing it with translated label and preserved attributes', () => {
    const refrole: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'RefRole',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'type', value: 'label' },
        { type: 'mdxJsxAttribute', name: 'name', value: 'sharding-background' },
      ],
      children: [t('sharded cluster')],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('See a '), refrole, t('.')]);
    const nodes = restoreInline(text, placeholders);
    const restored = nodes.find((n) => n.type === 'mdxJsxTextElement') as any;
    expect(restored.name).toBe('RefRole');
    expect(restored.children).toEqual([{ type: 'text', value: 'sharded cluster' }]);
    expect(restored.attributes).toEqual([
      { type: 'mdxJsxAttribute', name: 'type', value: 'label' },
      { type: 'mdxJsxAttribute', name: 'name', value: 'sharding-background' },
    ]);
  });

  it('throws, naming a token, when both halves of a wrap pair are dropped', () => {
    const link: PhrasingContent = { type: 'link', url: '/x', children: [t('y')] } as PhrasingContent;
    const { text, placeholders } = serializeInline([link]);
    const { open, close } = wrapTokens(0);
    const broken = text.replace(open, '').replace(close, ''); // translator dropped both tokens
    expect(() => restoreInline(broken, placeholders)).toThrow(/O0|C0/);
  });

  it('round-trips an attr-wrap, writing translated text back to the attribute', () => {
    const ref: PhrasingContent = {
      type: 'mdxJsxTextElement',
      name: 'Reference',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'name', value: 'reference/config' },
        { type: 'mdxJsxAttribute', name: 'title', value: 'Ops Manager Settings.' },
      ],
      children: [],
    } as unknown as PhrasingContent;
    const { text, placeholders } = serializeInline([t('See '), ref, t('.')]);
    const { open, close } = wrapTokens(0);
    // Simulated translation: the title text is translated in context.
    const translated = `Consulte ${open}Configuración de Ops Manager.${close}.`;
    const nodes = restoreInline(translated, placeholders);
    const restored = nodes.find((n) => n.type === 'mdxJsxTextElement') as any;
    expect(restored.name).toBe('Reference');
    const titleAttr = restored.attributes.find((a: any) => a.name === 'title');
    expect(titleAttr.value).toBe('Configuración de Ops Manager.');
    const nameAttr = restored.attributes.find((a: any) => a.name === 'name');
    expect(nameAttr.value).toBe('reference/config'); // preserved verbatim
  });
});
