package usage.examples;

import java.util.Arrays;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;

public class WatchCompanion {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            try {
                InsertOneResult insertResult = collection.insertOne(new Document("test", "sample movie document"));
                System.out.println("Success! Inserted document id: " + insertResult.getInsertedId());

                UpdateResult updateResult = collection.updateOne(new Document("test", "sample movie document"), Updates.set("field2", "sample movie document update"));
                System.out.println("Updated " + updateResult.getModifiedCount() + " document.");

                DeleteResult deleteResult = collection.deleteOne(new Document("field2", "sample movie document update"));
                System.out.println("Deleted " + deleteResult.getDeletedCount() + " document.");
            } catch (MongoException me) {
                System.err.println("Unable to insert, update, or replace due to an error: " + me);
            }
        }
    }
}
