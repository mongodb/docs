import java.util.Arrays;

import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class SortSpeedPrecision {
  public static void main( String[] args ) {
    // define query
    Document agg =
        new Document(
            "$search",
            new Document("index", "sort-tutorial")
            .append("autocomplete",
                new Document("path", "title")
                .append("query", "Happy"))
            .append("returnStoredSource", true));
    
    // specify connection
    String uri = "<connection-string>";
    
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	  
      // run query and print results
      collection.aggregate(Arrays.asList(agg, 
        Aggregates.limit(5),
        Aggregates.sort(Sorts.descending("title"))))
        .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
