package aggregation.pipelines;

//	:replace-start: {
//	  "terms": {
//	    "ArrayList<Document>": "void",
//      "runExample": "main",
//      "System.getenv(\"CONNECTION_STRING\");": "\"<connection string>\""
//	  }
//	}

// :snippet-start: example
// :uncomment-start:
//package org.example;
// :uncomment-end:

// Modify imports for each tutorial as needed.
import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AggTutorial {
    public static ArrayList<Document> runExample(String[] args) {
        // Replace the placeholder with your connection string.
        String uri = System.getenv("CONNECTION_STRING");

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase aggDB = mongoClient.getDatabase("agg_tutorials_db");

            // Get a reference to relevant collections.
            // ... MongoCollection<Document> someColl = ...
            MongoCollection<Document> someColl = aggDB.getCollection("some_collection"); // :remove:
            // ... MongoCollection<Document> anotherColl = ...
            MongoCollection<Document> anotherColl = aggDB.getCollection("another_collection"); // :remove:

            // Insert sample data into the collection or collections.
            // ... someColl.insertMany(...);
            // :remove-start:
            someColl.insertMany(
                    Arrays.asList(new Document("stringValue", "sample1"), new Document("stringValue", "sample2")));
            // :remove-end:

            // Create an empty pipeline array.
            List<Bson> pipeline = new ArrayList<>();

            // Add code to create pipeline stages.
            // ... pipeline.add(...);
            pipeline.add(Aggregates.match(Filters.eq("stringValue", "sample2"))); // :remove:

            // Run the aggregation.
            // ... AggregateIterable<Document> aggregationResult =
            // someColl.aggregate(pipeline);
            AggregateIterable<Document> aggregationResult = someColl.aggregate(pipeline); // :remove:

            // Print the aggregation results.
            ArrayList<Document> documentsToReturn = new ArrayList<>(); // :remove:
            for (Document document : aggregationResult) {
                // :uncomment-start:
                // System.out.println(document.toJson());
                // :uncomment-end:
                documentsToReturn.add(document); // :remove:
            }
            return documentsToReturn; // :remove:
        }
    }
}
// :snippet-end:
// :replace-end:
