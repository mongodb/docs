# MongoDB Shell Test Patterns and Troubleshooting

This document helps AI assistants and technical writers diagnose and fix common
test failures in the mongosh code example test infrastructure.

## How This Test Infrastructure Works

Unlike other driver test suites that call functions directly, the mongosh tests:

1. **Execute mongosh as a subprocess** - Tests run `mongosh --file <tempfile>`
2. **Capture stdout** - The output from mongosh is captured as a string
3. **Compare to expected output files** - String comparison with pattern matching

This means tests are validating the **actual mongosh output**, not return values.

## The Expect API

### Exact Matching with `shouldMatch()`

Use when you need to verify the exact output (with optional ellipsis wildcards):

```javascript
await Expect
  .outputFromExampleFiles(['path/to/load-data.js', 'path/to/run-query.js'])
  .withDbName('my-database')
  .shouldMatch('path/to/expected-output.sh');
```

### Schema Validation with `shouldResemble()`

Use when you need to verify output structure without exact matching:

```javascript
await Expect
  .outputFromExampleFiles(['path/to/query.js'])
  .withDbName('my-database')
  .shouldResemble('path/to/expected-output.sh')
  .withSchema({
    count: 3,                                  // Expect exactly 3 documents
    requiredFields: ['_id', 'title', 'year'],  // These fields must exist
    fieldValues: { year: 2012 }                // This field must have this value
  });
```

**When to use each**:

| Use `shouldMatch()` when... | Use `shouldResemble()` when... |
|-----------------------------|--------------------------------|
| Output must match exactly (with wildcards or ignored fields) | Only structure matters, not exact content |
| Documenting specific output for readers | Verifying query returns expected document count |
| Testing formatting or display | Testing that fields exist, only checking values of `fieldValues` |

Key points:
- File paths are **relative to the `examples/` directory**
- Files execute in order (first file runs, then second, etc.)
- `.withDbName()` is **required** - specifies which database to use
- The expected output file is also relative to `examples/`
- `withIgnoredFields()` can only be used with `shouldMatch()`, not with `shouldResemble()`

## Common Test Failures and Fixes

### Test Passes Once, Fails on Second Run (Idempotency)

**Symptom**: Test passes first time, fails with different output on second run.

**Causes and fixes**:

| Cause | Fix |
|-------|-----|
| Documents modified | Revert the specific changes in `afterEach` |
| Documents inserted | Delete the inserted documents in `afterEach` |
| Documents deleted | Re-insert the deleted documents in `afterEach` |
| Index created | Drop the index in `afterEach` |
| Collection/view created | Drop the collection/view in `afterEach` |

**General principle**: After your test's `afterEach` runs, the database should be
in the same state as before your test ran.

### Cleaning Up After Tests (Standard Pattern)

Most tests use MongoDB sample data (`sample_mflix`, `sample_restaurants`, etc.).
**Do not drop these databases** - they take a long time to reload and are shared
across tests.

Instead, **revert only the specific changes** made by your test:

**If your test modifies documents**, restore them:
```javascript
afterEach(() => {
  const mongoUri = process.env.CONNECTION_STRING;
  // Revert the specific update made in the test
  const command = `mongosh "${mongoUri}" --eval "
    db = db.getSiblingDB('sample_mflix');
    db.movies.updateOne(
      { title: 'The Matrix' },
      { \\$unset: { myNewField: '' } }
    );
  "`;
  execSync(command, { encoding: "utf8" });
});
```

**If your test inserts documents**, delete them:
```javascript
afterEach(() => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --eval "
    db = db.getSiblingDB('sample_mflix');
    db.movies.deleteMany({ insertedByTest: true });
  "`;
  execSync(command, { encoding: "utf8" });
});
```

**If your test deletes documents**, re-insert them:
```javascript
// Store the document before deleting so you can restore it
let deletedDoc;

beforeEach(() => {
  // Capture the document that will be deleted
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --quiet --eval "
    db = db.getSiblingDB('sample_mflix');
    printjson(db.movies.findOne({ title: 'Some Movie' }));
  "`;
  const result = execSync(command, { encoding: "utf8" });
  deletedDoc = JSON.parse(result);
});

