# AI Agent Instructions: Automated JavaScript/Node.js Driver Code Example Migration

## 🎯 Quick Decision Framework (READ FIRST)

**When You Encounter Issues:**
- **Sample data missing** → SKIP with documentation, continue migration
- **Runtime errors** → ESCALATE immediately with error details
- **Module import failures** → LOG details, create simplified version
- **File not found** → SEARCH for alternatives, escalate if none found
- **Complex custom data** → CREATE minimal test data or ESCALATE
- **Connection issues** → RETRY 3x, then skip gracefully

**Key Success Criteria:**
✅ Code runs without errors
✅ Tests pass or skip gracefully
✅ Documentation references updated
✅ Original files safely deleted
✅ Bluehawk markup generates correct snippets

---

## Overview

This document provides step-by-step instructions for AI agents to automate the
migration of hard-coded, untested JavaScript/Node.js Driver code examples from documentation into a
proper test environment. This ensures code examples remain accurate, testable,
and maintainable.

## Prerequisites

Before starting, ensure you understand:
1. **Monorepo structure** from `.github/copilot-instructions.md`
2. **Existing test patterns** in `code-example-tests/javascript/driver`
3. **Bluehawk markup syntax** for documentation integration
4. **MongoDB Node.js driver patterns** and environment handling
5. **Jest testing framework** and ES modules

## 📋 5-Phase Migration Process

### Phase 1: 🔍 Discovery & Analysis
**GOAL**: Find all JavaScript code examples in documentation

#### 1.1 Read Repository Documentation
```bash
# Always start by understanding the monorepo
read_file(".github/copilot-instructions.md")
```

**Key Points:**
- `content/` contains documentation projects (versioned and non-versioned)
- `code-example-tests/javascript/driver/` contains the test infrastructure
- **Version isolation**: Each version's `source/` directory is self-contained
- Follow the existing patterns for examples, tests, and utils

#### 1.2 Analyze Documentation Page
```bash
# Examine the documentation page for JavaScript file references
read_file("content/node/current/source/[TARGET_PAGE].txt")
```

**Look for all forms of JavaScript code examples:**
1. **Direct file references**: `.. literalinclude::` directives referencing JavaScript files
2. **Inline code blocks**: `.. code-block:: javascript` containing hardcoded JavaScript code
3. **Include files**: `.. include::` directives that may contain:
   - Direct `.. code-block:: javascript` sections with hardcoded code
   - Nested `.. literalinclude::` directives referencing JavaScript files
4. **Expected output sections**: Code blocks showing JSON or text output
5. **Sample data requirements**: References to sample databases or datasets

**Analysis Strategy:**
```bash
# Find all literalinclude references to JavaScript files
grep -r "literalinclude.*\.js" content/node/current/source/

# Find all JavaScript code blocks with potentially hardcoded examples
grep -r "code-block:: javascript\|code-block:: js" content/node/current/source/

# Find all include directives that might contain JavaScript code
grep -r ".. include::" content/node/current/source/

# Check included files for JavaScript code
grep -r "code-block:: javascript\|code-block:: js\|literalinclude.*\.js" content/node/current/source/includes/
```

**Important**: Determine if you're working with:
- **Versioned project**: `content/node/current/source/` (scope to this version only)
- **Non-versioned project**: `content/atlas/source/` (scope to project root)

#### 1.3 Locate and Categorize Code Examples

**Examine all discovered JavaScript code examples and categorize them:**

**Type 1: Referenced JavaScript Files**
```bash
# Find all JavaScript files referenced in literalinclude directives
glob_file_search("content/node/current/source/**/[REFERENCED_FILE].js")
```

**Type 2: Inline Code Blocks**
```bash
# Examine inline code blocks in documentation files
grep -A 20 -B 5 "code-block:: javascript\|code-block:: js" content/node/current/source/[PAGE].txt
```

**Type 3: Included Files with JavaScript Code**
```bash
# Check include files for JavaScript code examples
grep -l "code-block:: javascript\|code-block:: js\|literalinclude.*\.js" content/node/current/source/includes/*.rst
```

**Examine each discovered code example for:**
- **Standalone execution scripts** (need conversion to exportable functions)
- **Hard-coded connection strings** (need environment variable replacement)
- **Sample data dependencies** (need sample data handling)
- **Inline hardcoded examples** (need extraction to testable files)
- **Expected outputs** shown in documentation

### Phase 2: ⚡ Code Migration
**GOAL**: Convert to testable functions with Bluehawk markup

#### 2.1 Create Example Directory Structure
```bash
# Create organized directory structure
mkdir -p code-example-tests/javascript/driver/examples/[TOPIC]/
mkdir -p code-example-tests/javascript/driver/tests/[TOPIC]/
```

**Naming Convention:**
- Use kebab-case for directories: `quick-start`, `crud-operations`
- Group related concepts: `aggregation/pipelines`, `search/text`
- Avoid matching specific docs project structure

