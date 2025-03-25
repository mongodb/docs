import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DeleteIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your Atlas connection string
        String uri = "<connectionString>";

        // Connect to your Atlas cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Specify the index to delete
            String indexName = "<indexName>";

			try {
                collection.dropSearchIndex(indexName);
            } catch (Exception e) {
                throw new RuntimeException("Error deleting index: " + e);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e);
        }
    }
}
