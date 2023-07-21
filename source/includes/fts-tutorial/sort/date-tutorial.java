import java.util.Arrays;
import java.util.List;

import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.time.Instant;
import java.util.Date;

public class SortByDate {
  public static void main( String[] args ) {
    // define query
	    Document agg =
	        new Document("$search", 
	        	    new Document("index", "sort-tutorial")
	                .append("compound", 
	        new Document("filter", Arrays.asList(new Document("wildcard", 
	                        new Document("query", "Summer*")
	                                .append("path", "title"))))
	                    .append("must", Arrays.asList(new Document("near", 
	                        new Document("pivot", 13149000000L)
	                                .append("path", "released")
	                                .append("origin", Date.from(Instant.parse("2014-04-18T00:00:00.000+00:00")))))))
	                .append("sort", new Document("released", -1)));

    // specify connection
    String uri = "<connection-string>";

    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	  // run query and print results
      collection.aggregate(Arrays.asList(agg, 
        limit(5), 
        project(fields(exclude("_id"), include("title"), include("released"), computed("score", new Document("$meta", "searchScore"))))))
        .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
