// Deletes documents from a collection by using the Java driver

package org.example;

import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Filters.lt;

public class Delete {

    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

          try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Bson deleteOneQuery = eq("title", "The Garbage Pail Kids Movie");

            // Deletes the first document that has a "title" value of "The Garbage Pail Kids Movie"
            DeleteResult result = collection.deleteOne(deleteOneQuery);
            System.out.println("Deleted document count - delete one: " + result.getDeletedCount());

            Bson deleteManyQuery = lt("imdb.rating", 1.9);

            // Deletes all documents that have an "imdb.rating" value less than 1.9
            result = collection.deleteMany(deleteManyQuery);

            // Prints the number of deleted documents
            System.out.println("Deleted document count - delete many: " + result.getDeletedCount());
        }
    }
}