package com.mycompany.app;

import com.mongodb.*;

public class LegacyAPI {

    private static final String COLLECTION = "test";
    private static final String DATABASE = "test";
    private static final String URI = System.getenv("DRIVER_URL");

    public static void main(String[] args) {
        LegacyAPI l = new LegacyAPI();
        l.example1();
        l.example2();
    }

    private void example1() {
        // start legacy-api-example
        MongoClient client = new MongoClient(URI);
        DB db = client.getDB(DATABASE);
        DBCollection col = db.getCollection(COLLECTION);
        DBObject doc = col.find().one();
        System.out.println(doc.toString());
        // end legacy-api-example
        client.close();
    }

    private void example2() {
        // start legacy-api-mongoclientoptions-example
        MongoClientURI mongoURI = new MongoClientURI(URI,
                MongoClientOptions.builder()
                        .writeConcern(WriteConcern.W1));
        MongoClient client = new MongoClient(mongoURI);
        // end legacy-api-mongoclientoptions-example
        client.close();
    }


}
