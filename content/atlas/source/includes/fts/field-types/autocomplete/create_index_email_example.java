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
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("users");
            String indexName = "default";

            Document searchIdx = new Document("mappings",
                    new Document("dynamic", true)
                        .append("fields", new Document("email", 
                                              new Document("type", "autocomplete")
                                                  .append("analyzer", "lucene.keyword")
                                                  .append("tokenization", "nGram")
                                                  .append("minGrams", 3)
                                                  .append("maxGrams", 15)
                                                  .append("foldDiacritics", false)
                                                  )));

            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}