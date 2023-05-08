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

public class PartialMatchQuery {
	public static void main( String[] args ) {

        // define query
		Document agg = new Document("$search",
		new Document ("index", "partial-match-tutorial")
		.append("autocomplete", 
			new Document("path", "plot")
				.append("query", "new purchase")
				.append("tokenOrder", "any")
				.append("fuzzy", 
				new Document("maxEdits", 2)
					.append("prefixLength", 1)
					.append("maxExpansions", 256))));

		// specify connection
		String uri = "<connection-string>";

        // establish connection and set namespace
		try (MongoClient mongoClient = MongoClients.create(uri)) {
			MongoDatabase database = mongoClient.getDatabase("sample_mflix");
			MongoCollection<Document> collection = database.getCollection("movies");
			// run query and print results
			collection.aggregate(Arrays.asList(agg, 
				limit(5), 
				project(fields(excludeId(), include("title", "plot")))))
            .forEach(doc -> System.out.println(doc.toJson()));	
		}
	}
}