import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["node_modules", "snip.js", "package.json", "package-lock.json"]);

const START_DIRECTORY = "content/self-managed-search/current/source";
const OUTPUT_DIRECTORY = "content/kubernetes/upcoming/source/includes/shared-fts-vs";
// Only process files containing this marker; files without it are skipped.
const SNIPPET_MARKER = "snippet-start";
// ------ END CONFIGURATION --------------------------------------------------

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
// structure under outputDirectory.
function snipFile(filePath, startDirectory, outputDirectory) {
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
  return result.stdout.split("\n").filter((l) => l.toLowerCase().includes("wrote")).length;
}

async function main() {
  if (!isBluehawkInstalled()) {
    process.exit(1);
  }

  const startDirectory = resolvePathFromGitRoot(START_DIRECTORY);
  const outputDirectory = resolvePathFromGitRoot(OUTPUT_DIRECTORY);

  console.log(`Processing files in ${startDirectory}`);

  const allFiles = getAllFiles(startDirectory, IGNORE_PATTERNS);
  const markedFiles = allFiles.filter((filePath) => {
    try {
      return fs.readFileSync(filePath, "utf8").includes(SNIPPET_MARKER);
    } catch {
      return false;
    }
  });

  let totalWritten = 0;
  for (const filePath of markedFiles) {
    totalWritten += snipFile(filePath, startDirectory, outputDirectory);
  }

  console.log(`Scanned ${allFiles.length} file(s); ${markedFiles.length} contained "${SNIPPET_MARKER}"`);
  console.log(`Wrote ${totalWritten} snippet file(s) to ${outputDirectory}`);
}

main();