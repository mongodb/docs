package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.ReplaceOneModel;
import com.mongodb.client.model.BulkWriteOptions;
import com.mongodb.client.model.DeleteOneModel;
import com.mongodb.client.model.DeleteManyModel;

import com.mongodb.MongoBulkWriteException;

import org.bson.Document;

import java.util.*;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.model.WriteModel;

public class BulkWrite {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private BulkWrite() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("bulkWrite");
    }

    public static void main(String[] args) {
        BulkWrite bulkWrite = new BulkWrite();
        System.out.println("Ordered BulkWrite");
        bulkWrite.setUpCollection();
        bulkWrite.bulkWriteExample();
        bulkWrite.preview();

        System.out.println("Unordered BulkWrite");
        bulkWrite.setUpCollection();
        bulkWrite.bulkWriteNotOrderedExample();
        bulkWrite.preview();

        System.out.println("Insert BulkWriteException");
        bulkWrite.setUpCollection();
        bulkWrite.insertExceptionExample();

        System.out.println("Insert");
        bulkWrite.setUpCollection();
        bulkWrite.insertDocumentsExample();
        bulkWrite.preview();

        System.out.println("Replace");
        bulkWrite.setUpCollection();
        bulkWrite.replaceDocumentsExample();
        bulkWrite.preview();

        System.out.println("Update");
        bulkWrite.setUpCollection();
        bulkWrite.updateDocumentsExample();
        bulkWrite.preview();

        System.out.println("Delete");
        bulkWrite.setUpCollection();
        bulkWrite.deleteDocumentsExample();
        bulkWrite.preview();
    }

    
    private void insertExceptionExample() {
        // begin insertExceptionExample
        try {
            List<WriteModel<Document>> bulkOperations = new ArrayList<>();

            // Creates instructions to insert documents
            InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 1));
            InsertOneModel<Document> doc3 = new InsertOneModel<>(new Document("_id", 3));
            
            bulkOperations.add(doc1);
            bulkOperations.add(doc3);
            
            // Runs a bulk write operation for the specified insert WriteModels
            collection.bulkWrite(bulkOperations); 
        
        // Prints a message if any exceptions occur during the bulk write operation
        } catch (MongoBulkWriteException e){
            System.out.println("A MongoBulkWriteException occurred with the following message: " + e.getMessage());
        }
        //end insertExceptionExample
    }

    private void bulkWriteNotOrderedExample() {
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to insert a document
        InsertOneModel<Document> insertDoc = new InsertOneModel<>(new Document("_id", 6)
                                                                .append("name", "Zaynab Omar")
                                                                .append("age", 37));

        // Creates instructions to replace the first document that matches the query
        ReplaceOneModel<Document> replaceDoc = new ReplaceOneModel<>(Filters.eq("_id", 1), 
                                                new Document("name", "Sandy Kane")
                                                    .append("location", "Helena, MT")); 
        
        // Creates instructions to update the first document that matches the query
        UpdateOneModel<Document> updateDoc = new UpdateOneModel<>(Filters.eq("name", "Zaynab Omar"), 
                                                Updates.set("name", "Zaynab Hassan"));
        
        // Creates instructions to delete all documents that match the query
        DeleteManyModel<Document> deleteDoc = new DeleteManyModel<>(Filters.gt("age", 50));
   
        bulkOperations.add(insertDoc);
        bulkOperations.add(replaceDoc);
        bulkOperations.add(updateDoc);
        bulkOperations.add(deleteDoc);

        // begin bulkWriteNotOrderedExample
        BulkWriteOptions options = new BulkWriteOptions().ordered(false);
        
        // Runs a bulk write operation for the specified insert, replace, update, and delete WriteModels in any order
        collection.bulkWrite(bulkOperations, options); 
        //end bulkWriteNotOrderedExample
    }

    private void bulkWriteExample() {
        // begin bulkWriteExample
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to insert a document
        InsertOneModel<Document> insertDoc = new InsertOneModel<>(new Document("_id", 6)
                                                                .append("name", "Zaynab Omar")
                                                                .append("age", 37));

        // Creates instructions to replace the first document matched by the query                                       
        ReplaceOneModel<Document> replaceDoc = new ReplaceOneModel<>(Filters.eq("_id", 1), 
                                                new Document("name", "Sandy Kane")
                                                    .append("location", "Helena, MT")); 
        
        // Creates instructions to update the first document matched by the query                                                                 
        UpdateOneModel<Document> updateDoc = new UpdateOneModel<>(Filters.eq("name", "Zaynab Omar"), 
                                                Updates.set("name", "Zaynab Hassan"));
        
        // Creates instructions to delete all documents matched by the query                                
        DeleteManyModel<Document> deleteDoc = new DeleteManyModel<>(Filters.gt("age", 50));
   
        bulkOperations.add(insertDoc);
        bulkOperations.add(replaceDoc);
        bulkOperations.add(updateDoc);
        bulkOperations.add(deleteDoc);

        // Runs a bulk write operation for the specified the insert, replace, update, and delete WriteModels in order
        collection.bulkWrite(bulkOperations);               
        //end bulkWriteExample
    }

    private void insertDocumentsExample(){
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to insert multiple documents
        // begin insertDocumentsExample
        InsertOneModel<Document> juneDoc = new InsertOneModel<>(new Document("name", "June Carrie")
                                                                    .append("age", 17));
                                                          
        InsertOneModel<Document> kevinDoc = new InsertOneModel<>(new Document("name", "Kevin Moss")
                                                                    .append("age", 22));
        //end insertDocumentsExample
        
        bulkOperations.add(juneDoc);
        bulkOperations.add(kevinDoc);

        // Runs a bulk write operation for the specified insert WriteModels
        collection.bulkWrite(bulkOperations);
    }
    
    private void replaceDocumentsExample(){
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to replace the first document matched by the query
        // begin replaceDocumentsExample
        ReplaceOneModel<Document> celineDoc = new ReplaceOneModel<>(
                                            Filters.eq("_id", 1), 
                                            new Document("name", "Celine Stork")
                                                .append("location", "San Diego, CA"));
        //end replaceDocumentsExample

        bulkOperations.add(celineDoc);

        // Runs a bulk write operation for the specified replace WriteModel
        collection.bulkWrite(bulkOperations);
    }

    private void updateDocumentsExample(){
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to update the first document matched by the query
        // begin updateDocumentsExample
        UpdateOneModel<Document> updateDoc = new UpdateOneModel<>(
                                            Filters.eq("_id", 2), 
                                            Updates.set("age", 31));
        //end updateDocumentsExample

        bulkOperations.add(updateDoc);

        // Runs a bulk write operation for the specified update WriteModel
        collection.bulkWrite(bulkOperations);
    }

    private void deleteDocumentsExample(){
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // Creates instructions to delete the first document matched by the query
        // begin deleteDocumentsExample
        DeleteOneModel<Document> deleteDoc = new DeleteOneModel<>(Filters.eq("_id", 1));
        //end deleteDocumentsExample

        bulkOperations.add(deleteDoc);

        // Runs a bulk write operation for the specified delete WriteModel
        collection.bulkWrite(bulkOperations);
    }

    private void preview(){
        collection.find().forEach(doc -> System.out.println(doc.toJson()));
    }

    private void setUpCollection(){
        collection.drop();

        //begin bulkOpsList
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();
        //end bulkOpsList

        InsertOneModel<Document> karen = new InsertOneModel<>(new Document("_id", 1)
                                                                .append("name", "Karen Sandoval")
                                                                .append("age", 31));
                                                   
        InsertOneModel<Document> william = new InsertOneModel<>(new Document("_id", 2)
                                                                    .append("name", "William Chin")
                                                                    .append("age", 54));
                                                        
        InsertOneModel<Document> shayla = new InsertOneModel<>(new Document("_id", 8)
                                                                    .append("name", "Shayla Ray")
                                                                    .append("age", 20));

        bulkOperations.add(karen);
        bulkOperations.add(william);
        bulkOperations.add(shayla);

        collection.bulkWrite(bulkOperations);
    }
}
