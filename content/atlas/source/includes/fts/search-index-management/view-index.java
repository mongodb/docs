import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
public class ViewIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("<database-name>");
            MongoCollection<Document> collection = database.getCollection("<collection-name>");
            // retrieve indexes
            try (MongoCursor<Document> resultsCursor = collection.listSearchIndexes().iterator()) {
                while (resultsCursor.hasNext()) {
                    System.out.println(resultsCursor.next());
                }
            }
        }
    }
}