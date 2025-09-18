# MongoDB Comparison Library - Reactive Module

This module provides utilities for validating MongoDB Java Reactive Streams driver output against expected results, specifically for documentation and code example testing.

## Overview

The `comparison-library-reactive` module extends the core comparison library to support validation of results produced by reactive streams (i.e., `Publisher` types). It is intended for use in test suites and documentation validation scenarios where MongoDB's Reactive Streams driver is used.

## Usage

### Main Entry Points

- `OutputValidatorReactive.expectFromPublisher(publisher)` – Validate results from a reactive `Publisher`.
- `OutputValidatorReactive.expect(results)` – Validate already-collected results (e.g., `List<Document>`).

### Configuration

```java
OutputValidatorReactive.expectFromPublisher(publisher)
    .withUnorderedComparison()         // Ignore order of results
    .withIgnoredFields("_id");         // Ignore specific fields
```

### Validation

```java
// Assert success or throw exception
validator.assertMatches();

// Get detailed result
ComparisonResult result = validator.toMatch(expected);
if (!result.isMatch()) {
    System.out.println(result.getErrorMessage());
}
```

## Example: Validating a Reactive Publisher

```java
Publisher<Document> publisher = collection.find();
OutputValidatorReactive.expectFromPublisher(publisher)
    .withIgnoredFields("_id", "timestamp")
    .assertMatchesFile("expected-results.json");
```

## File Format Support

- **JSON**: Standard JSON objects and arrays
- **Extended JSON**: MongoDB Extended JSON format
- **JSONL**: JSON Lines format (one object per line)
- **Mixed Content**: Automatic format detection

## Technical Notes

- Type normalization is performed for MongoDB-specific types (ObjectId, Decimal128, Date, etc.).
- Supports flexible matching with ellipsis patterns and array ordering options.
- Publisher results are collected to a list for comparison; timeout is fixed at 30 seconds.
- Error reporting includes field-specific failures and path context.

## Dependencies

- MongoDB Java Reactive Streams Driver
- Jackson (JSON processing)
- Java 21+
- JUnit Jupiter (for test integration)

## See Also

- [comparison-library](../comparison-library/README.md) – Core comparison utilities for sync driver and general usage.
