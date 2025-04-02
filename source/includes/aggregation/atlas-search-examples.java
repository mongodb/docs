package org.example;

import com.mongodb.*;
import com.mongodb.client.model.Projections;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;

import reactor.core.publisher.Mono;

import java.util.List;

import org.bson.conversions.Bson;

import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.search.SearchOperator;

import static com.mongodb.client.model.search.SearchPath.fieldPath;

import org.reactivestreams.Publisher;

public class SearchHelpers {
    public static void main(String[] args) {
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string>";

        // Create a new client and connect to the server
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> movies = database.getCollection("movies");

            // start atlasHelperMethods
            Bson searchStageFilters = Aggregates.search(
                    SearchOperator.compound()
                            .filter(
                                    List.of(
                                            SearchOperator.in(fieldPath("genres"), List.of("Comedy")),
                                            SearchOperator.phrase(fieldPath("fullplot"), "new york"),
                                            SearchOperator.numberRange(fieldPath("year")).gtLt(1950, 2000),
                                            SearchOperator.wildcard(fieldPath("title"), "Love *")
                                    )));

            Bson projection = Aggregates.project(Projections.fields(
                    Projections.include("title", "year", "genres")
            ));

            List<Bson> aggregateStages = List.of(searchStageFilters, projection);

            Publisher<Document> publisher = movies.aggregate(aggregateStages);
            publisher.subscribe(new SubscriberHelpers.PrintDocumentSubscriber());
            Mono.from(publisher).block();
            // end atlasHelperMethods
        }
    }
}
