# AI Agent Instructions: Automated PyMongo Driver Code Example Migration

## 🎯 Quick Decision Framework (READ FIRST)

**When You Encounter Issues:**
- **Sample data missing** → SKIP with documentation, continue migration
- **Import errors** → ESCALATE immediately with error details
- **Virtual environment issues** → LOG details, ensure venv activation
- **File not found** → SEARCH for alternatives, escalate if none found
- **Complex custom data** → CREATE minimal test data or ESCALATE
- **Connection issues** → RETRY 3x, then skip gracefully

**Key Success Criteria:**
✅ Code runs without errors in activated venv
✅ Tests pass or skip gracefully
✅ Documentation references updated
✅ Original files safely deleted
✅ Bluehawk markup generates correct snippets

---

## Overview

This document provides step-by-step instructions for AI agents to automate the
migration of hard-coded, untested PyMongo Driver code examples from documentation into a
proper test environment. This ensures code examples remain accurate, testable,
and maintainable.

## Prerequisites

Before starting, ensure you understand:
1. **Monorepo structure** from `.github/copilot-instructions.md`
2. **Existing test patterns** in `code-example-tests/python/pymongo`
3. **Bluehawk markup syntax** for documentation integration
4. **PyMongo driver patterns** and environment handling
5. **unittest testing framework** and Python virtual environments
6. **Python virtual environment (venv) activation requirements**

## 📋 5-Phase Migration Process

### Phase 1: 🔍 Discovery & Analysis
**GOAL**: Find all Python code examples in documentation

#### 1.1 Read Repository Documentation
```bash
# Always start by understanding the monorepo
read_file(".github/copilot-instructions.md")
```

**Key Points:**
- `content/` contains documentation projects (versioned and non-versioned)
- `code-example-tests/python/pymongo/` contains the test infrastructure
- **Version isolation**: Each version's `source/` directory is self-contained
- **Virtual environment**: Always activate venv before running Python code
- Follow the existing patterns for examples, tests, and utils

#### 1.2 Analyze Documentation Page
```bash
# Examine the documentation page for Python file references
read_file("content/python/current/source/[TARGET_PAGE].txt")
```

**Look for all forms of Python code examples:**
1. **Direct file references**: `.. literalinclude::` directives referencing Python files
2. **Inline code blocks**: `.. code-block:: python` containing hardcoded Python code
3. **Include files**: `.. include::` directives that may contain:
   - Direct `.. code-block:: python` sections with hardcoded code
   - Nested `.. literalinclude::` directives referencing Python files
4. **Expected output sections**: Code blocks showing JSON or text output
5. **Sample data requirements**: References to sample databases or datasets

**Analysis Strategy:**
```bash
# Find all literalinclude references to Python files
grep -r "literalinclude.*\.py" content/python/current/source/

# Find all Python code blocks with potentially hardcoded examples
grep -r "code-block:: python" content/python/current/source/

# Find all include directives that might contain Python code
grep -r ".. include::" content/python/current/source/

# Check included files for Python code
grep -r "code-block:: python\|literalinclude.*\.py" content/python/current/source/includes/
```

**Important**: Determine if you're working with:
- **Versioned project**: `content/python/current/source/` (scope to this version only)
- **Non-versioned project**: `content/atlas/source/` (scope to project root)

#### 1.3 Locate and Categorize Code Examples

**Examine all discovered Python code examples and categorize them:**

**Type 1: Referenced Python Files**
```bash
# Find all Python files referenced in literalinclude directives
glob_file_search("content/python/current/source/**/[REFERENCED_FILE].py")
```

**Type 2: Inline Code Blocks**
```bash
# Examine inline code blocks in documentation files
grep -A 20 -B 5 "code-block:: python" content/python/current/source/[PAGE].txt
```

**Type 3: Included Files with Python Code**
```bash
# Check include files for Python code examples
grep -l "code-block:: python\|literalinclude.*\.py" content/python/current/source/includes/*.rst
```

**Examine each discovered code example for:**
- **Standalone execution scripts** (need conversion to testable functions)
- **Hard-coded connection strings** (need environment variable replacement)
- **Sample data dependencies** (need sample data handling)
- **Inline hardcoded examples** (need extraction to testable files)
- **Expected outputs** shown in documentation

### Phase 2: ⚡ Code Migration
**GOAL**: Convert to testable functions with Bluehawk markup

