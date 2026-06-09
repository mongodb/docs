import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CreateObjectIdIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("comments");

            // Create MongoDB Search index definition
            Document index = new Document("mappings",
                    new Document("dynamic", false)
                        .append("fields", new Document("movie_id", 
                                              new Document("type", "objectId"))));

            String result = collection.createSearchIndex("movie_id_index", index);
            System.out.println("New search index created with name: " + result);
        } catch (Exception e) {
            System.err.println("Error creating search index: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