#### 2.2 Convert Code to Testable Functions

**Transform Pattern:**
```javascript
// FROM: Standalone execution script
const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const result = await movies.findOne({ title: 'Back to the Future' });
        console.log(result);
    } finally {
        await client.close();
    }
}

main().catch(console.dir);

// TO: Testable function with proper exports
import { MongoClient } from 'mongodb';

export async function runQuickStartExample() {
    const uri = process.env.CONNECTION_STRING;
    if (!uri) {
        throw new Error('Set your CONNECTION_STRING environment variable. ' +
            'See: https://www.mongodb.com/docs/drivers/node/current/quick-start/#environment-variable');
    }

    const client = new MongoClient(uri);

    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const result = await movies.findOne({ title: 'Back to the Future' });
        console.log(result);
        return result; // Return for test validation
    } finally {
        await client.close();
    }
}
```

#### 2.3 Add Bluehawk Markup

**File-Level Replacements (Optional):**
If you need to apply replacements across the entire file, define them at the top and close at the end:

```javascript
//	:replace-start: {
//	  "terms":
//	  {
//	  "process.env.CONNECTION_STRING": "\"<connection string URI>\"",
//    "export ": ""
//	  }
//	}
import { MongoClient } from 'mongodb';

export async function runQuickStartExample() {
    const uri = process.env.CONNECTION_STRING;
    // ... rest of file content
}
// :replace-end:
```

**Snippet-Level Markup Patterns:**

```javascript
// :snippet-start: connection-setup
// :uncomment-start:
//const { MongoClient } = require("mongodb");
// :uncomment-end:

const uri = process.env.CONNECTION_STRING;
if (!uri) {
    throw new Error('Set your CONNECTION_STRING environment variable. ' +
        'See: https://www.mongodb.com/docs/drivers/node/current/quick-start/#environment-variable');
}
const client = new MongoClient(uri);
// :snippet-end:

// :snippet-start: database-operation
const database = client.db('sample_mflix');
const movies = database.collection('movies');

const query = { title: 'Back to the Future' };
const movie = await movies.findOne(query);

console.log(movie);
return movie; // :remove:
// :snippet-end:

// Code outside snippets that won't appear in docs
// :remove-start:
// Test-specific validation that shouldn't appear in documentation
if (!movie) {
    throw new Error('Movie not found');
}
// :remove-end:

// :snippet-start: results-processing
// Process results for display
console.log(JSON.stringify(movie, null, 2));
// :snippet-end:
```

**Critical Bluehawk Rules:**
- **File-level replacements**: Define once at top, close at end of file
- **Snippet-level operations**: Only use `:remove:` or `:replace:` tags INSIDE snippet blocks (between `:snippet-start:` and `:snippet-end:`)
- **Tag closing order**: Always close inner blocks before outer blocks:
  ```javascript
  // :snippet-start: example
  // :remove-start:
  // content to remove
  // :remove-end:    ← Close inner block first
  // :snippet-end:   ← Then close outer block
  ```
- **`:snippet-start:`/`:snippet-end:`**: Mark code sections for documentation
- **`:replace-start:`/`:replace-end:`**: Replace internal patterns with public APIs
- **`:remove-start:`/`:remove-end:`**: Exclude test-specific code from docs
- **`:uncomment-start:`/`:uncomment-end:`**: Show commented CommonJS require statements in docs

### Phase 3: 🧪 Test Implementation
**GOAL**: Create minimal validation tests to ensure documentation examples work correctly

#### 3.1 Test Philosophy: Documentation Validation, Not Development Testing

**DO create tests that:**
- ✅ Verify the code example runs without errors
- ✅ Check basic return value structure/types
- ✅ Use sample data gracefully (skip if not available)

**DON'T create tests for:**
- ❌ Connection error handling (development concern)
- ❌ Edge cases and error conditions (not docs-relevant)
- ❌ Complex data validation (unless shown in docs output)
- ❌ Performance testing or optimization validation
- ❌ Multiple test scenarios unless the docs show multiple examples

**Rule of thumb:** If it's not demonstrated in the documentation, don't test it.

#### 3.2 Template Selection Guide

**Use SIMPLE template (90% of cases):**
- Single function example
- Basic CRUD operations
- Straightforward "does it work" validation

**Use OUTPUT MATCHING template only when:**
- Documentation explicitly shows expected output
- Output format is important to the example's purpose
- Results are predictable across test runs

**Use COMPLEX template only when:**
- Multiple related functions need testing
- Example has custom test data requirements
- Documentation shows multi-step workflow

#### 3.3 Create Test File Structure

**SIMPLE TEMPLATE - Use this for most documentation examples:**
```javascript
import { runExampleFunction } from '../examples/topic/example.js';
import { describeWithSampleData } from '../utils/sampleDataChecker.js';

describeWithSampleData(
  'Example validation tests',
  () => {
    it('Should run successfully and return expected result', async () => {
      const result = await runExampleFunction();

      // Minimal validation - just ensure it works
      expect(result).toBeDefined();
      expect(typeof result).toBe('object'); // or whatever type expected
    });
  },
  'sample_database_if_needed' // Required sample database
);
```

