import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.StreamSupport;

public class UploadDataAndCreateIndex {

    private static final String MONGODB_URI = System.getenv("MONGODB_URI");
    private static final String DB_NAME = "<DATABASE-NAME>";
    private static final String COLLECTION_NAME = "<COLLECTION-NAME>";
    private static final String INDEX_NAME = "<INDEX-NAME>";

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            storeEmbeddings(mongoClient);
            setupVectorSearchIndex(mongoClient);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void storeEmbeddings(MongoClient client) throws IOException {
        MongoDatabase database = client.getDatabase(DB_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

        String fileContent = Files.readString(Path.of("embeddings.json"));
        List<Document> documents = parseDocuments(fileContent);

        collection.insertMany(documents);
        System.out.println("Inserted documents into MongoDB");
    }

    private static List<Document> parseDocuments(String jsonContent) throws IOException {
        Document rootDoc = Document.parse(jsonContent);
        return rootDoc.getList("data", Document.class);
    }

    public static void setupVectorSearchIndex(MongoClient client) throws InterruptedException {
        MongoDatabase database = client.getDatabase(DB_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
        
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
        
        SearchIndexModel indexModel = new SearchIndexModel(
            INDEX_NAME,
            definition,
            SearchIndexType.vectorSearch()
        );
        
        List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
        System.out.println("Successfully created vector index named: " + result.get(0));
        System.out.println("It may take up to a minute for the index to leave the BUILDING status and become queryable.");
        
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
