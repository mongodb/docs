import type { TranslatableSet } from '../types.js';

const INCLUDE_RE = /<Include\s+src="([^"]+)"/g;

function srcToRel(src: string): string {
  return src.replace(/^\//, '').replace(/\.mdx$/i, '') + '.mdx';
}

export function buildIncludeGraph(
  _root: string,
  files: string[],
  read: (f: string) => string,
): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  for (const f of files) {
    const srcs = [...read(f).matchAll(INCLUDE_RE)].map((m) => srcToRel(m[1]!));
    graph.set(f, srcs);
  }
  return graph;
}

export function computeClosure(
  pageMdxPaths: string[],
  graph: Map<string, string[]>,
  refKeys: Record<string, string[]>,
  substitutionKeys: Set<string>,
): TranslatableSet {
  const seen = new Set<string>();
  const stack = [...pageMdxPaths];
  const usedSubs = new Set<string>();
  while (stack.length) {
    const f = stack.pop()!;
    if (seen.has(f)) continue;
    seen.add(f);
    for (const k of refKeys[f] ?? []) if (substitutionKeys.has(k)) usedSubs.add(k);
    for (const inc of graph.get(f) ?? []) if (!seen.has(inc)) stack.push(inc);
  }
  // `includes` means "reachable files that are not seed pages": every file the
  // closure reached that is not one of the eval pages itself. Classifying by
  // reachability (not a fixed `_includes/` prefix) captures nested include
  // dirs, cross-page includes, and any other file whose rendered text must be
  // translated.
  const seedSet = new Set(pageMdxPaths);
  const includes = [...seen].filter((f) => !seedSet.has(f)).sort();
  return { pages: pageMdxPaths, includes, substitutions: [...usedSubs].sort() };
}
