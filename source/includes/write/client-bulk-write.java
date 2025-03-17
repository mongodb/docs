package org.example;

import com.mongodb.*;
import com.mongodb.client.model.*;
import com.mongodb.client.model.bulk.*;
import org.bson.Document;

import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

import java.util.*;

public class QuickStart {
    public static void main(String[] args) {
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .build();

        // Create a new client and connect to the server
        try (MongoClient mongoClient = MongoClients.create(settings)) {

            // start-insert-models
            ClientNamespacedInsertOneModel personToInsert = ClientNamespacedWriteModel
                    .insertOne(
                            new MongoNamespace("db", "people"),
                            new Document("name", "Julia Smith")
            );

            ClientNamespacedInsertOneModel thingToInsert = ClientNamespacedWriteModel
                    .insertOne(
                            new MongoNamespace("db", "things"),
                            new Document("object", "washing machine")
            );
            // end-insert-models

            // start-update-models
            ClientNamespacedUpdateOneModel personUpdate = ClientNamespacedWriteModel
                    .updateOne(
                            new MongoNamespace("db", "people"),
                            Filters.eq("name", "Freya Polk"),
                            Updates.inc("age", 1)
                    );

            ClientNamespacedUpdateManyModel thingUpdate = ClientNamespacedWriteModel
                    .updateMany(
                            new MongoNamespace("db", "things"),
                            Filters.eq("category", "electronic"),
                            Updates.set("manufacturer", "Premium Technologies")
                    );
            // end-update-models

            // start-replace-models
            ClientNamespacedReplaceOneModel personReplacement = ClientNamespacedWriteModel
                    .replaceOne(
                            new MongoNamespace("db", "people"),
                            Filters.eq("_id", 1),
                            new Document("name", "Frederic Hilbert")
                    );

            ClientNamespacedReplaceOneModel thingReplacement = ClientNamespacedWriteModel
                    .replaceOne(
                            new MongoNamespace("db", "things"),
                            Filters.eq("_id", 1),
                            new Document("object", "potato")
                    );
            // end-replace-models

            // start-perform
            MongoNamespace peopleNamespace = new MongoNamespace("db", "people");
            MongoNamespace thingsNamespace = new MongoNamespace("db", "things");

            List<ClientNamespacedWriteModel> bulkOperations = Arrays.asList(
                    ClientNamespacedWriteModel
                            .insertOne(
                                    peopleNamespace,
                                    new Document("name", "Corey Kopper")
                            ),
                    ClientNamespacedWriteModel
                            .replaceOne(
                                    thingsNamespace,
                                    Filters.eq("_id", 1),
                                    new Document("object", "potato")
                            )
            );
            
            Publisher<ClientBulkWriteResult> bulkWritePublisher = mongoClient
                    .bulkWrite(bulkOperations);

            ClientBulkWriteResult clientBulkResult = Mono
                    .from(bulkWritePublisher)
                    .block();
            
            System.out.println(clientBulkResult.toString());
            // end-perform

            // start-options
            MongoNamespace namespace = new MongoNamespace("db", "people");

            ClientBulkWriteOptions options = ClientBulkWriteOptions
                    .clientBulkWriteOptions()
                    .ordered(false);

            List<ClientNamespacedWriteModel> bulkOperations = Arrays.asList(
                    ClientNamespacedWriteModel.insertOne(
                            namespace,
                            new Document("_id", 1).append("name", "Rudra Suraj")
                    ),
                    // Causes a duplicate key error
                    ClientNamespacedWriteModel.insertOne(
                            namespace,
                            new Document("_id", 1).append("name", "Mario Bianchi")
                    ),
                    ClientNamespacedWriteModel.insertOne(
                            namespace,
                            new Document("name", "Wendy Zhang")
                    )
            );

            Publisher<ClientBulkWriteResult> bulkWritePublisher = mongoClient
                    .bulkWrite(bulkOperations, options);
            // end-options
        }
    }
}
