# MongoDB Core Comparison Library

**NOTE:** This README serves as an internal development resource for the
DevDocs team in developing this utility.

A specialized library for validating MongoDB Java Driver output against expected results, specifically for MongoDB documentation and code example testing.

This core library provides robust comparison capabilities, handling the complexities of BSON types and various output formats.

Support for reactive streams (`Publisher` types) and all reactive dependencies is in the separate [`comparison-library-reactive`](../comparison-library-reactive/README.md) module. The core library is sync-only and does not depend on any reactive APIs.

## Key Features

- **Sync Driver Support**: Works with MongoDB Sync Java Driver
- **Type Normalization**: Handles BSON types (ObjectId, Decimal128, Date)
- **Flexible Matching**: Supports ellipsis patterns, field exclusion, and array ordering options
- **Format Support**: JSON, Extended JSON, JSONL parsing with automatic format detection
- **Error Reporting**: Detailed comparison results with path-specific error information

## Core API

### Main Entry Points

- `Expect.that(results)` - Unified API for sync collections and objects
- `ExpectBuilder` - Fluent builder for configuring comparisons
- Internal APIs (ComparisonEngine, ExpectedOutputParser) are package-private

For validating results from reactive streams (`Publisher`), use the API in the [`comparison-library-reactive`](../comparison-library-reactive/README.md) module.

### Configuration

```java
Expect.that(results)
    .withOrderedSort()             // Maintain array order
    .withUnorderedSort()           // Ignore array order (default behavior)
    .withIgnoredFields("_id")      // Skip specific fields
    .shouldMatch("expected.json"); // Validate and throw on mismatch
```

**Note:** Performance settings (timeout, recursion depth, array size limits) use sensible defaults. Technical writers do not configure these advanced options.

### Validation

```java
// Assert success or throw exception
Expect.that(results).shouldMatch(expectedResults);
Expect.that(results).shouldMatch("expected.json");

// Debug mode for detailed error information
Expect.that(results).shouldMatchWithDebug(expected);
```

### Debug Methods

When tests fail, use debug methods to get detailed diagnostic information:

```java
// Debug methods automatically print detailed error information on failure
validator.assertMatchesWithDebug(expectedResults);        // For object comparison
validator.assertMatchesFileWithDebug("expected.json");    // For file comparison
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
Expect.that(results)
    .shouldMatch("expected-documents.json");
```

### Debug-Enabled Testing

Use debug methods during development and troubleshooting:

```java
// File-based comparison with debug output on failure
List<Document> results = collection.find().into(new ArrayList<>());
Expect.that(results)
    .withIgnoredFields("_id", "timestamp")
    .shouldMatchWithDebug("expected-results.json");

// Object-based comparison with debug output on failure
List<Document> expectedResults = List.of(
    Document.parse("{\"name\": \"Alice\", \"status\": \"active\"}"),
    Document.parse("{\"name\": \"Bob\", \"status\": \"inactive\"}")
);

Expect.that(actualResults)
    .shouldMatchWithDebug(expectedResults);
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