**OUTPUT MATCHING TEMPLATE - Use only when docs show specific expected output:**
```javascript
import { runExampleFunction } from '../examples/topic/example.js';
import outputMatchesExampleOutput from '../utils/outputMatchesExampleOutput.js';
import { describeWithSampleData } from '../utils/sampleDataChecker.js';

describeWithSampleData(
  'Example validation tests',
  () => {
    it('Should run successfully and produce expected output', async () => {
      const outputFilePath = 'topic/example-output.sh';
      const result = await runExampleFunction();
      const outputMatches = outputMatchesExampleOutput(outputFilePath, result);
      expect(outputMatches).toBe(true);
    });
  },
  'sample_database_if_needed'
);
```

**COMPLEX TEMPLATE - Use only for multi-step workflows or custom data requirements:**
```javascript
import { runCustomExample } from '../examples/custom/custom-example.js';

describe('Custom Example Tests', () => {
  let client;

  beforeEach(async () => {
    // Setup test database if needed
    const { MongoClient } = require('mongodb');
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    await client.connect();

    // Set up test data
    const db = client.db('test_database');
    const collection = db.collection('test_collection');
    await collection.deleteMany({}); // Clean slate
    await collection.insertMany([
      { name: 'Test Document 1', value: 100 },
      { name: 'Test Document 2', value: 200 }
    ]);
  });

  afterEach(async () => {
    // Cleanup test database
    if (client) {
      const db = client.db('test_database');
      await db.dropDatabase();
      await client.close();
    }
  });

  it('Should process custom data correctly', async () => {
    const result = await runCustomExample();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
```

#### 3.4 When to Create Output Files

**Create output files ONLY when:**
- Documentation shows specific expected output format
- The output is deterministic enough to validate
- The example's purpose is to demonstrate specific output structure

**Skip output files when:**
- Output contains variable data (ObjectIds, timestamps, counts)
- Documentation doesn't show expected output
- Example demonstrates functionality, not specific results

**If you create output files, you MUST use `outputMatchesExampleOutput()` in tests.**
**If you don't need output validation, don't import the output matching utility.**

#### 3.5 Handle Sample Data Requirements

**Sample Data Detection Patterns:**

```javascript
// For basic sample database requirements:
describeWithSampleData('Movie Tests', () => {
  // Test cases here
}, 'sample_mflix');

// For multiple database requirements:
describeWithSampleData('Cross-Database Tests', () => {
  // Test cases here
}, ['sample_mflix', 'sample_restaurants']);

// For specific collection requirements:
describeWithSampleData('Advanced Tests', () => {
  // Test cases here
}, 'sample_mflix', {
  collections: {
    'sample_mflix': ['movies', 'theaters']
  }
});

// For individual test cases:
import { itWithSampleData } from '../utils/sampleDataChecker.js';

describe('Mixed Tests', () => {
  itWithSampleData('should query movies', async () => {
    const result = await runMovieQuery();
    expect(result.length).toBeGreaterThan(0);
  }, 'sample_mflix');

  it('should work without sample data', async () => {
    const result = await runCustomQuery();
    expect(result).toBeDefined();
  });
});
```

**Common Sample Databases:**
- `sample_mflix`: Movies and theaters data
- `sample_restaurants`: Restaurant location data
- `sample_training`: Training and educational data
- `sample_analytics`: Financial data
- `sample_airbnb`: Airbnb listing data

#### 3.6 Create Expected Output Files

**Output File Guidelines:**
```json
[
  {
    "_id": "...",                    // Use ellipsis for variable fields
    "title": "Back to the Future",  // Exact values for important fields
    "plot": "A young man is accidentally sent...", // Ellipsis for truncated strings
    "year": 1985,                   // Exact values for numbers
    "genres": ["Adventure", "Comedy", "Sci-Fi"], // Exact arrays when order doesn't matter
    "imdb": {
      "rating": 8.5,
      "votes": "...",               // Ellipsis for unimportant nested values
      "id": "..."
    }
  }
]
...                                 // Ellipsis for additional documents
```

**Ellipsis Patterns:**
- `"field": "..."` - Match any value for this field
- `"text": "Start of text..."` - Match text starting with this prefix
- Standalone `...` - Match any additional fields/documents

**Critical: Ellipsis vs ignoreFieldValues**

**Use Ellipsis in Output File (Preferred):**
When you want flexible matching and can show `"..."` in documentation:

```json
// output.txt
{
  "_id": "...",           // Ellipsis automatically matches any ObjectId
  "createdAt": "...",     // Ellipsis automatically matches any timestamp
  "title": "Back to the Future"
}
```

