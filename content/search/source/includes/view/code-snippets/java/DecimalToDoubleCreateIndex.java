import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DecimalToDoubleCreateIndex {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listings_SearchablePrice");

            // Define your MongoDB Search index
            Document definition = new Document("mappings",
                new Document("dynamic", true));

            // Create the index
            String result = collection.createSearchIndex(
                "listingsSearchablePrice", definition);
            System.out.println("New index name: " + result);
        }
    }
}
