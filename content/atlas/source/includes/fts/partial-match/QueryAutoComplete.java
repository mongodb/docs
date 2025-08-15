import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import java.util.Arrays;

public class QueryAutoComplete {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // define pipeline
            Document searchStage = new Document("$search", 
                new Document("index", "partial-match-tutorial-autocomplete")
                    .append("autocomplete", 
                        new Document("query", "Great")
                            .append("path", "title")
                    )
            );

            Document limitStage = new Document("$limit", 10);

            Document projectStage = new Document("$project", 
                new Document("_id", 0)
                    .append("title", 1)
            );

            // run pipeline
            try (MongoCursor<Document> cursor = collection.aggregate(
                Arrays.asList(searchStage, limitStage, projectStage)
            ).iterator()) {
                // print results
                while (cursor.hasNext()) {
                    Document result = cursor.next();
                    System.out.println(result.toJson());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
