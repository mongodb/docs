package docs;

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

public class Skip {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Skip() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("skip");
        // end declaration
    }

    public static void main (String [] args){
        Skip skip = new Skip();
        // skip.setupPaintCollection();
        skip.skipExample();
        skip.noResultsExample();
    }

    private void skipExample(){
        // begin skipExample
        import com.mongodb.client.model.Filters;
        import com.mongodb.client.model.Sorts;

        // <MongoCollection setup code here>

        Bson filter = Filters.empty();
        collection.find(filter)             
            .sort(Sorts.descending("qty"))        
            .skip(5)                       
            .forEach(doc -> System.out.println(doc.toJson()));
        // end skipExample
    }

    private void noResultsExample(){
        // begin noResultsExample
        Bson filter = Filters.empty();
        collection.find(filter)             
            .sort(Sorts.descending("qty"))        
            .skip(9)                       
            .forEach(doc -> System.out.println(doc.toJson()));
        // end noResultsExample
    }

    private void skipAggregateExample(){
        // begin skipAggregateExample
        import com.mongodb.client.model.Filters;
        import com.mongodb.client.model.Sorts;
        import com.mongodb.client.model.Aggregates;

        // <MongoCollection setup code here>

        Bson filter = Filters.empty();
        collection.aggregate(Arrays.asList(
            Aggregates.match(filter), 
            Aggregates.sort(Sorts.descending("qty")), 
            Aggregates.skip(5)))
            .forEach(doc -> System.out.println(doc.toJson())); 
        // end skipAggregateExample
    }

    private void setupPaintCollection() {

        // List<Document> filterdata = new ArrayList<>();

        // Document p1 = new Document("_id", 1).append("color", "red").append("qty", 5);
        // Document p2 = new Document("_id", 2).append("color", "purple").append("qty", 10);
        // Document p3 = new Document("_id", 3).append("color", "blue").append("qty", 9);
        // Document p4 = new Document("_id", 4).append("color", "white").append("qty", 6);
        // Document p5 = new Document("_id", 5).append("color", "yellow").append("qty", 11);
        // Document p6 = new Document("_id", 6).append("color", "pink").append("qty", 3);
        // Document p7 = new Document("_id", 7).append("color", "green").append("qty", 8);
        // Document p8 = new Document("_id", 8).append("color", "orange").append("qty", 7);
        
        // filterdata.add(p1);
        // filterdata.add(p2);
        // filterdata.add(p3);
        // filterdata.add(p4);
        // filterdata.add(p5);
        // filterdata.add(p6);
        // filterdata.add(p7);
        // filterdata.add(p8);

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
