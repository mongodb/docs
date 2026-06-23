package org.example;

import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.reactivestreams.Publisher;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.search.SearchOperator;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
import reactor.core.publisher.Flux;

public class MongoDBSearchAggregates {

    private static final String CONNECTION_URI = "<connection URI>";

    /*
     * MongoDB search aggregation
     * Requires Atlas cluster and full text search index
     * See https://www.mongodb.com/docs/atlas/atlas-search/tutorial/ for more info on requirements
     */
    private static void runMongoDBSearchWithSearchHelperMethods(MongoCollection<Document> collection) {
        // begin MongoDBSearchHelperMethods
        List<Bson> pipeline = List.of(
                Aggregates.search(
                        SearchOperator.compound()
                                .filter(
                                        List.of(
                                                SearchOperator.in(fieldPath("genres"), List.of("Comedy")),
                                                SearchOperator.phrase(fieldPath("fullplot"), "new york"),
                                                SearchOperator.numberRange(fieldPath("year")).gtLt(1950, 2000),
                                                SearchOperator.wildcard(fieldPath("title"), "Love *")
                                        ))),
                Aggregates.project(
                        Projections.include("title", "year", "genres")
                ));

        Publisher<Document> publisher = collection.aggregate(pipeline);
        Flux.from(publisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end MongoDBSearchHelperMethods
    }

    private static void runMongoDBTextSearchMeta(MongoCollection<Document> collection) {
        Bson textSearchMeta =
                // begin mongoDBSearchMeta
                Aggregates.searchMeta(
                        SearchOperator.near(2010, 1, fieldPath("year")));
                // end mongoDBSearchMeta

        List<Bson> aggregateStages = List.of(textSearchMeta);
        Publisher<Document> publisher = collection.aggregate(aggregateStages);
        Flux.from(publisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
    }

    public static void main(String[] args) {
        String uri = CONNECTION_URI;

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Uncomment the methods that correspond to what you're testing
            // runMongoDBSearchWithSearchHelperMethods(collection);
            // runMongoDBTextSearchMeta(collection);
        }
    }
}
