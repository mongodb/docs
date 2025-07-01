import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.search.FieldSearchPath;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.input.Prompt;
import dev.langchain4j.model.input.PromptTemplate;
import dev.langchain4j.model.ollama.OllamaChatModel;
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

public class LocalLLM {

    // User input: the question to answer
    static String question = "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";

    public static void main(String[] args) {

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // generate a response to the user question
            System.out.println("Question: " + question);

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
            BsonArray queryEmbeddingBsonArray = OllamaModels.getEmbedding(question);
            List<Double> queryEmbedding = new ArrayList<>();
            for (BsonValue value : queryEmbeddingBsonArray.stream().toList()) {
                queryEmbedding.add(value.asDouble().getValue());
            }

            // define the pipeline stages for the vector search index
            String indexName = "vector_index";
            FieldSearchPath fieldSearchPath = fieldPath("embeddings");
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
                                    include("listing_url"),
                                    include("summary"),
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
     * Creates a templated prompt using the question and retrieved documents, then generates
     * a response using the local Ollama chat model.
     */
    public static void createPrompt(String question, MongoCollection<Document> collection) {

        // Retrieve documents matching the user's question
        List<Document> retrievedDocuments = retrieveDocuments(question, collection);

        if (retrievedDocuments.isEmpty()) {
            System.out.println("No relevant documents found. Unable to generate a response.");
            return;
        } else
            System.out.println("Generating a response from the retrieved documents. This may take a few moments.");

        // Create a prompt template
        OllamaChatModel ollamaChatModel = OllamaModels.getChatModel();
        PromptTemplate promptBuilder = PromptTemplate.from("""
            Use the following pieces of context to answer the question at the end:
            {{information}}
            ---------------
            {{question}}
            """);

        // build the information string from the retrieved documents
        StringBuilder informationBuilder = new StringBuilder();
        for (int i = 0; i < retrievedDocuments.size(); i++) {
            Document doc = retrievedDocuments.get(i);
            String listingUrl = doc.getString("listing_url");
            String summary = doc.getString("summary");
            informationBuilder.append("Listing URL: ").append(listingUrl)
                    .append("\nSummary: ").append(summary)
                    .append("\n\n");
        }
        String information = informationBuilder.toString();

        Map<String, Object> variables = new HashMap<>();
        variables.put("question", question);
        variables.put("information", information);

        // generate and output the response from the chat model
        Prompt prompt = promptBuilder.apply(variables);
        AiMessage response = ollamaChatModel.generate(prompt.toUserMessage()).content();
        System.out.println("Answer: " + response.text());

        // display the filled-in prompt and context information
        // NOTE: included for demonstration purposes only
        System.out.println("______________________");
        System.out.println("Final Prompt Sent to LLM:");
        System.out.println(prompt.text());
        System.out.println("______________________");
        System.out.println("Number of documents in context: " + retrievedDocuments.size());
    }
}
