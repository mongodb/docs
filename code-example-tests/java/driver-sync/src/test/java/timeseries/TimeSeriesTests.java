package timeseries;

import com.mongodb.client.*;

import org.bson.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import timeseries.QuickStart.Tutorial;
import mongodb.comparison.Expect;

import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TimeSeriesTests {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    @BeforeEach
    void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("timeseries_db");
    }

    @AfterEach
    void tearDown() {
        database.drop();
        // Also drop the mydatabase used by migration tests
        mongoClient.getDatabase("mydatabase").drop();
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that time series sample app code runs and successfully pings the admin DB")
    void TestAggTutorial() {
        var output = SampleApp.runExample(new String[]{"example arg"});
        // If the ping succeeds, it returns a Document with the key "ok" - otherwise, there is no "ok" key, only the error info
        var expectedOutput = "ok";
        assert(output.containsKey(expectedOutput));
    }

    @Test
    @DisplayName("Test that time series quick start meta field query returns the expected output")
    void TestQuickStartMetaFieldQuery() {
        var tutorial = new Tutorial();
        tutorial.loadSampleData();
        var output = tutorial.runMetaFieldQuery(new String[]{"example arg"});

        Expect.that(output)
            .shouldMatch("src/main/java/timeseries/QuickStart/MetaFieldOutput.txt");
    }

    @Test
    @DisplayName("Test that time series quick start time field query returns the expected output")
    void TestQuickStartTimeFieldQuery() {
        var tutorial = new Tutorial();
        tutorial.loadSampleData();
        var output = tutorial.runTimeFieldQuery(new String[]{"example arg"});

        Expect.that(output)
            .shouldMatch("src/main/java/timeseries/QuickStart/TimeFieldOutput.txt");
    }

    @Test
    @DisplayName("Test that time series migration with aggregation creates a time series collection and returns expected output")
    void TestMigrateWithAggregation() {
        var migrateTutorial = new timeseries.MigrateWithAggregation.Tutorial();
        migrateTutorial.loadSampleData();
        migrateTutorial.migrateData();
        var output = migrateTutorial.queryNewTsCollection();
        migrateTutorial.close();

        Expect.that(output)
            .shouldMatch("src/main/java/timeseries/MigrateWithAggregation/MigrateOutput.sh");
    }
}
