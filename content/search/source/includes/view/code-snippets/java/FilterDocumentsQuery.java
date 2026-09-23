import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class FilterDocumentsQuery {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection =
                database.getCollection("movies_ReleasedAfter2000");

            // Run the aggregation query on the View
            List<Document> pipeline = Arrays.asList(
                new Document("$search",
                    new Document("index", "releasedAfter2000Index")
                        .append("text",
                            new Document("path", "title")
                                .append("query", "foo"))
                        .append("sort",
                            new Document("released", 1)))
            );

            AggregateIterable<Document> results =
                collection.aggregate(pipeline);
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}
