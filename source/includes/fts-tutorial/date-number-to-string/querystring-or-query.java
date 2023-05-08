import java.util.Arrays;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.excludeId;
import static com.mongodb.client.model.Projections.fields;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DateNumberToStringQuery {
	public static void main( String[] args ) {
		// define query
		Document agg = new Document("$search",
			new Document ("index", "date-number-fields-tutorial")
			.append("queryString", 
				new Document("defaultPath", "propertyType")
                .append("query", "propertyType: House OR accommodatesNumber: 2 OR lastScrapedDate: 2019 OR maximumNumberOfNights: 30")));
		
		// specify connection
		String uri = "<connection-string>";
        
		// establish connection and set namespace
		try (MongoClient mongoClient = MongoClients.create(uri)) {
			MongoDatabase database = mongoClient.getDatabase("sample_airbnb");
			MongoCollection<Document> collection = database.getCollection("airbnb_mat_view");
			// run query and print results
			collection.aggregate(Arrays.asList(agg, 
					limit(5), 
					project(fields(excludeId()) ))
			).forEach(doc -> System.out.println(doc.toJson()));	
		}
	}
}
