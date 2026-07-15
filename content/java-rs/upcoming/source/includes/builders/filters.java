import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.FindPublisher;
import com.mongodb.client.model.geojson.Polygon;
import com.mongodb.client.model.geojson.Position;
import org.bson.Document;
import org.bson.conversions.Bson;
import reactor.core.publisher.Flux;
import java.util.Arrays;
import java.util.List;

// begin-static-import
import static com.mongodb.client.model.Filters.*;
// end-static-import

public class Filters {

    public static void main(String[] args) {
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("builders");

            MongoCollection<Document> paintCollection = database.getCollection("paint_purchases");
            equalComparison(paintCollection);
            gteComparison(paintCollection);
            emptyComparison(paintCollection);
            orComparison(paintCollection);
            allComparison(paintCollection);
            existsComparison(paintCollection);
            regexComparison(paintCollection);

            MongoCollection<Document> binaryCollection = database.getCollection("binary_numbers");
            bitsComparison(binaryCollection);

            MongoCollection<Document> geoCollection = database.getCollection("geo_points");
            geoWithinComparison(geoCollection);
        }
    }

    private static void equalComparison(MongoCollection<Document> collection) {
        // begin-equal-comparison
        Bson equalComparison = eq("qty", 5);
        FindPublisher<Document> findPublisher = collection.find(equalComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-equal-comparison
    }

    private static void gteComparison(MongoCollection<Document> collection) {
        // begin-gte-comparison
        Bson gteComparison = gte("qty", 10);
        FindPublisher<Document> findPublisher = collection.find(gteComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-gte-comparison
    }

    private static void emptyComparison(MongoCollection<Document> collection) {
        // begin-empty-comparison
        Bson emptyComparison = empty();
        FindPublisher<Document> findPublisher = collection.find(emptyComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-empty-comparison
    }

    private static void orComparison(MongoCollection<Document> collection) {
        // begin-or-comparison
        Bson orComparison = or(gt("qty", 8), eq("color", "pink"));
        FindPublisher<Document> findPublisher = collection.find(orComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-or-comparison
    }

    private static void allComparison(MongoCollection<Document> collection) {
        // begin-all-comparison
        List<String> search = Arrays.asList("A", "D");
        Bson allComparison = all("vendor", search);
        FindPublisher<Document> findPublisher = collection.find(allComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-all-comparison
    }

    private static void existsComparison(MongoCollection<Document> collection) {
        // begin-exists-comparison
        Bson existsComparison = and(exists("qty"), nin("qty", 5, 8));
        FindPublisher<Document> findPublisher = collection.find(existsComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-exists-comparison
    }

    private static void regexComparison(MongoCollection<Document> collection) {
        // begin-regex-comparison
        Bson regexComparison = regex("color", "^p");
        FindPublisher<Document> findPublisher = collection.find(regexComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-regex-comparison
    }

    private static void bitsComparison(MongoCollection<Document> collection) {
        // begin-bits-comparison
        Bson bitsComparison = bitsAllSet("a", 34);
        FindPublisher<Document> findPublisher = collection.find(bitsComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-bits-comparison
    }

    private static void geoWithinComparison(MongoCollection<Document> collection) {
        // begin-geo-within-comparison
        Polygon square = new Polygon(Arrays.asList(
                new Position(0, 0),
                new Position(4, 0),
                new Position(4, 4),
                new Position(0, 4),
                new Position(0, 0)));
        Bson geoWithinComparison = geoWithin("coordinates", square);
        FindPublisher<Document> findPublisher = collection.find(geoWithinComparison);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-geo-within-comparison
    }
}
