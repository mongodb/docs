//	:replace-start: {
//	  "terms": {
//      "public int generateEmbeddings()": "public static void main(String[] args)",
//      "CONNECTION_STRING": "MONGODB_URI",
//      "embeddings_java": "embeddings"
//	  }
//	}
package vectorSearch.localRag;

// :snippet-start: generate-embeddings
import com.mongodb.MongoException;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.BulkWriteOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.Updates;
import com.mongodb.client.model.WriteModel;
import java.util.ArrayList;
import java.util.List;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;

public class EmbeddingGenerator {

    public int generateEmbeddings() {

        String uri = System.getenv("CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new RuntimeException("CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // define parameters for the find() operation
            // NOTE: this example uses a limit to reduce processing time
            Bson projectionFields = Projections.fields(Projections.include("_id", "summary"));
            Bson filterSummary = Filters.ne("summary", "");
            int limit = 250;

            try (MongoCursor<Document> cursor = collection
                    .find(filterSummary)
                    .projection(projectionFields)
                    .limit(limit)
                    .iterator()) {

                List<String> summaries = new ArrayList<>();
                List<String> documentIds = new ArrayList<>();

                while (cursor.hasNext()) {
                    Document document = cursor.next();
                    String summary = document.getString("summary");
                    String id = document.get("_id").toString();
                    summaries.add(summary);
                    documentIds.add(id);
                }

                // generate embeddings for the summary in each document
                // and add to the document to the 'embeddings' array field
                System.out.println("Generating embeddings for " + summaries.size() + " documents.");
                System.out.println("This operation may take up to several minutes.");
                List<BsonArray> embeddings = OllamaModels.getEmbeddings(summaries);

                List<WriteModel<Document>> updateDocuments = new ArrayList<>();
                for (int j = 0; j < summaries.size(); j++) {
                    UpdateOneModel<Document> updateDoc = new UpdateOneModel<>(
                            Filters.eq("_id", documentIds.get(j)),
                            Updates.set("embeddings_java", embeddings.get(j)));
                    updateDocuments.add(updateDoc);
                }

                // bulk write the updated documents to the 'listingsAndReviews' collection
                int result = performBulkWrite(updateDocuments, collection);
                System.out.println("Added embeddings successfully to " + result + " documents.");
                return result; // :remove:
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }

    /**
     * Performs a bulk write operation on the specified collection.
     */
    private static int performBulkWrite(
            List<WriteModel<Document>> updateDocuments, MongoCollection<Document> collection) {

        if (updateDocuments.isEmpty()) {
            return 0;
        }

        BulkWriteResult result;
        try {
            BulkWriteOptions options = new BulkWriteOptions().ordered(false);
            result = collection.bulkWrite(updateDocuments, options);
            return result.getModifiedCount();
        } catch (MongoException me) {
            throw new RuntimeException("Failed to insert documents", me);
        }
    }
}
// :snippet-end:
// :replace-end:
