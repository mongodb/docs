// Performs CRUD operations to generate change events when run with the Watch application

package org.example;

import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.client.result.DeleteResult;

public class WatchCompanion {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            try {
                // Inserts a sample document into the "movies" collection and print its ID
                InsertOneResult insertResult = collection.insertOne(new Document("test", "sample movie document"));
                System.out.println("Inserted document id: " + insertResult.getInsertedId());

                // Updates the sample document and prints the number of modified documents
                UpdateResult updateResult = collection.updateOne(new Document("test", "sample movie document"), Updates.set("field2", "sample movie document update"));
                System.out.println("Updated " + updateResult.getModifiedCount() + " document.");

                // Deletes the sample document and prints the number of deleted documents
                DeleteResult deleteResult = collection.deleteOne(new Document("field2", "sample movie document update"));
                System.out.println("Deleted " + deleteResult.getDeletedCount() + " document.");

                // Prints a message if any exceptions occur during the operations
            } catch (MongoException me) {
                System.err.println("Unable to insert, update, or replace due to an error: " + me);
            }
        }
    }
}