```javascript
// test file - No ignoreFieldValues needed!
const outputMatches = outputMatchesExampleOutput(outputFilePath, result, {
  comparisonType: 'unordered'
  // Ellipsis in output.txt handles variable fields automatically
});
```

**Use ignoreFieldValues (Only when necessary):**
When documentation must show realistic values but they vary between test runs:

```json
// output.txt - Shows real values for better documentation
{
  "_id": "507f1f77bcf86cd799439011",    // Real ObjectId shown in docs
  "createdAt": "2023-10-15T14:30:22Z",  // Real timestamp shown in docs
  "title": "Back to the Future"
}
```

```javascript
// test file - Must use ignoreFieldValues for fields with real values
const outputMatches = outputMatchesExampleOutput(outputFilePath, result, {
  comparisonType: 'unordered',
  ignoreFieldValues: ['_id', 'createdAt'] // Only for fields with real values
});
```

**Common Mistake to Avoid:**
Never use both ellipsis AND ignoreFieldValues for the same field:
- ❌ Bad: `"_id": "..."` in output.txt AND `ignoreFieldValues: ['_id']`
- ✅ Good: Either ellipsis OR ignoreFieldValues, not both

### Phase 4: ✅ Validation & Generation
**GOAL**: Verify implementation and generate documentation snippets

#### 4.1 Verify Implementation

**Module Loading Check:**
```bash
cd code-example-tests/javascript/driver
node -e "import('./examples/[topic]/[example].js').then(console.log)"
```

**Formatting:**
```bash
npm run format
```

**Test Execution:**
```bash
npm test -- --testMatch='**/tests/[topic]/**/*.test.js'
```

#### 4.2 Generate Documentation Snippets

```bash
# Run Bluehawk to generate documentation files
npm run snip
```

**Verify Generated Files:**
- Check `content/code-examples/tested/javascript/driver/[topic]/` for generated snippets
- Ensure snippets have proper names and formatting
- Validate that replacements work correctly

#### 4.3 Integration Testing

```bash
# Run all tests to ensure no regressions
npm test
```

### Phase 5: 📝 Documentation Integration & Cleanup
**GOAL**: Update references and clean up original files

#### 5.1 Ensure Symlink to Tested Code Examples

**Create symlink if it doesn't exist:**

Before updating documentation references, verify that the documentation source directory has a symlink to the tested code examples. Our build toolchain can't use files outside of a `project/version/source` directory, so we use symlinks to make the examples in `content/code-examples/tested` available to each project.

**Check for existing symlink:**
```bash
# Navigate to the documentation source directory
cd content/node/current/source/

# Check if code-examples directory exists and has tested symlink
ls -l code-examples/tested 2>/dev/null

# If successful, verify it points to the correct location
realpath code-examples/tested 2>/dev/null
# Should show: .../docs-mongodb-internal/content/code-examples/tested
```

**Create symlink if missing:**
```bash
# Create code-examples directory if it doesn't exist
mkdir -p content/node/current/source/code-examples

# Navigate to the directory
cd content/node/current/source/code-examples

# Create symlink to tested examples (adjust path based on nesting level)
ln -s ../../../../code-examples/tested

# Verify creation
ls -l tested
# Should show: tested -> ../../../../code-examples/tested
```

**Nesting Level Guide:**
- **Versioned projects** (e.g., `node/current/source`): Use `../../../../code-examples/tested`
- **Non-versioned projects** (e.g., `atlas/source`): Use `../../../code-examples/tested`
- **Manual/deeply nested** (e.g., `manual/manual/source`): Use `../../../../code-examples/tested`

**Important Notes:**
- Each docs project directory and version must have its own symlink
- If working with multiple versions, create symlinks for each version separately
- The symlink should be created before updating any literalinclude directives

#### 5.2 Update Documentation References

**Replace All Forms of JavaScript Code Examples:**

**Type 1: Replace literalinclude Directives**
Original documentation references files:
```rst
.. literalinclude:: /includes/quick-start/main.js
   :language: javascript
```

Replace with tested snippets (note: add `:category:` and evaluate any other directive options):
```rst
.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/main.snippet.connection-setup.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/main.snippet.find-document.js
   :language: javascript
   :category: usage example
```

**Type 2: Replace Inline Code Blocks**
Original hardcoded examples:
```rst
.. code-block:: javascript

   const { MongoClient } = require('mongodb');

   async function main() {
       const uri = process.env.CONNECTION_STRING;
       const client = new MongoClient(uri);
       // ... rest of hardcoded example
   }

   main().catch(console.dir);
```

Replace with tested snippet references:
```rst
.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/main.snippet.connection-setup.js
   :language: javascript
   :category: usage example
```

**Type 3: Update Include Files**
If include files contain JavaScript code examples, update them following the same patterns above.

