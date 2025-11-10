import { processFiles } from "../../processFiles.js";
import { exec, execSync, spawnSync } from 'child_process';
import path from 'path';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["example_stub.go", "example_stub_output.txt"]);

const START_DIRECTORY = "code-example-tests/go/driver/examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/go/driver";
// ------ END CONFIGURATION --------------------------------------------------

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

// Check if Go is installed
function isGoInstalled() {
  try {
    execSync('go version', { stdio: 'ignore' }); // Check Go availability
    return true;
  } catch {
    console.log('Go is not installed. Skipping formatting step...');
    return false;
  }
}

// Helper to run Go formatting tools on the output directory
function runGoFormatter(directory) {
  return new Promise((resolve, reject) => {
    // Use find to locate all .go files that are NOT snippet files and format them individually
    // Snippet files (*.snippet.*.go) are code fragments and don't need formatting
    const command = `find "${directory}" -name "*.go" ! -name "*.snippet.*.go" -exec go fmt {} \\;`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running go fmt: ${error.message}`);
        reject(error);
      } else if (stderr) {
        console.error(`go fmt Errors:\n${stderr}`);
      }
      console.log(`Go formatting completed on: ${directory}`);
      resolve();
    });
  });
}

// Snip code example files, and then run Go formatting tools on the output
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

    // If the person running the script has Go installed, use it to run the
    // formatting tools on the resolved output directory.
    const goInstalled = isGoInstalled();
    if (goInstalled) {
      const resolvedOutputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);
      console.log(
        `Processing Completed.\nRunning Go formatter on output directory: ${resolvedOutputDirectory}`
      );
      await runGoFormatter(resolvedOutputDirectory);
      console.log('Go formatting completed.');
    } else {
      // If the user does not have Go installed, snip files directly to
      // the output directory without formatting them.
      console.log(
        `Files processed but not formatted due to missing Go installation.`
      );
    }
  } catch (error) {
    console.error("Error during processing or formatting:", error);
  }
}

main();
