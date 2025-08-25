package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.exceptions.CompensatingWriteException
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.sync.SyncSession
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.runBlocking
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

// :replace-start: {
//    "terms": {
//       "SyncItem": "Item"
//    }
// }

class SyncedRealmCRUD : RealmTest() {
    // :snippet-start: flexible-sync-crud-model
    class SyncItem : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var ownerId: String = ""
        var itemName: String = ""
        var complexity: Int = 0
    }
    // :snippet-end:

    @Test
    fun subscriptionSetupTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            // :snippet-start: flexible-sync-subscription-setup
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                // Add subscription
                .initialSubscriptions { realm ->
                    add(
                        // Get Items from Atlas that match the Realm Query Language query.
                        // Uses the queryable field `complexity`.
                        // Query matches objects with complexity less than or equal to 4.
                        realm.query<SyncItem>("complexity <= 4"),
                        "simple-items"
                    )
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-end:
            val oid = ObjectId()
            // :snippet-start: successful-write
            // Per the Device Sync permissions, users can only read and write data
            // where the `Item.ownerId` property matches their own user ID.
            val userId = user.id
            val newItem = SyncItem().apply {
                _id = oid // :remove:
                ownerId = userId
                itemName = "This item meets sync criteria"
                complexity = 3
            }

            syncRealm.write {
                // `newItem` is successfully written to the realm and synced to Atlas
                // because its data matches the subscription query (complexity <= 4)
                // and its `ownerId` field matches the user ID.
                copyToRealm(newItem)
            }
            // :snippet-end:
            syncRealm.write {
                val addedItem: RealmResults<SyncItem> = query<SyncItem>().find()
                assertEquals(1, addedItem.size)
                assertEquals(oid, addedItem[0]._id)
                delete(addedItem)
            }
            user.delete()
            syncRealm.close()
        }
    }

   // @Test
    fun compensatingWriteTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)

        val channel = Channel<CompensatingWriteException>()
        // :snippet-start: access-compensating-write
        val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
            runBlocking {
                if (error is CompensatingWriteException) {
                    channel.send(error) // :remove:
                    error.writes.forEach { writeInfo ->
                        val errorMessage = """
                            A write was rejected with a compensating write error
                            The write to object type: ${writeInfo.objectType}
                            With primary key of: ${writeInfo.primaryKey}
                            Was rejected because: ${writeInfo.reason}
                            """.trimIndent()
                        Log.e(errorMessage)
                    }
                }
            }
        }
        // :snippet-end:
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .errorHandler(syncErrorHandler)
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            syncRealm.write { copyToRealm(SyncItem().apply {
                    ownerId = user.id
                    itemName = "This is a compensating write error handling test"
                    complexity = 7 })}
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val exception: CompensatingWriteException = channel.receiveOrFail()
            exception.message?.let { message ->
                assertTrue(
                    message.contains("[Sync][CompensatingWrite(1033)] Client attempted a write that is outside of permissions or query filters; it has been reverted"),
                    "Exception message did not contain the expected substring"
                )
            }
            assertEquals(1, exception.writes.size)
            channel.close()
            user.delete()
            syncRealm.close()
        }
    }

   // @Test
    fun compensatingWriteQueryTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        val channel = Channel<CompensatingWriteException>()
        val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
            runBlocking { if (error is CompensatingWriteException) { channel.send(error) } } }
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .errorHandler(syncErrorHandler)
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-start: write-outside-flexible-sync-query
            // The complexity of this item is `7`. This is outside the bounds
            // of the subscription query, which triggers a compensating write.
            val itemTooComplex = SyncItem().apply {
                ownerId = user.id
                itemName = "This item is too complex"
                complexity = 7
            }
            syncRealm.write {
                copyToRealm(itemTooComplex)
            }
            // :snippet-end:
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val exception: CompensatingWriteException = channel.receiveOrFail()
            exception.message?.let { message ->
                assertTrue(
                    message.contains("[Sync][CompensatingWrite(1033)] Client attempted a write that is outside of permissions or query filters; it has been reverted"),
                    "Exception message did not contain the expected substring"
                )
            }
            assertEquals(1, exception.writes.size)
            channel.close()
            user.delete()
            syncRealm.close()
        }
    }

  //  @Test
    fun compensatingWritePermissionTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        val channel = Channel<CompensatingWriteException>()
        val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
            runBlocking { if (error is CompensatingWriteException) { channel.send(error) } } }
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncItem::class))
                .initialSubscriptions { realm -> add(realm.query<SyncItem>("complexity <= 4"), "simple-items") }
                .errorHandler(syncErrorHandler)
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            syncRealm.subscriptions.waitForSynchronization()
            Log.v("Successfully opened realm: ${syncRealm.configuration}")
            // :snippet-start: write-outside-permissions
            // The `ownerId` of this item does not match the `user.id` of the logged-in
            // user. The user does not have permissions to make this write, which
            // triggers a compensating write.
            val itemWithWrongOwner = SyncItem().apply {
                ownerId = "not the current user"
                itemName = "A simple item"
                complexity = 1
            }
            syncRealm.write {
                copyToRealm(itemWithWrongOwner)
            }
            // :snippet-end:
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val exception: CompensatingWriteException = channel.receiveOrFail()
            exception.message?.let { message ->
                assertTrue(
                    message.contains("[Sync][CompensatingWrite(1033)] Client attempted a write that is outside of permissions or query filters; it has been reverted"),
                    "Exception message did not contain the expected substring"
                )
            }
            assertEquals(1, exception.writes.size)
            channel.close()
            syncRealm.close()
        }
    }
}

// :replace-end: