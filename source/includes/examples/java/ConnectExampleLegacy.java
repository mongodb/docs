package com.mongodb.docs.guides.examples.crud;

import org.bson.Document;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCursor;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.lt;
import static com.mongodb.client.model.Filters.or;
import static com.mongodb.client.model.Filters.regex;

import static java.util.Collections.singletonList;
import static java.util.Arrays.asList;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class ConnectExample {

    public static void main(String args[]) {

        testCollectionBinding();

    }

    private static void testCollectionBinding() {

        // Start Connection
        final String uriString = "<URISTRING>";
        MongoClientURI uri = new MongoClientURI(uriString);
        MongoClient mongoClient = new MongoClient(uri);
        // End Connection

        // Start Collection
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = db
                .getCollection("inventory");
        // End Collection
        collection.drop();

        // Insert Guide test
        Document canvas = Document.parse("{ item: 'canvas', qty: 100, tags: ['cotton'], size: { h: 28, w: 35.5, uom: 'cm' } }");

        collection.insertOne(canvas);

        // Read Guide 1 Find 1
        FindIterable<Document> findIterable = collection
                .find(new Document());

        System.out.println("READ GUIDE 1: example 1 results");

        try (MongoCursor<Document> cursor = collection.find().iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        collection.insertMany(asList(Document.parse(
                "{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")));

        System.out.println("READ GUIDE 2: example 1 results");

        try (MongoCursor<Document> cursor =  collection.find(eq("status", "D")).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        System.out.println("READ GUIDE 2: example 2 results");

        try (MongoCursor<Document> cursor =  collection.find(eq("size",
                Document.parse("{ h: 14, w: 21, uom: 'cm' }"))).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }


        System.out.println("READ GUIDE 2: example 3 results");

        try (MongoCursor<Document> cursor =  collection.find(eq("size.uom", "in")).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        System.out.println("READ GUIDE 3: example 1 results");

        try (MongoCursor<Document> cursor =  collection.find(lt("size.h", 15)).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        System.out.println("READ GUIDE 3: example 2 results");

        try (MongoCursor<Document> cursor =  collection
                .find(and(eq("status", "A"), lt("qty", 30))).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }


        System.out.println("READ GUIDE 3: example 3 results");

        try (MongoCursor<Document> cursor =  collection.
                find(or(eq("status", "A"), lt("qty", 30))).iterator()) {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        System.out.println("READ GUIDE 3: example 4 results");

        try (MongoCursor<Document> cursor =  collection.find(and(eq("status", "A"),
                or(lt("qty", 30), regex("item", "^p")))).iterator()){
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        }

        // Start Close
        mongoClient.close();
        // End Close
    }

}

