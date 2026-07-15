import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const STYLE_GUIDE_PATH = process.env.STYLE_GUIDE_PATH ?? 'content/meta/source/style-guide';
const CHANGED_FILES = process.env.CHANGED_FILES ?? '';
const LATEST_SHA = process.env.LATEST_SHA ?? '';
const REPO_ROOT = process.env.GITHUB_WORKSPACE ?? process.cwd();

const REFERENCE_PATH = join(REPO_ROOT, '.github/ai-reviewer/style-guide-reference.md');
const VERSION_PATH = join(REPO_ROOT, '.github/ai-reviewer/.style-guide-version');

if (!LATEST_SHA) {
  console.error('Missing LATEST_SHA');
  process.exit(1);
}

const currentReference = readFileSync(REFERENCE_PATH, 'utf-8');

const changedFileList = CHANGED_FILES.split('\n').filter(
  f => f.trim() && !f.startsWith('(full diff unavailable')
);

let changedContent = '';
for (const file of changedFileList) {
  const fullPath = join(REPO_ROOT, file.trim());
  if (existsSync(fullPath)) {
    changedContent += `\n\n=== ${file.trim()} ===\n${readFileSync(fullPath, 'utf-8')}`;
  }
}

if (!changedContent) {
  // Fall back to reading all files in the style guide directory
  console.log('No specific changed files found, falling back to full style guide path');
  const { readdirSync, statSync } = await import('fs');
  const walk = (dir: string): string[] => {
    return readdirSync(dir).flatMap(name => {
      const fullPath = join(dir, name);
      return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
    });
  };
  const sgFullPath = join(REPO_ROOT, STYLE_GUIDE_PATH);
  if (existsSync(sgFullPath)) {
    for (const file of walk(sgFullPath)) {
      if (file.endsWith('.txt') || file.endsWith('.rst') || file.endsWith('.md')) {
        changedContent += `\n\n=== ${file.replace(REPO_ROOT + '/', '')} ===\n${readFileSync(file, 'utf-8')}`;
      }
    }
  }
}

if (!changedContent) {
  console.error('Could not read any style guide content');
  process.exit(1);
}

const client = new Anthropic();

console.log('Calling Claude to update style-guide-reference.md...');

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 4096,
  messages: [
    {
      role: 'user',
      content: `You are updating a condensed style guide reference used by an AI documentation reviewer at MongoDB.

The current condensed reference is:
<current_reference>
${currentReference}
</current_reference>

The following style guide source files have changed since the last sync. Here is their current content:
<changed_files>
${changedContent}
</changed_files>

Update the condensed reference to incorporate any important new or changed guidelines from these files. Keep it concise and actionable for an AI reviewer. Return ONLY the updated markdown content, nothing else.`,
    },
  ],
});

const updated = response.content[0].type === 'text' ? response.content[0].text : null;
if (!updated) {
  console.error('Empty response from Claude');
  process.exit(1);
}

writeFileSync(REFERENCE_PATH, updated, 'utf-8');
writeFileSync(VERSION_PATH, LATEST_SHA, 'utf-8');

console.log('✅ Updated style-guide-reference.md');
console.log(`✅ Bumped .style-guide-version to ${LATEST_SHA}`);
