import com.cohere.api.Cohere;
import com.cohere.api.requests.EmbedRequest;
import com.cohere.api.types.EmbedResponse;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedByTypeResponseEmbeddings;
import com.cohere.api.types.EmbeddingType;
import com.cohere.api.types.EmbedInputType;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.BinaryVector;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private static final String COHERE_API_KEY = System.getenv("COHERE_API_KEY");
    private static final String MONGODB_URI = System.getenv("MONGODB_URI");
    private static final String DB_NAME = "<DATABASE-NAME>";
    private static final String COLLECTION_NAME = "<COLLECTION-NAME>";
    private static final String VECTOR_INDEX_NAME = "<INDEX-NAME>";
    private static final String DATA_FIELD_NAME = "<DATA-FIELD>";

    public static void main(String[] args) {
        String queryText = "<QUERY-TEXT>";

        try {
            CreateAndRunQuery processor = new CreateAndRunQuery();
            Map<String, BinaryVector> embeddingsData = processor.generateAndConvertEmbeddings(queryText);
            processor.runVectorSearchQuery(embeddingsData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Generate embeddings using Cohere's embed API from the query text
    public Map<String, BinaryVector> generateAndConvertEmbeddings(String text) throws Exception {
        if (COHERE_API_KEY == null || COHERE_API_KEY.isEmpty()) {
            throw new RuntimeException("API key not found. Set COHERE_API_KEY in your environment.");
        }

        Cohere cohere = Cohere.builder().token(COHERE_API_KEY).build();

        EmbedRequest request = EmbedRequest.builder()
                .model("embed-english-v3.0")
                .inputType(EmbedInputType.SEARCH_QUERY)
                .texts(List.of(text))
                .embeddingTypes(List.of(EmbeddingType.FLOAT, EmbeddingType.INT_8, EmbeddingType.UBINARY))
                .build();

        EmbedResponse response = cohere.embed(request);
        Optional<EmbedByTypeResponse> optionalEmbeddingsWrapper = response.getEmbeddingsByType();
        if (optionalEmbeddingsWrapper.isEmpty()) {
            throw new RuntimeException("No embeddings found in the API response.");
        }

        EmbedByTypeResponseEmbeddings embeddings = optionalEmbeddingsWrapper.get().getEmbeddings();
        return createBinaryVectorEmbeddings(embeddings);
    }

    // Convert embeddings to BSON binary vectors using MongoDB Java Driver
    private static Map<String, BinaryVector> createBinaryVectorEmbeddings(EmbedByTypeResponseEmbeddings embeddings) {
        Map<String, BinaryVector> binaryVectorEmbeddings = new HashMap<>();

        // Convert float embeddings
        List<Double> floatList = embeddings.getFloat().orElseThrow().get(0);
        if (floatList != null) {
            float[] floatData = listToFloatArray(floatList);
            BinaryVector floatVector = BinaryVector.floatVector(floatData);
            binaryVectorEmbeddings.put("float32", floatVector);
        }

        // Convert int8 embeddings
        List<Integer> int8List = embeddings.getInt8().orElseThrow().get(0);
        if (int8List != null) {
            byte[] int8Data = listToByteArray(int8List);
            BinaryVector int8Vector = BinaryVector.int8Vector(int8Data);
            binaryVectorEmbeddings.put("int8", int8Vector);
        }

        // Convert ubinary embeddings
        List<Integer> ubinaryList = embeddings.getUbinary().orElseThrow().get(0);
        if (ubinaryList != null) {
            byte[] int1Data = listToByteArray(ubinaryList);
            BinaryVector packedBitsVector = BinaryVector.packedBitVector(int1Data, (byte) 0);
            binaryVectorEmbeddings.put("int1", packedBitsVector);
        }

        return binaryVectorEmbeddings;
    }

    // Define and run $vectorSearch query using the embeddings
    public void runVectorSearchQuery(Map<String, BinaryVector> embeddingsData) {
        if (MONGODB_URI == null || MONGODB_URI.isEmpty()) {
            throw new RuntimeException("MongoDB URI not found. Set MONGODB_URI in your environment.");
        }

        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            MongoDatabase database = mongoClient.getDatabase(DB_NAME);
            MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

            for (String path : embeddingsData.keySet()) {
                BinaryVector queryVector = embeddingsData.get(path);

                List<Bson> pipeline = asList(
                        vectorSearch(
                                fieldPath("embeddings_" + path),
                                queryVector,
                                VECTOR_INDEX_NAME,
                                2,
                                approximateVectorSearchOptions(5)
                        ),
                        project(
                                fields(
                                        exclude("_id"),
                                        include(DATA_FIELD_NAME),
                                        metaVectorSearchScore("vectorSearchScore")
                                )
                        )
                );

                List<Document> results = collection.aggregate(pipeline).into(new ArrayList<>());

                System.out.println("Results from " + path + " embeddings:");
                for (Document result : results) {
                    System.out.println(result.toJson());
                }
            }
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
