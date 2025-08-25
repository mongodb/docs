package com.mongodb.realm.examples.kotlin

import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.java.FrogJava
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.bson.types.ObjectId
import org.junit.Test


class LandingPageTest : RealmTest() {
    @Test
    fun testUpdate() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    // :snippet-start: update
                    // Sync uses SyncConfiguration instead of RealmConfiguration,
                    // and requires both a logged-in user and a partition value
                    val config : SyncConfiguration =
                        SyncConfiguration.Builder(app.currentUser(), "myPartition")
                            // :remove-start:
                            .allowQueriesOnUiThread(true) // only need these for the behind-the-scenes insert, so hide them
                            .allowWritesOnUiThread(true)
                            // :remove-end:
                            .build()
                    val realm = Realm.getInstance(config)

                    // :remove-start:
                    // create a frog to update in the example
                    realm.executeTransaction { transactionRealm: Realm ->
                        val frog = transactionRealm
                            .createObject(FrogJava::class.java, ObjectId())
                        frog.setName("Benjamin Franklin")
                    }
                    // :remove-end:
                    // start a write transaction
                    realm.executeTransactionAsync { transactionRealm: Realm ->
                        // get a frog from the database to update
                        val frog =
                            transactionRealm.where(FrogJava::class.java)
                                .equalTo("name", "Benjamin Franklin").findFirst()
                        // change the frog's name
                        frog!!.setName("George Washington")
                        // change the frog's species
                        frog.setSpecies("American bullfrog")
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
                    } // when the transaction completes, the frog's name and species
                    // are updated in the database and synced to the connected Realm App
                    // :snippet-end:
                }
            }
        }
        expectation.await()
    }
}