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
            MongoCollection<Document> collection = database.getCollection("movies");
            String indexName = "default";

            Document searchIdx = new Document("mappings",
                    new Document("dynamic", false)
                        .append("fields", new Document("title", 
                                              new Document("type", "autocomplete")
                                                  .append("analyzer", "lucene.standard")
                                                  .append("tokenization", "edgeGram")
                                                  .append("minGrams", 3)
                                                  .append("maxGrams", 5)
                                                  .append("foldDiacritics", false)
                                                  .append("similarity", new Document("type", "stableTfl"))
                                                  )));

            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}