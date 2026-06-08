/**
 * MongoCLI commands generation script
 * Generates TypeScript files for table of contents from MongoCLI repository
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { TocItem } from "../../table-of-contents/types/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CommandTree {
  [key: string]: CommandTree | null;
}

interface CommandLineArgs {
  tagOrBranch: string;
}

function parseCommandLineArgs(): CommandLineArgs {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: tsx generate-mongocli-commands.ts <mongocli-tag>');
    console.error('Example: tsx generate-mongocli-commands.ts mongocli/v2.0.7');
    console.error('Note: Use MongoCLI release tags (mongocli/vX.Y.Z), not main branch');
    process.exit(1);
  }

  const tagOrBranch = args[0];

  if (!tagOrBranch.startsWith('mongocli/v') && tagOrBranch !== 'main' && tagOrBranch !== 'master') {
    console.error('❌ Error: Please use a MongoCLI release tag (e.g., mongocli/v2.0.7)');
    console.error('   You can find available tags at: https://github.com/mongodb/mongodb-cli/tags');
    process.exit(1);
  }

  return { tagOrBranch };
}

async function runCommand(command: string, options?: { cwd?: string }): Promise<string> {
  const { exec } = await import('child_process');
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Command failed: ${command}\nError: ${error.message}\nStderr: ${stderr}`));
        return;
      }
      resolve(stdout.toString().trim());
    });
  });
}

async function runFixersScript(scope: string): Promise<void> {
  const fixersScript = path.join(__dirname, 'run-all-fixers.py');

  if (!fs.existsSync(fixersScript)) {
    console.log('⚠️  Fixers script not found, skipping fixers step');
    return;
  }

  console.log(`🔧 Running fixers script on ${scope}...`);

  try {
    const command = `python3 "${fixersScript}" --apply --scope "${scope}"`;
    const output = await runCommand(command);

    if (output) {
      console.log('🔧 Fixers output:', output);
    }
    console.log('✅ Fixers script completed successfully');
  } catch (error) {
    console.warn('⚠️  Fixers script failed, but continuing:', (error as Error).message);
  }
}

async function copyCommandFilesFromGit(tagOrBranch: string): Promise<string[]> {
  const tempDir = path.join(__dirname, 'temp-mongocli-repo');
  const upcomingCommandDir = path.join(__dirname, '../../mongocli/upcoming/source/command');
  const currentCommandDir = path.join(__dirname, '../../mongocli/current/source/command');

  try {
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }

    const repoUrl = 'https://github.com/mongodb/mongodb-cli.git';
    console.log(`🔗 Cloning ${repoUrl} (${tagOrBranch})...`);
    await runCommand(`git clone --depth 1 --branch "${tagOrBranch}" "${repoUrl}" "${tempDir}"`);

    const sourceCommandDir = path.join(tempDir, 'docs', 'command');
    if (!fs.existsSync(sourceCommandDir)) {
      throw new Error(`Command directory not found: ${sourceCommandDir}`);
    }

    // Run fixers on the cloned command files before copying to destinations
    await runFixersScript(sourceCommandDir);

    fs.mkdirSync(upcomingCommandDir, { recursive: true });
    fs.mkdirSync(currentCommandDir, { recursive: true });

    const files = getFilesRecursively(sourceCommandDir, [])
      .filter(file => file.endsWith('.txt'));

    console.log(`📄 Found ${files.length} command files to copy`);

    const copiedUpcoming = new Set<string>();
    const copiedCurrent = new Set<string>();

    for (const sourceFile of files) {
      const fileName = path.relative(sourceCommandDir, sourceFile).replace(/\//g, '-');
      const upcomingDestFile = path.join(upcomingCommandDir, fileName);
      const currentDestFile = path.join(currentCommandDir, fileName);

      const content = fs.readFileSync(sourceFile, 'utf8');
      fs.writeFileSync(upcomingDestFile, content, 'utf8');
      fs.writeFileSync(currentDestFile, content, 'utf8');

      copiedUpcoming.add(fileName);
      copiedCurrent.add(fileName);
    }

    function deleteExtraFiles(destDir: string, validFiles: Set<string>) {
      if (!fs.existsSync(destDir)) return;
      const dirFiles = fs.readdirSync(destDir);
      for (const file of dirFiles) {
        const filePath = path.join(destDir, file);
        if (fs.statSync(filePath).isFile() && !validFiles.has(file)) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Deleted extra file: ${filePath}`);
        }
      }
    }
    deleteExtraFiles(upcomingCommandDir, copiedUpcoming);
    deleteExtraFiles(currentCommandDir, copiedCurrent);

    console.log(`✅ Copied ${files.length} command files to upcoming directory`);
    console.log(`✅ Copied ${files.length} command files to current directory`);
    return files.map(file => path.relative(sourceCommandDir, file).replace(/\//g, '-'));

  } finally {
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
  }
}

function getFilesRecursively(dir: string, fileList: string[]): string[] {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}

interface DirectoryInventory {
  inventory: Map<string, string[]>;
  allVersions: string[];
}

function takeDirectoryInventory(): DirectoryInventory {
  console.log('\n📋 Taking inventory of files across all version directories...');

  const mongocliContentDir = path.join(__dirname, '../../mongocli');
  const fileInventory = new Map<string, string[]>();

  const versionDirs: string[] = [];
  if (fs.existsSync(mongocliContentDir)) {
    const entries = fs.readdirSync(mongocliContentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const commandDir = path.join(mongocliContentDir, entry.name, 'source', 'command');
        // Only count as a version dir if it has a real (non-symlink) command directory
        if (fs.existsSync(commandDir) && !fs.lstatSync(commandDir).isSymbolicLink()) {
          versionDirs.push(entry.name);
        }
      }
    }
  }

  console.log(`📁 Found version directories: ${versionDirs.join(', ')}`);

  const allFiles = new Set<string>();
  for (const version of versionDirs) {
    const commandDir = path.join(mongocliContentDir, version, 'source', 'command');
    const versionFiles = getFilesRecursively(commandDir, [])
      .map(file => path.relative(commandDir, file))
      .filter(file => file.endsWith('.txt'));

    versionFiles.forEach(file => allFiles.add(file.replace(/\//g, '-')));
  }

  for (const fileName of allFiles) {
    const availableVersions: string[] = [];

    for (const version of versionDirs) {
      const commandDir = path.join(mongocliContentDir, version, 'source', 'command');
      const filePath = path.join(commandDir, fileName);

      if (fs.existsSync(filePath)) {
        availableVersions.push(version);
      }
    }

    fileInventory.set(fileName, availableVersions);
  }

  console.log(`✅ Inventory complete: ${allFiles.size} unique files across ${versionDirs.length} versions`);
  return { inventory: fileInventory, allVersions: versionDirs };
}

function createHierarchicalStructure(files: string[]): CommandTree {
  const tree: CommandTree = {};

  // Known compound command names that should not be split on hyphens
  const compoundCommands = ['dry-run', 'cloud-manager', 'ops-manager'];

  for (const file of files) {
    let commandName = file.replace(/\.txt$/, '');

    const placeholders: { placeholder: string; original: string }[] = [];
    for (let i = 0; i < compoundCommands.length; i++) {
      const compound = compoundCommands[i];
      if (commandName.includes(compound)) {
        const placeholder = `__COMPOUND${i}__`;
        placeholders.push({ placeholder, original: compound });
        commandName = commandName.replace(compound, placeholder);
      }
    }

    let commandPath = commandName.split('-');

    if (placeholders.length > 0) {
      commandPath = commandPath.map(part => {
        for (const { placeholder, original } of placeholders) {
          if (part === placeholder) {
            return original;
          }
        }
        return part;
      });
    }

    let currentLevel = tree;

    for (let i = 0; i < commandPath.length; i++) {
      const part = commandPath[i];

      if (i === commandPath.length - 1) {
        if (!(part in currentLevel) || currentLevel[part] === null) {
          currentLevel[part] = null;
        }
      } else {
        if (!(part in currentLevel) || currentLevel[part] === null) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as CommandTree;
      }
    }
  }

  return tree;
}

function treeToArray(
  tree: CommandTree,
  basePath: string = '',
  versionAvailability?: Map<string, string[]>,
  allVersions?: string[]
): TocItem[] {
  const items: TocItem[] = [];

  for (const [key, value] of Object.entries(tree)) {
    const currentPath = basePath ? `${basePath}-${key}` : key;

    if (value === null) {
      const versions = versionAvailability?.get(`${currentPath}.txt`) || [];
      // Only add version constraint if file is missing from some known versions
      const needsConstraint = allVersions && versions.length > 0 && versions.length < allVersions.length;
      const versionConstraint = needsConstraint ? { includes: versions } : undefined;

      const item: TocItem = {
        label: key.replace(/-/g, ' '),
        contentSite: 'mongocli' as const,
        url: `/docs/mongocli/:version/command/${currentPath}/`,
      };

      if (versionConstraint) {
        item.versions = versionConstraint;
      }

      items.push(item);
    } else {
      const subItems = treeToArray(value, currentPath, versionAvailability, allVersions);

      // Collect all versions from children to determine parent's version availability
      const childVersions = new Set<string>();
      function collectVersionsFromChildren(tocItems: TocItem[]) {
        for (const tocItem of tocItems) {
          if (tocItem.versions?.includes) {
            tocItem.versions.includes.forEach(v => childVersions.add(v));
          }
          if (tocItem.items) {
            collectVersionsFromChildren(tocItem.items);
          }
        }
      }
      collectVersionsFromChildren(subItems);

      const parentOwnVersions = versionAvailability?.get(`${currentPath}.txt`) || [];
      parentOwnVersions.forEach(v => childVersions.add(v));

      const parentVersions = Array.from(childVersions).sort();
      const needsParentConstraint = allVersions && parentVersions.length > 0 && parentVersions.length < allVersions.length;
      const parentVersionConstraint = needsParentConstraint ? { includes: parentVersions } : undefined;

      const item: TocItem = {
        label: key.replace(/-/g, ' '),
        contentSite: 'mongocli' as const,
        url: `/docs/mongocli/:version/command/${currentPath}/`,
        collapsible: true,
        items: subItems,
        ...(parentVersionConstraint && { versions: parentVersionConstraint }),
      };

      items.push(item);
    }
  }

  items.sort((a, b) => a.label.localeCompare(b.label));
  return items;
}

function formatAsTypeScript(commandsArray: TocItem[], tagOrBranch: string): string {
  return `/**
 * MongoCLI Commands Table of Contents
 * Generated automatically from MongoDB CLI repository
 * Source: mongodb/mongodb-cli repository (${tagOrBranch})
 *
 * DO NOT EDIT MANUALLY - this file is auto-generated
 * To regenerate: run the mongocli-commands generation script
 */

