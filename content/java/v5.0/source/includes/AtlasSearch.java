// Runs an Atlas Search query by using the Java driver

package org.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.search.SearchOperator;
import com.mongodb.client.model.search.SearchPath;
import org.bson.Document;
import java.util.Arrays;

public class AtlasSearch {
    public static void main(String[] args) {
        String uri = "<connection string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
        
        // Queries for documents that have a "title" value containing the word "Alabama"
        // begin-atlas-search
        collection.aggregate(
            Arrays.asList(
            	Aggregates.search(SearchOperator.text(
                              SearchPath.fieldPath("title"), "Alabama")),
                Aggregates.project(Projections.include("title"))
            )
        ).forEach(doc -> System.out.println(doc.toJson()));
        // end-atlas-search
        
        }
    }
}
