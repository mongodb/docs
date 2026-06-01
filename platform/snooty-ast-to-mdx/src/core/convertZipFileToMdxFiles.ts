import fs from 'node:fs/promises';
import { posix as path } from 'node:path';
import unzipper from 'unzipper';
import { BSON } from 'bson';
import { convertJsonAstToMdxFiles } from './convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';
import {
  buildSubstitutionDefinitionLiteralMap,
  buildSubstitutionRefXrefMap,
  findAllDirectivesByName,
} from './convertSnootyAstToMdast/convertSnootyAstToMdast';
import type { SnootyNode, SubstitutionRefXrefInfo } from './convertSnootyAstToMdast/types';
import { type RouteCollision, detectRouteCollisions, resolveRouteCollisions } from './detectRouteCollision';
import stableStringify from 'fast-json-stable-stringify';

/** some BSON files are not AST JSON, but rather raw text or RST */
const IGNORED_FILE_SUFFIXES = ['.txt.bson', '.rst.bson'] as const;

interface ConvertZipFileToMdxOptions {
  zipPath: string;
  outputDirectory: string;
  /** Additional directory to also write objects.inv into.
   *  For the stable branch of versioned projects, pass the project-level directory
   *  so objects.inv is served at both /docs/{project}/{version}/objects.inv
   *  and /docs/{project}/objects.inv. */
  additionalInvOutputDirectory?: string;
  onFileWrite?: (fileCount: number) => void;
}

type ConvertZipFileToMdx = (args: ConvertZipFileToMdxOptions) => Promise<{
  fileCount: number;
  assetChecksumToKey: Map<string, string>;
  routeCollisions: Array<RouteCollision>;
}>;

