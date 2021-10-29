import java.util.Arrays;
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

public class MultiAnalyzerQuery {
  public static void main( String[] args ) {
    Document agg = new Document("query", "The Count of Monte Cristo").append("path", new Document("value", "title").append("multi", "keywordAnalyzer"));

    String uri = "<connection-string>";

    try (MongoClient mongoClient = MongoClients.create(uri)) {
	  MongoDatabase database = mongoClient.getDatabase("sample_mflix");
	  MongoCollection<Document> collection = database.getCollection("movies");
					
	  collection.aggregate(Arrays.asList(
		eq("$search", eq("text", agg)), 
		project(fields(excludeId(), include("title", "year"))))
	  ).forEach(doc -> System.out.println(doc.toJson()));	
	}
  }
}
