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
                    new Document("dynamic", true|false),
                        .append("fields", new Document("<field-name>", 
                                              new Document("type", "string")
                                              .append("analyzer", "<analyzer-name>")
                                              .append("searchAnalyzer", "<search-analyzer-name>")
                                              .append("indexOptions", "docs|freqs|positions|offsets")
                                              .append("store", true|false)
                                              .append("ignoreAbove", <integer>)
                                              .append("similarity", new Document("type", "bm25|boolean|stableTfl"))
                                              .append("multi", new Document(<string-field-definition>))
                                              .append("norms", "include|omit")
                                                  )));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}