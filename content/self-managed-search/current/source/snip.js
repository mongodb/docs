import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { execSync, spawnSync } from "child_process";

// ------ CONFIGURATION: Set these values for your language/project ----------
const IGNORE_PATTERNS = new Set(["node_modules", "snip.js", "package.json", "package-lock.json", "shared-content", "snippet-manifest.json"]);
// Paths containing these substrings are excluded from snippet generation.
// These files use snippet markers for other purposes (e.g., Grove test suite).
const IGNORE_PATH_PATTERNS = ["code-examples/tested"];

const DEFAULT_START_DIRECTORY = "content/self-managed-search/current/source";
// Only process files containing this marker; files without it are skipped.
const SNIPPET_MARKER = "snippet-start";
// Manifest file for tracking monitored snippets
const MANIFEST_FILE = "snippet-manifest.json";
// ------ END CONFIGURATION --------------------------------------------------

// Resolve the Git repository root once. The path helpers below run inside
// per-file and per-output-path loops, so shelling out on every call is costly.
let cachedGitRoot = null;
function getGitRoot() {
  if (cachedGitRoot === null) {
    cachedGitRoot = execSync("git rev-parse --show-toplevel", { encoding: "utf8" }).trim();
  }
  return cachedGitRoot;
}

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

// Extract the source docset name from a file path.
// e.g., "content/atlas/source/includes/foo.rst" -> "atlas"
// e.g., "content/self-managed-search/current/source/includes/foo.rst" -> "self-managed-search"
function extractSourceDocset(filePath) {
  const relativePath = path.relative(getGitRoot(), filePath);
  const parts = relativePath.split(path.sep);

  // Path format: content/<docset>/source/... or content/<docset>/<version>/source/...
  if (parts[0] === "content" && parts.length >= 3) {
    // Check if parts[2] is "source" (non-versioned) or a version directory
    if (parts[2] === "source") {
      return parts[1]; // e.g., "atlas"
    } else if (parts.length >= 4 && parts[3] === "source") {
      return parts[1]; // e.g., "self-managed-search" (versioned docset)
    }
  }
  // Fallback: use the directory name containing the source
  return path.basename(path.dirname(filePath));
}

// Append "-snippet-from-<source>" suffix to a file path.
// e.g., "content/search/source/includes/foo.rst" + "atlas" -> "content/search/source/includes/foo-snippet-from-atlas.rst"
function appendFromSuffix(outputPath, sourceDocset) {
  const dir = path.dirname(outputPath);
  const ext = path.extname(outputPath);
  const base = path.basename(outputPath, ext);
  return path.join(dir, `${base}-snippet-from-${sourceDocset}${ext}`);
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

// Extract the snippet name from a Bluehawk-generated file path. Generated
// filenames follow the pattern "<basename>.snippet.<name>.<ext>".
function extractSnippetName(writtenPath) {
  const match = path.basename(writtenPath).match(/\.snippet\.(.+)\.[^.]+$/);
  return match ? match[1] : null;
}

// Scan a source file's content for ":snippet-output:" tags and associate
// each with the name from the nearest preceding ":snippet-start:" tag. The
// tag value is a comma-separated list of git-root-relative paths. Each path
// can be either:
//   - A full path with filename: content/search/source/includes/shared/my-snippet.rst
//   - A directory path only: content/search/source/includes/shared/
// If only a directory is provided (ends with /), the source filename is used.
// The "-snippet-from-<source>" suffix is always appended automatically.
// e.g.:
//   .. :snippet-start: my-snippet
//   .. :snippet-output: content/search/source/includes/shared/, content/vector-search/source/includes/shared/my-snippet.rst
// With source file "list-data-explorer.rst" and source docset "atlas", generates:
//   content/search/source/includes/shared/list-data-explorer-snippet-from-atlas.rst
//   content/vector-search/source/includes/shared/my-snippet-snippet-from-atlas.rst
//
// Returns { outputs: Map<snippetName, paths[]>, directoryOnlySnippets: string[],
//           duplicateOutputSnippets: string[] }
function parseSnippetOutputs(content, sourceFilename) {
  const outputs = new Map();
  const directoryOnlySnippets = [];
  const duplicateOutputSnippets = [];
  let currentName = null;
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    const startMatch = line.match(/:snippet-start:\s*(\S+)/);
    if (startMatch) {
      currentName = startMatch[1];
      continue;
    }
    // Close the block. Without this, a stray ":snippet-output:" after
    // ":snippet-end:" is still attributed to the preceding snippet and
    // silently replaces its real destinations.
    if (/:snippet-end:/.test(line)) {
      currentName = null;
      continue;
    }
    const outputMatch = line.match(/:snippet-output:\s*(.+)/);
    if (outputMatch && currentName) {
      let hasDirectoryOnly = false;
      const paths = outputMatch[1]
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
        // Paths are git-root-relative. A leading slash makes path.resolve treat
        // the value as absolute and discard the repo root, so the output would
        // be written outside the repository. Normalize instead of failing.
        .map((p) => p.replace(/^\/+/, ""))
        .map((p) => {
          // If path ends with / (directory only), append the source filename
          if (p.endsWith("/")) {
            hasDirectoryOnly = true;
            return p + sourceFilename;
          }
          return p;
        });
      // A second ":snippet-output:" in the same block used to overwrite the
      // first, silently discarding destinations. Keep the first and report the
      // duplicate so validation rejects the file instead.
      if (outputs.has(currentName)) {
        duplicateOutputSnippets.push(currentName);
        continue;
      }
      outputs.set(currentName, paths);
      if (hasDirectoryOnly) {
        directoryOnlySnippets.push(currentName);
      }
    }
  }
  return { outputs, directoryOnlySnippets, duplicateOutputSnippets };
}

