import type { PhrasingContent } from 'mdast';
import type { PlaceholderRecord } from './types.js';
import { isWrapPlaceholder, isAttrWrapPlaceholder } from './types.js';
import { ruleFor } from './component-registry.js';

/**
 * Node types that wrap translatable inline children. Restoration refills
 * their `children` from the recursed inner text.
 */
const WRAP_TYPES = new Set(['emphasis', 'strong', 'link', 'delete']);

/**
 * True if a phrasing node should participate as a WRAP (its children are
 * recursed into as translatable text) rather than as a single opaque token.
 * This is always true for `emphasis`/`strong`/`link`/`delete`, and is also
 * true for an inline JSX component (`mdxJsxTextElement`) whose
 * component-registry rule is NOT `opaque` and which has authored children.
 *
 * This covers both `container` components (e.g. `<Guilabel>Save</Guilabel>`)
 * and `reference` components (e.g. `<RefRole type="label"
 * name="sharding-background">sharded cluster</RefRole>`): a reference
 * component with authored children now recurses, so its visible label text
 * ("sharded cluster") is translatable, while the wrap preserves its identity
 * attributes (`name`/`type`) verbatim. An inline-code child (e.g.
 * `` `mongos` `` inside `<RefRole type="binary">`) stays opaque automatically
 * — `inlineCode` is not a wrap type — so command/binary labels are never
 * translated. Childless (self-closing) inline components with a
 * `primaryTextProp` (e.g. `<Reference title="X" />`) are handled as
 * attr-wraps (see `attrTextProp`), inlining the attribute value for context.
 * Other childless inline components fall through to the opaque branch and
 * become a single unchanged token.
 *
 * Known follow-ups, deliberately NOT handled here:
 * - Inline components classified `opaque` (e.g. `Abbr`) stay fully opaque in
 *   the inline serialization — their child text is not recursed into. This
 *   is intentional: an acronym (e.g. "API") is preserved verbatim. Their
 *   translatable attributes (e.g. <Abbr tooltip="...">) are extracted by
 *   the block walk in extract.ts, which scans placeholder nodes for props.
 */
function isWrapNode(node: PhrasingContent): boolean {
  if (WRAP_TYPES.has(node.type)) {
    return true;
  }
  if (node.type === 'mdxJsxTextElement') {
    const name = (node as { name?: string | null }).name ?? '';
    const children = (node as { children?: PhrasingContent[] }).children ?? [];
    return ruleFor(name).kind !== 'opaque' && children.length > 0;
  }
  return false;
}

/**
 * For a self-closing (childless) inline JSX element, return the prop name
 * whose value should be inlined into the parent block string as an
 * attr-wrap (so the translator sees it in context). Returns undefined when
 * the element has authored children (handled as a regular wrap) or when the
 * component has no `primaryTextProp`.
 */
function attrTextProp(node: PhrasingContent): string | undefined {
  if (node.type !== 'mdxJsxTextElement') return undefined;
  const name = (node as { name?: string | null }).name ?? '';
  const children = (node as { children?: PhrasingContent[] }).children ?? [];
  if (children.length > 0) return undefined;
  const prop = ruleFor(name).primaryTextProp;
  if (!prop) return undefined;
  const attrs = (node as { attributes?: { type: string; name: string; value?: unknown }[] }).attributes ?? [];
  const found = attrs.find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === prop && typeof a.value === 'string' && a.value.length > 0,
  );
  return found ? prop : undefined;
}

/** Private Use Area delimiters so tokens can never collide with real prose. */
const PUA_START = '';
const PUA_END = '';

/**
 * Opaque, collision-resistant open/close token pair for wrap placeholder `n`.
 * Uses Unicode Private Use Area delimiters so the tokens cannot occur in
 * translated prose.
 */
export function wrapTokens(n: number): { open: string; close: string } {
  return {
    open: `${PUA_START}O${n}${PUA_END}`,
    close: `${PUA_START}C${n}${PUA_END}`,
  };
}

/** Opaque, collision-resistant self-closing token for opaque placeholder `n`. */
export function selfToken(n: number): string {
  return `${PUA_START}S${n}${PUA_END}`;
}

/**
 * Turn a block's inline (phrasing) children into a single translatable
 * string. Text nodes are emitted verbatim; wrap nodes (emphasis, strong,
 * link, delete, and any inline JSX component whose component-registry rule
 * is not `opaque` and which has authored children, e.g. `<Guilabel>` or
 * `<RefRole>sharded cluster</RefRole>`) are replaced by an open/close token
 * pair around their recursed children; every other non-text node is
 * replaced by a single opaque self token. A single counter, incremented for
 * every placeholder in document order, numbers the tokens.
 */
