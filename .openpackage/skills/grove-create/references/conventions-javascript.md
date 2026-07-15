# JavaScript (Node.js Driver) — Supplemental Conventions

<!-- canary:bc026129 -->

Content that supplements the driver's CLAUDE.md at
`code-example-tests/javascript/driver/CLAUDE.md`. Read that file first —
this file only covers details not found there.

## Directory Structure

```
code-example-tests/javascript/driver/
├── examples/                          # Code examples
│   ├── example-stub.js                # Template (do not modify)
│   └── topic/subtopic/
│       ├── your-example.js
│       └── your-example-output.txt    # Optional expected output
├── tests/                             # Tests
│   └── topic/subtopic/
│       └── your-topic.test.js
├── utils/
│   └── Expect.js                      # Comparison library
├── package.json
├── snip.js
└── .env                               # CONNECTION_STRING (not committed)
```

## Formatting a Specific Directory

To format only the examples directory (not the full project):

```bash
cd code-example-tests/javascript/driver
npx prettier --write examples/
```

## Comparison API

```javascript
import { Expect } from '../utils/Expect.js';

Expect.that(actualOutput).shouldMatch(outputFilepath);
Expect.that(actualOutput).withOrderedSort().shouldMatch(outputFilepath);
Expect.that(actualOutput).withIgnoredFields("_id", "timestamp").shouldMatch(outputFilepath);
Expect.that(actualOutput).shouldResemble(expectedOutput).withSchema({
    count: 20,
    required_fields: ['_id', 'title', 'year'],
    field_values: { year: 2012 }
});
```

**Methods**: `that()`, `withIgnoredFields()`, `withOrderedSort()`,
`withUnorderedSort()`, `shouldMatch()`, `shouldResemble()`, `withSchema()`

### When to Use Each Method

| Scenario | Method |
|----------|--------|
| Output stored in a file | `shouldMatch(filepath)` |
| Output compared to an inline object | `shouldMatch(object)` |
| Output order matters (sorted results) | `.withOrderedSort().shouldMatch(...)` |
| Fields have dynamic values (_id, dates) | `.withIgnoredFields("_id", ...).shouldMatch(...)` |
| Highly variable output, validate structure only | `.shouldResemble(expected).withSchema({...})` |

### Ellipsis Patterns in Expected Output Files

The comparison library automatically detects these patterns in expected output:

- `"..."` — Matches any value for a key
- `"prefix..."` — Matches a string that starts with "prefix"
- `["..."]` — Matches any array
- Standalone `...` on its own line — Allows any number of additional fields
- `{ ... }` — Matches any object

### Schema Validation Options

Used with `shouldResemble()`:

- `count` (required): Expected number of documents (non-negative integer)
- `required_fields` (optional): Field names that must exist in every document
- `field_values` (optional): Field name/value pairs that must match exactly

`shouldResemble()` is mutually exclusive with `shouldMatch()` and
incompatible with `withIgnoredFields()`, `withOrderedSort()`, and
`withUnorderedSort()`.
