import GithubSlugger from 'github-slugger';
import type { SnootyNode } from './types';
import { extractInlineDisplayText } from './extractInlineDisplayText';
import { parseAbbrText } from './parseAbbrText';

/**
 * Recursively replaces any `:abbr:` role node (e.g. "AWS (Amazon Web Services)") with a plain
 * text node containing just the term ("AWS"). Snooty's raw AST keeps the full "term (expansion)"
 * text on these nodes; the page body already splits this into `<Abbr tooltip="...">AWS</Abbr>`
 * (see the `componentName === 'Abbr'` case above), but `root.options.headings` — used to build
 * the "On this page" ToC and heading ids — is copied straight from the source AST and needs the
 * same treatment so its text and ids match what's actually rendered on the page.
 */
const stripAbbrExpansions = (nodes: SnootyNode[]): SnootyNode[] =>
  nodes.map((node) => {
    if (node.type === 'role' && typeof node.name === 'string' && node.name.toLowerCase() === 'abbr') {
      const { term } = parseAbbrText(extractInlineDisplayText(node.children ?? []));
      return { type: 'text', value: term };
    }
    if (Array.isArray(node.children)) {
      return { ...node, children: stripAbbrExpansions(node.children) };
    }
    return node;
  });

interface HeadingOptionLike {
  depth: number;
  id: string;
  selector_ids: Record<string, unknown>;
  title: SnootyNode[];
  [key: string]: unknown;
}

/**
 * Normalizes `root.options.headings` before it's copied into MDX frontmatter. Snooty's `id` for
 * each heading is otherwise passed through untouched — it's only wrong when the title contains an
 * `:abbr:` role, since that raw id was derived from the full "term (expansion)" text (e.g.
 * `aws--amazon-web-services--kinesis-data-stream`) instead of what's actually rendered
 * (`<Abbr tooltip="...">AWS</Abbr>`, anchored as `aws-kinesis-data-stream`).
 *
 * To keep the change minimal, a heading's `title`/`id` are only touched when stripping abbr
 * expansions actually changes its text; every other heading (the vast majority) is returned as-is,
 * `id` included. `github-slugger` is the same package `Heading.tsx` uses to derive anchor ids on
 * render, so a corrected id here is guaranteed to match. A single slugger instance still runs over
 * every heading in document order (even unaffected ones) so disambiguation counts (`-1`, `-2`, …)
 * stay in sync with what the page would produce, in case a later abbr-bearing heading collides
 * with earlier heading text.
 */
export const normalizeHeadingOptions = (headings: HeadingOptionLike[]): HeadingOptionLike[] => {
  const slugger = new GithubSlugger();
  return headings.map((heading) => {
    const originalTitle = heading.title ?? [];
    const strippedTitle = stripAbbrExpansions(originalTitle);
    const strippedText = extractInlineDisplayText(strippedTitle);
    const slug = slugger.slug(strippedText);

    if (strippedText === extractInlineDisplayText(originalTitle)) {
      return heading;
    }
    return { ...heading, title: strippedTitle, id: slug };
  });
};

export interface RenderedHeading {
  depth: number;
  text: string;
  /** Text used to match against Snooty's heading titles. */
  matchText: string;
}

const attributeValue = (node: SnootyNode, attrName: string): string | undefined => {
  const attributes = (node as { attributes?: { name?: string; value?: unknown }[] }).attributes;
  const found = attributes?.find((a) => a.name === attrName);
  if (typeof found?.value === 'string') return found.value;
  // Numeric attributes are stored as expressions: `headingLevel={3}` -> { value: { value: '3' } }
  const expression = found?.value as { value?: unknown } | undefined;
  return typeof expression?.value === 'string' ? expression.value : undefined;
};

const renderedText = (node: SnootyNode): string => {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  if (node.name === 'Reference' && attributeValue(node, 'type') === 'substitution') {
    return attributeValue(node, 'value') ?? '';
  }
  return (node.children ?? []).map(renderedText).join('');
};

