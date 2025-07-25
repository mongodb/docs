package fundamentals.builders;

import java.util.Arrays;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.fill.FillOptions;
import com.mongodb.client.model.fill.FillOutputField;
import static com.mongodb.client.model.Aggregates.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static com.mongodb.client.model.Sorts.*;
import static com.mongodb.client.model.Accumulators.*;
import static java.util.Arrays.asList;

public class AggregateFill {

    private static final String CONNECTION_URI = "<your connection URI>";

    private static void setup(MongoCollection<Document> collection) {
        collection.insertMany(asList(
                new Document("hour", 1).append("temperature",  "23C").append("air_pressure", 29.74),
                new Document("hour", 2).append("temperature", "23.5C"),
                new Document("hour", 3).append("temperature", null).append("air_pressure",  29.76)
                ));
    }
    private static void runAggregation(MongoCollection<Document> collection, Bson ...stages) {
        System.out.println("Aggregate Stages: " + Arrays.toString(stages));
        System.out.println("=== [ Result ] ============================================");
        collection.aggregate(Arrays.asList(stages)).forEach(result -> System.out.println(result));
    }

    private static Bson createFillStage() throws Exception {
        return Aggregates.
                // begin fill aggregate
                fill(
                        FillOptions.fillOptions().sortBy(ascending("hour")),
                        FillOutputField.value("temperature", "23.6C"),
                        FillOutputField.linear("air_pressure")
                        );
                // end fill aggregate
    }

    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(CONNECTION_URI)) {
            MongoCollection<Document> collection = mongoClient.getDatabase("test_data").getCollection("weather");
            
            // Uncomment the following lines as needed for dropping and setting up the sample collection
            // collection.drop();
            // setup(collection);
            
            runAggregation(collection, createFillStage());
        } catch (Exception e) {
            System.err.println(e);
        }

    }

}

