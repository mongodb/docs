package com.mycompany.app;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.*;
import com.mongodb.client.result.InsertOneResult;
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
        Bson projection = Projections.excludeId();
        Bson filter = Filters.eq("color", "green");
        Bson update = Updates.set("food", "pizza");
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions().
                projection(projection).
                upsert(true).
                maxTime(5, TimeUnit.SECONDS);
        /* The result variable contains your document in the
           state before your update operation is performed. */
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        //end findOneAndUpdate-example
    }

    private void findOneAndDeleteExample() {
        System.out.println("Starting find one and delete example...");
        MongoCollection<Document> collection = getCollection();
        //start findOneAndDelete-example
        // <MongoCollection set up code here>
        Bson sort = Sorts.descending("_id");
        Bson filter = Filters.empty();
        FindOneAndDeleteOptions options = new FindOneAndDeleteOptions().
                sort(sort);
        Document result = collection.findOneAndDelete(filter, options);
        System.out.println(result.toJson());
        //end findOneAndDelete-example
    }


    private void findOneAndReplaceExample() {
        System.out.println("Starting find one and replace example...");
        MongoCollection<Document> collection = getCollection();
        //start findOneAndReplace-example
        // <MongoCollection set up code here>
        Bson filter = Filters.eq("color", "green");
        Document replace = new Document("music", "classical").append("color", "green");
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().
                returnDocument(ReturnDocument.AFTER);
        Document result = collection.findOneAndReplace(filter, replace, options);
        System.out.println(result.toJson());
        //end findOneAndReplace-example
    }
}
