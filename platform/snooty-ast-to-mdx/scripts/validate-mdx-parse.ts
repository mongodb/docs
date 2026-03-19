/**
 * Validate MDX files by parsing them with the same remark/MDX pipeline used when
 * converting (remark + remark-mdx + remark-gfm + remark-frontmatter). This catches
 * parse/syntax errors (e.g. unclosed tags, invalid JSX) the same way the app's
 * loadMDX pipeline would. Does not resolve components or run the full Next RSC compile.
 *
 * Usage:
 *   pnpm validate:mdx-parse                       # validate all projects in content-mdx
 *   pnpm validate:mdx-parse -- django-mongodb      # validate a specific project
 */

import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

const SCRIPT_DIR = __dirname;
const CONTENT_MDX_DIR = path.resolve(SCRIPT_DIR, '../../../content-mdx');

const [project] = process.argv.slice(2);

const targetDir = project ? path.join(CONTENT_MDX_DIR, project) : CONTENT_MDX_DIR;

if (project && !fs.existsSync(targetDir)) {
  console.error(`Project not found: ${targetDir}`);
  process.exit(1);
}

const processor = remark().use(remarkFrontmatter, ['yaml']).use(remarkGfm).use(remarkMdx);

function walkMdxFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...walkMdxFiles(full));
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.mdx')) {
      results.push(path.relative(targetDir, full));
    }
  }
  return results.sort();
}

const files = walkMdxFiles(targetDir);

if (files.length === 0) {
  console.log('No MDX files found.');
  process.exit(0);
}

console.log(`Validating ${files.length} MDX file(s)\n`);

let passed = 0;
const failed: string[] = [];

for (const rel of files) {
  const fullPath = path.join(targetDir, rel);
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    processor.parse(content);
    passed++;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log(`  ✗ ${rel}`);
    console.log(`    ${message}`);
    failed.push(rel);
  }
}

console.log(`\n${passed} passed, ${failed.length} failed`);
