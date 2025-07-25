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
        
        // Creates a MongoClient instance that enables connection pool event monitoring with the JMX tool
        MongoClient mongoClient = MongoClients.create(settings);
        
        try {
            System.out.println("Navigate to JConsole to see your connection pools...");

            // Pauses the code execution so you can navigate to JConsole and inspect your connection pools
            Thread.sleep(Long.MAX_VALUE);

        // Prints exception details if any exceptions occur during the code execution
        } catch (Exception e) {
            e.printStackTrace();
        }
        // end jmx-example
    }
}
