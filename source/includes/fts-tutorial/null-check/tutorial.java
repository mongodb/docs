import static com.mongodb.client.model.Aggregates.limit;
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

public class IsNullQuery {

    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("users");
            
            // define pipeline
            Document agg = new Document("$search",
                new Document ("index", "null-check-tutorial")
                .append("compound", 
                    new Document("must", 
                    new Document("exists", 
                    new Document("path", "password")))
                                .append("mustNot", 
                    new Document("wildcard", 
                    new Document("path", "password")
                                        .append("query", "*")
                                        .append("allowAnalyzedField", true)))));
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg)).forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
