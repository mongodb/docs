import { processFiles } from "../../processFiles.js";
import { exec, execSync, spawnSync } from "child_process";
import fs from "fs/promises";
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

// Check if Maven (`mvn`) is installed
function isMavenInstalled() {
  try {
    execSync("mvn -version", { stdio: "ignore" }); // Check Maven availability
    return true;
  } catch (error) {
    console.log("Maven is not installed. Skipping formatting step...");
    return false;
  }
}

// Helper to run the formatter on the temp directory
function runFormatter(tempDirectory) {
  const projectRoot = resolvePathFromGitRoot("code-example-tests/java/driver-sync");
  const relativeGlob = path.relative(projectRoot, tempDirectory) + "/**/*.java";

  const command = `mvn spotless:apply -Dspotless.cache.skip=true -Dspotless.apply.includes=${relativeGlob}`;

  return new Promise((resolve, reject) => {
    exec(command, { cwd: projectRoot }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running the formatting tool: ${error.message}`);
        reject(error);
      } else {
        // Filter for relevant output lines
        const relevantLines = stdout
          .split("\n")
          .filter(
            (line) =>
              line.includes("Spotless.Format") || line.includes("Spotless.Java")
          )
          .join("\n");

        if (relevantLines) {
          console.log(`Formatter Output:\n${relevantLines}`);
        }

        if (stderr) {
          console.error(`Formatter Errors:\n${stderr}`);
        }

        resolve();
      }
    });
  });
}

// Helper to move files recursively from source to target directory
async function moveFiles(sourceDirectory, targetDirectory) {
  try {
    const files = await fs.readdir(sourceDirectory, { withFileTypes: true });
    for (const file of files) {
      const sourceFilePath = path.join(sourceDirectory, file.name);
      const targetFilePath = path.join(targetDirectory, file.name);

      if (file.isDirectory()) {
        await fs.mkdir(targetFilePath, { recursive: true });
        await moveFiles(sourceFilePath, targetFilePath); // Recursively handle subdirectories
      } else {
        await fs.rename(sourceFilePath, targetFilePath); // Move file
      }
    }
  } catch (error) {
    console.error(`Error moving files from ${sourceDirectory} to ${targetDirectory}: ${error.message}`);
    throw error;
  }
}

// Snip code example files, optionally format them, and write them to the output directory
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

    // If the person running the script has Maven installed, use it to run the
    // formatting script on the output files.
    const mavenInstalled = isMavenInstalled();

    if (mavenInstalled) {
      // Hard-coded temp directory inside Maven project scope. This is required
      // to run the formatting tool on the output files.
      const resolvedTempDirectory = resolvePathFromGitRoot("code-example-tests/java/driver-sync/src/main/temp");

      // Ensure the temp directory exists
      await fs.mkdir(resolvedTempDirectory, { recursive: true });

      // Snip the code example files to the temp directory
      await processFiles(resolvedStartDirectory, resolvedTempDirectory, IGNORE_PATTERNS);

      // Run Spotless formatter on the temp directory
      console.log(`Running formatter.`);
      await runFormatter(resolvedTempDirectory);
      console.log("Formatting completed.");

      // Move formatted files to output directory
      console.log(`Moving formatted files to output directory: ${resolvedOutputDirectory}`);
      await moveFiles(resolvedTempDirectory, resolvedOutputDirectory);

      // Cleanup: Remove temp directory and intermediate files
      await fs.rm(resolvedTempDirectory, { recursive: true, force: true });
      console.log(`Temporary directory cleaned up: ${resolvedTempDirectory}`);
    } else {
      // If the user does not have Maven installed, snip files directly to the
      // output directory without formatting them.
      await processFiles(resolvedStartDirectory, resolvedOutputDirectory, IGNORE_PATTERNS);
      console.log(`Processed files directly to output directory: ${resolvedOutputDirectory}`);
    }
  } catch (error) {
    console.error("Error during processing, formatting, or moving files:", error);
  }
}

main();
