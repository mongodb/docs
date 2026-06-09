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

            // Create the MongoDB Search index definition for the embeddedDocuments field
            Document searchIdx = new Document("mappings",
                new Document("dynamic", true) // or false, or new Document("typeset", "<type-set-name>")
                    .append("fields", new Document(
                        "<field-name>", new Document()
                            .append("type", "embeddedDocuments")
                            .append("dynamic", true) // or false, or new Document("typeSet", "<type-set-name>")
                            .append("fields", new Document(
                                "<field-name>", new Document()
                                    // <field-mapping-definition>
                            ))
                            .append("storedSource", true) // or false, or new Document("include", java.util.Arrays.asList("<field-name>", ...)) or new Document("exclude", java.util.Arrays.asList("<field-name>", ...))
                        )
                        // ... additional fields
                    ))
            ).append("typeSets",
                java.util.Arrays.asList(
                    new Document("name", "<type-set-name>")
                        .append("types", java.util.Arrays.asList(
                            new Document("type", "<field-type>")
                                // ... additional field type configuration
                            // ... additional types
                        ))
                    // ... additional typeSets
                )
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}