**Update Process:**
1. **Find all forms of JavaScript code** in the documentation page (literalinclude, code-block, include)
2. **Replace each with appropriate tested snippet references**
3. **Add `:category:` option** following [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/)
4. **Consider other directive options** May need to remove or adjust directive options depending on changes made during migration
5. **Verify snippet names** match the generated Bluehawk output
6. **Extract inline code** to testable examples first if needed
7. **Update include files** that contain JavaScript code examples

**Category Guidelines:**
Based on the [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/):
- **JavaScript code examples that show real-world usage patterns**: Use `:category: usage example`
- **JSON/text output**: Use `:category: example return object`
- **Configuration examples**: Use `:category: example configuration object`
- **Syntax demonstrations**: Use `:category: syntax example`
- **Shell commands**: Use `:category: non-mongodb command`

**Important Directive Options:**
- **ADD** `:category:` option (required for proper content classification)
- **KEEP** `:language:` option (required for syntax highlighting)
- **REMOVE** `:dedent:` option (legacy tooling support, no longer needed)
- **EVALUATE**: `:start-after:` and `:end-before:` options
  - The `:start-after:` and `:end-before:` options are used to include only a
    range of content in the rendered documentation.
  - Where possible, this should be replaced by using `:snippet-start:` and
    `:snippet-end:` tags in the source file to output a file containing only
    that code
  - If `:start-after:` and `:end-before:` are used, evaluate if they're still
    necessary.
    - If not, remove them to include the entire snippet
    - If needed, adjust to properly capture the intended portion of the code
- **EVALUATE**: `:emphasize-lines:` option
  - Evaluate if the emphasized lines are still relevant
  - If not, remove the option
  - If needed, adjust to properly highlight the intended lines
- **EVALUATE**: `:lineno-start:` option
  - Evaluate if the line number is still relevant
  - If not, remove the option
  - If needed, adjust to properly start at the intended line

#### 5.3 Check for File Reuse

Before deleting original files, verify they're not used elsewhere within the same version:

**Understanding Documentation Structure:**
- **Versioned projects** (e.g., `content/node/`): Each version directory (`current`, `v5.0`, etc.) contains its own `source` directory
- **Non-versioned projects** (e.g., `content/atlas/`): `source` directory is at the project root
- **Version isolation**: Files in `current/source/includes/` are completely separate from `v5.0/source/includes/`
- **Build scope**: Each version's `source` directory is self-contained for that build

**Search for File Usage (Properly Scoped):**
```bash
# For versioned projects - search only within the specific version's source directory
grep -r "includes/quick-start/main.js" content/node/current/source/

# For non-versioned projects - search within the project's source directory
grep -r "includes/quick-start/main.js" content/atlas/source/

# More comprehensive search patterns within the version scope
grep -r "quick-start/main" content/node/current/source/
grep -r "main.js" content/node/current/source/

# Search for include files that might contain JavaScript code examples
grep -r "includes/quick-start" content/node/current/source/
```

**Search for Code Block and Include Usage:**
```bash
# Find any hardcoded JavaScript code that matches your examples
grep -A 10 -B 5 "code-block:: javascript\|code-block:: js" content/node/current/source/ | grep -A 15 "MongoClient\|async function"

# Find include directives that reference files you're replacing
grep -r "include.*quick-start" content/node/current/source/
```

**Analysis Rules (Corrected Scope):**
- **Single use**: If file only appears in the documentation page you're updating within the same version → Safe to delete
- **Multiple uses**: If file appears in other pages within the same version → Keep file, update references individually
- **Cross-version impact**: Files with same name in other versions are separate - no coordination needed

#### 5.4 Clean Up Original Files

**Safe Deletion Criteria:**
Only delete original files when ALL conditions are met:
- [ ] File is only referenced via `literalinclude` or `include` in pages you're updating
- [ ] No other `.txt` or `.rst` files in the same version's `source` directory reference it
- [ ] No inline `code-block` sections duplicate the file's content (indicating shared usage)
- [ ] New tested examples are working and validated
- [ ] You have confirmed the correct version scope for your search

**Additional Checks for Include Files:**
- [ ] Include file (`.rst`) is only used by pages you're updating
- [ ] Include file doesn't contain shared content beyond the JavaScript code examples
- [ ] No other documentation pages include the `.rst` file

**Deletion Process:**
```bash
# Verify no remaining references to files after documentation updates
grep -r "quick-start/main.js" content/node/current/source/
grep -r "includes/quick-start" content/node/current/source/

# Verify no remaining references to include files
grep -r "quick-start.*\.rst" content/node/current/source/

# If no results found within the version scope, safe to delete
rm content/node/current/source/includes/quick-start/main.js

# Delete include files only if they contained only the code examples you migrated
rm content/node/current/source/includes/quick-start/code-example.rst

# If directory becomes empty, remove it too
rmdir content/node/current/source/includes/quick-start/
```

#### 5.5 Update Output References

