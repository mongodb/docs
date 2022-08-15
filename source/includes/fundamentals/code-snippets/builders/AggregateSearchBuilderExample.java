package fundamentals.builders;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.search.SearchOperator;
import com.mongodb.client.model.search.SearchPath;
public class AggregateSearchBuilderExample {

    private static final String CONNECTION_URI = "<connection URI>";

    // Match aggregation
    private static void runMatch(MongoCollection<Document> collection) {
        Bson matchStage = Aggregates.match(Filters.eq("title", "Future"));
        Bson projection = Aggregates.project(Projections.fields(Projections.include("title", "released")));

        List<Bson> aggregateStages = Arrays.asList(matchStage, projection);
        System.out.println("aggregateStages: " + aggregateStages);
        collection.aggregate(
                aggregateStages
                ).forEach(result -> System.out.println(result));
    }

    /* 
     * Atlas text search aggregation
     * Requires Atlas cluster and full text search index
     * See https://www.mongodb.com/docs/atlas/atlas-search/tutorial/ for more info on requirements
     */
    private static void runAtlasTextSearch(MongoCollection<Document> collection) {
        // begin atlasTextSearch
        Bson textSearch = Aggregates.search(
                SearchOperator.text(
                        SearchPath.fieldPath("title"), "Future"));
        // end atlasTextSearch

        Bson projection = Aggregates.project(Projections.fields(Projections.include("title", "released")));

        List<Bson> aggregateStages = Arrays.asList(textSearch, projection);
        System.out.println("aggregateStages: " + aggregateStages);

        System.out.println("explain:\n" + collection.aggregate(aggregateStages).explain());
        collection.aggregate(aggregateStages).forEach(result -> System.out.println(result));
    }

    public static void main(String[] args) {
        String uri = CONNECTION_URI; 

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // runMatch(collection);
            runAtlasTextSearch(collection);
        }
    }
}
