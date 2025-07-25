package docs;

import static java.util.concurrent.TimeUnit.*;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.connection.ClusterConnectionMode;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

public class MCSettings {

    public static void main(String[] args) {

        System.out.println("ConnectionString:");
        createViaConnectionString();
        System.out.println();

        System.out.println("ClusterSettings:");
        createClusterSettings();
        System.out.println();

        System.out.println("ServerSettings:");
        createServerSettings();
        System.out.println();

        System.out.println("ConnectionPoolSettings:");
        createConnectionPoolSettings();
        System.out.println();

        System.out.println("SocketSettings:");
        createSocketSettings();
        System.out.println();

        System.out.println("SslSettings:");
        createSslSettings();
        System.out.println();
    }

    private static void createViaConnectionString() {
        try {
            //begin ConnectionString
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<your connection string>"))
                .build());
            //end ConnectionString
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.println("---------------------------------------");
        }
    }

    private static void createClusterSettings() {
        try {
            //begin ClusterSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyToClusterSettings(builder ->
                    builder.mode(ClusterConnectionMode.SINGLE))
                .build());
            //end ClusterSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.println("---------------------------------------");
        }
    }

    private static void createServerSettings() {
        try {
            //begin ServerSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyConnectionString(new ConnectionString("<your connection string>"))
                .applyToServerSettings(builder ->
                    builder.minHeartbeatFrequency(700, MILLISECONDS)
                    .heartbeatFrequency(15, SECONDS))
                .build());
            //end ServerSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

    private static void createSocketSettings() {
        try {
            //begin SocketSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<your connection string>"))
                .applyToSocketSettings(builder ->
                    builder.connectTimeout(10, SECONDS)
                    .readTimeout(15, SECONDS))
                .build());
            //end SocketSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

    private static void createConnectionPoolSettings() {
        try {
            //begin ConnectionPoolSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyConnectionString(new ConnectionString("<your connection string>"))
                .applyToConnectionPoolSettings(builder ->
                    builder.maxWaitTime(10, SECONDS)
                    .maxSize(200))
                .build());
            //end ConnectionPoolSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

    private static void createSslSettings() {
        try {
            ////begin SslSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyConnectionString(new ConnectionString("<your connection string>"))
                .applyToSslSettings(builder ->
                    builder.enabled(true))
                .build());
            //end SslSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

    private static void createLoggerSettings() {
        try {
            ////begin LoggerSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyConnectionString(new ConnectionString("<your connection string>"))
                .applicationName("<application name>")
                .applyToLoggerSettings(builder ->
                     builder.maxDocumentLength(5_000))
                .build());
            //end LoggerSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

    private static void createReadConcern() {
        try {
            ////begin ReadConcern
            MongoClient mongoClient = MongoClients.create(
                    MongoClientSettings.builder().applyConnectionString(new ConnectionString("<your connection string>"))
                            .readPreference(ReadPreference.nearest())
                            .build());
            //end ReadConcern
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }
}