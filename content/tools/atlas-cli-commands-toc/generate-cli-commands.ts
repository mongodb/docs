/**
 * Atlas CLI commands generation script
 * Generates TypeScript files for table of contents from Atlas CLI repository
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
  promoteVersion?: string;
}

/**
 * Parse command line arguments
 */
function parseCommandLineArgs(): CommandLineArgs {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: tsx generate-cli-commands.ts <atlas-cli-tag> [--promote-version <version>]');
    console.error('Example: tsx generate-cli-commands.ts atlascli/v1.46.4');
    console.error('Example: tsx generate-cli-commands.ts atlascli/v1.46.4 --promote-version v1.46');
    console.error('Note: Use atlas CLI release tags (atlascli/vX.Y.Z), not master branch');
    process.exit(1);
  }

  const tagOrBranch = args[0];
  
  // Validate that it looks like an atlas CLI tag
  if (!tagOrBranch.startsWith('atlascli/v') && tagOrBranch !== 'master') {
    console.error('❌ Error: Please use an Atlas CLI release tag (e.g., atlascli/v1.46.4)');
    console.error('   You can find available tags at: https://github.com/mongodb/mongodb-atlas-cli/tags');
    process.exit(1);
  }
  let promoteVersion: string | undefined;

  // Check for --promote-version flag
  const promoteIndex = args.indexOf('--promote-version');
  if (promoteIndex !== -1 && promoteIndex + 1 < args.length) {
    promoteVersion = args[promoteIndex + 1];
  }

  return { tagOrBranch, promoteVersion };
}

/**
 * Execute a shell command and return the output
 */
async function runCommand(command: string): Promise<string> {
  const { exec } = await import('child_process');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Command failed: ${command}\nError: ${error.message}\nStderr: ${stderr}`));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

/**
 * Handle directory structure for version promotion or normal operation
 */
async function handleDirectoryStructure(tagOrBranch: string, isVersionPromotion: boolean, newVersionName: string): Promise<string[]> {
  if (isVersionPromotion) {
    console.log(`\n🔄 Version promotion mode: Restructuring directories...`);
    
    // Step 1: Move current → new version
    const currentDir = path.join(__dirname, '../../atlas-cli/current');
    const newVersionDir = path.join(__dirname, '../../atlas-cli', newVersionName);
    
    if (fs.existsSync(currentDir)) {
      if (fs.existsSync(newVersionDir)) {
        console.log(`⚠️  Directory ${newVersionName} already exists, removing...`);
        await runCommand(`rm -rf "${newVersionDir}"`);
      }
      await runCommand(`cp -r "${currentDir}" "${newVersionDir}"`);
      console.log(`✅ Moved current → ${newVersionName}`);
    }
    
    // Step 2: Move upcoming → current
    const upcomingDir = path.join(__dirname, '../../atlas-cli/upcoming');
    if (fs.existsSync(upcomingDir)) {
      await runCommand(`rm -rf "${currentDir}"`);
      await runCommand(`cp -r "${upcomingDir}" "${currentDir}"`);
      console.log(`✅ Moved upcoming → current`);
    }
    
    // Step 3: Copy repository files to new upcoming
    const files = await copyCommandFilesFromGit(tagOrBranch);
    console.log(`✅ Populated upcoming with ${files.length} repository files`);
    
    return files;
  } else {
    console.log(`\n📁 Normal mode: Copying repository files to upcoming and current...`);
    // Normal operation: just copy files to upcoming and current
    const files = await copyCommandFilesFromGit(tagOrBranch);
    return files;
  }
}

/**
 * Take inventory of files across all version directories
 */
function takeDirectoryInventory(): Map<string, string[]> {
  console.log('\n📋 Taking inventory of files across all version directories...');
  
  const atlasCliContentDir = path.join(__dirname, '../../atlas-cli');
  const fileInventory = new Map<string, string[]>();
  
  // Get all version directories
  const versionDirs: string[] = [];
  if (fs.existsSync(atlasCliContentDir)) {
    const entries = fs.readdirSync(atlasCliContentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        versionDirs.push(entry.name);
      }
    }
  }
  
  console.log(`📁 Found version directories: ${versionDirs.join(', ')}`);
  
  // Get all unique files across all versions
  const allFiles = new Set<string>();
  for (const version of versionDirs) {
    const commandDir = path.join(atlasCliContentDir, version, 'source', 'command');
    if (fs.existsSync(commandDir)) {
      const versionFiles = getFilesRecursively(commandDir, [])
        .map(file => path.relative(commandDir, file))
        .filter(file => file.endsWith('.txt') && !file.toLowerCase().includes('serverless'));
      
      versionFiles.forEach(file => allFiles.add(file));
    }
  }
  
  // For each file, determine which versions contain it
  for (const file of allFiles) {
    const fileName = file.replace(/\//g, '-');
    const availableVersions: string[] = [];
    
    for (const version of versionDirs) {
      const commandDir = path.join(atlasCliContentDir, version, 'source', 'command');
      const filePath = path.join(commandDir, fileName);
      
      if (fs.existsSync(filePath)) {
        availableVersions.push(version);
      }
    }
    
    fileInventory.set(fileName, availableVersions);
    console.log(`📄 ${fileName}: ${availableVersions.join(', ')}`);
  }
  
  console.log(`✅ Inventory complete: ${allFiles.size} unique files across ${versionDirs.length} versions`);
  return fileInventory;
}

/**
 * Copy command files from Git repository to upcoming and current directory
 */
async function copyCommandFilesFromGit(tagOrBranch: string): Promise<string[]> {
  const tempDir = path.join(__dirname, 'temp-atlas-cli-repo');
  const upcomingCommandDir = path.join(__dirname, '../../atlas-cli/upcoming/source/command');
  const currentCommandDir = path.join(__dirname, '../../atlas-cli/current/source/command');
  const atlasCommandDir = path.join(__dirname, '../../atlas/source/includes/command');
  
  try {
    // Clean up any existing temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
    
    // Clone the repository
    const repoUrl = 'https://github.com/mongodb/mongodb-atlas-cli.git';
    console.log(`🔗 Cloning ${repoUrl} (${tagOrBranch})...`);
    await runCommand(`git clone --depth 1 --branch "${tagOrBranch}" "${repoUrl}" "${tempDir}"`);
    
    // Ensure destination directories exist
    fs.mkdirSync(upcomingCommandDir, { recursive: true });
    fs.mkdirSync(currentCommandDir, { recursive: true });
    fs.mkdirSync(atlasCommandDir, { recursive: true });
    
    // Copy command files from repository
    const sourceCommandDir = path.join(tempDir, 'docs', 'command');
    if (!fs.existsSync(sourceCommandDir)) {
      throw new Error(`Command directory not found: ${sourceCommandDir}`);
    }

    const files = getFilesRecursively(sourceCommandDir, [])
      .filter(file => file.endsWith('.txt') && !file.toLowerCase().includes('serverless'));

    console.log(`📄 Found ${files.length} command files to copy`);

    // Track copied filenames for each destination
    const copiedUpcoming = new Set<string>();
    const copiedCurrent = new Set<string>();
    const copiedAtlas = new Set<string>();

    // Copy each file to both atlas-cli and atlas directories, cleaning serverless references
    let serverlessCleanedCount = 0;
    for (const sourceFile of files) {
      const fileName = path.relative(sourceCommandDir, sourceFile).replace(/\//g, '-');
      const atlasCliDestFile = path.join(upcomingCommandDir, fileName);
      const currentDestFile = path.join(currentCommandDir, fileName);

      // For atlas directory, rename .txt files to .rst
      const atlasFileName = fileName.replace(/\.txt$/, '.rst');
      const atlasDestFile = path.join(atlasCommandDir, atlasFileName);

      // Ensure destination directories exist
      fs.mkdirSync(path.dirname(atlasCliDestFile), { recursive: true });
      fs.mkdirSync(path.dirname(currentDestFile), { recursive: true });
      fs.mkdirSync(path.dirname(atlasDestFile), { recursive: true });

      // Read, clean, and write file content
      let content = fs.readFileSync(sourceFile, 'utf8');
      const originalContent = content;
      content = cleanServerlessReferences(content, fileName);

      if (content !== originalContent) {
        serverlessCleanedCount++;
      }

      // Write to both destinations
      fs.writeFileSync(atlasCliDestFile, content, 'utf8');
      fs.writeFileSync(currentDestFile, content, 'utf8');
      fs.writeFileSync(atlasDestFile, content, 'utf8');

      copiedUpcoming.add(fileName);
      copiedCurrent.add(fileName);
      copiedAtlas.add(atlasFileName);
    }

    // Delete any files in the destination directories that were not present in the repo
    function deleteExtraFiles(destDir: string, validFiles: Set<string>) {
      if (!fs.existsSync(destDir)) return;
      const files = fs.readdirSync(destDir);
      for (const file of files) {
        const filePath = path.join(destDir, file);
        // Do not delete kubernetes command files
        if (fs.statSync(filePath).isFile() && !validFiles.has(file) && !file.toLowerCase().includes('kubernetes')) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Deleted extra file: ${filePath}`);
        }
      }
    }
    deleteExtraFiles(upcomingCommandDir, copiedUpcoming);
    deleteExtraFiles(currentCommandDir, copiedCurrent);
    // commenting out Atlas removals. We might remove files here that are still used
    // and don't want to introduce errors into Atlas build.
    // revisit later for way to capture list of files and notify writing team
    //  deleteExtraFiles(atlasCommandDir, copiedAtlas);

    console.log(`✅ Copied ${files.length} command files to upcoming directory`);
    console.log(`✅ Copied ${files.length} command files to current directory`);
    console.log(`✅ Copied ${files.length} command files to atlas directory (with .rst extensions)`);
    if (serverlessCleanedCount > 0) {
      console.log(`🧹 Cleaned serverless references from ${serverlessCleanedCount} files`);
    }
    return files.map(file => path.relative(sourceCommandDir, file).replace(/\//g, '-'));
    
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
  }
}

