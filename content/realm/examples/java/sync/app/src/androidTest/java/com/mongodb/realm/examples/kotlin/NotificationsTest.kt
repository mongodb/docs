package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.PARTITION
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.Dog
import io.realm.*
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId
import org.junit.Test


class NotificationsTest : RealmTest() {
    @Test
    fun collectionNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    val user = it.get()
                    val config: SyncConfiguration =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()

                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :snippet-start: collection-notifications
                            val dogs = realm.where(Dog::class.java).findAll()
                            // Set up the collection notification handler.
                            val changeListener =
                                OrderedRealmCollectionChangeListener { collection: RealmResults<Dog>?, changeSet: OrderedCollectionChangeSet ->
                                    // For deletions, notify the UI in reverse order if removing elements the UI
                                    val deletions = changeSet.deletionRanges
                                    for (i in deletions.indices.reversed()) {
                                        val range = deletions[i]
                                        Log.v("EXAMPLE", "${range.length} dogs deleted at ${range.startIndex}")
                                    }
                                    val insertions = changeSet.insertionRanges
                                    for (range in insertions) {
                                        Log.v("EXAMPLE", "${range.length} dogs inserted at ${range.startIndex}")
                                    }
                                    val modifications = changeSet.changeRanges
                                    for (range in modifications) {
                                        Log.v("EXAMPLE", "${range.length} dogs modified at ${range.startIndex}")
                                    }
                                }
                            // Observe collection notifications.
                            dogs.addChangeListener(changeListener)
                            // :snippet-end:
                            expectation.fulfill()
                        }
                    })
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun objectNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    val user = it.get()
                    val config: SyncConfiguration =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION + "_other")
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :snippet-start: object-notifications
                            // Create a dog in the realm.
                            var dog = Dog()
                            realm.executeTransaction { transactionRealm ->
                                dog = transactionRealm.createObject(Dog::class.java, ObjectId())
                                dog.name = "Max"
                            }

                            // Set up the listener.
                            val listener = RealmObjectChangeListener { changedDog: Dog?, changeSet: ObjectChangeSet? ->
                                if (changeSet!!.isDeleted) {
                                    Log.i("EXAMPLE", "The dog was deleted")
                                } else {
                                    for (fieldName in changeSet.changedFields) {
                                        Log.i(
                                            "EXAMPLE",
                                            "Field '$fieldName' changed."
                                        )
                                    }
                                }
                                // :remove-start:
                                expectation.fulfill()
                                // :remove-end:
                            }

                            // Observe object notifications.
                            dog.addChangeListener(listener)

                            // Update the dog to see the effect.
                            realm.executeTransaction { r: Realm? ->
                                dog.name = "Wolfie" // -> "Field 'name' was changed."
                            }
                            // :snippet-end:
                        }
                    })
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                }
            }
        }
        expectation.await()
    }
}
