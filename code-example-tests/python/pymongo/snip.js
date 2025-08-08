import { processFiles } from "../../processFiles.js";
import { spawnSync } from 'child_process';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["__pycache__", "example_folder", "example_stub.py",
    "pylint-config.toml"]);

const START_DIRECTORY = "code-example-tests/python/pymongo/examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/python/pymongo";
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

// NOTE: Pylint is a linter, not a formatter, and linting the output files
// doesn't make sense because they are often small and atomic and missing
// variable declarations or other code elements that would cause linting to fail.
// Until we add a formatter for Python, we're only snipping the files here.
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
  } catch (error) {
    console.error("Error during processing or formatting:", error);
  }
}

main();
