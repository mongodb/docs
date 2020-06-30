package usage.examples;

import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

public class Distinct {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            try {
                DistinctIterable<Integer> docs = collection.distinct("year", Filters.eq("directors", "Carl Franklin"), Integer.class);
                MongoCursor<Integer> results = docs.iterator();

                while(results.hasNext()) {
                    System.out.println(results.next());
                }
            } catch (MongoException me) {
                System.err.println("An error occurred: " + me);
            }
        }
    }
}

