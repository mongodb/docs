package org.example;

import com.mongodb.MongoClientSettings;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// start class
public class BookCodecExample {

    public static void main(String[] args) {

        String uri = "<MongoDB connection URI>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                    CodecRegistries.fromCodecs(new ReadStatusCodec()),
                    CodecRegistries.fromProviders(new BookCodecProvider()),
                    MongoClientSettings.getDefaultCodecRegistry());

            MongoDatabase database = mongoClient.getDatabase("codecs_example_db");
            MongoCollection<Book> collection = database.getCollection("books", Book.class)
                    .withCodecRegistry(codecRegistry);

            // construct and insert an instance of Book
            Book myBook = new Book();
            myBook.setTitle("The Hobbit");
            myBook.setReadStatus(ReadStatus.READ);
            myBook.setPageCount(310);
            Mono.from(collection.insertOne(myBook)).block();

            // retrieve one or more instances of Book
            Flux.from(collection.find())
                    .doOnNext(System.out::println)
                    .blockLast();
        }
    }
}
// end class

