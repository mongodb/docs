package aggregation.pipelines.joinMultiField;

import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Variable;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Tutorial {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoCollection<Document> products;

    public void loadSampleData() {
        mongoClient = MongoClients.create(uri);
        // :snippet-start: load-sample-data
        MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");
        // :uncomment-start:
        // MongoCollection<Document> products = aggDB.getCollection("products");
        // :uncomment-end:
        products = aggDB.getCollection("products"); // :remove:
        MongoCollection<Document> orders = aggDB.getCollection("orders");

        products.insertMany(
                Arrays.asList(
                        new Document("name", "Asus Laptop")
                                .append("variation", "Ultra HD")
                                .append("category", "ELECTRONICS")
                                .append("description", "Great for watching movies"),

                        new Document("name", "Asus Laptop")
                                .append("variation", "Standard Display")
                                .append("category", "ELECTRONICS")
                                .append("description", "Good value laptop for students"),

                        new Document("name", "The Day Of The Triffids")
                                .append("variation", "1st Edition")
                                .append("category", "BOOKS")
                                .append("description", "Classic post-apocalyptic novel"),

                        new Document("name", "The Day Of The Triffids")
                                .append("variation", "2nd Edition")
                                .append("category", "BOOKS")
                                .append("description", "Classic post-apocalyptic novel"),

                        new Document("name", "Morphy Richards Food Mixer")
                                .append("variation", "Deluxe")
                                .append("category", "KITCHENWARE")
                                .append("description", "Luxury mixer turning good cakes into great")
                )
        );

        orders.insertMany(
                Arrays.asList(
                        new Document("customer_id", "elise_smith@myemail.com")
                                .append("orderdate", LocalDateTime.parse("2020-05-30T08:35:52"))
                                .append("product_name", "Asus Laptop")
                                .append("product_variation", "Standard Display")
                                .append("value", 431.43),

                        new Document("customer_id", "tj@wheresmyemail.com")
                                .append("orderdate", LocalDateTime.parse("2019-05-28T19:13:32"))
                                .append("product_name", "The Day Of The Triffids")
                                .append("product_variation", "2nd Edition")
                                .append("value", 5.01),

                        new Document("customer_id", "oranieri@warmmail.com")
                                .append("orderdate", LocalDateTime.parse("2020-01-01T08:25:37"))
                                .append("product_name", "Morphy Richards Food Mixer")
                                .append("product_variation", "Deluxe")
                                .append("value", 63.13),

                        new Document("customer_id", "jjones@tepidmail.com")
                                .append("orderdate", LocalDateTime.parse("2020-12-26T08:55:46"))
                                .append("product_name", "Asus Laptop")
                                .append("product_variation", "Standard Display")
                                .append("value", 429.65)
                )
        );
        // :snippet-end:
    }

    public List<Document> runTutorial() {
        List<Bson> pipeline = new ArrayList<>();
        // :snippet-start: embedded-pl-match-name-variation
        List<Bson> embeddedPipeline = new ArrayList<>();

        embeddedPipeline.add(Aggregates.match(
                Filters.expr(
                        Filters.and(
                                new Document("$eq", Arrays.asList("$product_name", "$$prdname")),
                                new Document("$eq", Arrays.asList("$product_variation", "$$prdvartn"))
                        )
                )
        ));
        // :snippet-end:
        // :snippet-start: embedded-pl-match-orderdate
        embeddedPipeline.add(Aggregates.match(Filters.and(
                Filters.gte("orderdate", LocalDateTime.parse("2020-01-01T00:00:00")),
                Filters.lt("orderdate", LocalDateTime.parse("2021-01-01T00:00:00"))
        )));
        // :snippet-end:
        // :snippet-start: embedded-pl-unset
        embeddedPipeline.add(Aggregates.unset("_id", "product_name", "product_variation"));
        // :snippet-end:
        // :snippet-start: lookup
        pipeline.add(Aggregates.lookup(
                "orders",
                Arrays.asList(
                        new Variable<>("prdname", "$name"),
                        new Variable<>("prdvartn", "$variation")
                ),
                embeddedPipeline,
                "orders"
        ));
        // :snippet-end:
        // :snippet-start: match
        pipeline.add(Aggregates.match(
                Filters.ne("orders", new ArrayList<>())
        ));
        // :snippet-end:
        // :snippet-start: unset
        pipeline.add(Aggregates.unset("_id", "description"));
        // :snippet-end:
        // :snippet-start: run-pipeline
        AggregateIterable<Document> aggregationResult = products.aggregate(pipeline);
        // :snippet-end:
        List<Document> documents = new ArrayList<>();
        for (Document document : aggregationResult) {
            documents.add(document);
        }
        mongoClient.close();
        return documents;
    }
}
