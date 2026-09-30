import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Normalizes blank lines inside Go `import ( ... )` blocks so an import
// removed with Bluehawk's `:remove:` tags can't leave two consecutive blank
// lines in the extracted snippet.
//
// The collapse mirrors gofmt's own normalization for an import block: no
// blank lines directly inside the parens and at most one blank line between
// import groups. Import declarations contain only import specs — each a
// string literal — and may also contain comments, so the tool scopes its
// edits to real separator lines between specs. A lexical scan (scanLine)
// masks comments and string/rune/raw literals to whitespace, so structure
// tokens (import, (, )) are recognized only in real code and blank lines
// inside a comment or raw literal are never collapsed.
//
// The module also contains the gofmt-first/fallback pass the Go snippet
// wrappers run over their output directories (formatGoTargets, exposed to
// shell wrappers as the --gofmt flag), so that pass has one implementation
// rather than one per wrapper.

const BLANK_LINE = /^\s*$/;
// A masked line replaces every comment/string/raw span with spaces, so the
// opener "import (" and the closer ")" are only matched where the word and
// the brackets sit in real code. Comments fold into the surrounding
// whitespace, which is why a form like `import /* note */ (` is still
// recognized.
const IMPORT_OPEN = /^\s*import\s*\(/;
const IMPORT_CLOSE = /^\s*\)/;

// Replaces chars[from, to) with spaces.
function blank(chars, from, to) {
  for (let j = from; j < to; j += 1) chars[j] = " ";
}

// Skips an interpreted string literal beginning at `start` (the opening ").
// Handles backslash escapes. Go string literals never span lines, so an
// unterminated quote simply consumes the rest of the line.
function skipString(line, start) {
  let i = start + 1;
  while (i < line.length) {
    if (line[i] === "\\") {
      i += 2;
      continue;
    }
    if (line[i] === '"') return i + 1;
    i += 1;
  }
  return line.length;
}

// Skips a rune literal beginning at `start` (the opening '). Handles
// backslash escapes. Rune literals never span lines.
function skipRune(line, start) {
  let i = start + 1;
  while (i < line.length) {
    if (line[i] === "\\") {
      i += 2;
      continue;
    }
    if (line[i] === "'") return i + 1;
    i += 1;
  }
  return line.length;
}

// Scans one line of Go source, updating the cross-line lexical state. Returns
// `code` (the line with every comment, string, rune, and raw-literal span
// replaced by spaces of the same length) and the `state`
// { inBlockComment, inRawString } carried into the next line. Only raw strings
// and block comments can span lines; string and rune literals cannot.
function scanLine(line, state) {
  const chars = line.split("");
  let inBlockComment = state.inBlockComment;
  let inRawString = state.inRawString;
  let i = 0;
  while (i < line.length) {
    const c = line[i];
    if (inBlockComment) {
      const close = line.indexOf("*/", i);
      if (close === -1) {
        blank(chars, i, line.length);
        return { code: chars.join(""), state: { inBlockComment: true, inRawString: false } };
      }
      blank(chars, i, close + 2);
      inBlockComment = false;
      i = close + 2;
    } else if (inRawString) {
      const close = line.indexOf("`", i);
      if (close === -1) {
        blank(chars, i, line.length);
        return { code: chars.join(""), state: { inBlockComment: false, inRawString: true } };
      }
      blank(chars, i, close + 1);
      inRawString = false;
      i = close + 1;
    } else if (c === '"') {
      const end = skipString(line, i);
      blank(chars, i, end);
      i = end;
    } else if (c === "'") {
      const end = skipRune(line, i);
      blank(chars, i, end);
      i = end;
    } else if (c === "`") {
      const close = line.indexOf("`", i + 1);
      if (close === -1) {
        blank(chars, i, line.length);
        return { code: chars.join(""), state: { inBlockComment: false, inRawString: true } };
      }
      blank(chars, i, close + 1);
      i = close + 1;
    } else if (c === "/" && line[i + 1] === "/") {
      blank(chars, i, line.length);
      return { code: chars.join(""), state: { inBlockComment: false, inRawString: false } };
    } else if (c === "/" && line[i + 1] === "*") {
      const close = line.indexOf("*/", i + 2);
      if (close === -1) {
        blank(chars, i, line.length);
        return { code: chars.join(""), state: { inBlockComment: true, inRawString: false } };
      }
      blank(chars, i, close + 2);
      i = close + 2;
    } else {
      i += 1;
    }
  }
  return { code: chars.join(""), state: { inBlockComment, inRawString } };
}

// Normalizes the inner lines of one import block. `scans` holds the scanLine
// result for each block line (opener, inner lines, closer). Blank lines are
// only treated as separators when they are in real code, so white-space-only
// lines inside a /* */ comment or a raw string are preserved. Mirrors gofmt:
// no blank lines directly inside the parens, at most one between groups.
function collapseBlock(block, scans) {
  if (block.length < 2) return block;
  const inner = block.slice(1, -1);
  const innerScans = scans.slice(1, -1);

  // isSep[idx] is true when inner[idx] is a whitespace-only line standing in
  // code (not inside a comment or raw literal), i.e. a real group separator.
  const isSep = [];
  let prevState = scans[0].state;
  for (let idx = 0; idx < inner.length; idx += 1) {
    const inCode =
      !prevState.inBlockComment && !prevState.inRawString;
    isSep.push(BLANK_LINE.test(inner[idx]) && inCode);
    prevState = innerScans[idx].state;
  }

  // Drop separator lines directly inside the parens (gofmt removes these).
  let start = 0;
  while (start < inner.length && isSep[start]) start += 1;
  let end = inner.length;
  while (end > start && isSep[end - 1]) end -= 1;

  // Collapse runs of separators to a single separator line.
  const result = [];
  let previousWasSep = false;
  for (let idx = start; idx < end; idx += 1) {
    if (isSep[idx]) {
      if (previousWasSep) continue;
      previousWasSep = true;
      result.push(inner[idx]);
    } else {
      previousWasSep = false;
      result.push(inner[idx]);
    }
  }
  return [block[0], ...result, block[block.length - 1]];
}

// Returns the given file content with every `import ( ... )` block
// normalized, or the original string when nothing changed.
export function collapseImportBlocks(content) {
  const lines = content.split("\n");
  const out = [];
  let changed = false;
  let i = 0;
  let state = { inBlockComment: false, inRawString: false };
  while (i < lines.length) {
    const scan = scanLine(lines[i], state);
    // scanLine masks every comment and raw-literal span, so an opener surviving
    // into scan.code is real code no matter what state the line started in.
    // Guarding on the pre-line state would wrongly reject one that shares its
    // line with the end of a block comment or raw literal (`*/ import (`, `` ` import ( ``).
    if (IMPORT_OPEN.test(scan.code)) {
      const block = [lines[i]];
      const blockScans = [scan];
      const opener = scan.code.indexOf("(");
      const sameLineCloser = scan.code.indexOf(")", opener) !== -1;
      let blockState = scan.state;
      let end = i + 1;
      let foundCloser = sameLineCloser;
      while (!foundCloser && end < lines.length) {
        const endScan = scanLine(lines[end], blockState);
        // scanLine masks every comment and raw-literal span, so a `)` that
        // survives into endScan.code is real code no matter what state the
        // line started in. Guarding on the pre-line state would wrongly reject
        // a closer that shares its line with the end of a block comment or raw
        // literal (`*/ )`, `` ` ) ``), and guarding on endScan.state would
        // wrongly reject one that opens a comment after the paren (`) /*`).
        const isCloser = IMPORT_CLOSE.test(endScan.code);
        block.push(lines[end]);
        blockScans.push(endScan);
        blockState = endScan.state;
        end += 1;
        if (isCloser) {
          foundCloser = true;
          break;
        }
      }
      if (foundCloser) {
        const normalized = collapseBlock(block, blockScans);
        out.push(...normalized);
        if (normalized.length !== block.length) changed = true;
        state = blockState;
      } else {
        // No closing paren. Emit just the opener and keep scanning so the rest
        // of the file is still processed rather than absorbed to EOF.
        out.push(lines[i]);
        state = scan.state;
        i += 1;
        continue;
      }
      i = end;
      continue;
    }
    out.push(lines[i]);
    state = scan.state;
    i += 1;
  }
  return changed ? out.join("\n") : content;
}

// Collapses imports for a single .go file in place.
// Returns true if the file changed.
export function normalizeGoFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = collapseImportBlocks(original);
  if (updated === original) return false;
  fs.writeFileSync(filePath, updated);
  return true;
}

