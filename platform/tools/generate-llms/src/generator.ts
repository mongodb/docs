/**
 * Port of audit-cli's commands/generate/llms/generator.go
 * (grove-platform/audit-cli#7): walks each documentation project's current
 * version, extracts page titles and each page's own meta `:description:`,
 * resolves production URLs, and writes a per-project llms.txt (with a
 * hand-maintained summary blockquote from descriptions.ts) — or, if the
 * project's page list is too large to fit under LLMS_TXT_CHAR_LIMIT, splits
 * it into <project>-<n>-llms.txt part files instead (see split.ts), each
 * with its own summary blockquote.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadDescriptions, resolveDescription, PLACEHOLDER_DESCRIPTION, type DescriptionsMap } from './descriptions.js';
import { EXCLUDED_PROJECTS, EXCLUDED_SOURCE_SUBDIRS, INTERNAL_ONLY_PROJECTS } from './exclusions.js';
import { FORCED_SPLIT_BY_PROJECT } from './projectOverrides.js';
import { currentSourceDir } from './projectInfo.js';
import { renderContent, codePointLength } from './render.js';
import { parseSnootyToml, resolvePipeSubstitutions, resolveSubstitutions } from './snooty.js';
import { splitPagesRecursively } from './split.js';
import { LLMS_TXT_CHAR_LIMIT, type GenerateOptions, type PageEntry, type ProjectResult } from './types.js';
import {
  buildUrl,
  computePagePath,
  getUrlSlugForDir,
  loadDirNameToPrefixMap,
  toMarkdownUrl,
  type DirNameToPrefix,
} from './urlResolver.js';
import { extractPageTitle } from './rst/pageTitle.js';
import { extractMetaDescription } from './rst/metaDescription.js';
import { extractIncludePaths, extractLocalSubstitutions } from './rst/localSubstitutions.js';

async function collectTxtFiles(sourceDir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Skip partial/include and code-example directories: these are not
        // standalone pages and don't have their own production URLs.
        if (EXCLUDED_SOURCE_SUBDIRS.has(entry.name)) {
          continue;
        }
        await walk(path.join(dir, entry.name));
      } else if (entry.isFile() && path.extname(entry.name) === '.txt') {
        files.push(path.join(dir, entry.name));
      }
    }
  }

  await walk(sourceDir);
  return files;
}

/**
 * A page's "L3" is the first path segment of its page path within the
 * project's source directory (e.g. "core" for "core/transactions"), or ""
 * for the project's own root/index page (pagePath === "").
 */
function firstPathSegment(pagePath: string): string {
  return pagePath.split('/')[0] ?? '';
}

/**
 * Reads the project's `title` and substitutions (both `[constants]`, used
 * for `{+name+}` references, and `[substitutions]`, used for `|name|`
 * references) from its snooty.toml, which sits in the directory containing
 * the source directory. Returns empty defaults if the file is missing or
 * cannot be parsed.
 */
async function loadSnootyConfig(
  sourceDir: string,
): Promise<{ title: string; constants: Record<string, string>; substitutions: Record<string, string> }> {
  const snootyTomlPath = path.join(path.dirname(sourceDir), 'snooty.toml');
  const config = await parseSnootyToml(snootyTomlPath);
  return {
    title: config?.title ?? '',
    constants: config?.constants ?? {},
    substitutions: config?.substitutions ?? {},
  };
}

/**
 * Resolves both `{+name+}` constants and `|name|` substitutions in text.
 * `pageSubstitutions` should already have any page-level `.. |name|
 * replace::` overrides merged over the project-wide `[substitutions]`
 * table, so page declarations win.
 */
function resolveAllSubstitutions(
  text: string,
  constants: Record<string, string>,
  pageSubstitutions: Record<string, string>,
): string {
  return resolvePipeSubstitutions(resolveSubstitutions(text, constants), pageSubstitutions);
}

/**
 * Some substitutions aren't declared in snooty.toml or directly on the
 * page, but in a shared snippet the page pulls in via a plain
 * `.. include:: /path.rst` directive — e.g. manual's per-version
 * release-notes pages (release-notes/8.3-upgrade.txt) each include
 * /includes/8.3-upgrade-replacements.rst, which is the only place
 * `|newversion|`/`|oldversion|` are actually defined. Recurses a couple of
 * levels deep in case an included snippet itself includes another one.
 */
