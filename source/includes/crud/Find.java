// Retrieves documents that match a query filter by using the Java driver

package org.example;

import static com.mongodb.client.model.Filters.lt;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;

import static com.mongodb.client.model.Filters.eq;

public class Find {
    public static void main( String[] args ) {

        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "<connection string uri>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Projects "title" and "imdb" fields, excludes "_id"
            Bson projectionFields = Projections.fields(
                    Projections.include("title", "imdb"),
                    Projections.excludeId());

            // Retrieves documents with a runtime of less than 15 minutes, applying the
            // projection and a sorting in alphabetical order
            FindIterable<Document> docs = collection.find(lt("runtime", 15))
                    .projection(projectionFields)
                    .sort(Sorts.ascending("title"))
                    .limit(10);

            // Prints the titles of the queried documents
            System.out.println("10 movies under 15 minutes: ");
            docs.forEach(doc -> System.out.println("- " + doc.get("title")));
            System.out.println();

            // Retrieves the document with the best imdb rating that is less
            // than 15 minutes long, applying the projection
            Document doc = collection.find(lt("runtime", 15))
                    .projection(projectionFields)
                    .sort(Sorts.ascending("imdb.rating"))
                    .first();

            // Prints title of the queried document
            if (doc == null) {
                System.out.println("No results found.");
            } else {
                System.out.println("The highest rated movie under 15 minutes: " + doc.toJson().get("title"));
            }
        }
    }
}
