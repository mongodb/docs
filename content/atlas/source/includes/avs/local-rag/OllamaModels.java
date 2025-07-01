import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.ollama.OllamaEmbeddingModel;
import dev.langchain4j.model.output.Response;
import org.bson.BsonArray;
import org.bson.BsonDouble;

import java.util.List;

import static java.time.Duration.ofSeconds;

public class OllamaModels {

    private static final String host = "http://localhost:11434";
    private static OllamaEmbeddingModel embeddingModel;
    private static OllamaChatModel chatModel;

    /**
     * Returns the Ollama embedding model used by the getEmbeddings() and getEmbedding() methods
     * to generate vector embeddings.
     */
    public static OllamaEmbeddingModel getEmbeddingModel() {
        if (embeddingModel == null) {
            embeddingModel = OllamaEmbeddingModel.builder()
                    .timeout(ofSeconds(10))
                    .modelName("nomic-embed-text")
                    .baseUrl(host)
                    .build();
        }
        return embeddingModel;
    }

    /**
     * Returns the Ollama chat model interface used by the createPrompt() method
     * to process queries and generate responses.
     */
    public static OllamaChatModel getChatModel() {
        if (chatModel == null) {
            chatModel = OllamaChatModel.builder()
                    .timeout(ofSeconds(25))
                    .modelName("mistral")
                    .baseUrl(host)
                    .build();
        }
        return chatModel;
    }

    /**
     * Takes an array of strings and returns a collection of BSON array embeddings
     * to store in the database.
     */
    public static List<BsonArray> getEmbeddings(List<String> texts) {

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
    public static BsonArray getEmbedding(String text) {
        Response<Embedding> response = getEmbeddingModel().embed(text);
        return new BsonArray(
                response.content().vectorAsList().stream()
                        .map(BsonDouble::new)
                        .toList());
    }
}
