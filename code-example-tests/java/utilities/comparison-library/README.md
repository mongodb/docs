# MongoDB Core Comparison Library

A specialized library for validating MongoDB Java Driver output against expected results, specifically for MongoDB documentation and code example testing.

This core library provides robust comparison capabilities, handling the complexities of BSON types and various output formats.

**Note:** Support for reactive streams (`Publisher` types) and all reactive dependencies is in the separate [`comparison-library-reactive`](../comparison-library-reactive/README.md) module. The core library is sync-only and does not depend on any reactive APIs.

## Key Features

- **Sync Driver Support**: Works with MongoDB Sync Java Driver
- **Type Normalization**: Handles BSON types (ObjectId, Decimal128, Date)
- **Flexible Matching**: Supports ellipsis patterns, field exclusion, and array ordering options
- **Format Support**: JSON, Extended JSON, JSONL parsing with automatic format detection
- **Error Reporting**: Detailed comparison results with path-specific error information

## Core API

### Main Entry Points

- `OutputValidator.expect(results)` - For sync collections and objects
- `ComparisonEngine.compare()` - Low-level comparison operations
- `ExpectedOutputParser.parseFile()` - Parse expected output files

For validating results from reactive streams (`Publisher`), use the API in the [`comparison-library-reactive`](../comparison-library-reactive/README.md) module.

### Configuration

```java
OutputValidator.expect(results)
    .withOrderedArrays()           // Maintain array order
    .withUnorderedArrays()         // Ignore array order (default)
    .withIgnoredFields("_id")      // Skip specific fields
```

**Note:** Performance settings (timeout, recursion depth, array size limits) use sensible defaults. Technical writers do not configure these advanced options.

### Validation

```java
// Assert success or throw exception
validator.assertMatches(expectedResults);
validator.assertMatchesFile("expected.json");

// Get detailed result for manual handling
ComparisonResult result = validator.toMatch(expected);
if (!result.isMatch()) {
    System.out.println(result.getErrorMessage());
}
```

### Debug Methods

When tests fail, use debug methods to get detailed diagnostic information:

```java
// Debug methods automatically print detailed error information on failure
validator.assertMatchesWithDebug(expectedResults);        // For object comparison
validator.assertMatchesFileWithDebug("expected.json");    // For file comparison

// Manual debug output
ComparisonResult result = validator.toMatch(expected);
if (!result.isMatch()) {
    result.printDebugInfo();  // Print detailed comparison analysis
}
```

**Debug output includes:**
- Field-by-field comparison details
- Type mismatches and conversion issues
- Path-specific error locations
- Suggestions for fixing common issues
- Performance and memory usage information

## Usage Examples

### Basic Document Validation

```java
List<Document> results = collection.find().into(new ArrayList<>());
OutputValidator.expect(results)
    .assertMatchesFile("expected-documents.json");
```

### Debug-Enabled Testing

Use debug methods during development and troubleshooting:

```java
// File-based comparison with debug output on failure
List<Document> results = collection.find().into(new ArrayList<>());
OutputValidator.expect(results)
    .withIgnoredFields("_id", "timestamp")
    .assertMatchesFileWithDebug("expected-results.json");

// Object-based comparison with debug output on failure
List<Document> expectedResults = List.of(
    Document.parse("{\"name\": \"Alice\", \"status\": \"active\"}"),
    Document.parse("{\"name\": \"Bob\", \"status\": \"inactive\"}")
);

OutputValidator.expect(actualResults)
    .withUnorderedArrays()
    .assertMatchesWithDebug(expectedResults);

// Manual debug analysis for complex scenarios
ComparisonResult result = OutputValidator.expect(complexResults)
    .withIgnoredFields("createdAt", "version")
    .toMatch(expectedComplexResults);

if (!result.isMatch()) {
    System.out.println("=== COMPARISON ANALYSIS ===");
    result.printDebugInfo();

    // Additional custom analysis
    System.out.println("Error count: " + result.errors().size());
    result.errors().forEach(error ->
        System.out.println("Field '" + error.path() + "': " + error.message())
    );
}
```

### Reactive Publisher Validation

For reactive Publisher validation, see the `comparison-library-reactive` module.

### Custom Comparison

```java
ComparisonResult result = ComparisonEngine.compare(expected, actual,
    ComparisonOptions.builder()
        .withComparisonType(ComparisonType.UNORDERED)
        .withIgnoredFields("_id")
        .build());
```

### Ellipsis Pattern Support

Expected file content with ellipsis patterns for flexible matching:
```json
[
  { "name": "John", "details": "..." },
  "...",
  { "name": "Alice", "age": 30 }
]
```

## File Format Support

- **JSON**: Standard JSON objects and arrays
- **Extended JSON**: MongoDB Extended JSON format
- **JSONL**: JSON Lines format (one object per line)
- **Mixed Content**: Automatic format detection

## Technical Implementation

### Type Normalization

The library normalizes MongoDB-specific types for consistent comparison:
- `ObjectId` → String representation
- `Decimal128` → BigDecimal
- `Date` → Instant
- BSON Documents → Map structures

### Comparison Strategies

- **STRUCTURAL**: Deep object/array comparison (default)
- **STRING_CONTENT**: String-based comparison with ellipsis support
- **HYBRID**: Structural first, fallback to string comparison
- **ORDERED/UNORDERED**: Array comparison modes

### Performance Considerations

- Recursion depth limits
- Timeout handling for large datasets
- Memory usage monitoring
- Circular reference detection

## Dependencies

- MongoDB Java Sync Driver
- Jackson (JSON processing)
- Java 21+
- JUnit Jupiter (for test integration)

## Error Handling

The library provides detailed error reporting including:
- Field-specific comparison failures
- Type mismatch information
- Path context for nested structure errors
- Performance limit violations
- Timeout and memory usage warnings
