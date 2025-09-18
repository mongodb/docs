# MongoDB Sample Data Utility for Java

A comprehensive utility for checking MongoDB sample data availability and conditionally skipping tests when required sample data is missing. This utility provides clear feedback about what's missing and how to fix it.

## Features

- **Automatic Test Skipping**: Skip tests when required sample data is not available
- **Multiple Database Support**: Check availability of multiple sample databases
- **Collection Verification**: Verify specific collections within databases
- **Concurrent Checking**: Efficient concurrent database availability checking
- **Comprehensive Caching**: Cache results to avoid repeated database queries

## Quick Start

### 1. Add to Your Project

Add the sample data utility as a dependency in your project.

### 2. Set Connection String

Set the `CONNECTION_STRING` environment variable with your MongoDB connection string:

```bash
export CONNECTION_STRING="mongodb://localhost:27017"
# or for Atlas:
export CONNECTION_STRING="mongodb+srv://username:password@cluster.mongodb.net/"
```

### 3. Use in your Tests

#### Use Annotations (Recommended)

```java
import sampledatautil.RequiresSampleData;
import org.junit.jupiter.api.Test;

public class MovieAnalysisTest {
    
    // Test requiring a single database
    @Test
    @RequiresSampleData("sample_mflix")
    public void testMovieQueries() {
        // This test will only run if sample_mflix database is available
        // Test code here...
    }
    
    // Test requiring multiple databases
    @Test
    @RequiresSampleData({"sample_mflix", "sample_restaurants"})
    public void testCrossDatabaseAnalysis() {
        // This test will only run if both databases are available
        // Test code here...
    }
    
    // Test requiring specific collections
    @Test
    @RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
    public void testSpecificCollections() {
        // This test will only run if sample_mflix has movies and theaters collections
        // Test code here...
    }
}
```

#### Use Programmatic Helpers

```java
import sampledatautil.SampleDataTestHelper;
import org.junit.jupiter.api.Test;

public class DataAnalysisTest {
    
    @Test
    public void testMovieData() {
        // Check single database
        SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
        
        // Test code here...
    }
    
    @Test
    public void testMovieDataWithCollections() {
        // Check database with specific collections
        SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix", "movies", "theaters");
        
        // Test code here...
    }
    
    @Test
    public void testMultipleDatabases() {
        // Check multiple databases
        List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
        SampleDataTestHelper.ensureSampleDataOrSkip(databases);
        
        // Test code here...
    }
}
```

## Standard Sample Databases

The utility knows about these standard MongoDB sample databases:

- **sample_mflix**: Movies, theaters, users, comments, sessions
- **sample_restaurants**: Restaurants, neighborhoods  
- **sample_training**: Posts, companies, inspections, routes, trips, grades, zips
- **sample_analytics**: Customers, accounts, transactions
- **sample_airbnb**: Listings and reviews
- **sample_geospatial**: Shipwrecks
- **sample_guides**: Planets, comets
- **sample_stores**: Sales data
- **sample_supplies**: Sales data
- **sample_weatherdata**: Weather data

## Advanced Usage

### Direct Availability Checking

```java
import sampledatautil.SampleDataChecker;
import sampledatautil.SampleDataAvailability;

// Check if a database is available
boolean isAvailable = SampleDataChecker.checkSampleDataAvailable("sample_mflix");

// Check database with specific collections
List<String> collections = Arrays.asList("movies", "theaters");
boolean hasCollections = SampleDataChecker.checkSampleDataAvailable("sample_mflix", collections);

// Check multiple databases
List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
SampleDataAvailability result = SampleDataChecker.checkMultipleSampleDatabases(databases);

if (result.isAvailable()) {
    System.out.println("All databases available: " + result.getAvailableDatabases());
} else {
    System.out.println("Missing databases: " + result.getMissingDatabases());
}

// Get all available sample databases
List<String> available = SampleDataChecker.getAvailableSampleDatabases();
System.out.println("Available sample databases: " + available);
```

### Complex Collection Requirements

