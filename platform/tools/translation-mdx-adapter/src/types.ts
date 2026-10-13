import type { Root, PhrasingContent, Paragraph, Heading, TableCell } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';

/** Flat translation payload: key -> source text. Matches the service's `payload`. */
export type TranslationPayload = Record<string, string>;

/** An MDX JSX element node (flow or inline). */
export type JsxElement = MdxJsxFlowElement | MdxJsxTextElement;

/**
 * A block-level MDAST node that owns translatable phrasing children. These
 * are the only nodes the extractor turns into a `block` manifest entry.
 */
export type BlockNode = Paragraph | Heading | TableCell;

/**
 * One inline placeholder standing in for a non-text inline node inside a
 * block's translatable string. Tokens are opaque (Private Use Area delimited)
 * so they never collide with literal source text and are registered as
 * non-translatable terms with the service.
 */
export type PlaceholderRecord =
  | {
      /** Wraps translatable children (link, emphasis, strong). */
      kind: 'wrap';
      /** Opaque open token, e.g. "O0". */
      open: string;
      /** Opaque close token, e.g. "C0". */
      close: string;
      /** Original inline node; its children are restored from the translated text. */
      node: PhrasingContent;
    }
  | {
      /**
       * Wraps translatable text sourced from an attribute (e.g. a
       * self-closing `<Reference title="X" />`). The attribute value is
       * inlined into the block string for context; on restoration the
       * translated inner text is written back to the attribute.
       */
      kind: 'attr-wrap';
      /** Opaque open token, e.g. "O0". */
      open: string;
      /** Opaque close token, e.g. "C0". */
      close: string;
      /** Original inline node; the named attribute is restored from the translated text. */
      node: PhrasingContent;
      /** The attribute whose value was inlined (e.g. "title"). */
      attr: string;
    }
  | {
      /** Opaque inline node with no translatable text (inlineCode, break, JSX text element). */
      kind: 'opaque';
      /** Opaque self-closing token, e.g. "S0". */
      token: string;
      /** Original inline node, kept verbatim. */
      node: PhrasingContent;
    };

/** One extracted translatable unit and how to reapply the translation. */
export type ManifestEntry =
  | {
      kind: 'block';
      /** Stable full-path key, e.g. "banner[0].paragraph[0]". */
      key: string;
      /** Retained MDAST block whose phrasing children this entry owns. */
      node: BlockNode;
      /** Inline placeholders present in this entry's string, in emission order. */
      placeholders: PlaceholderRecord[];
    }
  | {
      kind: 'frontmatter';
      /** Stable key, e.g. "frontmatter.description". */
      key: string;
      /** The frontmatter field name this entry translates. */
      field: string;
    }
  | {
      kind: 'prop';
      /** Stable key, e.g. "image[0].@alt". */
      key: string;
      /** Retained JSX element whose attribute this entry owns. */
      node: JsxElement;
      /** The translatable attribute name, e.g. "alt" or "title". */
      attr: string;
    };

/** In-memory reconstruction state. Do NOT serialize across processes. */
export interface Manifest {
  /** The retained root AST the translated strings are re-applied to. */
  tree: Root;
  /** One entry per payload key, keyed by that key. */
  entries: Map<string, ManifestEntry>;
}

/** Everything the caller needs to translate and rebuild one document. */
export interface ContentObject {
  /** Flat map sent to the translation service as `payload`. */
  payload: TranslationPayload;
  /** All inline placeholder tokens, for the service's `non_translatable_terms`. */
  non_translatable_terms: string[];
  manifest: Manifest;
}

export function isJsxElement(node: unknown): node is JsxElement {
  const t = (node as { type?: string }).type;
  return t === 'mdxJsxFlowElement' || t === 'mdxJsxTextElement';
}

export function isWrapPlaceholder(
  p: PlaceholderRecord,
): p is Extract<PlaceholderRecord, { kind: 'wrap' }> {
  return p.kind === 'wrap';
}

export function isAttrWrapPlaceholder(
  p: PlaceholderRecord,
): p is Extract<PlaceholderRecord, { kind: 'attr-wrap' }> {
  return p.kind === 'attr-wrap';
}

export function isOpaquePlaceholder(
  p: PlaceholderRecord,
): p is Extract<PlaceholderRecord, { kind: 'opaque' }> {
  return p.kind === 'opaque';
}

export function isBlockEntry(
  e: ManifestEntry,
): e is Extract<ManifestEntry, { kind: 'block' }> {
  return e.kind === 'block';
}

export function isFrontmatterEntry(
  e: ManifestEntry,
): e is Extract<ManifestEntry, { kind: 'frontmatter' }> {
  return e.kind === 'frontmatter';
}

export function isPropEntry(
  e: ManifestEntry,
): e is Extract<ManifestEntry, { kind: 'prop' }> {
  return e.kind === 'prop';
}
