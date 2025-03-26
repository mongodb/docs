import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.BinaryVector; // Import the BinaryVector

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.StreamSupport;

public class UploadDataAndCreateIndex {

    private static final String MONGODB_URI = System.getenv("MONGODB_URI");
    private static final String DB_NAME = "sample_airbnb";
    private static final String COLLECTION_NAME = "listingsAndReviews";
    private static final String INDEX_NAME = "<INDEX-NAME>";

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            uploadEmbeddingsData(mongoClient);
            setupVectorSearchIndex(mongoClient);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void uploadEmbeddingsData(MongoClient mongoClient) throws IOException {
        MongoDatabase database = mongoClient.getDatabase(DB_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
        String filePath = "embeddings.json";
        String fileContent = Files.readString(Path.of(filePath));

        Document rootDoc = Document.parse(fileContent);
        List<Document> embeddingsDocs = rootDoc.getList("data", Document.class);

        for (Document doc : embeddingsDocs) {
            // Retrieve the string value from the document
            String summary = doc.getString("text");

            // Get the BinaryVector objects from the document
            BinaryVector embeddingsFloat32 = doc.get("embeddings_float32", BinaryVector.class);
            BinaryVector embeddingsInt8 = doc.get("embeddings_int8", BinaryVector.class);
            BinaryVector embeddingsInt1 = doc.get("embeddings_int1", BinaryVector.class);

            // Create filter and update documents
            Document filter = new Document("summary", summary);
            Document update = new Document("$set", new Document("summary", summary)
                    .append("embeddings_float32", embeddingsFloat32)
                    .append("embeddings_int8", embeddingsInt8)
                    .append("embeddings_int1", embeddingsInt1));

            // Perform update operation with upsert option
            collection.updateOne(filter, update, new com.mongodb.client.model.UpdateOptions().upsert(true));
            System.out.println("Processed document with summary: " + summary);
        }
    }

    public static void setupVectorSearchIndex(MongoClient client) throws InterruptedException {
        MongoDatabase database = client.getDatabase(DB_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
        // Define the index details
        Bson definition = new Document(
            "fields",
            List.of(
                new Document("type", "vector")
                    .append("path", "embeddings_float32")
                    .append("numDimensions", 1024)
                    .append("similarity", "dotProduct"),
                new Document("type", "vector")
                    .append("path", "embeddings_int8")
                    .append("numDimensions", 1024)
                    .append("similarity", "dotProduct"),
                new Document("type", "vector")
                    .append("path", "embeddings_int1")
                    .append("numDimensions", 1024)
                    .append("similarity", "euclidean")
            )
        );
        // Define the index model
        SearchIndexModel indexModel = new SearchIndexModel(
            INDEX_NAME,
            definition,
            SearchIndexType.vectorSearch()
        );
        // Create the index using the defined model
        List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
        System.out.println("Successfully created vector index named: " + result.get(0));
        System.out.println("It may take up to a minute for the index to leave the BUILDING status and become queryable.");
        // Wait for Atlas to build the index
        System.out.println("Polling to confirm the index has changed from the BUILDING status.");
        waitForIndex(collection, INDEX_NAME);
    }

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