async function resolveIncludedSubstitutions(
  content: string,
  sourceDir: string,
  depth = 2,
): Promise<Record<string, string>> {
  if (depth <= 0) {
    return {};
  }
  let merged: Record<string, string> = {};
  for (const includePath of extractIncludePaths(content)) {
    let includedContent: string;
    try {
      includedContent = await fs.readFile(path.join(sourceDir, includePath), 'utf-8');
    } catch {
      // Include target doesn't exist under this source dir (e.g. it's
      // shared from elsewhere in the repo) or isn't readable; skip it.
      continue;
    }
    merged = {
      ...merged,
      ...(await resolveIncludedSubstitutions(includedContent, sourceDir, depth - 1)),
      ...extractLocalSubstitutions(includedContent),
    };
  }
  return merged;
}

/**
 * The most characters any part's own `> description` blockquote could add
 * on top of its header line. Split decisions (see splitPagesRecursively)
 * are made before it's known which part index will end up with which of a
 * project's (possibly several, per-part) descriptions, so this reserves
 * against the longest one available for `project` rather than any one
 * part's actual description.
 */
function maxDescriptionOverhead(project: string, descriptions: DescriptionsMap, withDescriptions: boolean): number {
  if (!withDescriptions) {
    return 0;
  }
  const entry = descriptions[project];
  const candidates =
    entry === undefined
      ? [PLACEHOLDER_DESCRIPTION]
      : typeof entry === 'string'
        ? [entry]
        : entry.length === 0
          ? [PLACEHOLDER_DESCRIPTION]
          // A forced/oversized-section split can produce more parts than
          // there are stored descriptions for, in which case the extra
          // parts fall back to the placeholder (see resolveDescription).
          : [...entry, PLACEHOLDER_DESCRIPTION];
  return Math.max(...candidates.map((d) => codePointLength(`> ${d}\n\n`)));
}

