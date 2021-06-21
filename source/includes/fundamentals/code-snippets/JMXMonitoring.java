package com.mycompany.app;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.mongodb.management.JMXConnectionPoolListener;

public class JMXMonitoring {

    private static final ConnectionString URI = new ConnectionString(System.getenv("DRIVER_URL"));

    public static void main(String[] args) throws InterruptedException {
        // start jmx-example
        JMXConnectionPoolListener connectionPoolListener = new JMXConnectionPoolListener();
        MongoClientSettings settings =
                MongoClientSettings.builder()
                        .applyConnectionString(URI)
                        .applyToConnectionPoolSettings(builder -> builder.addConnectionPoolListener(connectionPoolListener))
                        .build();
        MongoClient mongoClient = MongoClients.create(settings);
        try {
            System.out.println("Navigate to JConsole to see your connection pools...");
            Thread.sleep(Long.MAX_VALUE);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // end jmx-example
    }
}
