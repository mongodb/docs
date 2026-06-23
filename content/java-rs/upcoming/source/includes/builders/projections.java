import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.reactivestreams.client.FindPublisher;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.json.JsonWriterSettings;
import reactor.core.publisher.Flux;

// begin-static-import
import static com.mongodb.client.model.Projections.*;
// end-static-import

public class Projections {

    public static void main(String[] args) {
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("builders");
            MongoCollection<Document> collection = database.getCollection("projection_builders");

            includeOneField(collection);
            includeMultipleFields(collection);
            excludeOneField(collection);
            excludeMultipleFields(collection);
            showFields(collection);
            excludeId(collection);
            elemMatchNoFilter(collection);
            elemMatchWithFilter(collection);
            sliceNoSkip(collection);
            sliceWithSkip(collection);
            metaTextScore(collection);
        }
    }

    private static void includeOneField(MongoCollection<Document> collection) {
        // begin-include-single-field
        Bson filter = Filters.empty();
        Bson projection = include("year");
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-include-single-field
    }

    private static void includeMultipleFields(MongoCollection<Document> collection) {
        // begin-include-multiple-fields
        Bson filter = Filters.empty();
        Bson projection = include("year", "type");
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-include-multiple-fields
    }

    private static void excludeOneField(MongoCollection<Document> collection) {
        // begin-exclude-one-field
        Bson filter = Filters.empty();
        Bson projection = exclude("temperatures");
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-exclude-one-field
    }

    private static void excludeMultipleFields(MongoCollection<Document> collection) {
        // begin-exclude-multiple-fields
        Bson filter = Filters.empty();
        Bson projection = exclude("temperatures", "type");
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-exclude-multiple-fields
    }

    private static void showFields(MongoCollection<Document> collection) {
        // begin-show-fields
        Bson filter = Filters.empty();
        Bson projection = fields(include("year", "type"), exclude("_id"));
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-show-fields
    }

    private static void excludeId(MongoCollection<Document> collection) {
        // begin-exclude-id
        Bson filter = Filters.empty();
        Bson projection = fields(include("year", "type"), excludeId());
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-exclude-id
    }

    private static void elemMatchNoFilter(MongoCollection<Document> collection) {
        // begin-elem-match-no-filter
        Bson filter = Filters.empty();
        Bson projection = fields(include("year"), elemMatch("temperatures", Filters.gt("avg", 10.1)));
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-elem-match-no-filter
    }

    private static void elemMatchWithFilter(MongoCollection<Document> collection) {
        // begin-elem-match-with-filter
        Bson filter = Filters.gt("temperatures.avg", 10.1);
        Bson projection = fields(include("year"), elemMatch("temperatures"));
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-elem-match-with-filter
    }

    private static void sliceNoSkip(MongoCollection<Document> collection) {
        // begin-slice-no-skip
        Bson filter = Filters.empty();
        Bson projection = slice("temperatures", 6);
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson(JsonWriterSettings.builder().indent(true).build())))
                .blockLast();
        // end-slice-no-skip
    }

    private static void sliceWithSkip(MongoCollection<Document> collection) {
        // begin-slice-with-skip
        Bson filter = Filters.empty();
        Bson projection = slice("temperatures", 6, 6);
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson(JsonWriterSettings.builder().indent(true).build())))
                .blockLast();
        // end-slice-with-skip
    }

    private static void metaTextScore(MongoCollection<Document> collection) {
        // begin-meta-text-score
        Bson filter = Filters.text("even number");
        Bson projection = fields(include("year"), metaTextScore("score"));
        FindPublisher<Document> findPublisher = collection.find(filter).projection(projection);
        Flux.from(findPublisher)
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-meta-text-score
    }
}
