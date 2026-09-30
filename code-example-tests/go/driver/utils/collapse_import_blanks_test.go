package utils

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
)

// collapseScriptPath returns the absolute path to the Bluehawk import-block
// blank-line normalizer (collapse-import-blanks.js) that both Go snippet
// generators invoke. Rather than assuming a fixed depth, it walks up from the
// test file's directory until the script is found, so it works from any subtree
// of the checkout and under a symlink-resolved or relocatable source path. It
// resolves symlinks so the returned path matches what the CLI's entry-point
// guard sees.
//
// Escape hatch: this locating rule breaks under "go test -trimpath", which
// records runtime.Caller(0) relative to the module rather than an absolute
// path, and in a module-zip-only checkout, where the script lives outside this
// driver-examples module tree. Neither case is reachable from an upward walk
// starting at the test source. If either occurs, thread the script path
// in from the caller instead — e.g. read a COLLAPSE_SCRIPT env var that the
// parent runner sets, falling back to this walk. The current workflow always
// builds the checkout normally.
func collapseScriptPath(t *testing.T) string {
	t.Helper()
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("runtime.Caller(0) failed")
	}
	dir := filepath.Dir(thisFile)
	for {
		cand := filepath.Join(dir, "collapse-import-blanks.js")
		if _, err := os.Stat(cand); err == nil {
			r, err := filepath.EvalSymlinks(cand)
			if err != nil {
				t.Fatalf("EvalSymlinks: %v", err)
			}
			return r
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			t.Fatal("collapse-import-blanks.js not found above " + thisFile)
		}
		dir = parent
	}
}

// requireNode skips the test when node isn't on PATH, so a Go-only environment
// can still run the rest of this package rather than failing at the first exec.
func requireNode(t *testing.T) {
	t.Helper()
	if _, err := exec.LookPath("node"); err != nil {
		t.Skip("node not on PATH")
	}
}

// runCollapse writes content to fileName inside a temp dir, runs the
// collapse-import-blanks CLI against it, and returns the file's contents.
func runCollapse(t *testing.T, fileName, content string) string {
	t.Helper()
	requireNode(t)
	dir := t.TempDir()
	path := filepath.Join(dir, fileName)
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	cmd := exec.Command("node", collapseScriptPath(t), path)
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("collapse script failed: %v\n%s", err, out)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	return string(data)
}

func TestCollapseImportBlocks(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "collapses consecutive blank lines inside the parens",
			input:    "import (\n\t\"context\"\n\n\n\t\"go.mongodb.org/mongo-driver/v2/bson\"\n)",
			expected: "import (\n\t\"context\"\n\n\t\"go.mongodb.org/mongo-driver/v2/bson\"\n)",
		},
		{
			name:     "removes blank lines directly inside the parens",
			input:    "import (\n\n\t\"context\"\n\t\"log\"\n\n)",
			expected: "import (\n\t\"context\"\n\t\"log\"\n)",
		},
		{
			name:     "preserves a single blank line between import groups",
			input:    "import (\n\t\"context\"\n\t\"fmt\"\n\n\t\"driver-examples/utils\"\n)",
			expected: "import (\n\t\"context\"\n\t\"fmt\"\n\n\t\"driver-examples/utils\"\n)",
		},
		{
			name:     "leaves content without an import block unchanged",
			input:    "package main\n\nfunc main() {}\n",
			expected: "package main\n\nfunc main() {}\n",
		},
		{
			name:     "does not treat a commented-out import as an opener",
			input:    "package main\n\n// import (\n//    \"some/pkg\"\n// )\n",
			expected: "package main\n\n// import (\n//    \"some/pkg\"\n// )\n",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := runCollapse(t, "case.go", tt.input); got != tt.expected {
				t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, tt.expected)
			}
		})
	}
}

// Import-looking lines inside a raw string literal must not be treated as an
// import block opener.
func TestCollapseImportBlocks_IgnoresRawStrings(t *testing.T) {
	input := "package main\n\nvar q = `\nimport (\n\n\n    a\n)\n`\n"
	if got := runCollapse(t, "case.go", input); got != input {
		t.Fatalf("raw-string import was normalized; want unchanged\n--- got ---\n%s", got)
	}
}

// Import-looking lines inside a /* ... */ block comment must not be treated as
// an import block opener.
func TestCollapseImportBlocks_IgnoresBlockComments(t *testing.T) {
	input := "package main\n\n/*\nimport (\n\n\n    a\n)\n*/\n"
	if got := runCollapse(t, "case.go", input); got != input {
		t.Fatalf("block-comment import was normalized; want unchanged\n--- got ---\n%s", got)
	}
}

// A non-Go file that happens to contain an "import (" line must not be
// rewritten by the CLI.
func TestCollapseImportBlocks_SkipsNonGoFile(t *testing.T) {
	input := "import (\n\n\n)\n"
	if got := runCollapse(t, "notes.txt", input); got != input {
		t.Fatalf("non-Go file was rewritten; want unchanged\n--- got ---\n%s", got)
	}
}

// A real import block containing a /* ... */ comment whose body has a `)` line
// must not treat that `)` as the closing paren, and blank lines between specs
// are still collapsed.
func TestCollapseImportBlocks_BlockCommentInnerClose(t *testing.T) {
	input := "import (\n\t\"context\"\n\n\n\t\"log\"\n\n\t/*\n\t)\n\t*/\n)\n"
	expected := "import (\n\t\"context\"\n\n\t\"log\"\n\n\t/*\n\t)\n\t*/\n)\n"
	if got := runCollapse(t, "case.go", input); got != expected {
		t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, expected)
	}
}

// A real import block containing a raw string literal whose body has a `)`
// line must not treat that `)` as the closing paren.
func TestCollapseImportBlocks_RawStringInnerClose(t *testing.T) {
	input := "import (\n\t\"context\"\n\n\t\"log\"\n\n\t`\n\n\t\t)\n\t`\n)\n"
	if got := runCollapse(t, "case.go", input); got != input {
		t.Fatalf("raw-string `)` was treated as closer; want unchanged\n--- got ---\n%s", got)
	}
}

// Delimiter characters inside interpreted strings and rune literals must not
// put the scanner into comment or raw-string mode, so a following import block
// is still normalized.
func TestCollapseImportBlocks_StringAndRuneDelimiters(t *testing.T) {
	input := "package main\n\nvar marker = \"/*\"\nvar tick = '`'\n\nimport (\n\t\"context\"\n\n\n\t\"log\"\n)\n"
	expected := "package main\n\nvar marker = \"/*\"\nvar tick = '`'\n\nimport (\n\t\"context\"\n\n\t\"log\"\n)\n"
	if got := runCollapse(t, "case.go", input); got != expected {
		t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, expected)
	}
}

// Comments are whitespace in Go, so an opener like `import /* note */ (` and a
// closer like `) /* done */` must still be recognized.
func TestCollapseImportBlocks_CommentsAsWhitespace(t *testing.T) {
	input := "package main\n\nimport /* note */ (\n\t\"context\"\n\n\n\t\"log\"\n) /* done */\n"
	expected := "package main\n\nimport /* note */ (\n\t\"context\"\n\n\t\"log\"\n) /* done */\n"
	if got := runCollapse(t, "case.go", input); got != expected {
		t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, expected)
	}
}

// (`*/ )`, "` )`) is real code, so a closer sharing its line with the end of
// a block comment or raw literal must still close the block — the lexical mask
// decides, not the state the line started in. The reverse form — `)` followed
// by a block comment opened on the same line (`) /*`) — must keep working too,
// so the closer check cannot be moved to the state the line ends in, either.
func TestCollapseImportBlocks_CloserSharedWithCommentDelimiter(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "closer after a block comment ends on the same line",
			input:    "package main\n\nimport (\n\t\"context\"\n\n\n\t\"log\"\n/* note\n*/ )\n",
			expected: "package main\n\nimport (\n\t\"context\"\n\n\t\"log\"\n/* note\n*/ )\n",
		},
		{
			name:     "closer after a raw string ends on the same line",
			input:    "package main\n\nimport (\n\t\"context\"\n\n\n\t\"log\"\n`\n` )\n",
			expected: "package main\n\nimport (\n\t\"context\"\n\n\t\"log\"\n`\n` )\n",
		},
		{
			name: "closer that opens a block comment on the same line still " +
				"closes the block",
			input: "package main\n\nimport (\n\t\"context\"\n\n\n\t\"log\"\n) /* note\n*/\n" +
				"func main() {\n\n\n\tprintln(\"keep\")\n}\n",
			expected: "package main\n\nimport (\n\t\"context\"\n\n\t\"log\"\n) /* note\n*/\n" +
				"func main() {\n\n\n\tprintln(\"keep\")\n}\n",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := runCollapse(t, "case.go", tt.input); got != tt.expected {
				t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, tt.expected)
			}
		})
	}
}

