import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class ViewVectorIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your Atlas connection string
        String uri = "<connectionString>";

        // Connect to your Atlas cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Specify the options for the index to retrieve
            String indexName = "<indexName>";

            // Get the index and print details to the console as JSON
            try {
                Document listSearchIndex = collection.listSearchIndexes().name(indexName).first();
                if (listSearchIndex != null) {
                    System.out.println("Index found: " + listSearchIndex.toJson());
                } else {
                    System.out.println("Index not found.");
                }
            } catch (Exception e) {
                throw new RuntimeException("Error finding index: " + e);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e);
        }
    }
}
