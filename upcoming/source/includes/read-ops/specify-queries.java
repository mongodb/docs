# start-sample-data
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.result.InsertManyResult;
import org.bson.Document;

import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.MongoCollection;

import java.util.Arrays;
import java.util.List;

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
            MongoDatabase database = mongoClient.getDatabase("sample_fruits");
            MongoCollection<Document> fruits = database.getCollection("fruits");

            Document document1 = new Document("_id", "1")
                    .append("name", "apples")
                    .append("qty", 5)
                    .append("rating", 3)
                    .append("color", "red")
                    .append("type", Arrays.asList("fuji", "honeycrisp"));
            Document document2 = new Document("_id", "2")
                    .append("name", "bananas")
                    .append("qty", 7)
                    .append("rating", 4)
                    .append("color", "yellow")
                    .append("type", Arrays.asList("cavendish"));
            Document document3 = new Document("_id", "3")
                    .append("name", "oranges")
                    .append("qty", 6)
                    .append("rating", 2)
                    .append("type", Arrays.asList("naval", "mandarin"));
            Document document4 = new Document("_id", "4")
                    .append("name", "pineapple")
                    .append("qty", 3)
                    .append("rating", 5)
                    .append("color", "yellow");

            List<Document> documents = Arrays.asList(document1, document2, document3, document4);

            Publisher<InsertManyResult> insertPublisher = fruits.insertMany(documents);
            Mono.from(insertPublisher).block();                                                        
        }
    }
}
# end-sample-data

# start-find-exact
FindPublisher<Document> findDocPublisher = fruits.find(eq("color", "yellow"));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-exact

# start-find-all
FindPublisher<Document> findDocPublisher = fruits.find();
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-all

# start-find-comparison
FindPublisher<Document> findDocPublisher = fruits.find(gt("rating", 2));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-comparison
    
# start-find-logical
FindPublisher<Document> findDocPublisher = fruits.find(
        or(gt("qty", 5), eq("color", "yellow")));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-logical

# start-find-array
FindPublisher<Document> findDocPublisher = fruits.find(size("type", 2));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-array

# start-find-element
FindPublisher<Document> findDocPublisher = fruits.find(exists("color", true));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-element

# start-find-evaluation
FindPublisher<Document> findDocPublisher = fruits.find(regex("name", "p{2,}"));
Document findResults = Flux.from(findDocPublisher)
         .doOnNext(System.out::println)
         .blockLast();
# end-find-evaluation