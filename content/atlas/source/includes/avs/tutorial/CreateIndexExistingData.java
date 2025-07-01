import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.ListSearchIndexesIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;
import org.bson.conversions.Bson;
import java.util.Collections;
import java.util.List;

public class CreateIndex {

    public static void main(String[] args) {

        String uri = System.getenv("ATLAS_CONNECTION_STRING");

        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // define the index details
            String indexName = "vector_index";
            int dimensionsHuggingFaceModel = 1024;
            int dimensionsOpenAiModel = 1536;

            Bson definition = new Document(
                    "fields",
                    Collections.singletonList(
                            new Document("type", "vector")
                                    .append("path", "embeddings")
                                    .append("numDimensions", <dimensions>) // replace with var for the model used
                                    .append("similarity", "dotProduct")));

            // define the index model using the specified details
            SearchIndexModel indexModel = new SearchIndexModel(
                    indexName,
                    definition,
                    SearchIndexType.vectorSearch());

            // create the index using the model
            try {
                List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                System.out.println("Successfully created a vector index named: " + result);
                System.out.println("It may take up to a minute for the index to build before you can query using it.");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            // wait for Atlas to build the index and make it queryable
            System.out.println("Polling to confirm the index has completed building.");

            ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
            Document doc = null;
            while (doc == null) {
                try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                    if (!cursor.hasNext()) {
                        break;
                    }
                    Document current = cursor.next();
                    String name = current.getString("name");
                    boolean queryable = current.getBoolean("queryable");
                    if (name.equals(indexName) && queryable) {
                        doc = current;
                    } else {
                        Thread.sleep(500);
                    }
                }  catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            System.out.println(indexName + " index is ready to query");

        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB ", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }
}
