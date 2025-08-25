package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.Document;
import org.junit.Test;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class AccessCustomUserDataTest extends RealmTest {

    @Test
    public void testReadCustomUserData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // :snippet-start: read-custom-user-data
            Credentials anonymousCredentials = Credentials.anonymous();
            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");
                    User user = app.currentUser();
                    Document customUserData = user.getCustomData();
                    Log.v("EXAMPLE", "Fetched custom user data: " + customUserData);
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void createCustomUserData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // :snippet-start: create-custom-user-data
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("custom-user-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("custom-user-data-collection");
                    mongoCollection.insertOne(
                            new Document("user-id-field", user.getId()).append("favoriteColor", "pink").append("_partition", "partition"))
                            .getAsync(result -> {
                                if (result.isSuccess()) {
                                    Log.v("EXAMPLE", "Inserted custom user data document. _id of inserted document: "
                                            + result.get().getInsertedId());
                                    // :remove-start:
                                    expectation.fulfill();
                                    // :remove-end:
                                } else {
                                    Log.e("EXAMPLE", "Unable to insert custom user data. Error: " + result.getError());
                                }
                            });
                } else {
                    Log.e("EXAMPLE", "Failed to log in anonymously:" + it.getError().toString());
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void updateCustomUserData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // :snippet-start: update-custom-user-data
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("custom-user-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("custom-user-data-collection");
                    mongoCollection.updateOne(
                            new Document("user-id-field", user.getId()), new Document("favoriteColor", "cerulean"))
                            .getAsync(result -> {
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                                if (result.isSuccess()) {
                                    if (result.get().getModifiedCount() == 1L) {
                                        Log.v("EXAMPLE", "Updated custom user data document.");
                                    } else {
                                        Log.v("EXAMPLE", "Could not find custom user data document to update.");
                                    }
                                } else {
                                    Log.e("EXAMPLE", "Unable to insert custom user data. Error: " + result.getError());
                                }
                            });
                } else {
                    Log.e("EXAMPLE", "Failed to log in anonymously:" + it.getError().toString());
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }
}
