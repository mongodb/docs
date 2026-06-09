import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");
            String indexName = "default";

            // Create the MongoDB Search index definition for the geo field
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", false)
                            .append("fields",
                                    new Document("address",
                                            new Document("type", "document")
                                                    .append("fields", new Document("location",
                                                            new Document("type", "geo")
                                                                    .append("indexShapes", true)))))
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}