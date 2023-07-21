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

import java.util.Date;

public class SortByString {
  public static void main( String[] args ) {
    // define clause
    List<Document> shouldClause =
        List.of(
            new Document(
                "wildcard",
                new Document("query", "Prance*")
                    .append("path", "title")
                    .append("allowAnalyzedField", true)),
            new Document(
                "wildcard",
                new Document("query", "Prince*")
                    .append("path", "title")
                    .append("allowAnalyzedField", true)));
    
    // define query
    Document agg =
        new Document(
            "$search",
            new Document("index", "sort-tutorial")
            .append("compound",
                new Document("should", shouldClause))
                .append("sort", new Document("title", 1L)));
    
    // specify connection
    String uri = "<connection-string>";
    
    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("sample_mflix");
      MongoCollection<Document> collection = database.getCollection("movies");
	  
      // run query and print results
      collection.aggregate(Arrays.asList(agg, 
        limit(5),
        project(fields(excludeId(), include("title"), computed("score", new Document("$meta", "searchScore"))))))
        .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