/**
 * Get files recursively from a directory
 */
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

/**
 * Clean serverless references from file content
 * Removes toctree entries and reference links for serverless commands
 */
function cleanServerlessReferences(content: string, fileName?: string): string {
  let cleaned = content;
  let hasChanges = false;
  
  // Remove serverless toctree entries
  // This pattern matches lines in toctree that contain serverless commands
  const serverlessToctreePatterns = [
    /^\s+\w*[Ss]erverless\w*\s+<\/command\/.*>\s*$/gm,
    /^\s+.*[Ss]erverless.*\s+<\/command\/.*>\s*$/gm
  ];
  
  serverlessToctreePatterns.forEach(pattern => {
    const matches = cleaned.match(pattern);
    if (matches) {
      console.log(`  🧹 Removing ${matches.length} serverless toctree entries from ${fileName || 'file'}`);
      cleaned = cleaned.replace(pattern, '');
      hasChanges = true;
    }
  });
  
  // Remove serverless reference links 
  // Pattern: * :ref:`atlas-api-*-*Serverless*` - description
  const serverlessRefPatterns = [
    /^\s*\*\s+:ref:`[^`]*[Ss]erverless[^`]*`[^\n]*$/gm,
    /^\s*\*\s+:ref:`[^`]*[Ss]erverless[^`]*`[^\n]*\n/gm
  ];
  
  serverlessRefPatterns.forEach(pattern => {
    const matches = cleaned.match(pattern);
    if (matches) {
      console.log(`  🧹 Removing ${matches.length} serverless reference links from ${fileName || 'file'}`);
      cleaned = cleaned.replace(pattern, '');
      hasChanges = true;
    }
  });
  
  // Clean up any double empty lines left by removals
  if (hasChanges) {
    cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');
  }
  
  return cleaned;
}

