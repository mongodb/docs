package com.mycompany.app;


import java.util.HashMap;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ReadPreference;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.event.*;
import org.bson.Document;

import java.util.Map;
import java.util.concurrent.TimeUnit;

public class Monitoring {

    private static final String COLLECTION = "compound-ops";
    private static final String DATABASE = "test";
    private static final ConnectionString URI = new ConnectionString(System.getenv("DRIVER_URL"));

    public static void main(String[] args) throws InterruptedException {
        Monitoring examples = new Monitoring();
        System.out.println("\n---Command Event---\n");
        examples.monitorCommandEvent();
        System.out.println("\n---Cluster Event---\n");
        examples.monitorClusterEvent();
        System.out.println("\n---Connection Pool Event---\n");
        examples.monitorConnectionPoolEvent();
    }

    private void monitorCommandEvent() {
        // start monitor-command-example
        MongoClientSettings settings =
                MongoClientSettings.builder()
                        .applyConnectionString(URI)
                        .addCommandListener(new CommandCounter())
                        .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase(DATABASE);
        MongoCollection<Document> collection = database.getCollection(COLLECTION);
        // Runs sample find() commands to test the timer
        collection.find().first();
        collection.find().first();
        mongoClient.close();
        // end monitor-command-example
    }

    private void monitorClusterEvent() {
        // start monitor-cluster-example
        IsWriteable clusterListener = new IsWriteable();
        MongoClientSettings settings =
                MongoClientSettings.builder()
                        .applyConnectionString(URI)
                        .applyToClusterSettings(builder ->
                                builder.addClusterListener(clusterListener))
                        .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase(DATABASE);
        MongoCollection<Document> collection = database.getCollection(COLLECTION);
        // Runs a sample find() command to trigger a ClusterDescriptionChangedEvent event
        collection.find().first();
        // end monitor-cluster-example
        mongoClient.close();
    }

    private void monitorConnectionPoolEvent() {
        // start monitor-cp-example
        ConnectionPoolLibrarian cpListener = new ConnectionPoolLibrarian();
        MongoClientSettings settings =
                MongoClientSettings.builder()
                        .applyConnectionString(URI)
                        .applyToConnectionPoolSettings(builder ->
                                builder.addConnectionPoolListener(cpListener))
                        .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase(DATABASE);
        MongoCollection<Document> collection = database.getCollection(COLLECTION);
        // Runs a sample find() command to trigger connection pool events
        collection.find().first();
        // end monitor-cp-example
        /* We do not close this connection in order to prevent the driver from requesting two connections, giving
        the example unintuitive output. Uncomment the following line of code and see how it effects this example*/
        //mongoClient.close();
    }

}

// start command-listener-impl
class CommandCounter implements CommandListener {

    private Map<String, Integer> commands = new HashMap<String, Integer>();

    @Override
    public synchronized void commandSucceeded(final CommandSucceededEvent event) {
        String commandName = event.getCommandName();
        int count = commands.containsKey(commandName) ? commands.get(commandName) : 0;
        commands.put(commandName, count + 1);
        System.out.println(commands.toString());
    }

    @Override
    public void commandFailed(final CommandFailedEvent event) {
        System.out.println(String.format("Failed execution of command '%s' with id %s",
                event.getCommandName(),
                event.getRequestId()));
    }
}
// end command-listener-impl

// start cluster-listener-impl
class IsWriteable implements ClusterListener {

    private boolean isWritable;

    @Override
    public synchronized void clusterDescriptionChanged(final ClusterDescriptionChangedEvent event) {
        if (!isWritable) {
            if (event.getNewDescription().hasWritableServer()) {
                isWritable = true;
                System.out.println("Able to write to server");
            }
        } else {
            if (!event.getNewDescription().hasWritableServer()) {
                isWritable = false;
                System.out.println("Unable to write to server");
            }
        }
    }
}
// end cluster-listener-impl

// start cp-listener-impl
class ConnectionPoolLibrarian implements ConnectionPoolListener {

    @Override
    public void connectionCheckedOut(final ConnectionCheckedOutEvent event) {
        System.out.println(String.format("Let me get you the connection with id %s...",
                event.getConnectionId().getLocalValue()));
    }

    @Override
    public void connectionCheckOutFailed(final ConnectionCheckOutFailedEvent event) {
        System.out.println("Something went wrong! Failed to checkout connection.");
    }

}
// end cp-listener-impl
