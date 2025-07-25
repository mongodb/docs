package fundamentals.builders;

import java.util.Arrays;

import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.MongoTimeUnit;
import com.mongodb.client.model.densify.DensifyOptions;
import com.mongodb.client.model.densify.DensifyRange;

public class AggregateDensify {
    private static final String CONNECTION_URI = "<your connection URI>";
    
    private static void runAggregation(MongoCollection<Document> collection, Bson ...stages) {
        System.out.println("aggregateStages: " + Arrays.toString(stages));
        System.out.println("=== [ Result ] ============================================");
        collection.aggregate(Arrays.asList(stages)).forEach(result -> System.out.println(result));
    }
    
    // Narrows down the data in the sample_weatherdata.data namespace
    private static Bson createMatchStage() {
        return Aggregates.match(Filters.eq("position.coordinates", BsonArray.parse("[-47.9, 47.6]")));
    }
    
    
    private static Bson createDensifyStage() throws Exception {
        return Aggregates.
                // begin densify aggregate
                densify(
                        "ts", 
                        DensifyRange.partitionRangeWithStep(15, MongoTimeUnit.MINUTE),
                        DensifyOptions.densifyOptions().partitionByFields("position.coordinates"));
                // end densify aggregate
    }
    
    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(CONNECTION_URI)) {
            MongoCollection<Document> collection = mongoClient.getDatabase("sample_weatherdata").getCollection("data");
            
             runAggregation(collection, createMatchStage(), createDensifyStage()); 
        } catch (Exception e) {
            System.err.println(e);
        }

    }

}
