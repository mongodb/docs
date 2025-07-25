import com.mongodb.*;
import com.mongodb.reactivestreams.client.MongoCollection;
import org.bson.Document;

import reactor.core.publisher.Mono;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;

import static com.mongodb.client.model.Filters.eq;

public class QueryDatabase {
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
        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> movies = database.getCollection("movies");
            Mono.from(movies.find(eq("title", "Back to the Future")))                   
                    .doOnSuccess(i -> System.out.println(i))                            
                    .doOnError(err -> System.out.println("Error: " + err.getMessage())) 
                    .block();                                                           
        }
    }
}
