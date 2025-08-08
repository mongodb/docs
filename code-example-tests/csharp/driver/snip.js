import { processFiles } from "../../processFiles.js";
import { exec as childExec, execSync, spawnSync } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import path from "path";

const exec = promisify(childExec);

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set([
  'bin',
  'Examples.csproj',
  'ExampleStub.cs',
  'Program.cs',
  'obj'
]);

const START_DIRECTORY = "code-example-tests/csharp/driver/Examples";
const OUTPUT_DIRECTORY = "content/code-examples/tested/csharp/driver";
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
    console.error("Error: Unable to determine the Git repository root. Ensure this script is run within a Git repository.");
    throw error;
  }
  return path.resolve(gitRoot, relativePath);
}

// Check if dotnet CLI is installed
function isDotnetInstalled() {
  try {
    execSync("dotnet --version", { stdio: "ignore" }); // Check dotnet CLI availability
    return true;
  } catch {
    console.log("Dotnet CLI is not installed. Skipping formatting step...");
    return false;
  }
}

// Helper to run dotnet format
async function runFormatter(tempDirectory) {
  const tempCsprojPath = path.join(tempDirectory, "TempFormattingProject.csproj");

  try {
    // Create temporary `.csproj` file
    const tempCsprojContent = `
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="**/*.cs" />
  </ItemGroup>
</Project>
    `;
    await fs.writeFile(tempCsprojPath, tempCsprojContent);

    // Run dotnet format on the temp `.csproj` file with quiet verbosity
    const command = `dotnet format "${tempCsprojPath}" --verbosity quiet`;
    const { stdout, stderr } = await exec(command); // Use `exec` directly for Promise-based execution

    // Log only errors if present
    if (stderr && stderr.trim()) {
      console.error(`Formatter Errors:\n${stderr}`);
    }
  } catch (error) {
    console.error(`Error running dotnet format: ${error.message}`);
    throw error;
  } finally {
    // Cleanup: Remove temp `.csproj` file
    await fs.rm(tempCsprojPath);
  }
}

// Helper to move files recursively from source to target directory
async function moveFiles(sourceDirectory, targetDirectory) {
  try {
    const files = await fs.readdir(sourceDirectory, { withFileTypes: true });
    for (const file of files) {
      if (IGNORE_PATTERNS.has(file.name)) {
        continue; // Skip the file or directory
      }

      const sourceFilePath = path.join(sourceDirectory, file.name);
      const targetFilePath = path.join(targetDirectory, file.name);

      if (file.isDirectory()) {
        await fs.mkdir(targetFilePath, { recursive: true });
        await moveFiles(sourceFilePath, targetFilePath, IGNORE_PATTERNS); // Recursively handle subdirectories
      } else {
        await fs.rename(sourceFilePath, targetFilePath); // Move file
      }
    }
  } catch (error) {
    console.error(`Error moving files from ${sourceDirectory} to ${targetDirectory}: ${error.message}`);
    throw error;
  }
}

// Snip code example files, format them, and write them to the output directory
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

    // If the person running the script has dotnet CLI installed, use it to
    // run the formatting tool
    const dotnetInstalled = isDotnetInstalled();

    if (dotnetInstalled) {
      // Hard-coded temp directory inside .NET project scope
      const resolvedTempDirectory = resolvePathFromGitRoot("code-example-tests/csharp/driver/tempFormat");

      // Ensure the temp directory exists
      await fs.mkdir(resolvedTempDirectory, { recursive: true });

      // Snip the code example files into the temp directory
      console.log(`Snipping files to temporary directory: ${resolvedTempDirectory}`);
      await processFiles(resolvedStartDirectory, resolvedTempDirectory, IGNORE_PATTERNS);

      // Run dotnet format
      console.log(`Running formatter`);
      await runFormatter(resolvedTempDirectory);
      console.log("Formatting completed.");

      // Move formatted files to the output directory
      console.log(`Moving formatted files to output directory: ${resolvedOutputDirectory}`);
      await moveFiles(resolvedTempDirectory, resolvedOutputDirectory);

      // Cleanup: Remove temp directory and intermediate files
      await fs.rm(resolvedTempDirectory, { recursive: true, force: true });
      console.log(`Temporary directory cleaned up: ${resolvedTempDirectory}`);
    } else {
      // If the user does not have dotnet CLI installed, snip files directly
      // to the output directory without formatting them.
      console.log(`Dotnet CLI not found. Processing files directly to output directory.`);
      await processFiles(resolvedStartDirectory, resolvedOutputDirectory, IGNORE_PATTERNS);
    }
  } catch (error) {
    console.error("Error during processing, formatting, or moving files:", error);
  }
}

main();
