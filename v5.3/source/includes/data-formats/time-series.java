package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.TimeSeriesOptions;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string URI>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .build();

        // Create a new client and connect to the server
        try (MongoClient mongoClient = MongoClients.create(settings)) {
            // start-create-time-series
            MongoDatabase database = mongoClient.getDatabase("fall_weather");

            TimeSeriesOptions tsOptions = new TimeSeriesOptions("timestamp");
            CreateCollectionOptions collectionOptions = new CreateCollectionOptions().timeSeriesOptions(tsOptions);

            database.createCollection("october2024", collectionOptions);
            // end-create-time-series

            // start-print-time-series
            ListCollectionsPublisher<Document> listCollectionsPublisher = database.listCollections();

            Flux.from(listCollectionsPublisher)
                    .doOnNext(System.out::println)
                    .blockLast();
            // end-print-time-series

            // start-insert-time-series-data
            MongoCollection<Document> collection = database.getCollection("october2024");

            // Temperature data for October 1, 2024
            Document temperature1 = new Document("temperature", 54)
                    .append("location", "New York City")
                    .append("timestamp", new Date(1727755200000L));

            // Temperature data for October 2, 2024
            Document temperature2 = new Document("temperature", 55)
                    .append("location", "New York City")
                    .append("timestamp", new Date(1727841600000L));

            Publisher<InsertManyResult> insertPublisher =
                    collection.insertMany(Arrays.asList(temperature1, temperature2));
            Mono.from(insertPublisher).block();
            // end-insert-time-series-data
        }
    }
}