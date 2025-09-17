import com.mongodb.client.*;
import org.bson.Document;

public class CreateIndexExample {
    public static void main(String[] args) {
        // Replace the connection string with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_supplies");
            MongoCollection<Document> collection = database.getCollection("monthlyPhoneTransactions");
            String indexName = "monthlySalesIndex";

            // Create the MongoDB Search index definition for the document field
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", true)
            );
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}
