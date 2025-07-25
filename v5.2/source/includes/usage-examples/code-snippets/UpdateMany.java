// Updates documents that match a query filter by using the Java driver

package usage.examples;

import static com.mongodb.client.model.Filters.gt;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

public class UpdateMany {

    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Bson query = gt("num_mflix_comments", 50);

            // Creates instructions to update the values of two document fields
            Bson updates = Updates.combine(
                    Updates.addToSet("genres", "Frequently Discussed"),
                    Updates.currentTimestamp("lastUpdated"));

            try {
                // Updates documents that have a "num_mflix_comments" value over 50
                UpdateResult result = collection.updateMany(query, updates);

                // Prints the number of updated documents
                System.out.println("Modified document count: " + result.getModifiedCount());

            // Prints a message if any exceptions occur during the operation
            } catch (MongoException me) {
                System.err.println("Unable to update due to an error: " + me);
            }
        }
    }
}
