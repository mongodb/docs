package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;

import com.mongodb.reactivestreams.client.*;

public class Main {
    public static void main(String[] args) {
        // start-enable-stable-api
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();

        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string URI>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .serverApi(serverApi)
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            // Perform client operations here
        }
        // end-enable-stable-api

        // start-stable-api-options
        ServerApi serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .strict(true)
            .deprecationErrors(true)
            .build();
        // end-stable-api-options
    }
}