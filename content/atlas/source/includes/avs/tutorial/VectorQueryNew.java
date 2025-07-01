import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.search.FieldSearchPath;
import org.bson.BsonArray;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Aggregates.vectorSearch;
import static com.mongodb.client.model.Projections.exclude;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Projections.metaVectorSearchScore;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
import static com.mongodb.client.model.search.VectorSearchOptions.exactVectorSearchOptions;
import static java.util.Arrays.asList;

public class VectorQuery {

    public static void main(String[] args) {

        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_db");
            MongoCollection<Document> collection = database.getCollection("embeddings");

            // define $vectorSearch query options
            String query = "ocean tragedy";
            EmbeddingProvider embeddingProvider = new EmbeddingProvider();
            BsonArray embeddingBsonArray = embeddingProvider.getEmbedding(query);

            List<Double> embedding = new ArrayList<>();
            for (BsonValue value : embeddingBsonArray.stream().toList()) {
                embedding.add(value.asDouble().getValue());
            }

            // define $vectorSearch pipeline
            String indexName = "vector_index";
            FieldSearchPath fieldSearchPath = fieldPath("embedding");
            int limit = 5;

            List<Bson> pipeline = asList(
                    vectorSearch(
                            fieldSearchPath,
                            embedding,
                            indexName,
                            limit,
                            exactVectorSearchOptions()
                    ),
                    project(
                            fields(exclude("_id"), include("text"),
                                    metaVectorSearchScore("score"))));

            // run query and print results
            List<Document> results = collection.aggregate(pipeline).into(new ArrayList<>());

            if (results.isEmpty()) {
                System.out.println("No results found.");
            } else {
                results.forEach(doc -> {
                    System.out.println("Text: " + doc.getString("text"));
                    System.out.println("Score: " + doc.getDouble("score"));
                });
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB ", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }
}

