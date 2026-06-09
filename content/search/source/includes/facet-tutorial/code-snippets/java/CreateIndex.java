import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CreateIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            String indexName = "facet-tutorial";

            Document index = new Document("mappings",
                    new Document("dynamic", true)
                        .append("fields", new Document("genres",
                                              new Document("type", "token")
                                                  )));

            String result = collection.createSearchIndex(indexName, index);
            System.out.println("New index name: " + result);
        }
    }
}