package com.mongodb.realm.examples.java;
// :replace-start: {
//    "terms": {
//       "DeletedObjectJava": "DeletedObject",
//       "LastSyncedJava": "LastSynced",
//       "PotatoJava": "Potato",
//       "OnionJava": "Onion",
//       "RiceJava": "Rice"
//    }
// }

import android.app.AlertDialog;
import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.LastSyncedJava;
import com.mongodb.realm.examples.model.java.OnionJava;
import com.mongodb.realm.examples.model.java.PotatoJava;
import com.mongodb.realm.examples.model.java.RiceJava;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import io.realm.DynamicRealm;
import io.realm.DynamicRealmObject;
import io.realm.Realm;
import io.realm.RealmQuery;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.ClientResetRequiredError;
import io.realm.mongodb.sync.DiscardUnsyncedChangesStrategy;
import io.realm.mongodb.sync.ManuallyRecoverUnsyncedChangesStrategy;
import io.realm.mongodb.sync.ProgressMode;
import io.realm.mongodb.sync.SyncConfiguration;
import io.realm.mongodb.sync.SyncSession;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import io.realm.mongodb.sync.SimulateClientResetCaller;

public class ClientResetTest extends RealmTest {
    String PARTITION = null;
    Realm globalRealm = null;
    Expectation expectation = null; // global expectation for manual mode to use
    ObjectId deletedObjId = null;
    SyncConfiguration globalConfig = null;

    @Before
    public void setup() {
        expectation = new Expectation();
        PARTITION = getRandomPartition();
    }

