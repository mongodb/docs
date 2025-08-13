package org.example;

// Modify imports for each tutorial as needed.
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class SampleApp {
    public static void main(String[] args) {
        // Replace the placeholder with your connection string.
        String uri = "<connection string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // start example code here

            // end example code here
        } catch (MongoException me) {
            System.err.println(me.getMessage());
        }
    }
}
