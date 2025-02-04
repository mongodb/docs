import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class FacetQuery {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<CONNECTION-STRING>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            List<Document> agg = Arrays.asList(new Document("$search", 
            new Document("index", "facet-tutorial")
                .append("facet", new Document("operator", new Document("near", new Document("path", "released")
                    .append("origin", new java.util.Date(-1520035200000L))
                    .append("pivot", 7776000000L)))
                .append("facets", new Document("genresFacet", new Document("type", "string")
                    .append("path", "genres"))
                .append("yearFacet", new Document("type", "number")
                    .append("path", "year")
                    .append("boundaries", Arrays.asList(1910L, 1920L, 1930L, 1940L)))))), 
            new Document("$facet", new Document("meta", Arrays.asList(new Document("$replaceWith", "$$SEARCH_META"), 
                new Document("$limit", 1L)))), 
            new Document("$set", new Document("meta", new Document("$arrayElemAt", Arrays.asList("$meta", 0L)))));
            // run pipeline and print results
            collection.aggregate(agg)
                .forEach(doc -> System.out.println(doc.toJson()));

        }
    }
}

