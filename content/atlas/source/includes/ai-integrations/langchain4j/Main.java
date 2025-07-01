package org.example;

// start-imports
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import dev.langchain4j.data.document.Metadata;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.voyageai.VoyageAiEmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingMatch;
import dev.langchain4j.store.embedding.EmbeddingSearchRequest;
import dev.langchain4j.store.embedding.EmbeddingSearchResult;
import dev.langchain4j.store.embedding.filter.comparison.*;
import dev.langchain4j.store.embedding.mongodb.IndexMapping;
import dev.langchain4j.store.embedding.mongodb.MongoDbEmbeddingStore;
import org.bson.Document;

import java.io.*;
import java.util.*;
// end-imports

// start-rag-imports
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
// end-rag-imports

public class Main {

    public static void main(String[] args) throws IOException {

        // start-env-vars
        String embeddingApiKey = System.getenv("VOYAGE_AI_KEY");
        String uri = System.getenv("MONGODB_URI");
        // end-env-vars

        // start-embedding-model
        EmbeddingModel embeddingModel = VoyageAiEmbeddingModel.builder()
                .apiKey(embeddingApiKey)
                .modelName("voyage-3")
                .build();
        // end-embedding-model

        // start-vector-store
        MongoClient mongoClient = MongoClients.create(uri);

        System.out.println("Instantiating the embedding store...");

        // Set to false if the vector index already exists
        Boolean createIndex = true;

        IndexMapping indexMapping = IndexMapping.builder()
                .dimension(embeddingModel.dimension())
                .metadataFieldNames(new HashSet<>())
                .build();

        MongoDbEmbeddingStore embeddingStore = MongoDbEmbeddingStore.builder()
                .databaseName("search")
                .collectionName("langchaintest")
                .createIndex(createIndex)
                .indexName("vector_index")
                .indexMapping(indexMapping)
                .fromClient(mongoClient)
                .build();

        if (createIndex) {
            // Creating a vector search index can take up to a minute,
            // so this delay allows the index to become queryable
            try {
                Thread.sleep(15000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        // end-vector-store

        // start-persist-docs
        ArrayList<Document> docs = new ArrayList<>();

        docs.add(new Document()
                .append("text", "In Zadie Smith's new novel, the true story of a heated nineteenth-century criminal trial connects to the unrest of current times.")
                .append("metadata", new Metadata(Map.of("author", "A"))));
        docs.add(new Document()
                .append("text", "Emperor penguins are the tallest and heaviest of all penguin species, standing up to 4 feet.")
                .append("metadata", new Metadata(Map.of("author", "D"))));
        docs.add(new Document()
                .append("text", "Penguins are flightless seabirds that live almost exclusively below the equator. Some island-dwellers can be found in warmer climates.")
                .append("metadata", new Metadata(Map.of("author", "C"))));
        docs.add(new Document()
                .append("text", "Patagonia is home to five penguin species - Magellanic, Humboldt, Gentoo, Southern Rockhopper and King.")
                .append("metadata", new Metadata(Map.of("author", "B"))));

        System.out.println("Persisting document embeddings...");

        for (Document doc : docs) {
            TextSegment segment = TextSegment.from(
                    doc.getString("text"),
                    doc.get("metadata", Metadata.class)
            );
            Embedding embedding = embeddingModel.embed(segment).content();
            embeddingStore.add(embedding, segment);
        }

        // Delay for persisting data
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        // end-persist-docs

        // start-query
        String query = "Where do penguins live?";
        Embedding queryEmbedding = embeddingModel.embed(query).content();

        EmbeddingSearchRequest searchRequest = EmbeddingSearchRequest.builder()
                .queryEmbedding(queryEmbedding)
                .maxResults(3)
                .build();

        System.out.println("Performing the query...");

        EmbeddingSearchResult<TextSegment> searchResult = embeddingStore.search(searchRequest);
        List<EmbeddingMatch<TextSegment>> matches = searchResult.matches();

        for (EmbeddingMatch<TextSegment> embeddingMatch : matches) {
            System.out.println("Response: " + embeddingMatch.embedded().text());
            System.out.println("Author: " + embeddingMatch.embedded().metadata().getString("author"));
            System.out.println("Score: " + embeddingMatch.score());
        }
        // end-query

        // start-filtering
        EmbeddingSearchRequest searchRequest = EmbeddingSearchRequest.builder()
                .queryEmbedding(queryEmbedding)
                .filter(new IsIn("author", List.of("B", "C")))
                .maxResults(3)
                .build();
        // end-filtering

        // embeddingStore.removeAll();

        // start-read-json
        System.out.println("Loading documents from file...");

        String resourcePath = "rainforest-docs.json";
        List<Document> documents = loadJsonDocuments(resourcePath);
        // end-read-json

        // start-persist-rag
        System.out.println("Persisting document embeddings...");

        for (Document doc : documents) {
            TextSegment segment = TextSegment.from(
                    doc.getString("text"),
                    new Metadata(doc.get("metadata", Map.class)));
            Embedding embedding = embeddingModel.embed(segment).content();
            embeddingStore.add(embedding, segment);
        }

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        // end-persist-rag

        // start-create-chat-retriever
        String chatApiKey = System.getenv("OPENAI_KEY");

        ChatLanguageModel chatModel = OpenAiChatModel.builder()
                .apiKey(chatApiKey)
                .modelName("gpt-4")
                .build();

        ContentRetriever contentRetriever = EmbeddingStoreContentRetriever.builder()
                .embeddingStore(embeddingStore)
                .embeddingModel(embeddingModel)
                .maxResults(3)
                .minScore(0.75)
                .build();
        // end-create-chat-retriever

        // start-assistant
        Assistant assistant = AiServices.builder(Assistant.class)
                .chatLanguageModel(chatModel)
                .contentRetriever(contentRetriever)
                .build();
        // end-assistant


        // start-rag-query
        String ragQuery = "What types of insects live in the rainforest?";
        String output = assistant.answer(ragQuery);

        System.out.println("Response:\n" + output);
        // end-rag-query
    }

    // start-load-method
    private static List<Document> loadJsonDocuments(String resourcePath) throws IOException {
        // Loads file from resources directory using the ClassLoader
        InputStream inputStream = Main.class.getClassLoader().getResourceAsStream(resourcePath);

        if (inputStream == null) {
            throw new FileNotFoundException("Resource not found: " + resourcePath);
        }

        // Parses JSON file to List of MongoDB Documents
        ObjectMapper objectMapper = new ObjectMapper();
        List<Document> documents = objectMapper.readValue(inputStream, new TypeReference<>() {});

        return documents;
    }
    // end-load-method
}
