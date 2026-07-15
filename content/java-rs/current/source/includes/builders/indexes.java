import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.MongoCollection;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;
import org.bson.Document;
import org.bson.conversions.Bson;

// begin-static-import
import static com.mongodb.client.model.Indexes.*;
// end-static-import

public class Indexes {

    public static void main(String[] args) {
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("builders");
            MongoCollection<Document> collection = database.getCollection("theatres");

            ascendingIndex(collection);
            descendingIndex(collection);
            compoundIndex(collection);
            textIndex(collection);
            hashedIndex(collection);
            geo2dsphereIndex(collection);
        }
    }

    private static void ascendingIndex(MongoCollection<Document> collection) {
        // begin-ascending-index
        Bson ascendingIndex = ascending("name");
        Publisher<String> result = collection.createIndex(ascendingIndex);
        Mono.from(result).block();
        // end-ascending-index
    }

    private static void descendingIndex(MongoCollection<Document> collection) {
        // begin-descending-index
        Bson descendingIndex = descending("capacity");
        Publisher<String> result = collection.createIndex(descendingIndex);
        Mono.from(result).block();
        // end-descending-index
    }

    private static void compoundIndex(MongoCollection<Document> collection) {
        // begin-compound-index
        Bson compoundIndex = compoundIndex(descending("capacity", "year"), ascending("name"));
        Publisher<String> result = collection.createIndex(compoundIndex);
        Mono.from(result).block();
        // end-compound-index
    }

    private static void textIndex(MongoCollection<Document> collection) {
        // begin-text-index
        Bson textIndex = text("theaters");
        Publisher<String> result = collection.createIndex(textIndex);
        Mono.from(result).block();
        // end-text-index
    }

    private static void hashedIndex(MongoCollection<Document> collection) {
        // begin-hashed-index
        Bson hashedIndex = hashed("capacity");
        Publisher<String> result = collection.createIndex(hashedIndex);
        Mono.from(result).block();
        // end-hashed-index
    }

    private static void geo2dsphereIndex(MongoCollection<Document> collection) {
        // begin-geo2dsphere-index
        Bson geo2dsphereIndex = geo2dsphere("location");
        Publisher<String> result = collection.createIndex(geo2dsphereIndex);
        Mono.from(result).block();
        // end-geo2dsphere-index
    }
}
