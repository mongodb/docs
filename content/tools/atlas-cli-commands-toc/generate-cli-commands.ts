#!/usr/bin/env node

/**
 * Enhanced script to generate TypeScript table of contents entries for MongoDB Atlas CLI commands
 * 
 * This script fetches command files from the MongoDB Atlas CLI repository
 * and generates TypeScript entries in a modular format that can be imported
 * into the atlas-cli.ts table of contents file.
 * 
 * Usage:
 *   npx tsx generate-cli-commands.ts <tag/branch>
 *   node --loader ts-node/esm generate-cli-commands.ts <tag/branch>
 * 
 * Examples:
 *   npx tsx generate-cli-commands.ts atlascli/v1.46.2  # Uses specific tag
 *   npx tsx generate-cli-commands.ts atlascli/v1.45.0  # Uses specific tag
 */

import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  url: string;
}

import type { TocItem } from "../../table-of-contents/types/index.js";

type Versions = 
  | { includes: string[] }
  | { excludes: string[] };

interface CommandTree {
  [key: string]: {
    label: string;
    contentSite: 'atlas-cli';
    url: string;
    collapsible?: boolean;
    items?: CommandTree;
    versions?: Versions;
  };
}

// Command line argument validation
const tagOrBranch = process.argv[2];
if (!tagOrBranch) {
  console.error('❌ Error: Please specify a tag or branch name');
  console.error('Usage: npx tsx generate-cli-commands.ts <tag/branch>');
  console.error('Example: npx tsx generate-cli-commands.ts atlascli/v1.46.2');
  process.exit(1);
}

// GitHub API configuration
const GITHUB_API_URL = `https://api.github.com/repos/mongodb/mongodb-atlas-cli/contents/docs/command?ref=${tagOrBranch}`;

/**
 * Rate-limited GitHub API fetch with retry logic
 */
async function fetchFromGitHub(url: string, retries = 3): Promise<string> {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber: number) => {
      // Add delay between requests to avoid rate limiting
      const delay = attemptNumber > 1 ? 1000 * attemptNumber : 0;
      
      setTimeout(() => {
        const req = https.get(url, {
          headers: {
            'User-Agent': 'mongodb-docs-cli-generator',
            'Accept': 'application/vnd.github.v3+json'
          }
        }, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(data);
            } else if (res.statusCode === 403 && attemptNumber < retries) {
              console.log(`⚠️  Rate limited (attempt ${attemptNumber}/${retries}), retrying in ${2000 * attemptNumber}ms...`);
              setTimeout(() => attempt(attemptNumber + 1), 2000 * attemptNumber);
            } else {
              reject(new Error(`GitHub API Error ${res.statusCode}: ${data}`));
            }
          });
        });
        
        req.on('error', (error) => {
          if (attemptNumber < retries) {
            console.log(`⚠️  Request failed (attempt ${attemptNumber}/${retries}), retrying...`);
            setTimeout(() => attempt(attemptNumber + 1), 1000 * attemptNumber);
          } else {
            reject(error);
          }
        });
        
        req.end();
      }, delay);
    };
    
    attempt(1);
  });
}

/**
 * Recursively fetch all .txt files from the GitHub repository
 */
async function fetchAllCommandFiles(baseUrl: string, basePath = ''): Promise<string[]> {
  try {
    const response = await fetchFromGitHub(baseUrl);
    const files: GitHubFile[] = JSON.parse(response);
    const commandFiles: string[] = [];
    
    for (const file of files) {
      if (file.type === 'file' && file.name.endsWith('.txt')) {
        const relativePath = basePath ? `${basePath}/${file.name}` : file.name;
        commandFiles.push(relativePath);
      } else if (file.type === 'dir') {
        // Recursively fetch files from subdirectories
        const subDirUrl = `https://api.github.com/repos/mongodb/mongodb-atlas-cli/contents/docs/command/${file.name}?ref=${tagOrBranch}`;
        const subDirPath = basePath ? `${basePath}/${file.name}` : file.name;
        const subFiles = await fetchAllCommandFiles(subDirUrl, subDirPath);
        commandFiles.push(...subFiles);
      }
    }
    
    return commandFiles;
  } catch (error) {
    console.error(`Error fetching from ${baseUrl}:`, (error as Error).message);
    throw error;
  }
}

/**
 * Create hierarchical structure from file paths with version constraints
 */
