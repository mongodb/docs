import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class CreateMaterializedView {
    public static void main(String[] args) {
        // Connect to MongoDB
        MongoClient client = MongoClients.create("<connection-string>");
        MongoDatabase database = client.getDatabase("sample_airbnb");
        MongoCollection<Document> collection = database.getCollection("listingsAndReviews");

        // Create the aggregation pipeline
        List<Document> pipeline = Arrays.asList(
            new Document("$project", new Document("lastScrapedDate", new Document("$dateToString", new Document("format", "%Y-%m-%d").append("date", "$last_scraped")))
                                     .append("accommodatesNumber", new Document("$toString", "$accommodates"))
                                     .append("maximumNumberOfNights", new Document("$toString", "$maximum_nights"))
                                     .append("propertyName", "$name")
                                     .append("propertyType", "$property_type")
                                     ),
            new Document("$merge", new Document("into", "airbnb_mat_view").append("whenMatched", "replace"))
        );
                                     
        // Execute the aggregation
        try {
          collection.aggregate(pipeline).toCollection();
        } catch (Exception e) {
            System.err.println("Error creating materialized view: " + e.getMessage());
        }
        System.out.println("Materialized view created!");
    }
}
