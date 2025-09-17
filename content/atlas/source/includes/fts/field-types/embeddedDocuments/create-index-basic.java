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

            // Create the MongoDB Search index definition for the embeddedDocuments field
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", false)
                            .append("fields",
                                    new Document("items",
                                            new Document("type", "embeddedDocuments")
                                                .append("dynamic", true)))
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}