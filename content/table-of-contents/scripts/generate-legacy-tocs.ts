/**
 * Script to generate a legacy TOC file for a specific contentSite and version.
 *
 * Usage:
 *   pnpm generate-legacy --contentSite=<contentSite> --version=<version>
 *
 * Example:
 *   pnpm generate-legacy --contentSite=kafka-connector --version=v1.12
 *
 * This will:
 *   1. Search the main TOC for items matching the contentSite
 *   2. Filter TOC items based on the version (includes/excludes)
 *   3. Create a TypeScript file at legacy-docs/{contentSite}-{version}.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { toc } from '../toc';
import type { L1TocItem, TocItem } from '../types';

// Loose type for TOC items so it's easier to build the legacy TOC
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

interface CommandLineOptions {
  contentSite: string;
  version: string;
  offline?: boolean;
}

/**
 * Determines if a TOC item should be included in legacy-toc based on its versions property.
 * If excluded, we skip this item AND all its children
 */
function shouldIncludeByVersion(
  item: TocItemLoose,
  targetVersion: string,
): boolean {
  if (item.versions) {
    if (item.versions.includes) {
      return item.versions.includes.includes(targetVersion);
    }
    if (item.versions.excludes) {
      return !item.versions.excludes.includes(targetVersion);
    }
  }

  // No versions property - include by default
  return true;
}

/**
 * Recursively filters TOC items for the given version.
 * Removes version-related properties and replaces :version in URLs.
 * Also filters out items that don't match the target contentSite.
 *
 * Version inheritance is handled implicitly: if a parent is excluded,
 * we skip it entirely and never recurse into its children.
 */
function filterTocItems(
  items: TocItemLoose[],
  targetVersion: string,
  targetContentSite: string,
): TocItemLoose[] {
  const result: TocItemLoose[] = [];

  for (const item of items) {
    // Skip items that have a different contentSite than the target
    // Exceptions:
    // - Items without a contentSite are structural and should be included
    // - Collapsible items without a URL are structural containers and should be included // TODO, i dont know about this one, maybe it should match docsite
    const isStructuralCollapsible = item.collapsible && !item.url;
    if (
      item.contentSite &&
      item.contentSite !== targetContentSite &&
      !isStructuralCollapsible
    ) {
      continue;
    }

    // Check if this item should be included based on versions
    // If excluded, we skip this item AND all its children (by not recursing)
    if (!shouldIncludeByVersion(item, targetVersion)) {
      continue;
    }

    // Intentional removal of versions and versionDropdown properties
    const {
      versions: _versions,
      versionDropdown: _versionDropdown,
      url,
      contentSite: _contentSite,
      ...rest
    } = item;

    const newItem: TocItemLoose = {
      ...rest,
      ...(!item.isExternal && { contentSite: targetContentSite }),
      ...(url && { url: url.replace(/:version/g, targetVersion) }),
    };

    // Recursively filter children
    if (item.items && item.items.length > 0) {
      const filteredChildren = filterTocItems(
        item.items,
        targetVersion,
        targetContentSite,
      );

      if (filteredChildren.length > 0) {
        newItem.items = filteredChildren;
      } else if (item.group || item.collapsible) {
        // If a group or collapsible has no children after filtering, skip it
        continue;
      }
    }

    result.push(newItem);
  }

  return result;
}

/**
 * Finds ALL top-level TOC group items that contain the target contentSite (with associated version).
 * This looks for items with versionDropdown: true (in theory if a L1 were to be versioned)
 * or group: true with the matching contentSite.
 */

// TODO: this should be if any of the groups items have the content site in it
function findAllAssociatedGroups(
  items: (TocItem | L1TocItem | TocItemLoose)[],
  targetContentSite: string,
): TocItemLoose[] {
  const results: TocItemLoose[] = [];

  for (const item of items) {
    const typedItem = item;

    // Check if this is a group for our contentSite
    if (
      typedItem.contentSite === targetContentSite &&
      (typedItem.versionDropdown || typedItem.group)
    ) {
      results.push(typedItem);
    }

    // Also search in children for nested groups
    if (typedItem.items) {
      const childResults = findAllAssociatedGroups(
        typedItem.items,
        targetContentSite,
      );
      results.push(...childResults);
    }
  }

  return results;
}

