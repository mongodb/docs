import fs from 'fs';
import chalk from 'chalk';
import { convertJsonAstToMdxFiles } from './core/convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';
import { convertZipFileToMdx } from './core/convertZipFileToMdxFiles';
import { convertZipImageFiles } from './core/convertZipImageFiles';

function printUsage() {
  console.log(chalk.magenta('\nUsage:'));
  console.log(chalk.cyan('\tpnpm start'), chalk.yellow('/path/to/ast-input.json'));
  console.log(
    chalk.cyan('\tpnpm start'),
    chalk.yellow('/path/to/doc-site.zip'),
    chalk.gray('/optional/output/folder'),
    '\n',
  );
}

const main = async () => {
  const [_, __, input, outputPrefix] = process.argv;

  if (!input) {
    console.log(chalk.red('Error: No input file provided'));
    return printUsage();
  }

  const isJson = input.endsWith('.json');
  const isZip = input.endsWith('.zip');

  if (!isJson && !isZip) {
    console.log(chalk.red('Error: Input file must end in .json or .zip'));
    return printUsage();
  }

  if (isJson) {
    console.log(chalk.magenta(`Converting ${chalk.yellow(input)} to MDX...`), '\n');

    const tree = JSON.parse(fs.readFileSync(input, 'utf8'));
    const astRoot = tree.ast ?? tree;
    const outputPath = input.replace('.json', '_output.mdx');

    const { fileCount, emittedReferencesFile } = await convertJsonAstToMdxFiles({ ast: astRoot, outputPath });

    console.log(chalk.green(`✓ Wrote ${chalk.yellow(fileCount)} file(s)`), '\n');
    if (emittedReferencesFile) {
      console.log(chalk.green(`✓ Wrote ${chalk.yellow('./' + emittedReferencesFile)}`), '\n');
    }
    console.log(chalk.green(`✓ Wrote ${chalk.yellow(outputPath)}`), '\n');
  } else {
    console.log(chalk.magenta(`Converting ${chalk.yellow(input)} to MDX...`), '\n');

    const { outputDirectory, fileCount, assetChecksumToKey, routeCollisions } = await convertZipFileToMdx({
      zipPath: input,
      outputPrefix,
      onFileWrite: (count) => process.stdout.write(`\r${chalk.green(`✓ Wrote ${chalk.yellow(count)} MDX files`)}`),
    });

    const assetChecksums = await convertZipImageFiles({ outputDirectory, zipPath: input, assetChecksumToKey });

    console.log(chalk.green(`\n✓ Wrote ${chalk.yellow(assetChecksums.size)} static assets\n`));

    console.log(
      chalk.green(
        `✓ Wrote folder ${chalk.yellow(outputDirectory + '/')} -- ${chalk.yellow(
          fileCount + assetChecksums.size,
        )} total files\n`,
      ),
    );

    if (routeCollisions.length > 0) {
      console.log(chalk.yellow(`\n${chalk.red(routeCollisions.length)} route collision(s) detected:`));

      routeCollisions.forEach((collision) => {
        console.log(chalk.yellow(`  - ${chalk.red(collision.route)} (${collision.files.length} files)`));
      });
    }
  }
};

main();
