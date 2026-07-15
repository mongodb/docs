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