/**
 * Text used to line a rendered heading up with Snooty's title for it. Snooty records roles such as
 * `:pipeline:` with empty children, so the title reads "Can I run a query" where the page renders
 * "Can I run a `$search` query". Dropping role text from both sides lets them match; the id itself
 * still comes from the full rendered text, so the anchor keeps the resolved wording.
 */
const renderedMatchText = (node: SnootyNode): string => {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  if (node.name === 'RefRole') return '';
  return (node.children ?? []).map(renderedMatchText).join('');
};

/**
 * Components that render an `h1`-`h6` through `Heading` but are not `heading` nodes in the mdast:
 * a step title lives in `StepHeading`'s children, and a collapsible's title is a `heading`
 * attribute (its children are body content). `Heading.tsx` slugs both at render time.
 */
const HEADING_COMPONENTS = new Set(['StepHeading', 'Heading', 'Collapsible']);

const normalizeHeadingText = (text: string): string => text.replace(/\s+/g, ' ').trim();

/**
 * Collects every heading `Heading.tsx` will slug, in document order, at every depth. A single
 * slugger runs over them at render time, so ids are only stable if the same sequence is used here.
 */
export const collectRenderedHeadings = (nodes: SnootyNode[]): RenderedHeading[] => {
  const headings: RenderedHeading[] = [];
  const walk = (node: SnootyNode) => {
    if (node.type === 'heading') {
      headings.push({ depth: node.depth ?? 1, text: renderedText(node), matchText: renderedMatchText(node) });
      return;
    }
    if (node.type.startsWith('mdxJsx') && HEADING_COMPONENTS.has(String(node.name))) {
      const text =
        node.name === 'Collapsible'
          ? attributeValue(node, 'heading') ?? ''
          : renderedText({ type: 'root', children: node.children ?? [] });
      if (text) {
        headings.push({
          depth: Number(attributeValue(node, 'headingLevel')) || 3,
          text,
          matchText: text,
        });
      }
      // A collapsible's children are body content that can contain further headings.
      if (node.name === 'Collapsible') (node.children ?? []).forEach(walk);
      return;
    }
    (node.children ?? []).forEach(walk);
  };
  nodes.forEach(walk);
  return headings;
};

/**
 * Snooty's `options.headings` omits some headings (for example depth 4, or step titles rendered by
 * `StepHeading`) but its ids, and the ids `Heading.tsx` renders, both count them. Slug the full
 * rendered sequence once, in order, then give each `options.headings` entry the id of the rendered
 * heading it corresponds to — matched by depth and title, then by title alone, since the depth
 * Snooty records can differ from the rendered one.
 *
 * An entry with no rendered heading at all is slugged from its own title (the pre-PR runtime
 * behaviour). Keeping Snooty's id instead would leave the ToC pointing at an anchor that the page
 * never renders.
 */
export const assignRenderedHeadingIds = (
  headings: HeadingOptionLike[],
  renderedHeadings: RenderedHeading[],
): HeadingOptionLike[] => {
  const slugger = new GithubSlugger();
  const slugs = renderedHeadings.map((h) => slugger.slug(h.text));
  const consumed = new Set<number>();
  let cursor = 0;

  const assigned = headings.map((heading) => {
    const text = normalizeHeadingText(extractInlineDisplayText(heading.title ?? []));
    for (let i = cursor; i < renderedHeadings.length; i += 1) {
      const candidate = renderedHeadings[i];
      if (candidate.depth === heading.depth && normalizeHeadingText(candidate.matchText) === text) {
        cursor = i + 1;
        consumed.add(i);
        return { ...heading, id: slugs[i] };
      }
    }
    for (let i = 0; i < renderedHeadings.length; i += 1) {
      if (!consumed.has(i) && normalizeHeadingText(renderedHeadings[i].matchText) === text) {
        consumed.add(i);
        return { ...heading, id: slugs[i] };
      }
    }
    return null;
  });

  const fallbackSlugger = new GithubSlugger();
  return assigned.map((heading, index) => {
    if (heading) return heading;
    const unmatched = headings[index];
    return {
      ...unmatched,
      id: fallbackSlugger.slug(normalizeHeadingText(extractInlineDisplayText(unmatched.title ?? []))),
    };
  });
};
