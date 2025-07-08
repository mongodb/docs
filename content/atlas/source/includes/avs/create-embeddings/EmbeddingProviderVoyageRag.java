import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.voyageai.VoyageAiEmbeddingModel;
import dev.langchain4j.model.output.Response;
import org.bson.BsonArray;
import org.bson.BsonDouble;
import dev.langchain4j.model.huggingface.HuggingFaceChatModel;
import java.util.List;
import static java.time.Duration.ofSeconds;

public class EmbeddingProvider {

    private static EmbeddingModel embeddingModel;

    private static EmbeddingModel getEmbeddingModel() {
        if (embeddingModel == null) {
            String apiKey = System.getenv("VOYAGE_AI_KEY");
            if (apiKey == null || apiKey.isEmpty()) {
                throw new IllegalStateException("VOYAGE_AI_KEY env variable is not set or is empty.");
            }

            return VoyageAiEmbeddingModel.builder()
                    .apiKey(apiKey)
                    .modelName("voyage-3-large")
                    .build();
        }
        return embeddingModel;
    }

    /**
     * Takes an array of strings and returns a BSON array of embeddings to
     * store in the database.
     */
    public List<BsonArray> getEmbeddings(List<String> texts) {

        List<TextSegment> textSegments = texts.stream()
                .map(TextSegment::from)
                .toList();

        Response<List<Embedding>> response = getEmbeddingModel().embedAll(textSegments);
        return response.content().stream()
                .map(e -> new BsonArray(
                        e.vectorAsList().stream()
                                .map(BsonDouble::new)
                                .toList()))
                .toList();
    }

    /**
     * Takes a single string and returns a BSON array embedding to
     * use in a vector query.
     */
    public BsonArray getEmbedding(String text) {
        Response<Embedding> response = getEmbeddingModel().embed(text);
        return new BsonArray(
                response.content().vectorAsList().stream()
                        .map(BsonDouble::new)
                        .toList());
    }

    /**
     * Returns the Hugging Face chat model interface used by the createPrompt() method
     * to process queries and generate responses.
     */
    private static HuggingFaceChatModel chatModel;
    public static HuggingFaceChatModel getChatModel() {
        String accessToken = System.getenv("HUGGING_FACE_ACCESS_TOKEN");
        if (accessToken == null || accessToken.isEmpty()) {
            throw new IllegalStateException("HUGGING_FACE_ACCESS_TOKEN env variable is not set or is empty.");
        }

        if (chatModel == null) {
            chatModel = HuggingFaceChatModel.builder()
                    .timeout(ofSeconds(25))
                    .modelId("mistralai/Mistral-7B-Instruct-v0.3")
                    .temperature(0.1)
                    .maxNewTokens(150)
                    .accessToken(accessToken)
                    .waitForModel(true)
                    .build();
        }
        return chatModel;
    }
}

