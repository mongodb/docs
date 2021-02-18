package docs.aggregation;

// begin imports

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.Arrays;

// end imports

// begin connection

public class AggFactory {

    public static void main(String[] args) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("aggregation");
        MongoCollection<Document> collection = database.getCollection("factory");

        // end connection

        // drop the collection
        collection.drop();

        // insert new shape documents
        collection.insertMany(Arrays.asList(new Document("shape", "square").append("color", "green"),
            new Document("shape", "square").append("color", "red"),
            new Document("shape", "square").append("color", "blue"),
            new Document("shape", "square").append("color", "green"),
            new Document("shape", "square").append("color", "red"),
            new Document("shape", "square").append("color", "blue"),
            new Document("shape", "square").append("color", "red")));

        collection.aggregate(
            // begin aggregation
            Arrays.asList(
                Aggregates.match(Filters.in("color", "red", "blue")), // allow only red and blue shapes to pass
                Aggregates.addFields(new Field<>("shape", "circle")), // change shapes to circle
                Aggregates.group(0, // group all incoming documents together
                    Accumulators.sum("red",
                        Document.parse("{ $cond: [ { $eq: [ '$color', 'red' ] }, 1, 0 ] }")),
                    Accumulators.sum("blue", new Document("$cond", // if the color is blue, add 1 to the new
                        // "blue" field
                        Arrays.asList(new Document("$eq", Arrays.asList("$color", "blue")), 1, 0)))))
            // end aggregation
        ).forEach(doc -> System.out.println(doc.toJson()));
    }
}
