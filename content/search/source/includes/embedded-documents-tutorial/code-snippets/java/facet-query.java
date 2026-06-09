import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

public class FacetEmbeddedDocumentsSearch {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("local_school_district");
            MongoCollection<Document> collection = database.getCollection("schools");
            
            // define pipeline
            Document agg = new Document("$searchMeta", 
                new Document( "index", "embedded-documents-tutorial")
                .append("facet", 
                    new Document("operator", 
                        new Document("text", 
                            new Document("path", "name")
                            .append("query", "High")))
                .append("facets", 
                    new Document("gradeFacet", 
                        new Document("type", "string").append("path", "teachers.classes.grade"))
                )));
            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg))
                .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
