// Updates the first document that matches a query filter by using the Java driver

package org.example;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.gt;

public class Update {

    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Instructs the driver to insert a new document if none match the query
            UpdateOptions options = new UpdateOptions().upsert(true);

            Document updateOneQuery = new Document().append("title",  "Cool Runnings 2");

            // Creates instructions to update the values of three document fields
            Bson updateOneUpdates = Updates.combine(
                    Updates.set("runtime", 99),
                    Updates.addToSet("genres", "Sports"),
                    Updates.currentTimestamp("lastUpdated"));

            // Updates the first document that has a "title" value of "Cool Runnings 2"
            UpdateResult result = collection.updateOne(updateOneQuery, updateOneUpdates, options);

            // Prints the number of updated documents and the upserted document ID, if an upsert was performed
            System.out.println("Number of documents updated - update one: " + result.getModifiedCount());
            System.out.println("Upserted document ID: " + result.getUpsertedId());

            Bson updateManyQuery = gt("num_mflix_comments", 50);

            // Creates instructions to update the values of two document fields
            Bson updateManyUpdates = Updates.combine(
                    Updates.addToSet("genres", "Frequently Discussed"),
                    Updates.currentTimestamp("lastUpdated"));

            // Updates documents that have a "num_mflix_comments" value over 50
            UpdateResult result = collection.updateMany(updateManyQuery, updateManyUpdates);

            // Prints the number of updated documents
            System.out.println("\nNumber of documents updated - update many: " + result.getModifiedCount());
        }
    }
}
