package com.mongodb.realm.examples.kotlin

import android.app.AlertDialog
import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.java.LastSynced
import com.mongodb.realm.examples.model.java.Onion
import com.mongodb.realm.examples.model.java.Potato
import com.mongodb.realm.examples.model.java.Rice
import io.realm.DynamicRealm
import io.realm.DynamicRealmObject
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.ClientResetRequiredError
import io.realm.mongodb.sync.DiscardUnsyncedChangesStrategy
import io.realm.mongodb.sync.Progress
import io.realm.mongodb.sync.ProgressMode
import io.realm.mongodb.sync.SimulateClientResetCaller
import io.realm.mongodb.sync.SyncConfiguration
import io.realm.mongodb.sync.SyncSession
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference
import java.util.function.Predicate
import java.util.stream.Collectors
import org.bson.types.ObjectId
import org.junit.Before
import org.junit.Test

class ClientResetTest : RealmTest() {
    var PARTITION: String? = null
    var globalRealm: Realm? = null
    var expectation: Expectation? = null // global expectation for manual mode to use
    var deletedObjId: ObjectId? = null
    var globalConfig: SyncConfiguration? = null

    @Before
    fun setup() {
        expectation = Expectation()
        PARTITION = getRandomPartition()
    }

    fun setupData(app: App, config: SyncConfiguration?, user: User?) {
        val setupExpectation = Expectation()
        activity!!.runOnUiThread {
            Log.v("EXAMPLE", "Successfully authenticated anonymously.")

            val executor =
                Executors.newSingleThreadExecutor()
            executor.execute {
                val realm = Realm.getInstance(config)

                // create an initial "last synced" timestamp singleton
                realm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.createObject(
                        LastSynced::class.java,
                        ObjectId()
                    ).timestamp = System.currentTimeMillis()
                }
                Log.v(
                    "EXAMPLE",
                    "Successfully opened a realm for initial test data setup."
                )

                // :snippet-start: keep-track-of-last-synced-time
                // use a "last synced" singleton in the realm to keep track of when the
                // realm last successfully completed a sync
                app.sync.getSession(config)
                    .addUploadProgressListener(ProgressMode.INDEFINITELY) { progress: Progress ->
                        // get the last synced time. Create an instance if it does not already exist.
                        val notificationRealm = Realm.getInstance(config)
                        val lastSynced =
                            notificationRealm.where(LastSynced::class.java).findFirst()
                        if (lastSynced == null) {
                            notificationRealm.executeTransaction { transactionRealm: Realm ->
                                transactionRealm.createObject(
                                    LastSynced::class.java,
                                    ObjectId()
                                ).timestamp = System.currentTimeMillis()
                            }
                        }

                        // only update the "last synced" time when ALL client data has uploaded
                        // avoid repeatedly setting "last synced" every time we update "last synced"
                        // by checking if the current "last synced" time was within the last 10ms
                        if (progress.isTransferComplete &&
                            System.currentTimeMillis() > lastSynced?.timestamp?.plus(10) ?: 0
                        ) {
                            notificationRealm.executeTransaction { transactionRealm: Realm ->
                                transactionRealm.where(LastSynced::class.java)
                                    .findFirst()
                                    ?.timestamp = System.currentTimeMillis()
                                Log.v(
                                    "EXAMPLE", "Updating last synced time to: "
                                            + System.currentTimeMillis()
                                )
                            }
                            Log.v(
                                "EXAMPLE", "Updated last synced time to: " +
                                        lastSynced!!.timestamp
                            )
                        }
                        notificationRealm.close()
                    }
                // :snippet-end:

                // insert some objects into the realm
                realm.executeTransaction { transactionRealm: Realm? ->
                    val onion = realm.createObject(
                        Onion::class.java, ObjectId()
                    )
                    val potato =
                        realm.createObject(
                            Potato::class.java,
                            ObjectId()
                        )
                    val rice =
                        realm.createObject(
                            Rice::class.java,
                            ObjectId()
                        )
                }

                // force the writes to upload
                try {
                    app.sync.getSession(config)
                        .uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS)
                    // make sure the lastUpdated notification change uploads, too
                    app.sync.getSession(config)
                        .uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
                Log.v(
                    "EXAMPLE", "Synced onion count: "
                            + realm.where(Onion::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "Synced potato count: "
                            + realm.where(Potato::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "Synced rice count: "
                            + realm.where(Rice::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "Before going offline. Last synced: " +
                            realm.where(LastSynced::class.java).findFirst()!!
                                .timestamp
                )

                // disable sync
                app.sync.getOrCreateSession(config).stop()

                // insert objects while "offline"
                for (i in 0..99) {
                    // do it a lot because otherwise the changes
                        // could all sync when we open the realm later
                    realm.executeTransaction { transactionRealm: Realm? ->
                        realm.createObject(
                            Onion::class.java,
                            ObjectId()
                        )
                            .varietal = "red " + getRandomPartition()
                        realm.createObject(
                            Potato::class.java,
                            ObjectId()
                        ).species = "yukon white " + getRandomPartition()
                        realm.createObject(
                            Rice::class.java,
                            ObjectId()
                        ).style = "basmati " + getRandomPartition()
                    }
                }

                // execute updates and deletes
                realm.executeTransaction { transactionRealm: Realm? ->
                    realm.where(Potato::class.java).findFirst()!!.species =
                        "yukon gold"
                    val deletedRice =
                        realm.where(Rice::class.java).findFirst()
                    deletedObjId = deletedRice!!._id
                    Log.v(
                        "EXAMPLE",
                        "Deleted rice lastUpdated: " + deletedRice.lastUpdated
                    )
                    deletedRice.deleteFromRealm()
                }
                Log.v(
                    "EXAMPLE", "Including unsynced onion count: "
                            + realm.where(Onion::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "Including unsynced potato count: "
                            + realm.where(Potato::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "Including unsynced rice count: "
                            + realm.where(Rice::class.java).findAll().size
                )
                Log.v(
                    "EXAMPLE", "After working offline. Last synced: " +
                            realm.where(LastSynced::class.java).findFirst()!!
                                .timestamp +
                            ", Current time millis: " + System.currentTimeMillis()
                )
                realm.close()
                setupExpectation.fulfill()
            }
            try {
                executor.awaitTermination(10000, TimeUnit.MILLISECONDS)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
            Log.v("EXAMPLE", "Finished executing test setup.")
        }
        setupExpectation.await()
    }

    // :snippet-start: handle-manual-reset
    fun handleManualReset(app: App, session: SyncSession?, error: ClientResetRequiredError) {
        Log.w("EXAMPLE", "Beginning manual reset recovery.")

        // Close all instances of the realm -- this application only uses one
        globalRealm!!.close()

        try {
            Log.w("EXAMPLE", "About to execute the client reset.")
            // Move the realm to a backup file: execute the client reset
            error.executeClientReset()
            Log.w("EXAMPLE", "Executed the client reset.")
        } catch (e: IllegalStateException) {
            Log.e("EXAMPLE", "Failed to execute the client reset: " + e.message)

            // The client reset can only proceed if there are no open realms.
            // if execution failed, ask the user to restart the app, and we'll client reset
            // when we first open the app connection.
            val restartDialog = AlertDialog.Builder(activity)
                .setMessage("Sync error. Restart the application to resume sync.")
                .setTitle("Restart to Continue")
                .create()
            restartDialog.show()
        }

        // Open new instance of the realm. This initializes a new file for the new realm
        // and downloads the backend state. Do this in a background thread so we can wait
        // for server changes to fully download.
        val executor = Executors.newSingleThreadExecutor()
        executor.execute {
            val newRealm = Realm.getInstance(globalConfig)

            // Download all realm data from the backend -- ensure that the backend state is
            // fully downloaded before proceeding
            try {
                app.sync.getSession(globalConfig)
                    .downloadAllServerChanges(10000, TimeUnit.MILLISECONDS)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
            Log.w("EXAMPLE", "Opened a fresh instance of the realm.")

            // Open the the realm backup -- as a dynamic realm
            // (no formal schema; access all data through field lookups)
            val backupRealm =
                DynamicRealm.getInstance(error.backupRealmConfiguration)
            Log.w("EXAMPLE", "Opened the backup realm.")

            // To only migrate unsynced data,
            // you'll need to know the last time the realm synced.
            // you can keep track of successful sync connections
            // locally in an object in the realm
            val lastSuccessfulSynced =
                backupRealm.where("LastSynced").findFirst()
            val lastSuccessfulSyncTime = lastSuccessfulSynced!!.getLong("timestamp")

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
            val potatoQuery = backupRealm.where("Potato")
                .greaterThan("lastUpdated", lastSuccessfulSyncTime)
            val onionQuery = backupRealm.where("Onion")
                .greaterThan("lastUpdated", lastSuccessfulSyncTime)
            val riceQuery = backupRealm.where("Rice")
                .greaterThan("lastUpdated", lastSuccessfulSyncTime)

            // insert the backup version of all unsynced object updates + creates into the new realm
            // NOTE: this process will overwrite writes from other clients, potentially overwriting
            // data in fields not modified in the backup realm. Use with caution. If this does not
            // meet your application's needs, consider keeping track of the last write for each
            // field individually (and recovering them individually, per-field).
            for (potato in potatoQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + potato.getString("species"))
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.insertOrUpdate(
                        Potato(potato)
                    )
                }
            }
            for (onion in onionQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + onion.getString("varietal"))
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.insertOrUpdate(
                        Onion(onion)
                    )
                }
            }
            for (rice in riceQuery.findAll()) {
                Log.w("EXAMPLE", "Inserting: " + rice.getString("style"))
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.insertOrUpdate(
                        Rice(rice)
                    )
                }
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
            val allNewPotatoIds =
                newRealm.where(
                    Potato::class.java
                )
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream()
                    .map { obj: Potato -> obj._id }
                    .collect(Collectors.toSet())
            val allNewOnionIds =
                newRealm.where(
                    Onion::class.java
                )
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream()
                    .map { obj: Onion -> obj._id }
                    .collect(Collectors.toSet())
            val allNewRiceIds =
                newRealm.where(
                    Rice::class.java
                )
                    .lessThan("lastUpdated", lastSuccessfulSyncTime)
                    .findAll().stream()
                    .map { obj: Rice -> obj._id }
                    .collect(Collectors.toSet())
            Log.v(
                "EXAMPLE", "number of potatoes in fresh realm" +
                        "that have not been updated since last sync: " + allNewPotatoIds.size
            )
            Log.v(
                "EXAMPLE", "number of onions in fresh realm" +
                        "that have not been updated since last sync: " + allNewOnionIds.size
            )
            Log.v(
                "EXAMPLE", "number of rices in fresh realm" +
                        "that have not been updated since last sync: " + allNewRiceIds.size
            )

            // get all the ids of objects in the backup realm
            val allOldPotatoIds =
                backupRealm.where("Potato")
                    .findAll().stream()
                    .map { obj: DynamicRealmObject ->
                        obj.getObjectId(
                            "_id"
                        )
                    }
                    .collect(Collectors.toSet())
            val allOldOnionIds =
                backupRealm.where("Onion")
                    .findAll().stream()
                    .map { obj: DynamicRealmObject ->
                        obj.getObjectId(
                            "_id"
                        )
                    }
                    .collect(Collectors.toSet())
            val allOldRiceIds =
                backupRealm.where("Rice")
                    .findAll().stream()
                    .map { obj: DynamicRealmObject ->
                        obj.getObjectId(
                            "_id"
                        )
                    }
                    .collect(Collectors.toSet())
            Log.v("EXAMPLE", "number of potatoes in the backup realm: " +
                    allOldPotatoIds.size)
            Log.v("EXAMPLE", "number of onions in the backup realm: " +
                    allOldOnionIds.size)
            Log.v("EXAMPLE", "number of rices in the backup realm: " +
                    allOldRiceIds.size)

            // Get the set of:
            // all objects in the new realm
            // - that have not been updated since last sync
            // - that are not in the backup realm
            // Those objects were deleted from the backup realm sometime after the last sync.
            val unsyncedPotatoDeletions =
                allNewPotatoIds.stream()
                    .filter(Predicate { o: ObjectId ->
                        allOldPotatoIds.contains(o)
                    }.negate())
                    .collect(Collectors.toSet())
            val unsyncedOnionDeletions =
                allNewOnionIds.stream()
                    .filter(Predicate { o: ObjectId ->
                        allOldOnionIds.contains(o)
                    }.negate())
                    .collect(Collectors.toSet())
            val unsyncedRiceDeletions =
                allNewRiceIds.stream()
                    .filter(Predicate { o: ObjectId ->
                        allOldRiceIds.contains(o)
                    }.negate())
                    .collect(Collectors.toSet())

            Log.v("EXAMPLE", "Number of potatos to re-delete: "
                    + unsyncedPotatoDeletions.size)
            Log.v("EXAMPLE", "Number of onions to re-delete: "
                    + unsyncedOnionDeletions.size)
            Log.v("EXAMPLE", "Number of rices to re-delete: "
                    + unsyncedRiceDeletions.size)

            // perform "re-deletions"
            for (id in unsyncedPotatoDeletions) {
                Log.w(
                    "EXAMPLE",
                    "Deleting " + unsyncedPotatoDeletions.size + " potato objects."
                )
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.where(
                        Potato::class.java
                    ).equalTo("_id", id).findAll().deleteAllFromRealm()
                }
            }
            for (id in unsyncedOnionDeletions) {
                Log.w(
                    "EXAMPLE",
                    "Deleting " + unsyncedOnionDeletions.size + " onion objects."
                )
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.where(
                        Onion::class.java
                    ).equalTo("_id", id).findAll().deleteAllFromRealm()
                }
            }
            for (id in unsyncedRiceDeletions) {
                Log.w(
                    "EXAMPLE",
                    "Deleting " + unsyncedRiceDeletions.size + " rice objects."
                )
                newRealm.executeTransaction { transactionRealm: Realm ->
                    transactionRealm.where(
                        Rice::class.java
                    ).equalTo("_id", id).findAll().deleteAllFromRealm()
                }
            }

            // Output the state of the freshly downloaded realm, after recovering local data.
            Log.v(
                "EXAMPLE", "Number of potato objects in the new realm: "
                        + newRealm.where(
                    Potato::class.java
                ).findAll().size
            )
            Log.v(
                "EXAMPLE", "Number of onion objects in the new realm: "
                        + newRealm.where(
                    Onion::class.java
                ).findAll().size
            )
            Log.v(
                "EXAMPLE", "Number of rice objects in the new realm: "
                        + newRealm.where(
                    Rice::class.java
                ).findAll().size
            )

            // close the realms
            backupRealm.close()
            newRealm.close()
            expectation!!.fulfill() // :remove:
        }

        // execute the recovery logic on a background thread
        try {
            executor.awaitTermination(20000, TimeUnit.MILLISECONDS)
        } catch (e: InterruptedException) {
            e.printStackTrace()
        }
    }
    // :snippet-end:

    @Test
    fun clientResetDiscardUnsyncedChanges() {
        // :snippet-start: client-reset-discard-unsynced-changes
        val appID: String = YOUR_APP_ID // replace this with your App ID
        val app = App(
            AppConfiguration.Builder(appID)
                .defaultSyncClientResetStrategy(object : DiscardUnsyncedChangesStrategy {
                    override fun onBeforeReset(realm: Realm) {
                        Log.w("EXAMPLE", "Beginning client reset for " + realm.path)
                    }

                    override fun onAfterReset(before: Realm, after: Realm) {
                        Log.w("EXAMPLE", "Finished client reset for " + before.path)
                        // :remove-start:
                        // if we made it this far without error, exit the test successfully
                        expectation!!.fulfill()
                        // :remove-end:
                    }

                    override fun onError(session: SyncSession, error: ClientResetRequiredError) {
                        Log.e(
                            "EXAMPLE", "Couldn't handle the client reset automatically." +
                                    " Falling back to manual recovery: " + error.errorMessage
                        )
                        handleManualReset(session.user.app, session, error)
                    }
                })
                .build()
        )
        // :snippet-end:
        val anonymousCredentials = Credentials.anonymous()
        val user = app.login(anonymousCredentials)
        val config = SyncConfiguration.Builder(user, PARTITION)
            .allowQueriesOnUiThread(true)
            .allowWritesOnUiThread(true)
            .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
            .build()
        setupData(app, config, user)
        activity!!.runOnUiThread {
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    app.sync.getOrCreateSession(config)
                    Log.v(
                        "EXAMPLE",
                        "Sessions open: " + app.sync.allSessions.size
                    )

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(
                        app.sync,
                        app.sync.getOrCreateSession(config)
                    )
                }

                override fun onError(exception: Throwable) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.message)
                    super.onError(exception)
                }
            })
        }
        expectation!!.await()
    }

    @Test
    fun clientResetManuallyRecoverUnsyncedChanges() {
        // :snippet-start: client-reset-manually-recover-unsynced-changes
        val appID: String = YOUR_APP_ID // replace this with your App ID
        val app = App(AppConfiguration.Builder(appID)
            .defaultSyncClientResetStrategy { session, error ->
                Log.v("EXAMPLE", "Executing manual client reset handler")
                handleManualReset(session.user.app, session, error)
            }
            .build())
        // :snippet-end:
        val anonymousCredentials = Credentials.anonymous()
        val user = app.login(anonymousCredentials)
        val config = SyncConfiguration.Builder(user, PARTITION)
            .allowQueriesOnUiThread(true)
            .allowWritesOnUiThread(true)
            .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
            .build()
        setupData(app, config, user)
        activity!!.runOnUiThread {
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm

                    // need a reference to the config in the client reset handler
                    globalConfig = config

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    app.sync.getOrCreateSession(config)
                    Log.v(
                        "EXAMPLE",
                        "Sessions open: " + app.sync.allSessions.size
                    )

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(
                        app.sync,
                        app.sync.getOrCreateSession(config)
                    )
                }

                override fun onError(exception: Throwable) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.message)
                    super.onError(exception)
                }
            })
        }
        expectation!!.await(42000) // long timeout because manual recovery can take a while
        // (dynamic realms are slooooooooow)
    }

    @Test
    fun clientResetDiscardUnsyncedChangesWithSimpleManualFallback() {
        // :snippet-start: client-reset-discard-unsynced-changes-with-simple-manual-fallback
        val appID = YOUR_APP_ID // replace this with your App ID
        var app: App? = null
        app = App(
            AppConfiguration.Builder(appID)
                .defaultSyncClientResetStrategy(object : DiscardUnsyncedChangesStrategy {
                    override fun onBeforeReset(realm: Realm) {
                        Log.w("EXAMPLE", "Beginning client reset for " + realm.path)
                    }

                    override fun onAfterReset(before: Realm, after: Realm) {
                        Log.w("EXAMPLE", "Finished client reset for " + before.path)
                        // :remove-start:
                        // if we made it this far without error, exit the test successfully
                        expectation!!.fulfill()
                        // :remove-end:
                    }

                    override fun onError(session: SyncSession, error: ClientResetRequiredError) {
                        Log.e(
                            "EXAMPLE", "Couldn't handle the client reset automatically." +
                                    " Falling back to manual client reset execution: "
                                    + error.errorMessage
                        )
                        // close all instances of your realm -- this application only uses one
                        globalRealm!!.close()
                        try {
                            Log.w("EXAMPLE", "About to execute the client reset.")
                            // execute the client reset, moving the current realm to a backup file
                            error.executeClientReset()
                            Log.w("EXAMPLE", "Executed the client reset.")
                        } catch (e: java.lang.IllegalStateException) {
                            Log.e("EXAMPLE", "Failed to execute the client reset: " + e.message)

                            // The client reset can only proceed if there are no open realms.
                            // if execution failed, ask the user to restart the app, and we'll client reset
                            // when we first open the app connection.
                            val restartDialog = AlertDialog.Builder(activity)
                                .setMessage("Sync error. Restart the application to resume sync.")
                                .setTitle("Restart to Continue")
                                .create()
                            restartDialog.show()
                        }

                        // open a new instance of the realm. This initializes a new file for the new realm
                        // and downloads the backend state. Do this in a background thread so we can wait
                        // for server changes to fully download.
                        val executor = Executors.newSingleThreadExecutor()
                        executor.execute {
                            val newRealm = Realm.getInstance(globalConfig)

                            // ensure that the backend state is fully downloaded before proceeding
                            try {
                                app!!.sync.getSession(globalConfig)
                                    .downloadAllServerChanges(
                                        10000,
                                        TimeUnit.MILLISECONDS
                                    )
                            } catch (e: InterruptedException) {
                                e.printStackTrace()
                            }
                            Log.w(
                                "EXAMPLE",
                                "Downloaded server changes for a fresh instance of the realm."
                            )
                            newRealm.close()
                            expectation!!.fulfill() // :remove:
                        }

                        // execute the recovery logic on a background thread
                        try {
                            executor.awaitTermination(20000, TimeUnit.MILLISECONDS)
                        } catch (e: InterruptedException) {
                            e.printStackTrace()
                        }
                    }
                })
                .build()
        )
        // :snippet-end:
        val anonymousCredentials = Credentials.anonymous()
        val user = app.login(anonymousCredentials)
        val config = SyncConfiguration.Builder(user, PARTITION)
            .allowQueriesOnUiThread(true)
            .allowWritesOnUiThread(true)
            .waitForInitialRemoteData(5000, TimeUnit.MILLISECONDS)
            .build()
        setupData(app, config, user)
        activity!!.runOnUiThread {
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    // need a reference to the realm in the client reset handler
                    // so we can close the realm (needs to stay open until then, or simulateClientReset fails)
                    globalRealm = realm

                    // need a reference to the config in the client reset handler
                    globalConfig = config

                    // create a session -- a requirement for the client reset simulation.
                    // Oddly enough, the successful open realm doesn't mean we have a sync
                    // session. Nor does writing to the realm. So... manually create the sync session.
                    app.sync.getOrCreateSession(config)
                    Log.v(
                        "EXAMPLE",
                        "Sessions open: " + app.sync.allSessions.size
                    )

                    // simulate a client reset event using a method built into the SDK.
                    // Need to call from the same package, so... we made an identical package,
                    // in this application, that can trick java into allowing it that privilege.
                    SimulateClientResetCaller.simulateClientReset(
                        app.sync,
                        app.sync.getOrCreateSession(config)
                    )
                }

                override fun onError(exception: Throwable) {
                    Log.e("EXAMPLE", "Error opening realm: " + exception.message)
                    super.onError(exception)
                }
            })
        }
        expectation!!.await()
    }
}