/**
 * Copy examples directory from Git repository
 */
async function copyExamplesFromGit(tagOrBranch: string): Promise<void> {
  const tempDir = path.join(__dirname, 'temp-atlas-cli-repo-examples');
  const upcomingExamplesDir = path.join(__dirname, '../../atlas-cli/upcoming/source/includes/examples');
  const currentExamplesDir = path.join(__dirname, '../../atlas-cli/current/source/includes/examples');
  const atlasExamplesDir = path.join(__dirname, '../../atlas/source/includes/examples');
  
  try {
    // Clean up any existing temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
    
    // Clone the repository
    const repoUrl = 'https://github.com/mongodb/mongodb-atlas-cli.git';
    console.log(`🔗 Cloning ${repoUrl} (${tagOrBranch}) for examples...`);
    await runCommand(`git clone --depth 1 --branch "${tagOrBranch}" "${repoUrl}" "${tempDir}"`);
    
    // Copy examples directory from the cloned repo if it exists
    const sourceExamplesDir = path.join(tempDir, 'docs', 'command', 'includes');
    if (!fs.existsSync(sourceExamplesDir)) {
      console.log(`ℹ️  No examples directory found in repository`);
      return;
    }

    // Ensure destination directories exist; do NOT delete existing files
    fs.mkdirSync(upcomingExamplesDir, { recursive: true });
    fs.mkdirSync(currentExamplesDir, { recursive: true });
    fs.mkdirSync(atlasExamplesDir, { recursive: true });

    // Get all example files from the cloned repo
    const files = getFilesRecursively(sourceExamplesDir, []);
    console.log(`📁 Found ${files.length} example files in the repository`);

    if (files.length === 0) {
      console.log(`ℹ️  No example files to copy`);
      return;
    }

    // Non-destructive copy: overwrite/create files that exist in the repo,
    // but do not remove any files that exist in the destination but are missing
    // from the repo.
    let copiedCount = 0;
    for (const file of files) {
      const relativePath = path.relative(sourceExamplesDir, file);
      const atlasCliPath = path.join(upcomingExamplesDir, relativePath);
      const atlasPath = path.join(atlasExamplesDir, relativePath);
      const currentDestFile = path.join(currentExamplesDir, relativePath);

      fs.mkdirSync(path.dirname(atlasCliPath), { recursive: true });
      fs.mkdirSync(path.dirname(atlasPath), { recursive: true });
      fs.mkdirSync(path.dirname(currentDestFile), { recursive: true });

      const content = fs.readFileSync(file, 'utf8');
      fs.writeFileSync(atlasCliPath, content, 'utf8');
      fs.writeFileSync(atlasPath, content, 'utf8');
      fs.writeFileSync(currentDestFile, content, 'utf8');
      copiedCount++;
    }

    console.log(`✅ Copied ${copiedCount} example files to atlas-cli directory (non-destructive)`);
    console.log(`✅ Copied ${copiedCount} example files to atlas directory (non-destructive)`);
    console.log(`✅ Copied ${copiedCount} example files to current directory (non-destructive)`);
    
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
  }
}

/**
 * Create hierarchical structure from file list  
 */
function createHierarchicalStructure(files: string[], versionAvailability?: Map<string, string[]>): CommandTree {
  const tree: CommandTree = {};
  
  for (const file of files) {
    // Remove .txt extension and split by hyphens
    const commandPath = file.replace(/\.txt$/, '').split('-');
    let currentLevel = tree;
    
    // Build the tree structure
    for (let i = 0; i < commandPath.length; i++) {
      const part = commandPath[i];
      
      if (i === commandPath.length - 1) {
        // This is the final command - set it to null to indicate it's an endpoint
        // BUT: only if it doesn't already exist as a parent object with children
        if (!(part in currentLevel) || currentLevel[part] === null) {
          currentLevel[part] = null;
        }
        // Don't overwrite existing parent objects - this file represents a parent command
        // that also has sub-commands
      } else {
        // This is a parent command - create object if it doesn't exist
        if (!(part in currentLevel) || currentLevel[part] === null) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as CommandTree;
      }
    }
  }
  
  return tree;
}