#### 2.1 Create Example Directory Structure
```bash
# Create organized directory structure in examples/
mkdir -p code-example-tests/python/pymongo/examples/[topic]/
mkdir -p code-example-tests/python/pymongo/tests_package/[topic]/
```

**Naming Convention:**
- Use snake_case for files: `quick_start.py`, `crud_operations.py`
- Group related concepts: `aggregation/pipelines`, `search/text`
- Follow Python package naming conventions
- Create `__init__.py` files in new test directories

### 2.2 Virtual Environment Setup (Critical)

**Before any Python operations, ensure virtual environment is activated:**

```bash
# Navigate to the pymongo directory
cd code-example-tests/python/pymongo

# Activate the virtual environment (REQUIRED)
source ./venv/bin/activate

# If venv doesn't exist, create it first:
# python3 -m venv ./venv
# source ./venv/bin/activate
# pip install -r requirements.txt

# Verify activation (should show venv path)
which python
```

**Critical**: All Python operations (testing, imports, execution) must happen within the activated virtual environment.

#### 2.3 Convert Code to Testable Functions

**Transform Pattern:**
```python
# FROM: Standalone execution script
from pymongo import MongoClient

def main():
    connection_string = "mongodb://localhost:27017"
    client = MongoClient(connection_string)

    try:
        database = client["sample_mflix"]
        collection = database["movies"]

        movie = collection.find_one({"title": "Back to the Future"})
        print(movie)
    finally:
        client.close()

if __name__ == "__main__":
    main()

# TO: Testable function with proper structure
from pymongo import MongoClient

def quick_start_example(connection_string):
    """Example function that demonstrates basic PyMongo usage."""
    client = MongoClient(connection_string)

    try:
        database = client["sample_mflix"]
        collection = database["movies"]

        movie = collection.find_one({"title": "Back to the Future"})
        print(movie)
        return movie  # Return for test validation
    finally:
        client.close()
```

#### 2.4 Add Bluehawk Markup

**File-Level Replacements (Optional):**
If you need to apply replacements across the entire file, define them at the top and close at the end:

```python
# :replace-start: {
#    "terms": {
#       "connection_string": "\"<connection string URI>\"",
#       "def quick_start_example(connection_string):": "def quick_start_example():\n    connection_string = \"<connection string URI>\""
#    }
# }
from pymongo import MongoClient

def quick_start_example(connection_string):
    # ... rest of file content
# :replace-end:
```

**Snippet-Level Markup Patterns:**

```python
# :snippet-start: connection-setup
from pymongo import MongoClient

# Replace the connection string with your actual connection string
connection_string = "mongodb+srv://<username>:<password>@<cluster-hostname>/<database-name>?retryWrites=true&w=majority"
client = MongoClient(connection_string)
# :snippet-end:

# :snippet-start: database-operation
database = client["sample_mflix"]
collection = database["movies"]

# Query for a movie that has a title value of 'Back to the Future'
query = {"title": "Back to the Future"}
movie = collection.find_one(query)

print(movie)
return movie  # :remove:
# :snippet-end:

# Code outside snippets that won't appear in docs
# :remove-start:
# Test-specific validation that shouldn't appear in documentation
if movie is None:
    raise RuntimeError("Movie not found")
# :remove-end:

# :snippet-start: results-processing
# Process results for display
import pprint
pprint.pprint(movie)
# :snippet-end:
```

**Critical Bluehawk Rules:**
- **File-level replacements**: Define once at top, close at end of file
- **Snippet-level operations**: Only use `:remove:` or `:replace:` tags INSIDE snippet blocks (between `:snippet-start:` and `:snippet-end:`)
- **Tag closing order**: Always close inner blocks before outer blocks:
  ```python
  # :snippet-start: example
  # :remove-start:
  # content to remove
  # :remove-end:    ← Close inner block first
  # :snippet-end:   ← Then close outer block
  ```
- **`:snippet-start:`/`:snippet-end:`**: Mark code sections for documentation
- **`:replace-start:`/`:replace-end:`**: Replace internal patterns with public APIs
- **`:remove-start:`/`:remove-end:`**: Exclude test-specific code from docs

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
```python
import unittest
from utils.sample_data.decorators import requires_sample_data
import examples.topic.example as example_module


class TestExample(unittest.TestCase):

    @requires_sample_data("sample_database_if_needed")
    def test_example_runs_successfully(self):
        """Test that the example runs without errors and returns expected result."""
        result = example_module.run_example()

        # Minimal validation - just ensure it works
        self.assertIsNotNone(result)
        # Add basic type/structure checks as needed

if __name__ == "__main__":
    unittest.main()
```

