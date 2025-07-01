import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Arrays;

public class FacetAutocompleteExample {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            // define pipeline
            Document agg = new Document("$searchMeta", new Document("facet", 
            new Document("operator", 
                new Document("autocomplete", 
                    new Document("path", "title")
                    .append("query", "Gravity")))
            .append("facets", 
                new Document("titleFacet", 
                    new Document("type", "string").append("path", "title"))
             )));
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg))
                .forEach(doc -> System.out.println(doc.toJson()));

        }
    }
}
