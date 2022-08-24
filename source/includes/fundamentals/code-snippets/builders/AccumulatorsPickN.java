package fundamentals.builders;

import java.util.Arrays;

import org.bson.BsonString;
import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import static com.mongodb.client.model.Accumulators.*;
import static com.mongodb.client.model.Aggregates.*;
import static com.mongodb.client.model.Sorts.*;
import static java.util.Arrays.asList;

public class AccumulatorsPickN {
    private static final String CONNECTION_URI = "<your connection URI>";
    
    private static void runAggregation(MongoCollection<Document> collection, Bson ...stages) {
        System.out.println("aggregateStages: " + Arrays.toString(stages));
        System.out.println("=== [ Result ] ============================================");
        collection.aggregate(asList(stages)).forEach(result -> System.out.println(result));
    }
    
    private static Bson createMinNStage() {
        return
                // begin minN accumulator
                group(
                        "$year",
                        minN(
                                "lowest_three_ratings",
                                new BsonString("$imdb.rating"),
                                3
                                ));
                // end minN accumulator
    }
    private static Bson createnMaxNStage() {
        return
                // begin maxN accumulator
                group(
                        "$year",
                        maxN(
                                "highest_two_ratings",
                                new BsonString("$imdb.rating"),
                                2
                                ));
                // end maxN accumulator
    }
    private static Bson createFirstNStage() {
        return
                // begin firstN accumulator
                group(
                        "$year",
                        firstN(
                                "first_four_movies",
                                new BsonString("$title"),
                                4
                                ));
                // end firstN accumulator
    }
    private static Bson createLastNStage() {
        return
                // begin lastN accumulator
                group(
                        "$year",
                        lastN(
                                "last_three_movies",
                                new BsonString("$title"),
                                3
                                ));
                // end lastN accumulator
    }
    private static Bson createTopStage() {
        return
                // begin top accumulator
                group(
                        "$year", 
                        top(
                                "top_rated_movie",
                                descending("imdb.rating"),
                                asList(new BsonString("$title"), new BsonString("$imdb.rating"))
                                ));
                // end top accumulator
    }
    
    private static Bson createTopNStage() {
        return
                // begin topN accumulator
                group(
                        "$year", 
                        topN(
                                "longest_three_movies",
                                descending("runtime"),
                                asList(new BsonString("$title"), new BsonString("$runtime")),
                                3
                                ));
                // end topN accumulator
    }
    private static Bson createBottomStage() {
        return 
                // begin bottom accumulator
                group(
                        "$year", 
                        bottom(
                                "shortest_movies",
                                descending("runtime"),
                                asList(new BsonString("$title"), new BsonString("$runtime"))
                                ));
                // end bottom accumulator;
    }
    private static Bson createBottomNStage() {
        return 
                // begin bottomN accumulator
                group(
                        "$year", 
                        bottomN(
                                "lowest_rated_two_movies",
                                descending("imdb.rating"),
                                asList(new BsonString("$title"), new BsonString("$imdb.rating")),
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