import type { TocItem } from "../types";

export const mongocliCommands: TocItem[] = ${JSON.stringify(commandsArray, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
}

async function main() {
  const { tagOrBranch } = parseCommandLineArgs();

  console.log('🚀 Starting MongoCLI commands generation...');
  console.log(`📁 Tag/Branch: ${tagOrBranch}`);

  try {
    // Step 1: Copy command files from repository to upcoming and current
    const repositoryFiles = await copyCommandFilesFromGit(tagOrBranch);
    console.log(`✅ Copied ${repositoryFiles.length} repository files`);

    // Step 2: Take inventory of files across version directories
    const { inventory: fileInventory, allVersions } = takeDirectoryInventory();

    // Step 3: Build TOC file list
    const allTocFiles: string[] = Array.from(fileInventory.keys());
    console.log(`📊 Total files for TOC generation: ${allTocFiles.length}`);

    // Step 4: Create hierarchical structure
    const commandTree = createHierarchicalStructure(allTocFiles);
    console.log(`🌳 Tree structure created with ${Object.keys(commandTree).length} top-level keys`);
    console.log(`🔍 Top-level keys: ${Object.keys(commandTree).join(', ')}`);

    // Step 5: Convert tree to array format
    const commands = treeToArray(commandTree, '', fileInventory, allVersions);
    console.log(`📋 Commands converted to array format: ${commands.length} top-level commands`);

    // Step 6: Generate TypeScript code
    const typescriptCode = formatAsTypeScript(commands, tagOrBranch);

    // Step 7: Write output file
    const outputPath = path.join(__dirname, '../../table-of-contents/docset-data/mongocli-commands.ts');
    fs.writeFileSync(outputPath, typescriptCode, 'utf8');

    console.log(`\n✅ Successfully generated ${outputPath}`);

    const totalCommands = commands.reduce((count: number, item: TocItem) => {
      function countCommands(tocItems: TocItem[]): number {
        let n = 0;
        for (const tocItem of tocItems) {
          n++;
          if (tocItem.items) n += countCommands(tocItem.items);
        }
        return n;
      }
      return count + countCommands([item]);
    }, 0);

    console.log(`📊 Top-level command groups: ${commands.length}`);
    console.log(`📊 Total commands generated: ${totalCommands}`);

    // Create summary file
    const summaryPath = path.join(__dirname, 'generation-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify({
      tagOrBranch,
      generatedAt: new Date().toISOString(),
      totalFiles: repositoryFiles.length,
      totalCommands,
      topLevelGroups: commands.length,
      outputFile: outputPath,
    }, null, 2), 'utf8');
    console.log(`📋 Created summary: ${summaryPath}`);

    // Run pnpm check:fix on table-of-contents
    console.log('\n🔧 Running pnpm check:fix on table-of-contents...');
    try {
      const tocDir = path.join(__dirname, '../../table-of-contents');
      await runCommand('pnpm check:fix', { cwd: tocDir });
      console.log('✅ check:fix completed successfully');
    } catch (error) {
      console.warn('⚠️  check:fix failed:', (error as Error).message);
      console.warn('   You may need to run it manually: cd content/table-of-contents && pnpm check:fix');
    }

    console.log('\n📝 To use these commands in the main mongocli.ts file:');
    console.log('   1. Add this import at the top:');
    console.log('      import { mongocliCommands } from \'./mongocli-commands\';');
    console.log('   2. Replace the Commands section items with:');
    console.log('      items: mongocliCommands');

  } catch (error) {
    console.error('❌ Error generating command list:', (error as Error).message);

    if ((error as Error).message.includes('Command failed: git clone')) {
      console.error(`\n💡 Suggestion: The tag/branch '${tagOrBranch}' might not exist.`);
      console.error('   Check available tags at: https://github.com/mongodb/mongodb-cli/tags');
    }

    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export {
  main,
  copyCommandFilesFromGit,
  runCommand,
  runFixersScript,
  getFilesRecursively,
  createHierarchicalStructure,
  treeToArray,
  formatAsTypeScript,
  takeDirectoryInventory,
  parseCommandLineArgs,
};
