package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Turtle;
import com.mongodb.realm.examples.model.TurtleEnthusiast;

import org.bson.types.ObjectId;
import org.junit.Test;

import io.realm.ImportFlag;
import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class WritesTest extends RealmTest {

    @Test
    public void runATransaction() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: run-a-transaction
                            realm.executeTransaction(r -> {
                                // Create a turtle enthusiast named Ali.
                                TurtleEnthusiast ali = r.createObject(TurtleEnthusiast.class, new ObjectId());
                                ali.setName("Ali");
                                // Find turtles younger than 2 years old
                                RealmResults<Turtle> hatchlings = r.where(Turtle.class).lessThan("age", 2).findAll();
                                // Give all hatchlings to Ali.
                                hatchlings.setObject("owner", ali);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void createAnObject() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: create-an-object
                            realm.executeTransaction(r -> {
                                // Instantiate the class using the factory function.
                                Turtle turtle = r.createObject(Turtle.class, new ObjectId());
                                // Configure the instance.
                                turtle.setName("Max");
                                // Create a TurtleEnthusiast with a primary key.
                                ObjectId primaryKeyValue = new ObjectId();
                                TurtleEnthusiast turtleEnthusiast = r.createObject(TurtleEnthusiast.class, primaryKeyValue);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void upsertAnObject() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: upsert-an-object
                            realm.executeTransaction(r -> {
                                ObjectId id = new ObjectId();
                                TurtleEnthusiast drew = new TurtleEnthusiast();
                                drew.set_id(id);
                                drew.setName("Drew");
                                drew.setAge(25);
                                // Add a new turtle enthusiast to the realm. Since nobody with this id
                                // has been added yet, this adds the instance to the realm.
                                r.insertOrUpdate(drew);
                                TurtleEnthusiast andy = new TurtleEnthusiast();
                                andy.set_id(id);
                                andy.setName("Andy");
                                andy.setAge(56);
                                // Judging by the ID, it's the same turtle enthusiast, just with a different name.
                                // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
                                r.insertOrUpdate(andy);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void copyToRealmOrUpdateWithSameValuesFlag() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: copy-or-update-same-values-flag
                            realm.executeTransaction(r -> {
                                ObjectId id = new ObjectId();
                                TurtleEnthusiast drew = new TurtleEnthusiast();
                                drew.set_id(id);
                                drew.setName("Drew");
                                drew.setAge(25);
                                // Add a new turtle enthusiast to the realm. Since nobody with this id
                                // has been added yet, this adds the instance to the realm.
                                r.insertOrUpdate(drew);
                                TurtleEnthusiast andy = new TurtleEnthusiast();
                                andy.set_id(id);
                                andy.setName("Andy");
                                // Judging by the ID, it's the same turtle enthusiast, just with a different name.
                                // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
                                // the flag passed ensures that we only write the updated name field to the db
                                r.copyToRealmOrUpdate(andy, ImportFlag.CHECK_SAME_VALUES_BEFORE_SET);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void updateAnObject() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                            });
                            // :snippet-start: update-an-object
                            realm.executeTransaction(r -> {
                                // Get a turtle to update.
                                Turtle turtle = r.where(Turtle.class).findFirst();
                                // Update properties on the instance.
                                // This change is saved to the realm.
                                turtle.setName("Archibald");
                                turtle.setAge(101);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void updateACollection() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                            });
                            // :snippet-start: update-a-collection
                            realm.executeTransaction(r -> {
                                // Create a turtle enthusiast named Josephine.
                                TurtleEnthusiast josephine = r.createObject(TurtleEnthusiast.class, new ObjectId());
                                josephine.setName("Josephine");

                                // Get all turtles named "Pierogi".
                                RealmResults<Turtle> turtles = r.where(Turtle.class).equalTo("name", "Pierogi").findAll();

                                // Give all turtles named "Pierogi" to Josephine
                                turtles.setObject("owner", josephine);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void deleteAnObject() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                Turtle tony = r.createObject(Turtle.class, new ObjectId());
                                tony.setName("Tony");
                            });
                            // :snippet-start: delete-an-object
                            realm.executeTransaction(r -> {
                                // Get a turtle named "Tony".
                                Turtle tony = r.where(Turtle.class).equalTo("name", "Tony").findFirst();
                                tony.deleteFromRealm();
                                // discard the reference
                                tony = null;
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void deleteACollection() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                            });
                            // :snippet-start: delete-a-collection
                            realm.executeTransaction(r -> {
                                // Find turtles older than 2 years old.
                                RealmResults<Turtle> oldTurtles = r.where(Turtle.class).greaterThan("age", 2).findAll();
                                oldTurtles.deleteAllFromRealm();
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }


    @Test
    public void cascadingDelete() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                                TurtleEnthusiast ali = realm.createObject(TurtleEnthusiast.class, new ObjectId());
                                ali.setName("Ali");
                            });
                            // :snippet-start: cascading-deletes
                            realm.executeTransaction(r -> {
                                // Find a turtle enthusiast named "Ali"
                                TurtleEnthusiast ali = r.where(TurtleEnthusiast.class).equalTo("name", "Ali").findFirst();
                                // Delete all of ali's turtles
                                ali.getTurtles().deleteAllFromRealm();
                                ali.deleteFromRealm();
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void deleteAllInstancesOfAType() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                                TurtleEnthusiast ali = r.createObject(TurtleEnthusiast.class, new ObjectId());
                                ali.setName("Ali");
                            });
                            // :snippet-start: delete-all-instances-of-a-type
                            realm.executeTransaction(r -> {
                                r.delete(Turtle.class);
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }


    @Test
    public void deleteEverything() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            realm.executeTransaction(r -> {
                                r.createObject(Turtle.class, new ObjectId());
                                TurtleEnthusiast ali = r.createObject(TurtleEnthusiast.class, new ObjectId());
                                ali.setName("Ali");
                            });
                            // :snippet-start: delete-all
                            realm.executeTransaction(r -> {
                                r.deleteAll();
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
