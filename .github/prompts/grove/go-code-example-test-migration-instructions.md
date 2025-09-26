# AI Agent Instructions: Automated Golang Code Example Migration

## 🎯 Quick Decision Framework (READ FIRST)

**When You Encounter Issues:**
- **Sample data missing** → SKIP with documentation, continue migration
- **Compilation errors** → ESCALATE immediately with error details
- **Runtime failures** → LOG details, create simplified version
- **File not found** → SEARCH for alternatives, escalate if none found
- **Complex custom data** → CREATE minimal test data or ESCALATE
- **Connection issues** → RETRY 3x, then skip gracefully

**Key Success Criteria:**
✅ Code compiles and runs
✅ Tests pass or skip gracefully
✅ Documentation references updated
✅ Original files safely deleted
✅ Bluehawk markup generates correct snippets

---

## Overview

This document provides step-by-step instructions for AI agents to automate the
migration of hard-coded, untested Go code examples from documentation into a
proper test environment. This ensures code examples remain accurate, testable,
and maintainable.

## Prerequisites

Before starting, ensure you understand:
1. **Monorepo structure** from `.github/copilot-instructions.md`
2. **Existing test patterns** in `code-example-tests/go/driver`
3. **Bluehawk markup syntax** for documentation integration
4. **MongoDB Go driver v2 patterns** and environment handling

## 📋 5-Phase Migration Process

### Phase 1: 🔍 Discovery & Analysis
**GOAL**: Find all Go code examples in documentation

#### 1.1 Read Repository Documentation
```bash
# Always start by understanding the monorepo
read_file(".github/copilot-instructions.md")
```

**Key Points:**
- `content/` contains documentation projects (versioned and non-versioned)
- `code-example-tests/go/driver/` contains the test infrastructure
- **Version isolation**: Each version's `source/` directory is self-contained
- Follow the existing patterns for examples, tests, and utils

#### 1.2 Analyze Documentation Page
```bash
# Examine the documentation page for Go file references
read_file("content/golang/current/source/[TARGET_PAGE].txt")
```

**Look for all forms of Go code examples:**
1. **Direct file references**: `.. literalinclude::` directives referencing Go files
2. **Inline code blocks**: `.. code-block:: go` containing hardcoded Go code
3. **Include files**: `.. include::` directives that may contain:
   - Direct `.. code-block:: go` sections with hardcoded code
   - Nested `.. literalinclude::` directives referencing Go files
4. **Expected output sections**: Code blocks showing JSON or text output
5. **Sample data requirements**: References to sample databases or datasets

**Analysis Strategy:**
```bash
# Find all literalinclude references to Go files
grep -r "literalinclude.*\.go" content/golang/current/source/

# Find all Go code blocks with potentially hardcoded examples
grep -r "code-block:: go" content/golang/current/source/

# Find all include directives that might contain Go code
grep -r ".. include::" content/golang/current/source/

# Check included files for Go code
grep -r "code-block:: go\|literalinclude.*\.go" content/golang/current/source/includes/
```

**Important**: Determine if you're working with:
- **Versioned project**: `content/golang/current/source/` (scope to this version only)
- **Non-versioned project**: `content/atlas/source/` (scope to project root)

#### 1.3 Locate and Categorize Code Examples

**Examine all discovered Go code examples and categorize them:**

**Type 1: Referenced Go Files**
```bash
# Find all Go files referenced in literalinclude directives
glob_file_search("content/golang/current/source/**/[REFERENCED_FILE].go")
```

**Type 2: Inline Code Blocks**
```bash
# Examine inline code blocks in documentation files
grep -A 20 -B 5 "code-block:: go" content/golang/current/source/[PAGE].txt
```

**Type 3: Included Files with Go Code**
```bash
# Check include files for Go code examples
grep -l "code-block:: go\|literalinclude.*\.go" content/golang/current/source/includes/*.rst
```

