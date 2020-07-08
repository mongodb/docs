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
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Bson query = eq("countries", "Spain");

            try {
                long estimatedCount = collection.estimatedDocumentCount();
                System.out.println("Estimated number of documents in the movies collection: " + estimatedCount);

                long matchingCount = collection.countDocuments(query);
                System.out.println("Number of movies from Spain: " + matchingCount);
            } catch (MongoException me) {
                System.err.println("An error occurred: " + me);
            }
        }
    }
}

