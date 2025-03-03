package docs;

import com.mongodb.MongoNamespace;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.bulk.ClientBulkWriteOptions;
import com.mongodb.client.model.bulk.ClientBulkWriteResult;
import com.mongodb.client.model.bulk.ClientNamespacedWriteModel;
import org.bson.Document;

import java.util.*;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class ClientBulkWrite {
    private final MongoClient mongoClient;
    private final MongoDatabase database;
    private final MongoCollection<Document> peopleCollection;
    private final MongoCollection<Document> thingsCollection;

    private ClientBulkWrite() {
        final String uri = System.getenv("DRIVER_REF_URI");

        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("db");

        peopleCollection = database.getCollection("people");
        thingsCollection = database.getCollection("things");
    }

    public static void main(String[] args) {
        ClientBulkWrite clientBulkWrite = new ClientBulkWrite();

        System.out.println("Insert Example:");
        clientBulkWrite.insertDocumentsExample();

        System.out.println("Update Example:");
        clientBulkWrite.setUpCollection();
        clientBulkWrite.updateDocumentsExample();

        System.out.println("Replace Example:");
        clientBulkWrite.setUpCollection();
        clientBulkWrite.replaceDocumentsExample();
    }

    private void insertDocumentsExample(){
        // start-insert-models
        MongoNamespace peopleNamespace = new MongoNamespace("db", "people");
        MongoNamespace thingsNamespace = new MongoNamespace("db", "things");

        List<ClientNamespacedWriteModel> bulkOperations = new ArrayList<>();

        bulkOperations.add(ClientNamespacedWriteModel
                .insertOne(
                        peopleNamespace,
                        new Document("name", "Julia Smith")
                )
        );

        bulkOperations.add(ClientNamespacedWriteModel
                .insertOne(
                        thingsNamespace,
                        new Document("object", "washing machine")
                )
        );

        ClientBulkWriteResult result = mongoClient.bulkWrite(bulkOperations);
        // end-insert-models

        System.out.println("# Inserted: " + result.getInsertedCount());
    }

    private void updateDocumentsExample(){
        // start-update-models
        MongoNamespace peopleNamespace = new MongoNamespace("db", "people");
        MongoNamespace thingsNamespace = new MongoNamespace("db", "things");

        List<ClientNamespacedWriteModel> bulkOperations = new ArrayList<>();

        bulkOperations.add(ClientNamespacedWriteModel.updateOne(
                        peopleNamespace,
                        Filters.eq("name", "Freya Polk"),
                        Updates.inc("age", 1)
                )
        );

        bulkOperations.add(ClientNamespacedWriteModel.updateMany(
                        thingsNamespace,
                        Filters.eq("category", "electronic"),
                        Updates.set("manufacturer", "Premium Technologies")
                )
        );

        ClientBulkWriteResult result = mongoClient.bulkWrite(bulkOperations);
        // end-update-models

        System.out.println("# Updated: " + result.getModifiedCount());
    }
    private void replaceDocumentsExample(){
        // start-replace-models
        MongoNamespace peopleNamespace = new MongoNamespace("db", "people");
        MongoNamespace thingsNamespace = new MongoNamespace("db", "things");

        List<ClientNamespacedWriteModel> bulkOperations = new ArrayList<>();

        bulkOperations.add(ClientNamespacedWriteModel.replaceOne(
                        peopleNamespace,
                        Filters.eq("_id", 1),
                        new Document("name", "Frederic Hilbert")
                )
        );

        bulkOperations.add(ClientNamespacedWriteModel.replaceOne(
                        thingsNamespace,
                        Filters.eq("_id", 1),
                        new Document("object", "potato")
                )
        );

        ClientBulkWriteResult result = mongoClient.bulkWrite(bulkOperations);
        // end-replace-models

        System.out.println("# Replaced: " + result.getModifiedCount());
    }

    private void orderOfExecutionExample() {
        // start-order-exec
        MongoNamespace namespace = new MongoNamespace("db", "people");

        ClientBulkWriteOptions options = ClientBulkWriteOptions
                .clientBulkWriteOptions()
                .ordered(false);

        List<ClientNamespacedWriteModel> bulkOperations = new ArrayList<>();

        bulkOperations.add(
                ClientNamespacedWriteModel.insertOne(
                        namespace,
                        new Document("_id", 1).append("name", "Rudra Suraj")
                )
        );

        // Causes a duplicate key error
        bulkOperations.add(
                ClientNamespacedWriteModel.insertOne(
                        namespace,
                        new Document("_id", 1).append("name", "Mario Bianchi")
                )
        );

        bulkOperations.add(
                ClientNamespacedWriteModel.insertOne(
                        namespace,
                        new Document("name", "Wendy Zhang")
                )
        );

        ClientBulkWriteResult result = mongoClient.bulkWrite(bulkOperations, options);
        // end-order-exec
    }

    private void setUpCollection(){

        peopleCollection.deleteMany(Filters.empty());
        thingsCollection.deleteMany(Filters.empty());

        peopleCollection.insertOne(new Document("_id", 1).append("name", "Freya Polk").append("age", 34));
        thingsCollection.insertMany(Arrays.asList(
                new Document("_id", 1).append("object", "notebook"),
                new Document("object", "keyboard").append("category", "electronic"),
                new Document("object", "blender").append("category", "electronic")
                )
        );
    }
}
