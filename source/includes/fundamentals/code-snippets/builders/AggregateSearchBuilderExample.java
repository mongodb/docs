package org.example;

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
import static com.mongodb.client.model.search.SearchPath.fieldPath;

public class AggregateSearchBuilderExample {

    private static final String CONNECTION_URI = "<connection URI>";

    // Match aggregation
    private static void runMatch(MongoCollection<Document> collection) {
        Bson matchStage = Aggregates.match(Filters.eq("title", "Future"));
        Bson projection = Aggregates.project(Projections.fields(Projections.include("title", "released")));

        List<Bson> aggregateStages = List.of(matchStage, projection);
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
                        fieldPath("title"), "Future"));
        // end atlasTextSearch

        // To condense result data, add this projection into the pipeline
        // Bson projection = Aggregates.project(Projections.fields(Projections.include("title", "released")));

        List<Bson> aggregateStages = List.of(textSearch);
        System.out.println("aggregateStages: " + aggregateStages);

        System.out.println("explain:\n" + collection.aggregate(aggregateStages).explain());
        collection.aggregate(aggregateStages).forEach(result -> System.out.println(result));
    }

    /*
     * Atlas search aggregation
     * Requires Atlas cluster and full text search index
     * See https://www.mongodb.com/docs/atlas/atlas-search/tutorial/ for more info on requirements
     */
    private static void runAtlasSearchWithSearchHelperMethods(MongoCollection<Document> collection) {
        // begin atlasHelperMethods
        List<Bson> pipeline = new ArrayList<>();

        pipeline.add(Aggregates.search(
                SearchOperator.compound()
                        .filter(
                                List.of(
                                        SearchOperator.in(fieldPath("genres"), "Comedy"),
                                        SearchOperator.phrase(fieldPath("fullplot"), "new york"),
                                        SearchOperator.numberRange(fieldPath("year")).gtLt(1950, 2000),
                                        SearchOperator.wildcard(fieldPath("title"), "Love *")
                                ))));

        pipeline.add(Aggregates.project(
                Projections.include("title", "year", "genres")
        ));

        AggregateIterable<Document> results = collection.aggregate(pipeline);
        results.forEach(doc -> System.out.println(doc.toJson()));
        // end atlasHelperMethods
    }

    /*
     * Atlas search aggregation
     * Requires Atlas cluster and full text search index
     * See https://www.mongodb.com/docs/atlas/atlas-search/tutorial/ for more info on requirements
     */
    private static void runAtlasSearch(MongoCollection<Document> collection) {
        // begin atlasSearch
        Bson search_stage = Aggregates.search(
                SearchOperator.compound()
                        .filter(List.of(SearchOperator.text(fieldPath("genres"), "Drama")))
                        .must(List.of(SearchOperator.phrase(fieldPath("cast"), "keanu reeves")))
        );
        // end atlasSearch

        // To condense result data, add this projection into the pipeline
        // Bson projection = Aggregates.project(Projections.fields(Projections.include("title", "released")));

        List<Bson> aggregateStages = List.of(search_stage);
        System.out.println("aggregateStages: " + aggregateStages);

        System.out.println("explain:\n" + collection.aggregate(aggregateStages).explain());
        collection.aggregate(aggregateStages).forEach(result -> System.out.println(result));
    }

    private static void runAtlasTextSearchMeta(MongoCollection<Document> collection) {
        Bson textSearchMeta =
                // begin atlasSearchMeta
                Aggregates.searchMeta(
                        SearchOperator.near(2010, 1, fieldPath("year")));
        // end atlasSearchMeta

        List<Bson> aggregateStages = List.of(textSearchMeta);
        System.out.println("aggregateStages: " + aggregateStages);

        collection.aggregate(aggregateStages).forEach(result -> System.out.println(result));
    }

    public static void main(String[] args) {
        String uri = CONNECTION_URI; 

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");


            // Uncomment the methods that correspond to what you're testing
            // runMatch(collection);
            // runAtlasTextSearch(collection);
            // runAtlasSearch(collection);
            // runAtlasTextSearchMeta(collection);
            // runAtlasSearchWithSearchHelperMethods(collection);
        }
    }
}
