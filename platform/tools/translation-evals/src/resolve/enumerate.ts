import fs from 'node:fs/promises';
import path from 'node:path';

const SKIP_DIRS = new Set(['_includes', 'includes', 'sharedinclude']);

async function collect(dir: string, base: string): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: string[][] = [];
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await collect(full, base)));
    else if (e.name.endsWith('.mdx')) {
      const parts = path.relative(base, full).split(path.sep);
      parts[parts.length - 1] = parts[parts.length - 1]!.slice(0, -4);
      if (parts[parts.length - 1] === 'index') parts.pop();
      out.push(parts);
    }
  }
  return out;
}

export async function enumeratePages(siteDir: string, rootDir: string): Promise<string[][]> {
  // Paths are relative to rootDir so they retain the site path (the project dir
  // plus any version segment); resolveProject strips that prefix back off.
  return collect(path.resolve(siteDir), path.resolve(rootDir));
}
