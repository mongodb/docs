import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CreateBooleanIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Create MongoDB Search index definition
            Document index = new Document("mappings",
                    new Document("dynamic", true | false)
                        .append("fields", new Document("<fieldName>", 
                                              new Document("type", "boolean"))));

            String result = collection.createSearchIndex("<indexName>", index);
            System.out.println("New search index created with name: " + result);
        } catch (Exception e) {
            System.err.println("Error creating search index: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
