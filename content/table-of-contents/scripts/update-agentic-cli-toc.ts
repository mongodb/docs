/**
 * Script to regenerate the Agentic Engine CLI node in the
 * content/table-of-contents/L1-data/agentengine.ts TOC file from the
 * command reference pages in content/agentengine/source/cli/.
 *
 * Filenames encode the command hierarchy with underscores. For example,
 * agentengine_atlas_cluster_list.txt produces the nested TOC items
 * agentengine > atlas > cluster > list.
 *
 * Usage:
 *   pnpm update-agentic-cli-toc
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const CLI_DIR = path.join(REPO_ROOT, 'content', 'agentengine', 'source', 'cli');
const TOC_FILE = path.join(
  REPO_ROOT,
  'content',
  'table-of-contents',
  'L1-data',
  'agentengine.ts',
);

const CONTENT_SITE = 'agentengine';
const COMMAND_ROOT = 'agentengine';
const CLI_NODE_LABEL = 'Atlas Agent Engine CLI';
const URL_PREFIX = '/docs/agentengine/cli/';
const CHILD_LEVEL = 5; // 10 spaces: one level below the CLI node's `items: [`
const PAGE_PATTERN = new RegExp(`^${COMMAND_ROOT}(_[a-z0-9-]+)*\\.txt$`);

interface CliNode {
  label: string;
  /** Command segments below the root `agentengine` command. */
  segments: string[];
  children: Map<string, CliNode>;
}

const pad = (level: number) => '  '.repeat(level);

/**
 * Serialize a single TOC item and its children as TypeScript source.
 * Mirrors the item shape used elsewhere in the agentengine TOC file.
 */
function serializeNode(
  node: CliNode,
  level: number,
  pages: Set<string>,
): string {
  const lines: string[] = [
    `${pad(level)}{`,
    `${pad(level + 1)}label: '${node.label}',`,
    `${pad(level + 1)}contentSite: '${CONTENT_SITE}',`,
  ];

  // A node gets a url only when a page exists for its command path.
  // Underscores between commands match the CLI page file names.
  const pageBase = [COMMAND_ROOT, ...node.segments].join('_');
  if (pages.has(pageBase)) {
    lines.push(`${pad(level + 1)}url: '${URL_PREFIX}${pageBase}',`);
  }

  if (node.children.size > 0) {
    lines.push(`${pad(level + 1)}collapsible: true,`);
    lines.push(`${pad(level + 1)}items: [`);
    for (const child of sortedChildren(node)) {
      lines.push(...serializeNode(child, level + 2, pages).split('\n'));
    }
    lines.push(`${pad(level + 1)}],`);
  }

  lines.push(`${pad(level)}},`);
  return lines.join('\n');
}