```java
// Check multiple databases with different collection requirements
List<String> databases = Arrays.asList("sample_mflix", "sample_restaurants");
Map<String, List<String>> collectionsPerDatabase = Map.of(
    "sample_mflix", Arrays.asList("movies", "theaters"),
    "sample_restaurants", Arrays.asList("restaurants")
);

SampleDataAvailability result = SampleDataChecker.checkMultipleSampleDatabases(
    databases, collectionsPerDatabase);
```

### Cache Management

```java
// Clear the cache if sample data availability changes
SampleDataChecker.clearSampleDataCache();
```

### Testing Override

```java
// For testing: override connection string
SampleDataChecker.setConnectionStringOverride("mongodb://test-server:27017");

// Clear override to use environment variable
SampleDataChecker.setConnectionStringOverride(null);
```

## Annotation Reference

### @RequiresSampleData

Marks tests as requiring specific sample data. The extension will automatically skip tests when required data is not available.

#### Attributes

- **value**: Array of database names (takes precedence over `database`)
- **database**: Single database name (for backward compatibility)
- **collections**: Array of collection names required in the database(s)

#### Examples

```java
// Single database
@RequiresSampleData("sample_mflix")

// Multiple databases  
@RequiresSampleData({"sample_mflix", "sample_restaurants"})

// Database with specific collections
@RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
```

## Sample Data Summary

The utility automatically shows a helpful summary when tests run:

```
📊 Sample Data Status: 3 database(s) available
   Found: sample_mflix, sample_restaurants, sample_training
```

Or when no data is available:

```
📊 Sample Data Status: No MongoDB sample databases found
   Some tests may be skipped. To load sample data:
   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/
   • Local: Use mongorestore with sample data archive
```

## Error Handling

The utility gracefully handles connection errors and missing data:

- **Connection Failures**: Returns `false` for availability checks, doesn't break test runs
- **Missing Databases**: Tests are skipped with clear messages
- **Invalid Configuration**: Clear error messages for missing connection strings
- **Timeout Handling**: Uses short timeouts (2 seconds) to avoid hanging tests

## Loading Sample Data

### MongoDB Atlas UI

1. Go to your Atlas cluster
2. Click "..." → "Load Sample Dataset"
3. Wait for data to load (usually takes a few minutes)

### Local MongoDB

**Prerequisites:**

- Install [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/installation/)
- Ensure MongoDB server is running and accessible

Download and restore sample data archives from MongoDB's official sources:

1. Run the following command to download the latest sample data archive:

   ```shell
   curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
   ```

2. Restore the archive using `mongorestore`:

   ```shell
   mongorestore --archive=sampledata.archive --drop
   ```

## Configuration

### Environment Variables

- **CONNECTION_STRING**: MongoDB connection string (required)

### Connection Settings

The utility uses optimized settings for testing:
- Server selection timeout: 2 seconds
- Connection timeout: 2 seconds  
- Socket read timeout: 2 seconds

## Adding New Sample Databases to Utility

When adding new sample databases:

1. Update `STANDARD_SAMPLE_DATABASES` in `SampleDataChecker`
2. Add corresponding tests
3. Update documentation

## Troubleshooting

### Tests Always Skip

- Verify `CONNECTION_STRING` environment variable is set
- Check MongoDB server is running and accessible
- Verify sample data is loaded in your MongoDB instance

### Connection Timeouts

- Check network connectivity to MongoDB server
- Verify connection string format
- Ensure MongoDB server is accepting connections

### Cache Issues

- Clear cache with `SampleDataChecker.clearSampleDataCache()`
- Restart test suite to reset cache state

## API Reference

See the JavaDoc comments in the source files for detailed API documentation:

- `SampleDataChecker`: Core functionality for checking sample data availability
- `SampleDataTestHelper`: Programmatic test helpers  
- `RequiresSampleData`: Annotation for marking test requirements
- `SampleDataExtension`: JUnit 5 extension (automatically applied)
- `SampleDataAvailability`: Result object for complex availability checks
