import java.util.Arrays;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Projections.computed;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class SynonymsExplicitQuery {
  public static void main( String[] args ) {
    // define query
    Document agg = new Document("query", "boat").append("path","title").append("synonyms", "mySynonyms");
    // specify connection
    String uri = "<connection-string>";
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
			// run query and print results
      collection.aggregate(Arrays.asList(
        eq("$search", eq("text", agg)), 
        limit(10), 
        project(fields(excludeId(), include("title"), computed("score", new Document("$meta", "searchScore")))))
      ).forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}