// Strip the ":snippet-output:" tag from generated content and prepend a note
// identifying the source file. Generated files are overwritten on every sync,
// so the note directs editors to the source file instead.
function formatGeneratedSnippet(content, sourceRelativePath) {
  const body = content
    .split("\n")
    .filter((line) => !/^\.\.\s*:snippet-output:/.test(line.trim()))
    .join("\n")
    .replace(/^\n+/, "");
  const header = [
    `.. This file is snippet output generated from ${sourceRelativePath}.`,
    "   Do not modify this file. Edit the source file instead.",
    "",
    "",
  ].join("\n");
  return header + body;
}

// Extract every named snippet identifier declared via ":snippet-start:" in a
// source file's content.
function extractSnippetNames(content) {
  const names = new Set();
  for (const rawLine of content.split("\n")) {
    const match = rawLine.trim().match(/:snippet-start:\s*(\S+)/);
    if (match) names.add(match[1]);
  }
  return names;
}

// Find snippet names declared by more than one ":snippet-start:" in a file.
// extractSnippetNames returns a Set, so duplicates collapse: only the first
// block would be hashed and generated, and the rest vanish without an error.
function findDuplicateSnippetNames(content) {
  const seen = new Set();
  const duplicates = new Set();
  for (const rawLine of content.split("\n")) {
    const match = rawLine.trim().match(/:snippet-start:\s*(\S+)/);
    if (!match) continue;
    if (seen.has(match[1])) duplicates.add(match[1]);
    seen.add(match[1]);
  }
  return [...duplicates];
}

// Validate that every snippet in a file has a corresponding ":snippet-output:" tag.
// Also validates that files with multiple snippets don't use directory-only paths
// (which would cause filename conflicts), and that every explicit output path
// carries a file extension.
// Returns { missing: string[], directoryOnlyInMultiSnippet: string[],
//           missingExtension: string[], duplicateOutputs: string[],
//           duplicateNames: string[] }
function validateSnippetOutputs(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const sourceFilename = path.basename(filePath);
  const names = extractSnippetNames(content);
  const duplicateNames = findDuplicateSnippetNames(content);
  const { outputs, directoryOnlySnippets, duplicateOutputSnippets } = parseSnippetOutputs(content, sourceFilename);

  const missing = [];
  const missingExtension = [];
  for (const name of names) {
    const paths = outputs.get(name);
    if (!paths || paths.length === 0) {
      missing.push(name);
      continue;
    }
    // An extensionless path yields an extensionless output file, because
    // appendFromSuffix splits on the extension.
    for (const outputPath of paths) {
      if (!path.extname(outputPath)) {
        missingExtension.push(`${name} -> ${outputPath}`);
      }
    }
  }

  // If file has multiple snippets, directory-only paths are not allowed
  // (they would all resolve to the same filename)
  const directoryOnlyInMultiSnippet = names.size > 1 ? directoryOnlySnippets : [];

  return {
    missing,
    directoryOnlyInMultiSnippet,
    missingExtension,
    duplicateOutputs: duplicateOutputSnippets,
    duplicateNames,
  };
}

// Describe every snippet marker problem in a file as human-readable messages.
// Returns an empty array when the file's markers are valid.
function describeSnippetOutputProblems(filePath) {
  const { missing, directoryOnlyInMultiSnippet, missingExtension, duplicateOutputs, duplicateNames } = validateSnippetOutputs(filePath);
  const problems = [];
  if (duplicateNames.length > 0) {
    problems.push(`duplicate :snippet-start: names (each name must be unique within a file): ${duplicateNames.join(", ")}`);
  }
  // Two blocks sharing a name also look like a duplicate output tag on that
  // name. Report only the root cause, because the comma-separated-paths advice
  // below does not apply to that case.
  if (duplicateNames.length === 0 && duplicateOutputs.length > 0) {
    problems.push(`multiple :snippet-output: tags in one snippet block (use one tag with comma-separated paths): ${duplicateOutputs.join(", ")}`);
  }
  if (missing.length > 0) {
    problems.push(`missing :snippet-output: for snippets: ${missing.join(", ")}`);
  }
  if (directoryOnlyInMultiSnippet.length > 0) {
    problems.push(`files with multiple snippets require explicit filenames in :snippet-output:. Affected snippets: ${directoryOnlyInMultiSnippet.join(", ")}`);
  }
  if (missingExtension.length > 0) {
    problems.push(`:snippet-output: paths require a file extension: ${missingExtension.join(", ")}`);
  }
  return problems;
}

function isBluehawkInstalled() {
  const result = spawnSync("which", ["bluehawk"], { encoding: "utf-8" });
  if (result.status !== 0) {
    console.error(
      'This script requires Bluehawk. Please run "npm install -g bluehawk" in the terminal, and then re-run this script.'
    );
    return false;
  }
  return true;
}

