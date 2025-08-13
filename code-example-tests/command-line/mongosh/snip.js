import { processFiles } from "../../processFiles.js";
import { spawnSync } from 'child_process';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["node_modules"]);

const START_DIRECTORY = "code-example-tests/command-line/mongosh/examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/command-line/mongosh";
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

// NOTE: Formatting with Prettier is not currently supported for the mongosh
// code examples, because the default rules we used elsewhere conflict with the
// mongosh script execution syntax - i.e. caused otherwise passing tests to fail.
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
