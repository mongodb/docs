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

public class CompoundBoostQuery {
  public static void main( String[] args ) {
    // define clauses
    List<Document> mustClauses =
        List.of(
            new Document(
                "range", new Document("path", "year")
                .append("gte", 2013)
                .append("lte", 2015)));
    List<Document> shouldClauses =
        List.of(
            new Document(
                "text",
                new Document("query", "snow")
                    .append("path", "title")
                    .append("score", new Document("boost", new Document("value", 2)))));
    Document highlightOption = new Document("path", "title");
    // define query
    Document agg =
        new Document("$search",
            new Document("index", "compound-query-custom-score-tutorial")
            .append("compound",
                new Document("must", mustClauses).append("should", shouldClauses))
            .append("highlight", highlightOption));
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
          excludeId(), 
          include("title", "year"), 
          computed("score", new Document("$meta", "searchScore")), 
          computed("highlights", new Document("$meta", "searchHighlights"))))))
      .forEach(doc -> System.out.println(doc.toJson()));	
    }
  }
}