// Resolve a repo-relative path to an absolute path via the Git repository root.
function resolvePathFromGitRoot(relativePath) {
  return path.resolve(getGitRoot(), relativePath);
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

// Check if a path should be excluded based on IGNORE_PATH_PATTERNS.
function shouldIgnorePath(filePath) {
  return IGNORE_PATH_PATTERNS.some((pattern) => filePath.includes(pattern));
}

// Recursively collect file paths under dirPath, skipping any entry whose name
// is present in ignorePatterns. Handles broken symlinks gracefully.
// Also skips paths matching IGNORE_PATH_PATTERNS.
function getAllFiles(dirPath, ignorePatterns, collected = []) {
  for (const entry of fs.readdirSync(dirPath)) {
    if (ignorePatterns.has(entry)) continue;
    const absolutePath = path.join(dirPath, entry);
    // Skip paths matching ignore patterns (e.g., code-examples/tested)
    if (shouldIgnorePath(absolutePath)) continue;
    try {
      const stat = fs.statSync(absolutePath);
      if (stat.isDirectory()) {
        getAllFiles(absolutePath, ignorePatterns, collected);
      } else {
        collected.push(absolutePath);
      }
    } catch (err) {
      // Skip broken symlinks or inaccessible files
      if (err.code === "ENOENT") continue;
      throw err;
    }
  }
  return collected;
}

// -------------------- MANIFEST FUNCTIONS --------------------

// Get the path to the manifest file
function getManifestPath() {
  return resolvePathFromGitRoot(path.join(DEFAULT_START_DIRECTORY, MANIFEST_FILE));
}

// Load the manifest, creating an empty one if it doesn't exist
function loadManifest() {
  const manifestPath = getManifestPath();
  if (fs.existsSync(manifestPath)) {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  }
  return { version: 1, files: {} };
}

// Save the manifest
function saveManifest(manifest) {
  const manifestPath = getManifestPath();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

// Escape regex metacharacters so a snippet name can be used as a literal match in a RegExp.
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Calculate a hash of snippet content for change detection.
// The name is anchored so a snippet named "foo" does not match a "foo-bar"
// block declared elsewhere in the same file.
function hashSnippetContent(content, snippetName) {
  const regex = new RegExp(`:snippet-start:\\s*${escapeRegExp(snippetName)}(?=\\s|$)([\\s\\S]*?):snippet-end:`, "g");
  const match = regex.exec(content);
  if (!match) return null;
  return crypto.createHash("md5").update(match[1]).digest("hex").slice(0, 8);
}

// Get relative path from docset source directory
function getRelativePath(absolutePath) {
  const sourceDir = resolvePathFromGitRoot(DEFAULT_START_DIRECTORY);
  return path.relative(sourceDir, absolutePath);
}

// Add a file to the manifest
function addFileToManifest(filePath) {
  const absolutePath = resolveStartDirectory(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }

  // getAllFiles filters these during traversal, but an explicit --add would
  // otherwise register a file that every later --sync silently skips.
  if (shouldIgnorePath(absolutePath)) {
    console.error(`Excluded path, not added: ${filePath}`);
    console.error(`  Paths matching ${IGNORE_PATH_PATTERNS.join(", ")} use a separate snippet system.`);
    return false;
  }

  const content = fs.readFileSync(absolutePath, "utf8");
  if (!content.includes(SNIPPET_MARKER)) {
    console.error(`File does not contain snippet markers: ${filePath}`);
    return false;
  }

  // Reject anything --sync and --validate would later flag as invalid, so a
  // file cannot be registered only to fail on every subsequent sync.
  const problems = describeSnippetOutputProblems(absolutePath);
  if (problems.length > 0) {
    console.error(`Invalid snippet markers in ${filePath}:`);
    problems.forEach((p) => console.error(`  ${p}`));
    return false;
  }

  const manifest = loadManifest();
  const relativePath = getRelativePath(absolutePath);
  const sourceFilename = path.basename(absolutePath);
  const sourceDocset = extractSourceDocset(absolutePath);
  const { outputs } = parseSnippetOutputs(content, sourceFilename);
  const snippetNames = extractSnippetNames(content);

  const snippets = {};
  for (const name of snippetNames) {
    const outputPaths = outputs.get(name) || [];
    snippets[name] = {
      outputs: outputPaths.map((p) => appendFromSuffix(p, sourceDocset)),
      hash: hashSnippetContent(content, name),
    };
  }

  manifest.files[relativePath] = {
    snippets,
    lastModified: new Date().toISOString(),
  };

  saveManifest(manifest);
  console.log(`Added to manifest: ${relativePath}`);
  console.log(`  Snippets: ${[...snippetNames].join(", ")}`);
  return true;
}

// Delete generated output files, reporting each one removed
function deleteOutputFiles(outputPaths) {
  let deletedCount = 0;
  for (const outputPath of outputPaths) {
    const absoluteOutputPath = resolvePathFromGitRoot(outputPath);
    if (fs.existsSync(absoluteOutputPath)) {
      fs.unlinkSync(absoluteOutputPath);
      console.log(`  Deleted: ${outputPath}`);
      deletedCount++;
    }
  }
  return deletedCount;
}

// Remove a file from the manifest
function removeFileFromManifest(filePath) {
  const manifest = loadManifest();
  const absolutePath = resolveStartDirectory(filePath);
  const relativePath = getRelativePath(absolutePath);

  if (!manifest.files[relativePath]) {
    console.error(`File not in manifest: ${relativePath}`);
    return false;
  }

  // Collect output files to delete
  const outputFiles = [];
  for (const [snippetName, snippetInfo] of Object.entries(manifest.files[relativePath].snippets)) {
    for (const outputPath of snippetInfo.outputs) {
      outputFiles.push(outputPath);
    }
  }

  const deletedCount = deleteOutputFiles(outputFiles);

  const snippetCount = Object.keys(manifest.files[relativePath].snippets).length;
  delete manifest.files[relativePath];
  saveManifest(manifest);
  console.log(`Removed from manifest: ${relativePath} (${snippetCount} snippet${snippetCount !== 1 ? 's' : ''}, ${deletedCount} output file${deletedCount !== 1 ? 's' : ''} deleted)`);
  return true;
}

// List all monitored files
function listMonitoredFiles() {
  const manifest = loadManifest();
  const files = Object.keys(manifest.files);

  if (files.length === 0) {
    console.log("No files are currently monitored.");
    console.log(`Use --add <file> or --register <directory> to add files.`);
    return;
  }

  console.log(`Monitored files (${files.length}):\n`);
  for (const file of files.sort()) {
    const info = manifest.files[file];
    console.log(`  ${file}`);
    for (const [name, snippet] of Object.entries(info.snippets)) {
      console.log(`    └─ ${name} (hash: ${snippet.hash})`);
      for (const output of snippet.outputs) {
        console.log(`       → ${output}`);
      }
    }
  }
}

// Initialize an empty manifest
function initManifest() {
  const manifestPath = getManifestPath();
  if (fs.existsSync(manifestPath)) {
    console.log(`Manifest already exists: ${manifestPath}`);
    console.log("Use --reset to clear and reinitialize.");
    return false;
  }

  const manifest = { version: 1, files: {} };
  saveManifest(manifest);
  console.log(`✓ Created empty manifest: ${manifestPath}`);
  return true;
}

// Reset (clear) the manifest
function resetManifest() {
  const manifestPath = getManifestPath();
  const manifest = { version: 1, files: {} };
  saveManifest(manifest);
  console.log(`✓ Reset manifest: ${manifestPath}`);
  console.log("All monitored files have been cleared.");
  return true;
}

// Validate manifest integrity (check that files exist and hashes match)
function validateManifest() {
  const manifest = loadManifest();
  const files = Object.keys(manifest.files);

  if (files.length === 0) {
    console.log("Manifest is empty. Nothing to validate.");
    return true;
  }

  console.log(`Validating ${files.length} monitored file(s)...\n`);

  let errors = 0;
  let warnings = 0;
  let valid = 0;

  for (const relativePath of files.sort()) {
    const absolutePath = resolvePathFromGitRoot(path.join(DEFAULT_START_DIRECTORY, relativePath));
    const fileInfo = manifest.files[relativePath];

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      console.log(`  ✗ Missing: ${relativePath}`);
      errors++;
      continue;
    }

    // Malformed markers are an error, not something --sync can repair
    const problems = describeSnippetOutputProblems(absolutePath);
    if (problems.length > 0) {
      console.log(`  ✗ Invalid: ${relativePath}`);
      problems.forEach((p) => console.log(`      ${p}`));
      errors++;
      continue;
    }

    const content = fs.readFileSync(absolutePath, "utf8");
    const sourceFilename = path.basename(absolutePath);
    const sourceDocset = extractSourceDocset(absolutePath);
    const { outputs: declaredOutputs } = parseSnippetOutputs(content, sourceFilename);
    const outputsFor = (name) =>
      (declaredOutputs.get(name) || []).map((p) => appendFromSuffix(p, sourceDocset));

    let hashMismatch = false;
    const removedSnippets = [];
    const missingOutputs = [];
    const staleOutputs = [];

    // Check each snippet's hash, that its recorded outputs are still declared
    // in the source, and that its output files still exist
    for (const [name, snippet] of Object.entries(fileInfo.snippets)) {
      const currentHash = hashSnippetContent(content, name);
      if (currentHash === null) {
        removedSnippets.push(name);
        continue;
      }
      if (currentHash !== snippet.hash) {
        hashMismatch = true;
      }
      const declared = outputsFor(name);
      for (const outputPath of snippet.outputs) {
        if (!declared.includes(outputPath)) {
          staleOutputs.push(outputPath);
        }
      }
      for (const outputPath of declared) {
        if (!fs.existsSync(resolvePathFromGitRoot(outputPath))) {
          missingOutputs.push(outputPath);
        }
      }
    }

    // Snippets present in the source but absent from the manifest
    const addedSnippets = [...extractSnippetNames(content)].filter(
      (name) => !fileInfo.snippets[name]
    );

    if (removedSnippets.length > 0) {
      console.log(`  ⚠ Orphaned outputs: ${relativePath} (snippets removed from source: ${removedSnippets.join(", ")}; run --sync to delete)`);
      warnings++;
    } else if (addedSnippets.length > 0) {
      console.log(`  ⚠ Untracked snippet(s): ${relativePath} (${addedSnippets.join(", ")}; run --sync to add)`);
      warnings++;
    } else if (staleOutputs.length > 0) {
      console.log(`  ⚠ Output path changed: ${relativePath} (${staleOutputs.join(", ")} no longer declared; run --sync to delete)`);
      warnings++;
    } else if (missingOutputs.length > 0) {
      console.log(`  ⚠ Missing output(s): ${relativePath} (${missingOutputs.join(", ")}; run --sync to regenerate)`);
      warnings++;
    } else if (hashMismatch) {
      console.log(`  ⚠ Out of sync: ${relativePath} (run --sync to update)`);
      warnings++;
    } else {
      console.log(`  ✓ Valid: ${relativePath}`);
      valid++;
    }
  }

  console.log(`\nValidation complete:`);
  console.log(`  ${valid} valid, ${warnings} out of sync, ${errors} missing or invalid`);

  return errors === 0;
}

// Register all snippet files in a directory.
// Returns { added, skipped } counts.
function registerDirectory(dirPath) {
  const absolutePath = resolveStartDirectory(dirPath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Directory not found: ${dirPath}`);
    return { added: 0, skipped: 1 };
  }

  const isDir = fs.statSync(absolutePath).isDirectory();
  if (!isDir) {
    console.error(`Not a directory: ${dirPath}`);
    return { added: 0, skipped: 1 };
  }

  const allFiles = getAllFiles(absolutePath, IGNORE_PATTERNS);
  const markedFiles = allFiles.filter((f) => {
    try {
      return fs.readFileSync(f, "utf8").includes(SNIPPET_MARKER);
    } catch {
      return false;
    }
  });

  let added = 0;
  let skipped = 0;
  for (const file of markedFiles) {
    if (addFileToManifest(file)) {
      added++;
    } else {
      skipped++;
    }
  }

  console.log(`\nRegistered ${added} file(s) from ${dirPath}`);
  if (skipped > 0) {
    console.error(`${skipped} file(s) skipped because of invalid snippet markers.`);
  }
  return { added, skipped };
}

// Sync monitored files - regenerate only changed snippets
async function syncMonitoredFiles() {
  const manifest = loadManifest();
  const files = Object.keys(manifest.files);

  if (files.length === 0) {
    console.log("No files are monitored. Use --add or --register first.");
    return;
  }

  console.log(`Checking ${files.length} monitored file(s) for changes...\n`);

  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "snip-"));
  let changedCount = 0;
  let totalWritten = 0;
  let totalDeleted = 0;
  let invalidCount = 0;
  let failedCount = 0;

  for (const relativePath of files) {
    const absolutePath = resolvePathFromGitRoot(path.join(DEFAULT_START_DIRECTORY, relativePath));

    if (!fs.existsSync(absolutePath)) {
      console.log(`  ⚠ File missing: ${relativePath}`);
      continue;
    }

    // Skip files whose markers are malformed rather than generating bad outputs
    const problems = describeSnippetOutputProblems(absolutePath);
    if (problems.length > 0) {
      console.log(`  ✗ Invalid: ${relativePath}`);
      problems.forEach((p) => console.log(`      ${p}`));
      invalidCount++;
      continue;
    }

    const content = fs.readFileSync(absolutePath, "utf8");
    const fileInfo = manifest.files[relativePath];
    const sourceFilename = path.basename(absolutePath);
    const sourceDocset = extractSourceDocset(absolutePath);
    const { outputs: declaredOutputs } = parseSnippetOutputs(content, sourceFilename);
    const outputsFor = (name) =>
      (declaredOutputs.get(name) || []).map((p) => appendFromSuffix(p, sourceDocset));

    let fileChanged = false;
    const removedSnippets = [];
    // Recorded so a failed Bluehawk run can be rolled back, leaving the
    // manifest describing what is actually on disk
    const hashesBefore = new Map(
      Object.entries(fileInfo.snippets).map(([name, snippet]) => [name, snippet.hash])
    );

    // Check each snippet for changes. A null hash means the snippet is gone
    // from the source file, leaving its generated outputs orphaned.
    for (const [name, snippet] of Object.entries(fileInfo.snippets)) {
      const currentHash = hashSnippetContent(content, name);
      if (currentHash === null) {
        removedSnippets.push(name);
        continue;
      }
      if (currentHash !== snippet.hash) {
        fileChanged = true;
        snippet.hash = currentHash;
      }
      // Delete outputs the source no longer declares, e.g. after a
      // ":snippet-output:" path is renamed
      const declared = outputsFor(name);
      const stale = snippet.outputs.filter((p) => !declared.includes(p));
      if (stale.length > 0) {
        console.log(`  ⚠ Output path changed: ${relativePath} (${name})`);
        totalDeleted += deleteOutputFiles(stale);
        snippet.outputs = declared;
        fileChanged = true;
      }
      // Regenerate when an output was deleted even though the source is unchanged
      const outputMissing = snippet.outputs.some(
        (outputPath) => !fs.existsSync(resolvePathFromGitRoot(outputPath))
      );
      if (outputMissing) {
        fileChanged = true;
      }
    }

    // Drop snippets that no longer exist and delete their output files
    for (const name of removedSnippets) {
      console.log(`  ⚠ Removed from source: ${relativePath} (${name})`);
      totalDeleted += deleteOutputFiles(fileInfo.snippets[name].outputs);
      delete fileInfo.snippets[name];
    }

    // Track snippets added to the source since the last sync
    for (const name of extractSnippetNames(content)) {
      if (fileInfo.snippets[name]) continue;
      console.log(`  ⚠ Added to source: ${relativePath} (${name})`);
      fileInfo.snippets[name] = {
        outputs: outputsFor(name),
        hash: hashSnippetContent(content, name),
      };
      fileChanged = true;
    }

    if (fileChanged) {
      const written = snipFile(absolutePath, outputDirectory, sourceDocset);
      // A failed run leaves nothing generated, so roll back the recorded
      // hashes to keep the file marked out of sync for the next run
      if (written === null) {
        console.log(`  ✗ Failed: ${relativePath}`);
        for (const name of Object.keys(fileInfo.snippets)) {
          if (hashesBefore.has(name)) {
            fileInfo.snippets[name].hash = hashesBefore.get(name);
          } else {
            delete fileInfo.snippets[name];
          }
        }
        failedCount++;
        fileChanged = false;
      } else {
        changedCount++;
        console.log(`  ✓ Changed: ${relativePath}`);
        totalWritten += written;
      }
    }

    if (fileChanged || removedSnippets.length > 0) {
      fileInfo.lastModified = new Date().toISOString();
    }

    // A file with no snippets left is no longer a snippet source
    if (Object.keys(fileInfo.snippets).length === 0) {
      delete manifest.files[relativePath];
      console.log(`  ⚠ No snippets remain in ${relativePath}; removed from manifest`);
    }
  }

  // Clean up temp directory
  fs.rmSync(outputDirectory, { recursive: true, force: true });

  saveManifest(manifest);

  console.log(`\nSync complete: ${changedCount} file(s) changed, ${totalWritten} snippet(s) written, ${totalDeleted} orphaned output(s) deleted.`);

  if (invalidCount > 0) {
    console.error(`\n${invalidCount} file(s) skipped because of invalid snippet markers.`);
    process.exitCode = 1;
  }

  if (failedCount > 0) {
    console.error(`\n${failedCount} file(s) failed to generate. Re-run --sync after fixing the errors above.`);
    process.exitCode = 1;
  }
}

// -------------------- END MANIFEST FUNCTIONS --------------------

// Run `bluehawk snip` for a single file. Each snippet must have a
// ":snippet-output:" tag declaring its destination path(s). The "-snippet-from-<source>"
// suffix is automatically appended to each output filename.
// Returns the number of files written, or null when Bluehawk itself failed.
function snipFile(filePath, outputDirectory, sourceDocset) {
  fs.mkdirSync(outputDirectory, { recursive: true });

  const result = spawnSync(
    "bluehawk",
    ["snip", "--output", outputDirectory, filePath],
    { encoding: "utf-8" }
  );

  if (result.status !== 0) {
    console.error(`Failed to snip ${filePath}:\n${result.stderr}`);
    return null;
  }

  // Bluehawk emits one "wrote" line per output file.
  const writtenPaths = parseWrittenPaths(result.stdout);
  const sourceFilename = path.basename(filePath);
  const sourceRelativePath = path.relative(resolvePathFromGitRoot("."), filePath);
  const { outputs: customOutputs } = parseSnippetOutputs(fs.readFileSync(filePath, "utf8"), sourceFilename);
  let copiedCount = 0;

  writtenPaths.forEach((writtenPath) => {
    const snippetName = extractSnippetName(writtenPath);
    const customPaths = snippetName ? customOutputs.get(snippetName) : null;

    if (customPaths && customPaths.length > 0) {
      const generatedContent = formatGeneratedSnippet(
        fs.readFileSync(writtenPath, "utf8"),
        sourceRelativePath
      );
      for (const customPath of customPaths) {
        // Append "-snippet-from-<source>" suffix to the output path
        const targetPath = resolvePathFromGitRoot(appendFromSuffix(customPath, sourceDocset));
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, generatedContent);
        console.log(`  -> ${path.relative(resolvePathFromGitRoot("."), targetPath)}`);
        copiedCount++;
      }
    }
    // Always clean up intermediate Bluehawk output
    fs.unlinkSync(writtenPath);
  });

  return copiedCount;
}

function printUsage() {
  console.log(`
Usage: npm run snip [-- <options>]

Options:
  --sync                    Check monitored files and regenerate changed snippets
  --add <file>              Add a file to snippet monitoring
  --remove <file>           Remove file from manifest and delete output files
  --register <directory>    Bulk-register all files with snippets in a directory
  --list                    List all monitored files and their outputs
  --init                    Create an empty manifest file
  --reset                   Clear the manifest (remove all monitored files)
  --validate                Check manifest integrity (files exist, hashes match)
  --help                    Show this help message

Without options, runs in interactive mode to process files directly.
`);
}

async function main() {
  const args = process.argv.slice(2);

  // Handle CLI options
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  if (args.includes("--list")) {
    listMonitoredFiles();
    process.exit(0);
  }

  if (args.includes("--init")) {
    const created = initManifest();
    process.exit(created ? 0 : 1);
  }

  if (args.includes("--reset")) {
    resetManifest();
    process.exit(0);
  }

  if (args.includes("--validate")) {
    const valid = validateManifest();
    process.exit(valid ? 0 : 1);
  }

  if (args.includes("--sync")) {
    if (!isBluehawkInstalled()) process.exit(1);
    await syncMonitoredFiles();
    process.exit(process.exitCode ?? 0);
  }

  const addIndex = args.indexOf("--add");
  if (addIndex !== -1) {
    const filePath = args[addIndex + 1];
    if (!filePath) {
      console.error("Error: --add requires a file path");
      process.exit(1);
    }
    const added = addFileToManifest(filePath);
    process.exit(added ? 0 : 1);
  }

  const removeIndex = args.indexOf("--remove");
  if (removeIndex !== -1) {
    const filePath = args[removeIndex + 1];
    if (!filePath) {
      console.error("Error: --remove requires a file path");
      process.exit(1);
    }
    const removed = removeFileFromManifest(filePath);
    process.exit(removed ? 0 : 1);
  }

  const registerIndex = args.indexOf("--register");
  if (registerIndex !== -1) {
    const dirPath = args[registerIndex + 1];
    if (!dirPath) {
      console.error("Error: --register requires a directory path");
      process.exit(1);
    }
    const { skipped } = registerDirectory(dirPath);
    process.exit(skipped > 0 ? 1 : 0);
  }

  // Default: interactive mode (original behavior)
  if (!isBluehawkInstalled()) {
    process.exit(1);
  }

  const startDirectoryInput = await promptDirectory(
    "Enter the file or directory to generate snippets from",
    DEFAULT_START_DIRECTORY
  );

  const startPath = resolveStartDirectory(startDirectoryInput);

  if (!fs.existsSync(startPath)) {
    console.error(`Start path does not exist: ${startPath}`);
    process.exit(1);
  }

  // Accept either a single file or a directory. getAllFiles applies
  // IGNORE_PATH_PATTERNS itself; a single file bypasses it, so check here.
  const isDirectory = fs.statSync(startPath).isDirectory();
  if (!isDirectory && shouldIgnorePath(startPath)) {
    console.error(`Excluded path: ${startPath}`);
    console.error(`  Paths matching ${IGNORE_PATH_PATTERNS.join(", ")} use a separate snippet system.`);
    process.exit(1);
  }
  const allFiles = isDirectory ? getAllFiles(startPath, IGNORE_PATTERNS) : [startPath];

  console.log(`Processing ${isDirectory ? "files in" : "file"} ${startPath}`);

  const markedFiles = allFiles.filter((filePath) => {
    try {
      return fs.readFileSync(filePath, "utf8").includes(SNIPPET_MARKER);
    } catch {
      return false;
    }
  });

  if (markedFiles.length === 0) {
    console.log(`No files found containing "${SNIPPET_MARKER}"`);
    process.exit(0);
  }

  // Apply the same marker validation as --add, --sync, and --validate. Routed
  // through describeSnippetOutputProblems so every entry point reports an
  // identical set of problems.
  const errors = [];
  for (const filePath of markedFiles) {
    for (const problem of describeSnippetOutputProblems(filePath)) {
      errors.push(`${filePath}: ${problem}`);
    }
  }

  if (errors.length > 0) {
    console.error("Error: Snippet validation failed.\n");
    errors.forEach((e) => console.error(`  ${e}`));
    process.exit(1);
  }

  // Use a temp directory for Bluehawk's intermediate output
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "snip-"));

  let totalWritten = 0;
  let failedCount = 0;
  for (const filePath of markedFiles) {
    const sourceDocset = extractSourceDocset(filePath);
    console.log(`\nSnipping ${path.relative(resolvePathFromGitRoot("."), filePath)} (source: ${sourceDocset})`);
    const written = snipFile(filePath, outputDirectory, sourceDocset);
    if (written === null) {
      failedCount++;
    } else {
      totalWritten += written;
    }
  }

  // Clean up temp directory
  fs.rmSync(outputDirectory, { recursive: true, force: true });

  console.log(`\nScanned ${allFiles.length} file(s); ${markedFiles.length} contained "${SNIPPET_MARKER}"`);
  console.log(`Wrote ${totalWritten} snippet file(s) with "-snippet-from-<source>" suffix`);

  if (failedCount > 0) {
    console.error(`${failedCount} file(s) failed to generate.`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
