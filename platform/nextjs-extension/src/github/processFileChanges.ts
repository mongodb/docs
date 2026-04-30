import type { NetlifyPluginUtils } from '@netlify/build';
import { CONTENT_DIR_NAME } from '../paths';

export const getFileChanges = async ({
  run,
  git,
}: {
  run: NetlifyPluginUtils['run'];
  git: NetlifyPluginUtils['git'];
}): Promise<string[]> => {
  let fileChanges: string[] = [];

  try {
    // Look at changes in just the last commit
    const { stdout: changedFiles } = await run.command(
      'git show --name-only --format= HEAD',
      { stdout: 'pipe' },
    );
    fileChanges = changedFiles.trim().split('\n').filter(Boolean);

    const filesToShow = fileChanges.slice(0, 3);
    if (fileChanges.length > 3) {
      filesToShow.push('...');
    }
    console.log(
      `Found ${fileChanges.length} changed files in last commit: ${filesToShow.join(', ')}`,
    );
  } catch (error) {
    console.log('Git show failed, using Netlify git detection:', error);
    fileChanges = [
      ...git.modifiedFiles,
      ...git.createdFiles,
      ...git.deletedFiles,
    ];
    console.log(`Changed files (${fileChanges.length}):`, fileChanges);
  }
  console.log(
    '==========================================================================',
  );
  return fileChanges;
};

export const findContentPathsWithChanges = async ({
  fileChanges,
  allFullContentPaths,
}: {
  fileChanges: string[];
  allFullContentPaths: Array<string>;
}): Promise<{
  changedContentPaths: Array<string>;
  unchangedContentPaths: Array<string>;
}> => {
  const changedContentPaths: Array<string> = [];
  const unchangedContentPaths: Array<string> = [];

  // need /content/<projectName>/versionName
  for (const contentPath of allFullContentPaths) {
    const contentPathHasChanged = !!fileChanges.find((filePath) => {
      // Git paths are repo-root-relative (e.g. content/c-driver/current/source/foo.rst)
      // while contentPath is relative to contentDir (e.g. c-driver/current).
      const matches = filePath.startsWith(`${CONTENT_DIR_NAME}/${contentPath}`);
      return matches;
    });
    if (contentPathHasChanged) {
      changedContentPaths.push(contentPath);
    } else {
      unchangedContentPaths.push(contentPath);
    }
  }

  if (changedContentPaths.length) {
    console.log(
      `The following paths have content that has changed: ${changedContentPaths[0].length ? changedContentPaths.join(', ') : 'Content at root'}`,
    );
  }
  return { changedContentPaths, unchangedContentPaths };
};
