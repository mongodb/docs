/**
 * Whether a page has any tabs, and so whether an all-tabs markdown export of it
 * would say anything the default export does not.
 *
 * A string test rather than an mdast walk: this runs over every page at build
 * time, and only decides whether the (much more expensive) all-tabs conversion
 * is worth doing at all. It errs toward true — a `<Tab` inside a code sample
 * counts — which costs a redundant export and nothing else.
 *
 * Call it on MDX whose imports are already resolved
 * (`preResolveImportsForMarkdownExport`): a page can inherit its tabs from an
 * include, and those only appear as literal JSX once inlined.
 */

// `(?=[\s/>])` keeps `<Tabs>` from matching: a <Tabs> with no <Tab> inside
// contributes no tab content.
const TAB_ELEMENT_RE = /<Tab(?=[\s/>])/;

export function mdxHasTabs(resolvedMdx: string): boolean {
  return TAB_ELEMENT_RE.test(resolvedMdx);
}
