// Runs a database command by using the Java driver

package org.example;

import org.bson.BsonDocument;
import org.bson.BsonInt64;
import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.conversions.Bson;


public class RunCommand {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");

            try {
                Bson command = new BsonDocument("dbStats", new BsonInt64(1));

                // Retrieves statistics about the specified database
                Document commandResult = database.runCommand(command);

                // Prints the database statistics
                System.out.println("dbStats: " + commandResult.toJson());

            } catch (MongoException me) {
                // Prints a message if any exceptions occur during the command execution
                System.err.println("An error occurred: " + me);
            }
        }
    }
}
