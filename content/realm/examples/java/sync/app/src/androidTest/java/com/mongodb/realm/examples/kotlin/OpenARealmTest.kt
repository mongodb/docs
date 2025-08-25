package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import java.util.concurrent.TimeUnit
import org.junit.Test

class OpenARealmTest : RealmTest() {
    @Test
    fun testAllowReadsWritesOnUIThread() {
        val expectation : Expectation = Expectation()
        val PARTITION = getRandomPartition()

        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    // :snippet-start: allow-reads-writes-ui-thread
                    val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                        .allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()

                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        }
                    })
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testConfigureARealm() {
        val expectation = Expectation()
        val PARTITION = getRandomPartition()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val anonymousCredentials = Credentials.anonymous()
            app.loginAsync(
                anonymousCredentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    // :snippet-start: configure-a-realm
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .waitForInitialRemoteData(500, TimeUnit.MILLISECONDS)
                            .compactOnLaunch()
                            .build()

                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        }
                    })
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", it.error.toString())
                }
            }
        }
        //expectation.await()
    }
}