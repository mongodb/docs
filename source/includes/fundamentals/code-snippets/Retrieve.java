package docs;

import com.mongodb.client.ChangeStreamIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.changestream.FullDocument;

public class Retrieve {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Retrieve() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("retrieve");
    }

    public static void main(String [] args){
        Retrieve retrieve = new Retrieve();
        retrieve.preview(true);
        retrieve.setupPaintOrderCollection();

        System.out.println("Find Example: ");
        retrieve.findExample();

        System.out.println("Aggregate Example: ");
        retrieve.aggregateExample();
        
        System.out.println("Watch Example: ");
        retrieve.watchExample();
        retrieve.setupPaintOrderCollection();

    }

    private void findExample(){
        //  Creates a filter to match documents that have a "qty" value between 3 and 9
        // begin findExample
        Bson filter = Filters.and(Filters.gt("qty", 3), Filters.lt("qty", 9));

        // Retrieves documents that match the filter and prints them as JSON
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        // end findExample
    }

    private void aggregateExample(){
        // Creates an empty filter to match all documents in the collection
        // begin aggregateExample
        Bson filter = Filters.empty();

        // Prints the collection's "color" values and each value's frequency in descending frequency order
        collection.aggregate(Arrays.asList(
            Aggregates.match(filter), 
            Aggregates.group("$color", Accumulators.sum("qty", "$qty")),
            Aggregates.sort(Sorts.descending("qty"))))
            .forEach(doc -> System.out.println(doc.toJson()));
        // end aggregateExample
    }

    private void watchExample(){
        // Creates instructions to match insert and update operations
        // begin watchExample
        List<Bson> pipeline = Arrays.asList(
            Aggregates.match(Filters.in("operationType", Arrays.asList("insert", "update"))));
        
        // Creates a change stream that receives change events for the specified operations
        ChangeStreamIterable<Document> changeStream = database.watch(pipeline)
            .fullDocument(FullDocument.UPDATE_LOOKUP);
        
        // Prints a message each time the change stream receives a change event
        changeStream.forEach(event -> 
            System.out.println("Received a change to the collection: " + event));
        // end watchExample
    }

    private void preview(boolean drop){
        Bson filter = Filters.empty();
        collection.find(filter).forEach(doc -> System.out.println(doc.toJson()));
        if (drop){
          collection.drop();  
        }
    }

    private void setupPaintOrderCollection() {
        collection.insertMany(Arrays.asList(
                new Document("_id", 1).append("color", "purple").append("qty", 10), 
                new Document("_id", 2).append("color", "green").append("qty", 8),
                new Document("_id", 3).append("color", "purple").append("qty", 4),
                new Document("_id", 4).append("color", "green").append("qty", 11)
            ));
    }
}
