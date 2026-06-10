# Comparison kernel

Language-agnostic comparison engine for the Grove test suites, written in Go
and shipped as native per-OS binaries committed under `bin/`. Each language
suite spawns the binary matching its host platform and talks newline-delimited
JSON over its stdin/stdout. Centralising the comparison logic keeps ellipsis
handling, Extended JSON normalisation, and schema validation consistent
across suites — with no runtime dependency to install.

## Build

```sh
./build.sh         # cross-compiles all committed platforms into bin/
./build.sh --host  # also builds a binary for the current host (if not already covered)
```

Committed platforms:

- `bin/comparison-kernel-darwin-arm64`
- `bin/comparison-kernel-darwin-amd64`
- `bin/comparison-kernel-linux-amd64`
- `bin/comparison-kernel-linux-arm64`
- `bin/comparison-kernel-windows-amd64.exe`
- `bin/comparison-kernel-windows-arm64.exe`

The binaries are committed so language wrappers don't need a Go toolchain.
If you change anything under `tools/comparison-kernel/`, rebuild and commit
the regenerated `bin/`.

Each binary is roughly 3.3 MB, so the six committed targets add up to about
20 MB in the repo. This is a deliberate trade-off against shipping a single
WASM artefact: native per-OS binaries let every suite invoke the kernel as a
plain subprocess with no embedded runtime, no per-language WASM host
dependency, and no warm-up cost on each test run, at the price of carrying
~20 MB of platform-specific blobs in git.

The build is **byte-reproducible** for a given Go version (pinned in
`go.mod`) via `-trimpath`, `-buildvcs=false`, and `-ldflags=-buildid=`. Pure
Go (no cgo) cross-compiles deterministically from any single host. CI
enforces this through the `.github/actions/verify-comparison-kernel`
composite action: every PR-triggered docker workflow rebuilds every platform
and fails fast if any committed binary is out of sync with the Go source.

### Upgrading Go

Because reproducibility is tied to the pinned Go version, bumping the `go`
directive in `go.mod` invalidates every committed binary. The full upgrade
flow is:

1. Update the `go` directive in `go.mod` (and install the matching toolchain
   locally).
2. Run `./build.sh` so every target listed above is rebuilt against the new
   toolchain. Do **not** rebuild a subset — partial updates leave the `bin/`
   directory in a mixed state and fail verification.
3. Commit every file under `bin/` alongside the `go.mod` change in the same
   PR.
4. Let CI's `verify-comparison-kernel` composite action run. It rebuilds each
   committed platform with the pinned toolchain and diffs the result against
   what's checked in; the PR only passes once every binary is byte-identical
   to a fresh build.

If `verify-comparison-kernel` fails after a Go bump, the fix is almost always
to re-run `./build.sh` cleanly and re-commit `bin/` — not to edit individual
binaries.

## Wire protocol

The kernel reads one JSON request per line from stdin and writes one JSON
response per line to stdout.

**Request:**

```json
{
  "protocolVersion": 1,
  "expected": "<raw text of expected output file>",
  "actual":   <JSON array or object of actual results>,
  "options": {
    "comparisonType":    "ordered" | "unordered",
    "ignoreFieldValues": ["_id", ...],
    "schema": {
      "count":          <int>,
      "requiredFields": ["field", ...],
      "fieldValues":    { "field": <value>, ... }
    }
  }
}
```

`protocolVersion` is optional for backward compatibility (absent ⇒ treated as
1). Bridges should send it so the kernel can fail fast against a stale binary.

**Response:**

```json
{ "protocolVersion": 1, "isMatch": true,  "errors": [] }
{ "protocolVersion": 1, "isMatch": false, "errors": [{ "path": "...", "message": "..." }] }
{ "protocolVersion": 1, "error": "protocol error message" }
```

The kernel always echoes its `protocolVersion`, so bridges can detect a
mismatch even when they didn't send one.

## Behaviour

- **Ellipsis** — `"..."` matches any value (property level), any element
  (array level), or any object (`{"...": "..."}`). At the property level
  `"..."` also matches when the key is absent from actual, so it can stand in
  for fields that are sometimes serialised away (e.g. null POCO properties
  dropped during normalisation). A standalone `...` line at the top of the
  expected file allows extra fields on every document. Top-level `"..."` items
  in a document list match additional documents (subset of count), but they do
  **not** loosen field matching on the listed docs; use an object-level
  `"...": "..."` inside the doc for that.