**Replace Output Sections:**
Original documentation may have hardcoded output:
```rst
.. code-block:: json

   {
       "_id": "573a1398f29313caabce9682",
       ...
       "title": "Back to the Future",
       ...
   }
```

Replace with reference to tested output:
```rst
.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/output.txt
   :language: json
   :category: example return object
```

#### 5.6 Verification Steps

**Post-Integration Checklist:**
- [ ] All literalinclude references resolve correctly
- [ ] Output examples match expected format
- [ ] Original files deleted only if no other references exist

**Validation Commands:**
```bash
# Verify all new file paths exist
ls -la content/code-examples/tested/javascript/driver/quick-start/

# Check for any remaining references to deleted files (within version scope)
find content/node/current/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/main.js"

# For non-versioned projects:
find content/atlas/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/main.js"
```

#### 5.7 Handle Edge Cases

**Working with Versioned vs Non-Versioned Projects:**

**Versioned Projects** (e.g., `content/node/`, `content/golang/`):
```bash
# Work within specific version scope - each version is isolated
grep -r "quick-start/main.js" content/node/current/source/
# Other versions (v5.0, v4.17, upcoming) are separate and unaffected
```

**Non-Versioned Projects** (e.g., `content/atlas/`, `content/manual/`):
```bash
# Work within project's source directory
grep -r "quick-start/main.js" content/atlas/source/
```

**Shared Include Files within Version:**
For files in `/includes/` directories used by multiple pages within the same version:
- **Assess impact**: Find all pages using the include within the version's source directory
- **Update references**: Update all referencing pages within that version simultaneously
- **No cross-version impact**: Other versions with same-named files are unaffected

**Complex Documentation Structures:**
For pages with multiple code examples:
- **Map each literalinclude** to its corresponding tested snippet
- **Group related snippets** from the same example function
- **Maintain logical flow** in documentation presentation

#### 5.8 Complete Example: QuickStart Migration

**Original Documentation (content/node/current/source/quick-start.txt):**
```rst
.. literalinclude:: /includes/quick-start/main.js
   :language: javascript
   :dedent:

.. include:: /includes/quick-start/query-output.rst
```

**Additional scenarios you might encounter:**
```rst
.. code-block:: javascript

   const { MongoClient } = require('mongodb');

   async function main() {
       const uri = process.env.CONNECTION_STRING;
       // ... hardcoded example
   }

   main().catch(console.dir);

.. include:: /includes/quick-start/setup-instructions.rst
```

**Step 1: Update All References**
```rst
.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/main.snippet.connection-setup.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/main.snippet.find-document.js
   :language: javascript
   :category: usage example

.. literalinclude:: /code-examples/tested/javascript/driver/quick-start/output.txt
   :language: json
   :category: example return object
```

**Step 2: Check All Usage Types**
```bash
# Check if original files are used elsewhere
grep -r "includes/quick-start/main.js" content/node/current/source/
grep -r "includes/quick-start/query-output.rst" content/node/current/source/

# Check for any hardcoded examples that might duplicate the file content
grep -A 20 "code-block:: javascript\|code-block:: js" content/node/current/source/ | grep -A 15 "MongoClient\|async function"

# Check for include directives referencing files with JavaScript code
grep -r "include.*quick-start" content/node/current/source/
```

**Step 3: Safe Cleanup (if no other references found)**
```bash
# Remove original files
rm content/node/current/source/includes/quick-start/main.js
rm content/node/current/source/includes/quick-start/query-output.rst

# Remove empty directory
rmdir content/node/current/source/includes/quick-start/
```

**Step 4: Verify Integration**
```bash
# Confirm all new files exist
ls -la content/code-examples/tested/javascript/driver/quick-start/
# Should show: main.snippet.connection-setup.js, main.snippet.find-document.js, output.txt

# Verify no remaining references to deleted files (within version scope only)
find content/node/current/source/ -name "*.txt" -o -name "*.rst" | \
  xargs grep -l "includes/quick-start"
# Should return no results within this version's source directory
```

## Decision Tree for Common Scenarios

### Connection String Handling
- **Use `process.env.CONNECTION_STRING`** in example functions
- **Use Bluehawk replace** to show `"<connection string URI>"` in docs
- **Never hardcode** connection strings

### Sample Data vs Custom Data
```
Does the example use sample_* databases?
├─ YES: Use describeWithSampleData(description, testFn, 'database_name')
│      Don't drop databases in cleanup
├─ NO:  Create test-specific database name
│      Drop database in cleanup function
```

### Output Verification Strategy
```
Does the documentation show expected output?
├─ YES: Create output.txt with flexible patterns
│      Use ellipsis for variable fields
├─ NO:  Focus on error-free execution
│      Simple existence/compilation checks
```

### Complex vs Simple Examples
```
Is this a multi-step tutorial?
├─ YES: Break into multiple functions/snippets
│      Create separate test cases for each step
├─ NO:  Single function with one or two snippets
│      Single test case with comprehensive validation
```

## Error Handling Patterns

