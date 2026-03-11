/**
 * Script to split the main TOC into separate files for offline documentation.
 *
 * Usage:
 *   pnpm split-offline
 *
 * This will:
 *   1. Create a separate file for each L1 item
 *   2. Extract showSubNav items into their own files (converted to L1 format)
 *   3. Output all files to the offline-docs/ folder
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { toc } from '../toc';

interface TocItemLoose {
  label: string;
  contentSite?: string;
  url?: string;
  group?: boolean;
  collapsible?: boolean;
  showSubNav?: boolean;
  versionDropdown?: boolean;
  isExternal?: boolean;
  versions?: {
    includes?: string[];
    excludes?: string[];
  };
  items?: TocItemLoose[];
}

interface ExtractedSubNav {
  label: string;
  item: TocItemLoose;
}

/**
 * Sanitizes a label to be used as a filename.
 * (example C++ → cpp, C# → csharp)
 */
function sanitizeFilename(label: string): string {
  return label
    .replace(/\+/g, 'p')
    .replace(/#/g, 'sharp')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Recursively finds all contentSites that have versionDropdown: true in the tree.
 * Returns a Set of unique contentSite values.
 */
function findVersionedContentSites(
  items: TocItemLoose[] | undefined,
): Set<string> {
  const versionedSites = new Set<string>();

  if (!items) return versionedSites;

  for (const item of items) {
    if (item.versionDropdown && item.contentSite) {
      versionedSites.add(item.contentSite);
    }
    if (item.items) {
      const childSites = findVersionedContentSites(item.items);
      for (const site of childSites) {
        versionedSites.add(site);
      }
    }
  }

  return versionedSites;
}

/**
 * Generates the full filename including versioned contentSites if present.
 * Example: "development" with versioned "docs" becomes "development.versioned.docs"
 */
function generateFilename(label: string, versionedSites: Set<string>): string {
  const baseFilename = sanitizeFilename(label);

  if (versionedSites.size === 0) {
    return baseFilename;
  }

  const sortedSites = Array.from(versionedSites).sort();
  return `${baseFilename}.versioned.${sortedSites.join('.')}`;
}

/**
 * Recursively processes TOC items, extracting showSubNav items.
 * Returns the processed items (without showSubNav children) and the extracted showSubNav items.
 */
function processItems(
  items: TocItemLoose[],
  extractedSubNavs: ExtractedSubNav[],
): TocItemLoose[] {
  const result: TocItemLoose[] = [];

  for (const item of items) {
    if (item.showSubNav) {
      // Extract this item into its own file and remove from L1
      extractedSubNavs.push({
        label: item.label,
        item: item,
      });
    } else {
      const newItem: TocItemLoose = { ...item };

      if (item.items && item.items.length > 0) {
        newItem.items = processItems(item.items, extractedSubNavs);

        // If all children were extracted, remove the items array
        if (newItem.items.length === 0) {
          delete newItem.items;
        }
      }

      // Skip collapsible/group items that have no children
      if ((newItem.collapsible || newItem.group) && !newItem.items) {
        continue;
      }

      result.push(newItem);
    }
  }

  return result;
}

/**
 * Formats a TocItem for TypeScript output.
 */
function formatTocItem(item: TocItemLoose, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  const innerSpaces = '  '.repeat(indent + 1);
  const lines: string[] = [];

  lines.push(`${spaces}{`);
  lines.push(`${innerSpaces}label: '${item.label.replace(/'/g, "\\'")}',`);

  if (item.contentSite) {
    lines.push(`${innerSpaces}contentSite: '${item.contentSite}',`);
  }

  if (item.group) {
    lines.push(`${innerSpaces}group: true,`);
  }

  if (item.collapsible) {
    lines.push(`${innerSpaces}collapsible: true,`);
  }

  if (item.showSubNav) {
    lines.push(`${innerSpaces}showSubNav: true,`);
  }

  if (item.versionDropdown) {
    lines.push(`${innerSpaces}versionDropdown: true,`);
  }

  if (item.isExternal) {
    lines.push(`${innerSpaces}isExternal: true,`);
  }

  if (item.url) {
    lines.push(`${innerSpaces}url: '${item.url}',`);
  }

  if (item.versions) {
    const versionsInner = '  '.repeat(indent + 2);
    lines.push(`${innerSpaces}versions: {`);
    if (item.versions.includes) {
      lines.push(
        `${versionsInner}includes: [${item.versions.includes.map((v) => `'${v}'`).join(', ')}],`,
      );
    }
    if (item.versions.excludes) {
      lines.push(
        `${versionsInner}excludes: [${item.versions.excludes.map((v) => `'${v}'`).join(', ')}],`,
      );
    }
    lines.push(`${innerSpaces}},`);
  }

  if (item.items && item.items.length > 0) {
    lines.push(`${innerSpaces}items: [`);
    for (const child of item.items) {
      lines.push(`${formatTocItem(child, indent + 2)},`);
    }
    lines.push(`${innerSpaces}],`);
  }

  lines.push(`${spaces}}`);

  return lines.join('\n');
}

/**
 * Generates TypeScript content for an L1 TOC file.
 */
function generateL1FileContent(l1Item: TocItemLoose): string {
  const itemFormatted = formatTocItem(l1Item, 1);

  return `import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
${itemFormatted},
];
`;
}

/**
 * Generates TypeScript content for a showSubNav TOC file.
 * Converts the showSubNav item into an L1 format.
 */
function generateSubNavFileContent(subNavItem: TocItemLoose): string {
  const l1Item: TocItemLoose = {
    label: subNavItem.label,
    contentSite: subNavItem.contentSite,
    url: subNavItem.url || '',
    items: subNavItem.items,
  };

  const itemFormatted = formatTocItem(l1Item, 1);

  return `import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
${itemFormatted},
];
`;
}

/**
 * Main function to split the TOC into offline files.
 */
function splitTocForOffline() {
  // TODO: DOP-6536 when porting over this directory, update the path to the offline-docs directory
  const outputDir = path.join(
    __dirname,
    '../../../platform/docs-nextjs/src/context/table-of-contents/offline-docs',
  );

  // Ensure the offline-docs directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('\n  Splitting TOC for offline documentation...\n');

  const allExtractedSubNavs: ExtractedSubNav[] = [];
  const l1Files: { filename: string; content: string }[] = [];

  for (const l1Item of toc) {
    const typedL1 = l1Item;
    const extractedSubNavs: ExtractedSubNav[] = [];

    // Process the L1's items to extract showSubNav items
    let processedItems: TocItemLoose[] = [];
    if (typedL1.items) {
      processedItems = processItems(typedL1.items, extractedSubNavs);
    }

    // Create the L1 file (with showSubNav items removed)
    const l1ForFile: TocItemLoose = {
      ...typedL1,
      items: processedItems.length > 0 ? processedItems : undefined,
    };

    // Find all contentSites with versionDropdown in this L1's tree
    const versionedSites = findVersionedContentSites(l1ForFile.items);
    const filename = generateFilename(l1Item.label, versionedSites);
    const content = generateL1FileContent(l1ForFile);

    l1Files.push({ filename, content });
    allExtractedSubNavs.push(...extractedSubNavs);

    console.log(` L1: "${l1Item.label}" → ${filename}.ts`);
    if (versionedSites.size > 0) {
      console.log(
        `   └─ Versioned contentSites: ${Array.from(versionedSites).join(', ')}`,
      );
    }
    if (extractedSubNavs.length > 0) {
      console.log(
        `   └─ Extracted ${extractedSubNavs.length} showSubNav item(s)`,
      );
    }
  }

  // Write L1 files
  for (const { filename, content } of l1Files) {
    const filePath = path.join(outputDir, `${filename}.ts`);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  console.log('\n  ShowSubNav files:');

  // Write showSubNav files
  for (const { label, item } of allExtractedSubNavs) {
    // Find all contentSites with versionDropdown in this subNav's tree
    const versionedSites = findVersionedContentSites(item.items);
    // Also check if the item itself has versionDropdown
    if (item.versionDropdown && item.contentSite) {
      versionedSites.add(item.contentSite);
    }

    const filename = generateFilename(label, versionedSites);
    const content = generateSubNavFileContent(item);
    const filePath = path.join(outputDir, `${filename}.ts`);

    fs.writeFileSync(filePath, content, 'utf-8');
    if (versionedSites.size > 0) {
      console.log(
        `   "${label}" → ${filename}.ts (versioned: ${Array.from(versionedSites).join(', ')})`,
      );
    } else {
      console.log(`   "${label}" → ${filename}.ts`);
    }
  }

  console.log(`\n Created ${l1Files.length} L1 files`);
  console.log(` Created ${allExtractedSubNavs.length} showSubNav files`);
  console.log(` Output directory: ${outputDir}`);
}

// Run the script
splitTocForOffline();
