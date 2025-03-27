import java.util.Arrays;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.types.ObjectId;

import org.bson.Document;

public class CompoundBuryQuery {
  public static void main( String[] args ) {
    // define query
    Document agg =
        new Document("$search", 
        	new Document("index", "compound-query-custom-score-tutorial")
            .append("compound", 
            	new Document("should", Arrays.asList(
            	    new Document("compound", 
                        new Document("must", Arrays.asList(new Document("text", 
                            new Document("query", "ghost")
                            .append("path", Arrays.asList("plot", "title")))))
                        .append("mustNot", Arrays.asList(new Document("in", 
                            new Document("value", Arrays.asList(new ObjectId("573a13cdf29313caabd83c08"), 
                                new ObjectId("573a13cef29313caabd873a2")))
                                .append("path", "_id"))))), 
                    new Document("compound", 
                        new Document("must", Arrays.asList(new Document("text", 
                            new Document("query", "ghost")
                            .append("path", Arrays.asList("plot", "title")))))
                        .append("filter", Arrays.asList(new Document("in", 
                            new Document("value", Arrays.asList(new ObjectId("573a13cdf29313caabd83c08"), 
                                new ObjectId("573a13cef29313caabd873a2")))
                        .append("path", "_id"))))
                        .append("score", new Document("boost", 
                            new Document("value", 0.5d)))))
            	)
            )
         );
    // specify connection
    String uri = "<connection-string>";
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	// run query and print results		
      collection.aggregate(Arrays.asList(agg, 
        limit(10), 
        project(fields(
          include("title", "plot", "_id"), 
          computed("score", new Document("$meta", "searchScore"))))))
      .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