export function serializeInline(children: PhrasingContent[]): {
  text: string;
  placeholders: PlaceholderRecord[];
  tokens: string[];
} {
  const placeholders: PlaceholderRecord[] = [];
  const tokens: string[] = [];
  let n = 0;

  function serializeOne(node: PhrasingContent): string {
    if (node.type === 'text') {
      return node.value;
    }

    if (isWrapNode(node)) {
      const { open, close } = wrapTokens(n);
      n++;
      const shallow = { ...node, children: [] } as unknown as PhrasingContent;
      placeholders.push({ kind: 'wrap', open, close, node: shallow });
      tokens.push(open, close);
      const inner = (node as { children: PhrasingContent[] }).children
        .map(serializeOne)
        .join('');
      return `${open}${inner}${close}`;
    }

    const attrProp = attrTextProp(node);
    if (attrProp) {
      const { open, close } = wrapTokens(n);
      n++;
      const shallow = { ...node } as unknown as PhrasingContent;
      const attrs = (shallow as unknown as { attributes?: { type: string; name: string; value?: unknown }[] }).attributes;
      const innerText = attrs?.find((a) => a.name === attrProp)?.value as string;
      placeholders.push({ kind: 'attr-wrap', open, close, node: shallow, attr: attrProp });
      tokens.push(open, close);
      return `${open}${innerText}${close}`;
    }

    const token = selfToken(n);
    n++;
    placeholders.push({ kind: 'opaque', token, node });
    tokens.push(token);
    return token;
  }

  const text = children.map(serializeOne).join('');
  return { text, placeholders, tokens };
}

interface TokenEntry {
  role: 'open' | 'close' | 'self';
  record: PlaceholderRecord;
}

/**
 * Restore a (possibly translated and reordered) serialized string back into
 * phrasing nodes, using the placeholder records captured by
 * `serializeInline`. Throws if an expected close token for a wrap is
 * missing, or if any expected token (a wrap's open/close pair, or an
 * opaque self token) was silently dropped from the translated text and
 * never consumed.
 */
export function restoreInline(
  text: string,
  placeholders: PlaceholderRecord[],
): PhrasingContent[] {
  const lookup = new Map<string, TokenEntry>();
  const expectedTokens = new Set<string>();
  for (const record of placeholders) {
    if (isWrapPlaceholder(record) || isAttrWrapPlaceholder(record)) {
      lookup.set(record.open, { role: 'open', record });
      lookup.set(record.close, { role: 'close', record });
      expectedTokens.add(record.open);
      expectedTokens.add(record.close);
    } else {
      lookup.set(record.token, { role: 'self', record });
      expectedTokens.add(record.token);
    }
  }
  const tokenStrings = [...lookup.keys()];
  const consumed = new Set<string>();

  /** Find the earliest occurrence of any known token at or after `from`. */
  function findNextToken(
    haystack: string,
    from: number,
  ): { index: number; token: string } | null {
    let best: { index: number; token: string } | null = null;
    for (const token of tokenStrings) {
      const idx = haystack.indexOf(token, from);
      if (idx !== -1 && (best === null || idx < best.index)) {
        best = { index: idx, token };
      }
    }
    return best;
  }

  /** Parse the substring `segment` into phrasing nodes. */
  function restoreSegment(segment: string): PhrasingContent[] {
    const nodes: PhrasingContent[] = [];
    let pos = 0;

    while (pos < segment.length) {
      const next = findNextToken(segment, pos);
      if (next === null) {
        nodes.push({ type: 'text', value: segment.slice(pos) });
        break;
      }

      if (next.index > pos) {
        nodes.push({ type: 'text', value: segment.slice(pos, next.index) });
      }

      const entry = lookup.get(next.token)!;
      if (entry.role === 'self') {
        nodes.push(structuredClone(entry.record.node));
        consumed.add(next.token);
        pos = next.index + next.token.length;
        continue;
      }

      if (entry.role === 'open') {
        if (isWrapPlaceholder(entry.record)) {
          const wrapRecord = entry.record;
          const closeIndex = segment.indexOf(wrapRecord.close, next.index + next.token.length);
          if (closeIndex === -1) {
            throw new Error(
              `restoreInline: missing close token ${wrapRecord.close} for open token ${wrapRecord.open}`,
            );
          }
          const innerText = segment.slice(next.index + next.token.length, closeIndex);
          const clone = structuredClone(wrapRecord.node) as PhrasingContent & {
            children: PhrasingContent[];
          };
          clone.children = restoreSegment(innerText);
          nodes.push(clone);
          consumed.add(wrapRecord.open);
          consumed.add(wrapRecord.close);
          pos = closeIndex + wrapRecord.close.length;
          continue;
        }

        if (isAttrWrapPlaceholder(entry.record)) {
          const awRecord = entry.record;
          const closeIndex = segment.indexOf(awRecord.close, next.index + next.token.length);
          if (closeIndex === -1) {
            throw new Error(
              `restoreInline: missing close token ${awRecord.close} for open token ${awRecord.open}`,
            );
          }
          const innerText = segment.slice(next.index + next.token.length, closeIndex);
          const clone = structuredClone(awRecord.node) as PhrasingContent & {
            attributes: { type: string; name: string; value?: unknown }[];
          };
          const attr = clone.attributes.find((a) => a.name === awRecord.attr);
          if (attr) attr.value = innerText;
          nodes.push(clone);
          consumed.add(awRecord.open);
          consumed.add(awRecord.close);
          pos = closeIndex + awRecord.close.length;
          continue;
        }
      }

      // entry.role === 'close' encountered without a matching open in this
      // segment; treat it as an orphan and surface it as an error.
      throw new Error(`restoreInline: unexpected close token ${next.token}`);
    }

    return nodes;
  }

  const result = restoreSegment(text);

  for (const token of expectedTokens) {
    if (!consumed.has(token)) {
      throw new Error(`restoreInline: expected token ${token} was not found in the translated text`);
    }
  }

  return result;
}
