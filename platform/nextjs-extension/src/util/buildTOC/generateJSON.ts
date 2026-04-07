import type { NetlifyPluginUtils } from '@netlify/build';
import path from 'node:path';
import { MutError } from '../errorClasses';

export const buildUnifiedTOC = async ({
  run,
  tableOfContentsCWD,
}: {
  run: NetlifyPluginUtils['run'];
  tableOfContentsCWD: string;
}) => {
  try {
    await run.command('npm install', {
      cwd: tableOfContentsCWD,
    });

    await run.command('npm run toc:clean', {
      cwd: tableOfContentsCWD,
      stdout: 'inherit',
      stderr: 'inherit',
    });

    await run.command('npm run toc:build', {
      cwd: tableOfContentsCWD,
      stdout: 'inherit',
      stderr: 'inherit',
    });

    await run.command('npm run toc:run', {
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
