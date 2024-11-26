import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;
import java.util.List;

public class tutorial {
    public static void main(String[] args) {
        // define clauses
        List<Document> mustClauses =
            List.of( new Document("wildcard", 
                new Document("path", "title")
                .append("query", "allè*")
                .append("allowAnalyzedField", true)));
        List<Document> shouldClauses =
            List.of( new Document("text",
                new Document("query", "Drama")
                .append("path", "genres")));
        // define pipeline
        Document agg = new Document( "$search",
            new Document("index", "diacritic-insensitive-tutorial")
            .append("compound",
                new Document("must", mustClauses)
                .append("should", shouldClauses)));

        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {            
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg,
                project(fields(
                    excludeId(), 
                    include("title"), 
                    include("genres"), 
                    computed("score", new Document("$meta", "searchScore"))))))
                .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
