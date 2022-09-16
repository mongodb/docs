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

public class BasicEmbeddedDocumentsSearch {
  public static void main( String[] args ) {
    // define clauses
    List<Document> mustClause =
        List.of(
            new Document(
            		"text", 
                    new Document("path", "teachers.first")
                        .append("query", "John")));
    List<Document> shouldClause =
        List.of(
            new Document(
            		"text", 
                    new Document("path", "teachers.last")
                            .append("query", "Smith")));

    // define query
    Document agg =
        new Document(
            "$search",
            new Document(
            		"embeddedDocument", 
            	    new Document("path", "teachers")
            	        .append("operator", 
            	    new Document("compound",
                    new Document("must", mustClause)
                    .append("should", shouldClause)))));

    // specify connection
    String uri = "<connection-string>";

    // establish connection and set namespace
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      MongoDatabase database = mongoClient.getDatabase("local_school_district");
      MongoCollection<Document> collection = database.getCollection("schools");

      // run query and print results
      collection.aggregate(Arrays.asList(agg,
        limit(5),
        project(fields(excludeId(), include("teachers"), computed("score", new Document("$meta", "searchScore"))))))
        .forEach(doc -> System.out.println(doc.toJson()));
    }
  }
}