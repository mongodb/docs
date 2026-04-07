import fsExists from 'fs.promises.exists';
import type { NetlifyPluginUtils } from '@netlify/build';
import path from 'node:path';

export const OAS_PAGE_BUILDER_PATH = `${process.cwd()}/oas-worker-pool/modules/oas-page-builder`;

export async function downloadOasPageBuilderModule({
  run,
  WORKER_POOL_PATH = `${process.cwd()}/oas-worker-pool`,
  OAS_PAGE_BUILDER_PATH = `${process.cwd()}/oas-worker-pool/modules/oas-page-builder`,
}: {
  run: NetlifyPluginUtils['run'];
  WORKER_POOL_PATH?: string;
  OAS_PAGE_BUILDER_PATH?: string;
}): Promise<void> {
  const oasPageBuilderEntrypoint = path.join(
    OAS_PAGE_BUILDER_PATH,
    'dist/index',
  );
  const isModuleDownloaded = await fsExists(oasPageBuilderEntrypoint);
  if (isModuleDownloaded) return;

  console.log('Downloading OAS module');

  await run.command(
    'git clone --depth 1 --filter=tree:0 https://github.com/mongodb/docs-worker-pool.git --sparse oas-worker-pool',
  );

  await run.command(
    'git sparse-checkout set --no-cone modules/oas-page-builder',
    {
      cwd: WORKER_POOL_PATH,
    },
  );

  await run.command('npm ci', {
    cwd: OAS_PAGE_BUILDER_PATH,
  });

  await run.command('npm run build', {
    cwd: OAS_PAGE_BUILDER_PATH,
  });
}