/**
 * Generates properly formatted TypeScript code for the TOC items.
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

  if (item.isExternal) {
    lines.push(`${innerSpaces}isExternal: true,`);
  }

  if (item.url) {
    lines.push(`${innerSpaces}url: '${item.url}',`);
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
 * Generates the TypeScript file content for the legacy TOC.
 */
function generateTypeScriptContent(
  contentSite: string,
  version: string,
  tocItems: TocItemLoose[],
  offline?: boolean,
): string {
  const itemsFormatted = tocItems
    .map((item) => formatTocItem(item, 3))
    .join(',\n');

  const label = offline ? 'Offline Docs' : 'Legacy Docs';

  return `import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: '${label}',
    contentSite: '${contentSite}',
    url: '/docs/${contentSite}/${version}/',
    items: [
${itemsFormatted},
    ],
  },
];
`;
}

/**
 * Main function to generate the legacy TOC file.
 */
async function generateLegacyToc(options: CommandLineOptions): Promise<void> {
  const { contentSite, version, offline } = options;

  console.log(`\n Searching for TOC groups with contentSite: ${contentSite}`);

  // Find ALL group items for this contentSite
  const AssossiatedGroups = findAllAssociatedGroups(toc, contentSite);

  if (AssossiatedGroups.length === 0) {
    console.error(`   No TOC groups found for contentSite: ${contentSite}`);
    console.error(
      `   Make sure there's a group item with contentSite: '${contentSite}'`,
    );
    process.exit(1);
  }

  console.log(`Found ${AssossiatedGroups.length} group(s):`);
  for (const group of AssossiatedGroups) {
    console.log(`   - "${group.label}"`);
  }

  // Filter items based on version for each group
  console.log(` Filtering for version: ${version}`);

  const wrappedItems: TocItemLoose[] = [];
  let totalItems = 0;

  for (const group of AssossiatedGroups) {
    // Filter this group's items
    const filteredItems = filterTocItems(
      group.items || [],
      version,
      contentSite,
    );

    if (filteredItems.length > 0) {
      console.log(` "${group.label}": ${filteredItems.length} item(s)`);
      totalItems += filteredItems.length;

      // Wrap the filtered items in the group structure
      wrappedItems.push({
        label: group.label,
        contentSite: group.contentSite,
        group: true,
        // Remove versionDropdown for legacy docs
        items: filteredItems,
      });
    } else {
      console.log(` "${group.label}": 0 items (skipped)`);
    }
  }

  if (wrappedItems.length === 0) {
    console.error(
      `\n No TOC items remain after filtering for version: ${version}`,
    );
    process.exit(1);
  }

  console.log(
    `\n Total: ${totalItems} item(s) across ${wrappedItems.length} group(s)`,
  );

  // Generate TypeScript content
  const tsContent = generateTypeScriptContent(
    contentSite,
    version,
    wrappedItems,
    offline,
  );

  // Write to file
  // TODO: DOP-6536 when porting over this directory, update the path to the legacy-docs directory
  const outputDir = path.join(
    __dirname,
    '../../platform/docs-nextjs/src/context/table-of-contents/legacy-docs',
  );
  const outputFile = path.join(outputDir, `${contentSite}-${version}.ts`);

  // Ensure the legacy-docs directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, tsContent, 'utf-8');

  console.log(`Legacy TOC file created: ${outputFile}`);
}

// Parse commandline arguments
const argv = yargs(hideBin(process.argv))
  .version(false) // Disable built-in version to use --version for our flag
  .option('contentSite', {
    type: 'string',
    description: 'The contentSite to filter for (e.g., kafka-connector)',
    demandOption: true,
  })
  .option('version', {
    type: 'string',
    description: 'The version to filter for (e.g., v1.12)',
    demandOption: true,
  })
  .option('offline', {
    type: 'boolean',
    description: 'Use "Offline Docs" label instead of "Legacy Docs"',
    default: false,
  })
  .usage(
    'Usage: $0 --contentSite=<contentSite> --version=<version> [--offline]',
  )
  .example(
    '$0 --contentSite=kafka-connector --version=v1.12',
    'Generate legacy TOC for Kafka Connector v1.12',
  )
  .example(
    '$0 --contentSite=kafka-connector --version=v1.12 --offline',
    'Generate offline TOC for Kafka Connector v1.12',
  )
  .help()
  .strict()
  .parseSync();

// Run the generator
generateLegacyToc({
  contentSite: argv.contentSite,
  version: argv.version,
  offline: argv.offline,
});
