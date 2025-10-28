import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class IndexExample {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Document index = new Document("mappings",
                    new Document("dynamic", false)
                            .append("fields", new Document("title",
                                    new Document("type", "string")
                                            .append("multi", new Document()
                                                    .append("english", new Document("type", "string")
                                                            .append("analyzer", "lucene.english"))
                                                    .append("french", new Document("type", "string")
                                                            .append("analyzer", "lucene.french"))
                                                    .append("stableSimilarity", new Document("type", "string")
                                                            .append("similarity", new Document("type", "stableTfl"))))
                            )));
            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}