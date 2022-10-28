import java.util.Arrays;

import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class SortForSpeed {
  public static void main( String[] args ) {
    // define query
    Document agg =
        new Document(
            "$search",
            new Document(
                    "near",
                    new Document("path", "year")
                    .append("origin", 2015)
                    .append("pivot", 5)));
    
    // specify connection
    String uri = "<connection-string>";
    
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	  
      // run query and print results
      collection.aggregate(Arrays.asList(agg, 
        limit(5), 
        project(fields(include("title"), include("released"), include("year")))))
        .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