**OUTPUT MATCHING TEMPLATE - Use only when docs show specific expected output:**
```python
import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from utils.sample_data.decorators import requires_sample_data
from utils.comparison.assert_helpers import assert_expected_file_matches_output
import examples.quick_start.quick_start as quick_start


class TestQuickStart(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        """Set up class-level test fixtures."""
        load_dotenv()
        TestQuickStart.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestQuickStart.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created the .env file "
                "at the root of the PyMongo directory and the variable is correctly named as CONNECTION_STRING."
            )
        try:
            TestQuickStart.client = MongoClient(TestQuickStart.CONNECTION_STRING)
        except Exception:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in your .env file "
                "matches the one for your MongoDB deployment."
            )

    def setUp(self):
        """Set up method-level test fixtures."""
        # For sample data tests, minimal setup required
        pass

    @requires_sample_data("sample_mflix")  # Automatically skips if sample data unavailable
    def test_quick_start_example(self):
        """Test that quick start example retrieves the expected movie."""
        print("----------Test quick start example----------")

        result = quick_start.quick_start_example(TestQuickStart.CONNECTION_STRING)

        # Use comparison helper for flexible output validation
        output_filepath = "examples/quick_start/quick-start-output.txt"
        assert_expected_file_matches_output(self, output_filepath, result)

        print("----------Test complete----------")

    @classmethod
    def tearDownClass(cls):
        """Clean up class-level test fixtures."""
        if TestQuickStart.client:
            TestQuickStart.client.close()
```

**Template for tests with custom data:**
```python
import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from utils.comparison.assert_helpers import assert_expected_file_matches_output
import examples.custom.custom_example as custom_example


class TestCustomExample(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestCustomExample.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestCustomExample.CONNECTION_STRING is None:
            raise Exception("Could not retrieve CONNECTION_STRING")

        try:
            TestCustomExample.client = MongoClient(TestCustomExample.CONNECTION_STRING)
        except Exception:
            raise Exception("CONNECTION_STRING invalid")

    def setUp(self):
        """Set up custom test data."""
        # Drop and recreate test database
        TestCustomExample.client.drop_database("test_database")
        database = TestCustomExample.client["test_database"]
        collection = database["test_collection"]

        # Insert test data
        test_data = [
            {"name": "Test Document 1", "value": 100},
            {"name": "Test Document 2", "value": 200}
        ]
        collection.insert_many(test_data)

    def test_custom_example(self):
        """Test custom data processing."""
        print("----------Test custom example----------")

        result = custom_example.run_example(TestCustomExample.CONNECTION_STRING)

        # Validate results
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)

        print("----------Test complete----------")

    def tearDown(self):
        """Clean up custom test data."""
        TestCustomExample.client.drop_database("test_database")

    @classmethod
    def tearDownClass(cls):
        if TestCustomExample.client:
            TestCustomExample.client.close()
```

#### 3.2 Handle Sample Data Requirements

**Sample Data Detection Patterns:**

