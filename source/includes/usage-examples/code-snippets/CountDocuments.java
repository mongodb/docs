// Runs count operations on a collection by using the Java driver

package usage.examples;

import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class CountDocuments {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Bson query = eq("countries", "Spain");

            try {
                // Retrieves and prints the estimated number of documents in the collection
                long estimatedCount = collection.estimatedDocumentCount();
                System.out.println("Estimated number of documents in the movies collection: " + estimatedCount);

                // Retrieves and prints the number of documents with a "countries" value of "Spain"
                long matchingCount = collection.countDocuments(query);
                System.out.println("Number of movies from Spain: " + matchingCount);
            
            // Prints a message if any exceptions occur during the operations
            } catch (MongoException me) {
                System.err.println("An error occurred: " + me);
            }
        }
    }
}