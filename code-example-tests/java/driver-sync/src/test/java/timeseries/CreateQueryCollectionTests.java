package timeseries;

import com.mongodb.client.*;

import org.bson.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import timeseries.CreateQuery.CreateQueryCollection;
import mongodb.comparison.Expect;

import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CreateQueryCollectionTests {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase db;
    private static CreateQueryCollection example;

    @BeforeEach
    void seUp() {
        mongoClient = MongoClients.create(uri);
        db = mongoClient.getDatabase("timeseries");
        example = new CreateQueryCollection();
    }

    @AfterEach
    void tearDown() {
        if (mongoClient != null) {
            db.drop();
            mongoClient.close();
        }
    }

    @Test
    @DisplayName("Test that time series collection settings are as expected (granularity)")
    void testCollectionSettingsGranularity() {
        example.createCollection();
        var weather = db.getCollection("weather");

        var expectedSettings = new Document("timeseries", new Document("timeField", "time")
                .append("metaField", "sensor")
                .append("granularity", "hours")
                .append("bucketMaxSpanSeconds", (long) 2592000))
                .append("expireAfterSeconds", (long) 86400);

        var collection = db.listCollections()
            .filter(new Document("name", "weather"))
            .first();

        var options = collection.get("options", Document.class);
        var timeSeriesOptions = options.get("timeseries", Document.class);
        var actualSettings = new Document("timeseries", timeSeriesOptions)
            .append("expireAfterSeconds", options.get("expireAfterSeconds"));

        assertEquals(expectedSettings.toJson(), actualSettings.toJson(), "The collection settings do not match the expected settings! (granularity)");
    }

    @Test
    @DisplayName("Test that time series collection settings are as expected (bucket settings)")
    void testCollectionSettingsBucketSettings() {
        example.createCollectionBucketSettings();
        var weatherBucket = db.getCollection("weatherBucket");

        var expectedSettings = new Document("timeseries", new Document("timeField", "time")
                .append("metaField", "sensor")
                .append("bucketRoundingSeconds", (long) 3600)
                .append("bucketMaxSpanSeconds", (long) 3600))
                .append("expireAfterSeconds", (long) 86400);

        var collection = db.listCollections()
            .filter(new Document("name", "weatherBucket"))
            .first();

        var options = collection.get("options", Document.class);
        var timeSeriesOptions = options.get("timeseries", Document.class);
        var actualSettings = new Document("timeseries", timeSeriesOptions)
            .append("expireAfterSeconds", options.get("expireAfterSeconds"));

        assertEquals(expectedSettings.toJson(), actualSettings.toJson(), "The collection settings do not match the expected settings! (bucket settings)");
    }

    @Test
    void testQueryTimeField() {
        example.createCollection();
        var result = example.queryCollectionTimeField();
        Path outputFilePath = Path.of("src/main/java/timeseries/CreateQuery/TimeFieldOutput.txt");
        Expect.that(result).shouldMatch(outputFilePath);
    }

    @Test
    void testQueryMetaField() {
        example.createCollection();
        var result = example.queryCollectionMetaField();
        Path outputFilePath = Path.of("src/main/java/timeseries/CreateQuery/MetaFieldOutput.txt");
        Expect.that(result).shouldMatch(outputFilePath);
    }

    @Test
    void testFindOneQuery() {
        example.createCollection();
        var result = example.queryCollectionFindOne();
        Path outputFilePath = Path.of("src/main/java/timeseries/CreateQuery/FindOneOutput.txt");
        Expect.that(result).shouldMatch(outputFilePath);
    }

    @Test
    void testAggregationQuery() {
        example.createCollection();
        var result = example.aggregateCollection();
        Path outputFilePath = Path.of("src/main/java/timeseries/CreateQuery/AggregationOutput.txt");
        Expect.that(result).shouldMatch(outputFilePath);
    }
}