function createHierarchicalStructure(files: string[], versionAvailability?: Map<string, string[]>): CommandTree {
  const tree: CommandTree = {};
  
  // Get all available versions for constraint calculation
  const atlasCliContentDir = path.join(__dirname, '../../atlas-cli');
  const allVersions: string[] = [];
  if (fs.existsSync(atlasCliContentDir)) {
    const entries = fs.readdirSync(atlasCliContentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        allVersions.push(entry.name);
      }
    }
  }
  
  files.forEach(file => {
    // Remove .txt extension and split by dashes
    const commandName = file.replace('.txt', '').replace(/\//g, '-');
    const parts = commandName.split('-');
    
    // Skip if doesn't start with 'atlas'
    if (parts[0] !== 'atlas') {
      return;
    }
    
    // Skip the root atlas.txt file from TOC (but file is still copied)
    if (commandName === 'atlas') {
      return;
    }
    
    // Remove 'atlas' prefix for hierarchy
    parts.shift();
    
    let current = tree;
    let urlPath = '';
    
    parts.forEach((part, index) => {
      if (index === 0) {
        urlPath = part;
      } else {
        urlPath += '-' + part;
      }
      
      if (!current[part]) {
        const isLeaf = index === parts.length - 1;
        const fileName = file.replace(/\//g, '-');
        
        // Calculate version constraints for this command
        let versionConstraints: Versions | undefined;
        if (versionAvailability && isLeaf) {
          const availableVersions = versionAvailability.get(fileName) || [];
          versionConstraints = calculateVersionConstraints(fileName, availableVersions, allVersions);
        }
        
        current[part] = {
          label: part,
          contentSite: 'atlas-cli' as const,
          url: `/docs/atlas/cli/:version/command/atlas-${urlPath}/`,
          collapsible: !isLeaf,
          items: {},
          ...(versionConstraints && { versions: versionConstraints })
        };
      }
      
      if (index < parts.length - 1) {
        current = current[part].items as CommandTree;
      }
    });
  });
  
  return tree;
}

/**
 * Convert tree structure to flat array format
 */
function treeToArray(tree: CommandTree): TocItem[] {
  const result: TocItem[] = [];
  
  Object.keys(tree).sort().forEach(key => {
    const node = tree[key];
    const item: TocItem = {
      label: node.label,
      contentSite: node.contentSite,
      url: node.url
    };
    
    if (node.collapsible) {
      item.collapsible = true;
    }
    
    if (node.versions) {
      item.versions = node.versions;
    }
    
    if (node.items && Object.keys(node.items).length > 0) {
      item.items = treeToArray(node.items);
    }
    
    result.push(item);
  });
  
  return result;
}

/**
 * Format the commands array as TypeScript code
 */
function formatAsTypeScript(commandsArray: TocItem[], tagOrBranch: string): string {
  function formatItem(item: TocItem, indent = 2): string {
    const spaces = ' '.repeat(indent);
    let result = `${spaces}{\n`;
    result += `${spaces}  label: "${item.label}",\n`;
    result += `${spaces}  contentSite: "${item.contentSite}"`;
    
    if (item.url) {
      result += `,\n${spaces}  url: "${item.url}"`;
    }
    
    if (item.collapsible) {
      result += `,\n${spaces}  collapsible: true`;
    }
    
    if (item.versions) {
      const versionsStr = JSON.stringify(item.versions);
      result += `,\n${spaces}  versions: ${versionsStr}`;
    }
    
    if (item.items && item.items.length > 0) {
      result += `,\n${spaces}  items: [\n`;
      result += item.items.map((subItem: TocItem) => formatItem(subItem, indent + 1)).join(',\n');
      result += `\n${spaces}  ]`;
    }
    
    result += `\n${spaces}}`;
    return result;
  }

  const itemsCode = commandsArray.map((item: TocItem) => formatItem(item, 1)).join(',\n');
  const timestamp = new Date().toISOString();
  
  return `// This file is auto-generated by generate-cli-commands.ts
// Source: mongodb/mongodb-atlas-cli repository (${tagOrBranch})
// Generated: ${timestamp}
// Do not edit manually - your changes will be overwritten

import type { TocItem } from "../types";

export const atlasCliCommands: TocItem[] = [
${itemsCode}
];

// Metadata about the generated commands
export const commandsMetadata = {
  source: 'mongodb/mongodb-atlas-cli',
  tagOrBranch: '${tagOrBranch}',
  generatedAt: '${timestamp}',
  totalCommands: ${commandsArray.reduce((count: number, item: TocItem) => {
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
  }, 0)}
};`;
}

/**
 * Load existing Kubernetes commands from generated file
 */
function loadExistingKubernetesCommands(): TocItem[] {
  try {
    console.log('\n🔍 Loading existing Kubernetes commands...');
    const k8sFilePath = path.join(__dirname, '../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts');
    
    if (!fs.existsSync(k8sFilePath)) {
      console.log('⚠️  No existing Kubernetes commands file found. Run generate-k8s-cli-commands.ts first.');
      return [];
    }
    
    const content = fs.readFileSync(k8sFilePath, 'utf8');
    
    // Extract the exported array from the TypeScript file
    const match = content.match(/export const atlasCliK8sCommands: TocItem\[\] = (\[[\s\S]*?\]);/);
    if (!match) {
      console.log('⚠️  Could not parse existing Kubernetes commands file.');
      return [];
    }
    
    // Use eval to parse the array (safe since it's our own generated file)
    // First, let's define TocItem type for eval context
    const TocItemContext = {
      TocItem: {} as any
    };
    
    const k8sCommandsArray = eval(`(${match[1]})`);
    
    // Wrap in a kubernetes top-level item
    const k8sTopLevel = [{
      label: "kubernetes",
      contentSite: "atlas-cli" as const,
      url: "/docs/atlas/cli/:version/command/atlas-kubernetes/",
      collapsible: true,
      items: k8sCommandsArray
    }];
    
    console.log(`📊 Loaded ${k8sCommandsArray.length} existing Kubernetes command groups`);
    return k8sTopLevel;
    
  } catch (error) {
    console.error('⚠️  Error loading existing Kubernetes commands:', (error as Error).message);
    return [];
  }
}

/**
 * Merge commands into alphabetical order
 */
function mergeCommands(mainCommands: TocItem[], k8sCommands: TocItem[]): TocItem[] {
  // Extract the main command items from the atlas wrapper
  let allItems: TocItem[] = [];
  
  if (mainCommands.length > 0 && mainCommands[0].label === 'atlas' && mainCommands[0].items) {
    // Get the items from inside the atlas command
    allItems = [...mainCommands[0].items];
  } else {
    allItems = [...mainCommands];
  }
  
  // Check if main commands already include kubernetes commands
  const hasKubernetesInMain = allItems.some(item => item.label === 'kubernetes');
  
  if (!hasKubernetesInMain) {
    // Only add kubernetes commands from plugin if main CLI doesn't have them
    if (k8sCommands.length > 0 && k8sCommands[0].label === 'kubernetes' && k8sCommands[0].items) {
      // Add the kubernetes command itself (not its items)
      allItems.push({
        label: "kubernetes",
        contentSite: "atlas-cli" as const,
        url: "/docs/atlas/cli/:version/command/atlas-kubernetes/",
        collapsible: true,
        items: k8sCommands[0].items
      });
    }
  } else {
    console.log('ℹ️  Skipping Kubernetes plugin commands - already present in main Atlas CLI');
  }
  
  // Sort all items alphabetically by label
  allItems.sort((a, b) => a.label.localeCompare(b.label));
  
  // Return items directly without atlas wrapper
  return allItems;
}

/**
 * Clone repository and copy command files from local checkout
 */
async function copyCommandFilesFromGit(tagOrBranch: string): Promise<string[]> {
  console.log('\n📋 Cloning Atlas CLI repository...');
  
  // Create temporary directory
  const tempDir = path.join(__dirname, '.temp-atlas-cli');
  const repoUrl = 'https://github.com/mongodb/mongodb-atlas-cli.git';
  
  try {
    // Clean up any existing temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
    
    // Clone the repository
    console.log(`🔗 Cloning ${repoUrl} (${tagOrBranch})...`);
    await runCommand(`git clone --depth 1 --branch "${tagOrBranch}" "${repoUrl}" "${tempDir}"`);
    
    // Check if docs/command directory exists
    const commandDir = path.join(tempDir, 'docs', 'command');
    if (!fs.existsSync(commandDir)) {
      throw new Error(`Command directory not found: ${commandDir}`);
    }
    
    // Get list of command files
    const files = getFilesRecursively(commandDir, []).map(file => 
      path.relative(commandDir, file)
    );
    
    console.log(`� Found ${files.length} command files`);
    
    // Create target directories
    const atlasCliDir = path.join(__dirname, '../../atlas-cli/upcoming/source/command');
    const atlasDir = path.join(__dirname, '../../atlas/source/includes/command');
    
    // Ensure directories exist
    fs.mkdirSync(atlasCliDir, { recursive: true });
    fs.mkdirSync(atlasDir, { recursive: true });
    
    // Copy files and clean serverless references
    console.log('📋 Copying command files and cleaning serverless references...');
    let serverlessCleanedCount = 0;
    for (const file of files) {
      const sourcePath = path.join(commandDir, file);
      const fileName = file.replace(/\//g, '-');
      
      const atlasCliPath = path.join(atlasCliDir, fileName);
      // For atlas directory, rename .txt files to .rst
      const atlasFileName = fileName.replace(/\.txt$/, '.rst');
      const atlasPath = path.join(atlasDir, atlasFileName);
      
      // Read and clean file content
      let content = fs.readFileSync(sourcePath, 'utf8');
      const originalContent = content;
      content = cleanServerlessReferences(content, fileName);
      
      if (content !== originalContent) {
        serverlessCleanedCount++;
      }
      
      fs.writeFileSync(atlasCliPath, content, 'utf8');
      fs.writeFileSync(atlasPath, content, 'utf8');
    }
    
    console.log(`✅ Copied ${files.length} command files`);
    if (serverlessCleanedCount > 0) {
      console.log(`🧹 Cleaned serverless references from ${serverlessCleanedCount} files`);
    }
    return files;
    
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      console.log('🧹 Cleaning up temporary directory...');
      await runCommand(`rm -rf "${tempDir}"`);
    }
  }
}

/**
 * Copy examples directory from cloned repository to target locations
 */
async function copyExamplesFromGit(tagOrBranch: string): Promise<void> {
  console.log('\n📁 Copying examples directory...');
  
  // Create temporary directory
  const tempDir = path.join(__dirname, '.temp-atlas-cli-examples');
  const repoUrl = 'https://github.com/mongodb/mongodb-atlas-cli.git';
  
  try {
    // Clean up any existing temp directory
    if (fs.existsSync(tempDir)) {
      await runCommand(`rm -rf "${tempDir}"`);
    }
    
    // Clone the repository
    console.log(`🔗 Cloning ${repoUrl} (${tagOrBranch}) for examples...`);
    await runCommand(`git clone --depth 1 --branch "${tagOrBranch}" "${repoUrl}" "${tempDir}"`);
    
    // Check if docs/command/includes directory exists
    const includesDir = path.join(tempDir, 'docs', 'command', 'includes');
    if (!fs.existsSync(includesDir)) {
      console.log(`⚠️  Examples directory not found: ${includesDir} - skipping examples copy`);
      return;
    }
    
    // Get list of example files
    const files = getFilesRecursivelyAll(includesDir, []);
    console.log(`📁 Found ${files.length} example files`);
    
    if (files.length === 0) {
      console.log('ℹ️  No example files to copy');
      return;
    }
    
    // Create target directories
    const atlasCliExamplesDir = path.join(__dirname, '../../atlas-cli/upcoming/source/includes/examples');
    const atlasExamplesDir = path.join(__dirname, '../../atlas/source/includes/examples');
    
    // Ensure directories exist
    fs.mkdirSync(atlasCliExamplesDir, { recursive: true });
    fs.mkdirSync(atlasExamplesDir, { recursive: true });
    
    // Copy files preserving directory structure
    console.log('📁 Copying example files...');
    let copiedCount = 0;
    for (const file of files) {
      const relativePath = path.relative(includesDir, file);
      
      const atlasCliPath = path.join(atlasCliExamplesDir, relativePath);
      // For atlas directory, rename any .txt files to .rst
      const atlasRelativePath = relativePath.replace(/\.txt$/, '.rst');
      const atlasPath = path.join(atlasExamplesDir, atlasRelativePath);
      
      // Ensure subdirectories exist
      fs.mkdirSync(path.dirname(atlasCliPath), { recursive: true });
      fs.mkdirSync(path.dirname(atlasPath), { recursive: true });
      
      // Copy file content
      const content = fs.readFileSync(file, 'utf8');
      fs.writeFileSync(atlasCliPath, content, 'utf8');
      fs.writeFileSync(atlasPath, content, 'utf8');
      copiedCount++;
    }
    
    console.log(`✅ Copied ${copiedCount} example files to both locations`);
    
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      console.log('🧹 Cleaning up examples temporary directory...');
      await runCommand(`rm -rf "${tempDir}"`);
    }
  }
}

/**
 * Helper to run shell commands
 */
const execAsync = promisify(exec);

async function runCommand(command: string): Promise<string> {
  try {
    const { stdout } = await execAsync(command);
    return stdout;
  } catch (error: any) {
    throw new Error(`Command failed: ${command}\n${error.message}\n${error.stderr || ''}`);
  }
}

/**
 * Check which version directories contain each command file
 */
function checkVersionAvailability(files: string[]): Map<string, string[]> {
  console.log('\n🔍 Checking version availability for command files...');
  
  const atlasCliContentDir = path.join(__dirname, '../../atlas-cli');
  const versionAvailability = new Map<string, string[]>();
  
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
  
  // Check each file in each version
  for (const file of files) {
    const fileName = file.replace(/\//g, '-');
    const availableVersions: string[] = [];
    
    for (const version of versionDirs) {
      const commandDir = path.join(atlasCliContentDir, version, 'source', 'command');
      const filePath = path.join(commandDir, fileName);
      
      if (fs.existsSync(filePath)) {
        availableVersions.push(version);
      }
    }
    
    versionAvailability.set(fileName, availableVersions);
  }
  
  console.log(`✅ Checked availability for ${files.length} files across ${versionDirs.length} versions`);
  return versionAvailability;
}

/**
 * Calculate optimal version constraints based on availability
 */
function calculateVersionConstraints(fileName: string, availableVersions: string[], allVersions: string[]): Versions | undefined {
  if (availableVersions.length === 0) {
    // File doesn't exist in any version - exclude all
    return { excludes: allVersions };
  }
  
  if (availableVersions.length === allVersions.length) {
    // File exists in all versions - no constraints needed
    return undefined;
  }
  
  // Calculate missing versions
  const missingVersions = allVersions.filter(v => !availableVersions.includes(v));
  
  // Use excludes if it's shorter than includes, otherwise use includes
  if (missingVersions.length <= availableVersions.length) {
    return { excludes: missingVersions };
  } else {
    return { includes: availableVersions };
  }
}
/**
 * Get all .txt files recursively from a directory, filtering out serverless files
 */
function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else if (file.endsWith('.txt')) {
      // Filter out files with "serverless" or "Serverless" in the name
      if (!file.toLowerCase().includes('serverless')) {
        fileList.push(filePath);
      } else {
        console.log(`🔍 Filtered out serverless file: ${file}`);
      }
    }
  });
  
  return fileList;
}