```python
# For basic sample database requirements:
from utils.sample_data.decorators import requires_sample_data

@requires_sample_data("sample_mflix")
def test_movie_example(self):
    # Test implementation

# For multiple database requirements:
@requires_sample_data(["sample_mflix", "sample_restaurants"])
def test_cross_database_example(self):
    # Test implementation

# For specific collection requirements:
@requires_sample_data("sample_mflix", collections=["movies", "theaters"])
def test_specific_collections_example(self):
    # Test implementation

# For complex per-database collection requirements:
@requires_sample_data(
    ["sample_mflix", "sample_restaurants"],
    collections_per_database={
        "sample_mflix": ["movies", "theaters"],
        "sample_restaurants": ["restaurants", "neighborhoods"]
    }
)
def test_complex_requirements(self):
    # Test implementation
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

**Python Object Syntax (Alternative):**
```python
{
  '_id': ObjectId('...'),
  'title': 'Back to the Future',
  'year': 1985,
  'genres': ['Adventure', 'Comedy', 'Sci-Fi'],
  ...
}
```

**Ellipsis Patterns:**
- `"field": "..."` - Match any value for this field
- `"text": "Start of text..."` - Match text starting with this prefix
- Standalone `...` - Match any additional fields/documents

**Critical: Ellipsis vs ignore_field_values**

**Use Ellipsis in Output File (Preferred):**
When you want flexible matching and can show `"..."` in documentation:

```json
// quick-start-output.txt
{
  "_id": "...",           // Ellipsis automatically matches any ObjectId
  "createdAt": "...",     // Ellipsis automatically matches any timestamp
  "title": "Back to the Future"
}
```

```python
# test file - No ignore_field_values needed!
assert_expected_file_matches_output(self, output_filepath, result)
```

**Use ignore_field_values (Only when necessary):**
When documentation must show realistic values but they vary between test runs:

```json
// quick-start-output.txt - Shows real values for better documentation
{
  "_id": "507f1f77bcf86cd799439011",    // Real ObjectId shown in docs
  "createdAt": "2023-10-15T14:30:22Z",  // Real timestamp shown in docs
  "title": "Back to the Future"
}
```

```python
# test file - Must use ignore_field_values for fields with real values
from utils.comparison.comparison import ComparisonOptions

options = ComparisonOptions(ignore_field_values={"_id", "createdAt"})  # Only for fields with real values
assert_expected_file_matches_output(self, output_filepath, result, options)
```

**Common Mistake to Avoid:**
Never use both ellipsis AND ignore_field_values for the same field:
- ❌ Bad: `"_id": "..."` in output.txt AND `ignore_field_values={"_id"}`
- ✅ Good: Either ellipsis OR ignore_field_values, not both

### Phase 4: ✅ Validation & Generation
**GOAL**: Verify implementation and generate documentation snippets

#### 4.1 Verify Implementation

**Virtual Environment Check:**
```bash
# Ensure venv is activated
source ./venv/bin/activate

# Verify Python path
which python
# Should point to: /path/to/code-example-tests/python/pymongo/venv/bin/python
```

**Import Check:**
```bash
cd code-example-tests/python/pymongo
source ./venv/bin/activate
python -c "import examples.[topic].[example]; print('Import successful')"
```

**Formatting:**
```bash
# Apply Black formatting
black ./examples/
```

**Test Execution:**
```bash
# Run specific test
python -m unittest tests_package.[topic].test_[example] -v
```

#### 4.2 Generate Documentation Snippets

```bash
# Run Bluehawk to generate documentation files
cd code-example-tests/python/pymongo
node snip.js
```

**Verify Generated Files:**
- Check `content/code-examples/tested/python/pymongo/[topic]/` for generated snippets
- Ensure snippets have proper names and formatting
- Validate that replacements work correctly

#### 4.3 Integration Testing

```bash
# Run all tests to ensure no regressions
source ./venv/bin/activate
python -m unittest discover tests_package -v
```

### Phase 5: 📝 Documentation Integration & Cleanup
**GOAL**: Update references and clean up original files

#### 5.1 Ensure Symlink to Tested Code Examples

**Create symlink if it doesn't exist:**

Before updating documentation references, verify that the documentation source directory has a symlink to the tested code examples. Our build toolchain can't use files outside of a `project/version/source` directory, so we use symlinks to make the examples in `content/code-examples/tested` available to each project.

**Check for existing symlink:**
```bash
# Navigate to the documentation source directory
cd content/python/current/source/

# Check if code-examples directory exists and has tested symlink
ls -l code-examples/tested 2>/dev/null

# If successful, verify it points to the correct location
realpath code-examples/tested 2>/dev/null
# Should show: .../docs-mongodb-internal/content/code-examples/tested
```

**Create symlink if missing:**
```bash
# Create code-examples directory if it doesn't exist
mkdir -p content/python/current/source/code-examples

# Navigate to the directory
cd content/python/current/source/code-examples

# Create symlink to tested examples (adjust path based on nesting level)
ln -s ../../../../code-examples/tested

