import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class DecimalToDoubleQuery {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database =
                mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listingsAndReviews");

            // Run the aggregation query
            List<Document> pipeline = Arrays.asList(
                new Document("$search",
                    new Document("index", "listingsSearchablePrice")
                        .append("range",
                            new Document("path", "totalPrice")
                                .append("gte", 100)
                                .append("lte", 200))),
                new Document("$project",
                    new Document("_id", 0)
                        .append("totalPrice", 1)
                        .append("price", 1)
                        .append("cleaning_fee", 1))
            );

            AggregateIterable<Document> results =
                collection.aggregate(pipeline);
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}
