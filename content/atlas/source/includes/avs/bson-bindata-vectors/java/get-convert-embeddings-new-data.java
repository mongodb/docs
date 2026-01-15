import okhttp3.*;  
import org.bson.BinaryVector;  
import org.bson.Document;  
import org.json.JSONArray;  
import org.json.JSONObject;  
  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.util.ArrayList;  
import java.util.List;  
import java.util.Objects;  
import java.util.concurrent.TimeUnit;  
  
public class GenerateAndConvertEmbeddings {  
    // Sample Data
    private static final List<String> DATA = List.of(  
            "The Great Wall of China is visible from space.",  
            "The Eiffel Tower was completed in Paris in 1889.",  
            "Mount Everest is the highest peak on Earth at 8,848m.",  
            "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",  
            "The Mona Lisa was painted by Leonardo da Vinci."  
    );  
  
    // Configuration settings
    private static final String VOYAGE_API_URL = "https://ai.mongodb.com/v1/embeddings";  
    private static final int CONNECTION_TIMEOUT = 30;  
    private static final int READ_TIMEOUT = 60;  
  
    public static void main(String[] args) {  
        String apiKey = System.getenv("VOYAGE_API_KEY");  // Replace with your actual API key  
  
        if (Objects.isNull(apiKey) || apiKey.isEmpty()) {  
            throw new RuntimeException("API key not found.");  
        }  
  
        Document bsonEmbeddings = fetchEmbeddings(apiKey);  
        writeToFile(bsonEmbeddings, "embeddings.json");  
    }  
  
    // Fetch embeddings from Voyage AI API using the given API key
    private static Document fetchEmbeddings(String apiKey) {  
        OkHttpClient client = new OkHttpClient.Builder()  
                .connectTimeout(CONNECTION_TIMEOUT, TimeUnit.SECONDS)  
                .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)  
                .build();  
  
        List<List<List<Integer>>> embeddingsByOutputType = new ArrayList<>();  
        List<String> outputDtypes = List.of("float", "int8", "ubinary");  
  
        try {  
            for (String dtype : outputDtypes) {  
                String responseBody = sendRequest(client, apiKey, dtype);  
                embeddingsByOutputType.add(parseEmbeddings(responseBody, dtype));  
            }  
        } catch (IOException e) {  
            throw new RuntimeException("Error fetching embeddings: " + e.getMessage(), e);  
        }  
  
        return convertEmbeddingsToBson(embeddingsByOutputType);  
    }  
  
    // Send API request to Voyage AI
    private static String sendRequest(OkHttpClient client, String apiKey, String outputDtype) throws IOException {  
        String requestBody = new JSONObject()  
                .put("input", DATA)  
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
  
                // Handle binary quantization offset  
                if ("binary".equals(outputDtype)) {  
                    value = value - 128; // Offset binary method (signed int8 representation)  
                }  
  
                vector.add(value);  
            }  
            embeddings.add(vector);  
        }  
        return embeddings;  
    }  
  
    // Convert fetched embeddings into BSON format
    private static Document convertEmbeddingsToBson(List<List<List<Integer>>> embeddingsByOutputType) {  
        List<Document> bsonEmbeddings = new ArrayList<>();  
        for (int i = 0; i < DATA.size(); i++) {  
            Document embedding = new Document()  
                    .append("text", DATA.get(i))  
                    .append("embeddings_float32", BinaryVector.floatVector(listToFloatArray(embeddingsByOutputType.get(0).get(i))))  
                    .append("embeddings_int8", BinaryVector.int8Vector(listToByteArray(embeddingsByOutputType.get(1).get(i)))) // Binary embeddings  
                    .append("embeddings_int1", BinaryVector.packedBitVector(listToByteArray(embeddingsByOutputType.get(2).get(i)), (byte) 0)); // Ubinary embeddings  
            bsonEmbeddings.add(embedding);  
        }  
        return new Document("data", bsonEmbeddings);  
    }  
  
    // Save BSON embeddings to a JSON file
    private static void writeToFile(Document bsonEmbeddings, String fileName) {  
        try (FileOutputStream fos = new FileOutputStream(fileName)) {  
            fos.write(bsonEmbeddings.toJson().getBytes());  
            System.out.println("Embeddings saved to " + fileName);  
        } catch (IOException e) {  
            throw new RuntimeException("Error saving file: " + e.getMessage(), e);  
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