# Verify creation
ls -l tested
# Should show: tested -> ../../../../code-examples/tested
```

**Nesting Level Guide:**
- **Versioned projects** (e.g., `python/current/source`): Use `../../../../code-examples/tested`
- **Non-versioned projects** (e.g., `atlas/source`): Use `../../../code-examples/tested`
- **Manual/deeply nested** (e.g., `manual/manual/source`): Use `../../../../code-examples/tested`

**Important Notes:**
- Each docs project directory and version must have its own symlink
- If working with multiple versions, create symlinks for each version separately
- The symlink should be created before updating any literalinclude directives

#### 5.2 Update Documentation References

**Replace All Forms of Python Code Examples:**

**Type 1: Replace literalinclude Directives**
Original documentation references files:
```rst
.. literalinclude:: /includes/quick-start/quick_start.py
   :language: python
```

Replace with tested snippets (note: add `:category:` and evaluate any other directive options):
```rst
.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick_start.snippet.connection-setup.py
   :language: python
   :category: usage example

.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick_start.snippet.find-document.py
   :language: python
   :category: usage example
```

**Type 2: Replace Inline Code Blocks**
Original hardcoded examples:
```rst
.. code-block:: python

   from pymongo import MongoClient

   def main():
       connection_string = "mongodb://localhost:27017"
       client = MongoClient(connection_string)
       # ... rest of hardcoded example

   if __name__ == "__main__":
       main()
```

Replace with tested snippet references:
```rst
.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick_start.snippet.connection-setup.py
   :language: python
   :category: usage example
```

**Type 3: Update Include Files**
If include files contain Python code examples, update them following the same patterns above.

**Update Process:**
1. **Find all forms of Python code** in the documentation page (literalinclude, code-block, include)
2. **Replace each with appropriate tested snippet references**
3. **Add `:category:` option** following [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/)
4. **Consider other directive options** May need to remove or adjust directive options depending on changes made during migration
5. **Verify snippet names** match the generated Bluehawk output
6. **Extract inline code** to testable examples first if needed
7. **Update include files** that contain Python code examples

**Category Guidelines:**
Based on the [MongoDB documentation standards](https://www.mongodb.com/docs/meta/reference/code-blocks/):
- **Python code examples that show real-world usage patterns**: Use `:category: usage example`
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
- **Versioned projects** (e.g., `content/python/`): Each version directory (`current`, `v4.5`, etc.) contains its own `source` directory
- **Non-versioned projects** (e.g., `content/atlas/`): `source` directory is at the project root
- **Version isolation**: Files in `current/source/includes/` are completely separate from `v4.5/source/includes/`
- **Build scope**: Each version's `source` directory is self-contained for that build

**Search for File Usage (Properly Scoped):**
```bash
# For versioned projects - search only within the specific version's source directory
grep -r "includes/quick-start/quick_start.py" content/python/current/source/

# For non-versioned projects - search within the project's source directory
grep -r "includes/quick-start/quick_start.py" content/atlas/source/

# More comprehensive search patterns within the version scope
grep -r "quick-start/quick_start" content/python/current/source/
grep -r "quick_start.py" content/python/current/source/

# Search for include files that might contain Python code examples
grep -r "includes/quick-start" content/python/current/source/
```

**Search for Code Block and Include Usage:**
```bash
# Find any hardcoded Python code that matches your examples
grep -A 10 -B 5 "code-block:: python" content/python/current/source/ | grep -A 15 "MongoClient\|def main"

# Find include directives that reference files you're replacing
grep -r "include.*quick-start" content/python/current/source/
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
- [ ] Include file doesn't contain shared content beyond the Python code examples
- [ ] No other documentation pages include the `.rst` file

**Deletion Process:**
```bash
# Verify no remaining references to files after documentation updates
grep -r "quick-start/quick_start.py" content/python/current/source/
grep -r "includes/quick-start" content/python/current/source/

# Verify no remaining references to include files
grep -r "quick-start.*\.rst" content/python/current/source/

# If no results found within the version scope, safe to delete
rm content/python/current/source/includes/quick-start/quick_start.py

# Delete include files only if they contained only the code examples you migrated
rm content/python/current/source/includes/quick-start/code-example.rst

# If directory becomes empty, remove it too
rmdir content/python/current/source/includes/quick-start/
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
.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick-start-output.txt
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
ls -la content/code-examples/tested/python/pymongo/quick_start/

# Check for any remaining references to deleted files (within version scope)
find content/python/current/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/quick_start.py"

# For non-versioned projects:
find content/atlas/source/ -name "*.rst" -o -name "*.txt" | \
  xargs grep -l "includes/quick-start/quick_start.py"
```

#### 5.7 Handle Edge Cases