**Examine each discovered code example for:**
- **Standalone `main()` functions** (need conversion to testable functions)
- **Hard-coded connection strings** (need environment variable replacement)
- **Sample data dependencies** (need sample data handling)
- **Inline hardcoded examples** (need extraction to testable files)
- **Expected outputs** shown in documentation

### Phase 2: ⚡ Code Migration
**GOAL**: Convert to testable functions with Bluehawk markup

#### 2.1 Create Example Directory Structure
```bash
# Create organized directory structure
mkdir -p code-example-tests/go/driver/examples/[TOPIC]/
mkdir -p code-example-tests/go/driver/tests/[TOPIC]/
```

**Naming Convention:**
- Use kebab-case for directories: `quick-start`, `crud-operations`
- Group related concepts: `aggregation/pipelines`, `search/text`
- Avoid matching specific docs project structure

#### 2.2 Convert Code to Testable Functions

**Transform Pattern:**
```go
// FROM: Standalone main() function
package main

import (
    "context"
    "os"
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
    uri := os.Getenv("MONGODB_URI")
    client, err := mongo.Connect(options.Client().ApplyURI(uri))
    // ... rest of code
}

// TO: Testable function with proper package
package [topicname]

import (
    "context"
    "driver-examples/utils"
    "go.mongodb.org/mongo-driver/v2/bson"
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func [ExampleName]() []bson.M { // or []YourStructType
    // Use utils.GetConnectionString() instead of os.Getenv
    uri := utils.GetConnectionString()
    if uri == "" {
        log.Fatal("set your 'CONNECTION_STRING' environment variable")
    }

    client, err := mongo.Connect(options.Client().ApplyURI(uri))
    // ... implementation

    // Return meaningful data for test validation
    return results
}
```

#### 2.3 Add Bluehawk Markup

**File-Level Replacements (Optional):**
If you need to apply replacements across the entire file, define them at the top and close at the end:

```go
// :replace-start: {
//    "terms": {
//       "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")",
//       "driver-examples/utils": ""
//    }
// }
package quickstart

import (
    "context"
    "log"
    "driver-examples/utils"
    // ... other imports
)

func QuickStartExample() []bson.M {
    uri := utils.GetConnectionString()
    // ... rest of file content
}
// :replace-end:
```

**Snippet-Level Markup Patterns:**

```go
// :snippet-start: connection-setup
uri := utils.GetConnectionString()
if uri == "" {
    log.Fatal("Set your 'MONGODB_URI' environment variable. " +
        "See: " + docs +
        "usage-examples/#environment-variable")
}
client, err := mongo.Connect(options.Client().ApplyURI(uri))
// ... connection code
// :snippet-end:

// :snippet-start: database-operation
// :replace-start: {
//    "terms": {
//       "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")"
//    }
// }
collection := client.Database("sample_db").Collection("collection")
result, err := collection.FindOne(ctx, filter)
// :replace-end:
// :snippet-end:

// Code outside snippets that won't appear in docs
someTestSetupFunction()

// :snippet-start: results-processing
// :remove-start:
// Test-specific logging that shouldn't appear in documentation
log.Printf("Debug info: %v", result)
// :remove-end:

// Process results for display
jsonData, err := json.MarshalIndent(result, "", "    ")
// :snippet-end:
```

**Critical Bluehawk Rules:**
- **File-level replacements**: Define once at top, close at end of file
- **Snippet-level operations**: Only use `:remove:` or `:replace:` tags INSIDE snippet blocks (between `:snippet-start:` and `:snippet-end:`)
- **Tag closing order**: Always close inner blocks before outer blocks:
  ```go
  // :snippet-start: example
  // :remove-start:
  // content to remove
  // :remove-end:    ← Close inner block first
  // :snippet-end:   ← Then close outer block
  ```
- **`:snippet-start:`/`:snippet-end:`**: Mark code sections for documentation
- **`:replace-start:`/`:replace-end:`**: Replace internal utilities with public APIs
- **`:remove-start:`/`:remove-end:`**: Exclude test-specific code from docs

