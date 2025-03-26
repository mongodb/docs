import com.cohere.api.Cohere;
import com.cohere.api.requests.EmbedRequest;
import com.cohere.api.types.EmbedByTypeResponse;
import com.cohere.api.types.EmbedByTypeResponseEmbeddings;
import com.cohere.api.types.EmbedInputType;
import com.cohere.api.types.EmbedResponse;
import com.cohere.api.types.EmbeddingType;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.bson.BinaryVector;
import org.bson.Document;

public class GenerateAndConvertEmbeddings {

    // List of text data to embed
    private static final List<String> DATA = List.of(
        "The Great Wall of China is visible from space.",
        "The Eiffel Tower was completed in Paris in 1889.",
        "Mount Everest is the highest peak on Earth at 8,848m.",
        "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
        "The Mona Lisa was painted by Leonardo da Vinci."
    );

    public static void main(String[] args) {
        // Cohere API key for authentication
        String apiKey = System.getenv("COHERE_API_KEY");

        // Fetch embeddings from the Cohere API
        EmbedByTypeResponseEmbeddings embeddings = fetchEmbeddingsFromCohere(apiKey);
        Document bsonEmbeddings = convertEmbeddingsToBson(embeddings);

        writeEmbeddingsToFile(bsonEmbeddings, "embeddings.json");
    }

    // Fetches embeddings based on input data from the Cohere API
    private static EmbedByTypeResponseEmbeddings fetchEmbeddingsFromCohere(String apiKey) {
        if (Objects.isNull(apiKey) || apiKey.isEmpty()) {
            throw new RuntimeException("API key not found. Please set COHERE_API_KEY in your environment.");
        }

        Cohere cohere = Cohere.builder().token(apiKey).clientName("embed-example").build();

        try {
            EmbedRequest request = EmbedRequest.builder()
                .model("embed-english-v3.0")
                .inputType(EmbedInputType.SEARCH_DOCUMENT)
                .texts(DATA)
                .embeddingTypes(List.of(EmbeddingType.FLOAT, EmbeddingType.INT_8, EmbeddingType.UBINARY))
                .build();

            EmbedResponse response = cohere.embed(request);
            Optional<EmbedByTypeResponse> optionalEmbeddingsWrapper = response.getEmbeddingsByType();

            return optionalEmbeddingsWrapper.orElseThrow().getEmbeddings();
        } catch (Exception e) {
            System.err.println("Error fetching embeddings: " + e.getMessage());
            throw e;
        }
    }

    // Converts embeddings to BSON binary vectors using MongoDB Java Driver
    private static Document convertEmbeddingsToBson(EmbedByTypeResponseEmbeddings embeddings) {
        List<List<Double>> floatEmbeddings = embeddings.getFloat().orElseThrow();
        List<List<Integer>> int8Embeddings = embeddings.getInt8().orElseThrow();
        List<List<Integer>> ubinaryEmbeddings = embeddings.getUbinary().orElseThrow();

        List<Document> bsonEmbeddings = new ArrayList<>();
        for (int i = 0; i < floatEmbeddings.size(); i++) {
            Document bsonEmbedding = new Document()
                .append("text", DATA.get(i))
                .append("embeddings_float32", BinaryVector.floatVector(listToFloatArray(floatEmbeddings.get(i))))
                .append("embeddings_int8", BinaryVector.int8Vector(listToByteArray(int8Embeddings.get(i))))
                .append("embeddings_int1", BinaryVector.packedBitVector(listToByteArray(ubinaryEmbeddings.get(i)), (byte) 0));

            bsonEmbeddings.add(bsonEmbedding);
        }

        return new Document("data", bsonEmbeddings);
    }

    // Writes embeddings to JSON file
    private static void writeEmbeddingsToFile(Document bsonEmbeddings, String fileName) {
        try (FileOutputStream fos = new FileOutputStream(fileName)) {
            fos.write(bsonEmbeddings.toJson().getBytes());
            System.out.println("Embeddings saved to " + fileName);
        } catch (IOException e) {
            System.out.println("Error writing embeddings to file: " + e.getMessage());
        }
    }

    // Convert List of Doubles to an array of floats
    private static float[] listToFloatArray(List<Double> list) {
        float[] array = new float[list.size()];
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i).floatValue();
        }
        return array;
    }

    // Convert List of Integers to an array of bytes
    private static byte[] listToByteArray(List<Integer> list) {
        byte[] array = new byte[list.size()];
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i).byteValue();
        }
        return array;
    }
}
