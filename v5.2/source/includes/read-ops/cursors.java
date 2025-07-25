import com.mongodb.ConnectionString;
import com.mongodb.CursorType;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.Filters;
import com.mongodb.reactivestreams.client.*;
import org.bson.Document;
import reactor.core.publisher.Flux;

import java.util.List;

public class Cursors {
    public static void main(String[] args) {
        String uri = "<connection string URI>";

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .build();

        try (MongoClient mongoClient = MongoClients.create(settings))
        {
            MongoDatabase database = mongoClient.getDatabase("sample_restaurants");
            MongoCollection<Document> collection = database.getCollection("restaurants");

            // start-cursor-iterate
            FindPublisher<Document> findPublisher = collection.find();
            Flux.from(findPublisher)
                    .doOnNext(x -> System.out.println(x.getString("name")))
                    .blockLast();
            // end-cursor-iterate

            // start-cursor-list
            FindPublisher<Document> findPublisher = collection.find(Filters.eq("name", "Dunkin' Donuts"));
            List<Document> resultsList = Flux.from(findPublisher).collectList().block();
            // end-cursor-list

            // start-tailable-cursor
            FindPublisher<Document> findPublisher = collection.find().cursorType(CursorType.TailableAwait);
            Flux.from(findPublisher)
                    .doOnNext(System.out::println)
                    .blockLast();
            // end-tailable-cursor
        }
    }
