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
            MongoCollection<Document> collection = database.getCollection("embedded_movies");

            Document index = new Document("mappings",
                    new Document("dynamic", true)
                        .append("fields", new Document("plot_embedding_voyage_3_large",
                                              new Document("numDimensions", 2048)
                                                  .append("quantization", "scalar")
                                                  .append("similarity", "dotProduct")
                                                  .append("type", "vector")
                                                  )));

            String result = collection.createSearchIndex(index);
            System.out.println("New index name: " + result);
        }
    }
}