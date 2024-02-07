import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.MongoException;

import java.util.Arrays;
import java.util.List;
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

            // Create two documents
            List<Document> peopleList = Arrays.asList(
                    new Document().append("name", new Document().append("first", "Alan").append("last", "Turing"))
                            .append("birth", Date.from(Instant.parse("1912-05-23T00:00:00.000+00:00")))
                            .append("death", Date.from(Instant.parse("1954-05-07T00:00:00.000+00:00")))
                            .append("contribs", Arrays.asList("Turing machine", "Turing test", "Turingery"))
                            .append("views", 1250000),
                    new Document().append("name", new Document().append("first", "Grace").append("last", "Hopper"))
                            .append("birth", Date.from(Instant.parse("1906-12-09T00:00:00.000+00:00")))
                            .append("death", Date.from(Instant.parse("1992-01-01T00:00:00.000+00:00")))
                            .append("contribs", Arrays.asList("Mark I", "UNIVAC", "COBOL"))
                            .append("views", 3860000)
                    );

            try {
                // Insert the documents into the specified collection
                InsertManyResult result = collection.insertMany(peopleList);
            } catch (MongoException me) {
                System.err.println("Unable to insert due to an error: " + me);
            }
            // Find the document
            Document document = collection.find(eq("name.last", "Turing"))
                    .first();

            // Print results
            if (document == null) {
                System.out.println("No results found.");
            } else {
                System.out.println("Document found:");
                System.out.println(document.toJson());
            }
        }
    }
}
