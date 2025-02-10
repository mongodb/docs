import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Collections;
import java.util.List;

public class VectorIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your Atlas connection string
        String uri = "<connectionString>";

        // Connect to your Atlas cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("embedded_movies");

            // Define the index details
            String indexName = "vector_index";
            Bson definition = new Document(
                "fields",
                Collections.singletonList(
                    new Document("type", "vector")
                        .append("path", "plot_embedding")
                        .append("numDimensions", 1536)
                        .append("similarity", "dotProduct")
                        .append("quantization", "scalar")));

            // Define the index model
            SearchIndexModel indexModel = new SearchIndexModel(
                indexName,
                definition,
                SearchIndexType.vectorSearch());

            // Create the index using the defined model
            List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
            System.out.println("Successfully created vector index named: " + result.get(0));
            System.out.println("It may take up to a minute for the index to leave the BUILDING status and become queryable.");

            // Wait for Atlas to build the index
            System.out.println("Polling to confirm the index has left the BUILDING status.");
            // No special handling in case of a timeout. Custom handling can be implemented.    
            waitForIndex(collection, indexName);
        }
    }

    /**
     * Polls the collection to check whether the specified index is ready to query.
     */
    public static <T> boolean waitForIndex(final MongoCollection<T> collection, final String indexName) {
        long startTime = System.nanoTime();
        long timeoutNanos = TimeUnit.SECONDS.toNanos(60);
        while (System.nanoTime() - startTime < timeoutNanos) {
            Document indexRecord = StreamSupport.stream(collection.listSearchIndexes().spliterator(), false)
                    .filter(index -> indexName.equals(index.getString("name")))
                    .findAny().orElse(null);
            if (indexRecord != null) {
                if ("FAILED".equals(indexRecord.getString("status"))) {
                    throw new RuntimeException("Search index has FAILED status.");
                }
                if (indexRecord.getBoolean("queryable")) {
                    System.out.println(indexName + " index is ready to query");
                    return true;
                }
            }
            try {
                Thread.sleep(100); // busy-wait, avoid in production
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
        }
        return false;
    }
}