### Phase 3: 🧪 Test Implementation
**GOAL**: Create comprehensive tests with proper setup/cleanup

#### 3.1 Create Test File Structure

**Template for new test file:**
```go
package [topic]

import (
    "context"
    "testing"

    "[topic]" "driver-examples/examples/[topic]"
    "driver-examples/utils"
    "driver-examples/utils/compare"

    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func setupTestDB(t *testing.T) (*mongo.Client, func()) {
    t.Helper()
    ctx := context.Background()

    uri := utils.GetConnectionString()
    if uri == "" {
        t.Fatal("set your 'CONNECTION_STRING' environment variable")
    }

    clientOptions := options.Client().ApplyURI(uri)
    client, err := mongo.Connect(clientOptions)
    if err != nil {
        t.Fatalf("failed to connect to the server: %v", err)
    }

    cleanup := func() {
        // SAMPLE DATA TESTS: Don't drop sample databases, but revert any modifications
        // Example: If test inserted documents into sample_mflix.movies
        // sampleDB := client.Database("sample_mflix")
        // sampleCollection := sampleDB.Collection("movies")
        //
        // Delete any documents inserted during test (use unique identifiers):
        // _, err := sampleCollection.DeleteMany(ctx, bson.D{{"test_marker", "test_run_123"}})
        // if err != nil {
        //     t.Logf("failed to clean up test documents: %v", err)
        // }
        //
        // Update any modified documents back to original state:
        // _, err = sampleCollection.UpdateMany(ctx,
        //     bson.D{{"modified_by_test", true}},
        //     bson.D{{"$unset", bson.D{{"modified_by_test", 1}, {"temp_field", 1}}}})
        //
        // CUSTOM DATA TESTS: Drop the entire test database
        // db := client.Database("[test_db_name]")
        // if err := db.Drop(ctx); err != nil {
        //     t.Logf("failed to drop database: %v", err)
        // }

        if err := client.Disconnect(ctx); err != nil {
            t.Logf("failed to disconnect client: %v", err)
        }
    }

    return client, cleanup
}

func Test[TopicName](t *testing.T) {
    tests := []struct {
        name     string
        testFunc func(t *testing.T)
    }{
        {"[ExampleName]", test[ExampleName]},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, cleanup := setupTestDB(t)
            defer cleanup()
            tt.testFunc(t)
        })
    }
}

func test[ExampleName](t *testing.T) {
    t.Helper()

    // Add sample data requirements if needed
    utils.RequiresSampleData(t, "sample_mflix")

    result := [topic].[ExampleName]()
    expectedOutputFilepath := "examples/[topic]/output.txt"

    // Choose appropriate comparison options based on your output file content:
    comparisonOptions := &compare.Options{
        ComparisonType: "unordered", // or "ordered" for sorted results
        // Only use IgnoreFieldValues for fields that show ACTUAL values in output.txt
        // that won't match test runs (timestamps, UUIDs shown as real values)
        // DON'T use IgnoreFieldValues for fields that already use "..." in output.txt
        IgnoreFieldValues: []string{"createdAt", "sessionId"}, // Only if output shows real values
    }

    comparisonResult := compare.StructDocuments(expectedOutputFilepath, result, comparisonOptions)

    if !comparisonResult.IsMatch {
        t.Errorf("Results do not match expected output: %s", comparisonResult.Error())

        for _, err := range comparisonResult.Errors {
            t.Errorf("  Path: %s, Expected: %s, Actual: %s, Message: %s",
                err.Path, err.Expected, err.Actual, err.Message)
        }
    }
}
```

#### 3.2 Handle Sample Data Requirements

**Sample Data Detection Patterns:**

```go
// For basic sample database requirements:
utils.RequiresSampleData(t, "sample_mflix")

// For specific collection requirements:
requiredCollections := map[string][]string{
    "sample_mflix": {"movies", "theaters"},
    "sample_restaurants": {"restaurants"},
}
utils.RequiresSampleDataWithCollections(t, requiredCollections)
```

