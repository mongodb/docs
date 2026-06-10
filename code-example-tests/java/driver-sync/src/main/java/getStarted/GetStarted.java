//	:replace-start: {
//	  "terms": {
//      "class GetStarted": "class QuickStart",
//      "public Document runGetStarted()": "public static void main(String[] args)",
//      "System.getenv(\"CONNECTION_STRING\")": "\"<connection string uri>\""
//	  }
//	}
package getStarted;

// :snippet-start: example
import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class GetStarted {
    public Document runGetStarted() {

        // Replace the placeholder with your MongoDB deployment's connection string
        String uri = System.getenv("CONNECTION_STRING");

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Document doc = collection.find(eq("title", "Back to the Future")).first();
            if (doc != null) {
                System.out.println(doc.toJson());
                return doc; // :remove:
            } else {
                System.out.println("No matching documents found.");
                return null; // :remove:
            }
        }
    }
}
// :snippet-end:
// :replace-end:
