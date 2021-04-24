package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.*;

import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

import org.bson.Document;
import com.mongodb.client.model.Filters;

public class Cursor {
    private final MongoClient mongoClient;
    private final MongoDatabase database;
    private MongoCollection<Document> collection;

    private Cursor(){
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("test");
        collection = database.getCollection("orders");
    }

    public static void main(String [] args){
        Cursor c = new Cursor();
        c.setupPaintCollection();

        System.out.println("For Each Iteration");
        c.forEachIteration();

        System.out.println("First Example");
        c.firstExample();

        System.out.println("Into Example");
        c.intoExample();

        System.out.println("Manual Iteration");
        c.manualIteration();
        
        System.out.println("Close Example");
        c.closeExample();

        System.out.println("Try With Resources");
        c.tryWithResourcesExample();
    }

    private void forEachIteration(){
        // begin forEachIteration
        FindIterable<Document> iterable = collection.find();
        iterable.forEach(doc -> System.out.println(doc.toJson()));
        // end forEachIteration
    }

    private void firstExample(){
        // begin firstExample
        FindIterable<Document> iterable = collection.find();
        System.out.println(iterable.first());
        // end firstExample
    }

    private void intoExample(){
        // begin intoExample
        List<Document> results = new ArrayList<>();
        FindIterable<Document> iterable = collection.find();
        iterable.into(results);
        System.out.println(results);
        // end intoExample
    }

    private void manualIteration(){
        // begin manualIteration
        MongoCursor<Document> cursor = collection.find().cursor();
        while (cursor.hasNext()){
            System.out.println(cursor.next().toJson());
        }
        // end manualIteration
    }

    private void closeExample(){
        // begin closeExample
        MongoCursor<Document> cursor = collection.find().cursor();
        
        try {
            while (cursor.hasNext()){
                System.out.println(cursor.next().toJson());
            }
        } finally {
            cursor.close();
        }
        // end closeExample
    }

    private void tryWithResourcesExample(){
        // begin tryWithResourcesExample
        try(MongoCursor<Document> cursor = collection.find().cursor()) {
            while (cursor.hasNext()){
                System.out.println(cursor.next().toJson());
            }
        }
        // end tryWithResourcesExample
    }

    public void setupPaintCollection(){
        collection.drop();
        collection.insertMany(Arrays.asList(
            new Document("_id", 1).append("color", "red").append("qty", 5), 
            new Document("_id", 2).append("color", "purple").append("qty", 10), 
            new Document("_id", 3).append("color", "blue").append("qty", 9), 
            new Document("_id", 4).append("color", "white").append("qty", 6),
            new Document("_id", 5).append("color", "yellow").append("qty", 11),
            new Document("_id", 6).append("color", "pink").append("qty", 3),
            new Document("_id", 7).append("color", "green").append("qty", 8),
            new Document("_id", 8).append("color", "orange").append("qty", 7)
        ));
    }
}
