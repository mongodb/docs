package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

import com.mongodb.event.*;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import reactor.core.publisher.Flux;

import java.util.HashMap;
import java.util.Map;

public class Monitoring {

    private static final String COLLECTION = "test_collection";
    private static final String DATABASE = "test_db";
    private static final ConnectionString URI = new ConnectionString("<connection string URI>");

    public static void main(String[] args) {
        Monitoring examples = new Monitoring();
        System.out.println("\n---Command Event---\n");
        examples.monitorCommandEvent();
        System.out.println("\n---Cluster Event---\n");
        examples.monitorClusterEvent();
        System.out.println("\n---Connection Pool Event---\n");
        examples.monitorConnectionPoolEvent();
    }

    private void monitorCommandEvent() {
        // start-monitor-command-example
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(URI)
                .addCommandListener(new CommandCounter())
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase(DATABASE);
            MongoCollection<Document> collection = database.getCollection(COLLECTION);

            // Run some commands to test the counter
            FindPublisher<Document> findPublisher1 = collection.find();
            FindPublisher<Document> findPublisher2 = collection.find();
            Flux.from(findPublisher1).blockLast();
            Flux.from(findPublisher2).blockLast();
        }
        // end-monitor-command-example
    }

    private void monitorClusterEvent() {
        // start-monitor-cluster-example
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(URI)
                .applyToClusterSettings(builder ->
                        builder.addClusterListener(new IsWritable()))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase(DATABASE);
            MongoCollection<Document> collection = database.getCollection(COLLECTION);

            // Run a command to trigger a ClusterDescriptionChangedEvent
            FindPublisher<Document> findPublisher = collection.find();
            Flux.from(findPublisher).blockLast();
        }
        // end-monitor-cluster-example
    }

    private void monitorConnectionPoolEvent() {
        // start-monitor-connection-pool-example
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(URI)
                .applyToConnectionPoolSettings(builder ->
                        builder.addConnectionPoolListener(new ConnectionPoolLibrarian()))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase(DATABASE);
            MongoCollection<Document> collection = database.getCollection(COLLECTION);

            // Run a command to trigger connection pool events
            FindPublisher<Document> findPublisher = collection.find();
            Flux.from(findPublisher).blockLast();
        }
        // end-monitor-connection-pool-example
    }
}

// start-command-listener
class CommandCounter implements CommandListener {
    private final Map<String, Integer> commands = new HashMap<String, Integer>();

    @Override
    public synchronized void commandSucceeded(final CommandSucceededEvent event) {
        String commandName = event.getCommandName();
        int count = commands.getOrDefault(commandName, 0);
        commands.put(commandName, count + 1);
        System.out.println(commands);
    }

    @Override
    public void commandFailed(final CommandFailedEvent event) {
        System.out.printf("Failed execution of command '%s' with id %s%n",
                event.getCommandName(),
                event.getRequestId());
    }
}
// end-command-listener

// start-cluster-listener
class IsWritable implements ClusterListener {
    private boolean isWritable;

    @Override
    public synchronized void clusterDescriptionChanged(final ClusterDescriptionChangedEvent event) {
        if (!isWritable) {
            if (event.getNewDescription().hasWritableServer()) {
                isWritable = true;
                System.out.println("Able to write to server");
            }
        } else if (!event.getNewDescription().hasWritableServer()) {
            isWritable = false;
            System.out.println("Unable to write to server");
        }
    }
}
// end-cluster-listener

// start-connection-pool-listener
class ConnectionPoolLibrarian implements ConnectionPoolListener {
    @Override
    public void connectionCheckedOut(final ConnectionCheckedOutEvent event) {
        System.out.printf("Fetching the connection with id %s...%n",
                event.getConnectionId().getLocalValue());
    }

    @Override
    public void connectionCheckOutFailed(final ConnectionCheckOutFailedEvent event) {
        System.out.println("Something went wrong! Failed to checkout connection.");
    }
}
// end-connection-pool-listener