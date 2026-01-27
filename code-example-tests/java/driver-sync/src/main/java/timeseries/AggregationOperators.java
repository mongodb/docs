package timeseries;

import com.mongodb.client.*;
import com.mongodb.client.model.*;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.TimeSeriesGranularity;
import com.mongodb.client.model.TimeSeriesOptions;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class AggregationOperators {
    private String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> stocks;
    private String collectionName = "dowJonesTickerData";
    private MongoDatabase db;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        db = mongoClient.getDatabase("timeseries_db");

        TimeSeriesOptions timeSeriesOptions = new TimeSeriesOptions("date")
                .metaField("symbol")
                .granularity(TimeSeriesGranularity.SECONDS);

        CreateCollectionOptions options = new CreateCollectionOptions()
                .timeSeriesOptions(timeSeriesOptions);
        db.createCollection(collectionName, options);

        stocks = db.getCollection(collectionName);
        stocks.deleteMany(Filters.empty());

        stocks.insertMany(
                Arrays.asList(
                        // :snippet-start: stocks-schema
                        new Document("symbol", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:59:00Z")))
                                .append("close", 252.47)
                                .append("volume", 55046.0),
                        // :snippet-end:
                        new Document("symbol", "MDB")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:58:00Z")))
                                .append("close", 252.93)
                                .append("volume", 44042.0),

                        new Document("symbol", "APPL")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:57:00Z")))
                                .append("close", 253.61)
                                .append("volume", 40182.0),

                        new Document("symbol", "GOOG")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:56:00Z")))
                                .append("close", 253.63)
                                .append("volume", 27890.0),

                        new Document("symbol", "GOOG")
                                .append("date", Date.from(Instant.parse("2021-12-18T15:55:00Z")))
                                .append("close", 254.03)
                                .append("volume", 40270.0)
                )
        );
    }

    public List<Document> runAveragePricePipeline() {
        loadSampleData();
        // :snippet-start: pipeline-avg-monthly-price
        // Create the compound _id with $dateTrunc and symbol
        Document groupId = new Document("firstDayOfMonth",
                new Document("$dateTrunc",
                        new Document("date", "$date")
                                .append("unit", "month")))
                .append("symbol", "$symbol");

        // Create the $group stage
        Bson groupStage = Aggregates.group(
                groupId,
                Accumulators.avg("avgMonthClose", "$close")
        );

        // Run the aggregation
        List<Document> result = stocks.aggregate(List.of(groupStage))
                .into(new ArrayList<>());
        // :snippet-end:
        return result;
    }

    public List<Document> runRollingAveragePipeline() {
        loadSampleData();
        // :snippet-start: pipeline-rolling-average
        // Use $setWindowFields to specify the 30-day window
        List<Document> pipeline = List.of(
                new Document("$setWindowFields",
                        new Document("partitionBy", new Document("symbol", "$symbol"))
                                .append("sortBy", new Document("date", 1))
                                .append("output", new Document("averageMonthClosingPrice",
                                        new Document("$avg", "$close")
                                                .append("window", new Document("range", Arrays.asList(-1, "current"))
                                                        .append("unit", "month")))))
        );
        // Run the aggregation
        List<Document> result = stocks.aggregate(pipeline)
                .into(new ArrayList<>());
        // :snippet-end:
        return result;
    }

    public void Cleanup(){
        db.drop();
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }
}