afterEach(() => {
  if (deletedDoc) {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "
      db = db.getSiblingDB('sample_mflix');
      db.movies.insertOne(${JSON.stringify(deletedDoc)});
    "`;
    execSync(command, { encoding: "utf8" });
  }
});
```

### Cleaning Up Indexes

Indexes persist after creation and **change query behavior**. If your test creates
an index, you must drop it afterward, or subsequent test runs may produce different
results (e.g., queries may return results in a different order).

```javascript
afterEach(() => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --eval "
    db = db.getSiblingDB('${dbName}');
    db.myCollection.dropIndex('myIndex_1');
  "`;

  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    // Index may not exist if test failed before creating it
    if (!error.message.includes('index not found')) {
      console.error('Failed to drop index:', error.message);
    }
  }
});
```

**Common index-related symptoms**:
- Query results return in a different order than expected
- Test works locally but fails in CI (different index state)
- Test fails after running other tests in the same file

### Cleaning Up Other Configuration Changes

If your test modifies any database or collection configuration, revert it:

| Change Made | Cleanup Required |
|-------------|------------------|
| Create index | Drop the index |
| Create collection with special options | Drop the collection |
| Set collection validation rules | Remove or reset validation |
| Enable sharding | (Usually not reversible in tests) |
| Create views | Drop the view |

### Tests That Create Custom Data (Special Case)

If your test creates its own database with custom data (not using sample data),
you can drop the entire database in cleanup:

```javascript
const dbName = "my-custom-test-db";  // NOT a sample_* database

afterEach(() => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    console.error(`Failed to drop database '${dbName}':`, error.message);
  }
});
```

⚠️ **Never use this pattern with sample databases** like `sample_mflix`,
`sample_restaurants`, etc. Those require selective cleanup as described above.

### Output Comparison Fails

**Symptom**: Test fails with "Comparison failed" message showing expected vs actual.

**Check these things**:

1. **Dynamic values like `_id`**: Use `.withIgnoredFields("_id")` or use `...` in output file
2. **Array order differs**: Default is unordered comparison. Use `.withOrderedSort()` if order matters
3. **Extra fields in output**: Add standalone `...` line in expected output file
4. **Timestamps differ**: Use `.withIgnoredFields("timestamp")` or `ISODate("...")` in output
5. **Too many dynamic values**: Consider using `shouldResemble()` with schema validation instead

**Output file patterns**:
```javascript
// Ignore specific field value
{ _id: ..., name: 'Alice' }

// Truncate long strings
{ plot: 'A young man is accidentally sent 30 years...' }

// Allow extra fields
{
  name: 'Alice',
  ...
}
```

**When exact matching is too brittle**: If your output has many dynamic values or
a query may return indeterminate but valid results:

```javascript
// Instead of complex ellipsis patterns, validate structure
await Expect.outputFromExampleFiles(['query.js'])
  .withDbName('test-db')
  .shouldResemble('output.sh')
  .withSchema({
    count: 5,
    requiredFields: ['_id', 'title', 'year']
  });
```

### File Not Found Errors

**Symptom**: `File not found: "path/to/file.js"`

**Fix**: Paths are relative to `examples/` directory. Don't include `examples/` in the path.

```javascript
// Wrong
await Expect.outputFromExampleFiles(['examples/aggregation/query.js'])

// Correct
await Expect.outputFromExampleFiles(['aggregation/query.js'])
```

### Connection/Execution Errors

**Symptom**: `Failed to execute mongosh command` or `ECONNREFUSED`

**Check**:
1. MongoDB is running on the port specified in `.env`
2. `.env` file exists with `CONNECTION_STRING` and `CONNECTION_PORT`
3. `mongosh` is installed and in PATH

### Syntax Errors in Generated File

**Symptom**: `SyntaxError` mentioning a temp file path

**This indicates**: Either your code example has a syntax error, OR the test
utility is incorrectly wrapping your code.

**Debugging steps**:
1. Check your code example file for valid JavaScript syntax
2. Look at the temp file content shown in the error message
3. If your code looks correct, contact DevDocs - the utility may need updating

## Test Structure Best Practices

### Each Test Should Be Independent

Tests must not depend on each other. Each test should:
- Set up its own required state (via the example files it runs)
- Clean up after itself (via `afterEach`)

### Use `afterEach`, Not `afterAll`

```javascript
// Preferred - cleans up after EACH test
afterEach(() => {
  // Drop database
});

// Avoid - only runs after ALL tests, allowing cross-contamination
afterAll(() => {
  // Drop database
});
```

### Database Naming

Use a descriptive, unique database name per test file to avoid conflicts:

```javascript
const dbName = "timeseries";  // Unique to this test file
```

## When to Use Sample Data Utilities

If your tests require MongoDB sample data (sample_mflix, sample_restaurants, etc.):

```javascript
const { describeWithSampleData } = require('../utils/sampleDataChecker');

describeWithSampleData('Tests requiring sample_mflix', () => {
  // Tests here will be skipped if sample_mflix is not available
}, 'sample_mflix');
```

## Debugging Tips

### Run a Single Test

```bash
npm test -- -t 'Should return filtered output'
```

### See Full Output

Add console logging in your test:
```javascript
it('My test', async () => {
  // Temporarily capture output for debugging
  const result = await runMongoshAndCapture(...);
  console.log('Actual output:', result);
  // ... rest of test
});
```

### Check the Temp File

When you get a syntax error, the error message includes the generated temp file
content. Review it to see how your code was wrapped.

