import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_supplies");
            MongoCollection<Document> collection = database.getCollection("sales");
            String indexName = "default";

            // Create the MongoDB Search index definition for the embeddedDocuments field with dynamic mapping
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", true)
                            .append("fields",
                                    new Document("items",
                                            new Document("dynamic", true)
                                                    .append("type", "embeddedDocuments"))
                                            .append("purchaseMethod",
                                                    new Document("type", "token")))
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}