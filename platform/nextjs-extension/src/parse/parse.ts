import type { NetlifyPluginUtils } from '@netlify/build';
import type { ExecaError } from 'execa';
import path from 'node:path';
import { MutError } from '../util/errorClasses';
import { cacheParserFiles } from './handleParserCaching';

export type ParserCommandArgs = {
  parserPath: string;
  parsedOutputPath: string;
  version: string;
  contentPath: string;
  poetryCommand?: string;
  cacheDirectoryPath?: string;
};

export const parse = async ({
  parserPath,
  parsedOutputPath,
  version,
  contentPath,
  poetryCommand,
  netlifyPluginUtils: { run, cache },
}: ParserCommandArgs & {
  netlifyPluginUtils: Pick<NetlifyPluginUtils, 'run' | 'cache'>;
}): Promise<string> => {
  console.log(
    `==================================================================== Running parser for ${version}... =====================================================================`,
  );

  await makeExamples({ contentPath, run });

  try {
    console.log('Executing parser command...');

    const { all, stdout, stderr } = await run.command(
      `python3 -m poetry run snooty build ${contentPath} --no-caching --output=${parsedOutputPath}.zip --branch=${version}`,
      {
        cwd: parserPath,
        all: true,
      },
    );

    return all ?? stderr + stdout;
  } catch (e) {
    const exitCode = (e as ExecaError).exitCode;
    console.log(
      `Parse for content path ${contentPath} with branch ${version} errored with exit code ${exitCode}`,
    );

    // Parser throws an error and exits with error code two if there are non-breaking errors
    if (exitCode !== 2) {
      console.log(e);
      throw new MutError(
        `Parse for content path ${contentPath} with branch ${version} errored with exit code ${exitCode}. Aborting build.`,
      );
    }
    return (e as ExecaError).all as string;
  }
};

export const makeExamples = async ({
  contentPath,
  run,
}: {
  contentPath: string;
  run: NetlifyPluginUtils['run'];
}) => {
  try {
    await run.command('make examples', {
      cwd: contentPath,
      stdout: 'ignore',
      stderr: 'ignore',
    });
    console.log(
      'Makefile "examples" command executed successfully for ',
      contentPath,
    );
  } catch (error: unknown) {
    if (
      (error as ExecaError).shortMessage ===
      'Command failed with exit code 2: make examples'
    ) {
      console.log('No Make Examples command found.');
    } else console.error('Error running Make Examples command', error);
  }
};
