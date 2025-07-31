import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("<database>");
            MongoCollection<Document> collection = database.getCollection("<collection>");
            String indexName = "default";

            // Create the Atlas Search index definition for the embeddedDocuments field
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", true|false)
                            .append("fields",
                                    new Document("<field-name>",
                                            new Document("type", "embeddedDocuments")
                                                .append("dynamic", true|false)
                                                .append("fields",
                                                    new Document("<field-name>",
                                                        new Document("type", "<field-type>")
                                                        // Add additional field mapping definitions here
                                                    )
                                                )
                                    )
                            )
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}