/**
 * Convert command tree to array format for ToC
 */
function treeToArray(tree: CommandTree, basePath: string = '', versionAvailability?: Map<string, string[]>): TocItem[] {
  const items: TocItem[] = [];
  
  for (const [key, value] of Object.entries(tree)) {
    const currentPath = basePath ? `${basePath}-${key}` : key;
    
    if (value === null) {
      // This is a command file
      const versions = versionAvailability?.get(`${currentPath}.txt`) || [];
      const versionConstraint = versions.length > 0 ? { includes: versions } : undefined;
      
      items.push({
        label: key.replace(/-/g, ' '),
        contentSite: "atlas-cli" as const,
        url: `/docs/atlas/cli/:version/command/${currentPath}/`,
        ...(versionConstraint && { versions: versionConstraint })
      });
    } else {
      // This is a parent command with sub-commands
      const subItems = treeToArray(value, currentPath, versionAvailability);
      items.push({
        label: key.replace(/-/g, ' '),
        contentSite: "atlas-cli" as const,
        url: `/docs/atlas/cli/:version/command/${currentPath}/`,
        collapsible: true,
        items: subItems
      });
    }
  }
  
  // Sort items alphabetically by label
  items.sort((a, b) => a.label.localeCompare(b.label));
  return items;
}

/**
 * Format commands as TypeScript code
 */
