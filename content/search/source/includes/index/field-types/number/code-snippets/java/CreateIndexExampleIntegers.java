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
            MongoDatabase database = mongoClient.getDatabase("sample_analytics");
            MongoCollection<Document> collection = database.getCollection("accounts");

            Document index = new Document("mappings",
                    new Document("dynamic", false)
                        .append("fields", new Document("account_id", 
                                              new Document("type", "number") 
                                                  .append("representation", "int64")
                                                  .append("indexDoubles", "false")
                                                  )));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}