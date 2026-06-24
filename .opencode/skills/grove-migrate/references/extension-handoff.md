# Grove Extension Handoff Triggers

This reference describes the `trigger` values that grove-migrate accepts
via `.claude/grove-handoff.json`. Read this after passing the version
and shape checks in SKILL.md Step 0.

The JSON block under each trigger is the **expected payload schema** —
use it as the reference for what fields must be present in `context`.

## `trigger: "rst-literalinclude"` — migrate an existing code file

Schema:

```json
{
  "version": 1,
  "skill": "grove-migrate",
  "trigger": "rst-literalinclude",
  "timestamp": "ISO-8601",
  "workspaceRoot": "/absolute/path",
  "context": {
    "targetPath": "/path/as/written/in/rst.py",
    "absolutePath": "/abs/resolved/path.py",
    "snippetName": "my-snippet",
    "language": "python",
    "directiveType": "literalinclude",
    "rstFile": "content/atlas/source/some-page.txt",
    "rstLine": 42
  }
}
```

Treat as a **snippet-level migration** (one item, skip the page scan).
Skip Step 1 (entry-point determination) and Step 2 (page scanning). Use:

- `absolutePath` → the code file to migrate (Step 3 input).
- `language` → the target language (Step 3 skip the inference).
- `snippetName` / `rstFile` / `rstLine` → the RST reference that will
  need its `literalinclude::` path updated once the code moves into the
  Grove-tested tree.

Echo one line confirming the captured context, e.g.:
`Got handoff from extension: migrating {absolutePath} referenced from
{rstFile}:{rstLine}.`

Proceed from Step 3 with the language already known.

## `trigger: "rst-code-block"` — migrate inline code from the docs page

Schema:

```json
{
  "version": 1,
  "skill": "grove-migrate",
  "trigger": "rst-code-block",
  "timestamp": "ISO-8601",
  "workspaceRoot": "/absolute/path",
  "context": {
    "language": "python",
    "code": "import pymongo\nclient = pymongo.MongoClient(...)\n...",
    "rstFile": "content/atlas/source/some-page.txt",
    "rstLine": 42
  }
}
```

Treat as a **snippet-level migration** with pasted code (no existing
source file — the migration step will create one). Skip Step 1 and
Step 2. The writer will later swap the inline `code-block::` for a
`literalinclude::` pointing at the newly created file, so record
`rstFile` and `rstLine` for the reference update step.

Handle `context.language`:

- If it is one of `python`, `javascript`, `go`, `java`, `csharp`, or
  `mongosh` → the language is known. Use `context.code` as the input to
  Step 3.
- If it is `json` → the target suite is ambiguous: a JSON code-block in
  docs could become either a **JavaScript** (Node.js driver) or a
  **mongosh** example. Ask the writer to pick one before proceeding,
  e.g.:
  `The handoff is a JSON code-block, which could become a JavaScript
  (Node.js driver) or mongosh example. Which do you want?` Adapt
  `context.code` into the chosen suite's conventions — do **not** just
  drop the JSON verbatim into a `.js` or `.mongosh` file.
- If it is anything else (unsupported language) → fall through to
  Step 1, but **carry `context.code` forward** as if the writer pasted
  it in the conversation, so the writer's code isn't lost. Ask which
  language they intended, then use that language + the pasted code as
  the Step 3 input.

Echo one line confirming the captured context (and, for JSON, the
resolved language after the writer answers), e.g.:
`Got handoff from extension: migrating inline {language} code-block
from {rstFile}:{rstLine}.`

Proceed from Step 3 with the language known.
