# Java (Sync Driver) — Grove Conventions

## Project Setup

- Java 21 (Zulu JDK recommended), Maven build
- Multi-module project: parent POM at `code-example-tests/java/pom.xml`
- Key deps: `mongodb-driver-sync` 5.6.0, `jackson-databind` 2.20.0, JUnit 5.13.4
- Formatter: Spotless with Palantir Java Format (`mvn spotless:apply`)
- Connection string via environment variable: `export CONNECTION_STRING="..."`
- First-time setup: run `mvn clean install -DskipTests` from the `java/` directory

## Example File Pattern

```java
package topic.subtopic;

import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class Tutorial {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> collection;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        // :snippet-start: load-sample-data
        MongoDatabase db = mongoClient.getDatabase("your_db_name");
        collection = db.getCollection("your_collection"); // :remove:
        // :uncomment-start:
        // MongoCollection<Document> coll = db.getCollection("your_collection");
        // :uncomment-end:
        collection.insertMany(sampleData);
        // :snippet-end:
    }

    public List<Document> runTutorial() {
        // :snippet-start: your-snippet-name
        // ... operation code ...
        // :snippet-end:
        mongoClient.close();
        return documents;
    }
}
```

- **File naming**: `PascalCase.java` in `src/main/java/{topic}/{subtopic}/`
- **Package naming**: Matches the directory path (e.g., `package aggregation.pipelines.filter`)
- **Class naming**: Matches the file name (e.g., `Tutorial.java` → `public class Tutorial`)
- **Connection**: `System.getenv("CONNECTION_STRING")` assigned to a private field
- **Two-method pattern**: `loadSampleData()` inserts fixtures, `runTutorial()` runs the operation
- **Return type**: `List<Document>`, `Document`, `String`, or a custom inner class
- **Cleanup**: `mongoClient.close()` at end of the run method, or in test teardown
- **Error handling**: For error handling style guidance, refer to
  `content/meta/source/includes/code/guidelines-java.rst`
- **Bluehawk**: `// :snippet-start: kebab-name` / `// :snippet-end:`; `// :remove:` for single lines
- **Snippet identifiers**: Unique within each file, lowercase kebab-case
- **Template**: `src/main/java/example/ExampleStub.java`

## Test File Pattern

```java
package topic;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.*;
import mongodb.comparison.Expect;

public class TutorialTests {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    @BeforeEach
    void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("your_db_name");
    }

    @AfterEach
    void tearDown() {
        database.drop();
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that example matches expected output")
    void TestYourExample() {
        var example = new topic.subtopic.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/topic/subtopic/TutorialOutput.txt");
    }
}
```

- **File naming**: `PascalCaseTests.java` in `src/test/java/{topic}/`
- **Package naming**: Matches the directory path
- **Import Expect**: `import mongodb.comparison.Expect`
- **Annotations**: `@Test`, `@DisplayName("...")`, `@BeforeEach`, `@AfterEach`
- **Setup**: `@BeforeEach` creates client and gets database reference
- **Teardown**: `@AfterEach` drops the test database and closes the client
- **Output path**: Relative to the project root, starting with `src/main/java/...`
- **Do not** drop sample data databases — only drop databases your example created
- **Template**: `src/test/java/example/ExampleStubTest.java`

## Sample Data

```java
import sampledatautil.RequiresSampleData;
import sampledatautil.SampleDataTestHelper;

// Annotation-based (declarative)
@Test
@RequiresSampleData("sample_mflix")
void testMovieQuery() { /* test body */ }

@Test
@RequiresSampleData(value = "sample_mflix", collections = {"movies", "theaters"})
void testSpecificCollections() { /* test body */ }

// Programmatic (imperative)
@Test
void testMovieQuery() {
    SampleDataTestHelper.ensureSampleDataOrSkip("sample_mflix");
    // test body
}
```

Tests auto-skip when required sample databases are unavailable.

## Expected Output Files

- Place alongside examples: `TutorialOutput.txt` or in a shared `OutputFiles/` directory
- Output path passed to `shouldMatch()` is relative to the project root
- Format depends on the return type: JSONL (one document per line) for
  `List<Document>` results, pretty-printed JSON for single `Document` results,
  plain text for `String` returns. Uses Extended JSON for MongoDB types.
- Use ellipsis patterns for dynamic values (see root CLAUDE.md)

## Commands

| Command | Purpose |
|---------|---------|
| `mvn test` | Run all tests |
| `mvn -Dtest=TutorialTests test` | Run a specific test class |
| `mvn test -Dtest="topic.subtopic.YourExampleTest#testYourExample"` | Run a single test method |
| `mvn spotless:apply` | Format all files |
| `node snip.js` | Extract snippets via Bluehawk |

All commands run from `code-example-tests/java/driver-sync/`.

## Snippet Output

`node snip.js` extracts to: `content/code-examples/tested/java/driver-sync/{topic}/{file}.snippet.{name}.java`

If Maven is installed, snipped output is auto-formatted with Spotless before writing.

Files to ignore from snipping are listed in `IGNORE_PATTERNS` in `snip.js`.
