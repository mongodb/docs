package docs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.InsertOneResult;

import com.mongodb.MongoBulkWriteException;

import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.ArrayList;

public class Insert {
    
    private final MongoCollection<Document> collection;
    private final MongoClient mongoClient;
    private final MongoDatabase database;

    private Insert() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("crudOps");
        collection = database.getCollection("insert");
    }

    public static void main(String[] args) {
        Insert insert = new Insert();

        System.out.println("Insert One:");
        insert.insertOneExample();
        insert.preview();

        System.out.println("Insert Many:");
        insert.insertManyExample();
        insert.preview();

        System.out.println("Insert Many Error:");
        insert.insertManyErrorExample();
        insert.preview();
    }

    private void insertOneExample() {
        collection.drop();
        // begin insertOneExample
        Document doc1 = new Document("color", "red").append("qty", 5);
        
        InsertOneResult result = collection.insertOne(doc1);
        System.out.println("Inserted a document with the following id: " 
            + result.getInsertedId().asObjectId().getValue());
        // end insertOneExample
    }

    private void insertManyExample() {
        collection.drop();
        // begin insertManyExample
        List<Document> documents = new ArrayList<>();

        Document doc1 = new Document("color", "red").append("qty", 5);
        Document doc2 = new Document("color", "purple").append("qty", 10);
       
        documents.add(doc1);
        documents.add(doc2);
        
        InsertManyResult result = collection.insertMany(documents);
        
        List<ObjectId> insertedIds = new ArrayList<>();
        result.getInsertedIds().values()
            .forEach(doc -> insertedIds.add(doc.asObjectId().getValue()));
        
        System.out.println("Inserted documents with the following ids: " + insertedIds);
        
        //end insertManyExample
    }

    private void insertManyErrorExample() {
        collection.drop();
        
        List<Document> documents = new ArrayList<>();

        Document doc1 = new Document("_id", 3).append("color", "red").append("qty", 5);
        Document doc2 = new Document("_id", 4).append("color", "purple").append("qty", 10);
        Document doc3 = new Document("_id", 3).append("color", "yellow").append("qty", 3);
        Document doc4 = new Document("_id", 6).append("color", "blue").append("qty", 8);
       
        documents.add(doc1);
        documents.add(doc2);
        documents.add(doc3);
        documents.add(doc4);

        // begin insertManyErrorExample
        List<Integer> insertedIds = new ArrayList<>();
        try {
            InsertManyResult result = collection.insertMany(documents);  
            result.getInsertedIds().values()
                .forEach(doc -> insertedIds.add(doc.asInt32().getValue()));
            System.out.println("Inserted documents with the following ids: " + insertedIds);
        } catch(MongoBulkWriteException exception) {
            exception.getWriteResult().getInserts()
                .forEach(doc -> insertedIds.add(doc.getId().asInt32().getValue()));
            System.out.println("A MongoBulkWriteException occurred, but there are " + 
                "successfully processed documents with the following ids: " + insertedIds);
        }
        //end insertManyErrorExample
    }

    private void preview(){
        collection.find().forEach(doc -> System.out.println(doc.toJson()));
    }
}