- **Extended JSON collapse** — single-key wrappers emitted by language bridges
  are collapsed to plain values so they compare equal to the expected file's
  canonical form. Currently handled: `$date`, `$oid`, `$numberDecimal`,
  `$numberLong`, `$numberInt`.
- **MongoDB shell syntax** — `ObjectId(...)`, `Decimal128(...)`, `Date(...)`,
  unquoted keys, single-quoted strings, line comments, and trailing commas in
  the expected file are normalised to standard JSON before parsing.
- **Schema validation** — when `options.schema` is present, the kernel checks
  document count and required-field presence/values on both sides instead of
  doing an exact document-by-document comparison.

## Integration matrix

Every suite routes all of its comparisons through the kernel. Both file-based
expectations (`Expect.shouldMatch(<filepath>)`) and in-memory value
expectations (`Expect.shouldMatch(<literal>)` / `Expect.shouldResemble(...)`)
are delegated to the kernel binary; no suite retains an in-process comparison
engine for production test paths.

| Suite      | Bridge                                                                | Wired into tests |
|------------|-----------------------------------------------------------------------|------------------|
| Java       | `java/utilities/comparison-library/.../KernelBridge.java`             | yes |
| C#         | `csharp/driver/Utilities/Comparison/KernelBridge.cs`                  | yes |
| Python     | `python/pymongo/utils/comparison/kernel_bridge.py`                    | yes |
| Go         | `go/driver/utils/compare/kernel_bridge.go`                            | yes |
| JavaScript | `javascript/driver/utils/comparison/KernelBridge.js`                  | yes |

Each bridge is responsible for normalising language-specific value types
(BSON ObjectId, Decimal128, datetime, …) into JSON-compatible payloads, sending
the request line, reading the response line, and translating the response back
into the suite's existing error types.

## Tests

```sh
go test ./...
```

Smoke tests live in `smoke_test.go`. Fixtures live in `testdata/`.

### Coverage map

The per-suite comparison unit projects (`csharp/.../Comparison.Tests`,
`javascript/.../utils/comparison/__tests__`, etc.) were removed when every
suite moved onto this kernel. Coverage for the edge-case categories those
projects used to own now lives in two places:

| Category                          | Smoke tests (`smoke_test.go`) | End-to-end Grove tests |
|-----------------------------------|-------------------------------|------------------------|
| Property-level `"..."` value      | yes                           | incidental             |
| Missing-key `"..."` value         | yes                           | incidental             |
| Global `...` line (extra fields)  | yes                           | incidental             |
| Doc-list `"..."` (subset count)   | yes                           | yes                    |
| Doc-list `"..."` strict per-doc   | yes                           | —                      |
| Nested-array `"..."` (content, wildcard, insufficient) | yes | incidental |
| Object-level `"...": "..."`       | yes                           | incidental             |
| Ordered vs unordered arrays       | yes                           | yes                    |
| `ignoreFieldValues`               | yes                           | yes (real `_id`, dates) |
| MongoDB shell syntax (`ObjectId(...)`, single quotes, trailing commas) | yes | yes |
| `$date` (both sides), fractional-second dates | yes               | yes                    |
| `$numberDecimal` / `$numberLong` / `$numberInt` collapse | yes    | yes                    |
| `$numberLong` overflow → string fallback | yes                    | —                      |
| Schema validation (count, required, field values) | yes           | yes                    |
| Primitive root values             | yes                           | —                      |
| NDJSON parsing                    | yes (fixture)                 | yes                    |
| Unordered mismatch report (no double-claim) | yes                 | —                      |
| Full wire-protocol round-trip     | yes                           | implicit (every test)  |
| Bridge-side normalisation (BSON ObjectId / Decimal128 / ISODate / Date → Extended JSON, POCO/POJO/dataclass → JSON) | — | yes |
| Cursor / aggregate / change-stream result shapes | —             | yes                    |
| File-based vs in-memory expectation paths | —                     | yes                    |

When adding a regression for a kernel-internal concern (parsing, ellipsis
resolution, normalisation, schema validation), put it in `smoke_test.go`.
When adding a regression for a bridge-side concern (how a language wraps its
native types before handing them to the kernel, or how a real driver result
flows through `Expect`), put it in the suite that owns the bridge.
