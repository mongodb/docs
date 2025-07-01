import java.util.Arrays;
import java.util.List;
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

public class RunQuery {
  public static void main( String[] args ) {
    String uri = "<connection-string>";
    
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");

      Document textQuery = new Document("query", "baseball").append("path","plot");
      
      Document searchStage = new Document("$search", 
          new Document("index", "default")
              .append("text", textQuery));

      collection.aggregate(Arrays.asList(
          searchStage, 
          limit(3), 
          project(fields(excludeId(), include("title", "plot"))))
      ).forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}