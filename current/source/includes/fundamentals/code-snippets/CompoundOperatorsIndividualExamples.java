package com.mycompany.app;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.*;
import com.mongodb.client.result.InsertOneResult;

import docs.builders.Filters;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class CompoundOperatorsIndividualExamples {

    private static final String COLLECTION = "compound-ops";
    private static final String DATABASE = "test";

    public static void main(String[] args) throws InterruptedException {
        CompoundOperatorsIndividualExamples.resetExample();
        CompoundOperatorsIndividualExamples examples = new CompoundOperatorsIndividualExamples();

        examples.findOneAndUpdateExample();
        examples.findOneAndReplaceExample();
        examples.findOneAndDeleteExample();
    }

    public static void resetExample() {
        MongoCollection<Document> collection = getCollection();
        collection.deleteMany(new Document());

        Document insert_pizza = new Document("_id", 1).append("food", "donut").append("color", "green");
        Document insert_pear = new Document("_id", 2).append("food", "pear").append("color", "yellow");
        ArrayList<Document> docs = new ArrayList<Document>();
        docs.add(insert_pizza);
        docs.add(insert_pear);

        // Inserts sample documents describing food
        collection.insertMany(docs);
    }

    public static MongoCollection<Document> getCollection() {
        String uri = System.getenv("DRIVER_URL");
        MongoClient mongoClient = MongoClients.create(uri);
        MongoDatabase database = mongoClient.getDatabase(DATABASE);
        MongoCollection<Document> collection = database.getCollection(COLLECTION);
        return collection;
    }

    private void findOneAndUpdateExample() {
        System.out.println("Starting find one and update example...");
        MongoCollection<Document> collection = getCollection();
        //start findOneAndUpdate-example
        // <MongoCollection set up code here>

        // Creates a projection to exclude the "_id" field from the retrieved documents
        Bson projection = Projections.excludeId();

        // Creates a filter to match documents with a "color" value of "green"
        Bson filter = Filters.eq("color", "green");

        // Creates an update document to set the value of "food" to "pizza"
        Bson update = Updates.set("food", "pizza");

        // Defines options that specify projected fields and permit upserts
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                .projection(projection)
                .upsert(true);
        
        // Updates the first matching document with the content of the update document, applying the specified options
        Document result = collection.findOneAndUpdate(filter, update, options);

        // Prints the matched document in its state before the operation
        System.out.println(result.toJson());
        //end findOneAndUpdate-example
    }

    private void findOneAndDeleteExample() {
        System.out.println("Starting find one and delete example...");
        MongoCollection<Document> collection = getCollection();
        //start findOneAndDelete-example
        // <MongoCollection set up code here>
        Bson sort = Sorts.descending("_id");

        // Creates an empty filter to match all documents in the collection
        Bson filter = Filters.empty();

        // Defines options that specify a descending sort on the "_id" field
        FindOneAndDeleteOptions options = new FindOneAndDeleteOptions().
                sort(sort);

        // Deletes the document containing the highest "_id" value and prints the deleted document
        Document result = collection.findOneAndDelete(filter, options);
        System.out.println(result.toJson());
        //end findOneAndDelete-example
    }


    private void findOneAndReplaceExample() {
        System.out.println("Starting find one and replace example...");
        MongoCollection<Document> collection = getCollection();
        //start findOneAndReplace-example
        // <MongoCollection set up code here>

        // Creates instructions to replace the matching document with a new document
        Bson filter = Filters.eq("color", "green");
        Document replace = new Document("music", "classical").append("color", "green");

        // Defines options specifying that the operation should return a document in its post-operation state
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().
                returnDocument(ReturnDocument.AFTER);

        // Atomically finds and replaces the matching document and prints the replacement document
        Document result = collection.findOneAndReplace(filter, replace, options);
        System.out.println(result.toJson());
        //end findOneAndReplace-example
    }
}
