package com.mongodb.docs.guides.examples.crud;

// Start Connect
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class Connect {

    public static MongoClient getConnection() {

        // here is the uri string!
        final String uriString = "<URISTRING>";

        MongoClientURI uri = new MongoClientURI(uriString);
        // note that java connections are not initialized unless an operation
        // such as a find() or count() is executed

        return new MongoClient(uri);

    }

    public static void closeConnection(MongoClient client) {
        client.close();
    }
}
// End Connect