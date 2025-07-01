import com.mongodb.MongoException;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.BulkWriteOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.Updates;
import com.mongodb.client.model.WriteModel;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

public class CreateEmbeddings {

    public static void main(String[] args){

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new RuntimeException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            Bson filterCriteria = Filters.and(
                    Filters.and(Filters.exists("summary"),
                            Filters.ne("summary", null),
                            Filters.ne("summary", "")),
                    Filters.exists("embeddings", false));

            try (MongoCursor<Document> cursor = collection.find(filterCriteria).limit(50).iterator()) {
                List<String> summaries = new ArrayList<>();
                List<String> documentIds = new ArrayList<>();

                int i = 0;
                while (cursor.hasNext()) {
                    Document document = cursor.next();
                    String summary = document.getString("summary");
                    String id = document.get("_id").toString();
                    summaries.add(summary);
                    documentIds.add(id);
                    i++;
                }

                System.out.println("Generating embeddings for " + summaries.size() + " documents.");
                System.out.println("This operation may take up to several minutes.");
                EmbeddingProvider embeddingProvider = new EmbeddingProvider();
                List<BsonArray> embeddings = embeddingProvider.getEmbeddings(summaries);

                List<WriteModel<Document>> updateDocuments = new ArrayList<>();
                for (int j = 0; j < summaries.size(); j++) {
                    UpdateOneModel<Document> updateDoc = new UpdateOneModel<>(
                            Filters.eq("_id", documentIds.get(j)),
                            Updates.set("embeddings", embeddings.get(j)));
                    updateDocuments.add(updateDoc);
                }

                int updatedDocsCount = 0;
                try {
                    BulkWriteOptions options = new BulkWriteOptions().ordered(false);
                    BulkWriteResult result = collection.bulkWrite(updateDocuments, options);
                    updatedDocsCount = result.getModifiedCount();
                } catch (MongoException me) {
                    throw new RuntimeException("Failed to insert documents", me);
                }
                System.out.println("Added embeddings successfully to " + updatedDocsCount + " documents.");
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }
}
