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
            MongoDatabase database = mongoClient.getDatabase("local_school_district");
            MongoCollection<Document> collection = database.getCollection("schools");
            String indexName = "embedded-documents-tutorial";

            Document index = new Document("mappings",
                    new Document("dynamic", true)
                        .append("fields", new Document("clubs",
                                              new Document("dynamic", true)
                                                  .append("fields", new Document("sports",
                                                      new Document("dynamic", true)
                                                          .append("type", "embeddedDocuments")))
                                                  .append("type", "document"))
                                          .append("teachers", Arrays.asList(
                                              new Document("dynamic", true)
                                                  .append("fields", new Document("classes",
                                                      new Document("dynamic", true)
                                                          .append("type", "embeddedDocuments")))
                                                  .append("type", "embeddedDocuments"),
                                              new Document("dynamic", true)
                                                  .append("fields", new Document("classes",
                                                      new Document("dynamic", true)
                                                          .append("fields", new Document("grade",
                                                              new Document("type", "token")))
                                                          .append("type", "document")))
                                                  .append("type", "document")
                                          ))));

            String result = collection.createSearchIndex(indexName, index);
            System.out.println("New index name: " + result);
        }
    }
}