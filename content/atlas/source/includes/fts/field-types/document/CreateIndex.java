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

            // Create the MongoDB Search index definition for the document field
            Document searchIdx = new Document(
                "mappings",
                new Document("dynamic", <true|false> | new Document("typeset", "<type-set-name>")) // "dynamic" can be a boolean or an object with "typeset" name
                    .append("fields",
                        new Document("<field-name>",
                            new Document("type", "document")
                                .append("dynamic", <true|false> | new Document("typeset", "<type-set-name>")) // "dynamic" can be a boolean or an object with "typeset" name
                                .append("fields",
                                    new Document("<sub-field-name>",
                                        new Document() // Add field mapping definitions here
                                    )
                                    // ... additional sub-fields 
                                )
                        )
                        // ... additional fields 
                    )
            ).append("typeSets",
                java.util.Arrays.asList(
                    new Document("name", "<type-set-name>")
                        .append("types", java.util.Arrays.asList(
                            new Document("type", "<field-type>")
                            // ... field type configuration 
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