**Working with Versioned vs Non-Versioned Projects:**

**Versioned Projects** (e.g., `content/python/`, `content/node/`):
```bash
# Work within specific version scope - each version is isolated
grep -r "quick-start/quick_start.py" content/python/current/source/
# Other versions (v4.5, v4.4, upcoming) are separate and unaffected
```

**Non-Versioned Projects** (e.g., `content/atlas/`, `content/manual/`):
```bash
# Work within project's source directory
grep -r "quick-start/quick_start.py" content/atlas/source/
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

**Original Documentation (content/python/current/source/quick-start.txt):**
```rst
.. literalinclude:: /includes/quick-start/quick_start.py
   :language: python
   :dedent:

.. include:: /includes/quick-start/query-output.rst
```

**Additional scenarios you might encounter:**
```rst
.. code-block:: python

   from pymongo import MongoClient

   def main():
       connection_string = "mongodb+srv://..."
       client = MongoClient(connection_string)
       # ... hardcoded example

   if __name__ == "__main__":
       main()

.. include:: /includes/quick-start/setup-instructions.rst
```

**Step 1: Update All References**
```rst
.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick_start.snippet.connection-setup.py
   :language: python
   :category: usage example

.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick_start.snippet.find-document.py
   :language: python
   :category: usage example

.. literalinclude:: /code-examples/tested/python/pymongo/quick_start/quick-start-output.txt
   :language: json
   :category: example return object
```

**Step 2: Check All Usage Types**
```bash
# Check if original files are used elsewhere
grep -r "includes/quick-start/quick_start.py" content/python/current/source/
grep -r "includes/quick-start/query-output.rst" content/python/current/source/

# Check for any hardcoded examples that might duplicate the file content
grep -A 20 "code-block:: python" content/python/current/source/ | grep -A 15 "MongoClient\|def main"

# Check for include directives referencing files with Python code
grep -r "include.*quick-start" content/python/current/source/
```

**Step 3: Safe Cleanup (if no other references found)**
```bash
# Remove original files
rm content/python/current/source/includes/quick-start/quick_start.py
rm content/python/current/source/includes/quick-start/query-output.rst

# Remove empty directory
rmdir content/python/current/source/includes/quick-start/
```

**Step 4: Verify Integration**
```bash
# Confirm all new files exist
ls -la content/code-examples/tested/python/pymongo/quick_start/
# Should show: quick_start.snippet.connection-setup.py, quick_start.snippet.find-document.py, quick-start-output.txt

# Verify no remaining references to deleted files (within version scope only)
find content/python/current/source/ -name "*.txt" -o -name "*.rst" | \
  xargs grep -l "includes/quick-start"
# Should return no results within this version's source directory
```

## Decision Tree for Common Scenarios

### Connection String Handling
- **Pass connection string as parameter** to example functions
- **Use Bluehawk replace** to show `"<connection string URI>"` in docs
- **Never hardcode** connection strings

### Sample Data vs Custom Data
```
Does the example use sample_* databases?
├─ YES: Use @requires_sample_data("database_name") decorator
│      Don't drop databases in cleanup
├─ NO:  Create test-specific database name
│      Drop database in cleanup function
```

### Output Verification Strategy
```
Does the documentation show expected output?
├─ YES: Create [example]-output.txt with flexible patterns
│      Use ellipsis for variable fields
├─ NO:  Focus on error-free execution
│      Simple existence/functionality checks
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
Error: ModuleNotFoundError: No module named 'examples.topic'
Solution: Ensure venv is activated and __init__.py files exist in directories
```

**Virtual Environment Issues:**
```
Error: Python not found or wrong version
Solution: Activate venv with `source ./venv/bin/activate`
```

**Connection Failures:**
```
Error: CONNECTION_STRING environment variable not set
Solution: Ensure .env file exists with CONNECTION_STRING variable
```

**Sample Data Missing:**
```
Expected: Test should skip gracefully with @requires_sample_data decorator
Solution: Verify decorator is present and sample data utilities are imported
```

## Quality Checklist

### Before Completing Migration
- [ ] Virtual environment activated for all Python operations
- [ ] Code runs without errors in activated venv
- [ ] Tests run and either pass or skip appropriately
- [ ] Tests focus on documentation validation, not comprehensive coverage
- [ ] No connection error testing unless docs demonstrate error handling
- [ ] Bluehawk markup generates correct snippets
- [ ] Connection strings passed as parameters, not hardcoded
- [ ] Sample data requirements are handled gracefully
- [ ] Output files created only when docs show specific expected output
- [ ] Output comparison utilities used only when output files exist
- [ ] Expected output files use appropriate ellipsis patterns
- [ ] Variable fields are ignored in comparisons
- [ ] No hardcoded credentials or secrets
- [ ] Code follows Python formatting standards (use `black ./examples/`)
- [ ] Documentation integration completed with `node snip.js`

### Documentation Integration Checklist
- [ ] All literalinclude directives updated to reference tested snippets
- [ ] All inline code-block examples replaced with tested snippet references
- [ ] All include files with Python code updated or replaced
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
code-example-tests/python/pymongo/
├── examples/[topic]/
│   ├── [example].py                 ✓ Testable function with Bluehawk
│   └── [example]-output.txt         ✓ Expected output (if shown in docs)
└── tests_package/[topic]/
    ├── __init__.py                  ✓ Required for test discovery
    └── test_[example].py            ✓ Comprehensive test coverage

content/code-examples/tested/python/pymongo/[topic]/
├── [example].snippet.[name].py     ✓ Generated by Bluehawk
└── [example]-output.txt            ✓ Copied by Bluehawk
```

## 🚨 Failure Scenarios & Responses

### Sample Data Issues

**Standard MongoDB Sample Data Missing**
- **DETECTION**: `@requires_sample_data` decorator automatically skips, no sample databases found
- **ACTION**: SKIP with documentation, continue migration
- **STEPS**:
  - Log: "Skipping example due to missing sample data: [database_names]"
  - Add comment in test: `# Test skipped - requires sample data: sample_mflix`
  - Test skips gracefully with automated skip message

**Custom Sample Data Required**
- **DETECTION**: Examples reference non-standard collections (users, orders, inventory)
- **ACTION**: CREATE minimal test data
- **EXAMPLE**:
```python
def setUp(self):
    """Set up custom test data."""
    TestExample.client.drop_database("test_database")
    database = TestExample.client["test_database"]
    collection = database["testcoll"]

    test_data = [
        {
            "name": "Test Item",
            "price": 29.99,
            "test_marker": "automated_example_data"
        }
    ]
    collection.insert_many(test_data)
```

**Complex Related Data**
- **DETECTION**: Multi-collection relationships, business logic dependencies
- **ACTION**: ESCALATE with analysis
- **LOG**: "Complex data relationships detected across [N] collections - need guidance"
- **ASK**: "Should I create simplified test data or flag for manual setup?"

### Runtime & Virtual Environment Issues

**Import Errors**
- **ACTION**: ESCALATE immediately
- **PROVIDE**: Exact error message, file location, failing import
- **ASK**: "Import failed: [error]. Should I check venv activation or need human review?"

**Virtual Environment Not Activated**
- **ACTION**: LOG details and provide activation instructions
- **STEPS**: Document that `source ./venv/bin/activate` is required before all Python operations
- **LOG**: "Virtual environment activation required - all Python operations must happen in activated venv"

**Tests Pass But Output Doesn't Match**
- **ACTION**: ANALYZE and adapt
- **CHECK**: Ignored fields (add to ignore_field_values), ellipsis patterns, structural differences
- **ESCALATE**: If structural differences found with comparison details

### File System & Structure Issues

**Referenced Files Don't Exist**
- **ACTION**: SEARCH and adapt
- **STEPS**: Look in same directory/version, check for file moves, document changes
- **ESCALATE**: If no alternatives found: "Referenced file missing: [path]"

**Complex Nested Includes**
- **ACTION**: SIMPLIFY and document
- **STEPS**: Extract Python code only, flatten structure, preserve non-Python content
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
| Import errors | | ✅ | ✅ | |
| Venv not activated | | ✅ | Persistent failures | |
| Connection issues | | ✅ | Persistent failures | ✅ (3x) |
| File not found | | ✅ | No alternatives | |
| Version conflicts | | ✅ | ✅ | |

**SKIP when**: External dependencies unavailable, non-functional by design
**LOG when**: Making adaptations, encountering recoverable errors
**ESCALATE when**: Import errors, structural decisions, version issues
**RETRY when**: Network issues, temporary constraints, race conditions

## Advanced Patterns

