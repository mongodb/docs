import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;
import com.mongodb.reactivestreams.client.MongoCollection;
import reactor.core.publisher.Flux;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;

// begin-user-class
record User(
    @BsonId ObjectId id,
    String gender,
    int age,
    String email
)
// end-user-class
{}

class Builders {

    static void withoutBuilders(MongoCollection<Document> collection) {
        // begin-without-builders
        Bson filter = new Document().append("gender", "female").append("age", new Document().append("$gt", 29));
        Bson projection = new Document().append("_id", 0).append("email", 1);
        Flux.from(collection.find(filter).projection(projection))
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-without-builders
    }

    static void withBuilders(MongoCollection<Document> collection) {
       // begin-with-builders
        Bson filter = and(eq("gender", "female"), gt("age", 29));
        Bson projection = fields(excludeId(), include("email"));
        Flux.from(collection.find(filter).projection(projection))
                .doOnNext(doc -> System.out.println(doc.toJson()))
                .blockLast();
        // end-with-builders
    }
}