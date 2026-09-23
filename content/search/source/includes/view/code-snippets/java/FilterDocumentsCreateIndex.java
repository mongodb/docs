import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class FilterDocumentsCreateIndex {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection =
                database.getCollection("movies_ReleasedAfter2000");

            // Define your MongoDB Search index
            Document definition = new Document("mappings",
                new Document("dynamic", true));

            // Create the index
            String result = collection.createSearchIndex(
                "releasedAfter2000Index", definition);
            System.out.println("New index name: " + result);
        }
    }
}
