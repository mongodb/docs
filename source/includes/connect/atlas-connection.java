import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;

import org.bson.BsonDocument;
import org.bson.BsonInt64;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.bson.conversions.Bson;
import reactor.core.publisher.Mono;

public class testing {
    public static void main(String[] args) {
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string>";

        // Construct a ServerApi instance using the ServerApi.builder() method
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .serverApi(serverApi)
                .build();

        // Create a new client and connect to the server
        try (MongoClient mongoClient = MongoClients.create(settings))
        {
            MongoDatabase database = mongoClient.getDatabase("<database name>");
            Bson command = new BsonDocument("ping", new BsonInt64(1));
            Mono.from(database.runCommand(command))
                    .doOnSuccess(x -> System.out.println("Pinged your deployment. You successfully connected to MongoDB!"))
                    .doOnError(err -> System.out.println("Error: " + err.getMessage()))
                    .block();
        }
    }
}