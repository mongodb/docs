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

            // Create the MongoDB Search index definition for the geo field
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", true|false)
                            .append("fields",
                                    new Document("<field-name>",
                                            new Document("type", "geo")
                                                .append("indexShapes", true|false)
            )));
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}
