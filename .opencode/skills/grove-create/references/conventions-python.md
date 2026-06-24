# Python (PyMongo) — Grove Conventions

<!-- canary:3691fdd1 -->

## Directory Structure

```
code-example-tests/python/pymongo/
├── examples/                          # Code examples
│   ├── example_stub.py                # Template (do not modify)
│   ├── __init__.py
│   └── topic/subtopic/
│       ├── __init__.py
│       ├── your_example.py
│       └── your-example-output.txt    # Optional expected output
├── tests_package/                     # Tests (NOT "tests" — reserved in Python)
│   ├── __init__.py
│   └── topic/subtopic/
│       ├── __init__.py
│       └── test_your_topic.py
├── utils/
│   ├── comparison/                    # Comparison library
│   └── sample_data/                   # Sample data utilities
├── requirements.txt
├── snip.js
└── .env                               # CONNECTION_STRING (not committed)
```

## Example File Pattern

```python
from pymongo import MongoClient


def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    some_db = client["your_db_name"]

    try:
        # :snippet-start: your-snippet-name
        collection = some_db["your_collection"]

        # Your MongoDB operation here
        result = collection.find_one({"field": "value"})
        print(result)

        # :snippet-end:

        return result  # :remove:

    finally:
        client.close()
```

### Example file conventions

- Function is named `example` (or descriptive name) and takes `CONNECTION_STRING`
  as a parameter.
- Use `try/finally` to ensure `client.close()` is called.
- Use `# :remove:` on single lines, or `# :remove-start:` / `# :remove-end:`
  for blocks that should not appear in docs output.
- Return values are for test validation; mark with `# :remove:` if the return
  is not part of the example.
- File naming: `snake_case.py`
- Snippet names: `lowercase-kebab-case`

## Test File Pattern

```python
import unittest
import examples.topic.subtopic.your_example as your_example
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from utils.comparison import Expect


class TestYourTopic(unittest.TestCase):
    CONNECTION_STRING = None
    client = None

    @classmethod
    def setUpClass(cls):
        load_dotenv()
        TestYourTopic.CONNECTION_STRING = os.getenv("CONNECTION_STRING")

        if TestYourTopic.CONNECTION_STRING is None:
            raise Exception(
                "Could not retrieve CONNECTION_STRING - make sure you have created "
                "the .env file at the root of the PyMongo directory and the variable "
                "is correctly named as CONNECTION_STRING."
            )
        try:
            TestYourTopic.client = MongoClient(TestYourTopic.CONNECTION_STRING)
        except:
            raise Exception(
                "CONNECTION_STRING invalid - make sure your connection string in "
                "your .env file matches the one for your MongoDB deployment."
            )

    def setUp(self):
        TestYourTopic.client.drop_database("your_db_name")

    def test_your_example(self):
        """Test that example produces expected output"""
        actual_output = your_example.example(TestYourTopic.CONNECTION_STRING)
        output_filepath = "examples/topic/subtopic/your-example-output.txt"
        Expect.that(actual_output).should_match(output_filepath)

    @classmethod
    def tearDownClass(cls):
        TestYourTopic.client.close()
```

### Test file conventions

- Test framework: `unittest`
- Test file naming: `test_your_topic.py`
- Class naming: `TestYourTopic(unittest.TestCase)`
- `setUpClass` — load env, create client (once per file)
- `setUp` — drop database (before each test)
- `tearDownClass` — close client
- Import path: `import examples.topic.subtopic.module as module`
- Every new directory needs an `__init__.py` file

## Sample Data

```python
from utils.sample_data import requires_sample_data

@requires_sample_data("sample_mflix")
def test_find_movies(self):
    pass

@requires_sample_data("sample_mflix", collections=["movies", "theaters"])
def test_specific_collections(self):
    pass

@requires_sample_data(["sample_mflix", "sample_restaurants"])
def test_multiple_databases(self):
    pass
```

## Running Tests

```bash
cd code-example-tests/python/pymongo
python3 -m venv venv                                    # First time only
./venv/bin/pip install -r requirements.txt              # First time only
./venv/bin/python -m unittest discover tests_package
```

Use `./venv/bin/pip` and `./venv/bin/python` directly instead of
`source venv/bin/activate`, which is shell-specific and may not work in
all environments.

Run a single test:
```bash
./venv/bin/python -m unittest tests_package/topic/subtopic/test_your_topic.py -k test_your_example
```

## Snipping

```bash
node snip.js
```

Output lands in: `content/code-examples/tested/python/pymongo/topic/subtopic/`

Snippet filenames: `your_example.snippet.your-snippet-name.py`

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/python/pymongo/topic/subtopic/your_example.snippet.your-snippet-name.py
   :language: python
   :copyable: true
```

## Comparison API

```python
from utils.comparison import Expect

Expect.that(actual_output).should_match(output_filepath)
Expect.that(actual_output).with_ordered_sort().should_match(output_filepath)
Expect.that(actual_output).with_ignored_fields("_id", "timestamp").should_match(output_filepath)
Expect.that(actual_output).should_resemble(expected_output).with_schema({
    'count': 20,
    'required_fields': ['_id', 'title', 'year'],
    'field_values': {'year': 2012}
})
```

**Methods**: `that()`, `with_ignored_fields()`, `with_ordered_sort()`,
`with_unordered_sort()`, `should_match()`, `should_resemble()`, `with_schema()`

### When to Use Each Method

| Scenario | Method |
|----------|--------|
| Output stored in a file | `should_match(filepath)` |
| Output compared to an inline object | `should_match(object)` |
| Output order matters (sorted results) | `.with_ordered_sort().should_match(...)` |
| Fields have dynamic values (_id, dates) | `.with_ignored_fields("_id", ...).should_match(...)` |
| Highly variable output, validate structure only | `.should_resemble(expected).with_schema({...})` |

### Ellipsis Patterns in Expected Output Files

The comparison library automatically detects these patterns in expected output:

- `"..."` — Matches any value for a key
- `"prefix..."` — Matches a string that starts with "prefix"
- `["..."]` — Matches any array
- Standalone `...` on its own line — Allows any number of additional fields
- `{ ... }` — Matches any object

### Schema Validation Options

Used with `should_resemble()`:

- `count` (required): Expected number of documents (non-negative integer)
- `required_fields` (optional): Field names that must exist in every document
- `field_values` (optional): Field name/value pairs that must match exactly

`should_resemble()` is mutually exclusive with `should_match()` and
incompatible with `with_ignored_fields()`, `with_ordered_sort()`, and
`with_unordered_sort()`.
