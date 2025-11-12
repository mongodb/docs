package timeseries.CreateQuery;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.TimeSeriesGranularity;
import com.mongodb.client.model.TimeSeriesOptions;
import org.bson.Document;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.List;
import java.util.ArrayList;

public class CreateQueryCollection {
    private String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> weather;

    public void createCollection() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {

                // :snippet-start: time-series-options-granularity
                TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("time")
                        .metaField("sensor")
                        .granularity(TimeSeriesGranularity.HOURS); // '.SECONDS' | '.MINUTES' | '.HOURS'
                // :snippet-end:

                // :snippet-start: create-collection-options
                CreateCollectionOptions collectionOptions = new CreateCollectionOptions()
                        .timeSeriesOptions(timeSeriesOptions)
                        .expireAfter(86400, TimeUnit.SECONDS); // optional
                // :snippet-end:

                // :snippet-start: create-collection
                MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
                timeSeriesDB.createCollection("weather", collectionOptions);
                // :snippet-end:

                // :snippet-start: insert-documents
                weather = timeSeriesDB.getCollection("weather");

                weather.insertMany(
                    Arrays.asList(
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-18T00:00:00Z")))
                                .append("temp", 45.2),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-18T06:00:00Z")))
                                .append("temp", 47.3),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-18T12:00:00Z")))
                                .append("temp", 49.1),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-18T18:00:00Z")))
                                .append("temp", 48.8),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-19T00:00:00Z")))
                                .append("temp", 43.3),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-19T06:00:00Z")))
                                .append("temp", 47.2),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-19T12:00:00Z")))
                                .append("temp", 51.5),
                        new Document("sensor", new Document("sensorId", 5578).append("type", "temperature"))
                                .append("time", Date.from(Instant.parse("2021-11-19T18:00:00Z")))
                                .append("temp", 48.2)
                    )
                );
                // :snippet-end:
        }
    }

    public void createCollectionBucketSettings() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {
                MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");

                // :snippet-start: time-series-options-bucket-settings
                TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("time")
                        .metaField("sensor")
                        .bucketMaxSpan( (long) 3600, TimeUnit.SECONDS)
                        .bucketRounding( (long) 3600, TimeUnit.SECONDS);
                // :snippet-end:

                CreateCollectionOptions collectionOptions = new CreateCollectionOptions()
                        .timeSeriesOptions(timeSeriesOptions)
                        .expireAfter(86400, TimeUnit.SECONDS); // optional

                timeSeriesDB.createCollection("weatherBucket", collectionOptions);
        }
    }

    public List<Document> queryCollectionFindOne() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
            weather = timeSeriesDB.getCollection("weather");

            // :snippet-start: find-one
            Date target = Date.from(Instant.parse("2021-11-19T18:00:00Z"));

            FindIterable<Document> findResults = weather.find(new Document("time", target))
                    .projection(new Document("_id", 0));
            // :snippet-end:

            List<Document> documents = new ArrayList<>();

            // :snippet-start: cursor-iteration-find
            for  (Document document : findResults) {
                System.out.println(document.toJson());
                documents.add(document); // :remove:
            }
            // :snippet-end:

            return documents;
        }
    }

    public List<Document> queryCollectionMetaField() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
            MongoCollection<Document> weather = timeSeriesDB.getCollection("weather");

            FindIterable<Document> metaFieldResults = weather.find(new Document("sensor.sensorId", 5578))
                    .projection(new Document("_id", 0));

            List<Document> documents = new ArrayList<>();
            for  (Document document : metaFieldResults) {
                System.out.println(document.toJson());
                documents.add(document);
            }

            return documents;
        }
    }

    public List<Document> queryCollectionTimeField() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
            MongoCollection<Document> weather = timeSeriesDB.getCollection("weather");

            Document query = new Document("$and", Arrays.asList(
                    new Document("time", new Document("$gte", Date.from(Instant.parse("2021-11-18T00:00:00Z")))),
                    new Document("time", new Document("$lt", Date.from(Instant.parse("2021-11-19T00:00:00Z"))))
            ));

            FindIterable<Document> timeFieldResults = weather.find(query)
                    .projection(new Document("_id", 0));

            List<Document> documents = new ArrayList<>();
            for  (Document document : timeFieldResults) {
                System.out.println(document.toJson());
                documents.add(document);
            }

            return documents;
        }
    }

    public List<Document> aggregateCollection() {
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase timeSeriesDB = mongoClient.getDatabase("timeseries");
            MongoCollection<Document> weather = timeSeriesDB.getCollection("weather");

            // :snippet-start: aggregate
            // Create an aggregation pipeline
            List<Document> pipeline = Arrays.asList(
                    new Document("$match", new Document("sensor.sensorId", 5578)),
                    new Document("$group", new Document("_id", new Document("$dateTrunc", new Document("date", "$time").append("unit", "day")))
                            .append("avgTemp", new Document("$avg", "$temp"))),
                    new Document("$sort", new Document("avgTemp", -1))
            );

            // Run the aggregation
            AggregateIterable<Document> aggregationResults = weather.aggregate(pipeline);
            // :snippet-end:

            List<Document> documents = new ArrayList<>();

            // :snippet-start: cursor-iteration-aggregate
            for  (Document document : aggregationResults) {
                System.out.println(document.toJson());
                documents.add(document); // :remove:
            }
            // :snippet-end:

            return documents;
        }
    }
}
