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

public class ComplexQuery {
  public static void main( String[] args ) {
    Document agg = new Document("must", Arrays.asList(
      new Document("text", new Document("query", Arrays.asList("Hawaii", "Alaska")).append("path", "plot")), 
      new Document("regex", new Document("query", "([0-9]{4})").append("path", "plot").append("allowAnalyzedField", true))))
        .append("mustNot", Arrays.asList(
      new Document("text", new Document("query", Arrays.asList("Comedy", "Romance")).append("path", "genres")), 
      new Document("text", new Document("query", Arrays.asList("Beach", "Snow")).append("path", "title"))));
		
    String uri = "<connection-string>";

    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
					
      collection.aggregate(Arrays.asList(
        eq("$search", eq("compound", agg)), 
        project(fields(excludeId(), include("title", "plot", "genres"))))
      ).forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