### Multi-Step Operations
For complex tutorials requiring multiple operations:

```python
def load_sample_data(connection_string):
    """Load custom test data - separate function."""
    client = MongoClient(connection_string)

    try:
        database = client["agg_tutorials_db"]
        collection = database["testcoll"]

        # For sample data modifications, use identifiable markers:
        test_data = [
            {
                "title": "Test Movie",
                "test_marker": "cleanup_needed",      # Identifiable marker for cleanup
                "test_run_id": int(time.time())       # Unique per test run
            }
        ]
        collection.insert_many(test_data)
    finally:
        client.close()

def run_tutorial_example(connection_string):
    """Demonstrate the main operation."""
    client = MongoClient(connection_string)

    try:
        database = client["agg_tutorials_db"]
        collection = database["testcoll"]

        pipeline = [
            {"$match": {"title": "Test Movie"}}
        ]

        result = list(collection.aggregate(pipeline))
        return result
    finally:
        client.close()

# In test:
def test_complex_tutorial_example(self):
    """Test complex tutorial example."""
    print("----------Test complex tutorial example----------")

    # Setup
    load_sample_data(TestTutorial.CONNECTION_STRING)

    # Main operation
    result = run_tutorial_example(TestTutorial.CONNECTION_STRING)

    # Cleanup is handled automatically by tearDown if using custom database
    # For sample data modifications, manual cleanup in tearDown:
    # collection.delete_many({"test_marker": "cleanup_needed"})

    # Validation
    self.assertIsInstance(result, list)
    self.assertGreater(len(result), 0)

    print("----------Test complete----------")
```

### Sample Data Modification Patterns
When examples modify sample databases, use identifiable markers for cleanup:

```python
def add_movie_example(connection_string):
    """Example that adds data to sample database."""
    client = MongoClient(connection_string)

    try:
        database = client["sample_mflix"]
        collection = database["movies"]

        new_document = {
            "title": "New Movie",
            "test_run_id": int(time.time()),    # Unique per test run
            "added_by_test": True               # Cleanup marker
        }

        result = collection.insert_one(new_document)
        return result.inserted_id
    finally:
        client.close()

# In test cleanup:
def tearDown(self):
    """Clean up test modifications."""
    if TestExample.client:
        database = TestExample.client["sample_mflix"]
        collection = database["movies"]

        # Remove any documents added during test
        collection.delete_many({"added_by_test": True})

        # Revert any field modifications
        collection.update_many(
            {"modified_by_test": True},
            {"$unset": {"modified_by_test": 1, "temp_field": 1}}
        )
```

### Custom Comparison Options
When working with complex output validation:

```python
from utils.comparison.comparison import ComparisonOptions

def test_with_custom_comparison(self):
    """Test with custom comparison options."""
    result = example.run_complex_query(TestExample.CONNECTION_STRING)

    # Configure comparison options
    options = ComparisonOptions(
        comparison_type="unordered",  # Arrays can be in any order
        ignore_field_values={"_id", "timestamp"},  # Ignore variable fields
        timeout_seconds=30  # Custom timeout for large result sets
    )

    output_filepath = "examples/complex/complex-query-output.txt"
    assert_expected_file_matches_output(self, output_filepath, result, options)
```

## 🎪 Critical Reminders

**When in Doubt:**
1. **PRESERVE functionality** over perfection
2. **DOCUMENT decisions** in logs and comments
3. **ESCALATE complex scenarios** rather than guess
4. **SKIP gracefully** rather than break the pipeline
5. **TEST everything** before declaring success

**Key Patterns to Remember:**
- **ALWAYS activate venv** before any Python operations
- Pass connection strings as parameters, show `"<connection string URI>"` in docs
- Ellipsis in output files OR ignore_field_values (never both for same field)
- MongoDB sample data: revert changes, don't drop databases
- Custom data: drop custom DB in tearDown, or if adding custom data to MongoDB sample data, use test_marker fields for cleanup
- Create `__init__.py` files in new test directories for proper test discovery

**Virtual Environment Checklist:**
- [ ] `source ./venv/bin/activate` before all Python operations
- [ ] `which python` points to venv directory
- [ ] `pip install -r requirements.txt` if dependencies missing
- [ ] All test execution happens within activated venv

This framework ensures consistent, reliable automation while providing clear escalation paths for complex scenarios, with special attention to Python's virtual environment requirements.
