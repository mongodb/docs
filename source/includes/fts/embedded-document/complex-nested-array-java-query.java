import java.util.Arrays;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.computed;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class ComplexEmbeddedDocumentQuery {
	public static void main(String[] args) {
        // connect to your Atlas cluster
	String uri = "<connection-string>";
		
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("my_test");
            MongoCollection<Document> collection = database.getCollection("schools");

            // define pipeline
            Document agg = new Document("$search",
            		new Document("embeddedDocument", 
            			    new Document("path", "clubs.sports")
            			                .append("operator", 
            			    new Document("queryString", 
            			    new Document("defaultPath", "clubs.sports.club_name")
            			                        .append("query", "dodgeball OR frisbee")))));

            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg,
                            limit(5),
                            project(fields(
                                    include("name", "clubs.sports"),
                                    computed("score", new Document("$meta", "searchScore"))))))
                    .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}