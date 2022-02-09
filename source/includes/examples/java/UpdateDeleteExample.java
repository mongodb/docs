import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.lt;
import static com.mongodb.client.model.Updates.*;

public class UpdateDeleteExample {
    public static void main(String args[]) {

        testCollectionBinding();

    }

    private static void testCollectionBinding() {

        // final String uriString = "mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin";

        // MongoClientURI uri = new MongoClientURI(uriString);
        // note that java connections are not initialized unless an operation
        // such as a find() or count() is executed

        MongoClient  mongoClient = new MongoClient();

        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = db
                .getCollection("inventory");

        collection.drop();
        // Insert some documents so there's something to update/delete
        collection.insertMany(java.util.Arrays.asList(Document.parse(
                "{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")));

        // Start updateOne example
        UpdateResult updateResult = collection.updateOne(eq("item", "paper"),
                combine(set("size.uom", "cm"), set("status", "P"), currentDate("lastModified")));
        System.out.println("updateOne example documents updated: "
                + updateResult.getMatchedCount());
        // End updateOne example

        // Start updateMany example
        updateResult = collection.updateMany(lt("qty", 50),
                combine(set("size.uom", "in"), set("status", "P"), currentDate("lastModified")));
        System.out.println("updateMany example documents updated: "
                + updateResult.getMatchedCount());
        // End updateMany example

        // Start deleteOne example
        DeleteResult deleteResult = collection.deleteOne(eq("status", "D"));
        System.out.println("deleteOne example documents deleted: "
                + deleteResult.getDeletedCount());
        // End deleteOne example

        // Start deleteMany example
        deleteResult = collection.deleteMany(eq("status", "A"));
        System.out.println("deleteMany example documents deleted: "
                + deleteResult.getDeletedCount());
        // End deleteMany example

        mongoClient.close();

    }
}
