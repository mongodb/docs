import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndexExample {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_training");
            
            // Get collections
            MongoCollection<Document> companiesCollection = database.getCollection("companies");
            MongoCollection<Document> inspectionsCollection = database.getCollection("inspections");
            
            String indexName = "default";

            // Create the MongoDB Search index definition with dynamic mapping
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", true)
            );
            
            // Create index on companies collection
            companiesCollection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name for companies: " + indexName);
            
            // Create index on inspections collection
            inspectionsCollection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name for inspections: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}
