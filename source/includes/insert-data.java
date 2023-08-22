import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.MongoException;

import java.util.Arrays;
import java.util.Date;
import java.time.Instant;
import org.bson.types.ObjectId;
import org.bson.Document;

public class InsertData {
    public static void main(String[] args) {
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection-string>";

        // Connect to your Atlas Cluster and insert a document
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // Reference the database and collection to use
            MongoDatabase database = mongoClient.getDatabase("gettingStarted");
            MongoCollection<Document> collection = database.getCollection("people");

            try {
                // Insert a new document into the specified collection
                InsertOneResult result = collection.insertOne(new Document()
                        .append("_id", new ObjectId())
                        .append("name", new Document().append("first", "Alan").append("last", "Turing"))
                        .append("birth", Date.from(Instant.parse("1912-05-23T00:00:00.000+00:00")))
                        .append("death", Date.from(Instant.parse("1954-05-07T00:00:00.000+00:00")))
                        .append("contribs", Arrays.asList("Turing machine", "Turing test", "Turingery"))
                        .append("views", 1250000));
            } catch (MongoException me) {
                System.err.println("Unable to insert due to an error: " + me);
            }
            // Find and return the document
            Document document = collection.find(eq("name.last", "Turing"))
                    .first();
            if (document == null) {
                System.out.println("No results found.");
            } else {
                System.out.println("Document found:");
                System.out.println(document.toJson());
            }
        }
    }
}
