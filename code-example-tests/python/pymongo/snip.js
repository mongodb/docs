import { processFiles } from "../../processFiles.js";

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["__pycache__", "example_folder", "example_stub.py",
    "pylint-config.toml"]);

const START_DIRECTORY = "code-example-tests/python/pymongo/examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/python/pymongo";
// ------ END CONFIGURATION --------------------------------------------------

// NOTE: Pylint is a linter, not a formatter, and linting the output files
// doesn't make sense because they are often small and atomic and missing
// variable declarations or other code elements that would cause linting to fail.
// Until we add a formatter for Python, we're only snipping the files here.
async function main() {
  try {
    // Snip the code example files to the output directory
    await processFiles(START_DIRECTORY, OUTPUT_DIRECTORY, IGNORE_PATTERNS);
  } catch (error) {
    console.error("Error during processing or formatting:", error);
  }
}

main();