function formatAsTypeScript(commandsArray: TocItem[], tagOrBranch: string): string {
  return `/**
 * Atlas CLI Commands Table of Contents
 * Generated automatically from MongoDB Atlas CLI repository
 * Source: mongodb/mongodb-atlas-cli repository (${tagOrBranch})
 * 
 * DO NOT EDIT MANUALLY - this file is auto-generated
 * To regenerate: run the atlas-cli-commands generation script
 */

import type { TocItem } from "../types";

export const atlasCliCommands: TocItem[] = ${JSON.stringify(commandsArray, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
}

/**
 * Format separate command trees as TypeScript code
 */
function formatSeparateCommandsAsTypeScript(commandsArray: TocItem[], commandType: string, tagOrBranch: string): string {
  const exportName = commandType === 'API' ? 'atlasCliApiCommands' : 'atlasCliCoreCommands';
  const description = commandType === 'API' ? 'Atlas CLI API Commands' : 'Atlas CLI Core Commands';
  
  return `/**
 * ${description} Table of Contents
 * Generated automatically from MongoDB Atlas CLI repository
 * Source: mongodb/mongodb-atlas-cli repository (${tagOrBranch})
 * 
 * DO NOT EDIT MANUALLY - this file is auto-generated
 * To regenerate: run the atlas-cli-commands generation script
 */

import type { TocItem } from "../types";

export const ${exportName}: TocItem[] = ${JSON.stringify(commandsArray, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
}

/**
 * Load existing Kubernetes commands placeholder
 */
function loadExistingKubernetesCommands(): TocItem[] {
  // For now, return empty array - will be populated separately
  return [];
}

/**
 * Merge commands alphabetically
 */
function mergeCommands(mainCommands: TocItem[], k8sCommands: TocItem[]): TocItem[] {
  const allCommands = [...mainCommands, ...k8sCommands];
  allCommands.sort((a, b) => a.label.localeCompare(b.label));
  return allCommands;
}

/**
 * Main execution function
 */
async function main() {
  const args = parseCommandLineArgs();
  const { tagOrBranch, promoteVersion } = args;
  
  console.log('🚀 Starting MongoDB CLI commands generation...');
  console.log(`📁 Tag/Branch: ${tagOrBranch}`);
  if (promoteVersion) {
    console.log(`🔄 Version promotion mode: Will promote to ${promoteVersion}`);
  }

  try {
    // Step 1: Handle directory structure (promotion or normal operation)
    const repositoryFiles = await handleDirectoryStructure(tagOrBranch, !!promoteVersion, promoteVersion || '');
    console.log(`✅ Handled ${repositoryFiles.length} repository files`);

    // Step 2: Take inventory of all files across all version directories
    const fileInventory = takeDirectoryInventory();
    
    // Step 3: Process files for TOC generation
    const allTocFiles: string[] = Array.from(fileInventory.keys());
    console.log(`📊 Total files for TOC generation: ${allTocFiles.length}`);
    
    // Filter out files that exist only in upcoming - we want all commands in the TOC
    // For a complete TOC, we include all commands regardless of version
    console.log(`📋 Generating complete TOC with all commands (not just upcoming-only)`);
    
    // Step 4: Copy examples directory from repository  
    await copyExamplesFromGit(tagOrBranch);
    
    // Step 5: Separate files into API and non-API commands
    console.log(`🔍 Sample files being processed: ${allTocFiles.slice(0, 5).join(', ')}`);
    console.log(`📊 Total allTocFiles count: ${allTocFiles.length}`);
    console.log(`📊 First 10 files:`, allTocFiles.slice(0, 10));
    console.log(`🔍 Last 10 files:`, allTocFiles.slice(-10));
    
    // Separate API commands from other Atlas commands
    const apiFiles = allTocFiles.filter(file => file.startsWith('atlas-api-'));
    const nonApiFiles = allTocFiles.filter(file => !file.startsWith('atlas-api-'));
    
    console.log(`📊 API command files: ${apiFiles.length}`);
    console.log(`📊 Non-API command files: ${nonApiFiles.length}`);
    
    // Step 6: Create separate hierarchical structures
    const apiTree = createHierarchicalStructure(apiFiles, fileInventory);
    const nonApiTree = createHierarchicalStructure(nonApiFiles, fileInventory);
    
    console.log(`🌳 API Tree structure created with ${Object.keys(apiTree).length} top-level keys`);
    console.log(`🔍 API Top-level keys: ${Object.keys(apiTree).join(', ')}`);
    console.log(`🌳 Non-API Tree structure created with ${Object.keys(nonApiTree).length} top-level keys`);
    console.log(`🔍 Non-API Top-level keys: ${Object.keys(nonApiTree).join(', ')}`);
    
    // Convert trees to array format
    const apiCommands = treeToArray(apiTree, '', fileInventory);
    const nonApiCommands = treeToArray(nonApiTree, '', fileInventory);
    
    console.log(`📋 API commands converted to array format: ${apiCommands.length} top-level commands`);
    console.log(`📋 Non-API commands converted to array format: ${nonApiCommands.length} top-level commands`);
    
    // Restructure API commands: extract the 'api' items from under 'atlas' and make 'atlas-api' the top level
    let restructuredApiCommands: TocItem[] = [];
    if (apiCommands.length > 0 && apiCommands[0].label === 'atlas' && apiCommands[0].items) {
      const apiItems = apiCommands[0].items.find(item => item.label === 'api');
      if (apiItems && apiItems.items) {
        restructuredApiCommands = [{
          label: 'atlas api',
          contentSite: 'atlas-cli',
          url: '/docs/atlas/cli/:version/command/atlas-api/',
          collapsible: true,
          items: apiItems.items
        }];
      }
    }
    
    // Remove the 'api' node from non-API commands
    let cleanedNonApiCommands = nonApiCommands;
    if (nonApiCommands.length > 0 && nonApiCommands[0].label === 'atlas' && nonApiCommands[0].items) {
      const filteredItems = nonApiCommands[0].items.filter(item => item.label !== 'api');
      cleanedNonApiCommands = [{
        ...nonApiCommands[0],
        items: filteredItems
      }];
    }
    
    // Combine the restructured API commands with cleaned non-API commands
    const mainCommands = [...restructuredApiCommands, ...cleanedNonApiCommands];
    console.log(`📋 Total combined commands: ${mainCommands.length} top-level commands`);
    
    // Step 7: Fetch and process Kubernetes commands
    const k8sCommands = loadExistingKubernetesCommands();
    
    // Step 8: Merge commands alphabetically
    const allCommands = mergeCommands(mainCommands, k8sCommands);
    
    // Step 9: Generate TypeScript code for combined commands
    const typescriptCode = formatAsTypeScript(allCommands, tagOrBranch);
    
    // Step 10: Write main combined file
    const outputPath = path.join(__dirname, '../../table-of-contents/docset-data/atlas-cli-commands.ts');
    fs.writeFileSync(outputPath, typescriptCode, 'utf8');
    
    console.log(`\n✅ Successfully generated ${outputPath}`);
    console.log(`📊 Generated ${allCommands.length} top-level command groups`);
    
    // Count total commands
    const totalCommands = allCommands.reduce((count: number, item: TocItem) => {
      function countCommands(items: TocItem[]): number {
        let itemCount = 0;
        for (const item of items) {
          itemCount++;
          if (item.items) {
            itemCount += countCommands(item.items);
          }
        }
        return itemCount;
      }
      return count + countCommands([item]);
    }, 0);

    console.log(`📊 Total commands generated: ${totalCommands}`);
    console.log(`📊 API commands: ${apiCommands.length} top-level groups`);
    console.log(`📊 Core commands: ${nonApiCommands.length} top-level groups`);
    console.log(`📊 Including ${k8sCommands.length ? k8sCommands[0].items?.length || 0 : 0} Kubernetes plugin commands`);
    
    // Create summary file
    const summaryPath = path.join(__dirname, 'generation-summary.json');
    const summary = {
      tagOrBranch,
      promoteVersion: promoteVersion || null,
      generatedAt: new Date().toISOString(),
      totalFiles: repositoryFiles.length,
      apiFiles: apiFiles.length,
      coreFiles: nonApiFiles.length,
      totalCommands,
      topLevelGroups: allCommands.length,
      apiCommands: apiCommands.length,
      coreCommands: nonApiCommands.length,
      kubernetesCommands: k8sCommands.length ? k8sCommands[0].items?.length || 0 : 0,
      outputFiles: {
        combined: outputPath
      },
      sourceMethod: promoteVersion ? 'version-promotion' : 'directory-restructure'
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`📋 Created summary: ${summaryPath}`);
    
    // Provide instructions for manual import
    console.log(`\n📝 To use these commands in the main atlas-cli.ts file:`);
    console.log(`   1. Add this import statement at the top:`);
    console.log(`      import { atlasCliCommands } from './atlas-cli-commands';`);
    console.log(`   2. Replace the Commands section items with:`);
    console.log(`      items: atlasCliCommands`);
    
  } catch (error) {
    console.error('❌ Error generating command list:', (error as Error).message);
    
    if ((error as Error).message.includes('Command failed: git clone')) {
      console.error(`\n💡 Suggestion: The tag/branch '${tagOrBranch}' might not exist.`);
      console.error('   Try one of these options:');
      console.error('   - Check available tags: https://github.com/mongodb/mongodb-atlas-cli/tags');
      console.error('   - Use a different tag like: atlascli/v1.45.0');
      console.error('   - Use master branch: master');
    }
    
    throw error;
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export functions for testing
export { 
  main, 
  copyCommandFilesFromGit,
  copyExamplesFromGit,
  runCommand,
  getFilesRecursively,
  createHierarchicalStructure, 
  treeToArray, 
  formatAsTypeScript,
  formatSeparateCommandsAsTypeScript,
  handleDirectoryStructure,
  takeDirectoryInventory,
  parseCommandLineArgs
};
