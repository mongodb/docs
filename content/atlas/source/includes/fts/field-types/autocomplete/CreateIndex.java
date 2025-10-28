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
            String indexName = "default";

            Document searchIdx = new Document("mappings",
                    new Document("dynamic", true|false)
                        .append("fields", new Document("<field-name>", 
                                              new Document("type", "autocomplete") 
                                                  .append("analyzer", "<lucene.analyzer>")
                                                  .append("tokenization", "edgeGram|rightEdgeGram|nGram")
                                                  .append("minGrams", <2>)
                                                  .append("analymaxGramszer", <15>)
                                                  .append("foldDiacritics", true|false)
                                                  .append("similarity", new Document("type", "bm25|boolean|stableTfl"))
                                                  )));

            collection.createSearchIndex(indexName, searchIdx);
            System.out.println("New index name: " + indexName);
        } catch (Exception e) {
            System.err.println("Error creating Atlas Search index: " + e.getMessage());
        }
    }
}