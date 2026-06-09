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
					
      Document compound = new Document("must", Arrays.asList(
          new Document("text", new Document("query", "baseball").append("path", "plot"))))
            .append("mustNot", Arrays.asList(
          new Document("text", new Document("query", Arrays.asList("Comedy", "Romance")).append("path", "genres"))));

      Document searchStage = new Document("$search", 
          new Document("index", "default")
              .append("compound", compound));
      
      collection.aggregate(Arrays.asList(
          searchStage,
          limit(3),
          project(fields(excludeId(), include("title", "plot", "genres"))))
      ).forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
