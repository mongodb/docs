#!/usr/bin/env node
/**
 * validate-snippets.js
 *
 * Validates that each code example file has an associated test file reference.
 * Checks files with :snippet-start: markers (all suites) and whole-file
 * examples without snippet markers (suites with includeUnsnipped: true,
 * e.g. mongosh). Run from the repo root or from code-example-tests/.
 *
 * Usage:
 *   node code-example-tests/validate-snippets.js
 *   node code-example-tests/validate-snippets.js --suite javascript
 *
 * Exit codes:
 *   0  all examples have associated tests
 *   1  one or more examples have no associated test
 *   2  unrecognised --suite value
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Helpers ───────────────────────────────────────────────────────────────

/** Walk a directory tree, collecting files with the given extension. */
function collectFiles(dir, ext, ignoreNames, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignoreNames.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, ext, ignoreNames, results);
    } else if (!ext || entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

function readFile(p) {
  try {
    return readFileSync(p, 'utf8');
  } catch (e) {
    // Warn so an unreadable file doesn't silently drop from the test corpus
    // and make its examples appear untested.
    console.warn(`[validate-snippets] Could not read ${p}: ${e.message}`);
    return '';
  }
}

/** True if the file contains :snippet-start: markers (same check as processFiles.js). */
const hasSnippets = (content) => content.includes('snippet-start');

/** Extract all public class names from a C# source file. */
function csharpClassNames(content) {
  // Allow any sequence of modifiers (static, sealed, abstract, partial, …)
  // between `public` and `class` so that e.g. `public partial class Foo` and
  // `public static partial class Foo` are matched correctly.
  return [
    ...content.matchAll(
      /public(?:\s+(?:static|sealed|abstract|partial|unsafe|new|readonly))*\s+class\s+(\w+)/g
    ),
  ].map((m) => m[1]);
}

// ── Suite definitions ─────────────────────────────────────────────────────
//
// getTestRef(relPath, content) returns the string (or string[]) to search
// for in the combined test corpus. Detection strategy per language:
//
//   JavaScript — relative import:  `examples/{relPath}`
//   Python     — module import:    `examples.{dotted.module}`
//   Go         — package import:   `driver-examples/examples/{pkg-dir}`
//   Java       — class reference:  `{package}.{Class}` + simple `{Class}`
//               (FQN covers cross-pkg refs; simple name covers same-pkg refs)
//   C#         — class reference:  class name extracted from source
//   Mongosh    — quoted file path: `'relPath'` or `"relPath"` in
//               outputFromExampleFiles([...])
//
// Not included: go/atlas-sdk — that suite has a different project layout and
// test runner; coverage is out of scope for this script.

const SUITES = [
  {
    id: 'javascript',
    name: 'JavaScript (Node.js Driver)',
    examplesDir: 'javascript/driver/examples',
    testsDir: 'javascript/driver/tests',
    examplesExt: '.js',
    testsExt: '.js',
    ignoreExamples: new Set(['example-stub.js', 'node_modules', 'example-folder']),
    ignoreTests: new Set(['node_modules']),
    getTestRef: (relPath) => `examples/${relPath}`,
  },
  {
    id: 'python',
    name: 'Python (PyMongo)',
    examplesDir: 'python/pymongo/examples',
    testsDir: 'python/pymongo/tests_package',
    examplesExt: '.py',
    testsExt: '.py',
    ignoreExamples: new Set(['example_stub.py', '__pycache__', 'venv']),
    ignoreTests: new Set(['__pycache__']),
    getTestRef: (relPath) =>
      'examples.' + relPath.replace(/\.py$/, '').replaceAll('/', '.'),
  },
  {
    id: 'go',
    name: 'Go (Driver)',
    examplesDir: 'go/driver/examples',
    testsDir: 'go/driver/tests',
    examplesExt: '.go',
    testsExt: '.go',
    ignoreExamples: new Set(['example_stub.go']),
    ignoreTests: new Set(),
    // Go tests import the package directory, not individual files — all files
    // in the same directory share one import path.
    getTestRef: (relPath) =>
      `driver-examples/examples/${dirname(relPath)}`,
  },
  {
    id: 'java',
    name: 'Java (Sync Driver)',
    examplesDir: 'java/driver-sync/src/main/java',
    testsDir: 'java/driver-sync/src/test/java',
    examplesExt: '.java',
    testsExt: '.java',
    ignoreExamples: new Set(['example']),  // skips example/ stub directory
    ignoreTests: new Set(),
    getTestRef: (relPath) => {
      const noExt = relPath.replace(/\.java$/, '');
      // FQN catches cross-package imports; simple name catches same-package
      // usages where the test omits the qualifier. Note: the simple name is a
      // substring match and could produce false positives for generic names
      // (e.g. User, Movie) that appear in unrelated test helpers or comments.
      return [noExt.replaceAll('/', '.'), basename(noExt)];
    },
  },
  {
    id: 'csharp',
    name: 'C# (Driver)',
    examplesDir: 'csharp/driver/Examples',
    testsDir: 'csharp/driver/Tests',
    examplesExt: '.cs',
    testsExt: '.cs',
    ignoreExamples: new Set(['ExampleStub.cs', 'Program.cs', 'bin', 'obj']),
    ignoreTests: new Set(['bin', 'obj']),
    // Returns all public class names — files often define model/helper classes
    // before the main example class, so checking only the first would miss it.
    // Note: short or generic class names (e.g. Stocks, Movie) are substring-
    // matched against the test corpus and could produce false positives if the
    // same name appears in unrelated test helpers or comments.
    getTestRef: (relPath, content) => {
      const names = csharpClassNames(content);
      return names.length ? names : [basename(relPath, '.cs')];
    },
  },
  {
    id: 'mongosh',
    name: 'Mongosh',
    examplesDir: 'command-line/mongosh/examples',
    testsDir: 'command-line/mongosh/tests',
    examplesExt: '.js',
    testsExt: '.js',
    ignoreExamples: new Set(['node_modules']),
    ignoreTests: new Set(['node_modules']),
    // Mongosh examples are whole-file — most have no :snippet-start: because
    // the entire file is the example passed to outputFromExampleFiles().
    includeUnsnipped: true,
    // Return the path in both quote styles so the match requires the path to
    // appear as a quoted string literal, avoiding prefix-collision false
    // positives (e.g. `query/filter.js` matching `query/filter-extended.js`).
    getTestRef: (relPath) => [`'${relPath}'`, `"${relPath}"`],
  },
];


// ── Audit logic ───────────────────────────────────────────────────────────

function auditSuite(suite) {
  const examplesAbsDir = join(__dirname, suite.examplesDir);
  const testsAbsDir = join(__dirname, suite.testsDir);

  // Build a single string from all test file contents for fast searching.
  const testCorpus = collectFiles(testsAbsDir, suite.testsExt, suite.ignoreTests)
    .map(readFile)
    .join('\n');

  const exampleFiles = collectFiles(
    examplesAbsDir, suite.examplesExt, suite.ignoreExamples
  );

  const result = { suite: suite.name, total: 0, tested: 0, untested: [] };

  for (const filePath of exampleFiles) {
    const content = readFile(filePath);
    const isSnipped = hasSnippets(content);
    // Skip non-snipped files unless the suite opts in to whole-file coverage.
    if (!isSnipped && !suite.includeUnsnipped) continue;

    result.total++;
    const relPath = relative(examplesAbsDir, filePath);

    // getTestRef may return a string or an array of strings (e.g. Java).
    const refs = [suite.getTestRef(relPath, content)].flat();
    const isTested = refs.some((r) => r && testCorpus.includes(r));

    if (isTested) {
      result.tested++;
    } else {
      result.untested.push(relPath);
    }
  }

  return result;
}

// ── Reporting ─────────────────────────────────────────────────────────────

function printReport(results) {
  const bar = '─'.repeat(60);
  console.log(`\n${bar}\nGrove Snippet Coverage Report\n${bar}`);

  let totalSnipped = 0;
  let totalTested = 0;

  for (const r of results) {
    const pct = r.total ? `${Math.round((r.tested / r.total) * 100)}%` : 'N/A';
    console.log(`\n## ${r.suite}`);
    console.log(`   Examples : ${r.total}`);
    console.log(`   Tested   : ${r.tested} (${pct})`);
    console.log(`   Untested : ${r.untested.length}`);
    if (r.untested.length) {
      console.log('   Missing tests:');
      r.untested.forEach((f) => console.log(`     ✗ ${f}`));
    }
    totalSnipped += r.total;
    totalTested += r.tested;
  }

  const overallPct = totalSnipped
    ? `${Math.round((totalTested / totalSnipped) * 100)}%`
    : 'N/A';

  console.log(`\n${bar}`);
  console.log(
    `Overall: ${totalTested}/${totalSnipped} examples have tests (${overallPct})`
  );

  const untestedCount = totalSnipped - totalTested;
  if (untestedCount) {
    console.log(`\n⚠  ${untestedCount} example(s) have no associated test.`);
  } else {
    console.log('\n✓  All examples have associated tests.');
  }
  console.log(`${bar}\n`);

  return untestedCount;
}

// ── Main ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const suiteIdx = args.indexOf('--suite');
const suiteFilter = suiteIdx !== -1 ? args[suiteIdx + 1] : null;

// Match on id only (exact) to avoid ambiguity — e.g. --suite java would
// otherwise also match "JavaScript (Node.js Driver)" via substring.
const suitesToRun = suiteFilter
  ? SUITES.filter((s) => s.id === suiteFilter)
  : SUITES;

if (!suitesToRun.length) {
  console.error(`No suite found matching: "${suiteFilter}"`);
  console.error(`Available suites: ${SUITES.map((s) => s.id).join(', ')}`);
  process.exit(2);
}

const allResults = suitesToRun.map(auditSuite);
const untestedCount = printReport(allResults);

process.exit(untestedCount > 0 ? 1 : 0);
