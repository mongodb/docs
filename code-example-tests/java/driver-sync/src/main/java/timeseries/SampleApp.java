//	:replace-start: {
//	  "terms": {
//      "static Document": "static void",
//      "runExample": "main",
//      "System.getenv(\"CONNECTION_STRING\")": "\"<connection string>\"",
//      "timeseries": "org.example"
//	  }
//	}

// :snippet-start: example
package timeseries;

// Modify imports for each tutorial as needed.
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
// :remove-start:
import com.mongodb.client.MongoDatabase;
import org.bson.BsonDocument;
import org.bson.BsonInt64;
import org.bson.Document;
import org.bson.conversions.Bson;
// :remove-end:

public class SampleApp {
    public static Document runExample(String[] args) {
        // Replace the placeholder with your connection string.
        String uri = System.getenv("CONNECTION_STRING");

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // start example code here
            // :remove-start:
            MongoDatabase database = mongoClient.getDatabase("admin");
            Bson command = new BsonDocument("ping", new BsonInt64(1));
            return database.runCommand(command);
            // :remove-end:

            // end example code here
        } catch (MongoException me) {
            System.err.println(me.getMessage());
            return new Document("There was an error connecting to MongoDB", me.getMessage()); // :remove:
        }
    }
}
// :snippet-end:
// :replace-end:
