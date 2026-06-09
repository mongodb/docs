import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.Arrays;

public class GeoBoxMetadataQuery {
    public static void main(String[] args) {
        // establish connection and set namespace
        String uri = "<connection-string>";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

            // define query
            Document agg = new Document("$searchMeta",
                new Document("facet",
                    new Document()
                        .append("operator", new Document("geoWithin",
                            new Document()
                                .append("path", "address.location")
                                .append("box", new Document()
                                    .append("bottomLeft", new Document()
                                        .append("type", "Point")
                                        .append("coordinates", Arrays.asList(112.467, -55.050)))
                                    .append("topRight", new Document()
                                        .append("type", "Point")
                                        .append("coordinates", Arrays.asList(168.000, -9.133))))))
                        .append("facets", new Document("propertyTypeFacet",
                            new Document()
                                .append("type", "string")
                                .append("path", "property_type")))));

            // run query and print results
            collection.aggregate(Arrays.asList(agg))
                .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
