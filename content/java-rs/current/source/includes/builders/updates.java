import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;
import java.util.Arrays;

// begin-static-import
import static com.mongodb.client.model.Updates.*;
import static com.mongodb.client.model.Filters.*;
// end-static-import

public class Updates {

    public static void main(String[] args) {
        String uri = "<connection string>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("builders");
            MongoCollection<Document> collection = database.getCollection("updates");

            setUpdate(collection);
            combineSet(collection);
            unsetUpdate(collection);
            setOnInsertUpdate(collection);
            incUpdate(collection);
            mulUpdate(collection);
            renameUpdate(collection);
            minUpdate(collection);
            maxUpdate(collection);
            currentDateUpdate(collection);
            currentTimestampUpdate(collection);
            bitwiseOrUpdate(collection);
            addToSetUpdate(collection);
            popFirstUpdate(collection);
            pullAllUpdate(collection);
            pullUpdate(collection);
            pushUpdate(collection);
            combineUpdate(collection);
        }
    }

    private static void setUpdate(MongoCollection<Document> collection) {
        // begin-set-update
        Bson filter = eq("_id", 1);
        Bson update = set("qty", 11);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-set-update
    }

    private static void combineSet(MongoCollection<Document> collection) {
        // begin-combine-set
        Bson filter = eq("_id", 1);
        Bson update = combine(set("width", 6.5), set("height", 10));
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-combine-set
    }

    private static void unsetUpdate(MongoCollection<Document> collection) {
        // begin-unset-update
        Bson filter = eq("_id", 1);
        Bson update = unset("qty");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-unset-update
    }

    private static void setOnInsertUpdate(MongoCollection<Document> collection) {
        // begin-set-on-insert-update
        Bson filter = eq("_id", 1);
        Bson update = setOnInsert("qty", 7);
        Publisher<UpdateResult> result = collection.updateOne(filter, update, new UpdateOptions().upsert(true));
        Mono.from(result).block();
        // end-set-on-insert-update
    }

    private static void incUpdate(MongoCollection<Document> collection) {
        // begin-inc-update
        Bson filter = eq("_id", 1);
        Bson update = inc("qty", 3);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-inc-update
    }

    private static void mulUpdate(MongoCollection<Document> collection) {
        // begin-mul-update
        Bson filter = eq("_id", 1);
        Bson update = mul("qty", 2);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-mul-update
    }

    private static void renameUpdate(MongoCollection<Document> collection) {
        // begin-rename-update
        Bson filter = eq("_id", 1);
        Bson update = rename("qty", "quantity");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-rename-update
    }

    private static void minUpdate(MongoCollection<Document> collection) {
        // begin-min-update
        Bson filter = eq("_id", 1);
        Bson update = min("qty", 2);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-min-update
    }

    private static void maxUpdate(MongoCollection<Document> collection) {
        // begin-max-update
        Bson filter = eq("_id", 1);
        Bson update = max("qty", 8);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-max-update
    }

    private static void currentDateUpdate(MongoCollection<Document> collection) {
        // begin-current-date-update
        Bson filter = eq("_id", 1);
        Bson update = currentDate("lastModified");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-current-date-update
    }

    private static void currentTimestampUpdate(MongoCollection<Document> collection) {
        // begin-current-timestamp-update
        Bson filter = eq("_id", 1);
        Bson update = currentTimestamp("lastModified");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-current-timestamp-update
    }

    private static void bitwiseOrUpdate(MongoCollection<Document> collection) {
        // begin-bitwise-or-update
        Bson filter = eq("_id", 1);
        Bson update = bitwiseOr("qty", 10);
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-bitwise-or-update
    }

    private static void addToSetUpdate(MongoCollection<Document> collection) {
        // begin-add-to-set-update
        Bson filter = eq("_id", 1);
        Bson update = addToSet("vendor", "C");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-add-to-set-update
    }

    private static void popFirstUpdate(MongoCollection<Document> collection) {
        // begin-pop-first-update
        Bson filter = eq("_id", 1);
        Bson update = popFirst("vendor");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-pop-first-update
    }

    private static void pullAllUpdate(MongoCollection<Document> collection) {
        // begin-pull-all-update
        Bson filter = eq("_id", 1);
        Bson update = pullAll("vendor", Arrays.asList("A", "M"));
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-pull-all-update
    }

    private static void pullUpdate(MongoCollection<Document> collection) {
        // begin-pull-update
        Bson filter = eq("_id", 1);
        Bson update = pull("vendor", "D");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-pull-update
    }

    private static void pushUpdate(MongoCollection<Document> collection) {
        // begin-push-update
        Bson filter = eq("_id", 1);
        Bson update = push("vendor", "C");
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-push-update
    }

    private static void combineUpdate(MongoCollection<Document> collection) {
        // begin-combine-update
        Bson filter = eq("_id", 1);
        Bson update = combine(set("color", "purple"), inc("qty", 6), push("vendor", "R"));
        Publisher<UpdateResult> result = collection.updateOne(filter, update);
        Mono.from(result).block();
        // end-combine-update
    }
}
