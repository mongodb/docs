package timeseries;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.TimeSeriesOptions;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Position;
import org.bson.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class SecondaryIndexes {
    private static final String uri = System.getenv("CONNECTION_STRING") != null
            ? System.getenv("CONNECTION_STRING")
            : "Env variable not found. Verify you have a .env file with a valid connection string.";

    private static final String databaseName = "timeseries";
    private static final String collectionName = "sensorData";

    private static MongoCollection<Document> collection;
    private static MongoDatabase database;
    private static MongoClient client;

    private static void loadData() {
        client = MongoClients.create(uri);
        database = client.getDatabase(databaseName);

        // :snippet-start: secondary-create-collection
        CreateCollectionOptions createCollectionOptions = new CreateCollectionOptions()
                .timeSeriesOptions(
                        new TimeSeriesOptions("timestamp")
                                .metaField("metadata"))
                .expireAfter(24, TimeUnit.HOURS);
        // :snippet-end:
        database.createCollection(collectionName, createCollectionOptions);
        collection = database.getCollection(collectionName);

        // :snippet-start: secondary-data
        List<Document> sampleDocuments = Arrays.asList(
                new Document()
                        // :snippet-start: secondary-data-schema
                        .append("metadata", new Document()
                                .append("sensorId", 5578)
                                .append("type", "omni")
                                .append("location", new Document()
                                        .append("type", "Point")
                                        .append("coordinates", Arrays.asList(-77.40711, 39.03335))))
                        // :snippet-end:
                        .append("timestamp", Date.from(Instant.parse("2022-01-15T00:00:00Z")))
                        .append("currentConditions", new Document()
                                .append("windDirection", 127.0)
                                .append("tempF", 71.0)
                                .append("windSpeed", 2.0)
                                .append("cloudCover", null)
                                .append("precip", 0.1)
                                .append("humidity", 94.0)),
                new Document()
                        .append("metadata", new Document()
                                .append("sensorId", 5578)
                                .append("type", "omni")
                                .append("location", new Document()
                                        .append("type", "Point")
                                        .append("coordinates", Arrays.asList(-77.40711, 39.03335))))
                        .append("timestamp", Date.from(Instant.parse("2022-01-15T00:01:00Z")))
                        .append("currentConditions", new Document()
                                .append("windDirection", 128.0)
                                .append("tempF", 69.8)
                                .append("windSpeed", 2.2)
                                .append("cloudCover", null)
                                .append("precip", 0.1)
                                .append("humidity", 94.3)),
                new Document()
                        .append("metadata", new Document()
                                .append("sensorId", 5579)
                                .append("type", "omni")
                                .append("location", new Document()
                                        .append("type", "Point")
                                        .append("coordinates", Arrays.asList(-80.19773, 25.77481))))
                        .append("timestamp", Date.from(Instant.parse("2022-01-15T00:01:00Z")))
                        .append("currentConditions", new Document()
                                .append("windDirection", 115.0)
                                .append("tempF", 88.0)
                                .append("windSpeed", 1.0)
                                .append("cloudCover", null)
                                .append("precip", 0.0)
                                .append("humidity", 99.0))
        );
        // :snippet-end:
        collection.insertMany(sampleDocuments);
    }

    public static class SecondaryIndexResult {
        public List<Document> result;
        public Document explainResult;

        public SecondaryIndexResult(List<Document> result, Document explainResult) {
            this.result = result;
            this.explainResult = explainResult;
        }
    }

    public static class CompoundIndexResult {
        public List<Document> result;
        public Document explainResult;
        public List<Document> hintResult;

        public CompoundIndexResult(List<Document> result, Document explainResult, List<Document> hintResult) {
            this.result = result;
            this.explainResult = explainResult;
            this.hintResult = hintResult;
        }
    }

    public static SecondaryIndexResult createAndUseSecondaryIndex() {
        loadData();
        // :snippet-start: simple-in-example
        var filter = Filters.in("metadata.type", "temperature", "pressure");
        // :snippet-end:

        // :snippet-start: create-secondary-index
        collection.createIndex(Indexes.ascending("timestamp"));
        // :snippet-end:

        // :snippet-start: sort-with-secondary-index
        var matchFilter = Filters.gte("timestamp",
                Date.from(Instant.parse("2022-01-15T00:00:00Z")));

        var pipeline = Arrays.asList(
                new Document("$match", new Document("timestamp",
                        new Document("$gte", Date.from(Instant.parse("2022-01-15T00:00:00Z"))))),
                new Document("$sort", new Document("timestamp", 1))
        );

        List<Document> result = collection.aggregate(pipeline).into(new ArrayList<>());
        // :snippet-end:

        // :snippet-start: sort-with-secondary-index-explain
        var explainCommand = new Document("explain", new Document()
                .append("aggregate", collectionName)
                .append("pipeline", pipeline)
                .append("cursor", new Document()))
                .append("verbosity", "executionStats");

        Document explainResult = database.runCommand(explainCommand);
        // :snippet-end:

        return new SecondaryIndexResult(result, explainResult);
    }

    public static CompoundIndexResult createAndUseCompoundIndexes() {
        // :snippet-start: last-point-indexes
        // Indexes on ``timeField`` descending are more performant because they
        // enable ``DISTINCT_SCAN`` optimizations.
        List<String> indexes = Arrays.asList(
                collection.createIndex(Indexes.compoundIndex(
                        Indexes.ascending("metadata.sensorId"),
                        Indexes.ascending("timestamp"))),
                collection.createIndex(Indexes.compoundIndex(
                        Indexes.ascending("metadata.sensorId"),
                        Indexes.descending("timestamp"))),
                collection.createIndex(Indexes.compoundIndex(
                        Indexes.descending("metadata.sensorId"),
                        Indexes.ascending("timestamp"))),
                collection.createIndex(Indexes.compoundIndex(
                        Indexes.descending("metadata.sensorId"),
                        Indexes.descending("timestamp")))
        );
        // :snippet-end:

        // :snippet-start: last-point-index-meta-up-time-down
        collection.createIndex(Indexes.compoundIndex(
                Indexes.ascending("metadata.type"),
                Indexes.descending("timestamp")));
        // :snippet-end:

        // :snippet-start: sort-and-group
        var pipeline = Arrays.asList(
                new Document("$sort", new Document()
                        .append("metadata.sensorId", 1)
                        .append("timestamp", -1)),
                new Document("$group", new Document()
                        .append("_id", "$metadata.sensorId")
                        .append("ts", new Document("$first", "$timestamp"))
                        .append("temperatureF", new Document("$first", "$currentConditions.tempF")))
        );

        List<Document> result = collection.aggregate(pipeline).into(new ArrayList<>());
        // :snippet-end:

        // :snippet-start: sort-and-group-explain
        var explainCommand = new Document("explain", new Document()
                .append("aggregate", collectionName)
                .append("pipeline", pipeline)
                .append("cursor", new Document()))
                .append("verbosity", "executionStats");

        Document explainResult = database.runCommand(explainCommand);
        // :snippet-end:

        // :snippet-start: hint
        var hintPipeline = Arrays.asList(
                new Document("$sort", new Document()
                        .append("metadata.sensorId", 1)
                        .append("timestamp", -1)),
                new Document("$group", new Document()
                        .append("_id", "$metadata.sensorId")
                        .append("ts", new Document("$first", "$timestamp"))
                        .append("temperatureF", new Document("$first", "$currentConditions.tempF")))
        );

        List<Document> hintResult = collection.aggregate(hintPipeline)
                .hint(new Document()
                        .append("metadata.sensorId", 1)
                        .append("timestamp", -1))
                .into(new ArrayList<>());
        // :snippet-end:

        return new CompoundIndexResult(result, explainResult, hintResult);
    }

    public static List<Document> createAndUseGeospatialIndex() {
        // :snippet-start: create-geospatial-index-temp
        collection.createIndex(Indexes.geo2dsphere("currentConditions.tempF"));
        // :snippet-end:

        // :snippet-start: create-geospatial-index-location
        collection.createIndex(Indexes.geo2dsphere("metadata.location"));
        // :snippet-end:

        var filter = Filters.nearSphere(
                "metadata.location",
                new Point(new Position(-77.03653, 38.897676)),
                5000000.0,
                null);

        List<Document> result = collection.find(filter).into(new ArrayList<>());

        return result;
    }

    public static void cleanup() {
        collection.drop();
        client.close();
    }
}
