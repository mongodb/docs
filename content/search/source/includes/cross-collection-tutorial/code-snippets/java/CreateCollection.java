import java.util.Arrays;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;
import org.bson.Document;

public class CreateCollection {

    public static void main(String[] args) {
        // Connect to your MongoDB deployment
        String uri = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // Set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_supplies");
            MongoCollection<Document> collection = database.getCollection("purchaseOrders");
            
            // Create first document
            Document purchaseOrder1 = new Document("saleDate", new Date(1516741609506L)) // 2018-01-23T21:06:49.506Z
                .append("items", Arrays.asList(
                    new Document("name", "printer paper")
                        .append("tags", Arrays.asList("office", "stationary"))
                        .append("price", 40.01)
                        .append("quantity", 2),
                    new Document("name", "notepad")
                        .append("tags", Arrays.asList("office", "writing", "school"))
                        .append("price", 35.29)
                        .append("quantity", 2),
                    new Document("name", "pens")
                        .append("tags", Arrays.asList("writing", "office", "school", "stationary"))
                        .append("price", 56.12)
                        .append("quantity", 5),
                    new Document("name", "backpack")
                        .append("tags", Arrays.asList("school", "travel", "kids"))
                        .append("price", 77.71)
                        .append("quantity", 2),
                    new Document("name", "notepad")
                        .append("tags", Arrays.asList("office", "writing", "school"))
                        .append("price", 18.47)
                        .append("quantity", 2),
                    new Document("name", "envelopes")
                        .append("tags", Arrays.asList("stationary", "office", "general"))
                        .append("price", 19.95)
                        .append("quantity", 8),
                    new Document("name", "envelopes")
                        .append("tags", Arrays.asList("stationary", "office", "general"))
                        .append("price", 8.08)
                        .append("quantity", 3),
                    new Document("name", "binder")
                        .append("tags", Arrays.asList("school", "general", "organization"))
                        .append("price", 14.16)
                        .append("quantity", 3)
                ))
                .append("storeLocation", "Denver")
                .append("customer", new Document()
                    .append("gender", "M")
                    .append("age", 42)
                    .append("email", "cauho@witwuta.sv")
                    .append("satisfaction", 4)
                )
                .append("couponUsed", true)
                .append("purchaseMethod", "Phone");
            
            // Create second document
            Document purchaseOrder2 = new Document("saleDate", new Date(1516874462918L)) // 2018-01-25T10:01:02.918Z
                .append("items", Arrays.asList(
                    new Document("name", "envelopes")
                        .append("tags", Arrays.asList("stationary", "office", "general"))
                        .append("price", 8.05)
                        .append("quantity", 10),
                    new Document("name", "binder")
                        .append("tags", Arrays.asList("school", "general", "organization"))
                        .append("price", 28.31)
                        .append("quantity", 9),
                    new Document("name", "notepad")
                        .append("tags", Arrays.asList("office", "writing", "school"))
                        .append("price", 20.95)
                        .append("quantity", 3),
                    new Document("name", "laptop")
                        .append("tags", Arrays.asList("electronics", "school", "office"))
                        .append("price", 866.5)
                        .append("quantity", 4),
                    new Document("name", "notepad")
                        .append("tags", Arrays.asList("office", "writing", "school"))
                        .append("price", 33.09)
                        .append("quantity", 4),
                    new Document("name", "printer paper")
                        .append("tags", Arrays.asList("office", "stationary"))
                        .append("price", 37.55)
                        .append("quantity", 1),
                    new Document("name", "backpack")
                        .append("tags", Arrays.asList("school", "travel", "kids"))
                        .append("price", 83.28)
                        .append("quantity", 2),
                    new Document("name", "pens")
                        .append("tags", Arrays.asList("writing", "office", "school", "stationary"))
                        .append("price", 42.9)
                        .append("quantity", 4),
                    new Document("name", "envelopes")
                        .append("tags", Arrays.asList("stationary", "office", "general"))
                        .append("price", 16.68)
                        .append("quantity", 2)
                ))
                .append("storeLocation", "Seattle")
                .append("customer", new Document()
                    .append("gender", "M")
                    .append("age", 50)
                    .append("email", "keecade@hem.uy")
                    .append("satisfaction", 5)
                )
                .append("couponUsed", false)
                .append("purchaseMethod", "Phone");
            
            // Insert the documents
            collection.insertOne(purchaseOrder1);
            collection.insertOne(purchaseOrder2);
            
            System.out.println("Successfully inserted purchase order documents.");
            
            // Query the new collection
            MongoCursor<Document> cursor = collection.find()
                .sort(Sorts.descending("saleDate"))
                .iterator();
            
            System.out.println("\nQuery results:");
            try {
                while (cursor.hasNext()) {
                    System.out.println(cursor.next().toJson());
                }
            } finally {
                cursor.close();
            }
        }
    }
}
