# MongoDB Sample Data Utility

This utility provides a consistent way to check MongoDB sample database availability and conditionally skip tests when required sample data is missing. It's designed specifically for the MongoDB PyMongo Driver code example test suite.

## Features

- **Sample Database Registry**: Maintains a registry of standard MongoDB sample databases and their expected collections
- **Connection Management**: Handles MongoDB connections with appropriate timeouts and graceful error handling
- **Thread-Safe Caching**: Caches database and collection availability checks for performance
- **Test Integration**: Provides decorators and helpers for seamless `unittest` integration
- **Summary Reporting**: Shows sample data status once per test run
- **Graceful Error Handling**: Never breaks test execution due to connection issues

## Installation

The utility is included as part of the PyMongo code example test suite. Make sure you have the required dependencies:

```bash
pip install pymongo python-dotenv
```

## Quick Start

### 1. Basic Usage with Decorator

```python
import unittest
from utils.sample_data import requires_sample_data

class TestMovieQueries(unittest.TestCase):

    @requires_sample_data("sample_mflix")
    def test_find_movies(self):
        # This test will be skipped if sample_mflix database is not available
        # Your test implementation here
        pass

    @requires_sample_data("sample_mflix", collections=["movies", "theaters"])
    def test_specific_collections(self):
        # This test requires specific collections to be present
        # Your test implementation here
        pass

    @requires_sample_data(["sample_mflix", "sample_restaurants"])
    def test_multiple_databases(self):
        # This test requires multiple sample databases
        # Your test implementation here
        pass
```

### 2. Programmatic Usage

```python
import unittest
from utils.sample_data import ensure_sample_data_or_skip, check_sample_data_available

class TestRestaurantQueries(unittest.TestCase):

    def test_restaurant_search(self):
        # Check availability programmatically
        ensure_sample_data_or_skip("sample_restaurants")

        # Your test implementation here
        pass

    def test_conditional_logic(self):
        # Check without skipping for conditional test logic
        if check_sample_data_available("sample_mflix"):
            # Run movie-related tests
            pass
        else:
            # Run alternative tests or mock data
            pass
```

### 3. Using the Mixin Class

```python
import unittest
from utils.sample_data import RequiresSampleDataMixin

class TestAnalytics(unittest.TestCase, RequiresSampleDataMixin):

    def test_customer_analysis(self):
        # Use mixin methods
        self.ensure_sample_data("sample_analytics", ["customers", "accounts"])

        # Your test implementation here
        pass

    def test_check_available_data(self):
        available_dbs = self.get_available_sample_databases()
        self.assertGreater(len(available_dbs), 0, "No sample databases available")
```

## Configuration

### Connection String

The utility uses the same connection string configuration as the existing test suite:

- **Environment Variable**: Set `CONNECTION_STRING` environment variable
- **`.env` File**: Create a `.env` file in the project root with:
   ```
   CONNECTION_STRING=mongodb://your-connection-string
   ```

Example `.env` file:
```bash
# Local MongoDB
CONNECTION_STRING=mongodb://localhost:27017

# MongoDB Atlas
CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/

# MongoDB with authentication
CONNECTION_STRING=mongodb://username:password@localhost:27017/admin
```

## Sample Database Registry

The utility recognizes these standard MongoDB sample databases:

| Database | Collections |
|----------|-------------|
| `sample_mflix` | movies, theaters, users, comments, sessions |
| `sample_restaurants` | restaurants, neighborhoods |
| `sample_training` | posts, companies, inspections, routes, trips, grades, zips |
| `sample_analytics` | customers, accounts, transactions |
| `sample_airbnb` | listingsAndReviews |
| `sample_geospatial` | shipwrecks |
| `sample_guides` | planets, comets |
| `sample_stores` | sales |
| `sample_supplies` | sales |
| `sample_weatherdata` | data |

## API Reference

### Decorators

#### `@requires_sample_data(database_or_databases, collections=None, collections_per_database=None)`

Decorator to mark tests that require specific sample databases and collections.

**Parameters:**
- `database_or_databases`: Single database name (str) or list of database names (List[str])
- `collections`: Required collections for single database (Optional[List[str]])
- `collections_per_database`: Collections per database for multiple databases (Optional[Dict[str, List[str]]])

**Examples:**
```python
@requires_sample_data("sample_mflix")
@requires_sample_data("sample_mflix", collections=["movies", "theaters"])
@requires_sample_data(["sample_mflix", "sample_restaurants"])
@requires_sample_data(
    ["sample_mflix", "sample_restaurants"],
    collections_per_database={
        "sample_mflix": ["movies", "theaters"],
        "sample_restaurants": ["restaurants"]
    }
)
```

### Core Functions

#### `check_sample_data_available(database_name, required_collections=None) -> bool`

Check if a sample database and its collections are available.

**Parameters:**
- `database_name` (str): Name of the sample database
- `required_collections` (Optional[List[str]]): List of required collections. If None, uses default collections from registry.

**Returns:** `bool` - True if database and all required collections are available

#### `ensure_sample_data_or_skip(database_name, collections=None)`

Ensure sample data is available or skip the current test.

**Parameters:**
- `database_name` (str): Name of the sample database
- `collections` (Optional[List[str]]): List of required collections

