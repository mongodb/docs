# JavaScript (Node.js Driver) — Grove Conventions

## Project Setup

- **ES modules** throughout (`"type": "module"` in package.json)
- Node >= 24.4.1, npm >= 10.0.0
- Key deps: `mongodb` 7.1.0, `jest` 30.x, `bluehawk` 1.6.x
- `.env` file required at this directory root: `CONNECTION_STRING="..."` and `TZ=UTC`
- `jest.config.cjs` and `babel.config.cjs` are CJS files — do **not** convert to ESM

## Example File Pattern

```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function yourExampleName() {
  try {
    // :snippet-start: your-snippet-name
    const db = client.db('your_db_name');
    const collection = db.collection('your_collection');

    const result = await collection.findOne({ field: 'value' });
    console.log(result);
    // :snippet-end:

    return result; // :remove:
  } finally {
    await client.close();
  }
}
```

- **File naming**: `kebab-case.js` in `examples/{topic}/{subtopic}/`
- **Function naming**: `camelCase`, exported as `export async function`
- **Connection**: `process.env.CONNECTION_STRING` at module level, `MongoClient` at module level
- **Cleanup**: Always `client.close()` in `finally`
- **Bluehawk**: `// :snippet-start: kebab-name` / `// :snippet-end:`; `// :remove:` for single lines
- **Snippet names**: Unique within each file, lowercase kebab-case
- **Template**: `examples/example-stub.js`

## Test File Pattern

```javascript
import { yourExampleName } from '../examples/topic/your-example.js';
import Expect from '../utils/Expect.js';

describe('Your topic tests', () => {
  afterEach(async () => {
    const { MongoClient } = await import('mongodb');
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    const db = client.db('your_db_name');
    await db.dropDatabase();
    await client.close();
  });

  it('Should produce the expected output', async () => {
    const result = await yourExampleName();
    Expect.that(result).shouldMatch('topic/your-example-output.sh');
  });
});
```

- **File naming**: `kebab-case.test.js` in `tests/{topic}/`
- **Import Expect**: `import Expect from '../utils/Expect.js'` (default import, no braces)
- **Teardown**: Drop test database in `afterEach` to avoid cross-contamination
- **Do not** drop sample data databases (sample_mflix, etc.) — only drop databases your example created
- **Template**: `tests/example.test.js`

## Sample Data

```javascript
import { describeWithSampleData, itWithSampleData } from '../utils/sampleDataChecker.js';

// Entire suite requires sample data
describeWithSampleData('Suite name', () => { /* tests */ }, 'sample_mflix');

// Single test requires sample data
itWithSampleData('test name', async () => { /* test */ }, 'sample_restaurants');
```

Tests auto-skip when required sample databases are unavailable.

## Expected Output Files

- Place alongside examples: `your-example-output.sh` or `your-example-output.txt`
- The output file path passed to `Expect.shouldMatch()` is relative to `examples/`
- Use ellipsis patterns for dynamic values (see root CLAUDE.md)

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests (`--runInBand --detectOpenHandles`) |
| `npx jest tests/path/file.test.js` | Run a single test file |
| `npm test -- -t 'describe text'` | Run tests matching a name |
| `npm run format` | Prettier format all files |
| `npm run snip` | Extract snippets via Bluehawk |

All commands run from `code-example-tests/javascript/driver/`.

## Snippet Output

`npm run snip` extracts to: `content/code-examples/tested/javascript/driver/{topic}/{file}.snippet.{name}.js`

Files to ignore from snipping are listed in `IGNORE_PATTERNS` in `snip.js`.