/**
 * Get all files recursively from a directory (not filtered by extension)
 */
function getFilesRecursivelyAll(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getFilesRecursivelyAll(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
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
 * Main execution function
 */
async function main() {
  try {
    console.log(`🚀 Fetching Atlas CLI command files from ${tagOrBranch}...`);
    
    // Clone repository and copy command files
    const files = await copyCommandFilesFromGit(tagOrBranch);
    console.log(`📁 Found ${files.length} command files`);
    
    // Copy examples directory
    await copyExamplesFromGit(tagOrBranch);
    
    // Check version availability for the files
    const versionAvailability = checkVersionAvailability(files);
    
    // Create hierarchical structure with version constraints
    const tree = createHierarchicalStructure(files, versionAvailability);
    
    // Convert to array format
    const mainCommands = treeToArray(tree);
    
    // Fetch and process Kubernetes commands
    const k8sCommands = loadExistingKubernetesCommands();
    
    // Merge commands alphabetically
    const allCommands = mergeCommands(mainCommands, k8sCommands);
    
    // Generate TypeScript code
    const typescriptCode = formatAsTypeScript(allCommands, tagOrBranch);
    
    // Write to file in table-of-contents docset-data directory
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
    console.log(`📊 Including ${k8sCommands.length ? k8sCommands[0].items?.length || 0 : 0} Kubernetes plugin commands`);
    
    // Create summary file
    const summaryPath = path.join(__dirname, 'generation-summary.json');
    const summary = {
      tagOrBranch,
      generatedAt: new Date().toISOString(),
      totalFiles: files.length,
      totalCommands,
      topLevelGroups: allCommands.length,
      kubernetesCommands: k8sCommands.length ? k8sCommands[0].items?.length || 0 : 0,
      outputFile: outputPath,
      sourceMethod: 'git-clone'
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
    
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

// Export functions for testing
export { 
  main, 
  fetchFromGitHub, 
  fetchAllCommandFiles,
  createHierarchicalStructure, 
  treeToArray, 
  formatAsTypeScript,
  copyCommandFilesFromGit,
  copyExamplesFromGit,
  runCommand,
  getFilesRecursively,
  getFilesRecursivelyAll,
  checkVersionAvailability,
  calculateVersionConstraints,
  cleanServerlessReferences
};
