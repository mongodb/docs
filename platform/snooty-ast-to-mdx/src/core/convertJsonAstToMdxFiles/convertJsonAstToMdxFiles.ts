import fs from 'node:fs/promises';
import { posix as path } from 'node:path';
import { convertMdastToMdx } from '../convertMdastToMdx';
import { convertSnootyAstToMdast } from '../convertSnootyAstToMdast/convertSnootyAstToMdast';
import { buildReferencesArtifacts, readExistingReferences, mergeReferences } from './buildReferencesArtifacts';
import type { ReferencesArtifact } from './buildReferencesArtifacts';
import type { SnootyNode } from '../convertSnootyAstToMdast/types';

interface ConvertJsonAstToMdxFilesOptions {
  ast: SnootyNode;
  outputPath: string;
  outputRootDir?: string;
}

type ConvertJsonAstToMdxFiles = (args: ConvertJsonAstToMdxFilesOptions) => Promise<{
  fileCount: number;
  emittedReferencesFile?: string;
}>;

/** Convert a JSON AST to an MDX file and create additional files (refs, includes, etc.) */
export const convertJsonAstToMdxFiles: ConvertJsonAstToMdxFiles = async ({ ast, outputPath, outputRootDir }) => {
  // Track unique output file paths we've written during this process to avoid
  // duplicate writes and over-counting when includes repeat across pages.
  const emittedFilePaths = new Set<string>();
  const additionalRefs: ReferencesArtifact = {
    substitutions: {},
    refs: {},
  };

  const rootDir = outputRootDir ?? path.dirname(outputPath);
  const mdast = convertSnootyAstToMdast(ast, {
    // Make the current output file path relative to the provided output root directory
    currentOutfilePath: path.relative(rootDir, outputPath),
    onEmitMdxFile: async ({ outfilePath, mdastRoot }) => {
      try {
        const outPath = path.join(rootDir, outfilePath);
        const resolvedOutPath = path.resolve(outPath);

        if (!emittedFilePaths.has(resolvedOutPath)) {
          const mdxContent = convertMdastToMdx(mdastRoot);

          await fs.mkdir(path.dirname(outPath), { recursive: true });
          await fs.writeFile(outPath, mdxContent);
          emittedFilePaths.add(resolvedOutPath);
        }

        const references = mdastRoot.__references as ReferencesArtifact;
        if (references) {
          Object.assign(additionalRefs.substitutions, references.substitutions || {});
          Object.assign(additionalRefs.refs, references.refs || {});
        }
      } catch (error) {
        console.error('Failed to emit include file:', outfilePath, error);
      }
    },
  });

  const resolvedMainOutPath = path.resolve(outputPath);

  if (!emittedFilePaths.has(resolvedMainOutPath)) {
    const mdx = convertMdastToMdx(mdast);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, mdx);
    emittedFilePaths.add(resolvedMainOutPath);
  }

  const refsArtifact = mdast.__references as ReferencesArtifact;
  const emittedReferencesFile = await createReferencesFiles({ rootDir, refsArtifact, additionalRefs });

  return {
    fileCount: emittedFilePaths.size,
    emittedReferencesFile,
  };
};

interface CreateReferencesFilesArgs {
  rootDir: string;
  refsArtifact: ReferencesArtifact;
  additionalRefs: ReferencesArtifact;
}

/** If references were collected, emit or update a _references.ts file at the output root directory */
const createReferencesFiles = async ({ rootDir, refsArtifact, additionalRefs }: CreateReferencesFilesArgs) => {
  if (refsArtifact || Object.keys(additionalRefs.substitutions).length || Object.keys(additionalRefs.refs).length) {
    if (refsArtifact) {
      Object.assign(additionalRefs.substitutions, refsArtifact.substitutions || {});
      Object.assign(additionalRefs.refs, refsArtifact.refs || {});
    }

    const refsPath = path.join(rootDir, '_references.ts');
    await fs.mkdir(path.dirname(refsPath), { recursive: true });

    const existing = await readExistingReferences(refsPath);
    const merged = mergeReferences({ base: existing, add: additionalRefs });
    const { ts: tsOut, json: jsonOut } = buildReferencesArtifacts(merged);

    await fs.writeFile(refsPath, tsOut);
    await fs.writeFile(refsPath.replace(/\.ts$/, '.json'), jsonOut);
    return refsPath;
  }
};
