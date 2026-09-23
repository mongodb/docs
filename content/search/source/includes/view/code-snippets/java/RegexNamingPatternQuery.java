import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class RegexNamingPatternQuery {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database =
                mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listings_SearchableTypes");

            // Run the aggregation query on the View
            List<Document> pipeline = Arrays.asList(
                new Document("$search",
                    new Document("index", "listingsSearchableTypes")
                        .append("compound",
                            new Document("should", Arrays.asList(
                                new Document("equals",
                                    new Document("path",
                                        "searchable_types.property_type")
                                        .append("value", "House")),
                                new Document("equals",
                                    new Document("path",
                                        "searchable_types.room_type")
                                        .append("value",
                                            "Private room")))))),
                new Document("$limit", 10),
                new Document("$project",
                    new Document("_id", 0)
                        .append("searchable_types", 1)
                        .append("name", 1))
            );

            AggregateIterable<Document> results =
                collection.aggregate(pipeline);
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}
