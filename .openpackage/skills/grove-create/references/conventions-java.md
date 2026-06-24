# Java (Sync Driver) — Grove Conventions

<!-- canary:34229a0b -->

## Directory Structure

```
code-example-tests/java/driver-sync/
├── src/
│   ├── main/java/                     # Code examples
│   │   ├── example/
│   │   │   └── ExampleStub.java       # Template (do not modify)
│   │   └── topic/subtopic/
│   │       ├── YourExample.java
│   │       └── YourExampleOutput.txt  # Optional expected output
│   └── test/java/                     # Tests
│       ├── example/
│       │   └── ExampleStubTest.java   # Template (do not modify)
│       └── topic/subtopic/
│           └── YourExampleTest.java
├── pom.xml                            # Maven config
├── snip.js
└── .env                               # CONNECTION_STRING (not committed)
```

## Example File Pattern

```java
package topic.subtopic;

import com.mongodb.client.*;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class YourExample {

    public List<Document> runApp() {
        String uri = System.getenv("CONNECTION_STRING");
        MongoClient client = MongoClients.create(uri);

        try {
            // :snippet-start: your-snippet-name
            MongoDatabase db = client.getDatabase("your_db_name");
            MongoCollection<Document> collection = db.getCollection("your_collection");

            // Your MongoDB operation here
            List<Document> results = collection.find().into(new ArrayList<>());
            // :snippet-end:

            return results; // :remove:
        } finally {
            client.close();
        }
    }
}
```

### Example file conventions

- Package matches directory: `package topic.subtopic;`
- Class name matches filename: `YourExample.java` → `class YourExample`
- Main method is `runApp()` (or descriptive name), returns output for testing
- Connection via `System.getenv("CONNECTION_STRING")`
- Use `try/finally` for `client.close()`
- Use `// :snippet-start:` / `// :snippet-end:` (Java comment style)
- Use `// :remove:` for single lines, `// :remove-start:` / `// :remove-end:` for blocks
- Java also supports `// :uncomment-start:` / `// :uncomment-end:` for swapping
  test code with doc-ready code
- File naming: `PascalCase.java`
- Output file naming: `YourExampleOutput.txt` or `output.txt`

## Test File Pattern

```java
package topic.subtopic;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import mongodb.comparison.Expect;

public class YourExampleTest {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    @BeforeEach
    public void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("your_db_name");
    }

    @AfterEach
    void tearDown() {
        database.drop();
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that YourExample produces expected output")
    void TestYourExample() {
        var example = new topic.subtopic.YourExample();
        var output = example.runApp();

        Expect.that(output)
            .shouldMatch("src/main/java/topic/subtopic/YourExampleOutput.txt");
    }
}
```

### Test file conventions

- Test framework: JUnit 5
- File naming: `YourExampleTest.java`
- `@BeforeEach` for setup, `@AfterEach` for teardown
- `@Test` + `@DisplayName` annotations on each test method
- Test method naming: `TestYourExample()` (PascalCase, starts with uppercase `Test`)
- Output file paths are relative to `java/driver-sync/`
- Connection via `System.getenv("CONNECTION_STRING")`
- Comparison import: `import mongodb.comparison.Expect;`

## Code Formatting

Java examples are auto-formatted by Spotless (Maven plugin) during the snip
process if Maven is installed. To format manually:

```bash
cd code-example-tests/java/driver-sync
mvn spotless:apply
```

## Running Tests

```bash
cd code-example-tests/java/driver-sync
mvn test
```

Run a single test:
```bash
mvn -Dtest=TutorialTests#TestFilter test
```

## Snipping

```bash
node snip.js
```

Output: `content/code-examples/tested/java/driver-sync/topic/subtopic/`

Snippet filenames: `YourExample.snippet.your-snippet-name.java`

The Java snip.js also runs Spotless formatting on output if Maven is available.

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/java/driver-sync/topic/subtopic/YourExample.snippet.your-snippet-name.java
   :language: java
   :copyable: true
```

## Comparison API

```java
import mongodb.comparison.Expect;

Expect.that(output).shouldMatch("path/to/expected-output.txt");
Expect.that(output).withOrderedSort().shouldMatch("path/to/expected-output.txt");
Expect.that(output).withIgnoredFields("_id", "timestamp").shouldMatch("path/to/expected-output.txt");
Expect.that(output).shouldResemble(expectedOutput).withSchema(Map.of(
    "count", 20,
    "required_fields", List.of("_id", "title", "year"),
    "field_values", Map.of("year", 2012)
));
```

**Methods**: `that()`, `withIgnoredFields()`, `withOrderedSort()`,
`withUnorderedSort()`, `shouldMatch()`, `shouldResemble()`, `withSchema()`

### When to Use Each Method

| Scenario | Method |
|----------|--------|
| Output stored in a file | `shouldMatch(filepath)` |
| Output compared to an inline object | `shouldMatch(object)` |
| Output order matters (sorted results) | `.withOrderedSort().shouldMatch(...)` |
| Fields have dynamic values (_id, dates) | `.withIgnoredFields("_id", ...).shouldMatch(...)` |
| Highly variable output, validate structure only | `.shouldResemble(expected).withSchema(...)` |

### Ellipsis Patterns in Expected Output Files

The comparison library automatically detects these patterns in expected output:

- `"..."` — Matches any value for a key
- `"prefix..."` — Matches a string that starts with "prefix"
- `["..."]` — Matches any array
- Standalone `...` on its own line — Allows any number of additional fields
- `{ ... }` — Matches any object

### Schema Validation Options

Used with `shouldResemble()`:

- `count` (required): Expected number of documents (non-negative integer)
- `required_fields` (optional): Field names that must exist in every document
- `field_values` (optional): Field name/value pairs that must match exactly

`shouldResemble()` is mutually exclusive with `shouldMatch()` and
incompatible with `withIgnoredFields()`, `withOrderedSort()`, and
`withUnorderedSort()`.
