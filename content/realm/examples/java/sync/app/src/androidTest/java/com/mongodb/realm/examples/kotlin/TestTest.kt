// :snippet-start: test-integration-testing
package com.mongodb.realm.examples.kotlin

import android.app.Activity
import android.util.Log
import androidx.test.core.app.ActivityScenario
import com.mongodb.realm.examples.BasicActivity
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.sync.SyncConfiguration
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import org.junit.Assert
import org.junit.Test

class TestTest {

    @Test
    fun testTesting() {
        // :snippet-start: initialize-realm-with-context
        var testActivity: Activity? = null
        val scenario: ActivityScenario<BasicActivity>? =
            ActivityScenario.launch(BasicActivity::class.java)

        // create a latch to force blocking for an async call to initialize realm
        val setupLatch = CountDownLatch(1)

        scenario?.onActivity{ activity: BasicActivity ->
            Realm.init(activity)
            testActivity = activity
            setupLatch.countDown() // unblock the latch await
        }
        // :snippet-end:

        // block until we have an activity to run tests on
        try {
            Assert.assertTrue(setupLatch.await(1, TimeUnit.SECONDS))
        } catch (e: InterruptedException) {
            Log.e("EXAMPLE", e.stackTraceToString())
        }

        // :snippet-start: wait-for-async
        val testLatch = CountDownLatch(1)

        // :snippet-start: test-logic-looper
        testActivity?.runOnUiThread {
            // instantiate an app connection
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            // authenticate a user
            val credentials = Credentials.anonymous()
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // open a synced realm
                    val config = SyncConfiguration.Builder(
                        app.currentUser(),
                        getRandomPartition() // replace this with a valid partition
                    ).allowQueriesOnUiThread(true)
                        .allowWritesOnUiThread(true)
                        .build()
                    Realm.getInstanceAsync(config, object : Realm.Callback() {
                        override fun onSuccess(realm: Realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.")
                            // read and write to realm here via transactions
                            realm.executeTransaction {
                                realm.createObjectFromJson(
                                    Frog::class.java,
                                    "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\", _id:0 }"
                                )
                            }
                            testLatch.countDown()
                            realm.close()
                        }
                        override fun onError(exception: Throwable) {
                            Log.e("EXAMPLE",
                                "Failed to open the realm: " + exception.localizedMessage)
                        }
                    })
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
                }
            }
        }
        // :snippet-end:

        // block until the async calls in the test succeed or error out
        try {
            Assert.assertTrue(testLatch.await(5, TimeUnit.SECONDS))
        } catch (e: InterruptedException) {
            Log.e("EXAMPLE", e.stackTraceToString())
        }
        // :snippet-end:
    }
}
// :snippet-end: