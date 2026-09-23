import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Arrays;

public class AddModifyFieldsCreateIndex {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listingsAndReviews_totalPrice");

            // Define your MongoDB Search index
            Document definition = new Document("mappings",
                new Document("dynamic", true))
                .append("storedSource",
                    new Document("include", Arrays.asList("totalPrice")));

            // Create the index
            String result = collection.createSearchIndex(
                "totalPriceIndex", definition);
            System.out.println("New index name: " + result);
        }
    }
}
