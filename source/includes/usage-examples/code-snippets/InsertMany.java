package usage.examples;

import static com.mongodb.client.model.Filters.eq;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
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
            System.out.println("Success! Inserted: " + result.getInsertedIds());
            
            MongoCursor<Document> cursor = collection.find(eq("title", "Short Circuit 3")).iterator();

            while (cursor.hasNext()) {
                System.out.println(cursor.next());
            };

        } catch (MongoException me) {
            System.err.println("Unable to insert due to an error: " + me);
        }
        mongoClient.close();
    }

}