// An opener that shares its line with the end of a block comment (`*/ import (`)
// is still real code, so the block must be recognized and its blank lines
// collapsed. This is the opener-side counterpart to
// TestCollapseImportBlocks_CloserSharedWithCommentDelimiter: the lexical mask is
// what decides recognition, so guarding the opener on the state the line started
// in wrongly skips the whole block and silently preserves the double blank lines
// the tool exists to remove.
func TestCollapseImportBlocks_OpenerSharedWithCommentDelimiter(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "opener after a block comment ends on the same line",
			input:    "package main\n\n/*\n*/ import (\n\t\"context\"\n\n\n\t\"log\"\n)\n",
			expected: "package main\n\n/*\n*/ import (\n\t\"context\"\n\n\t\"log\"\n)\n",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := runCollapse(t, "case.go", tt.input); got != tt.expected {
				t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, tt.expected)
			}
		})
	}
}

// A single-line import block (`import ("fmt")`) closes on the opener line, so
// the tool must find the closer immediately and not absorb the lines that
// follow it. Blank lines in code after the import must be left untouched.
func TestCollapseImportBlocks_SingleLineImport(t *testing.T) {
	tests := []struct {
		name  string
		input string
	}{
		{
			name:  "leaves a single-line import block alone",
			input: "package main\n\nimport (\"fmt\")\n",
		},
		{
			name: "does not collapse blank lines in code that follows " +
				"a single-line import",
			input: "package main\n\nimport (\"fmt\")\n\nfunc main() {\n\n\n\tfmt.Println(\"hi\")\n}\n",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := runCollapse(t, "case.go", tt.input); got != tt.input {
				t.Fatalf("collapse changed output; want unchanged\n--- got ---\n%s", got)
			}
		})
	}
}

// An unterminated `import (` — a realistic leftover from a :remove: at the
// block boundary — with no closing paren anywhere later must not absorb the
// rest of the file. The tool emits the opener as-is and keeps scanning, so
// code after the opener is still processed normally: the blank lines inside
// the following function body are preserved, not collapsed as if they were
// import-block content. A real, closed import block earlier in the file is
// still collapsed independently. Without the emit-opener branch the unclosed
// block swallows the tail to EOF and collapses blank lines across that code.
func TestCollapseImportBlocks_UnterminatedImport(t *testing.T) {
	input := "package main\n\nimport (\n\t\"context\"\n\n\n\t\"driver-examples/utils\"\n)\n\n" +
		"import (\n\t\"log\"\nfunc main() {\n\tprintln(\"first\")\n\n\n\tprintln(\"second\")\n}\n"
	expected := "package main\n\nimport (\n\t\"context\"\n\n\t\"driver-examples/utils\"\n)\n\n" +
		"import (\n\t\"log\"\nfunc main() {\n\tprintln(\"first\")\n\n\n\tprintln(\"second\")\n}\n"
	if got := runCollapse(t, "case.go", input); got != expected {
		t.Fatalf("collapse mismatch\n--- got ---\n%s\n--- want ---\n%s", got, expected)
	}
}