function sortedChildren(node: CliNode): CliNode[] {
  return [...node.children.values()].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

/**
 * Return the index of the closing bracket for the delimited pair that opens at
 * `openIndex`, ignoring brackets inside single-quoted strings.
 */
function findMatchingBracket(
  source: string,
  openIndex: number,
  openChar: string,
  closeChar: string,
): number {
  let depth = 0;
  let inString = false;
  for (let i = openIndex; i < source.length; i++) {
    const char = source[i];
    if (inString) {
      if (char === "'") {
        inString = false;
      }
      continue;
    }
    if (char === "'") {
      inString = true;
    } else if (char === openChar) {
      depth++;
    } else if (char === closeChar) {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  throw new Error(
    `Could not find a matching "${closeChar}" for the "${openChar}" at index ${openIndex} in ${TOC_FILE}`,
  );
}

/** Build the top-level command nodes from the CLI page filenames. */
function buildTree(pages: Set<string>): CliNode[] {
  const root = new Map<string, CliNode>();

  for (const page of pages) {
    const segments = page.split('_');
    // Skip the root `agentengine` command, which is the section landing page.
    if (segments.length < 2) {
      continue;
    }
    let level = root;
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      let node = level.get(segment);
      if (node === undefined) {
        node = {
          label: segment,
          segments: segments.slice(1, i + 1),
          children: new Map(),
        };
        level.set(segment, node);
      }
      level = node.children;
    }
  }

  return sortedChildren({ label: '', segments: [], children: root });
}

/**
 * Extract top-level entries from the CLI node's existing items array that are
 * not generated command pages (their url does not start with the command URL
 * prefix). These are preserved verbatim across regenerations so manually
 * curated entries — e.g. "further reading" pages — are not wiped out.
 */
function extractManualEntries(itemsContent: string): string[] {
  const commandUrlPrefix = `${URL_PREFIX}${COMMAND_ROOT}`;
  const entryOpen = `\n${pad(CHILD_LEVEL)}{`;
  const manual: string[] = [];
  let searchFrom = 0;
  while (true) {
    const openIdx = itemsContent.indexOf(entryOpen, searchFrom);
    if (openIdx === -1) break;
    const braceIdx = openIdx + entryOpen.length - 1;
    const closeIdx = findMatchingBracket(itemsContent, braceIdx, '{', '}');
    const entryText = itemsContent.slice(braceIdx, closeIdx + 1);
    if (!entryText.includes(`url: '${commandUrlPrefix}`)) {
      manual.push(entryText);
    }
    searchFrom = closeIdx + 1;
  }
  return manual;
}

function main(): void {
  if (!fs.existsSync(CLI_DIR)) {
    throw new Error(`CLI pages directory not found: ${CLI_DIR}`);
  }

  const pages = new Set(
    fs
      .readdirSync(CLI_DIR)
      .filter((file) => PAGE_PATTERN.test(file))
      .map((file) => path.basename(file, path.extname(file))),
  );
  if (pages.size === 0) {
    throw new Error(`No CLI pages found in ${CLI_DIR}`);
  }

  const tocSource = fs.readFileSync(TOC_FILE, 'utf8');
  const labelIndex = tocSource.indexOf(`label: '${CLI_NODE_LABEL}',`);
  if (labelIndex === -1) {
    throw new Error(
      `Could not find the "${CLI_NODE_LABEL}" node in ${TOC_FILE}`,
    );
  }

  // Bound the items search to the CLI node's object so a missing `items: [`
  // cannot make us clobber a sibling node's items array.
  const nodeOpenBrace = tocSource.lastIndexOf('{', labelIndex);
  const nodeCloseBrace = findMatchingBracket(
    tocSource,
    nodeOpenBrace,
    '{',
    '}',
  );

  const itemsIndex = tocSource.indexOf('items: [', labelIndex);
  if (itemsIndex === -1 || itemsIndex > nodeCloseBrace) {
    throw new Error(
      `Could not find the items array for the "${CLI_NODE_LABEL}" node in ${TOC_FILE}`,
    );
  }

  const openBracket = tocSource.indexOf('[', itemsIndex);
  const closeBracket = findMatchingBracket(tocSource, openBracket, '[', ']');

  // Preserve any manually curated top-level entries (e.g. "further reading"
  // pages) that are not generated from command-page filenames.
  const itemsContent = tocSource.slice(openBracket + 1, closeBracket);
  const manualEntries = extractManualEntries(itemsContent);
  const manualSerialized =
    manualEntries.length > 0
      ? `\n${manualEntries.map((entry) => `${pad(CHILD_LEVEL)}${entry},`).join('\n')}`
      : '';

  const tree = buildTree(pages);
  const serialized = tree
    .map((node) => serializeNode(node, CHILD_LEVEL, pages))
    .join('\n');

  const updatedSource =
    tocSource.slice(0, openBracket + 1) +
    '\n' +
    serialized +
    manualSerialized +
    '\n' +
    pad(CHILD_LEVEL - 1) +
    tocSource.slice(closeBracket);

  fs.writeFileSync(TOC_FILE, updatedSource);

  const changed = updatedSource !== tocSource;
  console.log(
    changed
      ? `Regenerated the "${CLI_NODE_LABEL}" items from ${pages.size} CLI pages.`
      : `"${CLI_NODE_LABEL}" items are already up to date.`,
  );
}

main();
