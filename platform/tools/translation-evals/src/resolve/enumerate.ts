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

export async function enumeratePages(projectDir: string): Promise<string[][]> {
  const base = path.dirname(path.resolve(projectDir)); // include project name as first segment
  return collect(projectDir, base);
}