// The CLI entry-point guard decides whether to run the tool by comparing the
// path used to invoke the script against the script's own module path. A guard
// that compares the unresolved invoke path (path.resolve) instead of the real
// path silently disables the CLI whenever the script is reached through a
// symlink: Node resolves the symlink when deriving the module's
// import.meta.url, and realpath(argv[1]) agrees with it, but argv[1] itself
// keeps the link path, so an unresolved comparison of the two disagrees.
//
// This test places a physical copy of the script under real/ in the temp tree,
// symlinks it from a sibling link/ directory, and invokes node via the link
// path. Because the mismatch comes from the link rather than any OS-level
// symlink (macOS /var -> /private/var), it also reproduces in CI on Linux,
// where /tmp is not symlinked and a guard comparison that lacks realpath
// silently accepts a plain path but rejects the linked one.
func TestCollapseImportBlocks_ViaSymlinkedPath(t *testing.T) {
	requireNode(t)
	script := collapseScriptPath(t)
	dir := t.TempDir()

	// A physically-resident copy under real/ reached only through the link
	// in link/ mirrors how the script is installed and invoked via its link.
	realDir := filepath.Join(dir, "real")
	if err := os.MkdirAll(realDir, 0o755); err != nil {
		t.Fatalf("MkdirAll(real): %v", err)
	}
	src, err := os.ReadFile(script)
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	physical := filepath.Join(realDir, filepath.Base(script))
	if err := os.WriteFile(physical, src, 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}
	linkDir := filepath.Join(dir, "link")
	if err := os.MkdirAll(linkDir, 0o755); err != nil {
		t.Fatalf("MkdirAll(link): %v", err)
	}
	rel, err := filepath.Rel(linkDir, physical)
	if err != nil {
		t.Fatalf("Rel: %v", err)
	}
	link := filepath.Join(linkDir, filepath.Base(script))
	if err := os.Symlink(rel, link); err != nil {
		t.Fatalf("Symlink: %v", err)
	}

	target := filepath.Join(dir, "case.go")
	content := "import (\n\n\n\t\"log\"\n)\n"
	want := "import (\n\t\"log\"\n)\n"
	if err := os.WriteFile(target, []byte(content), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	cmd := exec.Command("node", link, target)
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("collapse script failed: %v\n%s", err, out)
	}

	got, err := os.ReadFile(target)
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	if string(got) != want {
		t.Fatalf("CLI did not run via a symlinked path\n--- got ---\n%s\n--- want ---\n%s", string(got), want)
	}
}

// collapseImportBlocksInDir — the entry point snip.js uses on the output
// directory — walks a tree, normalizing each .go file in place and leaving
// non-Go files alone. Drive it through the CLI with a nested tree and assert
// both the changed-file count and the resulting contents of every file.
func TestCollapseImportBlocksInDir(t *testing.T) {
	requireNode(t)
	dir := t.TempDir()
	nested := filepath.Join(dir, "pkg")
	if err := os.MkdirAll(nested, 0o755); err != nil {
		t.Fatalf("MkdirAll: %v", err)
	}

	// a.go and pkg/p.go both need collapsing; notes.txt must be skipped.
	files := map[string]string{
		"a.go":      "package a\n\nimport (\n\t\"fmt\"\n\n\n\t\"time\"\n)\n",
		"pkg/p.go":  "package p\n\nimport (\n\t\"os\"\n\n\n\t\"strings\"\n)\n",
		"notes.txt": "import (\n\n\n)\n",
	}
	for name, content := range files {
		if err := os.WriteFile(filepath.Join(dir, name), []byte(content), 0o644); err != nil {
			t.Fatalf("WriteFile(%s): %v", name, err)
		}
	}

	cmd := exec.Command("node", collapseScriptPath(t), dir)
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("collapse dir failed: %v\n%s", err, out)
	}

	if !strings.Contains(string(out), "in 2 file(s)") {
		t.Fatalf("expected 2 changed files, got output:\n%s", out)
	}

	if got := readCollapseFile(t, filepath.Join(dir, "a.go")); got != "package a\n\nimport (\n\t\"fmt\"\n\n\t\"time\"\n)\n" {
		t.Fatalf("a.go not collapsed\n--- got ---\n%s", got)
	}
	if got := readCollapseFile(t, filepath.Join(dir, "pkg", "p.go")); got != "package p\n\nimport (\n\t\"os\"\n\n\t\"strings\"\n)\n" {
		t.Fatalf("pkg/p.go not collapsed\n--- got ---\n%s", got)
	}
	if got := readCollapseFile(t, filepath.Join(dir, "notes.txt")); got != "import (\n\n\n)\n" {
		t.Fatalf("notes.txt was modified (should be skipped)\n--- got ---\n%s", got)
	}
}

