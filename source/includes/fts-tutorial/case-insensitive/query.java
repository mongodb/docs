import java.util.Arrays;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CaseInsensitiveQuery {
  public static void main( String[] args ) {
    // define query
	    Document agg =
	        new Document("$search", 
	        	    new Document("index", "case-insensitive-sort")
	        	    .append("text", 
	        	    	new Document("path", "title")
	        	    	        .append("query", "train"))
	        	    	            .append("sort", 
	        	    	    new Document("title", 1)));

    // specify connection
    String uri = "<connection-string>";

    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
      
	  // run query and print results
      collection.aggregate(Arrays.asList(agg, 
        limit(5),
        project(fields(include("_id"), include("title"), include("awards"), computed("score", new Document("$meta", "searchScore"))))))
        .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
