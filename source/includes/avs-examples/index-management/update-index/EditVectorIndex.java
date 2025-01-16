import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Collections;

public class EditVectorIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your Atlas connection string
        String uri = "<connectionString>";

        // Connect to your Atlas cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Define the index changes
            String indexName = "<indexName>";
            Bson definition = new Document(
                "fields",
                Collections.singletonList(
                    new Document("type", "vector")
                        .append("path", "<fieldToIndex>")
                        .append("numDimensions", <numberOfDimensions>)
                        .append("similarity", "euclidean | cosine | dotProduct")
                        .append("quantization", "none | scalar | binary")
                )
            );

            // Update the index
            try {
                collection.updateSearchIndex(indexName, definition);
                System.out.println("Successfully updated the index");
            } catch (Exception e) {
                throw new RuntimeException("Error creating index: " + e);
                mongoClient.close();
            }

        } catch (Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e);
        }
    }
}
