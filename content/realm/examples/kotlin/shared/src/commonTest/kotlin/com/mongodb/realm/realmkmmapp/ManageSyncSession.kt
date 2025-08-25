package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.*
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import org.mongodb.kbson.BsonObjectId
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.minutes


// :replace-start: {
//   "terms": {
//      "SyncTask": "Task",
//      "FLEXIBLE_APP_ID": "YOUR_APP_ID"
//   }
// }
class ManageSyncSession : RealmTest() {

    class SyncTask : RealmObject {
        @PrimaryKey
        var _id: ObjectId = BsonObjectId()
        var taskName: String = ""
        var assignee: String? = null
        var completed: Boolean = false
        var progressMinutes: Int = 0
        var dueDate: RealmInstant? = null
    }

    val app = App.create(yourFlexAppId)
    val credentials = Credentials.anonymous(reuseExisting = false)
    @Test
    fun waitForChangesUploadAndDownload() {
        runBlocking {
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class))
                .initialSubscriptions { it.query<SyncTask>().subscribe() }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: wait-upload-download
            // Wait to download all pending changes from Atlas
            realm.syncSession.downloadAllServerChanges(1.minutes)

            // Add data locally
            realm.write {
                this.copyToRealm(SyncTask().apply {
                    taskName = "Review proposal"
                    assignee = "Emma"
                    progressMinutes = 0
                })
            }

            val upload = // :remove:
            // Wait for local changes to be uploaded to Atlas
            realm.syncSession.uploadAllLocalChanges(1.minutes)
            // :snippet-end:
            assertTrue(upload)
            realm.write {
                val tasks = query<SyncTask>().find()
                delete(tasks)
                assertEquals(0, tasks.size)
            }
            realm.syncSession.uploadAllLocalChanges()
            user.remove()
            realm.close()
        }
    }

    @Test
    fun pauseResumeSyncSession() {
        runBlocking {
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class))
                .initialSubscriptions { it.query<SyncTask>().subscribe() }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: pause-resume-sync
            // Pause the sync session
            // Data that you write while session is paused does not sync to Atlas
            realm.syncSession.pause()
            assertEquals(SyncSession.State.PAUSED, realm.syncSession.state) // :remove:

            // Add data locally
            realm.write {
                this.copyToRealm(SyncTask().apply {
                    taskName = "Submit expense report"
                    assignee = "Kevin"
                    progressMinutes = 0
                })
            }

            // Resume sync session
            // Local changes now sync to Atlas
            realm.syncSession.resume()
            // :snippet-end:
            assertEquals(SyncSession.State.ACTIVE, realm.syncSession.state)
            realm.write {
                val tasks = query<SyncTask>().find()
                delete(tasks)
                assertEquals(0, tasks.size)
            }
            realm.syncSession.uploadAllLocalChanges()
            user.remove()
            realm.close()
        }
    }

    @Test
    fun monitorSyncProgress() {
        /*
        NOTE: Kotlin does not currently support progress listeners for Flexible Sync
        Requires PBS
        */
        runBlocking {
            val app1 = App.create(yourAppId)
            val user = app1.login(credentials)
            val config = SyncConfiguration.Builder(user, PARTITION, setOf(SyncTask::class))
                .name(PARTITION)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")

            realm.write {
                this.copyToRealm(SyncTask().apply {
                    taskName = "Schedule appointment"
                    assignee = "Jane"
                    progressMinutes = 0
                })
            }
            // :snippet-start: monitor-progress
            val stream = realm.syncSession.progressAsFlow(
                Direction.UPLOAD, ProgressMode.CURRENT_CHANGES
            )
            stream.collect { progress ->
                if (progress.transferableBytes == progress.transferredBytes) {
                    Log.i("Upload complete")
                }
            }
            // :snippet-end:
            assertTrue(stream.first().isTransferComplete)
            realm.write {
                val tasks = query<SyncTask>().find()
                delete(tasks)
                assertEquals(0, tasks.size)
            }
            realm.syncSession.uploadAllLocalChanges()
            user.remove()
            realm.close()
        }
    }

    @Test
    fun monitorNetworkConnection() {
        runBlocking {
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class))
                .initialSubscriptions { it.query<SyncTask>().subscribe() }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: get-network-connection
            if (realm.syncSession.connectionState == ConnectionState.CONNECTED) {
                Log.i("Connected to network")
                // ... do something
            }
            // :snippet-end:
            val flow = CoroutineScope(Dispatchers.Default).launch {
                // :snippet-start: monitor-network-connection
                val connectionFlow = realm.syncSession.connectionStateAsFlow()
                connectionFlow.collect { ConnectionStateChange ->
                    if (ConnectionStateChange.newState == ConnectionState.CONNECTED) {
                        Log.i("Connected to Atlas Device Sync server")
                    }
                }
                // :snippet-end:
                assertEquals(ConnectionState.CONNECTED, realm.syncSession.connectionState)
            }
            realm.write {
                this.copyToRealm(SyncTask().apply {
                    taskName = "Do a thing"
                    assignee = "Me"
                    progressMinutes = 0
                })
            }
            realm.write {
                val tasks = query<SyncTask>().find()
                delete(tasks)
                assertEquals(0, tasks.size)
            }
            realm.syncSession.uploadAllLocalChanges()
            flow.cancel()
            user.remove()
            realm.close()
        }
    }

    // NOTE: Can't test `.reconnect()` since it requires device reconnecting after going offline
    @Test
    fun appSyncSessionsTest() {
        runBlocking {
        // Most of this is commented out until `app.sync.waitForSessionsToTerminate()` is confirmed
        // to be working as expected and can be documented

            // :snippet-start: open-sync-session
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class))
                .build()

            // Open the synced realm
            val realm = Realm.open(config)

            // Sync session is now active
            assertTrue(app.sync.hasSyncSessions) // :remove:

            // ... do something with the synced realm

            // :snippet-end:
            // :snippet-start: app-sync-reconnect
            app.sync.reconnect()
            // :snippet-end:
            user.delete()
            realm.close()
            app.close()

//            val config1 = SyncConfiguration.Builder(user, setOf()).name("other.realm").build()
//            val config2 = SyncConfiguration.Builder(user, setOf()).name("another.realm").build()
//            val realm1 = Realm.open(config1)
//            val realm2 = Realm.open(config2)
//            assertTrue(
//                // snippet-start
//                app.sync.hasSyncSessions
//                // snippet-end
//            )
//            realm1.close()
//            realm2.close()
//            assertTrue(realm1.isClosed())
//            assertTrue(realm2.isClosed())
//            // snippet-start
//            app.sync.waitForSessionsToTerminate()
//            // snippet-end
//            assertFalse(app.sync.hasSyncSessions)
//            app.close()
//            Realm.deleteRealm(config1) // if I don't close app first, I get an IllegalStateException: [RLM_ERR_DELETE_OPENED_REALM]: Cannot delete files of an open Realm:
//            Realm.deleteRealm(config2)
        }
    }
}
// :replace-end: