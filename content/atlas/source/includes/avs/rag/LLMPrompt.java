import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.search.FieldSearchPath;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.huggingface.HuggingFaceChatModel;
import dev.langchain4j.model.input.Prompt;
import dev.langchain4j.model.input.PromptTemplate;
import org.bson.BsonArray;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Aggregates.vectorSearch;
import static com.mongodb.client.model.Projections.exclude;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Projections.metaVectorSearchScore;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
import static com.mongodb.client.model.search.VectorSearchOptions.exactVectorSearchOptions;
import static java.util.Arrays.asList;

public class LLMPrompt {

    // User input: the question to answer
    static String question = "In a few sentences, what are MongoDB's latest AI announcements?";

    public static void main(String[] args) {

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("rag_db");
            MongoCollection<Document> collection = database.getCollection("test");

            // generate a response to the user question
            try {
                createPrompt(question, collection);
            } catch (Exception e) {
                throw new RuntimeException("An error occurred while generating the response: ", e);
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB ", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }

    /**
     * Returns a list of documents from the specified MongoDB collection that
     * match the user's question.
     * NOTE: Update or omit the projection stage to change the desired fields in the response
     */
    public static List<Document> retrieveDocuments(String question, MongoCollection<Document> collection) {

        try {
            // generate the query embedding to use in the vector search
            BsonArray queryEmbeddingBsonArray = EmbeddingProvider.getEmbedding(question);
            List<Double> queryEmbedding = new ArrayList<>();
            for (BsonValue value : queryEmbeddingBsonArray.stream().toList()) {
                queryEmbedding.add(value.asDouble().getValue());
            }

            // define the pipeline stages for the vector search index
            String indexName = "vector_index";
            FieldSearchPath fieldSearchPath = fieldPath("embedding");
            int limit = 5;

            List<Bson> pipeline = asList(
                    vectorSearch(
                            fieldSearchPath,
                            queryEmbedding,
                            indexName,
                            limit,
                            exactVectorSearchOptions()),
                    project(
                            fields(
                                    exclude("_id"),
                                    include("text"),
                                    metaVectorSearchScore("score"))));

            // run the query and return the matching documents
            List<Document> matchingDocuments = new ArrayList<>();
            collection.aggregate(pipeline).forEach(matchingDocuments::add);
            return matchingDocuments;
        } catch (Exception e) {
            System.err.println("Error occurred while retrieving documents: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Creates a templated prompt from a submitted question string and any retrieved documents,
     * then generates a response using the Hugging Face chat model.
     */
    public static void createPrompt(String question, MongoCollection<Document> collection) {

        // retrieve documents matching the user's question
        List<Document> retrievedDocuments = retrieveDocuments(question, collection);

        if (retrievedDocuments.isEmpty()) {
            System.out.println("No relevant documents found. Unable to generate a response.");
            return;
        } else
            System.out.println("Generating a response from the retrieved documents. This may take a few moments.");

        // define a prompt template
        HuggingFaceChatModel huggingFaceChatModel = EmbeddingProvider.getChatModel();
        PromptTemplate promptBuilder = PromptTemplate.from("""
                Answer the following question based on the given context:
                Question: {{question}}
                Context: {{information}}
                -------
                """);

        // build the information string from the retrieved documents
        StringBuilder informationBuilder = new StringBuilder();
        for (Document doc : retrievedDocuments) {
            String text = doc.getString("text");
            informationBuilder.append(text).append("\n");
        }

        Map<String, Object> variables = new HashMap<>();
        variables.put("question", question);
        variables.put("information", informationBuilder);

        // generate and output the response from the chat model
        Prompt prompt = promptBuilder.apply(variables);
        AiMessage response = huggingFaceChatModel.generate(prompt.toUserMessage()).content();

        // extract the generated text to output a formatted response
        String responseText = response.text();
        String marker = "-------";
        int markerIndex = responseText.indexOf(marker);
        String generatedResponse;
        if (markerIndex != -1) {
            generatedResponse = responseText.substring(markerIndex + marker.length()).trim();
        } else {
            generatedResponse = responseText; // else fallback to the full response
        }

        // output the question and formatted response
        System.out.println("Question:\n " + question);
        System.out.println("Response:\n " + generatedResponse);

        // output the filled-in prompt and context information for demonstration purposes
        System.out.println("\n" + "---- Prompt Sent to LLM ----");
        System.out.println(prompt.text() + "\n");
    }
}
