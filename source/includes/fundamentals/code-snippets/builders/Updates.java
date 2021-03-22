package docs.builders;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.Date;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.List;

import static com.mongodb.client.model.Updates.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.UpdateOptions.*;

public class Updates {

    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Updates() {
        // begin declaration
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("builders");
        collection = database.getCollection("updates");
        // end declaration
    }

    public static void main(String[] args) {
        Updates updates = new Updates();
        updates.resetCollection(updates);

        System.out.println("setUpdate:");
        updates.setUpdate();
        updates.resetCollection(updates);
        
        System.out.println("unsetUpdate:");
        updates.unsetUpdate();
        updates.resetCollection(updates);

        System.out.println("setOnInsertUpdate:");
        updates.setOnInsertUpdate();
        updates.resetCollection(updates);

        System.out.println("incUpdate:");
        updates.incUpdate();
        updates.resetCollection(updates);

        System.out.println("mulUpdate:");
        updates.mulUpdate();
        updates.resetCollection(updates);

        System.out.println("renameUpdate:");
        updates.renameUpdate();
        updates.resetCollection(updates);

        System.out.println("minUpdate:");
        updates.minUpdate();
        updates.resetCollection(updates);

        System.out.println("maxUpdate:");
        updates.maxUpdate();
        updates.resetCollection(updates);

        System.out.println("currentDateUpdate:");
        updates.currentDateUpdate();
        updates.resetCollection(updates);

        System.out.println("currentTimestampUpdate:");
        updates.currentTimestampUpdate();
        updates.resetCollection(updates);

        System.out.println("bitwiseOrUpdate:");
        updates.bitwiseOrUpdate();
        updates.resetCollection(updates);

        System.out.println("addToSetUpdate:");
        updates.addToSetUpdate();
        updates.resetCollection(updates);

        System.out.println("popFirstUpdate:");
        updates.popFirstUpdate();
        updates.resetCollection(updates);

        System.out.println("pullAllUpdate:");
        updates.pullAllUpdate();
        updates.resetCollection(updates);

        System.out.println("pullUpdate:");
        updates.pullUpdate();
        updates.resetCollection(updates);
        
        System.out.println("pushUpdate:");
        updates.pushUpdate();
        updates.resetCollection(updates);

        System.out.println("combineUpdate:");
        updates.combineUpdate();
        updates.resetCollection(updates);

    }

    private void setUpdate() {
        // begin setUpdate
        Bson filter = eq("_id", 1);
        Bson update = set("qty", 11);
        collection.updateOne(filter, update);
        // end setUpdate
    }
    private void unsetUpdate() {
        // begin unsetUpdate
        Bson filter = eq("_id", 1);
        Bson update = unset("qty");
        collection.updateOne(filter, update);
        // end unsetUpdate
    }

    private void setOnInsertUpdate() {
        // begin setOnInsertUpdate
        Bson filter = eq("_id", 1);
        Bson update = setOnInsert("qty", 7);
        collection.updateOne(filter, update, new UpdateOptions().upsert(true));
        // end setOnInsertUpdate
    }

    private void incUpdate() {
        // begin incUpdate
        Bson filter = eq("_id", 1);
        Bson update = inc("qty", 3);
        collection.updateOne(filter, update);
        // end incUpdate
    }

    private void mulUpdate() {
        // begin mulUpdate
        Bson filter = eq("_id", 1);
        Bson update = mul("qty", 2);
        collection.updateOne(filter, update);
        // end mulUpdate
    }

    private void renameUpdate() {
        // begin renameUpdate
        Bson filter = eq("_id", 1);
        Bson update = rename("qty", "quantity");
        collection.updateOne(filter, update);
        // end renameUpdate
    }

    private void minUpdate() {
        // begin minUpdate
        Bson filter = eq("_id", 1);
        Bson update = min("qty", 2);
        collection.updateOne(filter, update);
        // end minUpdate
    }

    private void maxUpdate() {
        // begin maxUpdate
        Bson filter = eq("_id", 1);
        Bson update = max("qty", 8);
        collection.updateOne(filter, update);
        // end maxUpdate
    }

    private void currentDateUpdate() {
        // begin currentDateUpdate
        Bson filter = eq("_id", 1);
        Bson update = currentDate("lastModified");
        collection.updateOne(filter, update);
        // end currentDateUpdate
    }

    private void currentTimestampUpdate() {
        // begin currentTimestampUpdate
        Bson filter = eq("_id", 1);
        Bson update = currentTimestamp("lastModified");
        collection.updateOne(filter, update);
        // end currentTimestampUpdate
    }

    private void bitwiseOrUpdate() {
        // begin bitwiseOrUpdate
        Bson filter = eq("_id", 1);
        Bson update = bitwiseOr("qty", 10);
        collection.updateOne(filter, update);
        // end bitwiseOrUpdate
    }

    private void addToSetUpdate() {
        // begin addToSetUpdate
        Bson filter = eq("_id", 1);
        Bson update = addToSet("vendor", "C");
        collection.updateOne(filter, update);
        // end addToSetUpdate
    }

    private void popFirstUpdate() {
        // begin popFirstUpdate
        Bson filter = eq("_id", 1);
        Bson update = popFirst("vendor");
        collection.updateOne(filter, update);
        // end popFirstUpdate
    }

    private void pullAllUpdate() {
        // begin pullAllUpdate
        Bson filter = eq("_id", 1);
        Bson update = pullAll("vendor", Arrays.asList("A", "M"));
        collection.updateOne(filter, update);
        // end pullAllUpdate
    }

    private void pullUpdate() {
        // begin pullUpdate
        Bson filter = eq("_id", 1);
        Bson update = pull("vendor", "D");
        collection.updateOne(filter, update);
        // end pullUpdate
    }

    private void pushUpdate() {
        // begin pushUpdate
        Bson filter = eq("_id", 1);
        Bson update = push("vendor", "C");
        collection.updateOne(filter, update);
        // end pushUpdate
    }

    private void combineUpdate() {
        // begin combineUpdate
        Bson filter = eq("_id", 1);
        Bson update = combine(set("color", "purple"), inc("qty", 6), push("vendor", "R"));
        collection.updateOne(filter, update);
        // end combineUpdate
    }

    private void preview(){
        Bson filter = new Document();
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
    }

    public void resetCollection(Updates updates){
        updates.preview();
        collection.drop();
        updates.setupCollection();
    }

    private void setupCollection() {
        String [] vendors = {"A", "D", "M"};
        List<String> vendor_list = Arrays.asList(vendors);

        String today = "03/05/2021";
        Date lastModified = new SimpleDateFormat("MM/dd/yyyy").parse(today,  new ParsePosition(0));

        Document demoDocument = new Document("_id", 1)
                                .append("color", "red")
                                .append("qty", 5)
                                .append("vendor", vendor_list)
                                .append("lastModified", lastModified);

        collection.insertOne(demoDocument);

    }
}
