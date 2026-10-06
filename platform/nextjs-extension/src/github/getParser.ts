import fs from 'node:fs/promises';
import path from 'node:path';
import AdmZip from 'adm-zip';
import type { NetlifyPluginUtils } from '@netlify/build';
import {
  type Environments,
  MONGODB_ORG,
  PARSER_SITE_NAME,
} from '../util/databaseConnection/types';
import { getRepoPaths } from '../paths';

const VERSION_MARKER = '.snooty-version';

/** Absolute path of the snooty executable inside the release archive. */
export const getParserBinaryPath = (parserDir: string) =>
  path.join(parserDir, 'snooty', 'snooty');

interface ReleasePlatform {
  platform?: NodeJS.Platform;
  arch?: string;
}

export const getReleasePlatform = ({ platform = process.platform, arch = process.arch }: ReleasePlatform): string => {
  if (platform === 'linux' && arch === 'x64') return 'linux_x86_64';
  if (platform === 'darwin' && arch === 'arm64') return 'darwin_arm64';
  if (platform === 'darwin' && arch === 'x64') return 'darwin_x86_64';
  throw new Error(`No snooty-parser release binary for ${platform}/${arch}`);
};

export const getReleaseUrl = (version: string, releasePlatform: string) =>
  `https://github.com/${MONGODB_ORG}/${PARSER_SITE_NAME}/releases/download/${version}/snooty-${version}-${releasePlatform}.zip`;

const readInstalledVersion = async (parserDir: string) => {
  try {
    await fs.access(getParserBinaryPath(parserDir));
    return (await fs.readFile(path.join(parserDir, VERSION_MARKER), 'utf-8')).trim();
  } catch {
    return undefined;
  }
};

const downloadParser = async (parserDir: string, version: string) => {
  const url = getReleaseUrl(version, getReleasePlatform({}));
  console.log(`Downloading parser ${version} from ${url} ...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download parser ${version} (${response.status} ${response.statusText}) from ${url}. PARSER_VERSION must be a snooty-parser release tag.`,
    );
  }
  const archive = Buffer.from(await response.arrayBuffer());

  await fs.rm(parserDir, { recursive: true, force: true });
  await fs.mkdir(parserDir, { recursive: true });
  new AdmZip(archive).extractAllTo(parserDir, true, true);

  const binaryPath = getParserBinaryPath(parserDir);
  await fs.chmod(binaryPath, 0o755);
  await fs.writeFile(path.join(parserDir, VERSION_MARKER), version);
  console.log(`Installed parser ${version} to ${binaryPath}`);
};

/** Installs the snooty-parser release binary for the expected version,
 *  restoring it from the build cache when possible.
 * @returns true if the current parser version is valid for given env, false otherwise
 */
export const getParser = async ({
  run,
  cache,
  expectedParserVersion,
  environment,
}: {
  run: NetlifyPluginUtils['run'];
  cache: NetlifyPluginUtils['cache'];
  expectedParserVersion: string;
  environment: Environments;
}): Promise<boolean> => {
  if (!expectedParserVersion) {
    throw new Error('PARSER_VERSION is not set');
  }
  const { parserDir } = getRepoPaths();

  if ((await readInstalledVersion(parserDir)) === undefined) {
    await cache.restore(parserDir);
  }
  const installedVersion = await readInstalledVersion(parserDir);

  if (installedVersion === expectedParserVersion) {
    console.log(
      `Parser version ${expectedParserVersion} already installed, skipping download`,
    );
    return true;
  }

  console.log(
    `Installed parser version is ${installedVersion ?? 'none'}, expected ${expectedParserVersion}`,
  );
  await downloadParser(parserDir, expectedParserVersion);

  const { stdout } = await run.command(
    `${getParserBinaryPath(parserDir)} --help`,
    { stdout: 'pipe', stderr: 'pipe' },
  );
  if (!stdout.includes('snooty build')) {
    throw new Error(`Downloaded parser at ${parserDir} did not run correctly`);
  }
  await cache.save(parserDir);

  if (environment !== 'dotcomstg' && environment !== 'dotcomprd') {
    console.log(
      `Parser did not exist or did not match the expected version. However, "Environment = ${environment}", so cache will not be invalidated`,
    );
    return true;
  }
  console.log(
    `Parser did not exist or did not match the expected version. "Environment = ${environment}", entire cache will be invalidated`,
  );
  return false;
};
