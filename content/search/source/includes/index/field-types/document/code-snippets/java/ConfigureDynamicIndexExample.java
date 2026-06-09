import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndexExample {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            String indexName = "default";

            // Create the Atlas Search index definition for the document field
            Document searchIdx = new Document(
                "mappings",
                new Document("dynamic", false)
                    .append("fields",
                        new Document("awards",
                            new Document("type", "document")
                                .append("dynamic", new Document("typeSet", "onlyNumbers"))
                        )
                    )
            ).append("typeSets",
                java.util.Arrays.asList(
                    new Document("name", "onlyNumbers")
                        .append("types", java.util.Arrays.asList(
                            new Document("type", "number")
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