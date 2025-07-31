package aggregation.pipelines;

import com.mongodb.client.*;
import org.bson.Document;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import utils.TestUtils;

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
        assertEquals(expectedOutput, outputString,
                "The output from the AggTutorial class does not match the expected output");
    }

    @Test
    @DisplayName("Test that filter aggregation pipeline matches output")
    void TestFilter() {
        var example = new aggregation.pipelines.filter.Tutorial();
        example.loadSampleData();
        var output = example.runTutorial();

        // Read the expected output file
        Path outputFilePath = Path.of("src/main/java/aggregation/pipelines/filter/TutorialOutput.txt");
        List<Document> expected = TestUtils.loadDocumentsFromFile(outputFilePath);

        assertEquals(expected, output, "The output from the Tutorial class does not match the expected contents!");
    }
}
