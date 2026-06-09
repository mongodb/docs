import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class EditIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("<document-name>");
            MongoCollection<Document> collection = database.getCollection("<collection-name>");
            // define field mappings
            Document index = new Document("analyzer", "<analyzer-name>").append(
                            "mappings", new Document("dynamic", <true|false>)
                                    .append("fields", new Document("<field-name>",
                                           new Document("type", "<field-type>"))));
            // run the updateSearchIndex() method
            collection.updateSearchIndex("<index-name>", index);
        }
    }
}
