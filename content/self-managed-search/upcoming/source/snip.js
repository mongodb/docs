import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { execSync, spawnSync } from "child_process";

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["node_modules", "snip.js", "package.json", "package-lock.json"]);

const DEFAULT_START_DIRECTORY = "content/self-managed-search/current/source";
const DEFAULT_OUTPUT_DIRECTORY = "content/kubernetes/upcoming/source/includes/shared-fts-vs";
// Only process files containing this marker; files without it are skipped.
const SNIPPET_MARKER = "snippet-start";
// ------ END CONFIGURATION --------------------------------------------------

// Prompt for a directory, falling back to the default when no value is entered.
async function promptDirectory(promptLabel, defaultDirectory) {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question(`${promptLabel} [${defaultDirectory}]: `);
    return answer.trim() || defaultDirectory;
  } finally {
    rl.close();
  }
}

// Prompt for an optional snippet filename. An empty response keeps the default
// names that Bluehawk generates.
async function promptFilename(promptLabel) {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question(`${promptLabel} [keep default names]: `);
    return answer.trim();
  } finally {
    rl.close();
  }
}

// Parse the output file paths from Bluehawk's stdout. Bluehawk emits one
// line per generated file, e.g.
// "wrote text file based on <src> -> <dest>". When a "->" is present, the
// destination path follows the last arrow; otherwise the path follows "wrote".
function parseWrittenPaths(stdout) {
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.toLowerCase().startsWith("wrote "))
    .map((line) => {
      const arrowIndex = line.lastIndexOf("->");
      const value = arrowIndex !== -1
        ? line.slice(arrowIndex + "->".length)
        : line.slice("wrote ".length);
      return value.trim();
    })
    .filter(Boolean);
}

// Rename a generated snippet file to use the provided base filename while
// preserving the file's extension. When more than one file is generated, an
// index suffix keeps the names unique.
function renameSnippetFile(writtenPath, baseName, index, total) {
  const directory = path.dirname(writtenPath);
  const extension = path.extname(writtenPath);
  const requestedExtension = path.extname(baseName);
  const stem = requestedExtension ? baseName.slice(0, -requestedExtension.length) : baseName;
  const finalExtension = requestedExtension || extension;
  const suffix = total > 1 ? `.${index + 1}` : "";
  const targetPath = path.join(directory, `${stem}${suffix}${finalExtension}`);
  if (targetPath !== writtenPath) {
    fs.renameSync(writtenPath, targetPath);
  }
  return targetPath;
}

function isBluehawkInstalled() {
  const result = spawnSync("which", ["bluehawk"], { encoding: "utf-8" });
  if (result.status == 1) {
    console.error(errorString);
    return false;
  }
  return true;
}

// Resolve a repo-relative path to an absolute path via the Git repository root.
function resolvePathFromGitRoot(relativePath) {
  const gitRoot = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  return path.resolve(gitRoot, relativePath);
}

// Resolve the start directory input. Tries the path relative to the Git root
// first, then relative to DEFAULT_START_DIRECTORY, so a value like
// "installation" resolves to a subdirectory of the default source tree.
function resolveStartDirectory(inputPath) {
  const fromRoot = resolvePathFromGitRoot(inputPath);
  if (fs.existsSync(fromRoot)) return fromRoot;
  const fromDefault = resolvePathFromGitRoot(path.join(DEFAULT_START_DIRECTORY, inputPath));
  if (fs.existsSync(fromDefault)) return fromDefault;
  return fromRoot;
}

// Recursively collect file paths under dirPath, skipping any entry whose name
// is present in ignorePatterns.
function getAllFiles(dirPath, ignorePatterns, collected = []) {
  for (const entry of fs.readdirSync(dirPath)) {
    if (ignorePatterns.has(entry)) continue;
    const absolutePath = path.join(dirPath, entry);
    if (fs.statSync(absolutePath).isDirectory()) {
      getAllFiles(absolutePath, ignorePatterns, collected);
    } else {
      collected.push(absolutePath);
    }
  }
  return collected;
}

// Run `bluehawk snip` for a single file, mirroring the source directory
// structure under outputDirectory. When snippetFilename is provided, the
// generated snippet files are renamed to use it.
function snipFile(filePath, startDirectory, outputDirectory, snippetFilename) {
  const relPath = path.relative(startDirectory, filePath);
  const outputDir = path.join(outputDirectory, path.dirname(relPath));
  fs.mkdirSync(outputDir, { recursive: true });

  const result = spawnSync(
    "bluehawk",
    ["snip", "--output", outputDir, filePath],
    { encoding: "utf-8" }
  );

  if (result.status !== 0) {
    console.error(`Failed to snip ${filePath}:\n${result.stderr}`);
    return 0;
  }

  // Bluehawk emits one "wrote" line per output file.
  const writtenPaths = parseWrittenPaths(result.stdout);
  if (snippetFilename) {
    writtenPaths.forEach((writtenPath, index) =>
      renameSnippetFile(writtenPath, snippetFilename, index, writtenPaths.length)
    );
  }
  return writtenPaths.length;
}

async function main() {
  if (!isBluehawkInstalled()) {
    process.exit(1);
  }

  const startDirectoryInput = await promptDirectory(
    "Enter the file or directory to generate snippets from",
    DEFAULT_START_DIRECTORY
  );
  const outputDirectoryInput = await promptDirectory(
    "Enter the directory to copy snippets to",
    DEFAULT_OUTPUT_DIRECTORY
  );
  const snippetFilename = await promptFilename(
    "Enter a filename for the generated snippet file(s)"
  );

  const startPath = resolveStartDirectory(startDirectoryInput);
  const outputDirectory = resolvePathFromGitRoot(outputDirectoryInput);

  if (!fs.existsSync(startPath)) {
    console.error(`Start path does not exist: ${startPath}`);
    process.exit(1);
  }

  // Accept either a single file or a directory. For a directory, walk it and
  // mirror its structure under the output directory. For a single file, snip
  // just that file directly into the output directory.
  const isDirectory = fs.statSync(startPath).isDirectory();
  const baseDirectory = isDirectory ? startPath : path.dirname(startPath);
  const allFiles = isDirectory ? getAllFiles(startPath, IGNORE_PATTERNS) : [startPath];

  console.log(`Processing ${isDirectory ? "files in" : "file"} ${startPath}`);

  const markedFiles = allFiles.filter((filePath) => {
    try {
      return fs.readFileSync(filePath, "utf8").includes(SNIPPET_MARKER);
    } catch {
      return false;
    }
  });

  let totalWritten = 0;
  for (const filePath of markedFiles) {
    totalWritten += snipFile(filePath, baseDirectory, outputDirectory, snippetFilename);
  }

  console.log(`Scanned ${allFiles.length} file(s); ${markedFiles.length} contained "${SNIPPET_MARKER}"`);
  console.log(`Wrote ${totalWritten} snippet file(s) to ${outputDirectory}`);
}

main();