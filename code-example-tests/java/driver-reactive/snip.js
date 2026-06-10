import { processFiles } from "../../processFiles.js";
import { execSync, spawnSync } from "child_process";
import path from "path";

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["ExampleStub.java"]);

const START_DIRECTORY = "code-example-tests/java/driver-sync/src/main/java";
const OUTPUT_DIRECTORY = "content/code-examples/tested/java/driver-sync";
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
    gitRoot = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  } catch (error) {
    console.error(
      "Error: Unable to determine the Git repository root. Ensure this script is run within a Git repository."
    );
    throw error;
  }
  return path.resolve(gitRoot, relativePath);
}

// Snip code example files and write them to the output directory
async function main() {
  // First, confirm the user has Bluehawk installed. If not, exit early.
  const bluehawkInstalled = isBluehawkInstalled();

  if (!bluehawkInstalled) {
    process.exit(1);
  }

  // If the user does have Bluehawk installed, process the code example files.
  try {
    const resolvedStartDirectory = resolvePathFromGitRoot(START_DIRECTORY);
    const resolvedOutputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);

    await processFiles(resolvedStartDirectory, resolvedOutputDirectory, IGNORE_PATTERNS);
    console.log(`Processed files to output directory: ${resolvedOutputDirectory}`);
  } catch (error) {
    console.error("Error during processing or moving files:", error);
  }
}

main();