**Common Sample Databases:**
- `sample_mflix`: Movies and theaters data
- `sample_restaurants`: Restaurant location data
- `sample_training`: Training and educational data
- `sample_analytics`: Financial data
- `sample_airbnb`: Airbnb listing data

#### 3.3 Create Expected Output Files

**Output File Guidelines:**
```json
[
  {
    "_id": "...",                    // Use ellipsis for variable fields
    "title": "Expected Title",      // Exact values for important fields
    "plot": "Beginning of plot...", // Ellipsis for truncated strings
    "year": 1985,                   // Exact values for numbers
    "genres": ["Action", "Comedy"], // Exact arrays when order doesn't matter
    "metadata": "..."               // Ellipsis for unimportant nested objects
  }
]
...                                 // Ellipsis for additional documents
```

**Ellipsis Patterns:**
- `"field": "..."` - Match any value for this field
- `"text": "Start of text..."` - Match text starting with this prefix
- Standalone `...` - Match any additional fields/documents

**Critical: Ellipsis vs IgnoreFieldValues**

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

```go
// test file - No IgnoreFieldValues needed!
comparisonResult := compare.BsonDocuments(expectedOutputFilepath, result, &compare.Options{
    ComparisonType: "unordered",
    // Ellipsis in output.txt handles variable fields automatically
})
```

**Use IgnoreFieldValues (Only when necessary):**
When documentation must show realistic values but they vary between test runs:

```json
// output.txt - Shows real values for better documentation
{
  "_id": "507f1f77bcf86cd799439011",    // Real ObjectId shown in docs
  "createdAt": "2023-10-15T14:30:22Z",  // Real timestamp shown in docs
  "title": "Back to the Future"
}
```

```go
// test file - Must use IgnoreFieldValues for fields with real values
comparisonResult := compare.BsonDocuments(expectedOutputFilepath, result, &compare.Options{
    ComparisonType:    "unordered",
    IgnoreFieldValues: []string{"_id", "createdAt"}, // Only for fields with real values
})
```

**Common Mistake to Avoid:**
Never use both ellipsis AND IgnoreFieldValues for the same field:
- ❌ Bad: `"_id": "..."` in output.txt AND `IgnoreFieldValues: []string{"_id"}`
- ✅ Good: Either ellipsis OR IgnoreFieldValues, not both

### Phase 4: ✅ Validation & Generation
**GOAL**: Verify implementation and generate documentation snippets

#### 4.1 Verify Implementation

**Compilation Check:**
```bash
cd code-example-tests/go/driver
go build ./examples/[topic]
```

**Formatting:**
```bash
go fmt ./examples/[topic]/...
go fmt ./tests/[topic]/...
```

**Test Execution:**
```bash
go test -v ./tests/[topic]/...
```

#### 4.2 Generate Documentation Snippets

```bash
# Run Bluehawk to generate documentation files
node snip.js
```

**Verify Generated Files:**
- Check `content/code-examples/tested/go/driver/[topic]/` for generated snippets
- Ensure snippets have proper names and formatting
- Validate that replacements work correctly

#### 4.3 Integration Testing

```bash
# Run all tests to ensure no regressions
go test -v -p 1 ./tests/...
```

### Phase 5: 📝 Documentation Integration & Cleanup
**GOAL**: Update references and clean up original files

#### 5.1 Update Documentation References

**Replace All Forms of Go Code Examples:**

**Type 1: Replace literalinclude Directives**
Original documentation references files:
```rst
.. literalinclude:: /includes/quick-start/main.go
   :language: go
```

Replace with tested snippets (note: add `:category:` and evaluate any other directive options):
```rst
.. literalinclude:: /code-examples/tested/go/driver/quick-start/main.snippet.connect-to-mongodb.go
   :language: go
   :category: usage example

.. literalinclude:: /code-examples/tested/go/driver/quick-start/main.snippet.find-document.go
   :language: go
   :category: usage example
```

**Type 2: Replace Inline Code Blocks**
Original hardcoded examples:
```rst
.. code-block:: go

   package main

   import (
       "context"
       "os"
       "go.mongodb.org/mongo-driver/v2/mongo"
   )

   func main() {
       uri := os.Getenv("MONGODB_URI")
       client, err := mongo.Connect(options.Client().ApplyURI(uri))
       // ... rest of hardcoded example
   }
```

Replace with tested snippet references:
```rst
.. literalinclude:: /code-examples/tested/go/driver/quick-start/main.snippet.connect-to-mongodb.go
   :language: go
   :category: usage example
```

**Type 3: Update Include Files**
If include files contain Go code examples, update them following the same patterns above.

**Update Process:**
1. **Find all forms of Go code** in the documentation page (literalinclude, code-block, include)
2. **Replace each with appropriate tested snippet references**
3. **Add `:category:` option** following [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/)
4. **Consider other directive options** May need to remove or adjust directive options depending on changes made during migration
5. **Verify snippet names** match the generated Bluehawk output
6. **Extract inline code** to testable examples first if needed
7. **Update include files** that contain Go code examples

**Category Guidelines:**
Based on the [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/):
- **Go code examples that show real-world usage patterns**: Use `:category: usage example`
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

#### 5.2 Check for File Reuse

Before deleting original files, verify they're not used elsewhere within the same version:

**Understanding Documentation Structure:**
- **Versioned projects** (e.g., `content/golang/`): Each version directory (`current`, `v1.12`, etc.) contains its own `source` directory
- **Non-versioned projects** (e.g., `content/atlas/`): `source` directory is at the project root
- **Version isolation**: Files in `current/source/includes/` are completely separate from `v1.12/source/includes/`
- **Build scope**: Each version's `source` directory is self-contained for that build

**Search for File Usage (Properly Scoped):**
```bash
# For versioned projects - search only within the specific version's source directory
grep -r "includes/quick-start/main.go" content/golang/current/source/

# For non-versioned projects - search within the project's source directory
grep -r "includes/quick-start/main.go" content/atlas/source/

# More comprehensive search patterns within the version scope
grep -r "quick-start/main" content/golang/current/source/
grep -r "main.go" content/golang/current/source/

# Search for include files that might contain Go code examples
grep -r "includes/quick-start" content/golang/current/source/
```

**Search for Code Block and Include Usage:**
```bash
# Find any hardcoded Go code that matches your examples
grep -A 10 -B 5 "code-block:: go" content/golang/current/source/ | grep -A 15 "package main"

# Find include directives that reference files you're replacing
grep -r "include.*quick-start" content/golang/current/source/
```

**Analysis Rules (Corrected Scope):**
- **Single use**: If file only appears in the documentation page you're updating within the same version → Safe to delete
- **Multiple uses**: If file appears in other pages within the same version → Keep file, update references individually
- **Cross-version impact**: Files with same name in other versions are separate - no coordination needed

#### 5.3 Clean Up Original Files

**Safe Deletion Criteria:**
Only delete original files when ALL conditions are met:
- [ ] File is only referenced via `literalinclude` or `include` in pages you're updating
- [ ] No other `.txt` or `.rst` files in the same version's `source` directory reference it
- [ ] No inline `code-block` sections duplicate the file's content (indicating shared usage)
- [ ] New tested examples are working and validated
- [ ] You have confirmed the correct version scope for your search

**Additional Checks for Include Files:**
- [ ] Include file (`.rst`) is only used by pages you're updating
- [ ] Include file doesn't contain shared content beyond the Go code examples
- [ ] No other documentation pages include the `.rst` file

**Deletion Process:**
```bash
# Verify no remaining references to files after documentation updates
grep -r "quick-start/main.go" content/golang/current/source/
grep -r "includes/quick-start" content/golang/current/source/

# Verify no remaining references to include files
grep -r "quick-start.*\.rst" content/golang/current/source/

# If no results found within the version scope, safe to delete
rm content/golang/current/source/includes/quick-start/main.go

# Delete include files only if they contained only the code examples you migrated
rm content/golang/current/source/includes/quick-start/code-example.rst

# If directory becomes empty, remove it too
rmdir content/golang/current/source/includes/quick-start/
```

#### 5.4 Update Output References

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
.. literalinclude:: /code-examples/tested/go/driver/quick-start/output.txt
   :language: json
   :category: example return object
```

#### 5.5 Verification Steps

**Post-Integration Checklist:**
- [ ] All literalinclude references resolve correctly
- [ ] Output examples match expected format
- [ ] Original files deleted only if no other references exist

**Validation Commands:**
```bash
# Verify all new file paths exist
ls -la content/code-examples/tested/go/driver/quick-start/

# Check for any remaining references to deleted files (within version scope)
find content/golang/current/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/main.go"

# For non-versioned projects:
find content/atlas/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/main.go"
```

#### 5.6 Handle Edge Cases

**Working with Versioned vs Non-Versioned Projects:**

**Versioned Projects** (e.g., `content/golang/`, `content/node/`):
```bash
# Work within specific version scope - each version is isolated
grep -r "quick-start/main.go" content/golang/current/source/
# Other versions (v1.12, v1.13, upcoming) are separate and unaffected
```

**Non-Versioned Projects** (e.g., `content/atlas/`, `content/manual/`):
```bash
# Work within project's source directory
grep -r "quick-start/main.go" content/atlas/source/
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

#### 5.7 Complete Example: QuickStart Migration

**Original Documentation (content/golang/current/source/get-started.txt):**
```rst
.. literalinclude:: /includes/quick-start/main.go
   :language: go
   :dedent:

.. include:: /includes/quick-start/query-output.rst
```

**Additional scenarios you might encounter:**
```rst
.. code-block:: go

   package main

   import (
       "context"
       "os"
   )

   func main() {
       uri := os.Getenv("MONGODB_URI")
       // ... hardcoded example
   }

.. include:: /includes/quick-start/setup-instructions.rst
```

**Step 1: Update All References**
```rst
.. literalinclude:: /code-examples/tested/go/driver/quick-start/main.snippet.connect-to-mongodb.go
   :language: go
   :category: usage example

.. literalinclude:: /code-examples/tested/go/driver/quick-start/main.snippet.find-document.go
   :language: go
   :category: usage example

.. literalinclude:: /code-examples/tested/go/driver/quick-start/output.txt
   :language: json
   :category: example return object
```

**Step 2: Check All Usage Types**
```bash
# Check if original files are used elsewhere
grep -r "includes/quick-start/main.go" content/golang/current/source/
grep -r "includes/quick-start/query-output.rst" content/golang/current/source/

# Check for any hardcoded examples that might duplicate the file content
grep -A 20 "code-block:: go" content/golang/current/source/ | grep -A 15 "package main"

# Check for include directives referencing files with Go code
grep -r "include.*quick-start" content/golang/current/source/
```

**Step 3: Safe Cleanup (if no other references found)**
```bash
# Remove original files
rm content/golang/current/source/includes/quick-start/main.go
rm content/golang/current/source/includes/quick-start/query-output.rst

# Remove empty directory
rmdir content/golang/current/source/includes/quick-start/
```

**Step 4: Verify Integration**
```bash
# Confirm all new files exist
ls -la content/code-examples/tested/go/driver/quick-start/
# Should show: main.snippet.connect-to-mongodb.go, main.snippet.find-document.go, output.txt

# Verify no remaining references to deleted files (within version scope only)
find content/golang/current/source/ -name "*.txt" -o -name "*.rst" | \
  xargs grep -l "includes/quick-start"
# Should return no results within this version's source directory
```

## Decision Tree for Common Scenarios

### Connection String Handling
- **Use `utils.GetConnectionString()`** in example functions
- **Use Bluehawk replace** to show `os.Getenv("MONGODB_URI")` in docs
- **Never hardcode** connection strings

### Sample Data vs Custom Data
```
Does the example use sample_* databases?
├─ YES: Use utils.RequiresSampleData(t, "database_name")
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
Error: cannot find package "driver-examples/examples/topic"
Solution: Ensure directory structure matches import path exactly
```

**Test Type Mismatches:**
```
Error: cannot use []bson.M as []bson.D
Solution: Use compare.StructDocuments for bson.M, BsonDocuments for bson.D
```

**Connection Failures:**
```
Error: connection string not found
Solution: Ensure .env file exists with CONNECTION_STRING variable
```

**Sample Data Missing:**
```
Expected: Test should skip gracefully
Solution: Verify RequiresSampleData is called before test logic
```

## Quality Checklist

### Before Completing Migration
- [ ] Code compiles without errors
- [ ] Tests run and either pass or skip appropriately
- [ ] Bluehawk markup generates correct snippets
- [ ] Connection strings use environment variables
- [ ] Sample data requirements are handled gracefully
- [ ] Expected output files use appropriate ellipsis patterns
- [ ] Variable fields are ignored in comparisons
- [ ] No hardcoded credentials or secrets
- [ ] Code follows Go formatting standards
- [ ] Documentation integration completed with `node snip.js`

### Documentation Integration Checklist
- [ ] All literalinclude directives updated to reference tested snippets
- [ ] All inline code-block examples replaced with tested snippet references
- [ ] All include files with Go code updated or replaced
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
code-example-tests/go/driver/
├── examples/[topic]/
│   ├── [example].go          ✓ Testable function with Bluehawk
│   └── output.txt           ✓ Expected output (if shown in docs)
└── tests/[topic]/
    └── [topic]_test.go      ✓ Comprehensive test coverage

content/code-examples/tested/go/driver/[topic]/
├── [example].snippet.[name].go  ✓ Generated by Bluehawk
└── output.txt                   ✓ Copied by Bluehawk
```

## 🚨 Failure Scenarios & Responses

### Sample Data Issues

**Standard MongoDB Sample Data Missing**
- **DETECTION**: `RequiresSampleData()` fails, no sample databases found
- **ACTION**: SKIP with documentation, continue migration
- **STEPS**:
  - Log: "Skipping example due to missing sample data: [database_names]"
  - Add comment in test: `// Test skipped - requires sample data: sample_mflix`
  - Test skips gracefully with `t.Skip()`

**Custom Sample Data Required**
- **DETECTION**: Examples reference non-standard collections (users, orders, inventory)
- **ACTION**: CREATE minimal test data
- **EXAMPLE**:
```go
func setupCustomData(client *mongo.Client, dbName string) {
    collection := client.Database(dbName).Collection("testcoll")
    testData := []interface{}{
        bson.D{
            {Key: "name", Value: "Test Item"},
            {Key: "price", Value: 29.99},
            {Key: "test_marker", Value: "automated_example_data"},
        },
    }
    collection.InsertMany(ctx, testData)
}
```

**Complex Related Data**
- **DETECTION**: Multi-collection relationships, business logic dependencies
- **ACTION**: ESCALATE with analysis
- **LOG**: "Complex data relationships detected across [N] collections - need guidance"
- **ASK**: "Should I create simplified test data or flag for manual setup?"

### Compilation & Runtime Issues

**Compilation Errors**
- **ACTION**: ESCALATE immediately
- **PROVIDE**: Exact error message, file location, failing code snippet
- **ASK**: "Compilation failed: [error]. Should I attempt common fixes or need human review?"

**Runtime Panics/Crashes**
- **ACTION**: LOG and create simplified version
- **STEPS**: Capture stack trace, create basic connectivity test, flag for review
- **LOG**: "Runtime failure detected, created basic connectivity test instead"

**Tests Pass But Output Doesn't Match**
- **ACTION**: ANALYZE and adapt
- **CHECK**: Ignored fields (add to IgnoreFieldValues), ellipsis patterns, structural differences
- **ESCALATE**: If structural differences found with comparison details

### File System & Structure Issues

**Referenced Files Don't Exist**
- **ACTION**: SEARCH and adapt
- **STEPS**: Look in same directory/version, check for file moves, document changes
- **ESCALATE**: If no alternatives found: "Referenced file missing: [path]"

**Complex Nested Includes**
- **ACTION**: SIMPLIFY and document
- **STEPS**: Extract Go code only, flatten structure, preserve non-Go content
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
| Compilation errors | | ✅ | ✅ | |
| Runtime failures | | ✅ | Complex cases | |
| Connection issues | | ✅ | Persistent failures | ✅ (3x) |
| File not found | | ✅ | No alternatives | |
| Version conflicts | | ✅ | ✅ | |

**SKIP when**: External dependencies unavailable, non-functional by design
**LOG when**: Making adaptations, encountering recoverable errors
**ESCALATE when**: Compilation errors, structural decisions, version issues
**RETRY when**: Network issues, temporary constraints, race conditions

## Advanced Patterns

### Multi-Step Operations
For complex tutorials requiring multiple operations:

```go
// LoadData prepares test data - separate function
func LoadData() {
    // Data setup logic
    // For sample data modifications, use identifiable markers:
    collection.InsertOne(ctx, bson.D{
        {Key: "title", Value: "Test Movie"},
        {Key: "test_marker", Value: "cleanup_needed"}, // Identifiable marker for cleanup
    })
}

// RunExample demonstrates the main operation
func RunExample() []bson.M {
    // Main operation logic
}

// In test:
func testComplexExample(t *testing.T) {
    t.Helper()

    // If using sample data that will be modified, track changes for cleanup
    originalState := captureOriginalState() // Optional: capture state before changes

    [topic].LoadData()  // Setup - may modify sample data
    result := [topic].RunExample()  // Main operation

    // Cleanup is handled automatically by setupTestDB cleanup function
    // which should revert sample data modifications using test_marker fields

    // Validation logic
    validateResults(t, result, originalState)
}
```

### Sample Data Modification Patterns
When examples modify sample databases, use identifiable markers for cleanup:

```go
// In example function - mark any data you add/modify:
newDocument := bson.D{
    {Key: "title", Value: "New Movie"},
    {Key: "test_run_id", Value: generateTestID()}, // Unique per test run
    {Key: "added_by_test", Value: true},           // Cleanup marker
}

// In test cleanup function:
func cleanup() {
    // Remove any documents added during test
    _, err := collection.DeleteMany(ctx, bson.D{{"added_by_test", true}})

    // Revert any field modifications
    _, err = collection.UpdateMany(ctx,
        bson.D{{"modified_by_test", true}},
        bson.D{{"$unset", bson.D{{"modified_by_test", 1}, {"temp_field", 1}}}})
}
```

### Custom Data Models
When using structs instead of bson.M:

```go
// Define models in separate file: models.go
type Movie struct {
    ID    primitive.ObjectID `bson:"_id"`
    Title string            `bson:"title"`
    Year  int               `bson:"year"`
}

// Use StructDocuments for comparison
comparisonResult := compare.StructDocuments(expectedOutputFilepath, result, options)
```

## 🎪 Critical Reminders

**When in Doubt:**
1. **PRESERVE functionality** over perfection
2. **DOCUMENT decisions** in logs and comments
3. **ESCALATE complex scenarios** rather than guess
4. **SKIP gracefully** rather than break the pipeline
5. **TEST everything** before declaring success

**Key Patterns to Remember:**
- Use `utils.GetConnectionString()` in examples, show `os.Getenv("MONGODB_URI")` in docs
- Ellipsis in output.txt OR IgnoreFieldValues (never both for same field)
- MongoDB sample data: revert changes, don't drop databases
- Custom data: drop custom DB, or if adding custom data to MongoDB sample data, use test_marker fields for cleanup

This framework ensures consistent, reliable automation while providing clear escalation paths for complex scenarios.
