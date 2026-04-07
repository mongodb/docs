import type { NetlifyPluginUtils } from '@netlify/build';
import path from 'node:path';
import fsExists from 'fs.promises.exists';
import { deserialize, type Document } from 'bson';
import { promises as fsPromises } from 'node:fs';

const BUNDLE_PATH = `${process.cwd()}/bundle`;
//TODO: Move to Netlify.toml
const REDOC_CLI_VERSION = '1.3.4';

export const hasOpenAPIPages = async (
  run: NetlifyPluginUtils['run'],
  manifestPath?: string,
): Promise<false | Document> => {
  await run.command(`unzip -o -q ${manifestPath ?? 'bundle.zip'} -d bundle`);

  const siteBson = await fsPromises.readFile(`${BUNDLE_PATH}/site.bson`);
  const buildMetadata = deserialize(siteBson);

  if (!buildMetadata.openapi_pages) {
    console.log('No OpenAPI pages found');
    return false;
  }
  console.log('OpenAPI pages found in repo');
  return buildMetadata;
};

export const cloneRedoc = async ({
  run,
  cache,
  redocPath = path.resolve('redoc'),
}: {
  run: NetlifyPluginUtils['run'];
  cache?: NetlifyPluginUtils['cache'];
  redocPath?: string;
}) => {
  if (cache) {
    await cache.restore(redocPath);
  }
  if (await fsExists(redocPath)) {
    console.log('Redoc already exists, will not re-clone');
    return;
  }

  await run.command(
    `git clone -b @dop/redoc-cli@${REDOC_CLI_VERSION} --depth 1 https://github.com/mongodb-forks/redoc.git redoc`,
  );
  await run.command('npm ci --prefix cli/ --omit=dev', {
    cwd: redocPath,
  });
};
