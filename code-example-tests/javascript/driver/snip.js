import { processFiles } from '../../processFiles.js';
import { exec, execSync, spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';
import { join } from 'path';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set([
  'node_modules',
  'example-folder',
  'example-stub.js',
]);

const START_DIRECTORY = 'code-example-tests/javascript/driver/examples';
const OUTPUT_DIRECTORY = 'content/code-examples/tested/javascript/driver';
// ------ END CONFIGURATION --------------------------------------------------

// Resolve the absolute path of the `.prettierrc` colocated with this script
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PRETTIER_CONFIG_PATH = path.resolve(SCRIPT_DIRECTORY, '.prettierrc');

// Check if Bluehawk is installed
function isBluehawkInstalled() {
  const errorString =
    'This script requires Bluehawk. Please run "npm install -g bluehawk" in the terminal, and then re-run this script.';

  const result = spawnSync('which', ['bluehawk'], { encoding: 'utf-8' });

  // If the spawnSync operation returns an exit code of 1, there was an error
  // running 'which bluehawk' and we can assume Bluehawk isn't installed
  if (result.status == 1) {
    console.error(errorString);
    return false;
  }
  return true;
}

// Resolves relative paths to absolute paths based on the Git repository root.
function resolvePathFromGitRoot(relativePath) {
  let gitRoot;
  try {
    gitRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
    }).trim();
  } catch (error) {
    console.error(
      'Error: Unable to determine the Git repository root. Ensure this script is run within a Git repository.'
    );
    throw error;
  }
  return path.resolve(gitRoot, relativePath);
}

// Check if Prettier is installed
function isPrettierInstalled() {
  try {
    execSync('prettier --version', { stdio: 'ignore' }); // Check Prettier availability
    return true;
  } catch {
    console.log('Prettier is not installed. Skipping formatting step...');
    return false;
  }
}

// Helper to recursively get all .js files in a directory
async function getAllJsFiles(dir, fileList = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await getAllJsFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

// Helper to format a single file with prettier
function formatFile(filePath) {
  return new Promise((resolve) => {
    const command = `prettier --config "${PRETTIER_CONFIG_PATH}" --write "${filePath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // File couldn't be formatted (likely syntax error), skip it
        resolve({ success: false, file: filePath, error: error.message });
      } else {
        resolve({ success: true, file: filePath });
      }
    });
  });
}

// Helper to run the formatting tool on the output directory
async function runFormatter(directory) {
  try {
    // Get all .js files in the directory
    const jsFiles = await getAllJsFiles(directory);

    if (jsFiles.length === 0) {
      console.log('No JavaScript files found to format.');
      return;
    }

    console.log(`Found ${jsFiles.length} JavaScript file(s) to format...`);

    // Format each file individually
    const results = await Promise.all(jsFiles.map(formatFile));

    // Summarize results
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(`Successfully formatted ${successful.length} file(s).`);

    if (failed.length > 0) {
      console.log(
        `\nSkipped ${failed.length} file(s) that could not be formatted:`
      );
      failed.forEach(({ file }) => {
        const relativePath = path.relative(directory, file);
        console.log(`  - ${relativePath}`);
      });
    }
  } catch (error) {
    console.error('Error during formatting:', error.message);
  }
}

// Snip code example files, and then run the formatting tool on the output
async function main() {
  // First, confirm the user has Bluehawk installed. If not, exit early.
  const bluehawkInstalled = isBluehawkInstalled();

  if (!bluehawkInstalled) {
    process.exit(1);
  }

  // If the user does have Bluehawk installed, process the code example files.
  try {
    // Snip the code example files to the output directory
    await processFiles(START_DIRECTORY, OUTPUT_DIRECTORY, IGNORE_PATTERNS);

    // If the person running the script has Prettier installed, use it to run the
    // formatting script on the resolved output directory.
    const prettierInstalled = isPrettierInstalled();
    if (prettierInstalled) {
      const resolvedOutputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);
      console.log(
        `Processing Completed.\nRunning formatter on output directory: ${resolvedOutputDirectory}`
      );
      await runFormatter(resolvedOutputDirectory);
      console.log('Formatting completed.');
    } else {
      // If the user does not have Prettier installed, snip files directly to
      // the output directory without formatting them.
      console.log(
        `Files processed but not formatted due to missing formatting dependency.`
      );
    }
  } catch (error) {
    console.error('Error during processing or formatting:', error);
  }
}

main();
