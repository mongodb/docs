import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.huggingface.HuggingFaceEmbeddingModel;
import dev.langchain4j.model.output.Response;
import org.bson.BsonArray;
import org.bson.BsonDouble;

import java.util.List;

import static java.time.Duration.ofSeconds;

public class EmbeddingProvider {

    private static HuggingFaceEmbeddingModel embeddingModel;

    private static HuggingFaceEmbeddingModel getEmbeddingModel() {
        if (embeddingModel == null) {
            String accessToken = System.getenv("HUGGING_FACE_ACCESS_TOKEN");
            if (accessToken == null || accessToken.isEmpty()) {
                throw new RuntimeException("HUGGING_FACE_ACCESS_TOKEN env variable is not set or is empty.");
            }

            embeddingModel = HuggingFaceEmbeddingModel.builder()
                    .accessToken(accessToken)
                    .modelId("mixedbread-ai/mxbai-embed-large-v1")
                    .waitForModel(true)
                    .timeout(ofSeconds(60))
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
}
