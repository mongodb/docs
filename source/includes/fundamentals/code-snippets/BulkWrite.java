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
        bulkWrite.insertDocumentsExample();
        bulkWrite.preview();

        System.out.println("Replace");
        bulkWrite.replaceDocumentsExample();
        bulkWrite.preview();

        System.out.println("Update");
        bulkWrite.updateDocumentsExample();
        bulkWrite.preview();

        System.out.println("Delete");
        bulkWrite.deleteDocumentsExample();
        bulkWrite.preview();
    }

    
    private void insertExceptionExample() {
        // begin insertExceptionExample
        try {
            List<WriteModel<Document>> bulkOperations = new ArrayList<>();
            
            InsertOneModel<Document> doc3 = new InsertOneModel<>(new Document("_id", 1));
            InsertOneModel<Document> doc4 = new InsertOneModel<>(new Document("_id", 3));
            
            bulkOperations.add(doc3);
            bulkOperations.add(doc4);
            
            collection.bulkWrite(bulkOperations); 
        
        } catch (MongoBulkWriteException e){
            System.out.println("A MongoBulkWriteException occured with the following message: " + e.getMessage());
        }
        //end insertExceptionExample
    }

    private void bulkWriteNotOrderedExample() {
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 3));
        ReplaceOneModel<Document> doc2 = new ReplaceOneModel<>(Filters.eq("_id", 1), 
                                            new Document("_id", 1).append("x", 2));                            
        UpdateOneModel<Document> doc3 = new UpdateOneModel<>(Filters.eq("_id", 3), Updates.set("x", 2));
        DeleteManyModel<Document> doc4 = new DeleteManyModel<>(Filters.eq("x", 2));
   
        bulkOperations.add(doc1);
        bulkOperations.add(doc2);
        bulkOperations.add(doc3);
        bulkOperations.add(doc4);
        
        // begin bulkWriteNotOrderedExample
        BulkWriteOptions options = new BulkWriteOptions().ordered(false);
        
        collection.bulkWrite(bulkOperations, options); 
        //end bulkWriteNotOrderedExample
    }

    private void bulkWriteExample() {
        // begin bulkWriteExample

        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 3));
        ReplaceOneModel<Document> doc2 = new ReplaceOneModel<>(Filters.eq("_id", 1), 
                                            new Document("_id", 1).append("x", 2));                            
        UpdateOneModel<Document> doc3 = new UpdateOneModel<>(Filters.eq("_id", 3), Updates.set("x", 2));
        DeleteManyModel<Document> doc4 = new DeleteManyModel<>(Filters.eq("x", 2));
   
        bulkOperations.add(doc1);
        bulkOperations.add(doc2);
        bulkOperations.add(doc3);
        bulkOperations.add(doc4);

        collection.bulkWrite(bulkOperations);               
        //end bulkWriteExample
    }

    private void insertDocumentsExample(){
        collection.drop();
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        // begin insertDocumentsExample
        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 3));
        InsertOneModel<Document> doc2 = new InsertOneModel<>(new Document("_id", 4));
        //end insertDocumentsExample
        
        bulkOperations.add(doc1);
        bulkOperations.add(doc2);

        collection.bulkWrite(bulkOperations);
    }
    
    private void replaceDocumentsExample(){
        collection.drop();
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 1));
        InsertOneModel<Document> doc2 = new InsertOneModel<>(new Document("_id", 2));

        // begin replaceDocumentsExample
        ReplaceOneModel<Document> doc3 = new ReplaceOneModel<>(
                                            Filters.eq("_id", 1), 
                                            new Document("_id", 1).append("x", 4));
        //end replaceDocumentsExample

        bulkOperations.add(doc1);
        bulkOperations.add(doc2);
        bulkOperations.add(doc3);

        collection.bulkWrite(bulkOperations);
    }

    private void updateDocumentsExample(){
        collection.drop();
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 1));
        InsertOneModel<Document> doc2 = new InsertOneModel<>(new Document("_id", 2));

        // begin updateDocumentsExample
        UpdateOneModel<Document> doc3 = new UpdateOneModel<>(
                                            Filters.eq("_id", 2), 
                                            Updates.set("x", 8));
        //end updateDocumentsExample

        bulkOperations.add(doc1);
        bulkOperations.add(doc2);
        bulkOperations.add(doc3);

        collection.bulkWrite(bulkOperations);
    }

    private void deleteDocumentsExample(){
        collection.drop();
        List<WriteModel<Document>> bulkOperations = new ArrayList<>();

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 1));
        InsertOneModel<Document> doc2 = new InsertOneModel<>(new Document("_id", 2));

        // begin deleteDocumentsExample
        DeleteOneModel<Document> doc3 = new DeleteOneModel<>(Filters.eq("_id", 1));
        //end deleteDocumentsExample

        bulkOperations.add(doc1);
        bulkOperations.add(doc2);
        bulkOperations.add(doc3);

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

        InsertOneModel<Document> doc1 = new InsertOneModel<>(new Document("_id", 1));
        InsertOneModel<Document> doc2 = new InsertOneModel<>(new Document("_id", 2));
        
        bulkOperations.add(doc1);
        bulkOperations.add(doc2);

        collection.bulkWrite(bulkOperations);
    }
}
