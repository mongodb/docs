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

public class SynonymsExplicitQuery {
	public static void main( String[] args ) {
		Document agg = new Document("$search",
			new Document("index", "synonyms-tutorial")
			.append("compound", 
				new Document("should", Arrays.asList(new Document("text", 
					new Document("path", "title")
					.append("query", "boat")
					.append("synonyms", "transportSynonyms")), 
				new Document("text", 
					new Document("path", "title")
					.append("query", "hat")
					.append("synonyms", "attireSynonyms"))))));
		
		String uri = "<connection-string>";

		try (MongoClient mongoClient = MongoClients.create(uri)) {
			MongoDatabase database = mongoClient.getDatabase("sample_mflix");
			MongoCollection<Document> collection = database.getCollection("movies");
					
			collection.aggregate(Arrays.asList(agg, 
					limit(10), 
					project(fields(excludeId(), include("title"), computed("score", new Document("$meta", "searchScore")))))
			).forEach(doc -> System.out.println(doc.toJson()));	
		}
	}
}
