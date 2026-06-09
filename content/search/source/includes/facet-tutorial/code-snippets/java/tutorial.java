import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

public class FacetQuery {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document agg = new Document("$searchMeta", 
                new Document( "index", "facet-tutorial")
                .append("facet", 
                    new Document("operator", 
                        new Document("near", 
                            new Document("path", "released")
                            .append("origin", Date.from(Instant.parse("1921-11-01T00:00:00.000+00:00")))
                            .append("pivot", 7776000000L)))
                .append("facets", 
                    new Document("genresFacet", 
                        new Document("type", "string").append("path", "genres"))
                    .append("yearFacet",
                        new Document("type", "number").append("path", "year")
                        .append("boundaries", Arrays.asList(1910, 1920, 1930, 1940))
             ))));
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg))
                .forEach(doc -> System.out.println(doc.toJson()));

        }
    }
}
