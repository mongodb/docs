import { processFiles } from "../../processFiles.js";
import { collapseImportBlocksInDir, formatGoTargets } from "../collapse-import-blanks.js";
import { execSync, spawnSync } from 'child_process';
import path from 'path';

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["example_stub.go", "example_stub_output.txt", "names.go"]);

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

    const resolvedOutputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);

    // If the person running the script has Go installed, use it to run the
    // formatting tools on the resolved output directory. The pass itself lives
    // in collapse-import-blanks.js so this wrapper and the shell wrappers share
    // one implementation instead of one copy each.
    const goInstalled = isGoInstalled();
    if (goInstalled) {
      console.log(
        `Processing Completed.\nRunning Go formatter on output directory: ${resolvedOutputDirectory}`
      );
      const stats = formatGoTargets([resolvedOutputDirectory]);
      if (stats.normalized > 0) {
        console.log(`Normalized import blocks in ${stats.normalized} file(s).`);
      }
      if (stats.failed > 0) {
        // Every file has been attempted, so failing here does not abandon the
        // rest of the run. A file the normalizer could not rewrite still ships
        // with its double blank lines, so the run must not report success — the
        // completion line is withheld and this rejection is turned into a
        // nonzero exit by the catch below.
        throw new Error(
          `${stats.failed} file(s) under ${resolvedOutputDirectory} could not be normalized.`
        );
      }
      // gofmt rejects an unparseable snippet fragment, which is the case this
      // fallback exists for, so a nonzero count is not an error by itself.
      // Reporting it still matters: without the count, a run where gofmt failed
      // on *every* file (broken toolchain, bad PATH) announces unqualified
      // success while the snippets keep whatever formatting only gofmt would
      // have applied.
      const gofmtNote =
        stats.gofmtFailed > 0
          ? ` — gofmt did not process ${stats.gofmtFailed} of ${stats.files} file(s)`
          : "";
      console.log(
        `Go formatting completed on: ${resolvedOutputDirectory}${gofmtNote}`
      );
      console.log('Go formatting completed.');
    } else {
      // Without Go there is no gofmt to try first, so apply the import-block
      // normalizer directly to keep a `:remove:`'d import from leaving two
      // blank lines in the extracted snippets.
      const normalized = collapseImportBlocksInDir(resolvedOutputDirectory);
      if (normalized > 0) {
        console.log(`Normalized import blocks in ${normalized} file(s).`);
      }

      // If the user does not have Go installed, snip files directly to
      // the output directory without formatting them.
      console.log(
        `Files processed but not formatted due to missing Go installation.`
      );
    }
  } catch (error) {
    console.error("Error during processing or formatting:", error);
    // A run that could not process or format the output must not exit 0. The
    // failure would otherwise show up only as a line of log output, and the
    // stale or unformatted snippets would ship as if the run had succeeded.
    process.exitCode = 1;
  }
}

main();
