import com.mongodb.MongoException;
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

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // define the index details for the index model
            String indexName = "vector_index";
            Bson definition = new Document(
                    "fields",
                    Collections.singletonList(
                            new Document("type", "vector")
                                    .append("path", "embeddings")
                                    .append("numDimensions", 768)
                                    .append("similarity", "cosine")));
            SearchIndexModel indexModel = new SearchIndexModel(
                    indexName,
                    definition,
                    SearchIndexType.vectorSearch());

            // create the index using the defined model
            try {
                List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                System.out.println("Successfully created a vector index named: " + result);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // wait for Atlas to build the index and make it queryable
            System.out.println("Polling to confirm the index has completed building.");
            System.out.println("It may take up to a minute for the index to build before you can query using it.");
            waitForIndexReady(collection, indexName);


        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB ", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }

    /**
     * Polls the collection to check whether the specified index is ready to query.
     */
    public static void waitForIndexReady(MongoCollection<Document> collection, String indexName) throws InterruptedException {
        ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
        while (true) {
            try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                if (!cursor.hasNext()) {
                    break;
                }
                Document current = cursor.next();
                String name = current.getString("name");
                boolean queryable = current.getBoolean("queryable");
                if (name.equals(indexName) && queryable) {
                    System.out.println(indexName + " index is ready to query");
                    return;
                } else {
                    Thread.sleep(500);
                }
            }
        }
    }
}
