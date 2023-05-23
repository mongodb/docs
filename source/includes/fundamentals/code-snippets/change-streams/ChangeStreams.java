package org.example;

import com.mongodb.client.ChangeStreamIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.*;
import com.mongodb.client.model.changestream.FullDocumentBeforeChange;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.List;

import com.mongodb.client.model.changestream.FullDocument;

public class ChangeStreams {

    public static void main(String [] args){
        MongoClient mongoClient = MongoClients.create("<connection uri>");
        MongoDatabase database = mongoClient.getDatabase("myDb");

        // Prevent errors from the following createCollection snippet
        MongoCollection createCollectionColl = database.getCollection("myChangeStreamCollection");
        createCollectionColl.drop();
        // begin createCollection
        CreateCollectionOptions collectionOptions = new CreateCollectionOptions();
        collectionOptions.changeStreamPreAndPostImagesOptions(new ChangeStreamPreAndPostImagesOptions(true));

        database.createCollection("myChangeStreamCollection", collectionOptions);
        // end createCollection

        MongoCollection<Document> collection = database.getCollection("myChangeStreamCollection");

        // Uncomment one of the following methods before running to test it
//        ChangeStreams.openExample(collection);
//        ChangeStreams.fullDocumentExample(collection);
//        ChangeStreams.fullDocumentBeforeChangeExample(collection);
//        ChangeStreams.allFullDocumentBeforeChangeOptions(collection);
//        ChangeStreams.allFullDocumentOptions(collection);
//        ChangeStreams.aggregationExample(collection);
    }
    private static void openExample(MongoDatabase database) {
        // begin openChangeStreamExample
        MongoCollection<Document> collection = database.getCollection("myColl");

        ChangeStreamIterable<Document> changeStream = collection.watch();
        changeStream.forEach(event ->
                System.out.println("Received a change: " + event));
        // end openChangeStreamExample
    }

    // use configuration to specify inclusion of pre-images
    private static void fullDocumentBeforeChangeExample(MongoCollection<Document> collection) {
        // begin fullDocumentBeforeChangeExample
        ChangeStreamIterable<Document> changeStream = collection.watch()
                .fullDocumentBeforeChange(FullDocumentBeforeChange.REQUIRED);

        changeStream.forEach(event ->
                System.out.println("Received a change: " + event));
        // end fullDocumentBeforeChangeExample
    }

    // use configuration to specify inclusion of post-images
    private static void fullDocumentExample(MongoCollection<Document> collection) {
        // begin fullDocumentExample
        ChangeStreamIterable<Document> changeStream = collection.watch()
                .fullDocument(FullDocument.UPDATE_LOOKUP);

        changeStream.forEach(event ->
                System.out.println("Received a change: " + event));
        // end fullDocumentExample
    }
    // test method to compare output of change streams configured with different settings
    private static void allFullDocumentOptions(MongoCollection<Document> collection) {
        Thread t1 = new ConfiguredChangeStream(collection, FullDocument.DEFAULT, null);
        Thread t2 = new ConfiguredChangeStream(collection, FullDocument.WHEN_AVAILABLE, null);
        Thread t3 = new ConfiguredChangeStream(collection, FullDocument.UPDATE_LOOKUP, null);
        Thread t4 = new ConfiguredChangeStream(collection, FullDocument.REQUIRED, null);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }

    // test method to compare output of change streams configured with different settings
    private static void allFullDocumentBeforeChangeOptions(MongoCollection<Document> collection) {
        Thread t1 = new ConfiguredChangeStream(collection, null, FullDocumentBeforeChange.OFF);
        Thread t2 = new ConfiguredChangeStream(collection, null, FullDocumentBeforeChange.DEFAULT);
        Thread t3 = new ConfiguredChangeStream(collection, null, FullDocumentBeforeChange.WHEN_AVAILABLE);
        Thread t4 = new ConfiguredChangeStream(collection, null, FullDocumentBeforeChange.REQUIRED);

        t1.start();
        t2.start();
        t3.start();
        t4.start();
    }

    private static void aggregationExample(MongoCollection<Document> collection){
        // begin aggregationExample
        List<Bson> pipeline = Arrays.asList(
                Aggregates.match(Filters.in("operationType", Arrays.asList("insert", "update"))));

        // collection references a MongoCollection instance
        ChangeStreamIterable<Document> changeStream = collection.watch(pipeline);

        changeStream.forEach(event ->
                System.out.println("Received a change to the collection: " + event));
        // end aggregationExample
    }
}
