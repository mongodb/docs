import fs from "fs";
import path from "path";
import { promisify } from "util";
import { execSync, exec as childExec } from "child_process";

const exec = promisify(childExec);

// Extensions defined in `BLUEHAWK_EXTENSIONS` can be snipped. Otherwise, treated as copy-only. 
const BLUEHAWK_EXTENSIONS = new Set([
  ".c", ".cpp", ".cs", ".dart", ".go", ".gradle", ".groovy", ".gsh", ".gvy",
  ".gy", ".h", ".hpp", ".htm", ".html", ".java", ".js", ".json", ".jsx", ".kt",
  ".m", ".md", ".mm", ".php", ".py", ".rb", ".rs", ".rst", ".sc", ".scala", ".sh",
  ".svg", ".swift", ".ts", ".tsx", ".txt", ".uxml", ".xaml", ".xml", ".yaml",
]);

/**
 * Resolves relative paths to absolute paths based on the Git repository root.
 * @param {string} relativePath - The relative path to resolve.
 * @returns {string} - The resolved absolute path.
 */
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

/**
 * Collects all files (recursively) in the given directory, ignoring specified patterns.
 * @param {string} dirPath - Directory to scan for files.
 * @param {Array<string>} arrayOfFiles - Array to hold the file paths.
 * @param {Set<string>} ignorePatterns - Set of folder/file names to ignore.
 * @returns {Array<string>} - List of absolute file paths.
 */
function getAllFiles(dirPath, arrayOfFiles = [], ignorePatterns = new Set()) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const absolutePath = path.join(dirPath, file);
    if (!ignorePatterns.has(file)) {
      if (fs.statSync(absolutePath).isDirectory()) {
        arrayOfFiles = getAllFiles(absolutePath, arrayOfFiles, ignorePatterns);
      } else {
        arrayOfFiles.push(absolutePath);
      }
    }
  });
  return arrayOfFiles;
}

/**
 * Ensures the given directory exists, creating it if necessary.
 * @param {string} directory - Directory path to create.
 */
async function ensureDirectoryExists(directory) {
  try {
    await fs.promises.mkdir(directory, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory: ${directory}`, error);
  }
}

/**
 * Processes a single file by snipping or copying based on its extension and contents.
 * @param {string} filePath - Path of the file to process.
 * @param {string} startDirectory - Root directory being processed.
 * @param {string} outputDirectory - Directory to write processed files to.
 */
async function snip(filePath, startDirectory, outputDirectory) {
  const fileExt = path.extname(filePath);
  if (!fileExt) {
    throw new Error(`File has no extension type. Please check file path: ${filePath}`);
  }

  const fileName = path.basename(filePath);

  if (!BLUEHAWK_EXTENSIONS.has(fileExt)) {
    return;
  }

  const relPath = path.relative(startDirectory, filePath);
  const outputDir = path.join(outputDirectory, relPath.replace(fileName, ""));
  await ensureDirectoryExists(outputDir);

  const snipCommand = `bluehawk snip --output "${outputDir}" "${filePath}"`;
  const copyCommand = `bluehawk copy --output "${outputDir}" "${filePath}"`;

  let command;
  const fileContents = fs.readFileSync(filePath, "utf8");
  command = fileContents.includes("snippet-start") ? snipCommand : copyCommand;

  try {
    const { stdout, stderr } = await exec(command);

    const lines = stdout.split("\n");
    await handleOutput(lines, command);

    // Bluehawk uses a library with a known bug that sometimes outputs this error
    // The file still copies/snips, so we can ignore it
    if (stderr && !stderr.startsWith('Error: Unable to use "first char" lexer optimizations:')) {
      console.error(`Error encountered during processing: ${stderr}`);
    }
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
  }
}

let numFilesProcessedAndWritten = [0, 0];

/**
 * Aggregates output statistics for processed and written files.
 * @param {Array<string>} stdoutLines - Lines of output from the processing command.
 */
async function handleOutput(stdoutLines) {
  const processedLine = stdoutLines.find((line) =>
    line.toLowerCase().includes("processed")
  );
  if (processedLine) {
    const processCountMatch = processedLine.match(/\d+/);
    if (processCountMatch) {
      numFilesProcessedAndWritten[0] += parseInt(processCountMatch[0], 10);
    }
  }

  const writeCount = stdoutLines.filter((line) =>
    line.toLowerCase().includes("wrote")
  ).length;
  numFilesProcessedAndWritten[1] += writeCount;
}

/**
 * Main driver function for processing files.
 * @param {string} startDirectory - Root directory containing files to process.
 * @param {string} outputDirectory - Directory where processed files should be written.
 * @param {Set<string>} ignorePatterns - Set of folder/file names to ignore during processing.
 */
export async function processFiles(startDirectory, outputDirectory, ignorePatterns = new Set()) {
  startDirectory = resolvePathFromGitRoot(startDirectory);
  outputDirectory = resolvePathFromGitRoot(outputDirectory);

  console.log(`Processing example files in ${startDirectory}`);

  const files = getAllFiles(startDirectory, [], ignorePatterns);

  for (const file of files) {
    await snip(file, startDirectory, outputDirectory);
  }

  console.log(`Processed ${numFilesProcessedAndWritten[0]} file(s)`);
  console.log(`Wrote ${numFilesProcessedAndWritten[1]} file(s) to ${outputDirectory}`);
}
