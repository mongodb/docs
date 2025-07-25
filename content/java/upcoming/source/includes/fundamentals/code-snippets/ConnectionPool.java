import static java.util.concurrent.TimeUnit.*;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.connection.ClusterConnectionMode;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

public class ConnectionPool {

    public static void main(String[] args) {

        System.out.println("MongoSettings:");
        createMongoSettings();
        System.out.println();

    }

       private static void createMongoSettings() {
        try {
            //begin MongoSettings
            MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyConnectionString(
                    new ConnectionString("<your connection string>"))
                .applyToConnectionPoolSettings(builder ->
                    builder.maxSize(50))
                .build());
            //end MongoSettings
            mongoClient.listDatabaseNames().forEach(n -> System.out.println(n));
            mongoClient.close();
        } finally {
            System.out.print("---------------------------------------");
        }
    }

}
