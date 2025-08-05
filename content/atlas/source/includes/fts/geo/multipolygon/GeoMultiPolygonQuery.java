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

public class GeoMultiPolygonQuery {
	public static void main( String[] args ) {

        // define query
		Document agg = new Document("$search",
		new Document("geoWithin", 
			new Document("geometry", 
				new Document("type", "MultiPolygon")
					.append("coordinates", Arrays.asList(
						Arrays.asList(
							Arrays.asList(
								Arrays.asList(-157.8412413882, 21.2882235819),
								Arrays.asList(-157.8607925468, 21.2962046205),
								Arrays.asList(-157.8646640634, 21.3077019651),
								Arrays.asList(-157.862776699, 21.320776283),
								Arrays.asList(-157.8341758705, 21.3133826738),
								Arrays.asList(-157.8349985678, 21.3000822569),
								Arrays.asList(-157.8412413882, 21.2882235819)
							)
						),
						Arrays.asList(
							Arrays.asList(
								Arrays.asList(-157.852898124, 21.301208833),
								Arrays.asList(-157.8580050499, 21.3050871833),
								Arrays.asList(-157.8587346108, 21.3098050385),
								Arrays.asList(-157.8508811028, 21.3119240258),
								Arrays.asList(-157.8454308541, 21.30396767),
								Arrays.asList(-157.852898124, 21.301208833)
							)
						)
					)))
			.append("path", "address.location")));

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
