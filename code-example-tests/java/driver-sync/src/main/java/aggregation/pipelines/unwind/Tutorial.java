package aggregation.pipelines.unwind;

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
import java.util.Collections;
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
                        new Document("order_id", 6363763262239f)
                                .append("products", Arrays.asList(
                                        new Document("prod_id", "abc12345")
                                                .append("name", "Asus Laptop")
                                                .append("price", 431),
                                        new Document("prod_id", "def45678")
                                                .append("name", "Karcher Hose Set")
                                                .append("price", 22)
                                )),
                        new Document("order_id", 1197372932325f)
                                .append("products", Collections.singletonList(
                                        new Document("prod_id", "abc12345")
                                                .append("name", "Asus Laptop")
                                                .append("price", 429)
                                )),
                        new Document("order_id", 9812343774839f)
                                .append("products", Arrays.asList(
                                        new Document("prod_id", "pqr88223")
                                                .append("name", "Morphy Richards Food Mixer")
                                                .append("price", 431),
                                        new Document("prod_id", "def45678")
                                                .append("name", "Karcher Hose Set")
                                                .append("price", 21)
                                )),
                        new Document("order_id", 4433997244387f)
                                .append("products", Arrays.asList(
                                        new Document("prod_id", "def45678")
                                                .append("name", "Karcher Hose Set")
                                                .append("price", 23),
                                        new Document("prod_id", "jkl77336")
                                                .append("name", "Picky Pencil Sharpener")
                                                .append("price", 1),
                                        new Document("prod_id", "xyz11228")
                                                .append("name", "Russell Hobbs Chrome Kettle")
                                                .append("price", 16)
                                ))
                )
        );
        // :snippet-end:
    }

    public List<Document> runTutorial() {
        List<Bson> pipeline = new ArrayList<>();
        // :snippet-start: unwind
        pipeline.add(Aggregates.unwind("$products"));
        // :snippet-end:
        // :snippet-start: match
        pipeline.add(Aggregates.match(
                Filters.gt("products.price", 15)
        ));
        // :snippet-end:
        // :snippet-start: group
        pipeline.add(Aggregates.group(
                "$products.prod_id",
                Accumulators.first("product", "$products.name"),
                Accumulators.sum("total_value", "$products.price"),
                Accumulators.sum("quantity", 1)
        ));
        // :snippet-end:
        // :snippet-start: set
        pipeline.add(Aggregates.set(new Field<>("product_id", "$_id")));
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
