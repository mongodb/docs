import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

public class WildcardSingleCharacter {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document agg = new Document("query", "Green D*").append("path", "title");
            // run pipeline and print results
            collection.aggregate(Arrays.asList(
                eq("$search", eq("wildcard", agg)),
                project(fields(excludeId(), include("title"))))).forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
