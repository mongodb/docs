// Deletes multiple documents from a collection by using the Java driver

package usage.examples;

import static com.mongodb.client.model.Filters.lt;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

public class DeleteMany {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Bson query = lt("imdb.rating", 1.9);

            try {
                // Deletes all documents that have an "imdb.rating" value less than 1.9
                DeleteResult result = collection.deleteMany(query);
                
                // Prints the number of deleted documents
                System.out.println("Deleted document count: " + result.getDeletedCount());
            
            // Prints a message if any exceptions occur during the operation
            } catch (MongoException me) {
                System.err.println("Unable to delete due to an error: " + me);
            }
        }
    }
}