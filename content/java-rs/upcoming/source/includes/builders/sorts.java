import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.FindPublisher;
import org.bson.Document;
import org.bson.conversions.Bson;
import reactor.core.publisher.Flux;

// begin-static-import
import static com.mongodb.client.model.Sorts.*;
// end-static-import

public class Sorts {

    public static void main(String[] args) {
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("builders");
            MongoCollection<Document> collection = database.getCollection("orders");

            ascendingSort(collection);
            descendingSort(collection);
            combinedSort(collection);
        }
    }

    private static void ascendingSort(MongoCollection<Document> collection) {
        // begin-ascending
        FindPublisher<Document> findPublisher = collection.find().sort(ascending("_id"));
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-ascending
    }

    private static void descendingSort(MongoCollection<Document> collection) {
        // begin-descending
        FindPublisher<Document> findPublisher = collection.find().sort(descending("_id"));
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-descending
    }

    private static void combinedSort(MongoCollection<Document> collection) {
        // begin-order-by
        Bson orderBySort = orderBy(descending("date"), ascending("orderTotal"));
        FindPublisher<Document> findPublisher = collection.find().sort(orderBySort);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-order-by
    }
}
