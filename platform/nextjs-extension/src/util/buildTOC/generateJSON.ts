import type { NetlifyPluginUtils } from '@netlify/build';
import { MutError } from '../errorClasses';

export const buildUnifiedTOC = async ({
  run,
  tableOfContentsCWD,
}: {
  run: NetlifyPluginUtils['run'];
  tableOfContentsCWD: string;
}) => {
  try {
    await run.command('pnpm install', {
      cwd: tableOfContentsCWD,
    });

    await run.command('pnpm run toc:clean', {
      cwd: tableOfContentsCWD,
      stdout: 'inherit',
      stderr: 'inherit',
    });

    await run.command('pnpm run toc:build', {
      cwd: tableOfContentsCWD,
      stdout: 'inherit',
      stderr: 'inherit',
    });

    await run.command('pnpm run toc:run', {
      cwd: tableOfContentsCWD,
      stdout: 'inherit',
      stderr: 'inherit',
    });
    console.log('Finished building the toc \n');
    console.log('=======================================');
  } catch (e) {
    console.error('Error building the toc', e);
    throw new MutError(`Error building the toc: ${e}`);
  }
};
