import type { Node } from 'unist';
import type { Root } from 'mdast';
import type { ComposableTutorialComputedData } from './computeComposableTutorialData';

export type { Root };

export interface EmitMdxFileArgs {
  outfilePath: string;
  mdastRoot: MdastRoot;
}

/** Resolved `:ref:` / `:doc:` / typed-role expansion for a substitution alias (`.. |id| replace:: :ref:`…`). */
export interface SubstitutionRefXrefInfo {
  refTargetKey: string;
  title: string;
  /**
   * Relative path or absolute URL for `_references.refs`, when Snooty has resolved `fileid` / `url`.
   * Omitted when only the xref label (`target`) is present until publish-time merge.
   */
  href?: string;
  /**
   * Role type for typed ref roles (e.g. `'binary'`, `'authrole'`, `'term'`).
   * When present, emit as `<RefRole type="…">` instead of `<Reference name="…">`.
   */
  roleType?: string;
}

/** A substitution whose resolved value is an external hyperlink (snooty.toml or RST `.. replace::` with URL). */
export interface LinkSubstitution {
  text: string;
  url: string;
}
export type CollectedSubstitutionValue = string | LinkSubstitution;

export interface ConversionContext {
  emitMdxFile?: (args: EmitMdxFileArgs) => void;
  /** Relative path (POSIX) of the file currently being generated, e.g. '_includes/foo.mdx' */
  currentOutfilePath?: string;
  /**
   * When true (include emitted from `.. include::` **with** `.. replacement::` siblings), substitution
   * references emit `<Reference type="replacement" />` for parent `<Replacement>` slots instead of
   * `substitution` and are not merged into `_references.json`. Plain includes omit this flag.
   */
  emitSubstitutionReferencesAsReplacement?: boolean;
  /**
   * Built from the **full** page AST: `.. |alias| replace:: :ref:` … definitions found anywhere on the
   * page. Passed into nested `convertSnootyAstToMdast` for included subtrees so `|alias|` uses there
   * (often text-only children) still emit canonical xref `<Reference name title />`.
   */
  substitutionRefXref?: Map<string, SubstitutionRefXrefInfo>;
  /**
   * Non-xref `.. |alias| replace:: …` bodies (`:pipeline:`, plain text, etc.) collected from the
   * full page AST, merged with parent maps for include conversion so `|alias|` in include bodies
   * (often empty children) still resolve and merge into `_references.json`.
   */
  substitutionDefLiterals?: Map<string, string>;
  /**
   * Raw AST children of every `substitution_definition` on the current page, keyed by refname.
   * Used by include conversion to build `<Replacement>` slots that reflect the page-level
   * definition rather than the globally-resolved default that Snooty baked into the include body.
   */
  substitutionDefNodes?: Map<string, SnootyNode[]>;
  /** When true (plain include content), substitution references do NOT get a `value` attribute
   * baked in. The calling page's `<Include>` element provides per-page values via `<Replacement>`
   * slots; unmatched refs fall back to `_references.json`.
   */
  suppressSubstitutionInlineValues?: boolean;
  /**
   * True while converting the body of an include file (i.e. the MDX currently being generated is a
   * shared include, not a top-level page). In this mode the auto-`<Replacement>` slot loop in
   * `convertDirectiveInclude` emits a `<Reference type="replacement">` placeholder instead of baking
   * a concrete value, so the shared include file stays caller-agnostic. The actual per-page value is
   * supplied by the top-level page's `<Include>` slot and propagates down at runtime.
   */
  emittingIncludeFile?: boolean;
  /** Collected references to emit into a _references.ts artifact */
  collectedSubstitutions: Map<string, CollectedSubstitutionValue>;
  collectedRefs: Map<string, string>;
}

export interface MdastRoot extends Root, MdastNode {
  type: 'root';
}

export interface MdastNode extends Node {
  [key: string]: unknown;
}

