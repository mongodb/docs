package aggregation.pipelines;

import com.mongodb.client.*;
import org.bson.Document;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import mongodb.comparison.Expect;

import java.nio.file.Path;
import java.util.List;

public class TutorialTests {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    @BeforeEach
    void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("agg_tutorials_db");
    }

    @AfterEach
    void tearDown() {
        database.drop();
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that agg tutorial template app code runs and returns a specific document")
    void TestAggTutorial() {
        var output = AggTutorial.runExample(new String[]{"example arg"});
        var outputString = output.get(0).get("stringValue");
        var expectedOutput = "sample2";
        Expect.that(outputString)
            .shouldMatch(expectedOutput);
    }

    @Test
    @DisplayName("Test that filter aggregation pipeline matches output")
    void TestFilter() {
        var example = new aggregation.pipelines.filter.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");
    }

    @Test
    @DisplayName("Test that group aggregation pipeline matches output")
    void TestGroup() {
        var example = new aggregation.pipelines.group.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/aggregation/pipelines/group/TutorialOutput.txt");
    }

    @Test
    @DisplayName("Test that unwind aggregation pipeline matches output")
    void TestUnwind() {
        var example = new aggregation.pipelines.unwind.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/aggregation/pipelines/unwind/TutorialOutput.txt");
    }

    @Test
    @DisplayName("Test that one-to-one join aggregation pipeline matches output")
    void TestJoinOneToOne() {
        var example = new aggregation.pipelines.join1to1.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/aggregation/pipelines/join1to1/TutorialOutput.txt");
    }

    @Test
    @DisplayName("Test that multi-field join aggregation pipeline matches output")
    void TestJoinMultiField() {
        var example = new aggregation.pipelines.joinMultiField.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        Expect.that(output)
            .shouldMatch("src/main/java/aggregation/pipelines/joinMultiField/TutorialOutput.txt");
    }
}