// --gofmt is the pass both Go snippet wrappers run in place of their own copy:
// gofmt where it can parse a file, the normalizer where it cannot. An import
// block with no package clause is the fallback case — gofmt rejects it, so its
// double blank lines must still be collapsed — while a non-Go file in the same
// directory is left alone. The count of files gofmt did not process must be
// reported, or a run where gofmt processed nothing would read as success.
func TestCollapseImportBlocks_GofmtFallsBackToNormalizer(t *testing.T) {
	requireNode(t)
	dir := t.TempDir()
	const fragment = "import (\n\t\"context\"\n\n\n\t\"log\"\n)\n"
	if err := os.WriteFile(filepath.Join(dir, "fragment.go"), []byte(fragment), 0o644); err != nil {
		t.Fatalf("WriteFile(fragment.go): %v", err)
	}
	const notes = "import (\n\n\n)\n"
	if err := os.WriteFile(filepath.Join(dir, "notes.txt"), []byte(notes), 0o644); err != nil {
		t.Fatalf("WriteFile(notes.txt): %v", err)
	}

	cmd := exec.Command("node", collapseScriptPath(t), "--gofmt", dir)
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("--gofmt failed: %v\n%s", err, out)
	}

	want := "import (\n\t\"context\"\n\n\t\"log\"\n)\n"
	if got := readCollapseFile(t, filepath.Join(dir, "fragment.go")); got != want {
		t.Fatalf("fragment not normalized by the fallback\n--- got ---\n%s\n--- want ---\n%s", got, want)
	}
	if got := readCollapseFile(t, filepath.Join(dir, "notes.txt")); got != notes {
		t.Fatalf("non-Go file was modified\n--- got ---\n%s", got)
	}
	if !strings.Contains(string(out), "gofmt did not process") {
		t.Fatalf("gofmt fallback count not reported:\n%s", out)
	}
}

// --gofmt must leave a parseable file to gofmt, including spacing the lexer
// cannot see, rather than normalizing it and stopping there.
func TestCollapseImportBlocks_GofmtFormatsParsableFiles(t *testing.T) {
	requireNode(t)
	if _, err := exec.LookPath("gofmt"); err != nil {
		t.Skip("gofmt not on PATH")
	}
	dir := t.TempDir()
	const input = "package main\n\nfunc main(){println(\"hi\")}\n"
	if err := os.WriteFile(filepath.Join(dir, "main.go"), []byte(input), 0o644); err != nil {
		t.Fatalf("WriteFile(main.go): %v", err)
	}

	cmd := exec.Command("node", collapseScriptPath(t), "--gofmt", dir)
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("--gofmt failed: %v\n%s", err, out)
	}

	want := "package main\n\nfunc main() { println(\"hi\") }\n"
	if got := readCollapseFile(t, filepath.Join(dir, "main.go")); got != want {
		t.Fatalf("gofmt formatting not applied\n--- got ---\n%s\n--- want ---\n%s", got, want)
	}
}

// A target that cannot be walked must fail the run instead of looking like an
// empty directory and reporting success.
func TestCollapseImportBlocks_GofmtUnreadableTarget(t *testing.T) {
	requireNode(t)
	missing := filepath.Join(t.TempDir(), "does-not-exist")

	cmd := exec.Command("node", collapseScriptPath(t), "--gofmt", missing)
	out, err := cmd.CombinedOutput()
	if err == nil {
		t.Fatalf("--gofmt on a missing target exited 0; want nonzero\n%s", out)
	}
	if !strings.Contains(string(out), "could not read targets") {
		t.Fatalf("missing-target error not reported:\n%s", out)
	}
}

// readCollapseFile reads a file that collapse-import-blanks may have rewritten.
func readCollapseFile(t *testing.T, path string) string {
	t.Helper()
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile(%s): %v", path, err)
	}
	return string(data)
}
