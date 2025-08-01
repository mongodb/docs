package aggregation.pipelines.group;

import com.mongodb.client.*;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Tutorial {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> orders;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        // :snippet-start: load-sample-data
        MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
        orders = aggDB.getCollection("orders"); // :remove:
        // :uncomment-start:
        // MongoCollection<Document> orders = aggDB.getCollection("orders");
        // :uncomment-end:

        orders.insertMany(
                Arrays.asList(
                        new Document("customer_id", "elise_smith@myemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-05-30T08:35:52"))
                                .append("value", 231),
                        new Document("customer_id", "elise_smith@myemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-01-13T09:32:07"))
                                .append("value", 99),
                        new Document("customer_id", "oranieri@warmmail.com")
                                .append("orderdate", LocalDateTime.parse("2020-01-01T08:25:37"))
                                .append("value", 63),
                        new Document("customer_id", "tj@wheresmyemail.com")
                                .append("orderdate", LocalDateTime.parse("2019-05-28T19:13:32"))
                                .append("value", 2),
                        new Document("customer_id", "tj@wheresmyemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-11-23T22:56:53"))
                                .append("value", 187),
                        new Document("customer_id", "tj@wheresmyemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-08-18T23:04:48"))
                                .append("value", 4),
                        new Document("customer_id", "elise_smith@myemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-12-26T08:55:46"))
                                .append("value", 4),
                        new Document("customer_id", "tj@wheresmyemail.com")
                                .append("orderdate", LocalDateTime.parse("2021-02-28T07:49:32"))
                                .append("value", 1024),
                        new Document("customer_id", "elise_smith@myemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-10-03T13:49:44"))
                                .append("value", 102)
                )
        );
        // :snippet-end:
    }

    public List<Document> runTutorial() {
        List<Bson> pipeline = new ArrayList<>();
        // :snippet-start: match
        pipeline.add(Aggregates.match(Filters.and(
                Filters.gte("orderdate", LocalDateTime.parse("2020-01-01T00:00:00")),
                Filters.lt("orderdate", LocalDateTime.parse("2021-01-01T00:00:00"))
        )));
        // :snippet-end:
        // :snippet-start: sort-orderdate
        pipeline.add(Aggregates.sort(Sorts.ascending("orderdate")));
        // :snippet-end:
        // :snippet-start: group
        pipeline.add(Aggregates.group(
                "$customer_id",
                Accumulators.first("first_purchase_date", "$orderdate"),
                Accumulators.sum("total_value", "$value"),
                Accumulators.sum("total_orders", 1),
                Accumulators.push("orders",
                        new Document("orderdate", "$orderdate")
                                .append("value", "$value")
                )
        ));
        // :snippet-end:
        // :snippet-start: sort-purchase-date
        pipeline.add(Aggregates.sort(Sorts.ascending("first_purchase_date")));
        // :snippet-end:
        // :snippet-start: set
        pipeline.add(Aggregates.set(new Field<>("customer_id", "$_id")));
        // :snippet-end:
        // :snippet-start: unset
        pipeline.add(Aggregates.unset("_id"));
        // :snippet-end:
        // :snippet-start: run-pipeline
        AggregateIterable<Document> aggregationResult = orders.aggregate(pipeline);
        // :snippet-end:
        List<Document> documents = new ArrayList<>();
        for (Document document : aggregationResult) {
            documents.add(document);
        }
        mongoClient.close();
        return documents;
    }
}
