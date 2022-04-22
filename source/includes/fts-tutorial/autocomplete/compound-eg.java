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

public class AutocompleteCompoundEg {
	public static void main( String[] args ) {
		Document agg = new Document("should", Arrays.asList(new Document("autocomplete",
                    new Document("path", "title")
                            .append("query", "ball")
                            .append("score",
                    new Document("boost",
                    new Document("value", 3L)))),
                    new Document("text",
                    new Document("path", "title")
                            .append("query", "ball")
                            .append("fuzzy",
                    new Document("maxEdits", 1L)))));

		String uri = "<connection-string>";


		try (MongoClient mongoClient = MongoClients.create(uri)) {
			MongoDatabase database = mongoClient.getDatabase("sample_mflix");
			MongoCollection<Document> collection = database.getCollection("movies");

			collection.aggregate(Arrays.asList(
					eq("$search", eq("compound", agg)),
					limit(15),
					project(fields(excludeId(), include("title"), computed("score", new Document("$meta", "searchScore")))))
			).forEach(doc -> System.out.println(doc.toJson()));
		}
	}
}
