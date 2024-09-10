package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.management.JMXConnectionPoolListener;
import com.mongodb.reactivestreams.client.*;

public class JMXMonitoring {

    private static final ConnectionString URI = new ConnectionString("<connection string URI>");

    public static void main(String[] args) throws InterruptedException {
        // start-jmx-example
        JMXConnectionPoolListener connectionPoolListener = new JMXConnectionPoolListener();

        try (MongoClient mongoClient = MongoClients.create(URI)) {
            System.out.println("Navigate to JConsole to see your connection pools...");

            // Pauses the code execution so you can navigate to JConsole and inspect your connection pools
            Thread.sleep(Long.MAX_VALUE);
        }
        // end-jmx-example
    }
}

