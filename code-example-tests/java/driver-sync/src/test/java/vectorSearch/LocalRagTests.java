package vectorSearch;

import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.TimeUnit;
import mongodb.comparison.Expect;
import org.bson.BsonArray;
import org.bson.Document;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.Timeout;
import sampledatautil.RequiresSampleData;
import vectorSearch.localRag.EmbeddingGenerator;
import vectorSearch.localRag.LocalLLM;
import vectorSearch.localRag.OllamaModels;
import vectorSearch.localRag.VectorIndex;

/**
 * Tests the local RAG tutorial examples. These tests require a running Ollama
 * instance with the 'nomic-embed-text' and 'mistral' models pulled locally, and
 * skip automatically when Ollama is unreachable.
 *
 * <p>The examples write to the shared 'sample_airbnb.listingsAndReviews'
 * collection, so this class uses a dedicated 'embeddings_java' field and
 * 'local_rag_java_index' index name to avoid colliding with the other language
 * suites. Teardown removes both rather than dropping the sample database.
 */
// The suite-wide default timeout of 15s (see junit-platform.properties) exists to
// catch tests hanging on server selection. Embedding generation, index builds, and
// local LLM inference legitimately exceed it, so each test sets its own budget.
@RequiresSampleData(value = "sample_airbnb", collections = {"listingsAndReviews"})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Timeout(value = 10, unit = TimeUnit.MINUTES)
public class LocalRagTests {

    private static final String EMBEDDING_FIELD = "embeddings_java";
    private static final String INDEX_NAME = "local_rag_java_index";
    private static final int EXPECTED_DOCUMENT_COUNT = 250;

    private static final String uri = System.getenv("CONNECTION_STRING");
    private static MongoClient mongoClient;
    private static MongoCollection<Document> collection;

    @BeforeAll
    static void setUp() {
        assumeTrue(ollamaIsRunning(), "Ollama is not reachable at http://localhost:11434");
        mongoClient = MongoClients.create(uri);
        collection = mongoClient.getDatabase("sample_airbnb").getCollection("listingsAndReviews");
    }

    @AfterAll
    static void tearDown() {
        if (mongoClient == null) {
            return;
        }
        try {
            collection.updateMany(Filters.exists(EMBEDDING_FIELD), Updates.unset(EMBEDDING_FIELD));
            collection.dropSearchIndex(INDEX_NAME);
        } catch (RuntimeException e) {
            System.err.println("Cleanup skipped: " + e.getMessage());
        } finally {
            mongoClient.close();
        }
    }

    private static boolean ollamaIsRunning() {
        try (HttpClient client =
                HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build()) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:11434/api/tags"))
                    .timeout(Duration.ofSeconds(5))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() == 200
                    && response.body().contains("nomic-embed-text")
                    && response.body().contains("mistral");
        } catch (Exception e) {
            return false;
        }
    }

    @Test
    @Order(1)
    @DisplayName("Generates embeddings for the sample listings")
    void testGenerateEmbeddings() {
        int modifiedCount = new EmbeddingGenerator().generateEmbeddings();

        Expect.that(modifiedCount).shouldMatch(EXPECTED_DOCUMENT_COUNT);

        long documentsWithEmbeddings = collection.countDocuments(Filters.exists(EMBEDDING_FIELD));
        Expect.that(documentsWithEmbeddings).shouldMatch((long) EXPECTED_DOCUMENT_COUNT);

        Document embedded = collection.find(Filters.exists(EMBEDDING_FIELD)).first();
        Expect.that(embedded != null).shouldMatch(true);
        Expect.that(embedded.getList(EMBEDDING_FIELD, Double.class).size()).shouldMatch(768);
    }

    @Test
    @Order(2)
    @DisplayName("Creates a queryable vector search index")
    void testCreateVectorIndex() {
        String indexName = new VectorIndex().createVectorIndex();

        Expect.that(indexName).shouldMatch(INDEX_NAME);

        boolean indexIsQueryable = false;
        for (Document index : collection.listSearchIndexes()) {
            if (INDEX_NAME.equals(index.getString("name")) && Boolean.TRUE.equals(index.getBoolean("queryable"))) {
                indexIsQueryable = true;
            }
        }
        Expect.that(indexIsQueryable).shouldMatch(true);
    }

    @Test
    @Order(3)
    @DisplayName("Retrieves relevant listings using vector search")
    void testRetrieveDocuments() {
        String question =
                "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";

        // OllamaModels has no dedicated test; it is exercised transitively here
        // and in testGenerateEmbeddings. Assert that the query embedding matches
        // the stored 'embeddings_java' dimensions (768) so a wrong or empty query
        // vector can't silently return results and pass unnoticed.
        BsonArray queryEmbedding = OllamaModels.getEmbedding(question);
        Expect.that(queryEmbedding.size()).shouldMatch(768);

        List<Document> documents = LocalLLM.retrieveDocuments(question, collection);

        Expect.that(documents.size()).shouldMatch(5);
        for (Document document : documents) {
            Expect.that(document.getString("listing_url") != null).shouldMatch(true);
            Expect.that(document.getString("summary") != null).shouldMatch(true);
            Expect.that(document.getDouble("score") != null).shouldMatch(true);
            Expect.that(document.containsKey("_id")).shouldMatch(false);
        }
    }

    @Test
    @Order(4)
    @DisplayName("Generates an answer from the retrieved listings")
    void testRunLocalLlm() {
        String answer = new LocalLLM().runLocalLlm();

        Expect.that(answer != null).shouldMatch(true);
        Expect.that(answer.isBlank()).shouldMatch(false);
    }
}