**Raises:** `unittest.SkipTest` if sample data is not available

#### `get_available_sample_databases() -> List[str]`

Get list of available sample databases.

**Returns:** `List[str]` - List of available sample database names

#### `clear_sample_data_cache()`

Clear the sample data availability cache. Useful for testing or when database state changes.

### Multiple Database Functions

#### `check_multiple_sample_databases(databases, collections_per_database=None) -> Dict`

Check multiple sample databases for availability.

**Parameters:**
- `databases` (List[str]): List of database names to check
- `collections_per_database` (Optional[Dict[str, List[str]]]): Mapping of database to required collections

**Returns:** Dict containing:
- `overall_available` (bool): True if all databases are available
- `available_databases` (List[str]): List of available databases
- `missing_databases` (List[str]): List of missing databases
- `total_checked` (int): Total number of databases checked
- `available_count` (int): Number of available databases

#### `ensure_multiple_sample_data_or_skip(databases, collections_per_database=None)`

Ensure multiple sample databases are available or skip the current test.

**Parameters:**
- `databases` (List[str]): List of database names to check
- `collections_per_database` (Optional[Dict[str, List[str]]]): Mapping of database to required collections

**Raises:** `unittest.SkipTest` if any required sample data is not available

### Mixin Class

#### `RequiresSampleDataMixin`

Mixin class that provides sample data checking methods to test classes.

**Methods:**
- `ensure_sample_data(database_name, collections=None)`
- `ensure_multiple_sample_data(databases, collections_per_database=None)`
- `check_sample_data_available(database_name, collections=None) -> bool`
- `get_available_sample_databases() -> List[str]`

## Sample Data Summary

The utility automatically displays a summary of sample data availability once per test run:

**When no sample data is available:**
```
📊 Sample Data Status: No MongoDB sample databases found
   Some tests may be skipped. To load sample data:
   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/
   • Local: Use mongorestore with sample data archive
```

**When sample data is available:**
```
📊 Sample Data Status: 3 database(s) available
   Found: sample_mflix, sample_restaurants, sample_training
```

## Error Handling

The utility is designed to be robust and never break test execution:

- **Connection Failures**: Gracefully handled, tests are skipped with informative messages
- **Timeout Errors**: Treated as unavailable data, tests continue
- **Invalid Configurations**: Clear error messages provided
- **Missing Connection String**: Tests are skipped, no crashes

## Testing the Utility

The utility includes comprehensive tests:

```bash
# Run all utility tests
python -m unittest discover -s utils/sample_data/tests -v

# Run specific test modules
python -m unittest utils.sample_data.tests.test_registry -v
python -m unittest utils.sample_data.tests.test_cache -v
python -m unittest utils.sample_data.tests.test_checker -v
python -m unittest utils.sample_data.tests.test_decorators -v

# Run integration tests (requires MongoDB connection)
python -m unittest utils.sample_data.tests.test_integration -v
```

## Advanced Usage

### Custom Collection Requirements

```python
@requires_sample_data("sample_mflix", collections=["movies", "theaters"])
def test_movie_theater_relationships(self):
    # Test that requires specific collections beyond the defaults
    pass
```

### Multiple Databases with Specific Collections

```python
@requires_sample_data(
    ["sample_mflix", "sample_restaurants"],
    collections_per_database={
        "sample_mflix": ["movies"],
        "sample_restaurants": ["restaurants", "neighborhoods"]
    }
)
def test_cross_database_functionality(self):
    # Test that uses data from multiple databases
    pass
```

### Conditional Test Logic

```python
def test_adaptive_behavior(self):
    available_dbs = get_available_sample_databases()

    if "sample_mflix" in available_dbs:
        # Use real movie data
        self._test_with_real_data()
    else:
        # Use mock data
        self._test_with_mock_data()
```

### Cache Management

```python
def test_with_fresh_cache(self):
    # Clear cache to ensure fresh database checks
    clear_sample_data_cache()

    # Your test implementation
    pass
```

## Troubleshooting

### Tests Being Skipped

If tests are being skipped unexpectedly:

1. **Check Connection String**: Ensure `CONNECTION_STRING` environment variable is set correctly
2. **Verify Sample Data**: Confirm sample databases are loaded in your MongoDB instance
3. **Check Collections**: Verify that required collections exist in the sample databases
4. **Test Connection**: Use MongoDB Compass or mongosh to verify connectivity

### Performance Issues

If tests are running slowly:

1. **Check Timeouts**: The utility uses 2-second timeouts, but network issues can cause delays
2. **Clear Cache**: Use `clear_sample_data_cache()` if you suspect caching issues
3. **Verify Network**: Ensure stable connection to MongoDB instance

### Import Errors

If you encounter import errors:

```python
# Make sure to import from the correct path
from utils.sample_data import requires_sample_data, ensure_sample_data_or_skip

# For mixin usage
from utils.sample_data import RequiresSampleDataMixin
```

## Adding New Sample Databases to Utility

When adding new sample databases to the registry:

1. Update `SAMPLE_DATABASES` in `utils/sample_data/registry.py`
2. Add corresponding tests
3. Update this documentation

## License

This utility is part of the MongoDB documentation project and follows the same licensing terms.
