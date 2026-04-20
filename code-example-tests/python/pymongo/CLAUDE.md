# Python (PyMongo) — Grove Conventions

## Project Setup

- Python 3.x with `venv` for dependency isolation
- Key deps: `pymongo` 4.15.3, `python-dotenv` 1.1.1, `pylint` 3.3.7
- Test framework: Python's built-in `unittest` (not pytest)
- Formatter: `black` (line-length 88)
- `.env` file required at this directory root: `CONNECTION_STRING="..."`
- Every new directory under `examples/` and `tests_package/` needs an `__init__.py`

## Example File Pattern

```python
from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        # :snippet-start: your-snippet-name
        some_db = client["your_db_name"]
        collection = some_db["your_collection"]

        result = collection.find_one({"field": "value"})
        print(result)
        # :snippet-end:

        return result  # :remove:
    finally:
        client.close()
```

- **File naming**: `snake_case.py` in `examples/{topic}/{subtopic}/`
- **Function naming**: `def example(CONNECTION_STRING):` — receives connection string as parameter
- **Connection**: `MongoClient(CONNECTION_STRING)` inside the function, not at module level
- **Cleanup**: Always `client.close()` in `finally`
- **Error handling**: For error handling style guidance, refer to
  `content/meta/source/includes/code/guidelines-python.rst`
- **Output**: Use `print()` for output shown in docs; `return` on a `:remove:` line for test validation
- **Bluehawk**: `# :snippet-start: kebab-name` / `# :snippet-end:`; `# :remove:` for single lines
- **Snippet identifiers**: Unique within each file, lowercase kebab-case
- **Template**: `examples/example_stub.py`

### Module-Level Connection Variant

For examples that need state across multiple functions:

```python
import os
from pymongo import MongoClient

client = None
database = None

def some_operation():
    global client, database
    uri = os.getenv("CONNECTION_STRING")
    client = MongoClient(uri)
    database = client["your_db_name"]
    # ... operation code ...

def cleanup():
    global database, client
    try:
        if database is not None:
            database.drop_collection("your_collection")
        if client is not None:
            client.close()
    except Exception:
        pass
```

## Test File Pattern

```python
import unittest
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from utils.comparison import Expect
import examples.topic.your_example as your_example

class TestYourExample(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestYourExample.CONNECTION_STRING = os.getenv("CONNECTION_STRING")
        if TestYourExample.CONNECTION_STRING is None:
            raise Exception("Could not retrieve CONNECTION_STRING")
        try:
            TestYourExample.client = MongoClient(TestYourExample.CONNECTION_STRING)
        except:
            raise Exception("CONNECTION_STRING invalid")

    def setUp(self):
        TestYourExample.client.drop_database("your_db_name")

    def test_should_produce_expected_output(self):
        """Your Example: should produce expected output."""
        result = your_example.example(TestYourExample.CONNECTION_STRING)
        Expect.that(result).should_match("examples/topic/your-example-output.txt")

    @classmethod
    def tearDownClass(cls):
        TestYourExample.client.close()
```

- **File naming**: `test_snake_case.py` in `tests_package/{topic}/`
- **Class naming**: `TestPascalCase` matching the file name
- **Import Expect**: `from utils.comparison import Expect`
- **Setup**: `setUpClass` loads env and creates client; `setUp` drops the test database
- **Teardown**: `tearDownClass` closes the client
- **Do not** drop sample data databases — only drop databases your example created
- **Docstring**: `"Noun phrase: should verb phrase."`
- **`__init__.py`**: Required in every test subdirectory (even if empty)
- **Template**: `tests_package/test_example_stub.py`

## Sample Data

```python
from utils.sample_data import requires_sample_data

@requires_sample_data("sample_mflix")
def test_query_movies(self):
    # test body

@requires_sample_data("sample_mflix", collections=["movies", "theaters"])
def test_specific_collections(self):
    # test body
```

Tests auto-skip when required sample databases are unavailable.

## Expected Output Files

- Place alongside examples: `your-example-output.txt`
- The output file path passed to `should_match()` includes the `examples/` prefix (e.g., `"examples/topic/file-output.txt"`)
- Format matches Python `print()` output (Python repr, not JSON)
- Use ellipsis patterns for dynamic values (see root CLAUDE.md)

## Commands

| Command | Purpose |
|---------|---------|
| `./venv/bin/python -m unittest discover tests_package` | Run all tests |
| `./venv/bin/python -m unittest tests_package/topic/test_file.py` | Run a single test file |
| `./venv/bin/python -m unittest tests_package/topic/test_file.py -k test_name` | Run a single test |
| `black examples/` | Format example files |
| `pylint examples/` | Lint example files |
| `node snip.js` | Extract snippets via Bluehawk |

All commands run from `code-example-tests/python/pymongo/`.

Use `./venv/bin/python` directly instead of `source venv/bin/activate`,
which is shell-specific and may not work in all environments.

### Environment Setup (One-Time)

```bash
python3 -m venv ./venv
./venv/bin/pip install -r requirements.txt
```

## Snippet Output

`node snip.js` extracts to: `content/code-examples/tested/python/pymongo/{topic}/{file}.snippet.{name}.py`

Files to ignore from snipping are listed in `IGNORE_PATTERNS` in `snip.js`.
