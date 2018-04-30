package com.mongodb.docs.guides.examples.crud;


import org.bson.Document;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.lt;
import static com.mongodb.client.model.Filters.or;
import static com.mongodb.client.model.Filters.regex;

import static java.util.Collections.singletonList;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class ConnectExample {

    public static void main(String args[]) {

        testCollectionBinding();

    }

    private static void testCollectionBinding() {

        final String uriString = "mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin";

        MongoClientURI uri = new MongoClientURI(uriString);
        // note that java connections are not initialized unless an operation
        // such as a find() or count() is executed

        MongoClient  mongoClient =  new MongoClient(uri);

        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> collection = db
                .getCollection("inventory");

        collection.drop();

        // Insert Guide test
        Document canvas = new Document("item", "canvas")
                .append("qty", 100)
                .append("tags", singletonList("cotton"));

        Document size = new Document("h", 28).append("w", 35.5)
                .append("uom", "cm");
        canvas.put("size", size);

        collection.insertOne(canvas);

        // Read Guide 1 Find 1
        FindIterable<Document> findIterable = collection
                .find(new Document());

        Block<Document> printBlock = new Block<Document>() {
            @Override
            public void apply(final Document document) {
                System.out.println(document.toJson());
            }
        };

        System.out.println("READ GUIDE 1: example 1 results");
        findIterable.forEach(printBlock);

        collection.insertMany(java.util.Arrays.asList(Document.parse(
                "{ item: 'journal', qty: 25, size: { h: 14, w: 21, uom: 'cm' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'notebook', qty: 50, size: { h: 8.5, w: 11, uom: 'in' }, status: 'A' }"),
                Document.parse(
                        "{ item: 'paper', qty: 100, size: { h: 8.5, w: 11, uom: 'in' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'planner', qty: 75, size: { h: 22.85, w: 30, uom: 'cm' }, status: 'D' }"),
                Document.parse(
                        "{ item: 'postcard', qty: 45, size: { h: 10, w: 15.25, uom: 'cm' }, status: 'A' }")));

        findIterable = collection.find(eq("status", "D"));

        System.out.println("READ GUIDE 2: example 1 results");
        findIterable.forEach(printBlock);

        findIterable = collection.find(eq("size",
                Document.parse("{ h: 14, w: 21, uom: 'cm' }")));

        System.out.println("READ GUIDE 2: example 2 results");

        findIterable.forEach(printBlock);

        findIterable = collection.find(eq("size.uom", "in"));

        System.out.println("READ GUIDE 2: example 3 results");

        findIterable.forEach(printBlock);

        findIterable = collection.find(lt("size.h", 15));

        System.out.println("READ GUIDE 3: example 1 results");
        findIterable.forEach(printBlock);

        findIterable = collection
                .find(and(eq("status", "A"), lt("qty", 30)));

        System.out.println("READ GUIDE 3: example 2 results");

        findIterable.forEach(printBlock);

        findIterable = collection.find(or(eq("status", "A"), lt("qty", 30)));

        System.out.println("READ GUIDE 3: example 3 results");

        findIterable.forEach(printBlock);


        System.out.println("READ GUIDE 3: example 4 results");

        findIterable = collection.find(and(eq("status", "A"),
                or(lt("qty", 30), regex("item", "^p"))));

        findIterable.forEach(printBlock);

        mongoClient.close();

    }
}