### Common Issues and Solutions

**Import Errors:**
```
Error: Cannot resolve module './examples/topic'
Solution: Ensure directory structure matches import path exactly
```

**Test Type Mismatches:**
```
Error: outputMatchesExampleOutput expects array but got object
Solution: Ensure example function returns data in expected format
```

**Connection Failures:**
```
Error: CONNECTION_STRING environment variable not set
Solution: Ensure .env file exists with CONNECTION_STRING variable
```

**Sample Data Missing:**
```
Expected: Test should skip gracefully
Solution: Verify describeWithSampleData is used for sample data requirements
```

## Quality Checklist

### Before Completing Migration
- [ ] Code runs without errors
- [ ] Tests run and either pass or skip appropriately
- [ ] Tests focus on documentation validation, not comprehensive coverage
- [ ] No connection error testing unless docs demonstrate error handling
- [ ] Bluehawk markup generates correct snippets
- [ ] Connection strings use environment variables
- [ ] Sample data requirements are handled gracefully
- [ ] Expected output files use appropriate ellipsis patterns
- [ ] Output files created only when docs show specific expected output
- [ ] Output matching utility used only when output files exist
- [ ] Variable fields are ignored in comparisons
- [ ] No hardcoded credentials or secrets
- [ ] Code follows JavaScript formatting standards
- [ ] Documentation integration completed with `npm run snip`

### Documentation Integration Checklist
- [ ] All literalinclude directives updated to reference tested snippets
- [ ] All inline code-block examples replaced with tested snippet references
- [ ] All include files with JavaScript code updated or replaced
- [ ] `:category:` option added to all literalinclude directives with appropriate values
- [ ] Additional directive options evaluated and kept, adjusted, or removed as needed
- [ ] Original file usage checked across entire source directory (all forms)
- [ ] Original files safely deleted (only if no other references)
- [ ] Include files safely deleted (only if contained just migrated code examples)
- [ ] Empty directories cleaned up after file deletion
- [ ] Output references updated to use tested output files
- [ ] All snippet file paths exist and are accessible (relative to the `source` directory)
- [ ] No broken links or missing file references remain
- [ ] No duplicate code examples remain in different forms

### File Structure Validation
```
code-example-tests/javascript/driver/
├── examples/[topic]/
│   ├── [example].js             ✓ Testable function with Bluehawk
│   └── [example]-output.sh      ✓ Expected output (if shown in docs)
└── tests/[topic]/
    └── [topic].test.js          ✓ Comprehensive test coverage

content/code-examples/tested/javascript/driver/[topic]/
├── [example].snippet.[name].js  ✓ Generated by Bluehawk
└── [example]-output.sh          ✓ Copied by Bluehawk
```

## 🚨 Failure Scenarios & Responses

### Sample Data Issues

**Standard MongoDB Sample Data Missing**
- **DETECTION**: `describeWithSampleData()` automatically skips, no sample databases found
- **ACTION**: SKIP with documentation, continue migration
- **STEPS**:
  - Log: "Skipping example due to missing sample data: [database_names]"
  - Add comment in test: `// Test skipped - requires sample data: sample_mflix`
  - Test skips gracefully with automated skip message

**Custom Sample Data Required**
- **DETECTION**: Examples reference non-standard collections (users, orders, inventory)
- **ACTION**: CREATE minimal test data
- **EXAMPLE**:
```javascript
beforeEach(async () => {
  const db = client.db('test_database');
  const collection = db.collection('testcoll');
  const testData = [
    {
      name: 'Test Item',
      price: 29.99,
      test_marker: 'automated_example_data'
    }
  ];
  await collection.insertMany(testData);
});
```

**Complex Related Data**
- **DETECTION**: Multi-collection relationships, business logic dependencies
- **ACTION**: ESCALATE with analysis
- **LOG**: "Complex data relationships detected across [N] collections - need guidance"
- **ASK**: "Should I create simplified test data or flag for manual setup?"

### Runtime & Module Issues

**Runtime Errors**
- **ACTION**: ESCALATE immediately
- **PROVIDE**: Exact error message, file location, failing code snippet
- **ASK**: "Runtime error occurred: [error]. Should I attempt common fixes or need human review?"

**Module Loading Failures**
- **ACTION**: LOG and create simplified version
- **STEPS**: Capture import error, create basic connectivity test, flag for review
- **LOG**: "Module loading failure detected, created basic connectivity test instead"

**Tests Pass But Output Doesn't Match**
- **ACTION**: ANALYZE and adapt
- **CHECK**: Ignored fields (add to ignoreFieldValues), ellipsis patterns, structural differences
- **ESCALATE**: If structural differences found with comparison details

### File System & Structure Issues

**Referenced Files Don't Exist**
- **ACTION**: SEARCH and adapt
- **STEPS**: Look in same directory/version, check for file moves, document changes
- **ESCALATE**: If no alternatives found: "Referenced file missing: [path]"

