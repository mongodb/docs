package com.mongodb.realm.examples.java;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.FrogJava;

import org.bson.types.ObjectId;
import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class LandingPageTest extends RealmTest {

    @Test
    public void testUpdate() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    // :snippet-start: update
                    // Sync uses SyncConfiguration instead of RealmConfiguration,
                    // and requires both a logged-in user and a partition value
                    SyncConfiguration config = new SyncConfiguration.Builder(
                            app.currentUser(),
                            "myPartition")
                            // :remove-start:
                            .allowQueriesOnUiThread(true) // only need these for the behind-the-scenes insert, so hide them
                            .allowWritesOnUiThread(true)
                            // :remove-end:
                            .build();

                    Realm realm = Realm.getInstance(config);
                    // :remove-start:
                    realm.executeTransaction(transactionRealm -> { // create a frog to update in the example
                        FrogJava frog = transactionRealm.createObject(FrogJava.class, new ObjectId());
                        frog.setName("Benjamin Franklin");
                    });
                    // :remove-end:

                    realm.executeTransactionAsync(transactionRealm -> { // start a write transaction
                        // get a frog from the database to update
                        FrogJava frog = transactionRealm.where(FrogJava.class)
                                .equalTo("name", "Benjamin Franklin")
                                .findFirst();
                        // change the frog's name
                        frog.setName("George Washington");
                        // change the frog's species
                        frog.setSpecies("American bullfrog");
                        // :remove-start:
                        expectation.fulfill();
                        // :remove-end:
                    }); // when the transaction completes, the frog's name and species
                    // are updated in the database and synced to the connected Realm App
                    // :snippet-end:
                }
            });
        });
        expectation.await();
    }
}
