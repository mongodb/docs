package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.FindOneAndUpdateOptions;
import com.mongodb.client.model.ReturnDocument;
import com.mongodb.client.model.Updates;

public class UpdateArray {
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private UpdateArray() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("updateArray");
    }

    public static void main(String [] args){
        UpdateArray updateArray = new UpdateArray();
        
        System.out.println("$ example:");
        updateArray.setUpDocument();
        updateArray.updateValueExample();

        System.out.println("$<> example:");
        updateArray.setUpDocument();
        updateArray.updateValueOptionsExample();

        System.out.println("$[] example:");
        updateArray.setUpDocument();
        updateArray.updateAllElementsExample();

        System.out.println("Push example:");
        updateArray.setUpDocument();
        updateArray.pushElementsExample();
    }

    private void updateValueExample(){
        // begin updateValueExample
        Bson filter = Filters.eq("qty", 18);
        Bson update = Updates.inc("qty.$", -3);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateValueExample
    }

    private void updateValueOptionsExample(){
        // begin updateValueOptionsExample
        Bson filter = Filters.eq("_id", 1);
        Bson smallerFilter = Filters.lt("smaller", 15);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER)
                                            .arrayFilters(Arrays.asList(smallerFilter));
        Bson update = Updates.inc("qty.$[smaller]", 5);
        
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateValueOptionsExample
    }

    private void updateAllElementsExample(){
        // begin updateAllElementsExample
        Bson filter = Filters.eq("_id", 1);
        Bson update = Updates.mul("qty.$[]", 2);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateAllElementsExample
    }

    private void pushElementsExample(){
        // begin pushElementsExample
        Bson filter = Filters.eq("_id", 1);
        Bson update = Updates.push("qty", 17);
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end pushElementsExample
    }

    private void setUpDocument(){
        collection.drop();
        collection.insertOne(
            Document.parse("{ _id: 1, color: 'green', qty: [ 8, 12, 18 ] }")
            );
    }
}
