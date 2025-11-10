# AI Agent Instructions: Automated C#/.NET Driver Code Example Migration

## 🎯 Quick Decision Framework (READ FIRST)

**When You Encounter Issues:**
- **Sample data missing** → SKIP with documentation, continue migration
- **Compilation errors** → ESCALATE immediately with error details
- **NuGet package issues** → LOG details, run `dotnet restore`
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
migration of hard-coded, untested C#/.NET Driver code examples from documentation into a
proper test environment. This ensures code examples remain accurate, testable,
and maintainable.

## Prerequisites

Before starting, ensure you understand:
1. **Monorepo structure** from `.github/copilot-instructions.md`
2. **Existing test patterns** in `code-example-tests/csharp/driver`
3. **Bluehawk markup syntax** for documentation integration
4. **MongoDB C#/.NET Driver patterns** and environment handling
5. **NUnit testing framework** and .NET project structure
6. **.NET CLI and NuGet package management**

## 📋 5-Phase Migration Process

### Phase 1: 🔍 Discovery & Analysis
**GOAL**: Find all C# code examples in documentation

#### 1.1 Read Repository Documentation
```bash
# Always start by understanding the monorepo
read_file(".github/copilot-instructions.md")
```

**Key Points:**
- `content/` contains documentation projects (versioned and non-versioned)
- `code-example-tests/csharp/driver/` contains the test infrastructure
- **Version isolation**: Each version's `source/` directory is self-contained
- Follow the existing patterns for examples, tests, and utils

#### 1.2 Analyze Documentation Page
```bash
# Examine the documentation page for C# file references
read_file("content/csharp/current/source/[TARGET_PAGE].txt")
```

**Look for all forms of C# code examples:**
1. **Direct file references**: `.. literalinclude::` directives referencing C# files
2. **Inline code blocks**: `.. code-block:: csharp` containing hardcoded C# code
3. **Include files**: `.. include::` directives that may contain:
   - Direct `.. code-block:: csharp` sections with hardcoded code
   - Nested `.. literalinclude::` directives referencing C# files
4. **Expected output sections**: Code blocks showing JSON or text output
5. **Sample data requirements**: References to sample databases or datasets

**Analysis Strategy:**
```bash
# Find all literalinclude references to C# files
grep -r "literalinclude.*\.cs" content/csharp/current/source/

# Find all C# code blocks with potentially hardcoded examples
grep -r "code-block:: csharp" content/csharp/current/source/

# Find all include directives that might contain C# code
grep -r ".. include::" content/csharp/current/source/

# Check included files for C# code
grep -r "code-block:: csharp\|literalinclude.*\.cs" content/csharp/current/source/includes/
```

**Important**: Determine if you're working with:
- **Versioned project**: `content/csharp/current/source/` (scope to this version only)
- **Non-versioned project**: `content/atlas/source/` (scope to project root)

#### 1.3 Locate and Categorize Code Examples

**Examine all discovered C# code examples and categorize them:**

**Type 1: Referenced C# Files**
```bash
# Find all C# files referenced in literalinclude directives
glob_file_search("content/csharp/current/source/**/[REFERENCED_FILE].cs")
```

**Type 2: Inline Code Blocks**
```bash
# Examine inline code blocks in documentation files
grep -A 20 -B 5 "code-block:: csharp" content/csharp/current/source/[PAGE].txt
```

**Type 3: Included Files with C# Code**
```bash
# Check include files for C# code examples
grep -l "code-block:: csharp\|literalinclude.*\.cs" content/csharp/current/source/includes/*.rst
```

**Examine each discovered code example for:**
- **Standalone `Main()` methods** (need conversion to testable methods)
- **Hard-coded connection strings** (need environment variable replacement)
- **Sample data dependencies** (need sample data handling)
- **Inline hardcoded examples** (need extraction to testable files)
- **Expected outputs** shown in documentation

### Phase 2: ⚡ Code Migration
**GOAL**: Convert to testable classes with Bluehawk markup

#### 2.1 Create Example Directory Structure
```bash
# Create organized directory structure in Examples/
mkdir -p code-example-tests/csharp/driver/Examples/[Topic]/
mkdir -p code-example-tests/csharp/driver/Tests/[Topic]/
```

**Naming Convention:**
- Use PascalCase for directories: `QuickStart`, `CrudOperations`
- Group related concepts: `Aggregation/Pipelines`, `Search/Text`
- Follow C# namespace conventions
- Avoid matching specific docs project structure

#### 2.2 Convert Code to Testable Classes

**Transform Pattern:**
```csharp
// FROM: Standalone Main() method
using MongoDB.Bson;
using MongoDB.Driver;

class Program
{
    static void Main(string[] args)
    {
        var connectionString = "mongodb://localhost:27017";
        var client = new MongoClient(connectionString);

        var database = client.GetDatabase("sample_mflix");
        var collection = database.GetCollection<BsonDocument>("movies");

        var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
        var result = collection.Find(filter).FirstOrDefault();

        Console.WriteLine(result?.ToJson());
    }
}

// TO: Testable class with proper structure
namespace Examples.QuickStart;

using MongoDB.Bson;
using MongoDB.Driver;

public class QuickStart
{
    public BsonDocument RunQuickStartExample()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(connectionString);

        try
        {
            var database = client.GetDatabase("sample_mflix");
            var collection = database.GetCollection<BsonDocument>("movies");

            var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
            var result = collection.Find(filter).FirstOrDefault();

            Console.WriteLine(result?.ToJson());
            return result; // Return for test validation
        }
        finally
        {
            client.Dispose();
        }
    }
}
```

#### 2.3 Add Bluehawk Markup

**File-Level Replacements (Optional):**
If you need to apply replacements across the entire file, define them at the top and close at the end:

```csharp
//	:replace-start: {
//	  "terms": {
//	    "DotNetEnv.Env.GetString(\"CONNECTION_STRING\", \"Env variable not found. Verify you have a .env file with a valid connection string.\")": "\"<connection string URI>\"",
//      "client.Dispose();": ""
//	  }
//	}
namespace Examples.QuickStart;

using MongoDB.Bson;
using MongoDB.Driver;

public class QuickStart
{
    public BsonDocument RunQuickStartExample()
    {
        // ... rest of file content
    }
}
// :replace-end:
```

**Snippet-Level Markup Patterns:**

```csharp
// :snippet-start: connection-setup
var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
    "Env variable not found. Verify you have a .env file with a valid connection string.");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Set your 'CONNECTION_STRING' environment variable. " +
        "See: https://www.mongodb.com/docs/drivers/csharp/");
}
var client = new MongoClient(connectionString);
// :snippet-end:

// :snippet-start: database-operation
var database = client.GetDatabase("sample_mflix");
var collection = database.GetCollection<BsonDocument>("movies");

var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");
var movie = collection.Find(filter).FirstOrDefault();

Console.WriteLine(movie?.ToJson());
return movie; // :remove:
// :snippet-end:

// Code outside snippets that won't appear in docs
// :remove-start:
// Test-specific validation that shouldn't appear in documentation
if (movie == null)
{
    throw new InvalidOperationException("Movie not found");
}
// :remove-end:

// :snippet-start: results-processing
// Process results for display
Console.WriteLine(movie?.ToJson());
// :snippet-end:
```

**Critical Bluehawk Rules:**
- **File-level replacements**: Define once at top, close at end of file
- **Snippet-level operations**: Only use `:remove:` or `:replace:` tags INSIDE snippet blocks (between `:snippet-start:` and `:snippet-end:`)
- **Tag closing order**: Always close inner blocks before outer blocks:
  ```csharp
  // :snippet-start: example
  // :remove-start:
  // content to remove
  // :remove-end:    ← Close inner block first
  // :snippet-end:   ← Then close outer block
  ```
- **`:snippet-start:`/`:snippet-end:`**: Mark code sections for documentation
- **`:replace-start:`/`:replace-end:`**: Replace internal patterns with public APIs
- **`:remove-start:`/`:remove-end:`**: Exclude test-specific code from docs
- **`:uncomment-start:`/`:uncomment-end:`**: Show commented alternative syntax in docs

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

#### 3.3 Create Test File Structure

**SIMPLE TEMPLATE - Use this for most documentation examples:**
```csharp
using MongoDB.Driver;
using Utilities.SampleData;

namespace Tests.Topic;

public class ExampleTests
{
    [Test]
    [RequiresSampleData("sample_database_if_needed")]
    public void TestExampleRunsSuccessfully()
    {
        // Skip if sample data not available
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_database_if_needed");

        var example = new Examples.Topic.Example();
        var result = example.RunExample();

        // Minimal validation - just ensure it works
        Assert.That(result, Is.Not.Null, "Example should return non-null result");
        // Add basic type/structure checks as needed
    }
}
```

**OUTPUT MATCHING TEMPLATE - Use only when docs show specific expected output:**
```csharp
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.QuickStart;

public class QuickStartTests
{
    private IMongoClient _client;

    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
    }

    [Test]
    [RequiresSampleData("sample_mflix")] // Automatically documents sample data requirement
    public void TestQuickStartExample()
    {
        // Check sample data availability (skips test if missing)
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");

        var example = new Examples.QuickStart.QuickStart();
        var result = example.RunQuickStartExample();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid SOLUTION_ROOT.");
        var outputLocation = "Examples/QuickStart/QuickStartOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(result)
            .ShouldMatch(fullPath);
    }

    [TearDown]
    public void TearDown()
    {
        // Don't drop sample databases - they're shared
        _client?.Dispose();
    }
}
```

**Template for tests with custom data:**
```csharp
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.CustomExample;

public class CustomExampleTests
{
    private IMongoClient _client;
    private IMongoDatabase _database;

    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase("test_database");

        // Set up test data
        var collection = _database.GetCollection<BsonDocument>("test_collection");
        collection.DeleteMany(FilterDefinition<BsonDocument>.Empty); // Clean slate

        var testData = new List<BsonDocument>
        {
            new BsonDocument { { "name", "Test Document 1" }, { "value", 100 } },
            new BsonDocument { { "name", "Test Document 2" }, { "value", 200 } }
        };
        collection.InsertMany(testData);
    }

    [Test]
    public void TestCustomExample()
    {
        var example = new Examples.CustomExample.CustomExample();
        example.SetDatabase(_database); // Inject test database
        var result = example.RunExample();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT",
            "Env variable not found.");
        var outputLocation = "Examples/CustomExample/CustomExampleOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(result)
            .WithUnorderedArrays()
            .ShouldMatch(fullPath);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop test database to clean up
        _client?.DropDatabase("test_database");
        _client?.Dispose();
    }
}
```

#### 3.2 Handle Sample Data Requirements

**Sample Data Detection Patterns:**

```csharp
// For basic sample database requirements:
[Test]
[RequiresSampleData("sample_mflix")]
public void TestMovieExample()
{
    SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");
    // Test implementation
}

// For multiple database requirements:
[Test]
[RequiresSampleData("sample_mflix", "sample_restaurants")]
public void TestCrossDatabaseExample()
{
    SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix", "sample_restaurants");
    // Test implementation
}

// For specific collection requirements:
[Test]
[RequiresSampleData("sample_mflix")]
public void TestSpecificCollectionsExample()
{
    var collections = new Dictionary<string, string[]>
    {
        ["sample_mflix"] = new[] { "movies", "theaters" }
    };
    SampleDataTestHelper.EnsureSampleDataOrSkip(new[] { "sample_mflix" }, collections);
    // Test implementation
}

// For fixture-level requirements:
[TestFixture]
[RequiresSampleData("sample_mflix")]
public class MovieAnalysisTests
{
    [SetUp]
    public void SetUp()
    {
        SampleDataTestHelper.EnsureSampleDataOrSkip("sample_mflix");
    }

    // All tests in this fixture require sample_mflix
}
```

**Common Sample Databases:**
- `sample_mflix`: Movies and theaters data
- `sample_restaurants`: Restaurant location data
- `sample_training`: Training and educational data
- `sample_analytics`: Financial data
- `sample_airbnb`: Airbnb listing data

#### 3.3 When to Create Output Files

**Create output files ONLY when:**
- Documentation shows specific expected output format
- The output is deterministic enough to validate
- The example's purpose is to demonstrate specific output structure

**Skip output files when:**
- Output contains variable data (ObjectIds, timestamps, counts)
- Documentation doesn't show expected output
- Example demonstrates functionality, not specific results

**If you create output files, you MUST use output comparison utilities in tests.**
**If you don't need output validation, don't import the output comparison utilities.**

#### 3.4 Create Expected Output Files

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

**C# Object Syntax (Alternative):**
```csharp
{
  _id: ObjectId("..."),
  title: "Back to the Future",
  year: 1985,
  genres: ["Adventure", "Comedy", "Sci-Fi"],
  ...
}
```

**Ellipsis Patterns:**
- `"field": "..."` - Match any value for this field
- `"text": "Start of text..."` - Match text starting with this prefix
- Standalone `...` - Match any additional fields/documents

**Critical: Ellipsis vs IgnoredFields**

**Use Ellipsis in Output File (Preferred):**
When you want flexible matching and can show `"..."` in documentation:

```json
// QuickStartOutput.txt
{
  "_id": "...",           // Ellipsis automatically matches any ObjectId
  "createdAt": "...",     // Ellipsis automatically matches any timestamp
  "title": "Back to the Future"
}
```

```csharp
// test file - No IgnoredFields needed!
Expect.That(result)
    .ShouldMatch(fullPath);
```

**Use IgnoredFields (Only when necessary):**
When documentation must show realistic values but they vary between test runs:

```json
// QuickStartOutput.txt - Shows real values for better documentation
{
  "_id": "507f1f77bcf86cd799439011",    // Real ObjectId shown in docs
  "createdAt": "2023-10-15T14:30:22Z",  // Real timestamp shown in docs
  "title": "Back to the Future"
}
```

```csharp
// test file - Must use IgnoredFields for fields with real values
Expect.That(result)
    .WithIgnoredFields("_id", "createdAt") // Only for fields with real values
    .ShouldMatch(fullPath);
```

**Common Mistake to Avoid:**
Never use both ellipsis AND IgnoredFields for the same field:
- ❌ Bad: `"_id": "..."` in output.txt AND `.WithIgnoredFields("_id")`
- ✅ Good: Either ellipsis OR IgnoredFields, not both

### Phase 4: ✅ Validation & Generation
**GOAL**: Verify implementation and generate documentation snippets

#### 4.1 Verify Implementation

**Compilation Check:**
```bash
cd code-example-tests/csharp/driver
dotnet build
```

**Formatting:**
```bash
dotnet format
```

**Test Execution:**
```bash
dotnet test Tests/Tests.csproj --filter "FullyQualifiedName~QuickStart"
```

#### 4.2 Generate Documentation Snippets

```bash
# Run Bluehawk to generate documentation files
cd code-example-tests/csharp/driver
node snip.js
```

**Verify Generated Files:**
- Check `content/code-examples/tested/csharp/driver/[topic]/` for generated snippets
- Ensure snippets have proper names and formatting
- Validate that replacements work correctly

#### 4.3 Integration Testing

```bash
# Run all tests to ensure no regressions
dotnet test
```

### Phase 5: 📝 Documentation Integration & Cleanup
**GOAL**: Update references and clean up original files

#### 5.1 Ensure Symlink to Tested Code Examples

**Create symlink if it doesn't exist:**

Before updating documentation references, verify that the documentation source directory has a symlink to the tested code examples. Our build toolchain can't use files outside of a `project/version/source` directory, so we use symlinks to make the examples in `content/code-examples/tested` available to each project.

**Check for existing symlink:**
```bash
# Navigate to the documentation source directory
cd content/csharp/current/source/

# Check if code-examples directory exists and has tested symlink
ls -l code-examples/tested 2>/dev/null

# If successful, verify it points to the correct location
realpath code-examples/tested 2>/dev/null
# Should show: .../docs-mongodb-internal/content/code-examples/tested
```

**Create symlink if missing:**
```bash
# Create code-examples directory if it doesn't exist
mkdir -p content/csharp/current/source/code-examples

# Navigate to the directory
cd content/csharp/current/source/code-examples

# Create symlink to tested examples (adjust path based on nesting level)
ln -s ../../../../code-examples/tested

# Verify creation
ls -l tested
# Should show: tested -> ../../../../code-examples/tested
```

**Nesting Level Guide:**
- **Versioned projects** (e.g., `csharp/current/source`): Use `../../../../code-examples/tested`
- **Non-versioned projects** (e.g., `atlas/source`): Use `../../../code-examples/tested`
- **Manual/deeply nested** (e.g., `manual/manual/source`): Use `../../../../code-examples/tested`

**Important Notes:**
- Each docs project directory and version must have its own symlink
- If working with multiple versions, create symlinks for each version separately
- The symlink should be created before updating any literalinclude directives

#### 5.2 Update Documentation References

**Replace All Forms of C# Code Examples:**

**Type 1: Replace literalinclude Directives**
Original documentation references files:
```rst
.. literalinclude:: /includes/quick-start/QuickStart.cs
   :language: csharp
```

Replace with tested snippets (note: add `:category:` and evaluate any other directive options):
```rst
.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStart.snippet.connection-setup.cs
   :language: csharp
   :category: usage example

.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStart.snippet.find-document.cs
   :language: csharp
   :category: usage example
```

**Type 2: Replace Inline Code Blocks**
Original hardcoded examples:
```rst
.. code-block:: csharp

   using MongoDB.Bson;
   using MongoDB.Driver;

   class Program
   {
       static void Main(string[] args)
       {
           var connectionString = "mongodb://localhost:27017";
           // ... rest of hardcoded example
       }
   }
```

Replace with tested snippet references:
```rst
.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStart.snippet.connection-setup.cs
   :language: csharp
   :category: usage example
```

**Type 3: Update Include Files**
If include files contain C# code examples, update them following the same patterns above.

**Update Process:**
1. **Find all forms of C# code** in the documentation page (literalinclude, code-block, include)
2. **Replace each with appropriate tested snippet references**
3. **Add `:category:` option** following [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/)
4. **Consider other directive options** May need to remove or adjust directive options depending on changes made during migration
5. **Verify snippet names** match the generated Bluehawk output
6. **Extract inline code** to testable examples first if needed
7. **Update include files** that contain C# code examples

**Category Guidelines:**
Based on the [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/):
- **C# code examples that show real-world usage patterns**: Use `:category: usage example`
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
- **Versioned projects** (e.g., `content/csharp/`): Each version directory (`current`, `v2.28`, etc.) contains its own `source` directory
- **Non-versioned projects** (e.g., `content/atlas/`): `source` directory is at the project root
- **Version isolation**: Files in `current/source/includes/` are completely separate from `v2.28/source/includes/`
- **Build scope**: Each version's `source` directory is self-contained for that build

**Search for File Usage (Properly Scoped):**
```bash
# For versioned projects - search only within the specific version's source directory
grep -r "includes/quick-start/QuickStart.cs" content/csharp/current/source/

# For non-versioned projects - search within the project's source directory
grep -r "includes/quick-start/QuickStart.cs" content/atlas/source/

# More comprehensive search patterns within the version scope
grep -r "quick-start/QuickStart" content/csharp/current/source/
grep -r "QuickStart.cs" content/csharp/current/source/

# Search for include files that might contain C# code examples
grep -r "includes/quick-start" content/csharp/current/source/
```

**Search for Code Block and Include Usage:**
```bash
# Find any hardcoded C# code that matches your examples
grep -A 10 -B 5 "code-block:: csharp" content/csharp/current/source/ | grep -A 15 "MongoClient\|static void Main"

# Find include directives that reference files you're replacing
grep -r "include.*quick-start" content/csharp/current/source/
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
- [ ] Include file doesn't contain shared content beyond the C# code examples
- [ ] No other documentation pages include the `.rst` file

**Deletion Process:**
```bash
# Verify no remaining references to files after documentation updates
grep -r "quick-start/QuickStart.cs" content/csharp/current/source/
grep -r "includes/quick-start" content/csharp/current/source/

# Verify no remaining references to include files
grep -r "quick-start.*\.rst" content/csharp/current/source/

# If no results found within the version scope, safe to delete
rm content/csharp/current/source/includes/quick-start/QuickStart.cs

# Delete include files only if they contained only the code examples you migrated
rm content/csharp/current/source/includes/quick-start/code-example.rst

# If directory becomes empty, remove it too
rmdir content/csharp/current/source/includes/quick-start/
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
.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStartOutput.txt
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
ls -la content/code-examples/tested/csharp/driver/quick-start/

# Check for any remaining references to deleted files (within version scope)
find content/csharp/current/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/QuickStart.cs"

# For non-versioned projects:
find content/atlas/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/QuickStart.cs"
```

#### 5.7 Handle Edge Cases

**Working with Versioned vs Non-Versioned Projects:**

**Versioned Projects** (e.g., `content/csharp/`, `content/node/`):
```bash
# Work within specific version scope - each version is isolated
grep -r "quick-start/QuickStart.cs" content/csharp/current/source/
# Other versions (v2.28, v2.27, upcoming) are separate and unaffected
```

**Non-Versioned Projects** (e.g., `content/atlas/`, `content/manual/`):
```bash
# Work within project's source directory
grep -r "quick-start/QuickStart.cs" content/atlas/source/
```

**Shared Include Files within Version:**
For files in `/includes/` directories used by multiple pages within the same version:
- **Assess impact**: Find all pages using the include within the version's source directory
- **Update references**: Update all referencing pages within that version simultaneously
- **No cross-version impact**: Other versions with same-named files are unaffected

**Complex Documentation Structures:**
For pages with multiple code examples:
- **Map each literalinclude** to its corresponding tested snippet
- **Group related snippets** from the same example method
- **Maintain logical flow** in documentation presentation

#### 5.8 Complete Example: QuickStart Migration

**Original Documentation (content/csharp/current/source/quick-start.txt):**
```rst
.. literalinclude:: /includes/quick-start/QuickStart.cs
   :language: csharp
   :dedent:

.. include:: /includes/quick-start/query-output.rst
```

**Additional scenarios you might encounter:**
```rst
.. code-block:: csharp

   using MongoDB.Bson;
   using MongoDB.Driver;

   class Program
   {
       static void Main(string[] args)
       {
           var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
           // ... hardcoded example
       }
   }

.. include:: /includes/quick-start/setup-instructions.rst
```

**Step 1: Update All References**
```rst
.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStart.snippet.connection-setup.cs
   :language: csharp
   :category: usage example

.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStart.snippet.find-document.cs
   :language: csharp
   :category: usage example

.. literalinclude:: /code-examples/tested/csharp/driver/quick-start/QuickStartOutput.txt
   :language: json
   :category: example return object
```

**Step 2: Check All Usage Types**
```bash
# Check if original files are used elsewhere
grep -r "includes/quick-start/QuickStart.cs" content/csharp/current/source/
grep -r "includes/quick-start/query-output.rst" content/csharp/current/source/

# Check for any hardcoded examples that might duplicate the file content
grep -A 20 "code-block:: csharp" content/csharp/current/source/ | grep -A 15 "MongoClient\|static void Main"

# Check for include directives referencing files with C# code
grep -r "include.*quick-start" content/csharp/current/source/
```

**Step 3: Safe Cleanup (if no other references found)**
```bash
# Remove original files
rm content/csharp/current/source/includes/quick-start/QuickStart.cs
rm content/csharp/current/source/includes/quick-start/query-output.rst

# Remove empty directory
rmdir content/csharp/current/source/includes/quick-start/
```

**Step 4: Verify Integration**
```bash
# Confirm all new files exist
ls -la content/code-examples/tested/csharp/driver/quick-start/
# Should show: QuickStart.snippet.connection-setup.cs, QuickStart.snippet.find-document.cs, QuickStartOutput.txt

# Verify no remaining references to deleted files (within version scope only)
find content/csharp/current/source/ -name "*.txt" -o -name "*.rst" | \
  xargs grep -l "includes/quick-start"
# Should return no results within this version's source directory
```

## Decision Tree for Common Scenarios

### Connection String Handling
- **Use `DotNetEnv.Env.GetString("CONNECTION_STRING", "error message")`** in example classes
- **Use Bluehawk replace** to show `"<connection string URI>"` in docs
- **Never hardcode** connection strings

### Sample Data vs Custom Data
```
Does the example use sample_* databases?
├─ YES: Use [RequiresSampleData("database_name")] attribute and SampleDataTestHelper
│      Don't drop databases in cleanup
├─ NO:  Create test-specific database name
│      Drop database in cleanup function
```

### Output Verification Strategy
```
Does the documentation show expected output?
├─ YES: Create [Example]Output.txt with flexible patterns
│      Use ellipsis for variable fields
├─ NO:  Focus on error-free execution
│      Simple existence/compilation checks
```

### Complex vs Simple Examples
```
Is this a multi-step tutorial?
├─ YES: Break into multiple methods/snippets
│      Create separate test cases for each step
├─ NO:  Single method with one or two snippets
│      Single test case with comprehensive validation
```

## Error Handling Patterns

### Common Issues and Solutions

**Compilation Errors:**
```
Error: CS0246: The type or namespace name 'X' could not be found
Solution: Ensure NuGet packages are restored with `dotnet restore`
```

**NuGet Package Issues:**
```
Error: Package X could not be found
Solution: Run `dotnet restore` from solution directory
```

**Connection Failures:**
```
Error: CONNECTION_STRING environment variable not set
Solution: Ensure .env file exists with CONNECTION_STRING variable
```

**Sample Data Missing:**
```
Expected: Test should skip gracefully with [RequiresSampleData] attribute
Solution: Verify attribute is present and SampleDataTestHelper is called
```

## Quality Checklist

### Before Completing Migration
- [ ] Code compiles without errors
- [ ] Tests run and either pass or skip appropriately
- [ ] Tests focus on documentation validation, not comprehensive coverage
- [ ] No connection error testing unless docs demonstrate error handling
- [ ] Bluehawk markup generates correct snippets
- [ ] Connection strings use environment variables
- [ ] Sample data requirements are handled gracefully
- [ ] Output files created only when docs show specific expected output
- [ ] Output comparison utilities used only when output files exist
- [ ] Expected output files use appropriate ellipsis patterns
- [ ] Variable fields are ignored in comparisons
- [ ] No hardcoded credentials or secrets
- [ ] Code follows C# formatting standards (use `dotnet format`)
- [ ] Documentation integration completed with `node snip.js`

### Documentation Integration Checklist
- [ ] All literalinclude directives updated to reference tested snippets
- [ ] All inline code-block examples replaced with tested snippet references
- [ ] All include files with C# code updated or replaced
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
code-example-tests/csharp/driver/
├── Examples/[Topic]/
│   ├── [Example].cs                 ✓ Testable class with Bluehawk
│   └── [Example]Output.txt          ✓ Expected output (if shown in docs)
└── Tests/[Topic]/
    └── [Example]Tests.cs            ✓ Comprehensive test coverage

content/code-examples/tested/csharp/driver/[topic]/
├── [Example].snippet.[name].cs     ✓ Generated by Bluehawk
└── [Example]Output.txt             ✓ Copied by Bluehawk
```

## 🚨 Failure Scenarios & Responses

### Sample Data Issues

**Standard MongoDB Sample Data Missing**
- **DETECTION**: `[RequiresSampleData]` attribute automatically documents requirement, test skips with clear message
- **ACTION**: SKIP with documentation, continue migration
- **STEPS**:
  - Log: "Skipping example due to missing sample data: [database_names]"
  - Add comment in test: `// Test skipped - requires sample data: sample_mflix`
  - Test skips gracefully with automated skip message

**Custom Sample Data Required**
- **DETECTION**: Examples reference non-standard collections (users, orders, inventory)
- **ACTION**: CREATE minimal test data
- **EXAMPLE**:
```csharp
[SetUp]
public void Setup()
{
    _client = new MongoClient(connectionString);
    _database = _client.GetDatabase("test_database");
    var collection = _database.GetCollection<BsonDocument>("testcoll");

    var testData = new List<BsonDocument>
    {
        new BsonDocument
        {
            { "name", "Test Item" },
            { "price", 29.99 },
            { "test_marker", "automated_example_data" }
        }
    };
    collection.InsertMany(testData);
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

**NuGet Package Issues**
- **ACTION**: LOG details and try standard fix
- **STEPS**: Run `dotnet restore`, document resolution
- **ESCALATE**: If package issues persist after standard fix

**Tests Pass But Output Doesn't Match**
- **ACTION**: ANALYZE and adapt
- **CHECK**: Ignored fields (add to WithIgnoredFields), ellipsis patterns, structural differences
- **ESCALATE**: If structural differences found with comparison details

### File System & Structure Issues

**Referenced Files Don't Exist**
- **ACTION**: SEARCH and adapt
- **STEPS**: Look in same directory/version, check for file moves, document changes
- **ESCALATE**: If no alternatives found: "Referenced file missing: [path]"

**Complex Nested Includes**
- **ACTION**: SIMPLIFY and document
- **STEPS**: Extract C# code only, flatten structure, preserve non-C# content
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
| NuGet package issues | | ✅ | Persistent failures | ✅ (with standard fix) |
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

```csharp
// LoadSampleData prepares test data - separate method
public void LoadSampleData()
{
    var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING", "error message");
    var client = new MongoClient(connectionString);
    var database = client.GetDatabase("agg_tutorials_db");
    var collection = database.GetCollection<BsonDocument>("testcoll");

    // For sample data modifications, use identifiable markers:
    var testDocument = new BsonDocument
    {
        { "title", "Test Movie" },
        { "test_marker", "cleanup_needed" },      // Identifiable marker for cleanup
        { "test_run_id", DateTimeOffset.UtcNow.ToUnixTimeSeconds() } // Unique per test run
    };
    collection.InsertOne(testDocument);
}

// RunExample demonstrates the main operation
public List<BsonDocument> RunTutorialExample()
{
    var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING", "error message");
    var client = new MongoClient(connectionString);

    try
    {
        var database = client.GetDatabase("agg_tutorials_db");
        var collection = database.GetCollection<BsonDocument>("testcoll");

        var filter = Builders<BsonDocument>.Filter.Eq("title", "Test Movie");
        return collection.Find(filter).ToList();
    }
    finally
    {
        client.Dispose();
    }
}

// In test:
[Test]
public void TestComplexTutorialExample()
{
    var example = new TutorialExample();
    example.LoadSampleData(); // Setup

    var result = example.RunTutorialExample(); // Main operation

    // Cleanup is handled automatically by TearDown if using custom database
    // For sample data modifications, manual cleanup in TearDown:
    // collection.DeleteMany(Builders<BsonDocument>.Filter.Eq("test_marker", "cleanup_needed"));

    // Validation
    Assert.That(result, Is.Not.Empty);
    Assert.That(result.Count, Is.GreaterThan(0));
}
```

### Sample Data Modification Patterns
When examples modify sample databases, use identifiable markers for cleanup:

```csharp
// In example method - mark any data you add/modify:
public ObjectId AddMovieExample()
{
    var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING", "error message");
    var client = new MongoClient(connectionString);

    try
    {
        var database = client.GetDatabase("sample_mflix");
        var collection = database.GetCollection<BsonDocument>("movies");

        var newDocument = new BsonDocument
        {
            { "title", "New Movie" },
            { "test_run_id", DateTimeOffset.UtcNow.ToUnixTimeSeconds() },  // Unique per test run
            { "added_by_test", true }                                      // Cleanup marker
        };

        collection.InsertOne(newDocument);
        return newDocument["_id"].AsObjectId;
    }
    finally
    {
        client.Dispose();
    }
}

// In test cleanup:
[TearDown]
public void TearDown()
{
    if (_client != null)
    {
        var database = _client.GetDatabase("sample_mflix");
        var collection = database.GetCollection<BsonDocument>("movies");

        // Remove any documents added during test
        collection.DeleteMany(Builders<BsonDocument>.Filter.Eq("added_by_test", true));

        // Revert any field modifications
        var updateDefinition = Builders<BsonDocument>.Update
            .Unset("modified_by_test")
            .Unset("temp_field");
        collection.UpdateMany(
            Builders<BsonDocument>.Filter.Eq("modified_by_test", true),
            updateDefinition
        );

        _client.Dispose();
    }
}
```

### Custom Data Models
When working with POCOs instead of BsonDocument:

```csharp
// Define models in separate class or inline
public class Movie
{
    public ObjectId Id { get; set; }
    public string Title { get; set; }
    public int Year { get; set; }
    public List<string> Genres { get; set; }
}

Expect.That(movieList)
    .WithUnorderedArrays()
    .WithIgnoredFields("Id") // Only for fields with variable values
    .ShouldMatch(fullPath);
```

## 🎪 Critical Reminders

**When in Doubt:**
1. **PRESERVE functionality** over perfection
2. **DOCUMENT decisions** in logs and comments
3. **ESCALATE complex scenarios** rather than guess
4. **SKIP gracefully** rather than break the pipeline
5. **TEST everything** before declaring success

**Key Patterns to Remember:**
- Use `DotNetEnv.Env.GetString("CONNECTION_STRING", "error message")` in examples, show `"<connection string URI>"` in docs
- Ellipsis in output files OR WithIgnoredFields (never both for same field)
- MongoDB sample data: revert changes, don't drop databases
- Custom data: drop custom DB in TearDown, or if adding custom data to MongoDB sample data, use test_marker fields for cleanup
- Always run `dotnet restore` for dependency issues
- Use `[RequiresSampleData]` attributes to document sample data requirements

This framework ensures consistent, reliable automation while providing clear escalation paths for complex scenarios.
