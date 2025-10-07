import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_training");
            MongoCollection<Document> collection = database.getCollection("companies");
            String indexName = "default";

            // Create the Atlas Search index definition for the embeddedDocuments field with dynamic mapping
            Document searchIdx = new Document(
                "mappings",
                new Document("dynamic", false)
                    .append("fields",
                        new Document("relationships",
                            new Document("type", "embeddedDocuments")
                                .append("dynamic", new Document("typeSet", "stringBooleanIndex"))
                                .append("fields", new Document("person",
                                    new Document("type", "document")
                                        .append("dynamic", new Document("typeSet", "stringBooleanIndex"))
                                ))
                        )
                    )
            ).append("typeSets",
                java.util.Arrays.asList(
                    new Document("name", "stringBooleanIndex")
                        .append("types", java.util.Arrays.asList(
                            new Document("type", "boolean"),
                            new Document("type", "string")
                        ))
                )
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}