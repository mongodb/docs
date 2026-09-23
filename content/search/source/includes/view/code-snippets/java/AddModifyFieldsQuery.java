import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class AddModifyFieldsQuery {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database =
                mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection(
                    "listingsAndReviews_totalPrice");

            // Run the aggregation query on the View
            List<Document> pipeline = Arrays.asList(
                new Document("$search",
                    new Document("index", "totalPriceIndex")
                        .append("range",
                            new Document("path", "totalPrice")
                                .append("lte", 300))
                        .append("returnStoredSource", true))
            );

            AggregateIterable<Document> results =
                collection.aggregate(pipeline);
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}
