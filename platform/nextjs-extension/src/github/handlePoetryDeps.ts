import type { NetlifyPluginUtils } from '@netlify/build';
import path from 'node:path';

// TODO: When to update poetry based on version
export const handlePoetryDeps = async ({
  parserPath,
  run,
  cache,
  poetryPath,
  localBinDir,
  localLibDir,
}: {
  parserPath: string;
  run: NetlifyPluginUtils['run'];
  cache: NetlifyPluginUtils['cache'];
  poetryPath: string;
  localBinDir: string;
  localLibDir: string;
}): Promise<void> => {
  console.log('Checking if poetry is installed...');
  try {
    const { stdout } = await run.command(`${poetryPath} --version`, {
      cwd: parserPath,
      stdout: 'pipe',
    });
    console.log(`Found cached poetry installation: ${stdout.trim()}`);
  } catch (error) {
    console.log('Poetry not found in cache. Installing poetry...');
    await run.command('python3 -m pip install --user poetry', {
      cwd: parserPath,
      stdout: 'ignore',
    });

    const [binCached, libCached] = await Promise.all([
      cache.save(localBinDir),
      cache.save(localLibDir),
    ]);

    console.log(
      `Poetry executable and Python packages cached successfully: ${binCached && libCached}`,
    );
  }

  console.log('Pinning poetry environment to python3.12...');
  await run.command('poetry env use python3.12', {
    cwd: parserPath,
    stdout: 'ignore',
  });

  console.log('Installing parser dependencies with poetry...');
  await run.command('poetry install', {
    cwd: parserPath,
    stdout: 'ignore',
  });
};

export const getPoetryPaths = () => {
  const homeDir = process.env.HOME as string;
  const localBinDir = path.join(homeDir, '.local', 'bin');
  const localLibDir = path.join(homeDir, '.local', 'lib');
  const poetryPath = path.join(localBinDir, 'poetry');
  return { localBinDir, localLibDir, poetryPath };
};

export const restorePoetry = async ({
  localBinDir,
  localLibDir,
  cache,
}: {
  localBinDir: string;
  localLibDir: string;
  cache: NetlifyPluginUtils['cache'];
}): Promise<boolean> => {
  const [binRestored, libRestored] = await Promise.all([
    cache.restore(localBinDir),
    cache.restore(localLibDir),
  ]);

  const poetryRestored = binRestored && libRestored;
  console.log(`Poetry restored successfully: ${poetryRestored}`);
  return poetryRestored;
};
