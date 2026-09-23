import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Arrays;

public class RegexNamingPatternCreateIndex {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listings_SearchableTypes");

            // Define your MongoDB Search index
            Document definition = new Document("analyzer", "lucene.standard")
                .append("searchAnalyzer", "lucene.standard")
                .append("mappings", new Document("dynamic", false)
                    .append("fields", new Document("searchable_types",
                        Arrays.asList(
                            new Document("type", "document")
                                .append("dynamic",
                                    new Document("typeSet", "tokenTypeSet"))))))
                .append("typeSets", Arrays.asList(
                    new Document("name", "tokenTypeSet")
                        .append("types", Arrays.asList(
                            new Document("type", "token")))));

            // Create the index
            String result = collection.createSearchIndex(
                "listingsSearchableTypes", definition);
            System.out.println("New index name: " + result);
        }
    }
}
