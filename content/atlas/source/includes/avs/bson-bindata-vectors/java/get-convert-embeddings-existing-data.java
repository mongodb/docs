import okhttp3.*;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;  
import com.mongodb.client.MongoClients;  
import com.mongodb.client.MongoCollection;  
import com.mongodb.client.MongoDatabase;  
import org.bson.Document;  
import org.bson.BinaryVector;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;  
import org.json.JSONArray;  
import org.json.JSONObject;  
  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.util.*;  
import java.util.concurrent.TimeUnit;  
  
public class GenerateAndConvertEmbeddings {  
    private static final Logger logger = LoggerFactory.getLogger(GenerateAndConvertEmbeddings.class);  
  
    // Configuration settings  
    private static final String VOYAGE_API_URL = "https://ai.mongodb.com/v1/embeddings"; // Voyage AI API URL  
    private static final String VOYAGE_API_KEY = System.getenv("VOYAGE_API_KEY");         // Voyage API key  
    private static final String MONGODB_URI = System.getenv("MONGODB_URI");               // MongoDB connection URI  
  
    // Timeout values for API requests  
    private static final int CONNECTION_TIMEOUT = 30; // Timeout for API requests  
    private static final int READ_TIMEOUT = 60;       // Timeout for API responses  
  
    public static void main(String[] args) {  
        try {  
            List<String> summaries = fetchSummariesFromMongoDB();  
            if (summaries.isEmpty()) {  
                throw new RuntimeException("No summaries retrieved from MongoDB.");  
            }  
  
            Document bsonEmbeddings = fetchEmbeddingsFromVoyage(summaries, VOYAGE_API_KEY);  
            if (bsonEmbeddings == null || bsonEmbeddings.isEmpty()) {  
                throw new RuntimeException("Failed to fetch embeddings.");  
            }  
  
            convertAndSaveEmbeddings(bsonEmbeddings);  
        } catch (Exception e) {  
            logger.error("Unexpected error: {}", e.getMessage(), e);  
        }  
    }  
  
    // Fetch summaries from MongoDB collection
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
  
            // Filter to exclude null or empty summaries  
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
  
    // Fetch embeddings from Voyage AI API for the given data input  
    private static Document fetchEmbeddingsFromVoyage(List<String> data, String apiKey) {  
        if (apiKey == null || apiKey.isEmpty()) {  
            throw new RuntimeException("API key is not set.");  
        }  
  
        OkHttpClient client = new OkHttpClient.Builder()  
                .connectTimeout(CONNECTION_TIMEOUT, TimeUnit.SECONDS)  
                .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)  
                .build();  
  
        List<List<List<Integer>>> embeddingsByOutputType = new ArrayList<>();  
        List<String> outputDtypes = List.of("float", "int8", "ubinary");  
  
        try {  
            for (String dtype : outputDtypes) {  
                String responseBody = sendRequest(client, apiKey, data, dtype);  
                embeddingsByOutputType.add(parseEmbeddings(responseBody, dtype));  
            }  
        } catch (IOException e) {  
            logger.error("Error fetching embeddings: {}", e.getMessage(), e);  
            throw new RuntimeException("Error fetching embeddings from Voyage AI.", e);  
        }  
  
        // Convert embeddings to BSON  
        return convertEmbeddingsToBson(data, embeddingsByOutputType);  
    }  
  
    // Send API request to Voyage AI  
    private static String sendRequest(OkHttpClient client, String apiKey, List<String> inputData, String outputDtype) throws IOException {  
        String requestBody = new JSONObject()  
                .put("input", inputData)  
                .put("model", "voyage-3-large")  
                .put("input_type", "document")  
                .put("output_dtype", outputDtype)  
                .put("output_dimension", 1024)  
                .toString();  
  
        Request request = new Request.Builder()  
                .url(VOYAGE_API_URL)  
                .post(RequestBody.create(requestBody, MediaType.get("application/json")))  
                .addHeader("Authorization", "Bearer " + apiKey)  
                .build();  
  
        try (Response response = client.newCall(request).execute()) {  
            if (!response.isSuccessful()) {  
                throw new IOException("API error: HTTP " + response.code());  
            }  
            return response.body().string();  
        }  
    }  
  
    // Parse embeddings from Voyage AI API response 
    private static List<List<Integer>> parseEmbeddings(String responseBody, String outputDtype) {  
        JSONObject responseJson = new JSONObject(responseBody);  
        JSONArray dataArray = responseJson.optJSONArray("data");  
  
        if (dataArray == null) {  
            throw new RuntimeException("Invalid response format: 'data' field missing.");  
        }  
  
        List<List<Integer>> embeddings = new ArrayList<>();  
        for (int i = 0; i < dataArray.length(); i++) {  
            JSONArray embeddingVector = dataArray.getJSONObject(i).getJSONArray("embedding");  
  
            List<Integer> vector = new ArrayList<>();  
            for (int j = 0; j < embeddingVector.length(); j++) {  
                int value = embeddingVector.getInt(j);  
  
                // Handle binary quantization offset for signed int8 representations  
                if ("binary".equals(outputDtype)) {  
                    value = value - 128; // Offset binary method  
                }  
  
                vector.add(value);  
            }  
            embeddings.add(vector);  
        }  
        return embeddings;  
    }  
  
    // Convert fetched embeddings into BSON format  
    private static Document convertEmbeddingsToBson(List<String> inputData, List<List<List<Integer>>> embeddingsByOutputType) {  
        List<Document> bsonEmbeddings = new ArrayList<>();  
        for (int i = 0; i < inputData.size(); i++) {  
            Document embedding = new Document()  
                    .append("text", inputData.get(i))  
                    .append("embeddings_float32", BinaryVector.floatVector(listToFloatArray(embeddingsByOutputType.get(0).get(i))))  
                    .append("embeddings_int8", BinaryVector.int8Vector(listToByteArray(embeddingsByOutputType.get(1).get(i))))  
                    .append("embeddings_int1", BinaryVector.packedBitVector(listToByteArray(embeddingsByOutputType.get(2).get(i)), (byte) 0));  
            bsonEmbeddings.add(embedding);  
        }  
        return new Document("data", bsonEmbeddings);  
    }  
  
    // Save BSON embeddings to a JSON file 
    private static void convertAndSaveEmbeddings(Document bsonEmbeddings) {  
        try (FileOutputStream fos = new FileOutputStream("embeddings.json")) {  
            fos.write(bsonEmbeddings.toJson().getBytes());  
            logger.info("Embeddings with BSON vectors have been saved to embeddings.json");  
        } catch (IOException e) {  
            logger.error("Error writing embeddings to file: {}", e.getMessage(), e);  
        }  
    }  
  
    private static float[] listToFloatArray(List<Integer> list) {  
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
