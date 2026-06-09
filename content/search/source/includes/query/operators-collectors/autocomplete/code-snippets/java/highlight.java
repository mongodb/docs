import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

public class AutocompleteHighlight {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document agg = new Document("$search", new Document("autocomplete", new Document("path", "title").append("query", Arrays.asList("ger")))
                    .append("highlight", new Document("path", "title")));
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg,
                limit(5),
                project(Document.parse("{score: {$meta: 'searchScore'}, _id: 0, title: 1, highlights: {$meta: 'searchHighlights'}}"))))
                .forEach(doc -> System.out.println(doc.toJson()));

        }
    }
}
