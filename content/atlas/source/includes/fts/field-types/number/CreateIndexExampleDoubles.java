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
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            Document index = new Document("mappings",
                    new Document("dynamic", false)
                        .append("fields", new Document("bathrooms", 
                                              new Document("type", "number") 
                                                  .append("indexIntegers", "false")
                                                  )));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}