import java.util.Arrays;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.skip;
import static com.mongodb.client.model.Aggregates.project;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DivideQueryResults {

    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document agg = new Document("$search", new Document("index", "pagination-tutorial")
            		.append("text", new Document("query", "tom hanks").append("path", "cast")));
            
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg,
            	skip(10),
                limit(10),
                project(fields(excludeId(), include("title"), include("cast")))))
            .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}