**Complex Nested Includes**
- **ACTION**: SIMPLIFY and document
- **STEPS**: Extract JavaScript code only, flatten structure, preserve non-JavaScript content
- **DOCUMENT**: "Simplified from complex nested structure"

### Environment & Connection Issues

**Missing Environment Variables**
- **ACTION**: ADAPT with placeholders
- **CREATE**: Example with placeholder values, graceful test skipping
- **LOG**: "Environment variables missing, test will skip in incomplete environments"

**Connection Failures**
- **ACTION**: RETRY with degraded functionality
- **STEPS**: Retry 3x with backoff, create gracefully skipping test
- **LOG**: "Connection issues detected, test will skip automatically in CI"

**MongoDB Version Incompatibility**
- **ACTION**: VERSION-AWARE adaptation
- **STEPS**: Check version requirements, create conditional tests, document requirements
- **ESCALATE**: If example requires unavailable features

### Decision Matrix

| Scenario | Skip | Log | Escalate | Retry |
|----------|------|-----|----------|--------|
| Standard sample data missing | ✅ | ✅ | | |
| Custom data needed | | ✅ | Complex cases | |
| Runtime errors | | ✅ | ✅ | |
| Module failures | | ✅ | Complex cases | |
| Connection issues | | ✅ | Persistent failures | ✅ (3x) |
| File not found | | ✅ | No alternatives | |
| Version conflicts | | ✅ | ✅ | |

**SKIP when**: External dependencies unavailable, non-functional by design
**LOG when**: Making adaptations, encountering recoverable errors
**ESCALATE when**: Runtime errors, structural decisions, version issues
**RETRY when**: Network issues, temporary constraints, race conditions

## Advanced Patterns

### Multi-Step Operations
For complex tutorials requiring multiple operations:

```javascript
// setupData prepares test data - separate function
export async function setupMovieData() {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);

    try {
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        // For sample data modifications, use identifiable markers:
        await collection.insertOne({
            title: 'Test Movie',
            test_marker: 'cleanup_needed', // Identifiable marker for cleanup
            test_run_id: Date.now() // Unique per test run
        });
    } finally {
        await client.close();
    }
}

// runExample demonstrates the main operation
export async function runMovieExample() {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);

    try {
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        const result = await collection.find({ title: /Back to/ }).toArray();
        return result;
    } finally {
        await client.close();
    }
}

// In test:
describe('Complex Movie Example', () => {
  let client;

  beforeEach(async () => {
    // Setup test data
    await setupMovieData();
  });

  afterEach(async () => {
    // Cleanup is handled by removing test_marker documents
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    await client.connect();

    try {
      const db = client.db('sample_mflix');
      const collection = db.collection('movies');

      // Remove any documents added during test
      await collection.deleteMany({ test_marker: 'cleanup_needed' });
    } finally {
      await client.close();
    }
  });

  it('should process movies correctly', async () => {
    const result = await runMovieExample();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
```

### Sample Data Modification Patterns
When examples modify sample databases, use identifiable markers for cleanup:

```javascript
// In example function - mark any data you add/modify:
export async function addMovieExample() {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);

    try {
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        const newDocument = {
            title: 'New Movie',
            test_run_id: Date.now(),        // Unique per test run
            added_by_test: true             // Cleanup marker
        };

        const result = await collection.insertOne(newDocument);
        return result;
    } finally {
        await client.close();
    }
}

// In test cleanup:
afterEach(async () => {
    if (client) {
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        // Remove any documents added during test
        await collection.deleteMany({ added_by_test: true });

        // Revert any field modifications
        await collection.updateMany(
            { modified_by_test: true },
            { $unset: { modified_by_test: 1, temp_field: 1 } }
        );
    }
});
```

### Custom Data Models
When working with specific data structures:

```javascript
// Define models in separate section or file
const movieSchema = {
    _id: ObjectId,
    title: String,
    year: Number,
    genres: [String]
};

// Use structured comparison
const outputMatches = outputMatchesExampleOutput(outputFilePath, result, {
    comparisonType: 'unordered',
    ignoreFieldValues: ['_id'] // Only for fields with variable values
});
```

## 🎪 Critical Reminders

**When in Doubt:**
1. **PRESERVE functionality** over perfection
2. **DOCUMENT decisions** in logs and comments
3. **ESCALATE complex scenarios** rather than guess
4. **SKIP gracefully** rather than break the pipeline
5. **TEST everything** before declaring success

**Key Patterns to Remember:**
- Use `process.env.CONNECTION_STRING` in examples, show `"<connection string URI>"` in docs
- Ellipsis in output.txt OR ignoreFieldValues (never both for same field)
- MongoDB sample data: revert changes, don't drop databases
- Custom data: drop custom DB, or if adding custom data to MongoDB sample data, use test_marker fields for cleanup

This framework ensures consistent, reliable automation while providing clear escalation paths for complex scenarios.
