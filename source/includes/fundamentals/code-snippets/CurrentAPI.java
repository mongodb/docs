package com.mycompany.app;


import com.mongodb.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.net.URL;

public class CurrentAPI {

    private static final String COLLECTION = "test";
    private static final String DATABASE = "test";
    private static String URI = System.getenv("DRIVER_URL");

    public static void main(String[] args) throws InterruptedException {
        CurrentAPI c = new CurrentAPI();
        c.example1();
        c.example2();

    }

    private void example1() {
        // start current-api-example
        MongoClient client = MongoClients.create(URI);
        MongoDatabase db = client.getDatabase(DATABASE);
        MongoCollection<Document> col = db.getCollection(COLLECTION);
        Document doc = col.find().first();
        System.out.println(doc.toJson());
        // end current-api-example
        client.close();
    }

    private void example2() {
        // start current-api-mongoclientsettings-example
        MongoClientSettings options = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(URI))
                .writeConcern(WriteConcern.W1).build();
        MongoClient client = MongoClients.create(options);
        // end current-api-mongoclientsettings-example
        client.close();
    }




}
