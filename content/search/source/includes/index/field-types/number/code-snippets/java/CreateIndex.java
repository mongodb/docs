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
            MongoDatabase database = mongoClient.getDatabase("<database>");
            MongoCollection<Document> collection = database.getCollection("<collection>");

            Document index = new Document("mappings",
                    new Document("dynamic", true|false)
                        .append("fields", new Document("<field-name>", 
                                              new Document("type", "number") 
                                                  .append("representation", "int64|double")
                                                  .append("indexIntegers", true|false)
                                                  .append("indexDoubles", true|false)
                                                  )));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}