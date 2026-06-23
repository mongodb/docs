import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import reactor.core.publisher.Flux;

public class ConnectionPools {

    public static void main(String[] args) {

        System.out.println("MongoSettings:");
        createMongoSettings();
        System.out.println();

    }

    private static void createMongoSettings() {

        // begin ConnectionString
        ConnectionString connectionString = new ConnectionString("mongodb://<host>:<port>/?maxPoolSize=50");
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
        }
        // end ConnectionString

        //begin MongoSettings
        try (MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder().applyConnectionString(
                new ConnectionString("<your connection string>"))
            .applyToConnectionPoolSettings(builder ->
                builder.maxSize(50))
            .build())) {
        //end MongoSettings
            Flux.from(mongoClient.listDatabaseNames())
                .doOnNext(System.out::println)
                .blockLast();
        }
    }

}
