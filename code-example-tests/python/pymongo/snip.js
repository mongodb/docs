import { processFiles } from "../../processFiles.js";
import { spawnSync, execSync, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["__pycache__", "example_folder", "example_stub.py",
    "pylint-config.toml"]);

const START_DIRECTORY = "code-example-tests/python/pymongo/examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/python/pymongo";
// ------ END CONFIGURATION --------------------------------------------------

// Resolve the absolute path of the `pyproject.toml` colocated with this script
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

// Check if Bluehawk is installed
function isBluehawkInstalled() {
  const errorString = 'This script requires Bluehawk. Please run "npm install -g bluehawk" in the terminal, and then re-run this script.';

  const result = spawnSync("which", ["bluehawk"], { encoding: "utf-8" });

  // If the spawnSync operation returns an exit code of 1, there was an error
  // running 'which bluehawk' and we can assume Bluehawk isn't installed
  if (result.status == 1) {
    console.error(
      errorString
    );
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

// Check if Black is installed (in the virtual environment)
function isBlackInstalled() {
  try {
    // Check if Black is available in the virtual environment
    const venvPath = path.resolve(SCRIPT_DIRECTORY, 'venv', 'bin', 'black');
    execSync(`"${venvPath}" --version`, { stdio: 'ignore' });
    return true;
  } catch {
    // Fallback to system Black
    try {
      execSync('black --version', { stdio: 'ignore' });
      return true;
    } catch {
      console.log('Black is not installed (checked both venv and system). Skipping formatting step...');
      return false;
    }
  }
}

// Helper to run Black formatting on the output directory
function runFormatter(directory) {
  return new Promise((resolve, reject) => {
    // Try to use Black from the virtual environment first, then fall back to system Black
    const venvBlackPath = path.resolve(SCRIPT_DIRECTORY, 'venv', 'bin', 'black');
    let command;

    try {
      // Check if venv Black exists
      execSync(`"${venvBlackPath}" --version`, { stdio: 'ignore' });
      command = `"${venvBlackPath}" "${directory}"`;
    } catch {
      // Fall back to system Black
      command = `black "${directory}"`;
    }

    const options = {
      cwd: SCRIPT_DIRECTORY // Run from the script directory where pyproject.toml is located
    };

    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        // Black returns exit code 123 when it encounters syntax errors
        if (error.code === 123) {
          console.warn(`Black encountered syntax errors in some files:`);
          if (stdout) console.warn(stdout);
          if (stderr) console.warn(stderr);
          console.warn(`Some files could not be formatted due to syntax errors, but Black completed processing other files.`);
          // Don't reject for syntax errors - this is often expected during development
          resolve();
        } else {
          console.error(`Error running Black: ${error.message}`);
          if (stdout) console.error(`stdout: ${stdout}`);
          if (stderr) console.error(`stderr: ${stderr}`);
          reject(error);
        }
      } else {
        if (stdout) {
          console.log(`Black output:\n${stdout}`);
        }
        if (stderr) {
          console.error(`Black warnings:\n${stderr}`);
        }
        resolve();
      }
    });
  });
}

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

    // If the person running the script has Black installed, use it to run the
    // formatting script on the resolved output directory.
    const blackInstalled = isBlackInstalled();
    if (blackInstalled) {
      const resolvedOutputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);
      console.log(
        `Processing Completed.\nRunning formatter on output directory: ${resolvedOutputDirectory}`
      );
      await runFormatter(resolvedOutputDirectory);
      console.log('Formatting completed.');
    } else {
      // If the user does not have Black installed, snip files directly to
      // the output directory without formatting them.
      console.log(
        `Files processed but not formatted due to missing formatting dependency.`
      );
    }
  } catch (error) {
    console.error("Error during processing or formatting:", error);
  }
}

main();
