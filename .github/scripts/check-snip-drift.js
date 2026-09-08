#!/usr/bin/env node
/**
 * Snip Script Drift Check
 *
 * Every snippet source docset carries its own copy of snip.js. The copies are
 * expected to be byte-identical apart from DEFAULT_START_DIRECTORY, which names
 * the docset a copy serves. This check fails when they diverge, so a fix or a
 * field removal applied to one copy cannot silently miss the others.
 *
 * Copies are discovered by walking content/ instead of being read from a list,
 * so a new snippet source docset is covered as soon as it lands and there is no
 * roster to keep in step. The snip.js scripts under code-example-tests/ are an
 * unrelated program and fall outside the walk root by design.
 *
 * Exit codes: 0 no drift, 1 drift found, 2 nothing to compare.
 */

const fs = require("fs");
const path = require("path");

const REPOSITORY_ROOT = path.resolve(__dirname, "..", "..");
const WALK_ROOT = "content";
const SCRIPT_NAME = "snip.js";
// The single line each copy is expected to set differently.
const VARIABLE_LINE = /^const DEFAULT_START_DIRECTORY = "(.*)";$/;
const PLACEHOLDER = "const DEFAULT_START_DIRECTORY = <docset-specific>;";
const SKIP_DIRECTORIES = new Set(["node_modules", ".git"]);
// Cap the reported lines so a wholesale rewrite cannot bury the output.
const MAX_REPORTED_LINES = 20;

// Collect every snip.js beneath the walk root, returned as repo-relative paths.
function findSnipScripts(directory, found = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRECTORIES.has(entry.name)) {
        findSnipScripts(path.join(directory, entry.name), found);
      }
    } else if (entry.name === SCRIPT_NAME) {
      found.push(path.relative(REPOSITORY_ROOT, path.join(directory, entry.name)));
    }
  }
  return found;
}

// Replace the docset-specific line so the remaining content can be compared
// verbatim. Also reports the declared value and how many times it appeared, so
// a missing or duplicated declaration surfaces rather than being normalized away.
function normalize(relativePath) {
  const lines = fs
    .readFileSync(path.join(REPOSITORY_ROOT, relativePath), "utf8")
    .split("\n");
  let declared = null;
  let occurrences = 0;

  const normalized = lines.map((line) => {
    const match = line.match(VARIABLE_LINE);
    if (!match) return line;
    occurrences++;
    declared = match[1];
    return PLACEHOLDER;
  });

  return { lines: normalized, declared, occurrences };
}

function main() {
  const scripts = findSnipScripts(path.join(REPOSITORY_ROOT, WALK_ROOT)).sort();

  if (scripts.length === 0) {
    console.error(`No ${SCRIPT_NAME} found under ${WALK_ROOT}/.`);
    return 2;
  }

  console.log(`Found ${scripts.length} ${SCRIPT_NAME} cop(ies) under ${WALK_ROOT}/:`);
  for (const relativePath of scripts) console.log(`  ${relativePath}`);

  const problems = [];
  const normalized = new Map();

  for (const relativePath of scripts) {
    const result = normalize(relativePath);
    normalized.set(relativePath, result);

    if (result.occurrences !== 1) {
      problems.push(
        `${relativePath}: expected exactly 1 DEFAULT_START_DIRECTORY declaration, found ${result.occurrences}.`
      );
      continue;
    }
    // The declared directory must be the copy's own location, which is the
    // mistake a copy-paste makes and which comparison alone cannot catch.
    const ownDirectory = path.dirname(relativePath);
    if (result.declared !== ownDirectory) {
      problems.push(
        `${relativePath}: DEFAULT_START_DIRECTORY is "${result.declared}" but the copy lives in "${ownDirectory}".`
      );
    }
  }

  // One copy is arbitrarily the reference; drift is symmetric, so which one it
  // is only affects how the difference reads.
  const [reference, ...others] = scripts;
  for (const relativePath of others) {
    const a = normalized.get(reference).lines;
    const b = normalized.get(relativePath).lines;
    const differing = [];

    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) differing.push(i + 1);
    }

    if (differing.length === 0) continue;

    problems.push(`${relativePath} differs from ${reference} on ${differing.length} line(s).`);
    for (const lineNumber of differing.slice(0, MAX_REPORTED_LINES)) {
      problems.push(`  line ${lineNumber}:`);
      problems.push(`    ${reference}: ${a[lineNumber - 1] ?? "<missing>"}`);
      problems.push(`    ${relativePath}: ${b[lineNumber - 1] ?? "<missing>"}`);
    }
    if (differing.length > MAX_REPORTED_LINES) {
      problems.push(`  ...and ${differing.length - MAX_REPORTED_LINES} more line(s).`);
    }
  }

  if (problems.length > 0) {
    console.error(`\nDrift detected. Apply the change to every copy listed above.\n`);
    for (const problem of problems) console.error(problem);
    return 1;
  }

  console.log(
    `\nNo drift: all ${scripts.length} cop(ies) match apart from DEFAULT_START_DIRECTORY.`
  );
  return 0;
}

process.exitCode = main();
