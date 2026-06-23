package org.example;

import com.mongodb.MongoClientSettings;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.InsertManyResult;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.util.List;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;
import static java.util.Arrays.asList;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class Main {
    public static void main(String[] args) {

        // start-create-provider
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        // end-create-provider

        // start-create-registry
        CodecRegistry pojoCodecRegistry = fromRegistries(
                getDefaultCodecRegistry(),
                fromProviders(pojoCodecProvider)
        );
        // end-create-registry

        // start-client-registry
        MongoClientSettings settings = MongoClientSettings.builder()
                .codecRegistry(pojoCodecRegistry)
                .build();
        // end-client-registry

        try (MongoClient mongoClient = MongoClients.create(settings)) {

            // start-database-registry
            MongoDatabase database = mongoClient.getDatabase("mydb").withCodecRegistry(pojoCodecRegistry);
            // end-database-registry

            // start-collection-registry
            MongoCollection<org.bson.Document> rawCollection = database.getCollection("people").withCodecRegistry(pojoCodecRegistry);
            // end-collection-registry

            // start-typed-collection
            MongoCollection<Person> collection = database.getCollection("people", Person.class);
            // end-typed-collection

            // start-insert-one
            Person ada = new Person("Ada Byron", 20, new Address("St James Square", "London", "W1"));
            collection.insertOne(ada).subscribe(new OperationSubscriber<InsertOneResult>());
            // end-insert-one

            // start-insert-many
            List<Person> people = asList(
                    new Person("Charles Babbage", 45, new Address("5 Devonshire Street", "London", "W11")),
                    new Person("Alan Turing", 28, new Address("Bletchley Hall", "Bletchley Park", "MK12")),
                    new Person("Timothy Berners-Lee", 61, new Address("Colehill", "Wimborne", null))
            );
            collection.insertMany(people).subscribe(new OperationSubscriber<InsertManyResult>());
            // end-insert-many

            // start-find-one
            collection.find(eq("address.city", "Wimborne"))
                    .first()
                    .subscribe(new PrintToStringSubscriber<>());
            // end-find-one

            // start-find-multiple
            collection.find(gt("age", 30)).subscribe(new PrintToStringSubscriber<>());
            // end-find-multiple

            // start-update-one
            collection.updateOne(
                    eq("name", "Ada Byron"),
                    combine(set("age", 23), set("name", "Ada Lovelace"))
            ).subscribe(new OperationSubscriber<>());
            // end-update-one

            // start-update-many
            collection.updateMany(not(eq("zip", null)), set("zip", null))
                    .subscribe(new OperationSubscriber<>());
            // end-update-many

            // start-replace-one
            collection.replaceOne(eq("name", "Ada Lovelace"), ada)
                    .subscribe(new OperationSubscriber<>());
            // end-replace-one

            // start-delete-one
            collection.deleteOne(eq("address.city", "Wimborne"))
                    .subscribe(new OperationSubscriber<>());
            // end-delete-one

            // start-delete-many
            collection.deleteMany(eq("address.city", "London"))
                    .subscribe(new OperationSubscriber<>());
            // end-delete-many
        }
    }
}

