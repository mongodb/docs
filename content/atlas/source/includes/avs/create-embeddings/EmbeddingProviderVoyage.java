import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.voyageai.VoyageAiEmbeddingModel;
import dev.langchain4j.model.output.Response;
import org.bson.BsonArray;
import org.bson.BsonDouble;

import java.util.List;

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
}