// Recursively collects .go files under a directory.
function collectGoFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectGoFiles(fullPath));
    } else if (entry.name.endsWith(".go")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Normalizes every .go file under a directory. Returns the number changed.
export function collapseImportBlocksInDir(directory) {
  let changed = 0;
  for (const file of collectGoFiles(directory)) {
    if (normalizeGoFile(file)) changed += 1;
  }
  return changed;
}

// Runs `gofmt -w` on every .go file under each file-or-directory target,
// falling back to the import-block normalizer for the files gofmt cannot parse
// — snippet fragments, which are not always valid standalone Go. Many fragments
// gofmt *can* parse, and then it also corrects spacing the lexer cannot see
// (e.g. a blank line at EOF), so gofmt is always tried first.
//
// This is the single implementation of that pass. snip.js calls it in-process
// with its output directory; shell wrappers reach the same code through the
// CLI's --gofmt flag. Keeping one copy is the point: the decision "gofmt first,
// normalize as fallback" previously lived in both wrappers and could drift
// between them.
//
// `targets` takes the same file-or-directory shape as the CLI arguments, so
// both callers expand targets identically.
//
// Returns {files, normalized, gofmtFailed, failed}. `gofmtFailed` counts the
// files gofmt did not process; which is not an error by itself, but callers
// report it so a run where gofmt processed nothing (broken toolchain, bad PATH)
// cannot read as unqualified success. `failed` counts files the fallback
// could not rewrite, which still ship with their double blank lines. Per-file
// diagnostics go to stderr so both callers surface the same detail. Throws when
// a target cannot be walked.
export function formatGoTargets(targets) {
  const files = resolveGoTargets(targets);
  const stats = {
    files: files.length,
    normalized: 0,
    gofmtFailed: 0,
    failed: 0,
  };

  for (const file of files) {
    const result = spawnSync("gofmt", ["-w", file], { encoding: "utf8" });
    // gofmt -w exits 0 for every file it can parse, so a nonzero status (or a
    // failed spawn) means it could not process this file or hit an I/O failure
    // (e.g. a file that vanished mid-run).
    if (result.status === 0) continue;

    stats.gofmtFailed += 1;
    const diagnostic = (result.stderr || "").trim();
    if (!fs.existsSync(file)) {
      // Vanished between the walk and gofmt, so there is nothing left to
      // normalize — not a fallback failure.
      console.error(
        `gofmt failed on ${file}: ${diagnostic || "file no longer exists"}`
      );
      continue;
    }

    // normalizeGoFile reaches the filesystem itself, so the check above cannot
    // make it safe: the file can vanish between that check and its read, and
    // its rewrite can fail (permissions, disk full). Catching here keeps one
    // bad file from aborting the pass before the rest are processed.
    try {
      if (normalizeGoFile(file)) stats.normalized += 1;
    } catch (error) {
      stats.failed += 1;
      console.error(`Failed to normalize ${file}: ${error.message}`);
      if (diagnostic) console.error(`  gofmt: ${diagnostic}`);
    }
  }

  return stats;
}

// Expands file-or-directory targets to .go files, warning about and skipping
// anything that is not Go. Shared by both CLI modes so neither rewrites an
// arbitrary text file that happens to contain an "import (" line.
function resolveGoTargets(targets) {
  const files = [];
  for (const target of targets) {
    const candidates = fs.statSync(target).isDirectory()
      ? collectGoFiles(target)
      : [target];
    for (const file of candidates) {
      if (!file.endsWith(".go")) {
        console.warn(
          `Skipping non-Go file: ${path.relative(process.cwd(), file)}`
        );
        continue;
      }
      files.push(file);
    }
  }
  return files;
}

// Symlink handling
function isEntryPoint() {
  if (!process.argv[1]) return false;
  try {
    return (
      fs.realpathSync(process.argv[1]) ===
      fs.realpathSync(fileURLToPath(import.meta.url))
    );
  } catch {
    return path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
  }
}

// CLI:
//   node collapse-import-blanks.js <file-or-dir> [<file-or-dir> ...]
//   node collapse-import-blanks.js --gofmt <file-or-dir> [<file-or-dir> ...]
//
// Without --gofmt the tool only collapses import-block blank lines. With
// --gofmt it runs the gofmt-first/fallback pass instead (see formatGoTargets),
// which is what the Go snippet wrappers need: gofmt where it can parse the
// file, the normalizer where it cannot. That mode exits nonzero when any file
// could not be normalized, so a wrapper can rely on the status rather than
// parse the output.
if (isEntryPoint()) {
  const args = process.argv.slice(2);
  const gofmtMode = args.includes("--gofmt");
  const targets = args.filter((arg) => arg !== "--gofmt");
  if (targets.length === 0) {
    console.error(
      "Usage: node collapse-import-blanks.js [--gofmt] <file-or-dir> [...]"
    );
    process.exit(1);
  }

  if (gofmtMode) {
    let stats;
    try {
      stats = formatGoTargets(targets);
    } catch (error) {
      // An unreadable target must fail the run rather than leave the caller
      // believing there was nothing to process.
      console.error(`Error: could not read targets: ${error.message}`);
      process.exit(1);
    }
    if (stats.normalized > 0) {
      console.log(`Normalized import blocks in ${stats.normalized} file(s).`);
    }
    if (stats.gofmtFailed > 0) {
      console.log(
        `gofmt did not process ${stats.gofmtFailed} of ${stats.files} file(s).`
      );
    }
    if (stats.failed > 0) {
      console.error(`Error: ${stats.failed} file(s) could not be normalized.`);
      process.exit(1);
    }
  } else {
    let files;
    try {
      files = resolveGoTargets(targets);
    } catch (error) {
      console.error(`Error: could not read targets: ${error.message}`);
      process.exit(1);
    }
    let changed = 0;
    for (const file of files) {
      if (normalizeGoFile(file)) {
        console.log(
          `collapsed import-block blank lines: ${path.relative(process.cwd(), file)}`
        );
        changed += 1;
      }
    }
    console.log(`Collapsed import-block blank lines in ${changed} file(s).`);
  }
}
