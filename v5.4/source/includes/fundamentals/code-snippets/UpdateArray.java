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
        // Creates a filter and update document to match a document and decrease its first "qty" array value
        // begin updateValueExample
        Bson filter = Filters.eq("qty", 18);
        Bson update = Updates.inc("qty.$", -3);

        // Defines options that configure the operation to return a document in its post-operation state
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);

        // Updates the first document that matches the filter and prints the updated document as JSON 
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateValueExample
    }

    private void updateValueOptionsExample(){
        // Creates filter documents to match a document, then match the document's array values under 15
        // begin updateValueOptionsExample
        Bson filter = Filters.eq("_id", 1);
        Bson smallerFilter = Filters.lt("smaller", 15);

        // Defines options that configure the document's return state and apply the array value filter
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER)
                                            .arrayFilters(Arrays.asList(smallerFilter));

        // Creates an update document to increase the matched array values by "5"
        Bson update = Updates.inc("qty.$[smaller]", 5);
        
         // Updates the first document that matches the filter and prints the updated document as JSON
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateValueOptionsExample
    }

    private void updateAllElementsExample(){
        // Creates a filter and update document to match a document and double its "qty" array elements
        // begin updateAllElementsExample
        Bson filter = Filters.eq("_id", 1);
        Bson update = Updates.mul("qty.$[]", 2);

        // Defines options that configure the operation to return a document in its post-operation state
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);

        // Updates the first document that matches the filter and prints the updated document as JSON                                    
        Document result = collection.findOneAndUpdate(filter, update, options);
        System.out.println(result.toJson());
        // end updateAllElementsExample
    }

    private void pushElementsExample(){
        // Creates a filter and update document to match a document and add a value to its "qty" array
        // begin pushElementsExample
        Bson filter = Filters.eq("_id", 1);
        Bson update = Updates.push("qty", 17);

        // Defines options that configure the operation to return a document in its post-operation state
        FindOneAndUpdateOptions options = new FindOneAndUpdateOptions()
                                            .returnDocument(ReturnDocument.AFTER);

         // Updates the first document that matches the filter and prints the updated document as JSON                                    
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
