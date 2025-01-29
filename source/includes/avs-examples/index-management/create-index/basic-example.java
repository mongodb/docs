import com.mongodb.client.ListSearchIndexesIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
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

            // Create the index
            try {
                List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                System.out.println("New search index named " + result.get(0) + " is building.");
            } catch (Exception e) {
                throw new RuntimeException("Error creating index: " + e);
            }

            // Wait for Atlas to build the index
            System.out.println("Polling to check if the index is ready. This may take up to a minute.");

            ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
            Document doc = null;
            while (doc == null) {
                try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                    if (!cursor.hasNext()) {
                        break;
                    }
                    Document current = cursor.next();
                    String name = current.getString("name");
                    // When the index completes building, it becomes `queryable`
                    boolean queryable = current.getBoolean("queryable");
                    if (name.equals(indexName) && queryable) {
                        doc = current;
                    } else {
                        Thread.sleep(500);
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Failed to list search indexes: " + e);
                }
            }
            System.out.println(indexName + " is ready for querying.");

        } catch (Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e);
        }
    }
}