// Flexible SnootyNode interface that matches what the parser actually produces
// The parser output doesn't strictly follow the types in ast.ts
export interface SnootyNode {
  type: string;
  children?: SnootyNode[];
  value?: string;
  // Snooty specific properties we care about
  ast?: SnootyNode;
  refuri?: string;
  language?: string;
  lang?: string;
  start?: number;
  startat?: number;
  depth?: number;
  title?: string;
  name?: string;
  argument?: SnootyNode[] | string;
  options?: Record<string, unknown>;
  enumtype?: 'ordered' | 'unordered' | 'arabic' | 'bullet' | 'loweralpha' | 'upperalpha' | 'lowerroman' | 'upperroman';
  ordered?: boolean;
  label?: string;
  term?: SnootyNode[];
  html_id?: string;
  ids?: string[];
  refname?: string;
  target?: string;
  url?: string;
  domain?: string;
  admonition_type?: string;
  [key: string]: unknown;
}

export interface ValueNode extends SnootyNode {
  value: string;
}

export const isValueNode = (n?: SnootyNode): n is ValueNode => !!n && typeof n.value === 'string';

export interface TextNode extends SnootyNode {
  type: 'text';
  value: string;
}

export const isTextNode = (n?: SnootyNode): n is TextNode => !!n && n.type === 'text' && typeof n.value === 'string';

export interface LiteralNode extends SnootyNode {
  type: 'literal';
  value: string;
}

export const isLiteralNode = (n?: SnootyNode): n is LiteralNode =>
  !!n && n.type === 'literal' && typeof n.value === 'string';

export interface ConvertChildrenFn {
  (args: { nodes?: SnootyNode[]; ctx: ConversionContext; depth: number }): MdastNode[];
}

export interface MDXFrontmatterTwitter {
  creator?: string;
  image?: string;
  'image-alt'?: string;
  site?: string;
  title?: string;
}

type Selectors = Record<string, Record<string, unknown[]>>;
type ActiveTabs = Record<string, string>;

interface DismissibleSkillsCardOptions {
  skill: string;
  url: string;
}

interface HeadingNodeSelectorIds {
  tab?: string;
  'method-option'?: string;
  'selected-content'?: Record<string, string>;
  children?: HeadingNodeSelectorIds;
}

interface HeadingOption {
  depth: number;
  id: string;
  selector_ids: HeadingNodeSelectorIds;
  title: TextNode[];
}

export type PageTemplateType =
  | 'blank'
  | 'drivers-index'
  | 'document'
  | 'feature-not-avail'
  | 'instruqt'
  | 'landing'
  | 'openapi'
  | 'changelog'
  | 'search'
  | 'guide'
  | 'errorpage'
  | 'product-landing';

export interface PageOptions {
  title?: string;
  template: PageTemplateType;
  default_tabs?: ActiveTabs;
  composable_tutorial?: ComposableTutorialComputedData;
  dismissible_skills_card?: DismissibleSkillsCardOptions;
  has_composable_tutorial?: boolean;
  hidefeedback?: string;
  instruqt?: boolean;
  has_method_selector?: boolean;
  multi_page_tutorial_settings?: {
    show_next_top?: boolean;
  };
  noprevnext?: string;
  'pl-max-width-paragraphs'?: string;
  selectors?: Selectors;
  'tabs-selector-position'?: string;
  time_required?: number;
  headings?: HeadingOption[];
}

/**
 * Shape of the YAML frontmatter block emitted at the top of every converted MDX file.
 */
export interface MDXFrontmatter {
  /** Snooty source file identifier, e.g. "api.txt". */
  fileId?: string;
  /** Page template, promoted from root options or a meta directive. */
  template?: PageTemplateType;
  /** Remaining root-level options (after `template` is promoted). */
  options?: PageOptions;
  /** Facet taxonomy values keyed by facet name. */
  facets?: Record<string, string>;
  /** Open Graph / Twitter card metadata from a `.. twitter::` directive. */
  twitter?: MDXFrontmatterTwitter;
  /** Arbitrary fields from `.. meta::` directive. */
  description?: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  [key: string]: unknown;
}