async function generateProject(
  project: string,
  version: string,
  sourceDir: string,
  dirNameToPrefix: DirNameToPrefix,
  descriptions: DescriptionsMap,
  options: GenerateOptions,
): Promise<ProjectResult | null> {
  const urlSlug = getUrlSlugForDir(dirNameToPrefix, project);
  if (urlSlug === undefined) {
    console.warn(`Skipping project "${project}": no URL prefix found in dir-name-to-prefix.json`);
    return null;
  }
  const { title: rawTitle, constants, substitutions: projectSubstitutions } = await loadSnootyConfig(sourceDir);
  const projectTitle = resolveAllSubstitutions(rawTitle, constants, projectSubstitutions) || project;
  const headerTitle = version ? `${projectTitle} - (${version})` : projectTitle;

  const rootIndexPath = path.join(sourceDir, 'index.txt');
  const files = await collectTxtFiles(sourceDir);
  const pages: PageEntry[] = [];

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf-8');

    let title = extractPageTitle(content);
    if (title === '') {
      // Without a title there's nothing meaningful to link; skip.
      continue;
    }
    // Precedence (lowest to highest): the project-wide `[substitutions]`
    // table, substitutions from any snippet this page pulls in via
    // `.. include::`, then the page's own direct `.. |name| replace::`
    // declarations.
    const includedSubstitutions = await resolveIncludedSubstitutions(content, sourceDir);
    const pageSubstitutions = {
      ...projectSubstitutions,
      ...includedSubstitutions,
      ...extractLocalSubstitutions(content),
    };
    title = resolveAllSubstitutions(title, constants, pageSubstitutions);
    const description = resolveAllSubstitutions(extractMetaDescription(content), constants, pageSubstitutions);

    const pagePath = computePagePath(sourceDir, filePath);
    const productionUrl = buildUrl(options.baseUrl, urlSlug, version, pagePath);
    const isRootIndex = filePath === rootIndexPath;

    pages.push({
      title,
      url: toMarkdownUrl(productionUrl, isRootIndex),
      description,
      sourcePath: filePath,
      pagePath,
      l3: firstPathSegment(pagePath),
    });
  }

  if (pages.length === 0) {
    return null;
  }

  pages.sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));

  // Representative description used for size-estimation purposes only
  // (deciding whether this project needs to split at all); if it does
  // split, each part below resolves its own description by part index.
  const indexDescription = resolveDescription(project, 0, descriptions);
  const charsWithDescriptions = codePointLength(renderContent(headerTitle, indexDescription, pages, true));
  const charsWithoutDescriptions = codePointLength(renderContent(headerTitle, indexDescription, pages, false));
  const singleFileChars = options.noDescriptions ? charsWithoutDescriptions : charsWithDescriptions;

  const projectOutputDir = path.join(options.outputDir, project);
  // Remove any previously written files first: otherwise a project whose
  // part count shrinks between runs (e.g. 7 parts down to 5) would leave
  // stale, no-longer-referenced part files (6, 7, ...) behind.
  await fs.rm(projectOutputDir, { recursive: true, force: true });
  await fs.mkdir(projectOutputDir, { recursive: true });

  const outputPaths: string[] = [];
  let anyPartOverLimit = false;

  // An explicit CLI flag wins for whichever project --for-project targets;
  // otherwise fall back to this project's built-in override, if any. A
  // forced part count always splits, even if the content would otherwise
  // fit in one file.
  const override = FORCED_SPLIT_BY_PROJECT[project];
  const forcedParts =
    options.parts && options.parts > 1 ? options.parts : override?.parts && override.parts > 1 ? override.parts : undefined;
  const forcedSectionParts = options.oversizedSectionParts ?? override?.oversizedSectionParts;

  if (!forcedParts && singleFileChars <= LLMS_TXT_CHAR_LIMIT) {
    const content = renderContent(headerTitle, indexDescription, pages, !options.noDescriptions);
    const outputPath = path.join(projectOutputDir, 'llms.txt');
    await fs.writeFile(outputPath, content, 'utf-8');
    outputPaths.push(outputPath);
  } else {
    // Reserve room for each part's own header line, e.g.
    // "# <title> (Part 12 of 34)" ("999" is a generously conservative
    // stand-in for the real part numbers, which aren't known until after
    // chunking), plus its "> description" blockquote.
    const headerOverhead =
      codePointLength(`# ${headerTitle} (Part 999 of 999)\n\n`) +
      maxDescriptionOverhead(project, descriptions, !options.noDescriptions);
    // Any part still over the limit after the initial (L3) split — e.g. a
    // single section like manual's reference/ or ops-manager's
    // reference/api/ that's larger than the limit on its own — is
    // recursed into progressively deeper path segments until it fits.
    const chunks = splitPagesRecursively(
      pages,
      LLMS_TXT_CHAR_LIMIT,
      headerOverhead,
      forcedParts,
      forcedSectionParts,
      !options.noDescriptions,
    );

    const totalParts = chunks.length;
    for (let i = 0; i < chunks.length; i++) {
      const partNumber = i + 1;
      const partHeaderTitle = `${headerTitle} (Part ${partNumber} of ${totalParts})`;
      const partDescription = resolveDescription(project, i, descriptions);
      const partContent = renderContent(partHeaderTitle, partDescription, chunks[i].pages, !options.noDescriptions);
      if (codePointLength(partContent) > LLMS_TXT_CHAR_LIMIT) {
        // Only possible when a single section is still larger than the
        // limit on its own even after recursing to MAX_SPLIT_DEPTH; we
        // don't break a section apart to avoid this.
        anyPartOverLimit = true;
      }
      // Named "<project>-<n>-llms.txt" (not "llms-<project>-<n>.txt") so the
      // path still *ends* with "llms.txt": the edge proxy routes any request
      // path ending in "llms.txt" straight to the S3 bucket, and a prefix
      // like "llms-manual-3.txt" doesn't match that suffix check.
      const outputPath = path.join(projectOutputDir, `${project}-${partNumber}-llms.txt`);
      await fs.writeFile(outputPath, partContent, 'utf-8');
      outputPaths.push(outputPath);
    }
  }

  return {
    project,
    version,
    pages,
    outputPaths,
    anyPartOverLimit,
    indexDescription,
    charsWithDescriptions,
    charsWithoutDescriptions,
  };
}

/**
 * Builds llms.txt files for the current (+ non-versioned) pages of each
 * documentation project and writes them under options.outputDir. Returns
 * one ProjectResult per project processed, sorted by project name.
 */
export async function generate(options: GenerateOptions): Promise<ProjectResult[]> {
  const contentDir = path.join(options.monorepoPath, 'content');
  try {
    const stat = await fs.stat(contentDir);
    if (!stat.isDirectory()) {
      throw new Error();
    }
  } catch {
    throw new Error(`content directory not found: ${contentDir}`);
  }

  const dirNameToPrefix = await loadDirNameToPrefixMap(options.monorepoPath);
  const descriptions = await loadDescriptions(options.descriptionsPath);

  // entries is all the directories in the content directory
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const results: ProjectResult[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const project = entry.name;
    if (EXCLUDED_PROJECTS.has(project) || INTERNAL_ONLY_PROJECTS.has(project)) {
      continue;
    }
    if (options.forProject && project !== options.forProject) {
      continue;
    }

    const projectDir = path.join(contentDir, project);
    const found = await currentSourceDir(projectDir);
    if (!found) {
      // No resolvable current source directory; skip.
      continue;
    }

    const result = await generateProject(
      project,
      found.version,
      found.sourceDir,
      dirNameToPrefix,
      descriptions,
      options,
    );
    if (result) {
      results.push(result);
    }
  }

  results.sort((a, b) => (a.project < b.project ? -1 : a.project > b.project ? 1 : 0));
  return results;
}
