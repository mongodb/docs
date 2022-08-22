package fundamentals.builders;

import java.util.Arrays;

import org.bson.BsonString;
import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;

public class AccumulatorsPickN {
    private static final String CONNECTION_URI = "<your connection URI>";
    
    private static void runAggregation(MongoCollection<Document> collection, Bson ...stages) {
        System.out.println("aggregateStages: " + Arrays.toString(stages));
        System.out.println("=== [ Result ] ============================================");
        collection.aggregate(Arrays.asList(stages)).forEach(result -> System.out.println(result));
    }
    
    private static Bson createMinNStage() {
        return
                // begin minN accumulator
                Aggregates.group(
                        "$year",
                        Accumulators.minN(
                                "lowest_three_ratings",
                                new BsonString("$imdb.rating"),
                                3
                                ));
                // end minN accumulator
    }
    private static Bson createnMaxNStage() {
        return
                // begin maxN accumulator
                Aggregates.group(
                        "$year",
                        Accumulators.maxN(
                                "highest_two_ratings",
                                new BsonString("$imdb.rating"),
                                2
                                ));
                // end maxN accumulator
    }
    private static Bson createFirstNStage() {
        return
                // begin firstN accumulator
                Aggregates.group(
                        "$year",
                        Accumulators.firstN(
                                "first_four_movies",
                                new BsonString("$title"),
                                4
                                ));
                // end firstN accumulator
    }
    private static Bson createLastNStage() {
        return
                // begin lastN accumulator
                Aggregates.group(
                        "$year",
                        Accumulators.lastN(
                                "last_three_movies",
                                new BsonString("$title"),
                                3
                                ));
                // end lastN accumulator
    }
    private static Bson createTopStage() {
        return
                // begin top accumulator
                Aggregates.group(
                        "$year", 
                        Accumulators.top(
                                "top_rated_movie",
                                Sorts.descending("imdb.rating"),
                                Arrays.asList(new BsonString("$title"), new BsonString("$imdb.rating"))
                                ));
                // end top accumulator
    }
    
    private static Bson createTopNStage() {
        return
                // begin topN accumulator
                Aggregates.group(
                        "$year", 
                        Accumulators.topN(
                                "longest_three_movies",
                                Sorts.descending("runtime"),
                                Arrays.asList(new BsonString("$title"), new BsonString("$runtime")),
                                3
                                ));
                // end topN accumulator
    }
    private static Bson createBottomStage() {
        return 
                // begin bottom accumulator
                Aggregates.group(
                        "$year", 
                        Accumulators.bottom(
                                "shortest_movies",
                                Sorts.descending("runtime"),
                                Arrays.asList(new BsonString("$title"), new BsonString("$runtime"))
                                ));
                // end bottom accumulator;
    }
    private static Bson createBottomNStage() {
        return 
                // begin bottomN accumulator
                Aggregates.group(
                        "$year", 
                        Accumulators.bottomN(
                                "lowest_rated_two_movies",
                                Sorts.descending("imdb.rating"),
                                Arrays.asList(new BsonString("$title"), new BsonString("$imdb.rating")),
                                2
                                ));
                // end bottomN accumulator;
    }
    
    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create(CONNECTION_URI)) {
            MongoCollection<Document> collection = mongoClient.getDatabase("sample_mflix").getCollection("movies");

            // Uncomment the example aggregations you want to run below
            // runAggregation(collection, createMinNStage());
            // runAggregation(collection, createMaxNStage());
            // runAggregation(collection, createFirstNStage());
            // runAggregation(collection, createLastNStage());
            // runAggregation(collection, createTopStage());
            // runAggregation(collection, createTopNStage());
            // runAggregation(collection, createBottomStage());
            // runAggregation(collection, createBottomNStage());
        }
    }
}