/** Convert a zip file to a folder of MDX files, preserving the zip's directory structure */
export const convertZipFileToMdx: ConvertZipFileToMdx = async ({ zipPath, outputDirectory, additionalInvOutputDirectory, onFileWrite }) => {
  const zipDir = await unzipper.Open.file(zipPath);

  await fs.mkdir(outputDirectory, { recursive: true });

  // Map asset checksum (compressed filename) -> semantic key (e.g., /images/foo.png)
  const assetChecksumToKey = new Map<string, string>();

  interface ZipPageJob {
    outputPath: string;
    astRoot: SnootyNode;
  }

  const pageJobs: ZipPageJob[] = [];
  const mergedSubstitutionXref = new Map<string, SubstitutionRefXrefInfo>();
  const mergedSubstitutionDefLiterals = new Map<string, string>();
  let pendingSiteData: BSON.Document | null = null;
  let pendingSiteJsonPath: string | null = null;

  for (const file of zipDir.files) {
    // skip files that are not BSON files or have ignored suffixes
    if (
      file.type !== 'File' ||
      !file.path.endsWith('.bson') ||
      IGNORED_FILE_SUFFIXES.some((suffix) => file.path.endsWith(suffix))
    ) {
      continue;
    }

    const docs: BSON.Document[] = [];
    try {
      const buffer = await file.buffer();
      let offset = 0;
      while (offset < buffer.length) {
        // Deserialize a single document at the current offset
        offset = BSON.deserializeStream(buffer, offset, 1, docs, docs.length, {
          allowObjectSmallerThanBufferSize: true,
        });
      }
    } catch (error) {
      console.warn(`Skipping '${file.path}' due to BSON deserialize error: ${(error as Error).message}`);
      continue;
    }

    if (!docs.length) {
      continue;
    }
    if (docs.length > 1) {
      console.warn(
        `\nWarning: ${file.path} contains ${docs.length} BSON documents - only the first one will be converted to MDX.\n`,
      );
    }

    if (file.path === 'site.bson') {
      const siteData = docs[0];
      // Extract objects.inv from static_files before removing it
      const invBinary = siteData.static_files?.['objects.inv'];
      if (invBinary != null) {
        const invBuffer = Buffer.from(invBinary.buffer ?? invBinary);
        await fs.writeFile(path.join(outputDirectory, 'objects.inv'), invBuffer);
        if (additionalInvOutputDirectory) {
          await fs.mkdir(additionalInvOutputDirectory, { recursive: true });
          await fs.writeFile(path.join(additionalInvOutputDirectory, 'objects.inv'), invBuffer);
        }
      }
      delete siteData.static_files;
      // Defer writing _site.json until after page processing so we can
      // include composable tutorial data collected from per-page ASTs.
      pendingSiteData = siteData;
      pendingSiteJsonPath = path.join(outputDirectory, '_site.json');
      continue;
    }

    const tree = docs[0] as SnootyNode;
    const astRoot = tree.ast ?? tree;
    for (const [k, v] of buildSubstitutionRefXrefMap(astRoot)) {
      mergedSubstitutionXref.set(k, v);
    }
    for (const [k, v] of buildSubstitutionDefinitionLiteralMap(astRoot)) {
      mergedSubstitutionDefLiterals.set(k, v);
    }

    // Collect static asset mappings for this page, if present
    if (tree && Array.isArray(tree.static_assets)) {
      for (const asset of tree.static_assets) {
        const checksum = asset?.checksum;
        const key = asset?.key;
        if (typeof checksum === 'string' && typeof key === 'string' && checksum && key) {
          assetChecksumToKey.set(checksum, key);
        }
      }
    }
    const relativePath = file.path.replace('.bson', '.mdx');
    // remove the nesting of the "documents" directory from the output path
    const outputPath = path.join(outputDirectory, relativePath).replace('documents/', '');

    // Mirror the legacy Gatsby rule (only `filename.endsWith('.txt')` became a Page):
    // `.rst` documents are includes, not standalone pages. Their content is emitted at
    // the referenced `_includes/` path during page conversion (convertDirectiveInclude),
    // so skip emitting them here to avoid creating directly-routable orphan pages.
    // Note: substitution and asset maps above are still collected for these documents.
    const filename = typeof tree.filename === 'string' ? tree.filename : '';
    if (filename.endsWith('.rst')) {
      continue;
    }

    pageJobs.push({ outputPath, astRoot });
  }

  // Collect composable tutorial selections per page slug, mirroring the
  // query-string permutations snooty/Gatsby added to the sitemap via resolvePages.
  const composablePages: Record<string, Array<Record<string, string>>> = {};

  let totalCount = 0;
  for (const job of pageJobs) {
    const selectedContentNodes = findAllDirectivesByName(
      job.astRoot.children ?? [],
      'selected-content',
    );
    if (selectedContentNodes.length > 0) {
      const seen = new Set<string>();
      const selections: Array<Record<string, string>> = [];
      for (const node of selectedContentNodes) {
        const sel =
          node.selections && typeof node.selections === 'object'
            ? (node.selections as Record<string, string>)
            : {};
        if (Object.keys(sel).length === 0) continue;
        const key = stableStringify(sel);
        if (!seen.has(key)) {
          seen.add(key);
          selections.push(sel);
        }
      }
      if (selections.length > 0) {
        // Derive slug from output path: strip outputDirectory prefix and .mdx suffix.
        const slug = job.outputPath
          .slice(outputDirectory.length + 1)
          .replace(/\.mdx$/, '');
        composablePages[slug] = selections;
      }
    }

    const { fileCount } = await convertJsonAstToMdxFiles({
      ast: job.astRoot,
      outputPath: job.outputPath,
      outputRootDir: outputDirectory,
      substitutionRefXref: mergedSubstitutionXref,
      substitutionDefLiterals: mergedSubstitutionDefLiterals,
    });

    totalCount += fileCount;
    onFileWrite?.(totalCount);
  }

  // Write _site.json now that composable page data has been collected.
  if (pendingSiteData && pendingSiteJsonPath) {
    if (Object.keys(composablePages).length > 0) {
      pendingSiteData.composablePages = composablePages;
    }
    await fs.writeFile(pendingSiteJsonPath, `${stableStringify(pendingSiteData)}\n`, 'utf-8');
  }

  // EDIT: this is commented out for now, since we are trying JSON instead of TS, but haven't fully committed to it yet.
  // cleanup the _references.json file (only used for faster rebuilds during conversion)
  // try {
  //   await fs.rm(path.join(outputDirectory, '_references.json'));
  // } catch (error) {
  //   console.warn(`Skipping '_references.json' cleanup due to error: ${(error as Error).message}`);
  // }

  // Post-processing: detect and resolve route collisions
  // example: a file called `about.mdx` would collide with `about/index.mdx` in Next.js
  const routeCollisions: Array<RouteCollision> = [];

  const collisions = await detectRouteCollisions(outputDirectory);
  for (const [route, files] of collisions.entries()) {
    routeCollisions.push({ route, files });
  }
  await resolveRouteCollisions({ outputDirectory: outputDirectory, collisions });

  return { fileCount: totalCount, assetChecksumToKey, routeCollisions };
};
