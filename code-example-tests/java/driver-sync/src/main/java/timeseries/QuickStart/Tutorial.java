package timeseries.QuickStart;

// :snippet-start: required-imports
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.TimeSeriesGranularity;
import com.mongodb.client.model.TimeSeriesOptions;
import org.bson.Document;

import java.time.Instant;
import java.util.ArrayList; // :remove:
import java.util.Arrays;
import java.util.Date;
import java.util.List; // :remove:
// :snippet-end:

public class Tutorial {
    private String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> stocks;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        // :snippet-start: create-db
        MongoDatabase db = mongoClient.getDatabase("timeseries_db");
        // :snippet-end:
        // :snippet-start: collection-options
        // Specify the time series options to configure the collection
        TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("date")
                .metaField("ticker")
                .granularity(TimeSeriesGranularity.SECONDS);

        CreateCollectionOptions options = new CreateCollectionOptions()
                .timeSeriesOptions(timeSeriesOptions);
        // :snippet-end:

        // :snippet-start: create-collection
        db.createCollection("stocks", options);
        // :snippet-end:

        // :snippet-start: load-sample-data
        stocks = db.getCollection("stocks"); // :remove:
        // :uncomment-start:
        // MongoCollection<Document> stocks = db.getCollection("stocks");
        // :uncomment-end:

        stocks.insertMany(
                Arrays.asList(
                        new Document("ticker", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:59:00Z")))
                                .append("close", 252.47)
                                .append("volume", 55046.0),

                        new Document("ticker", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:58:00Z")))
                                .append("close", 252.93)
                                .append("volume", 44042.0),

                        new Document("ticker", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:57:00Z")))
                                .append("close", 253.61)
                                .append("volume", 40182.0),

                        new Document("ticker", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:56:00Z")))
                                .append("close", 253.63)
                                .append("volume", 27890.0),

                        new Document("ticker", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:55:00Z")))
                                .append("close", 254.03)
                                .append("volume", 40270.0)
                )
        );
        // :snippet-end:
    }

    public List<Document> runMetaFieldQuery(String[] args) {
        // :snippet-start: metafield-query
        Document query = new Document("ticker", "MDB");

        FindIterable<Document> metaFieldResults = stocks.find(query)
                .projection(new Document("_id", 0));

        List<Document> documents = new ArrayList<>(); // :remove:
        for  (Document document : metaFieldResults) {
            System.out.println(document.toJson());
            documents.add(document); // :remove:
        }
        // :snippet-end:
        mongoClient.close();
        return documents;
    }

    public List<Document> runTimeFieldQuery(String[] args) {
        // :snippet-start: timefield-query
        // Initialize date range
        Date startTime = Date.from(Instant.parse("2021-12-18T15:50:00Z"));
        Date endTime = Date.from(Instant.parse("2021-12-18T15:56:00Z"));

        // Define the query filter
        Document query = new Document("$and", Arrays.asList(
                new Document("date", new Document("$gte", startTime)),
                new Document("date", new Document("$lte", endTime))
        ));

        FindIterable<Document> metaFieldResults = stocks.find(query)
                .projection(new Document("_id", 0));

        List<Document> documents = new ArrayList<>(); // :remove:
        for  (Document document : metaFieldResults) {
            System.out.println(document.toJson());
            documents.add(document); // :remove:
        }
        // :snippet-end:
        mongoClient.close();
        return documents;
    }
}
