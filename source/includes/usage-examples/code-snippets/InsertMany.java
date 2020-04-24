// ignored first line
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
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
        MongoClient mongoClient = MongoClients.create(uri);

        MongoDatabase database = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = database.getCollection("movies2");

        List<Document> movieList = Arrays.asList(
                new Document().append("title", "Short Circuit 3"),
                new Document().append("title", "The Lego Frozen Movie"));

        try {
            InsertManyResult result = collection.insertMany(movieList);

            System.out.println("Inserted document ids: " + result.getInsertedIds());
        } catch (MongoException me) {
            System.err.println("Unable to insert due to an error: " + me);
        }
        mongoClient.close();
    }
}
