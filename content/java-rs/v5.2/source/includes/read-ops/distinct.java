import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.Filters;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import reactor.core.publisher.Flux;

public class Distinct {
    public static void main(String[] args) {
        String uri = "<connection string URI>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings))
        {
            MongoDatabase database = mongoClient.getDatabase("sample_restaurants");
            MongoCollection<Document> collection = database.getCollection("restaurants");

            // start-distinct
            DistinctPublisher<String> distinctPublisher = collection
                    .distinct("borough", String.class);

            Flux.from(distinctPublisher)
                    .doOnNext(System.out::println)
                    .blockLast();
            // end-distinct

            // start-distinct-query
            Bson filter = Filters.eq("cuisine", "Italian");

            DistinctPublisher<String> distinctPublisher = collection
                    .distinct("borough", String.class)
                    .filter(filter);

            Flux.from(distinctPublisher)
                    .doOnNext(System.out::println)
                    .blockLast();
            // end-distinct-query

            // start-distinct-comment
            Bson filter = Filters.and(
                    Filters.eq("borough", "Bronx"),
                    Filters.eq("cuisine", "Pizza")
            );

            DistinctPublisher<String> distinctPublisher = collection
                    .distinct("name", String.class)
                    .filter(filter)
                    .comment("Bronx pizza restaurants");

            Flux.from(distinctPublisher)
                    .doOnNext(System.out::println)
                    .blockLast();
            // end-distinct-comment
        }
    }
}