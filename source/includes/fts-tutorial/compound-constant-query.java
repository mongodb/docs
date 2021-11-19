import java.util.Arrays;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.computed;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class CompoundConstantQuery {
  public static void main( String[] args ) {
    // define query
    Document agg = new Document("filter", Arrays.asList(new Document("range", 
      new Document("path", "year").append("gte", 2013).append("lte", 2015)))).append("should", Arrays.asList(
      new Document("text", new Document("query", "snow").append("path", "title").append("score", 
        new Document("constant", new Document("value", 5))))));
	// specify connection
    String uri = "<connection-string>";
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	  // run query and print results		
      collection.aggregate(Arrays.asList(
        eq("$search", eq("compound", agg)), 
        limit(10), 
        project(fields(excludeId(), include("title", "year"), computed("score", new Document("$meta", "searchScore")))))
      ).forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}