    public void setupData(App app, SyncConfiguration config, User user) {
        Expectation setupExpectation = new Expectation();
        activity.runOnUiThread (() -> {
            Log.v("EXAMPLE", "Successfully authenticated anonymously.");

            ExecutorService executor = Executors.newSingleThreadExecutor();
            executor.execute(() -> {
                Realm realm = Realm.getInstance(config);

                // create an initial "last synced" timestamp singleton
                realm.executeTransaction(transactionRealm
                        -> transactionRealm.createObject(LastSyncedJava.class,
                            new ObjectId()).setTimestamp(System.currentTimeMillis()));

                Log.v("EXAMPLE",
                        "Successfully opened a realm for initial test data setup.");

                // :snippet-start: keep-track-of-last-synced-time
                // use a "last synced" singleton in the realm to keep track of when the
                // realm last successfully completed a sync
                app.getSync().getSession(config)
                    .addUploadProgressListener(ProgressMode.INDEFINITELY, progress -> {
                        // get the last synced time. Create an instance if it does not already exist.
                        Realm notificationRealm = Realm.getInstance(config);
                        LastSyncedJava lastSynced =
                                notificationRealm.where(LastSyncedJava.class).findFirst();
                        if (lastSynced == null) {
                            notificationRealm.executeTransaction(transactionRealm ->
                                    transactionRealm.createObject(LastSyncedJava.class,
                                            new ObjectId()).setTimestamp(System.currentTimeMillis()));
                        }

                        // only update the "last synced" time when ALL client data has uploaded
                        // avoid repeatedly setting "last synced" every time we update "last synced"
                        // by checking if the current "last synced" time was within the last 10ms
                        if(progress.isTransferComplete() &&
                                System.currentTimeMillis() > lastSynced.getTimestamp() + 10) {
                            notificationRealm.executeTransaction(transactionRealm -> {
                                transactionRealm.where(LastSyncedJava.class)
                                                .findFirst()
                                                .setTimestamp(System.currentTimeMillis());
                                Log.v("EXAMPLE", "Updating last synced time to: "
                                        + System.currentTimeMillis());
                            });
                            Log.v("EXAMPLE", "Updated last synced time to: " +
                                    lastSynced.getTimestamp());
                        }
                        notificationRealm.close();
                });
                // :snippet-end:

                // insert some objects into the realm
                realm.executeTransaction(transactionRealm -> {
                    OnionJava onion = realm.createObject(OnionJava.class, new ObjectId());
                    PotatoJava potato = realm.createObject(PotatoJava.class, new ObjectId());
                    RiceJava rice = realm.createObject(RiceJava.class, new ObjectId());
                });

                // force the writes to upload
                try {
                    app.getSync().getSession(config).uploadAllLocalChanges(
                            10000, TimeUnit.MILLISECONDS);
                    // make sure the lastUpdated notification change uploads, too
                    app.getSync().getSession(config).uploadAllLocalChanges(
                            10000, TimeUnit.MILLISECONDS);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                Log.v("EXAMPLE", "Synced onion count: "
                        + realm.where(OnionJava.class).findAll().size());
                Log.v("EXAMPLE", "Synced potato count: "
                        + realm.where(PotatoJava.class).findAll().size());
                Log.v("EXAMPLE", "Synced rice count: "
                        + realm.where(RiceJava.class).findAll().size());

                Log.v("EXAMPLE", "Before going offline. Last synced: " +
                        realm.where(LastSyncedJava.class).findFirst().getTimestamp());

                // disable sync
                app.getSync().getOrCreateSession(config).stop();

                // insert objects while "offline" -- multiple, in case re-connecting later for the
                // client reset starts syncing some of them
                for(int i = 0; i < 100; i++) {
                    realm.executeTransaction(transactionRealm -> {
                        realm.createObject(OnionJava.class, new ObjectId())
                                .setVarietal("red " + getRandomPartition());
                        realm.createObject(PotatoJava.class, new ObjectId())
                                .setSpecies("yukon white " + getRandomPartition());
                        realm.createObject(RiceJava.class, new ObjectId())
                                .setStyle("basmati " + getRandomPartition());
                    });
                }

                // execute updates and deletes
                realm.executeTransaction(transactionRealm -> {
                    realm.where(PotatoJava.class).findFirst().setSpecies("yukon gold");
                    RiceJava deletedRice = realm.where(RiceJava.class).findFirst();
                    deletedObjId = deletedRice.getId();
                    Log.v("EXAMPLE", "Deleted rice lastUpdated: "
                            + deletedRice.getLastUpdated());
                    deletedRice.deleteFromRealm();
                });

                Log.v("EXAMPLE", "Including unsynced onion count: "
                        + realm.where(OnionJava.class).findAll().size());
                Log.v("EXAMPLE", "Including unsynced potato count: "
                        + realm.where(PotatoJava.class).findAll().size());
                Log.v("EXAMPLE", "Including unsynced rice count: "
                        + realm.where(RiceJava.class).findAll().size());

                Log.v("EXAMPLE", "After working offline. Last synced: " +
                        realm.where(LastSyncedJava.class).findFirst().getTimestamp() +
                        ", Current time millis: " + System.currentTimeMillis());

                realm.close();
                // :remove-start:
                setupExpectation.fulfill();
                // :remove-end:
            });
            try {
                executor.awaitTermination(10000, TimeUnit.MILLISECONDS);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            Log.v("EXAMPLE", "Finished executing test setup.");
        });
        setupExpectation.await();
    }

    // :snippet-start: handle-manual-reset
    public void handleManualReset(App app, SyncSession session, ClientResetRequiredError error) {
        Log.w("EXAMPLE", "Beginning manual reset recovery.");

        // Close all instances of the realm -- this application only uses one
        globalRealm.close();

        try {
            Log.w("EXAMPLE", "About to execute the client reset.");
            // Move the realm to a backup file -- execute the client reset
            error.executeClientReset();
            Log.w("EXAMPLE", "Executed the client reset.");
        } catch (IllegalStateException e) {
            Log.e("EXAMPLE", "Failed to execute the client reset: " + e.getMessage());

            // The client reset can only proceed if there are no open realms.
            // if execution failed, ask the user to restart the app, and we'll client reset
            // when we first open the app connection.
            AlertDialog restartDialog = new AlertDialog.Builder(activity)
                    .setMessage("Sync error. Restart the application to resume sync.")
                    .setTitle("Restart to Continue")
                    .create();
            restartDialog.show();
        }

        // Open new instance of the realm. This initializes a new file for the new realm
        // and downloads the backend state. Do this in a background thread so we can wait
        // for server changes to fully download.
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            Realm newRealm = Realm.getInstance(globalConfig);

            // Download all realm data from the backend -- ensure that the backend state is
            // fully downloaded before proceeding
            try {
                app.getSync().getSession(globalConfig).downloadAllServerChanges(10000,
                        TimeUnit.MILLISECONDS);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            Log.w("EXAMPLE", "Opened a fresh instance of the realm.");

            // Open the the realm backup -- as a dynamic realm
            // (no formal schema; access all data through field lookups)
            DynamicRealm backupRealm = DynamicRealm.getInstance(error.getBackupRealmConfiguration());
            Log.w("EXAMPLE", "Opened the backup realm.");

            // To only migrate unsynced data,
            // you'll need to know the last time the realm synced.
            // you can keep track of successful sync connections
            // locally in an object in the realm
            DynamicRealmObject lastSuccessfulSynced =
                    backupRealm.where("LastSyncedJava").findFirst();
            Long lastSuccessfulSyncTime =
                    lastSuccessfulSynced.getLong("timestamp");

            // Migrate unsynced changes: move data from the backup
            // instance of the realm to the new "fresh" instance fetched from the backend.
            // This includes:
            // - copying any objects that updated, but didn't sync from the
            // backup realm to the new realm.
            // - re-deleting any objects that were deleted locally while we were offline

            // Insert any unsynced updated objects to the new realm
            // NOTE: this will overwrite any changes made by other clients
            // to those objects since the last sync.
            // Applications that require finer-grained conflict resolution
            // should use custom logic instead.
            // This example keeps track of when the object last updated by also writing
            // to a "lastUpdated" field on write operations.
            RealmQuery<DynamicRealmObject> potatoQuery =
                    backupRealm.where("PotatoJava")
                            .greaterThan("lastUpdated", lastSuccessfulSyncTime);
            RealmQuery<DynamicRealmObject> onionQuery =
                    backupRealm.where("OnionJava")
                            .greaterThan("lastUpdated", lastSuccessfulSyncTime);
            RealmQuery<DynamicRealmObject> riceQuery =
                    backupRealm.where("RiceJava")
                            .greaterThan("lastUpdated", lastSuccessfulSyncTime);

            // insert the backup version of all unsynced object updates + creates into the new realm
            // NOTE: this process will overwrite writes from other clients, potentially overwriting
            // data in fields not modified in the backup realm. Use with caution. If this does not
            // meet your application's needs, consider keeping track of the last write for each
            // field individually (and recovering them individually, per-field).
            for(DynamicRealmObject potato : potatoQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + potato.getString("species"));
                newRealm.executeTransaction(transactionRealm ->
                        transactionRealm.insertOrUpdate(new PotatoJava(potato)));
            }
            for(DynamicRealmObject onion : onionQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + onion.getString("varietal"));
                newRealm.executeTransaction(transactionRealm ->
                        transactionRealm.insertOrUpdate(new OnionJava(onion)));
            }
            for(DynamicRealmObject rice : riceQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + rice.getString("style"));
                newRealm.executeTransaction(transactionRealm ->
                        transactionRealm.insertOrUpdate(new RiceJava(rice)));
            }

            // re-delete unsynced deletions from the new realm
            // caveat: if an object has been updated SINCE the last update from this client,
            // (from another client) this does not delete that object. This doesn't match
            // realm's usual "deletes always win" behavior but it isn't possible to
            // distinguish between:
            // - objects that were deleted from this client after the last sync
            // - objects that were created by another client after the last sync
            // So instead of deleting innocent objects created by other clients, we let
            // other client updates "win" in this case.
            // This means that previously deleted (but unsynced) objects could reappear on this
            // client after the client reset event.

            // get all the ids of objects that haven't been updated since the last client sync
            // (anything that's been updated since the last sync should not be deleted)
            // -- could be new object, or an object this client deleted but another client modified
            Set<ObjectId> allNewPotatoIds = newRealm.where(PotatoJava.class)
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream().map(PotatoJava::getId).collect(Collectors.toSet());
            Set<ObjectId> allNewOnionIds = newRealm.where(OnionJava.class)
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream().map(OnionJava::getId).collect(Collectors.toSet());
            Set<ObjectId> allNewRiceIds = newRealm.where(RiceJava.class)
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream().map(RiceJava::getId).collect(Collectors.toSet());

            Log.v("EXAMPLE", "number of potatoes in fresh realm" +
                    "that have not been updated since last sync: " + allNewPotatoIds.size());
            Log.v("EXAMPLE", "number of onions in fresh realm" +
                    "that have not been updated since last sync: " + allNewOnionIds.size());
            Log.v("EXAMPLE", "number of rices in fresh realm" +
                    "that have not been updated since last sync: " + allNewRiceIds.size());

            // get all the ids of objects in the backup realm
            Set<ObjectId> allOldPotatoIds = backupRealm.where("PotatoJava")
                    .findAll().stream().map(obj -> obj.getObjectId("_id"))
                    .collect(Collectors.toSet());
            Set<ObjectId> allOldOnionIds = backupRealm.where("OnionJava")
                    .findAll().stream().map(obj -> obj.getObjectId("_id"))
                    .collect(Collectors.toSet());
            Set<ObjectId> allOldRiceIds = backupRealm.where("RiceJava")
                    .findAll().stream().map(obj -> obj.getObjectId("_id"))
                    .collect(Collectors.toSet());

            Log.v("EXAMPLE", "number of potatoes in the old realm: " +
                    allOldPotatoIds.size());
            Log.v("EXAMPLE", "number of onions in the old realm: " +
                    allOldOnionIds.size());
            Log.v("EXAMPLE", "number of rices in the old realm: " +
                    allOldRiceIds.size());

            // Get the set of:
            // all objects in the new realm
            // - that have not been updated since last sync
            // - that are not in the backup realm
            // Those objects were deleted from the backup realm sometime after the last sync.
            Set<ObjectId> unsyncedPotatoDeletions = allNewPotatoIds.stream()
                    .filter(((Predicate<ObjectId>)(allOldPotatoIds::contains)).negate())
                    .collect(Collectors.toSet());
            Set<ObjectId> unsyncedOnionDeletions = allNewOnionIds.stream()
                    .filter(((Predicate<ObjectId>)(allOldOnionIds::contains)).negate())
                    .collect(Collectors.toSet());
            Set<ObjectId> unsyncedRiceDeletions = allNewRiceIds.stream()
                    .filter(((Predicate<ObjectId>)(allOldRiceIds::contains)).negate())
                    .collect(Collectors.toSet());

            Log.v("EXAMPLE", "Number of potatos to re-delete: "
                    + unsyncedPotatoDeletions.size());
            Log.v("EXAMPLE", "Number of onions to re-delete: "
                    + unsyncedOnionDeletions.size());
            Log.v("EXAMPLE", "Number of rices to re-delete: "
                    + unsyncedRiceDeletions.size());

            // perform "re-deletions"
            for(ObjectId id: unsyncedPotatoDeletions) {
                Log.w("EXAMPLE", "Deleting " + unsyncedPotatoDeletions.size()
                        + " potato objects.");
                newRealm.executeTransaction(transactionRealm -> {
                    transactionRealm.where(PotatoJava.class).equalTo("_id", id)
                            .findAll().deleteAllFromRealm();
                });
            }

            for(ObjectId id: unsyncedOnionDeletions) {
                Log.w("EXAMPLE", "Deleting " + unsyncedOnionDeletions.size()
                        + " onion objects.");
                newRealm.executeTransaction(transactionRealm -> {
                    transactionRealm.where(OnionJava.class).equalTo("_id", id)
                            .findAll().deleteAllFromRealm();
                });
            }

            for(ObjectId id: unsyncedRiceDeletions) {
                Log.w("EXAMPLE", "Deleting " + unsyncedRiceDeletions.size()
                        + " rice objects.");
                newRealm.executeTransaction(transactionRealm -> {
                    transactionRealm.where(RiceJava.class).equalTo("_id", id)
                            .findAll().deleteAllFromRealm();
                });
            }

            // Output the state of the freshly downloaded realm, after recovering local data.
            Log.v("EXAMPLE", "Number of potato objects in the new realm: "
                    + newRealm.where(PotatoJava.class).findAll().size());
            Log.v("EXAMPLE", "Number of onion objects in the new realm: "
                    + newRealm.where(OnionJava.class).findAll().size());
            Log.v("EXAMPLE", "Number of rice objects in the new realm: "
                    + newRealm.where(RiceJava.class).findAll().size());

            // close the realms
            backupRealm.close();
            newRealm.close();
            expectation.fulfill(); // :remove:
        });

        // execute the recovery logic on a background thread
        try {
            executor.awaitTermination(20000, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    // :snippet-end:

    @Test
    public void clientResetDiscardUnsyncedChanges() {
        // :snippet-start: client-reset-discard-unsynced-changes
        String appID = YOUR_APP_ID; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID)
            .defaultSyncClientResetStrategy(new DiscardUnsyncedChangesStrategy() {
                @Override
                public void onBeforeReset(Realm realm) {
                    Log.w("EXAMPLE", "Beginning client reset for " + realm.getPath());
                }

                @Override
                public void onAfterReset(Realm before, Realm after) {
                    Log.w("EXAMPLE", "Finished client reset for " + before.getPath());
                    // :remove-start:
                    // if we made it this far without error, exit the test successfully
                    expectation.fulfill();
                    // :remove-end:
                }

                @Override
                public void onError(SyncSession session, ClientResetRequiredError error) {
                    Log.e("EXAMPLE", "Couldn't handle the client reset automatically." +
                            " Falling back to manual recovery: " + error.getErrorMessage());
                    handleManualReset(session.getUser().getApp(), session, error);
                }
            })
            .build());
        // :snippet-end:

        Credentials anonymousCredentials = Credentials.anonymous();
        User user = app.login(anonymousCredentials);

        SyncConfiguration config = new SyncConfiguration.Builder(user, PARTITION)
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
                .build();

        setupData(app, config, user);

        activity.runOnUiThread (() -> {
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm;

                    // need a reference to the config in the client reset handler
                    globalConfig = config;

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    app.getSync().getOrCreateSession(config);
                    Log.v("EXAMPLE", "Sessions open: " + app.getSync().getAllSessions().size());

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(app.getSync(),
                            app.getSync().getOrCreateSession(config));
                }

                @Override
                public void onError(Throwable exception) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.getMessage());
                    super.onError(exception);
                }
            });
        });
        expectation.await();
    }

    @Test
    public void clientResetManuallyRecoverUnsyncedChanges() {
        // :snippet-start: client-reset-manually-recover-unsynced-changes
        String appID = YOUR_APP_ID; // replace this with your App ID
        final App app = new App(new AppConfiguration.Builder(appID)
            .defaultSyncClientResetStrategy(new ManuallyRecoverUnsyncedChangesStrategy() {
                @Override
                public void onClientReset(SyncSession session, ClientResetRequiredError error) {
                    Log.v("EXAMPLE", "Executing manual client reset handler");
                    handleManualReset(session.getUser().getApp(), session, error);
                }
            })
            .build());
        // :snippet-end:

        Credentials anonymousCredentials = Credentials.anonymous();
        User user = app.login(anonymousCredentials);

        final SyncConfiguration config = new SyncConfiguration.Builder(user, PARTITION)
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
                .build();

        setupData(app, config, user);

        activity.runOnUiThread (() -> {
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm;

                    // need a reference to the config in the client reset handler
                    globalConfig = config;

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    app.getSync().getOrCreateSession(config);
                    Log.v("EXAMPLE", "Sessions open: " + app.getSync().getAllSessions().size());

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(app.getSync(),
                            app.getSync().getOrCreateSession(config));
                }

                @Override
                public void onError(Throwable exception) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.getMessage());
                    super.onError(exception);
                }
            });
        });
    }

    @Test
    public void clientResetDiscardUnsyncedChangesWithSimpleManualFallback() {
        // :snippet-start: client-reset-discard-unsynced-changes-with-simple-manual-fallback
        String appID = YOUR_APP_ID; // replace this with your App ID
        App app = null;
        AtomicReference<App> globalApp = new AtomicReference<>(app);
        // accessing the app from within the lambda below requires an effectively final object
        app = new App(new AppConfiguration.Builder(appID)
                .defaultSyncClientResetStrategy(new DiscardUnsyncedChangesStrategy() {
                    @Override
                    public void onBeforeReset(Realm realm) {
                        Log.w("EXAMPLE", "Beginning client reset for " + realm.getPath());
                    }

                    @Override
                    public void onAfterReset(Realm before, Realm after) {
                        Log.w("EXAMPLE", "Finished client reset for " + before.getPath());
                        // :remove-start:
                        // if we made it this far without error, exit the test successfully
                        expectation.fulfill();
                        // :remove-end:
                    }

                    @Override
                    public void onError(SyncSession session, ClientResetRequiredError error) {
                        Log.e("EXAMPLE", "Couldn't handle the client reset automatically." +
                                " Falling back to manual client reset execution: "
                                + error.getErrorMessage());
                        // close all instances of your realm -- this application only uses one
                        globalRealm.close();

                        try {
                            Log.w("EXAMPLE", "About to execute the client reset.");
                            // execute the client reset, moving the current realm to a backup file
                            error.executeClientReset();
                            Log.w("EXAMPLE", "Executed the client reset.");
                        } catch (IllegalStateException e) {
                            Log.e("EXAMPLE", "Failed to execute the client reset: " + e.getMessage());

                            // The client reset can only proceed if there are no open realms.
                            // if execution failed, ask the user to restart the app, and we'll client reset
                            // when we first open the app connection.
                            AlertDialog restartDialog = new AlertDialog.Builder(activity)
                                    .setMessage("Sync error. Restart the application to resume sync.")
                                    .setTitle("Restart to Continue")
                                    .create();
                            restartDialog.show();
                        }

                        // open a new instance of the realm. This initializes a new file for the new realm
                        // and downloads the backend state. Do this in a background thread so we can wait
                        // for server changes to fully download.
                        ExecutorService executor = Executors.newSingleThreadExecutor();
                        executor.execute(() -> {
                            Realm newRealm = Realm.getInstance(globalConfig);

                            // ensure that the backend state is fully downloaded before proceeding
                            try {
                                globalApp.get().getSync().getSession(globalConfig).downloadAllServerChanges(10000,
                                        TimeUnit.MILLISECONDS);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }

                            Log.w("EXAMPLE",
                                    "Downloaded server changes for a fresh instance of the realm.");

                            newRealm.close();
                            expectation.fulfill(); // :remove:
                        });

                        // execute the recovery logic on a background thread
                        try {
                            executor.awaitTermination(20000, TimeUnit.MILLISECONDS);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                })
                .build());
        globalApp.set(app);
        // :snippet-end:

        Credentials anonymousCredentials = Credentials.anonymous();
        User user = app.login(anonymousCredentials);

        SyncConfiguration config = new SyncConfiguration.Builder(user, PARTITION)
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
                .build();

        setupData(app, config, user);

        activity.runOnUiThread (() -> {
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm;

                    // need a reference to the config in the client reset handler
                    globalConfig = config;

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    globalApp.get().getSync().getOrCreateSession(config);
                    Log.v("EXAMPLE", "Sessions open: " + globalApp.get().getSync().getAllSessions().size());

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(globalApp.get().getSync(),
                            globalApp.get().getSync().getOrCreateSession(config));
                }

                @Override
                public void onError(Throwable exception) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.getMessage());
                    super.onError(exception);
                }
            });
        });
        expectation.await();
    }
}
// :replace-end: