#!/usr/bin/env node

/**
 * Script to generate Atlas Local changelog from the mongodb/mongodb-atlas-local repository
 *
 * This script fetches the CHANGELOG.md from the Atlas Local repository,
 * converts it to RST format, and updates the Atlas Local changelog files.
 *
 * Note: The mongodb/mongodb-atlas-local repository is private and requires
 * authentication. Ensure you have proper GitHub credentials configured.
 *
 * Usage:
 *   npx tsx generate-atlas-local-changelog.ts <tag/branch>
 *
 * Examples:
 *   npx tsx generate-atlas-local-changelog.ts v0.11.0    # Uses specific tag
 *   npx tsx generate-atlas-local-changelog.ts main       # Uses main branch
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

// Command line argument validation
const tagOrBranch = process.argv[2] || 'main';

console.log(`🚀 Atlas Local Changelog Generator`);
console.log(`📋 Fetching changelog from tag/branch: ${tagOrBranch}`);
console.log(`🔗 Repository: mongodb/mongodb-atlas-local\n`);

// GitHub API configuration for Atlas Local
const GITHUB_API_URL = `https://api.github.com/repos/mongodb/mongodb-atlas-local/contents/CHANGELOG.md?ref=${tagOrBranch}`;

/**
 * Rate-limited GitHub API fetch with retry logic
 */
async function fetchFromGitHub(url: string, retries = 3): Promise<string> {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber: number) => {
      const delay = attemptNumber > 1 ? 1000 * attemptNumber : 0;

      setTimeout(() => {
        // Prepare headers with authentication if available
        const headers: Record<string, string> = {
          'User-Agent': 'mongodb-docs-atlas-local-changelog-generator',
          'Accept': 'application/vnd.github.v3+json'
        };

        // Add GitHub token if available
        if (process.env.GITHUB_TOKEN) {
          headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const req = https.get(url, { headers }, (res) => {
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
 * Convert markdown changelog to RST format
 */
function convertMarkdownToRst(markdownContent: string): string {
  const lines = markdownContent.split('\n');
  const rstLines: string[] = [];

  // Add RST header
  rstLines.push('.. _atlas-local-changelog:');
  rstLines.push('');
  rstLines.push(':noprevnext:');
  rstLines.push('');
  rstLines.push('====================');
  rstLines.push('Atlas Local Changelog');
  rstLines.push('====================');
  rstLines.push('');
  rstLines.push('.. meta::');
  rstLines.push('   :description: Explore the latest updates and features in Atlas Local, including bug fixes, new commands, and improvements for local MongoDB Atlas deployments.');
  rstLines.push('');
  rstLines.push('.. default-domain:: mongodb');
  rstLines.push('');
  rstLines.push('.. contents:: On this page');
  rstLines.push('   :local:');
  rstLines.push('   :backlinks: none');
  rstLines.push('   :depth: 1');
  rstLines.push('   :class: singlecol');
  rstLines.push('');

  let currentVersion = '';
  let inVersionSection = false;
  let lastWasBulletList = false;
  let pendingReleases: Array<{version: string, date: string, cleanVersion: string}> = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines at the beginning
    if (!line && !inVersionSection) continue;

    // Handle version headers: ## [release_20260316T092422Z](link) - 2026-03-16
    if (line.match(/^## \[([^\]]+)\](?:\([^)]+\))? - (.+)$/)) {
      const match = line.match(/^## \[([^\]]+)\](?:\([^)]+\))? - (.+)$/);
      if (match) {
        const version = match[1];
        const date = match[2];

        // Extract a cleaner version name from release timestamp
        let cleanVersion = version;
        if (version.startsWith('release_')) {
          // Convert release_20260316T092422Z to 2026-03-16
          const timestampMatch = version.match(/release_(\d{4})(\d{2})(\d{2})T/);
          if (timestampMatch) {
            cleanVersion = `${timestampMatch[1]}-${timestampMatch[2]}-${timestampMatch[3]}`;
          }
        }

        // Output any previous pending releases (releases without content)
        for (const pendingRelease of pendingReleases) {
          // Add blank line after previous bullet list if needed
          if (lastWasBulletList) {
            rstLines.push('');
            lastWasBulletList = false;
          }

          // Add anchor
          rstLines.push(`.. _atlas-local-${pendingRelease.cleanVersion.replace(/[^a-zA-Z0-9]/g, '-')}:`);
          rstLines.push('');

          // Add version header
          rstLines.push(`Atlas Local ${pendingRelease.cleanVersion}`);
          rstLines.push('-'.repeat(`Atlas Local ${pendingRelease.cleanVersion}`.length));
          rstLines.push('');
          rstLines.push(`Released ${formatDate(pendingRelease.date)}`);
          rstLines.push('');
        }

        // Store current release info for later processing
        pendingReleases = [{ version, date, cleanVersion }];
        currentVersion = version;
        inVersionSection = true;
      }
      continue;
    }

    // Handle section headers: ### 🚀 Features, ### 🐛 Bug Fixes
    if (line.match(/^### (.+)$/)) {
      const match = line.match(/^### (.+)$/);
      if (match) {
        let sectionTitle = match[1];
        // Remove all emojis using Unicode regex
        sectionTitle = removeEmojis(sectionTitle);

        // Output any pending releases before this section
        if (pendingReleases.length > 0) {
          // Add blank line after previous bullet list if needed
          if (lastWasBulletList) {
            rstLines.push('');
            lastWasBulletList = false;
          }

          // Output the most recent release (the one this section belongs to)
          const release = pendingReleases[pendingReleases.length - 1];

          // Add anchor
          rstLines.push(`.. _atlas-local-${release.cleanVersion.replace(/[^a-zA-Z0-9]/g, '-')}:`);
          rstLines.push('');

          // Add version header
          rstLines.push(`Atlas Local ${release.cleanVersion}`);
          rstLines.push('-'.repeat(`Atlas Local ${release.cleanVersion}`.length));
          rstLines.push('');
          rstLines.push(`Released ${formatDate(release.date)}`);
          rstLines.push('');

          // Clear pending releases
          pendingReleases = [];
        }

        // Add blank line after previous bullet list if needed
        if (lastWasBulletList) {
          rstLines.push('');
          lastWasBulletList = false;
        }

        rstLines.push(`**${sectionTitle}**`);
        rstLines.push('');
      }
      continue;
    }

    // Handle list items
    if (line.startsWith('- ')) {
      let content = line.substring(2);
      // Convert markdown links to RST format and clean up
      // Handle GitHub PR links: [#567](https://github.com/mongodb/mongodb-atlas-local/pull/567) -> (#567)
      content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      // Convert backticks to double backticks for RST
      content = content.replace(/`([^`]+)`/g, '``$1``');
      // Remove any emojis from list items
      content = removeEmojis(content);
      rstLines.push(`- ${content}`);
      lastWasBulletList = true;
      continue;
    }

    // Handle empty lines - check what comes next
    if (!line && inVersionSection) {
      // Look ahead to see what's coming next
      let nextLineIndex = i + 1;
      while (nextLineIndex < lines.length && !lines[nextLineIndex].trim()) {
        nextLineIndex++;
      }

      if (nextLineIndex < lines.length) {
        const nextLine = lines[nextLineIndex].trim();
        // If next line is a section header or version header, and we just had bullet lists
        if ((nextLine.match(/^### (.+)$/) || nextLine.match(/^## \[([^\]]+)\] - (.+)$/)) && lastWasBulletList) {
          rstLines.push('');
          lastWasBulletList = false;
        }
      }
    }
  }

  // Output any remaining pending releases (releases without sections)
  for (const release of pendingReleases) {
    // Add blank line after previous bullet list if needed
    if (lastWasBulletList) {
      rstLines.push('');
      lastWasBulletList = false;
    }

    // Add anchor
    rstLines.push(`.. _atlas-local-${release.cleanVersion.replace(/[^a-zA-Z0-9]/g, '-')}:`);
    rstLines.push('');

    // Add version header
    rstLines.push(`Atlas Local ${release.cleanVersion}`);
    rstLines.push('-'.repeat(`Atlas Local ${release.cleanVersion}`.length));
    rstLines.push('');
    rstLines.push(`Released ${formatDate(release.date)}`);
    rstLines.push('');
  }

  // Add final blank line after last bullet list if needed
  if (lastWasBulletList) {
    rstLines.push('');
  }

  return rstLines.join('\n');
}

/**
 * Remove all emojis from a string
 */
function removeEmojis(text: string): string {
  // Unicode regex to match emojis and other symbols
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

/**
 * Format date from YYYY-MM-DD to DD Month YYYY
 */
function formatDate(dateStr: string): string {
  // Parse date string manually to avoid timezone issues
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return dateStr; // Return original if not in expected format
  }

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Month is 0-indexed
  const day = parseInt(parts[2]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayStr = day.toString().padStart(2, '0');
  const monthStr = months[month];

  return `${dayStr} ${monthStr} ${year}`;
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    console.log('🔍 Fetching CHANGELOG.md from Atlas Local repository...');
    
    // Fetch changelog from GitHub
    const response = await fetchFromGitHub(GITHUB_API_URL);
    const data = JSON.parse(response);
    
    if (!data.content) {
      throw new Error('No content found in CHANGELOG.md');
    }
    
    // Decode base64 content
    const markdownContent = Buffer.from(data.content, 'base64').toString('utf8');
    console.log('✅ Successfully fetched CHANGELOG.md');
    
    // Convert to RST
    console.log('🔄 Converting markdown to RST format...');
    const rstContent = convertMarkdownToRst(markdownContent);
    
    // Write to both current and upcoming directories
    const currentPath = path.join(__dirname, '../../atlas-cli/current/source/atlas-local-changelog.txt');
    const upcomingPath = path.join(__dirname, '../../atlas-cli/upcoming/source/atlas-local-changelog.txt');

    fs.writeFileSync(currentPath, rstContent, 'utf8');
    fs.writeFileSync(upcomingPath, rstContent, 'utf8');

    console.log(`✅ Generated changelog files:`);
    console.log(`   - ${currentPath}`);
    console.log(`   - ${upcomingPath}`);

    // Create summary with relative paths
    const summaryPath = path.join(__dirname, 'atlas-local-changelog-summary.json');
    const summary = {
      tagOrBranch,
      generatedAt: new Date().toISOString(),
      sourceUrl: GITHUB_API_URL,
      outputFiles: [
        'content/atlas-cli/current/source/atlas-local-changelog.txt',
        'content/atlas-cli/upcoming/source/atlas-local-changelog.txt'
      ]
    };
    
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`📋 Created summary: ${summaryPath}`);
    
    console.log('\n🎉 Atlas Local changelog generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error generating Atlas Local changelog:', (error as Error).message);
    
    if ((error as Error).message.includes('GitHub API Error 404')) {
      console.error(`\n💡 Suggestion: This could be due to one of the following:`);
      console.error('   1. The tag/branch might not exist:');
      console.error('      - Check available tags: https://github.com/mongodb/mongodb-atlas-local/tags');
      console.error('      - Use a different tag like: v0.11.0');
      console.error('      - Use main branch: main');
      console.error('   2. Authentication issue (private repository):');
      console.error('      - Ensure you have GitHub credentials configured');
      console.error('      - Set GITHUB_TOKEN environment variable');
      console.error('      - Or run: gh auth login');
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
  convertMarkdownToRst,
  formatDate
};
