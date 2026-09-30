import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.BsonInt64;
import org.bson.Document;

public class CounterDocument {
    public static void main(String[] args) {
        // start-insert-counter
        // Replace the placeholders with your connection string and database name.
        MongoClient client = MongoClients.create("<connection string>");
        MongoDatabase database = client.getDatabase("<database name>");

        database.getCollection("hibernate_sequences").insertOne(
                new Document("_id", "movies_SEQ")
                        .append("next_value", new BsonInt64(1))
                        .append("increment", new BsonInt64(50)));
        // end-insert-counter
    }
}
