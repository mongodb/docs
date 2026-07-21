import fs from 'fs/promises';
import path from 'path';

async function collectMdxPaths(dir: string, base: string): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[][] = [];
  for (const entry of entries) {
    if (entry.name === '_includes' || entry.name === 'includes' || entry.name === 'sharedinclude') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectMdxPaths(full, base)));
    } else if (entry.name.endsWith('.mdx')) {
      const rel = path.relative(base, full);
      const parts = rel.split(path.sep);
      parts[parts.length - 1] = parts[parts.length - 1].slice(0, -4); // strip .mdx
      if (parts[parts.length - 1] === 'index') parts.pop();
      results.push(parts);
    }
  }
  return results;
}

/**
 * Returns true if `dir` is a project directory (its subdirs are version dirs with _site.json).
 * Returns false if `dir` is the content-mdx parent (its subdirs are project dirs).
 */
async function isProjectDirectory(dir: string): Promise<boolean> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    try {
      await fs.access(path.join(dir, entry.name, '_site.json'));
      return true;
    } catch {}
  }
  return false;
}

export async function getPathArraysFromFilesystem(contentMdxDir: string): Promise<Array<{ path: string[] }>> {
  const resolvedDir = path.resolve(contentMdxDir);
  // When contentMdxDir is a project dir, paths must include the project name as the
  // first segment (e.g. ['manual', 'v8.0', 'about']). Use parent as base to get that.
  // When contentMdxDir is the content-mdx parent, it's already the correct base.
  const isProject = await isProjectDirectory(resolvedDir);
  const base = isProject ? path.dirname(resolvedDir) : resolvedDir;
  const paths = await collectMdxPaths(resolvedDir, base);
  return paths.map((p) => ({ path: p }));
}
