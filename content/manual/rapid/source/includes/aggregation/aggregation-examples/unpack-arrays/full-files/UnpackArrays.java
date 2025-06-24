package org.example;

import com.mongodb.client.*;
import com.mongodb.client.model.*;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class UnpackArrays {
    public static void main( String[] args ) {

        String uri = "<connection string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");

            // start-insert-orders
            MongoCollection<Document> orders = aggDB.getCollection("orders");
            orders.deleteMany(Filters.empty());

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
            // end-insert-orders

            List<Bson> pipeline = new ArrayList<>();

            // start-unwind
            pipeline.add(Aggregates.unwind("$products"));
            // end-unwind

            // start-match
            pipeline.add(Aggregates.match(
                    Filters.gt("products.price", 15)
            ));
            // end-match

            // start-group
            pipeline.add(Aggregates.group(
                    "$products.prod_id",
                    Accumulators.first("product", "$products.name"),
                    Accumulators.sum("total_value", "$products.price"),
                    Accumulators.sum("quantity", 1)
            ));
            // end-group

            // start-set
            pipeline.add(Aggregates.set(new Field<>("product_id", "$_id")));
            // end-set

            // start-unset
            pipeline.add(Aggregates.unset("_id"));
            // end-unset

            // start-run-agg
            AggregateIterable<Document> aggregationResult = orders.aggregate(pipeline);
            // end-run-agg

            for (Document document : aggregationResult) {
                System.out.println(document.toJson());
            }
        }
    }
}
