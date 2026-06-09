import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CreateAutoCompleteIndex {
    public static void main(String[] args) {
        // connect to your Atlas deployment
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // define your MongoDB Search index
            Document indexDefinition = new Document("mappings", 
                new Document("dynamic", false)
                    .append("fields", 
                        new Document("title", 
                            new Document("type", "autocomplete")
                                .append("analyzer", "lucene.standard")
                                .append("tokenization", "edgeGram")
                                .append("minGrams", 3)
                                .append("maxGrams", 5)
                                .append("foldDiacritics", false)
                        )
                    )
            );

            // run the helper method
            String result = collection.createSearchIndex("partial-match-tutorial-autocomplete", indexDefinition);
            System.out.println("New index name: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
