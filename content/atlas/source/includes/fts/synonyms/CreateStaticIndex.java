import com.mongodb.client.*;
import org.bson.Document;

import java.util.List;

public class CreateStaticIndex {
    public static void main(String[] args) {
        // Replace the placeholder with your MongoDB deployment's connection string
        String connectionString = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            String indexName = "default";

            // Define the synonym mapping for the lucene.english analyzer
            List<Document> synonymsList = List.of(
                    new Document("analyzer", "lucene.english")
                            .append("name", "my_synonyms")
                            .append("source", new Document("collection", "synonymous_terms"))
            );

            // Create the MongoDB Search index definition for the plot field with synonyms
            Document searchIdx = new Document(
                    "mappings",
                    new Document("dynamic", false)
                            .append("fields",
                                    new Document("plot",
                                            new Document("type", "string")
                                                    .append("analyzer", "lucene.english")
                                    )
                            )
            ).append("synonyms", synonymsList);

            // Create the index by using the Java Sync Driver
            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}