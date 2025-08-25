package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.RealmTestKt;
import com.mongodb.realm.examples.model.Dog;

import org.bson.types.ObjectId;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.OrderedCollectionChangeSet;
import io.realm.OrderedRealmCollectionChangeListener;
import io.realm.Realm;
import io.realm.RealmObjectChangeListener;
import io.realm.RealmResults;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.PARTITION;
import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class NotificationsTest extends RealmTest {

    @Test
    public void collectionNotifications() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: collection-notifications
                            RealmResults<Dog> dogs = realm.where(Dog.class).findAll();
                            // Set up the collection notification handler.
                            OrderedRealmCollectionChangeListener<RealmResults<Dog>> changeListener = (collection, changeSet) -> {
                                // For deletions, notify the UI in reverse order if removing elements the UI
                                OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
                                for (int i = deletions.length - 1; i >= 0; i--) {
                                    OrderedCollectionChangeSet.Range range = deletions[i];
                                    Log.v("EXAMPLE", range.length + " dogs deleted at " + range.startIndex);
                                }
                                OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
                                for (OrderedCollectionChangeSet.Range range : insertions) {
                                    Log.v("EXAMPLE", range.length + " dogs inserted at " + range.startIndex);
                                }
                                OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
                                for (OrderedCollectionChangeSet.Range range : modifications) {
                                    Log.v("EXAMPLE", range.length + " dogs modified at " + range.startIndex);
                                }
                            };
                            // Observe collection notifications.
                            dogs.addChangeListener(changeListener);
                            // :snippet-end:
                            expectation.fulfill();
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
    @Test
    public void objectNotifications() {
        Expectation expectation = new Expectation();
        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = it.get();
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: object-notifications
                            // Create a dog in the realm.
                            AtomicReference<Dog> dog = new AtomicReference<Dog>();
                            realm.executeTransaction(transactionRealm -> {
                                dog.set(transactionRealm.createObject(Dog.class, new ObjectId()));
                                dog.get().setName("Max");
                            });

                            // Set up the listener.
                            RealmObjectChangeListener<Dog> listener = (changedDog, changeSet) -> {
                                if (changeSet.isDeleted()) {
                                    Log.i("EXAMPLE", "The dog was deleted");
                                    return;
                                }
                                for (String fieldName : changeSet.getChangedFields()) {
                                    Log.i("EXAMPLE", "Field '" + fieldName + "' changed.");
                                }
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            };

                            // Observe object notifications.
                            dog.get().addChangeListener(listener);

                            // Update the dog to see the effect.
                            realm.executeTransaction(r -> {
                                dog.get().setName("Wolfie"); // -> "Field 'name' was changed."
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
