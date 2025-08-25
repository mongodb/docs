package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Task;
import com.mongodb.realm.examples.model.TaskStatus;

import org.bson.BsonDocument;
import org.bson.BsonObjectId;
import org.bson.BsonString;
import org.bson.types.ObjectId;
import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.log.LogLevel;
import io.realm.log.RealmLog;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;
import io.realm.mongodb.sync.ConnectionState;
import io.realm.mongodb.sync.Progress;
import io.realm.mongodb.sync.ProgressListener;
import io.realm.mongodb.sync.ProgressMode;
import io.realm.mongodb.sync.SyncConfiguration;
import io.realm.mongodb.sync.SyncSession;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class SyncDataTest extends RealmTest {
    @Test
    public void openASyncedRealmOnline() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :snippet-start: open-a-synced-realm
                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                        .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // read and write to realm here via transactions
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    //@Test disabled because setting the baseUrl on the fly appears to not work very well
    public void openASyncedRealmOffline() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            // use a fake non-functional base url so the application is effectively "offline"
            App app = new App(new AppConfiguration.Builder(appID).baseUrl("http://www.example.com/").build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");

                    // :snippet-start: open-a-synced-realm-offline
                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // read and write to realm here via transactions
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void syncData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :snippet-start: sync-data
                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            RealmResults<Task> tasks = realm.where(Task.class).findAll();
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            });
                            // Don't forget to close your realm!
                            realm.close();
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void pauseOrResumeSyncSession() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");

                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            RealmResults<Task> tasks = realm.where(Task.class).findAll();
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                            });

                            // :snippet-start: pause-sync-session
                            SyncSession session = app.getSync().getSession(config);
                            session.stop();
                            // :snippet-end:
                            Assert.assertEquals(SyncSession.State.INACTIVE, app.getSync().getSession(config).getState());
                            // :snippet-start: resume-sync-session
                            SyncSession syncSession = app.getSync().getSession(config);
                            syncSession.start();
                            // :snippet-end:
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                            });
                            expectation.fulfill();

                            realm.close();
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
    public void checkCurrentNetworkConnection() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");

                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            RealmResults<Task> tasks = realm.where(Task.class).findAll();
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                            });

                            // :snippet-start: check-current-network-connection
                            Log.v("EXAMPLE", "Sync state: " + app.getSync().getSession(config).getConnectionState());
                            // :snippet-end:

                            expectation.fulfill();

                            realm.close();
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
    public void checkUploadAndDownloadProgress() {
        Expectation tracksUploadProgress = new Expectation();
        Expectation tracksDownloadProgress = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");

                    User user = app.currentUser();
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // Read all tasks in the realm. No special syntax required for synced realms.
                            RealmResults<Task> tasks = realm.where(Task.class).findAll();
                            // Write to the realm. No special syntax required for synced realms.
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                            });

                            // :snippet-start: check-upload-progress
                            app.getSync().getSession(config).addUploadProgressListener(ProgressMode.INDEFINITELY, new ProgressListener() {
                                @Override
                                public void onChange(Progress progress) {
                                    Log.v("EXAMPLE", "Upload progress: " + progress.getFractionTransferred());
                                    // :remove-start:
                                    tracksUploadProgress.fulfill();
                                    // :remove-end:
                                }
                            });
                            // :snippet-end:

                            // :snippet-start: check-download-progress
                            app.getSync().getSession(config).addDownloadProgressListener(ProgressMode.INDEFINITELY, new ProgressListener() {
                                @Override
                                public void onChange(Progress progress) {
                                    Log.v("EXAMPLE", "Download progress: " + progress.getFractionTransferred());
                                    // :remove-start:
                                    tracksDownloadProgress.fulfill();
                                    // :remove-end:
                                }
                            });
                            // :snippet-end:

                            // write a task locally to initiate an upload
                            realm.executeTransaction(r -> {
                                r.insert(new Task());
                            });

                            // write a task to a synced collection to initiate a download
                            MongoClient mongoClient =
                                    user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                            MongoDatabase mongoDatabase =
                                    mongoClient.getDatabase("android");
                            MongoCollection<BsonDocument> mongoCollection =
                                    mongoDatabase.getCollection("Task").withDocumentClass(BsonDocument.class);
                            Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");

                            BsonDocument task = new BsonDocument().append("name", new BsonString("task name"))
                                    .append("_partition", new BsonString(partition))
                                    .append("status", new BsonString(TaskStatus.Open.name()))
                                    .append("_id", new BsonObjectId(new ObjectId()));
                            mongoCollection.insertOne(task).getAsync(it -> {
                                if (it.isSuccess()) {
                                    Log.v("EXAMPLE", "successfully inserted a document with id: " + it.get().getInsertedId());
                                } else {
                                    Log.e("EXAMPLE", "failed to insert documents with: " + it.getError().getErrorMessage());
                                }
                            });
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        tracksUploadProgress.await();
        tracksDownloadProgress.await();
    }


    @Test
    public void setClientLogLevel() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            // :snippet-start: set-client-log-level
            RealmLog.setLevel(LogLevel.ALL);
            // :snippet-end:
            expectation.fulfill();
        });
        expectation.await();
    }
}
