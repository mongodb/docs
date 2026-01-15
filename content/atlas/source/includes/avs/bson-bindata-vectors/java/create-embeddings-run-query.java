import okhttp3.*;  
import com.mongodb.client.MongoClient;  
import com.mongodb.client.MongoClients;  
import com.mongodb.client.MongoCollection;  
import com.mongodb.client.MongoDatabase;  
import org.bson.BinaryVector;  
import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;  
import org.json.JSONObject;  
  
import java.io.IOException;  
import java.util.*;  
import java.util.concurrent.TimeUnit;  
  
import static com.mongodb.client.model.Aggregates.project;  
import static com.mongodb.client.model.Aggregates.vectorSearch;  
import static com.mongodb.client.model.Projections.fields;  
import static com.mongodb.client.model.Projections.include;  
import static com.mongodb.client.model.Projections.exclude;  
import static com.mongodb.client.model.Projections.metaVectorSearchScore;  
import static com.mongodb.client.model.search.SearchPath.fieldPath;  
import static com.mongodb.client.model.search.VectorSearchOptions.approximateVectorSearchOptions;  
import static java.util.Arrays.asList;  
  
public class CreateEmbeddingsAndRunQuery {  
  
    // Configurations  
    private static final String VOYAGE_API_KEY = System.getenv("VOYAGE_API_KEY");
    private static final String MONGODB_URI = System.getenv("MONGODB_URI");       
    private static final String DB_NAME = "<DATABASE-NAME>";                     
    private static final String COLLECTION_NAME = "<COLLECTION-NAME>";    
    private static final String VECTOR_INDEX_NAME = "<INDEX-NAME>";         
    private static final String DATA_FIELD_NAME = "<DATA-FIELD-NAME>";
    private static final String QUERY_TEXT = "<QUERY-TEXT>";
  
    // Voyage AI API Endpoint  
    private static final String VOYAGE_API_URL = "https://ai.mongodb.com/v1/embeddings";  
  
    // Timeout values for API requests  
    private static final int CONNECTION_TIMEOUT = 30;  
    private static final int READ_TIMEOUT = 60;  
  
    public static void main(String[] args) {  
        if (VOYAGE_API_KEY == null || VOYAGE_API_KEY.isEmpty()) {  
            throw new RuntimeException("API key not found. Set VOYAGE_API_KEY in your environment.");  
        }  
        if (MONGODB_URI == null || MONGODB_URI.isEmpty()) {  
            throw new RuntimeException("MongoDB URI not found. Set MONGODB_URI in your environment.");  
        }  
  
        String queryText = <QUERY-TEXT>; // Query text dynamically provided by the user  
  
        try {  
            CreateEmbeddingsAndRunQuery processor = new CreateEmbeddingsAndRunQuery();  
  
            System.out.println("Fetching embeddings...");  
            Document bsonEmbeddings = processor.fetchEmbeddingsForQuery(queryText);  
  
            System.out.println("Using embeddings in vector search queries...");  
            processor.runVectorSearchQuery(bsonEmbeddings);  
  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
  
    // Fetch embeddings from Voyage AI API for multiple output data types  
    private Document fetchEmbeddingsForQuery(String queryText) {  
        OkHttpClient client = new OkHttpClient.Builder()  
                .connectTimeout(CONNECTION_TIMEOUT, TimeUnit.SECONDS)  
                .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)  
                .build();  
  
        List<List<List<Integer>>> embeddingsByOutputType = new ArrayList<>();  
        List<String> outputDtypes = List.of("float", "int8", "ubinary"); // Supported output data types  
  
        try {  
            for (String dtype : outputDtypes) {  
                String responseBody = sendRequest(client, VOYAGE_API_KEY, queryText, dtype);  
                embeddingsByOutputType.add(parseEmbeddings(responseBody, dtype));  
            }  
        } catch (IOException e) {  
            throw new RuntimeException("Error fetching embeddings: " + e.getMessage(), e);  
        }  
  
        return convertEmbeddingsToBson(queryText, embeddingsByOutputType); // Convert embeddings to BSON format  
    }  
  
    // Send API request to Voyage AI to generate embeddings for a specific output data type
    private String sendRequest(OkHttpClient client, String apiKey, String queryText, String outputDtype) throws IOException {  
        String requestBody = new JSONObject()  
                .put("input", List.of(queryText)) // Dynamic user query text as input  
                .put("model", "voyage-3-large")  // Model type  
                .put("input_type", "query")      // Input type for query  
                .put("output_dtype", outputDtype)  
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
  
    // Parse embeddings from API response
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
  
    // Convert embeddings into BSON format
    private Document convertEmbeddingsToBson(String queryText, List<List<List<Integer>>> embeddingsByOutputType) {  
        Document embedding = new Document()  
                .append("text", queryText)  
                .append("embeddings_float32", BinaryVector.floatVector(listToFloatArray(embeddingsByOutputType.get(0).get(0))))  
                .append("embeddings_int8", BinaryVector.int8Vector(listToByteArray(embeddingsByOutputType.get(1).get(0))))  
                .append("embeddings_int1", BinaryVector.packedBitVector(listToByteArray(embeddingsByOutputType.get(2).get(0)), (byte) 0));  
          
        return new Document("data", List.of(embedding));  
    }  
  
    // Run MongoDB vector search query using the generated embeddings
    private void runVectorSearchQuery(Document bsonEmbeddings) {  
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {  
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);  
            MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);  
  
            List<Document> embeddedDocuments = bsonEmbeddings.getList("data", Document.class);  
  
            for (Document embedding : embeddedDocuments) {  
                for (String embeddingType : List.of("embeddings_float32", "embeddings_int8", "embeddings_int1")) {  
                    System.out.println("Results from " + embeddingType.replace("embeddings_", "") + " embeddings:");  
  
                    List<Bson> pipeline = asList(  
                            vectorSearch(  
                                    fieldPath(embeddingType),  
                                    embedding.get(embeddingType, BinaryVector.class),  
                                    VECTOR_INDEX_NAME,  
                                    2, approximateVectorSearchOptions(5)  
                            ),  
                            project(fields(  
                                    exclude("_id"),  
                                    include(DATA_FIELD_NAME),  
                                    metaVectorSearchScore("vectorSearchScore"))));  
  
                    List<Document> results = collection.aggregate(pipeline).into(new ArrayList<>());  
  
                    for (Document result : results) {  
                        System.out.println(result.toJson());  
                    }  
                }  
            }  
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
