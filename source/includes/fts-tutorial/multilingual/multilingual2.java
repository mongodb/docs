import java.util.Arrays;

import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class TwoLanguagesQuery {
    public static void main( String[] args ) {
        // define clauses
        List<Document> mustClauses =
            List.of( new Document(
                "text", new Document("path", new Document("value", "fullplot").append("multi", "fullplot_english")).append("query", "Bella")));
        List<Document> mustNotClauses =
            List.of( new Document(
                "range", new Document("path", "released")
                .append("gt", Date.from(Instant.parse("1984-01-01T00:00:00.000Z")))
                .append("lt", Date.from(Instant.parse("2016-01-01T00:00:00.000Z")))));
        List<Document> shouldClauses =
            List.of(
                new Document("text",
                    new Document("query", "Comedy")
                        .append("path", "genres"))); 
     // define query
        // define query
        Document agg = 
            new Document( "$search",
                new Document( "index", "multilingual-tutorial")
                .append("compound",
                    new Document().append("must", mustClauses)
                    .append("mustNot", mustNotClauses)
                    .append("should", shouldClauses))));
        
        // specify connection
        String uri = "<connection-string>";
        
        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
          MongoDatabase database = mongoClient.getDatabase("sample_mflix");
          MongoCollection<Document> collection = database.getCollection("movies");
          
          // run query and print results
          collection.aggregate(Arrays.asList(agg, 
          project(fields(
              excludeId(), 
              include("title", "fullplot", "released", "genres"), 
              computed("score", new Document("$meta", "searchScore"))))))
            .forEach(doc -> System.out.println(doc.toJson()));	
        }
      }
}
