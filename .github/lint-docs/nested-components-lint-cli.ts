#!/usr/bin/env npx tsx
/**
 * Nested components linter CLI
 *
 * Usage:
 *   npx tsx nested-components-lint-cli.ts <files...>
 *
 * Options:
 *   -o, --output <file>   Write results to a file
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs';
import { resolve, isAbsolute, dirname, join, basename } from 'path';
import { formatIssuesForTerminal } from './seo-lint-rules.js';
import {
  lintNestedComponents,
  type LintIssue,
  type IncludeResolver,
  type ResolvedInclude,
} from './nested-components-lint-rules.js';

function parseArgs(argv: string[]): { files: string[]; outputFile?: string } {
  const files: string[] = [];
  let outputFile: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--output') {
      outputFile = argv[++i];
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }
  return { files, outputFile };
}

function resolveFilePath(file: string): string {
  if (isAbsolute(file)) return file;
  return resolve(process.cwd(), file);
}

/**
 * Returns the ``source`` directory that owns ``file`` (the segment ending in
 * ``/source``), or null when the path is not inside a docs ``source`` tree.
 * An absolute include target ("/includes/...") is rooted here.
 */
function findSourceRoot(file: string): string | null {
  const marker = `${'/'}source${'/'}`;
  const idx = file.indexOf(marker);
  if (idx === -1) return file.endsWith('/source') ? file : null;
  return file.slice(0, idx + marker.length - 1);
}

// Lazily-built index of YAML include refs per source root:
//   sourceRoot -> (ref name -> resolved content).
const yamlRefCache = new Map<string, Map<string, ResolvedInclude>>();

/**
 * Walks a source tree and indexes every ``ref:``/``content: |`` pair found in
 * its YAML include files, so include directives that resolve to a YAML
 * extract (rather than a real .rst file) can still be scanned.
 */
function buildYamlRefIndex(sourceRoot: string): Map<string, ResolvedInclude> {
  const cached = yamlRefCache.get(sourceRoot);
  if (cached) return cached;

  const index = new Map<string, ResolvedInclude>();
  const yamlFiles: string[] = [];

  const walk = (dir: string): void => {
    let entries: import('fs').Dirent[];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        walk(full);
      } else if (entry.name.endsWith('.yaml') || entry.name.endsWith('.yml')) {
        yamlFiles.push(full);
      }
    }
  };
  walk(join(sourceRoot, 'includes'));

  for (const yamlFile of yamlFiles) {
    let text: string;
    try {
      text = readFileSync(yamlFile, 'utf-8');
    } catch {
      continue;
    }
    indexYamlContentBlocks(text, yamlFile, index);
  }

  yamlRefCache.set(sourceRoot, index);
  return index;
}

const YAML_REF_RE = /^\s*-?\s*ref:\s*["']?([\w.-]+)["']?\s*$/;
const YAML_CONTENT_RE = /^(\s*)content:\s*[|>][+-]?\s*$/;

/**
 * Parses a YAML include file, associating each ``content: |`` block scalar
 * with the most recently seen ``ref:``. Block bodies are dedented so their
 * RST indentation is meaningful to the linter.
 */
function indexYamlContentBlocks(
  text: string,
  yamlFile: string,
  index: Map<string, ResolvedInclude>,
): void {
  const lines = text.split('\n');
  let lastRef: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const refMatch = lines[i].match(YAML_REF_RE);
    if (refMatch) {
      lastRef = refMatch[1];
      continue;
    }

    const contentMatch = lines[i].match(YAML_CONTENT_RE);
    if (!contentMatch || !lastRef) continue;

    const keyIndent = contentMatch[1].length;
    const blockLines: string[] = [];
    let j = i + 1;
    for (; j < lines.length; j++) {
      const bodyLine = lines[j];
      if (bodyLine.trim() === '') {
        blockLines.push('');
        continue;
      }
      const bodyIndent = bodyLine.length - bodyLine.trimStart().length;
      if (bodyIndent <= keyIndent) break;
      blockLines.push(bodyLine);
    }

    // Drop trailing blank lines that belong to no block content.
    while (blockLines.length && blockLines[blockLines.length - 1] === '') {
      blockLines.pop();
    }
    if (blockLines.length === 0) {
      lastRef = null;
      continue;
    }

    // Dedent by the smallest indentation among non-blank lines.
    const minIndent = Math.min(
      ...blockLines
        .filter(l => l.trim() !== '')
        .map(l => l.length - l.trimStart().length),
    );
    const dedented = blockLines.map(l => (l.trim() === '' ? '' : l.slice(minIndent)));

    // First block body line is at file line (i + 2); lineOffset makes reported
    // lines absolute: lineOffset + relativeLine == real line.
    index.set(lastRef, {
      content: dedented.join('\n'),
      file: yamlFile,
      lineOffset: i + 1,
    });
    lastRef = null;
  }
}

/**
 * Builds an include resolver. Include targets are resolved against the
 * owning ``source`` root (absolute "/..." paths) or the including file's
 * directory (relative paths). Real ``.rst``/``.txt`` files are read from
 * disk; otherwise the target's basename is looked up as a YAML ref.
 */
function makeIncludeResolver(): IncludeResolver {
  return (includeTarget, fromFile) => {
    // Strip a trailing directive option or inline comment, keep just the path.
    const target = includeTarget.split(/\s+/)[0];
    if (!target) return null;

    const sourceRoot = findSourceRoot(fromFile);

    let candidate: string | null = null;
    if (target.startsWith('/')) {
      if (sourceRoot) candidate = join(sourceRoot, target.slice(1));
    } else {
      candidate = join(dirname(fromFile), target);
    }

    if (candidate && existsSync(candidate) && statSync(candidate).isFile()) {
      try {
        return { content: readFileSync(candidate, 'utf-8'), file: candidate, lineOffset: 0 };
      } catch {
        return null;
      }
    }

    // Fall back to YAML ref resolution keyed on the target's basename.
    if (!sourceRoot) return null;
    const refName = basename(target).replace(/\.(rst|txt|yaml|yml)$/, '');
    const resolved = buildYamlRefIndex(sourceRoot).get(refName);
    return resolved ?? null;
  };
}

function main(): void {
  const { files: rawFiles, outputFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);

  if (files.length === 0) {
    console.log('Usage: npx tsx nested-components-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>   Write results to a file');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx nested-components-lint-cli.ts content/atlas/source/tutorial/foo.txt');
    process.exit(0);
  }

  const allIssues: LintIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;
  const resolveInclude = makeIncludeResolver();

  for (const file of files) {
    if (!file.match(/\.(rst|txt)$/)) continue;

    try {
      const content = readFileSync(file, 'utf-8');
      const issues = lintNestedComponents(content, file, resolveInclude);
      filesChecked++;
      if (issues.length > 0) {
        filesWithIssues++;
        allIssues.push(...issues);
      }
    } catch (err) {
      const error = err as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        console.error(`⚠️  File not found: ${file}`);
      } else {
        console.error(`⚠️  Error reading ${file}: ${error.message}`);
      }
    }
  }

  if (filesChecked === 0) {
    console.log('No documentation files to check.');
    process.exit(0);
  }

  const output = formatIssuesForTerminal(allIssues, 'Nested components linter');
  const summary =
    allIssues.length > 0
      ? `\nChecked ${filesChecked} file(s), ${filesWithIssues} with issues.`
      : '';

  console.log(output);
  if (summary) console.log(summary);

  if (outputFile) {
    const fullOutput = `Nested Components Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }

  const hasErrors = allIssues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
