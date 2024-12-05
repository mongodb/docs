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
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

public class EmbeddingGenerator {

    public static void main(String[] args) {

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new RuntimeException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // define parameters for the find() operation
            // NOTE: this example uses a limit to reduce processing time
            Bson projectionFields = Projections.fields(
                    Projections.include("_id", "summary"));
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
                            Updates.set("embeddings", embeddings.get(j)));
                    updateDocuments.add(updateDoc);
                }

                // bulk write the updated documents to the 'listingsAndReviews' collection
                int result = performBulkWrite(updateDocuments, collection);
                System.out.println("Added embeddings successfully to " + result + " documents.");
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
    private static int performBulkWrite(List<WriteModel<Document>> updateDocuments, MongoCollection<Document> collection) {

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
