import java.util.Arrays;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.computed;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class GeoQuery {
        public static void main( String[] args ) {
                Document agg = new Document( "$search",
                new Document( "index", "geo-json-tutorial")
                .append("compound",
                    new Document("must", Arrays.asList(new Document("geoWithin", 
                    new Document("geometry", 
                        new Document("type", "Polygon")
                            .append("coordinates", Arrays.asList(Arrays.asList(Arrays.asList(-161.323242d, 22.512557d), Arrays.asList(-152.446289d, 22.065278d), Arrays.asList(-156.09375d, 17.811456d), Arrays.asList(-161.323242d, 22.512557d)))))
                            .append("path", "address.location"))))
                .append("should", Arrays.asList(new Document("text", 
                    new Document("path", "property_type")
                        .append("query", "Condominium"))))));
        
                String uri = "<connection-string>";

                try (MongoClient mongoClient = MongoClients.create(uri)) {
                        MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
                        MongoCollection<Document> collection = database.getCollection("listingsAndReviews");
                                        
                        collection.aggregate(Arrays.asList(agg, 
                            limit(10), 
                            project(fields(excludeId(), include("name", "address", "property_type"), computed("score", new Document("$meta", "searchScore"))))))
                            .forEach(doc -> System.out.println(doc.toJson() + "\n"));    
                }
        }
}