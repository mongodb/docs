import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.StreamSupport;

public class CreateIndexes {

    public static void main(String[] args) {

        // Replace the placeholder with your connection string
        String uri = "<connectionString>";

        // Connect to your cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("embedded_movies");

            // Define the auto-embed index details
            String autoEmbedIndexName = "multiple-auto-embed-search";
            Bson autoEmbedDefinition = new Document(
                "fields",
                Arrays.asList(
                    new Document("type", "autoEmbed")
                        .append("modality", "text")
                        .append("path", "fullplot")
                        .append("model", "voyage-4")
                        .append("numDimensions", 2048),
                    new Document("type", "autoEmbed")
                        .append("modality", "text")
                        .append("path", "title")
                        .append("model", "voyage-4")
                        .append("numDimensions", 2048)));

            // Define the vector index details
            String vectorIndexName = "multiple-models-search";
            Bson vectorDefinition = new Document(
                "fields",
                Arrays.asList(
                    new Document("type", "vector")
                        .append("path", "plot_embedding")
                        .append("numDimensions", 1536)
                        .append("similarity", "dotProduct")));

            // Define the index models
            List<SearchIndexModel> indexModels = Arrays.asList(
                new SearchIndexModel(autoEmbedIndexName, autoEmbedDefinition, SearchIndexType.vectorSearch()),
                new SearchIndexModel(vectorIndexName, vectorDefinition, SearchIndexType.vectorSearch()));

            // Create the indexes using the defined models
            List<String> result = collection.createSearchIndexes(indexModels);
            for (String indexName : result) {
                System.out.println("Successfully created vector index named: " + indexName);
            }
            System.out.println("Wait for the indexes to leave the BUILDING status and become queryable.");

            // Wait for indexes to build and become queryable
            System.out.println("Polling to confirm the indexes have left the BUILDING status.");
            // No special handling in case of a timeout. Custom handling can be implemented.
            for (String indexName : result) {
                waitForIndex(collection, indexName);
            }
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
