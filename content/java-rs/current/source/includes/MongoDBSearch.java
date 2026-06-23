// Runs a MongoDB Search query by using the Java Reactive Streams driver

package org.example;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.search.SearchOperator;
import com.mongodb.client.model.search.SearchPath;
import org.bson.Document;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import java.util.List;

public class MongoDBSearch {
    public static void main(String[] args) {
        String uri = "<connection string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Queries for documents that have a "title" value containing the word "Alabama"
            // start mongoDBSearch
            Publisher<Document> publisher = collection.aggregate(
                List.of(
                    Aggregates.search(SearchOperator.text(
                                  SearchPath.fieldPath("title"), "Alabama")),
                    Aggregates.project(Projections.include("title"))
                )
            );
            Flux.from(publisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
            // end mongoDBSearch
        }
    }
}
