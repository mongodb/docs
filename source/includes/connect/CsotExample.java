package org.example;

import static com.mongodb.client.model.Filters.gte;
import static java.util.concurrent.TimeUnit.MILLISECONDS;

import com.mongodb.*;
import com.mongodb.client.cursor.TimeoutMode;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import org.reactivestreams.Publisher;

public class CsotExample {

    public static void main(String[] args) {
        MongoClient mongoClient = new CsotExample().mongoClientSettings();
    }

    private MongoClient mongoClientSettings(){
        // start-mongoclientsettings
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string>"))
                .timeout(200L, MILLISECONDS)
                .build();

        MongoClient mongoClient = MongoClients.create(settings);
        // end-mongoclientsettings

        return mongoClient;
    }

    private MongoClient connectionString(){
        // start-string
        String uri = "<connection string>/?timeoutMS=200";
        MongoClient mongoClient = MongoClients.create(uri);
        // end-string

        return mongoClient;
    }

    private void operationTimeout(){
        // start-operation-timeout
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string>"))
                .timeout(200L, MILLISECONDS)
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("db");
            MongoCollection<Document> collection = database.getCollection("people");

            collection.insertOne(new Document("name", "Francine Loews"));
        }
        // end-operation-timeout
    }

    private void overrideTimeout(){
        // start-override
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string>"))
                .timeout(200L, MILLISECONDS)
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("db");
            MongoCollection<Document> collection = database
                    .getCollection("people")
                    .withTimeout(300L, MILLISECONDS);

            // ... perform operations on MongoCollection
        }
        // end-override
    }

    private void transactionTimeout(){
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string>"))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoCollection<Document> collection = mongoClient
                    .getDatabase("db")
                    .getCollection("people");

            // start-session-timeout
            ClientSessionOptions opts = ClientSessionOptions.builder()
                    .defaultTimeout(200L, MILLISECONDS)
                    .build();

            Publisher<ClientSession> session = mongoClient.startSession(opts);
            // ... perform operations on ClientSession
            // end-session-timeout

            // start-transaction-timeout
            TransactionOptions transactionOptions = TransactionOptions.builder()
                    .timeout(200L, MILLISECONDS)
                    .build();
            // end-transaction-timeout
        }

    }

    private void cursorTimeout(){
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string>"))
                .timeout(200L, MILLISECONDS)
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoCollection<Document> collection = mongoClient
                    .getDatabase("db")
                    .getCollection("people");

            // start-cursor-lifetime
            FindPublisher<Document> findPublisherWithLifetimeTimeout = collection
                    .find(gte("age", 40))
                    .timeoutMode(TimeoutMode.CURSOR_LIFETIME);
            // end-cursor-lifetime
        }

    }
}
