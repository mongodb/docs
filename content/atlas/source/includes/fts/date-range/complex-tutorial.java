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

public class DateRangeComplex {
    public static void main( String[] args ) {
        // define clauses
        List<Document> mustClauses =
            List.of( new Document(
              "range", new Document("path", "released")
              .append("gt", Date.from(Instant.parse("2015-01-01T00:00:00.000Z")))
              .append("lt", Date.from(Instant.parse("2015-12-31T00:00:00.000Z")))));
        List<Document> shouldClauses =
            List.of(
                new Document(
                "near",
                    new Document("pivot", 2629800000L)
                    .append("path", "released")
                    .append("origin", Date.from(Instant.parse("2015-07-01T00:00:00.000+00:00")))));
        List<Document> mustNotClauses =
            List.of(
                new Document(
                    "text",
                    new Document("query", "Documentary")
                    .append("path", "genres")));
                                // define query
        Document agg = 
            new Document( "$search",
                new Document("index", "date-range-tutorial")
                    .append( "compound",
                        new Document().append("must", mustClauses)
                        .append("should", shouldClauses)
                        .append("mustNot", mustNotClauses)));
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
                include("title", "released", "genres"), 
                computed("score", new Document("$meta", "searchScore")))),
            limit(6)))
            .forEach(doc -> System.out.println(doc.toJson()));	
        }
      }
}
