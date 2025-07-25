// Inserts sample documents describing movies by using the Java driver

package usage.examples;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;

public class InsertMany {

    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Creates two sample documents containing a "title" field
            List<Document> movieList = Arrays.asList(
                    new Document().append("title", "Short Circuit 3"),
                    new Document().append("title", "The Lego Frozen Movie"));

            try {
                // Inserts sample documents describing movies into the collection
                InsertManyResult result = collection.insertMany(movieList);

                // Prints the IDs of the inserted documents
                System.out.println("Inserted document ids: " + result.getInsertedIds());
            
            // Prints a message if any exceptions occur during the operation
            } catch (MongoException me) {
                System.err.println("Unable to insert due to an error: " + me);
            }
        }
    }
}
