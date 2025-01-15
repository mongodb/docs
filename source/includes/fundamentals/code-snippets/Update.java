package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Sorts.ascending;

public class Update {
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Update() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("update");
    }

    public static void main(String [] args){
        Update update = new Update();
        update.preview(true);
        update.setupPaintCollection();

        System.out.println("Update Many:");
        update.updateManyExample();
        update.preview(false);

        System.out.println("Replace One:");
        update.replaceOneExample();
        update.preview(false);
    }

    private void updateOneExample(){
        // Creates a filter and update document to change the value of ``color``
        // begin updateOneExample
        Bson filter = Filters.eq("qty", 0);
        Bson update = Updates.set("color", "dandelion");

        // Updates first matching document
        UpdateResult result = collection.updateOne(filter, update);
        // end updateOneExample
        
        System.out.println("Matched document count: " + result.getMatchedCount());
        System.out.println("Modified document count: " + result.getModifiedCount());

        // begin updateoptions
        UpdateOptions options = UpdateOptions.sort(ascending("color"));
        UpdateResult result = collection.updateOne(filter, document, options);
        // end updateoptions
    }

    private void updateManyExample(){
        // Creates a filter and update document to increase the "qty" value of all documents
        // begin updateManyExample
        Bson filter = Filters.empty();
        Bson update = Updates.inc("qty", 20);

        // Updates all documents and prints the number of matched and modified documents
        UpdateResult result = collection.updateMany(filter, update);
        System.out.println("Matched document count: " + result.getMatchedCount());
        System.out.println("Modified document count: " + result.getModifiedCount());
        // end updateManyExample
    }

    private void replaceOneExample(){
        // Creates a filter to match documents with a "color" value of "pink"
        // begin replaceOneExample
        Bson filter = Filters.eq("color", "pink");
        Document document = new Document("color", "orange").append("qty", 25);

        // Replaces the first document that matches the filter with a new document
        UpdateResult result = collection.replaceOne(filter, document);

        // Prints the number of matched and modified documents
        System.out.println("Matched document count: " + result.getMatchedCount());
        System.out.println("Modified document count: " + result.getModifiedCount());
        // end replaceOneExample

        // begin replaceoptions
        ReplaceOptions options = ReplaceOptions.sort(ascending("qty"));
        UpdateResult result = collection.replaceOne(filter, document, options);
        // end replaceoptions
    }

    private void preview(boolean drop){
        Bson filter = Filters.empty();
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        if (drop){
          collection.drop();  
        }
    }

    private void setupPaintCollection() {

        collection.insertMany(Arrays.asList(
            new Document("_id", 1).append("color", "red").append("qty", 5), 
            new Document("_id", 2).append("color", "purple").append("qty", 8), 
            new Document("_id", 3).append("color", "yellow").append("qty", 0), 
            new Document("_id", 4).append("color", "green").append("qty", 6),
            new Document("_id", 5).append("color", "pink").append("qty", 0)
        ));
    }

}
