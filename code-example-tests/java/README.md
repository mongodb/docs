# Java MongoDB Driver Comparison Library

This is a shared comparison library for validating MongoDB Java Driver output against expected results. It supports both the Sync Driver and Reactive Streams Driver through a unified API.

## Project Structure

```
java/
├── pom.xml                       # Parent POM for multi-module project
├── comparison-library/           # Shared comparison library
├── comparison-library-reactive/  # Reactive-specific wrappers for RS driver
├── driver-sync/                  # Java Sync Driver examples and tests
└── driver-reactive/              # Java Reactive Streams Driver examples and tests (TBD - currently a stub implementation)
```

## Requirements

- Java 21+
- Maven 3.6+
- MongoDB Java Driver 4.11.1+
- Reactive Streams API (for reactive support)

## Quick Start

### For Sync Driver Tests

```java
import utils.TestDataLoader;
import mongodb.comparison.Expect;

// Simple validation
List<Document> results = collection.find(eq("year", 2015)).into(new ArrayList<>());
Expect.that(results)
    .withIgnoredFields("_id")
    .shouldMatch("expected-results.txt");
```

### For Reactive Driver Tests

```java
import utils.TestDataLoader;
import mongodb.comparison.Expect;

// Simple validation
Publisher<Document> publisher = collection.find(eq("year", 2015));
ExpectReactive.that(publisher)
    .withIgnoredFields("_id")
    .shouldMatch("expected-results.txt");
```

## Building and Running Tests

```bash
# Build and run tests in all modules
mvn clean install

# Build and run tests in specific module
cd comparison-library && mvn clean test
cd comparison-library-reactive && mvn clean test
cd driver-sync && mvn clean test
cd driver-reactive && mvn clean test
```

## Expected File Formats

The library supports multiple input formats:

### JSON Lines (one object per line)
```
{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
```

### JSON Array
```json
[
  {"name": "Alice", "age": 30},
  {"name": "Bob", "age": 25}
]
```

### MongoDB Extended JSON
```
{name: 'Alice', _id: ObjectId('507f1f77bcf86cd799439011')}
{name: 'Bob', createdAt: Date('2023-01-01T00:00:00Z')}
```

## Ellipsis Patterns

Use `"..."` for flexible matching:

```
{"name": "Alice", "id": "..."}  // Matches any id value
{"status": "...active"}         // Matches any status ending with "active"
```

