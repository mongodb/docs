import com.cohere.api.Cohere;
import com.cohere.api.requests.EmbedRequest;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedResponse;
import com.cohere.api.types.EmbeddingType;
import com.cohere.api.types.EmbedInputType;
import com.cohere.api.types.EmbedByTypeResponseEmbeddings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.BinaryVector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class GenerateAndConvertEmbeddings {
    private static final Logger logger = LoggerFactory.getLogger(GenerateAndConvertEmbeddings.class);
    private static final String COHERE_API_KEY = System.getenv("COHERE_API_KEY");
    private static final String MONGODB_URI = System.getenv("MONGODB_URI");

    public static void main(String[] args) {
        try {
            List<String> summaries = fetchSummariesFromMongoDB();
            if (summaries.isEmpty()) {
                throw new RuntimeException("No summaries retrieved from MongoDB.");
            }
            EmbedByTypeResponseEmbeddings embeddingsData = fetchEmbeddingsFromCohere(COHERE_API_KEY, summaries);
            if (embeddingsData == null) {
                throw new RuntimeException("Failed to fetch embeddings.");
            }
            convertAndSaveEmbeddings(summaries, embeddingsData);
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
        }
    }

    private static List<String> fetchSummariesFromMongoDB() {
        List<String> summaries = new ArrayList<>();
        if (MONGODB_URI == null || MONGODB_URI.isEmpty()) {
            throw new RuntimeException("MongoDB URI is not set.");
        }
        logger.info("Connecting to MongoDB at URI: {}", MONGODB_URI);
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            String dbName = "sample_airbnb";
            String collName = "listingsAndReviews";
            MongoDatabase database = mongoClient.getDatabase(dbName);
            MongoCollection<Document> collection = database.getCollection(collName);
            Document filter = new Document("summary", new Document("$nin", Arrays.asList(null, "")));
            FindIterable<Document> documentsCursor = collection.find(filter).limit(50);
            for (Document doc : documentsCursor) {
                String summary = doc.getString("summary");
                if (summary != null && !summary.isEmpty()) {
                    summaries.add(summary);
                }
            }
            logger.info("Retrieved {} summaries from MongoDB.", summaries.size());
        } catch (Exception e) {
            logger.error("Error fetching from MongoDB: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch data from MongoDB", e);
        }
        return summaries;
    }

    private static EmbedByTypeResponseEmbeddings fetchEmbeddingsFromCohere(String apiKey, List<String> data) {
        if (Objects.isNull(apiKey) || apiKey.isEmpty()) {
            throw new RuntimeException("API key is not set.");
        }
        Cohere cohere = Cohere.builder().token(apiKey).clientName("embed-example").build();
        try {
            EmbedRequest request = EmbedRequest.builder()
                    .model("embed-english-v3.0")
                    .inputType(EmbedInputType.SEARCH_DOCUMENT)
                    .texts(data)
                    .embeddingTypes(List.of(EmbeddingType.FLOAT, EmbeddingType.INT_8, EmbeddingType.UBINARY))
                    .build();
            EmbedResponse response = cohere.embed(request);
            Optional<EmbedByTypeResponse> optionalEmbeddingsWrapper = response.getEmbeddingsByType();
            if (optionalEmbeddingsWrapper.isPresent()) {
                return optionalEmbeddingsWrapper.get().getEmbeddings();
            } else {
                logger.warn("No embeddings were returned.");
            }
        } catch (Exception e) {
            logger.error("Error fetching embeddings: {}", e.getMessage(), e);
        }
        return null;
    }

    private static void convertAndSaveEmbeddings(List<String> summaries, EmbedByTypeResponseEmbeddings embeddings) {
        try {
            Document doc = new Document();
            BsonArray array = new BsonArray();
            for (int i = 0; i < summaries.size(); i++) {
                String summary = summaries.get(i);

                // Retrieve the embeddings for the current index
                List<Double> floatList = embeddings.getFloat().orElseThrow().get(i);
                List<Integer> int8List = embeddings.getInt8().orElseThrow().get(i);
                List<Integer> ubinaryList = embeddings.getUbinary().orElseThrow().get(i);

                // Convert lists to arrays
                float[] floatData = listToFloatArray(floatList);
                byte[] int8Data = listToByteArray(int8List);
                byte[] int1Data = listToByteArray(ubinaryList);

                // Create BinaryVector objects
                BinaryVector floatVector = BinaryVector.floatVector(floatData);
                BinaryVector int8Vector = BinaryVector.int8Vector(int8Data);
                BinaryVector packedBitsVector = BinaryVector.packedBitVector(int1Data, (byte) 0);

                Document document = new Document()
                        .append("text", summary)
                        .append("embeddings_float32", floatVector)
                        .append("embeddings_int8", int8Vector)
                        .append("embeddings_int1", packedBitsVector);
                array.add(document.toBsonDocument());
            }
            doc.append("data", array);
            try (FileOutputStream fos = new FileOutputStream("embeddings.json")) {
                fos.write(doc.toJson().getBytes());
            }
            logger.info("Embeddings with BSON vectors have been saved to embeddings.json");
        } catch (IOException e) {
            logger.error("Error writing embeddings to file: {}", e.getMessage(), e);
        }
    }

    private static float[] listToFloatArray(List<Double> list) {
        float[] array = new float[list.size()];
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i).floatValue();
        }
        return array;
    }

    private static byte[] listToByteArray(List<Integer> list) {
        byte[] array = new byte[list.size()];
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i).byteValue();
        }
        return array;
    }
}
