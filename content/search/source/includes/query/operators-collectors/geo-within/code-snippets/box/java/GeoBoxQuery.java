import java.util.Arrays;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class GeoBoxQuery {
	public static void main( String[] args ) {

        // define query
		Document agg = new Document("$search",
		new Document("geoWithin", 
			new Document("path", "address.location")
				.append("box", 
				new Document("bottomLeft", 
					new Document("type", "Point")
						.append("coordinates", Arrays.asList(112.467, -55.050)))
				.append("topRight", 
					new Document("type", "Point")
						.append("coordinates", Arrays.asList(168.000, -9.133))))));

		// specify connection
		String uri = "<connection-string>";

        // establish connection and set namespace
		try (MongoClient mongoClient = MongoClients.create(uri)) {
			MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
			MongoCollection<Document> collection = database.getCollection("listingsAndReviews");
			// run query and print results
			collection.aggregate(Arrays.asList(agg, 
				limit(3), 
				project(fields(excludeId(), include("name", "address")))))
            .forEach(doc -> System.out.println(doc.toJson()));	
		}
	}
}
