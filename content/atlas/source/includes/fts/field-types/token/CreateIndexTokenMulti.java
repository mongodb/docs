import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

public class CreateIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Document index = new Document("mappings",
                    new Document("dynamic", false)
                        .append("fields", new Document("genres",
                                Arrays.asList(
                                    new Document("type", "string"),
                                    new Document("type", "token")
                                ))));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}