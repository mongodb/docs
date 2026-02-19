#!/usr/bin/env node

/**
 * Script to generate TypeScript table of contents entries for MongoDB Atlas CLI Kubernetes Plugin commands
 * 
 * This script fetches command files from the MongoDB Atlas CLI Kubernetes Plugin repository
 * and generates TypeScript entries in a modular format that can be imported
 * into the atlas-cli.ts table of contents file.
 * 
 * Usage:
 *   npx tsx generate-k8s-cli-commands.ts <tag/branch>
 * 
 * Examples:
 *   npx tsx generate-k8s-cli-commands.ts v1.2.0    # Uses specific tag
 *   npx tsx generate-k8s-cli-commands.ts main      # Uses main branch
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

interface CommandTree {
  [key: string]: {
    label: string;
    contentSite: 'atlas-cli';
    url: string;
    collapsible?: boolean;
    items?: CommandTree;
  };
}

// Command line argument validation
const tagOrBranch = process.argv[2];
if (!tagOrBranch) {
  console.error('❌ Error: Please specify a tag or branch name');
  console.error('Usage: npx tsx generate-k8s-cli-commands.ts <tag/branch>');
  console.error('Example: npx tsx generate-k8s-cli-commands.ts v1.2.0');
  process.exit(1);
}

// GitHub API configuration for Atlas CLI Kubernetes Plugin
const GITHUB_API_URL = `https://api.github.com/repos/mongodb/atlas-cli-plugin-kubernetes/contents/docs/command?ref=${tagOrBranch}`;

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
            'User-Agent': 'mongodb-docs-k8s-cli-generator',
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
    console.log(`🔍 Fetching from: ${baseUrl}`);
    const response = await fetchFromGitHub(baseUrl);
    const files: GitHubFile[] = JSON.parse(response);
    
    const commandFiles: string[] = [];
    
    for (const file of files) {
      if (file.type === 'file' && file.name.endsWith('.txt')) {
        const relativePath = basePath ? `${basePath}/${file.name}` : file.name;
        commandFiles.push(relativePath);
        console.log(`📄 Found command file: ${relativePath}`);
      } else if (file.type === 'dir') {
        // Recursively fetch from subdirectories
        const subdirUrl = `https://api.github.com/repos/mongodb/atlas-cli-plugin-kubernetes/contents/${file.path}?ref=${tagOrBranch}`;
        const subdirPath = basePath ? `${basePath}/${file.name}` : file.name;
        const subdirFiles = await fetchAllCommandFiles(subdirUrl, subdirPath);
        commandFiles.push(...subdirFiles);
      }
    }
    
    return commandFiles;
  } catch (error) {
    console.error(`❌ Error fetching from ${baseUrl}:`, (error as Error).message);
    throw error;
  }
}

/**
 * Process command filenames to create hierarchical structure
 */
function createHierarchicalStructure(files: string[]): CommandTree {
  const tree: CommandTree = {};
  
    files.forEach(file => {
      // Remove .txt extension and split by dashes
      const commandName = file.replace('.txt', '').replace(/\//g, '-');
      const parts = commandName.split('-');
      
      // Remove 'atlas' prefix if present and ensure 'kubernetes' is the first part
      if (parts[0] === 'atlas') {
        parts.shift();
      }
      if (parts[0] === 'kubernetes') {
        parts.shift(); // Remove the redundant 'kubernetes' since we'll add it back
      }
      
      let current = tree;
      let urlPath = '';
      
      parts.forEach((part, index) => {
        if (index === 0) {
          urlPath = part;
        } else {
          urlPath += '-' + part;
        }
        
        if (!current[part]) {
          current[part] = {
            label: part,
            contentSite: 'atlas-cli' as const,
            url: `/docs/atlas/cli/:version/command/atlas-kubernetes-${urlPath}/`,
            collapsible: index < parts.length - 1,
            items: {}
          };
        }
        
        if (index < parts.length - 1) {
          current = current[part].items as CommandTree;
        }
      });
    });  return tree;
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
    
    if (node.items && Object.keys(node.items).length > 0) {
      item.items = treeToArray(node.items);
    }
    
    result.push(item);
  });
  
  return result;
}

/**
 * Format commands as TypeScript file content
 */
function formatAsTypeScript(commands: TocItem[], tagOrBranch: string): string {
  const generateTimestamp = new Date().toISOString();
  
  return `// This file is auto-generated by generate-k8s-cli-commands.ts
// Source: mongodb/atlas-cli-plugin-kubernetes repository (${tagOrBranch})
// Generated: ${generateTimestamp}
// Do not edit manually - your changes will be overwritten

import type { TocItem } from "../types";

export const atlasCliK8sCommands: TocItem[] = ${JSON.stringify(commands, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
}

/**
 * Clone Kubernetes repository and copy command files from local checkout
 */
async function copyCommandFilesFromGit(tagOrBranch: string): Promise<string[]> {
  console.log('\n📋 Cloning Kubernetes plugin repository...');
  
  // Create temporary directory
  const tempDir = path.join(__dirname, '.temp-k8s-cli');
  const repoUrl = 'https://github.com/mongodb/atlas-cli-plugin-kubernetes.git';
  
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
    
    console.log(`� Found ${files.length} Kubernetes command files`);
    
    // Create target directories
    const atlasCliUpcomingDir = path.join(__dirname, '../../atlas-cli/upcoming/source/command');
    const atlasCliCurrentDir = path.join(__dirname, '../../atlas-cli/current/source/command');
    const atlasDir = path.join(__dirname, '../../atlas/source/includes/command');

    // Ensure directories exist
    fs.mkdirSync(atlasCliUpcomingDir, { recursive: true });
    fs.mkdirSync(atlasCliCurrentDir, { recursive: true });
    fs.mkdirSync(atlasDir, { recursive: true });

    // Copy files
    console.log('📋 Copying Kubernetes command files...');
    for (const file of files) {
      const sourcePath = path.join(commandDir, file);

      // Adjust filename for kubernetes commands
      const fileName = file.replace(/\//g, '-');
      // Avoid double-prefixing if file already starts with atlas-kubernetes
      const k8sFileName = (fileName.startsWith('atlas-kubernetes-') || fileName.startsWith('atlas-kubernetes.'))
        ? fileName
        : `atlas-kubernetes-${fileName}`;

      const atlasCliUpcomingPath = path.join(atlasCliUpcomingDir, k8sFileName);
      const atlasCliCurrentPath = path.join(atlasCliCurrentDir, k8sFileName);

      // For atlas includes directory, kubernetes files should have .rst extension
      const atlasFileName = k8sFileName.replace(/\.txt$/, '.rst');
      const atlasPath = path.join(atlasDir, atlasFileName);

      // Copy file content
      const content = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(atlasCliUpcomingPath, content, 'utf8');
      fs.writeFileSync(atlasCliCurrentPath, content, 'utf8');
      fs.writeFileSync(atlasPath, content, 'utf8');
    }

    console.log(`✅ Copied ${files.length} Kubernetes command files to upcoming, current, and atlas directories`);
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
 * Recursively get all files in a directory
 */
function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else if (file.endsWith('.txt')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Detect which version directories contain kubernetes commands
 */
async function detectVersionsWithK8sCommands(): Promise<string[]> {
  const atlasCliDir = path.join(__dirname, '../../atlas-cli');
  const versions: string[] = [];
  
  // Check if atlas-cli directory exists
  if (!fs.existsSync(atlasCliDir)) {
    console.log('⚠️  atlas-cli directory not found');
    return versions;
  }
  
  // Read all directories in atlas-cli
  const entries = fs.readdirSync(atlasCliDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const versionName = entry.name;
      const commandDir = path.join(atlasCliDir, versionName, 'source', 'command');
      
      // Check if this version has any kubernetes command files
      if (fs.existsSync(commandDir)) {
        const files = fs.readdirSync(commandDir);
        const hasK8sCommands = files.some(file => 
          file.startsWith('atlas-kubernetes-') && file.endsWith('.txt')
        );
        
        if (hasK8sCommands) {
          versions.push(versionName);
        }
      }
    }
  }
  
  // Sort versions: 'current' and 'upcoming' first, then version numbers
  versions.sort((a, b) => {
    if (a === 'current') return -1;
    if (b === 'current') return 1;
    if (a === 'upcoming') return -1;
    if (b === 'upcoming') return 1;
    return a.localeCompare(b);
  });
  
  return versions;
}

/**
 * Update the atlas-cli.ts file to set version filtering for kubernetes commands
 */
async function updateAtlasCliToc(versions: string[]): Promise<void> {
  const tocPath = path.join(__dirname, '../../table-of-contents/docset-data/atlas-cli.ts');
  
  if (!fs.existsSync(tocPath)) {
    console.log('⚠️  atlas-cli.ts file not found');
    return;
  }
  
  let content = fs.readFileSync(tocPath, 'utf8');
  const versionsArray = JSON.stringify(versions);
  
  // Find and update the kubernetes command block's versions filter
  // Look for the kubernetes item (label: 'kubernetes') and its versions.includes
  const k8sBlockRegex = /(\{[\s\S]*?label:\s*['"]kubernetes['"][\s\S]*?versions:\s*\{[\s\S]*?includes:\s*)\[[\s\S]*?\](\s*,[\s\S]*?\}[\s\S]*?\})/;
  
  if (k8sBlockRegex.test(content)) {
    content = content.replace(k8sBlockRegex, `$1${versionsArray}$2`);
    fs.writeFileSync(tocPath, content, 'utf8');
    console.log(`✅ Updated atlas-cli.ts with versions: ${versions.join(', ')}`);
  } else {
    console.log('⚠️  Could not find kubernetes command version filter in atlas-cli.ts');
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    console.log(`🚀 MongoDB Atlas CLI Kubernetes Plugin Commands Generator`);
    console.log(`📋 Fetching commands from tag/branch: ${tagOrBranch}`);
    console.log(`🔗 Repository: mongodb/atlas-cli-plugin-kubernetes\n`);
    
    // Clone repository and copy command files
    const files = await copyCommandFilesFromGit(tagOrBranch);
    
    if (files.length === 0) {
      console.log('⚠️  No command files found in the repository.');
      return;
    }
    
    // Create hierarchical structure
    const commandTree = createHierarchicalStructure(files);
    const commandsArray = treeToArray(commandTree);
    
    // Generate TypeScript content
    const tsContent = formatAsTypeScript(commandsArray, tagOrBranch);
    
    // Write to the docset-data directory
    const outputPath = path.join(__dirname, '../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts');
    fs.writeFileSync(outputPath, tsContent, 'utf8');
    
    console.log(`\n✅ Generated TypeScript file: ${outputPath}`);
    
    // Count total commands
    function countCommands(items: TocItem[]): number {
      return items.reduce((count, item) => {
        if (item.items) {
          return count + countCommands(item.items);
        }
        return count + 1;
      }, 0);
    }

    const totalCommands = countCommands(commandsArray);
    console.log(`📊 Total Kubernetes commands generated: ${totalCommands}`);
    
    // Detect versions with kubernetes commands and update TOC
    console.log('\n🔍 Detecting versions with kubernetes commands...');
    const versionsWithK8s = await detectVersionsWithK8sCommands();
    console.log(`📋 Versions with kubernetes commands: ${versionsWithK8s.join(', ')}`);
    
    await updateAtlasCliToc(versionsWithK8s);
    console.log('✅ Updated version filtering in atlas-cli.ts');
    
    // Create summary file
    const summaryPath = path.join(__dirname, 'k8s-generation-summary.json');
    const summary = {
      tagOrBranch,
      generatedAt: new Date().toISOString(),
      totalFiles: files.length,
      totalCommands,
      topLevelGroups: commandsArray.length,
      outputFile: outputPath,
      sourceUrl: GITHUB_API_URL
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`📋 Created summary: ${summaryPath}`);
    
    // Provide instructions for manual import
    console.log(`\n📝 To use these Kubernetes commands in the main atlas-cli.ts file:`);
    console.log(`   1. Add this import statement at the top:`);
    console.log(`      import { atlasCliK8sCommands } from './atlas-cli-k8s-commands';`);
    console.log(`   2. Add a Kubernetes section to the Commands items array:`);
    console.log(`      {`);
    console.log(`        label: "Kubernetes Plugin",`);
    console.log(`        contentSite: "atlas-cli",`);
    console.log(`        collapsible: true,`);
    console.log(`        items: atlasCliK8sCommands`);
    console.log(`      }`);
    
  } catch (error) {
    console.error('❌ Error generating Kubernetes command list:', (error as Error).message);
    
    if ((error as Error).message.includes('GitHub API Error 404')) {
      console.error(`\n💡 Suggestion: The tag/branch '${tagOrBranch}' might not exist.`);
      console.error('   Try one of these options:');
      console.error('   - Check available tags: https://github.com/mongodb/atlas-cli-plugin-kubernetes/tags');
      console.error('   - Use a different tag like: v1.2.0');
      console.error('   - Use main branch: main');
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
  runCommand,
  getFilesRecursively
};
