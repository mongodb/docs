import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.Arrays;

public class CreateIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            String indexName = "default";

            Document searchIdx = new Document(
                "mappings",
                new Document("dynamic", new Document("typeSet", "moviesStringIndex"))
                    .append("fields", new Document()
                        .append("poster", new ArrayList<>())
                        .append("languages", new ArrayList<>())
                        .append("rated", new ArrayList<>())
                        .append("lastupdated", new ArrayList<>())
                        .append("fullplot", new ArrayList<>())
                        .append("awards", new ArrayList<>())
                    )
            ).append("typeSets",
                Arrays.asList(
                    new Document("name", "moviesStringIndex")
                        .append("types", Arrays.asList(
                            new Document("type", "autocomplete")
                        ))
                )
            );

            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}