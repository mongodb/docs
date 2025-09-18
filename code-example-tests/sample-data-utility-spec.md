# Sample Data Utility Specification

## Overview

The Sample Data Utility is a cross-language testing library that provides consistent functionality for checking MongoDB sample database availability and conditionally skipping tests when required sample data is missing. This specification defines the requirements for implementing this utility across different programming languages.

## Core Requirements

### 1. Sample Database Registry

The utility must maintain a registry of standard MongoDB sample databases and their expected collections:

```
sample_mflix: [movies, theaters, users, comments, sessions]
sample_restaurants: [restaurants, neighborhoods]
sample_training: [posts, companies, inspections, routes, trips, grades, zips]
sample_analytics: [customers, accounts, transactions]
sample_airbnb: [listingsAndReviews]
sample_geospatial: [shipwrecks]
sample_guides: [planets, comets]
sample_stores: [sales]
sample_supplies: [sales]
sample_weatherdata: [data]
```

### 2. Connection Management

#### Environment Configuration
- **Primary**: Read connection string from `CONNECTION_STRING` environment variable
- **Fallback**: Support for `.env` file loading where language ecosystem supports it
- **Testing Override**: Provide mechanism to override connection string for testing purposes

#### Connection Settings
- **Timeouts**: Use short timeouts (2 seconds) for server selection, connection, and socket operations
- **Graceful Degradation**: Handle connection failures gracefully without breaking test execution
- **Resource Management**: Properly close connections and clean up resources

### 3. Caching System

#### Cache Structure
- **Database Availability**: Cache results of database existence checks
- **Collection Availability**: Cache results of collection existence checks within databases
- **Cache Keys**: Use composite keys for database + specific collections when applicable
- **Thread Safety**: Ensure cache operations are thread-safe

#### Cache Management
- **Cache Clearing**: Provide method to clear all cached results
- **Cache Invalidation**: Consider implementing TTL or manual invalidation strategies

### 4. Availability Checking

#### Core Check Methods

**Single Database Check**
- Input: Database name, optional array of required collections
- Output: Boolean indicating availability
- Behavior: 
  - Check database existence
  - If collections specified, verify all exist
  - If no collections specified, use default collections from registry
  - Cache results for performance

**Multiple Database Check**
- Input: Array of database names, optional mapping of database → required collections
- Output: Structured result containing:
  - Overall availability (boolean)
  - List of missing databases
  - List of available databases
- Behavior: Check all databases concurrently where possible

**Available Databases Query**
- Input: None (checks all standard sample databases)
- Output: List of available database names
- Behavior: Check all registered sample databases and return those available

#### Error Handling
- **Connection Errors**: Log minimally or silently, return false for availability
- **Timeout Errors**: Treat as unavailable, don't fail test execution
- **Invalid Configurations**: Provide clear error messages for missing connection strings

### 5. Summary Reporting

#### Display Requirements
- **Single Execution**: Show summary only once per test run
- **Thread Safety**: Use appropriate synchronization for single-execution guarantee
- **Conditional Display**: Show different messages based on availability status

#### Content Requirements

**No Sample Data Available**
```
📊 Sample Data Status: No MongoDB sample databases found
   Some tests may be skipped. To load sample data:
   • Atlas: https://www.mongodb.com/docs/atlas/sample-data/
   • Local: Use mongorestore with sample data archive
```

**Some Sample Data Available**
```
📊 Sample Data Status: X database(s) available
   Found: database1, database2, database3
```

**Error Cases**: Silently handle errors in summary generation to avoid breaking tests

### 6. Test Integration Framework

#### Annotation/Decorator Support
- **Single Database**: Mark tests requiring one sample database
- **Multiple Databases**: Mark tests requiring multiple sample databases
- **Custom Collections**: Specify non-default collections for a database
- **Method and Class Level**: Support annotations at both test method and test class levels

#### Test Helper Methods
- **Direct Skip Check**: Programmatic method to check and skip if data unavailable
- **Multiple Database Support**: Helper methods for tests requiring multiple databases
- **Flexible Parameters**: Support both single database and multiple database scenarios

#### Integration Behavior
- **Test Skipping**: Use framework-appropriate test skipping mechanisms
- **Clear Messages**: Provide informative skip messages indicating what data is missing
- **Summary Integration**: Ensure summary is shown before any tests are skipped

### 7. Language-Specific Considerations

