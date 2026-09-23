import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class FacetFieldsCreateIndex {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listings_SearchableTypes");

            // Define your MongoDB Search index
            Document definition = new Document("mappings",
                new Document("dynamic", true)
                    .append("fields", new Document("idString",
                        new Document("type", "token"))
                        .append("superHostString",
                            new Document("type", "token"))));

            // Create the index
            String result = collection.createSearchIndex(
                "listingsSearchableTypes", definition);
            System.out.println("New index name: " + result);
        }
    }
}
