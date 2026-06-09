import com.mongodb.client.*;
import org.bson.Document;
import java.util.Arrays;

public class CreateIndex {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_training");
            MongoCollection<Document> collection = database.getCollection("companies");
            String indexName = "default";

            // Create the Atlas Search index definition for the embeddedDocuments field
            Document searchIdx = new Document(
                "mappings",
                new Document("dynamic", false)
                    .append("fields",
                        new Document("products",
                            new Document("type", "embeddedDocuments")
                                .append("dynamic", true)
                                .append("storedSource", true)
                        )
                    )
            ).append("storedSource",
                new Document("include", Arrays.asList("_id", "name"))
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}