#### Dependency Management
- **Minimal Dependencies**: Use only essential external dependencies
- **Environment Loading**: Use language-appropriate environment variable loading
- **Testing Framework**: Integrate with dominant testing frameworks for the language

#### Async/Concurrency Support
- **Async Operations**: Use language-appropriate async patterns for database operations
- **Concurrent Checks**: Implement concurrent database checking where language supports it
- **Thread Safety**: Ensure all shared state is properly synchronized

#### Error Handling Patterns
- **Language Idioms**: Use language-appropriate error handling (exceptions, Result types, etc.)
- **Graceful Degradation**: Never cause test failures due to utility errors
- **Logging**: Use language-appropriate logging mechanisms

## Implementation Patterns

### Class/Module Structure

**Core Checker Class/Module**
- Static/singleton pattern for global state management
- Methods for single and multiple database checking
- Cache management and clearing methods
- Summary display functionality

**Test Integration Components**
- Annotation/attribute classes for marking test requirements
- Extension/plugin classes for framework integration
- Helper classes for programmatic usage

**Data Structures**
- Registry of standard sample databases
- Cache storage (thread-safe)
- Result objects for complex return values

### Method Signatures (Pseudo-code)

```
// Core checking methods
checkSampleDataAvailable(databaseName: String, requiredCollections?: String[]): Boolean
checkMultipleSampleDatabases(databases: String[], collectionsPerDatabase?: Map<String, String[]>): AvailabilityResult
getAvailableSampleDatabases(): String[]

// Cache management
clearSampleDataCache(): Void

// Summary display
showSampleDataSummary(): Void (async where appropriate)

// Test helpers
ensureSampleDataOrSkip(database: String, collections?: String[]): Void
ensureSampleDataOrSkip(databases: String[], collectionsPerDatabase?: Map<String, String[]>): Void
```

### Configuration Patterns

**Environment Variable Loading**
```
Primary: System environment variable "CONNECTION_STRING"
Secondary: .env file in current or parent directories (where supported)
Override: Test-specific connection string override mechanism
```

**Timeout Configuration**
```
Server Selection: 2000ms
Connection: 2000ms
Socket Operations: 2000ms
```

## Quality Requirements

### Performance
- **Caching**: All database/collection checks should be cached
- **Concurrency**: Multiple database checks should run concurrently
- **Minimal Overhead**: Summary display should have minimal performance impact

### Reliability
- **Error Resilience**: Never cause test failures due to utility errors
- **Connection Handling**: Properly handle connection timeouts and failures
- **Resource Cleanup**: Ensure proper cleanup of database connections

### Usability
- **Clear Documentation**: Provide examples for all major usage patterns
- **Helpful Messages**: Provide actionable error messages and skip reasons
- **Framework Integration**: Seamless integration with testing frameworks

### Maintainability
- **Standard Patterns**: Use language-idiomatic patterns and conventions
- **Minimal Complexity**: Keep implementation as simple as possible
- **Clear Separation**: Separate concerns between checking, caching, and test integration

## Testing Requirements

### Unit Tests
- **Mocked Connections**: Test behavior with mocked MongoDB connections
- **Cache Behavior**: Verify caching works correctly
- **Error Conditions**: Test behavior with connection failures
- **Thread Safety**: Test concurrent usage patterns

### Integration Tests
- **Real Database**: Test with actual MongoDB instance when available
- **Missing Data**: Test behavior when sample data is not available
- **Framework Integration**: Test annotation/extension behavior
- **Environment Loading**: Test environment variable and .env file loading

### Example Usage Patterns

**Annotation Usage**
```
@RequiresSampleData("sample_mflix")
test_movie_queries()

@RequiresSampleData(["sample_mflix", "sample_restaurants"])
test_cross_database_queries()

@RequiresSampleData("sample_mflix", collections=["movies", "theaters"])
test_specific_collections()
```

**Programmatic Usage**
```
ensureSampleDataOrSkip("sample_mflix")
ensureSampleDataOrSkip("sample_mflix", ["movies", "theaters"])
ensureSampleDataOrSkip(["sample_mflix", "sample_restaurants"])
```

**Availability Checking**
```
if (checkSampleDataAvailable("sample_mflix")) {
    // Run test logic
}

availableDbs = getAvailableSampleDatabases()
result = checkMultipleSampleDatabases(["sample_mflix", "sample_restaurants"])
```