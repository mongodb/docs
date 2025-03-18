// Retrieves distinct values of a field by using the Java driver

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
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Retrieves the distinct values of the "year" field present in documents that match the filter
            DistinctIterable<Integer> docs = collection.distinct("year", Filters.eq("directors", "Carl Franklin"), Integer.class);
            MongoCursor<Integer> results = docs.iterator();

            // Prints the distinct "year" values
            while(results.hasNext()) {
                System.out.println(results.next());
            }
        }
    }
}

