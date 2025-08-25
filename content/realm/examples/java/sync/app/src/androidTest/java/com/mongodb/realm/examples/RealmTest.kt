package com.mongodb.realm.examples

import android.app.Activity
import android.util.Log
import androidx.test.core.app.ActivityScenario
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.functions.Functions
import org.junit.AfterClass
import org.junit.Assert
import org.junit.Before
import org.junit.BeforeClass
import java.time.LocalDateTime
import java.util.*
import java.util.concurrent.atomic.AtomicBoolean
import org.junit.After

abstract class RealmTest {
    @JvmField
    var scenario: ActivityScenario<BasicActivity>? = null
    @JvmField
    var activity: Activity? = null

    @Before
    fun setUp() {
        val expectation = Expectation()
        scenario = ActivityScenario.launch(BasicActivity::class.java)
        scenario!!.onActivity { activity ->
            Realm.init(activity)
            this.activity = activity
            expectation.fulfill()
        }
        // ensure that setup has initialized realm before exiting
        expectation.await()
    }
}

// ensure that there are no messy users laying around before we start testing, messing up state
@BeforeClass
fun setStage() {
    tearDown()
}

// when we finish testing, make sure that we clean up all the users we created
@AfterClass
fun tearDown() {
    val expectation1 = Expectation()
    var activity: Activity? = null
    var scenario = ActivityScenario.launch(BasicActivity::class.java)
    scenario!!.onActivity { innerActivity ->
        Realm.init(innerActivity)
        activity = innerActivity
        expectation1.fulfill()
    }
    deleteAllUsers(activity!!)
}

fun deleteAllUsers(activity: Activity) {
    val appID = YOUR_APP_ID
    val app: App = App(AppConfiguration.Builder(appID).build())
    val expectation = Expectation()
    expectation.await()
    activity?.runOnUiThread {
        val anonymousCredentials: Credentials = Credentials.anonymous()
        app.loginAsync(anonymousCredentials) {
            if (it.isSuccess) {
                val user: User? = app.currentUser()

                val functionsManager: Functions = app.getFunctions(user)
                val args: List<Int> = listOf(1, 2)
                functionsManager.callFunctionAsync(
                    "deleteAllUsers",
                    args,
                    Integer::class.java
                ) { result ->
                    if (result.isSuccess) {
                        Log.v("TEARDOWN", "Delete all users result: ${result.get()}")
                        expectation.fulfill()
                    } else {
                        Log.e("TEARDOWN", "failed to delete all users with: " + result.error)
                    }
                }
            } else {
                Log.e(
                    "EXAMPLE",
                    "Error logging into the Realm app. Make sure that anonymous authentication is enabled. Error: " + it.error
                )
            }
        }
    }
    expectation.await(10000)
}

const val YOUR_APP_ID = "android-example-testers-rztwe"
const val PARTITION = "Example"

fun getRandomPartition() : String {
    val random = Random()
    return random.nextInt(100000).toString()
}

/**
 * Provides the ability to block until a background task completes.
 */
class Expectation {
    private val _done = AtomicBoolean(false)

    /**
     * Fulfills the expectation, allowing the corresponding await() call to return.
     */
    fun fulfill() {
        Assert.assertFalse("Multiple calls to expectation.fulfill() unexpected", _done.get())
        _done.set(true)
    }

    /**
     * Awaits a call to "fulfill()" on another thread until the given timeout elapses.
     */
    fun await(timeoutMillis: Long) {
        val startTimeMillis = System.currentTimeMillis()
        while (!_done.get()) {
            if (System.currentTimeMillis() - startTimeMillis > timeoutMillis) {
                Assert.fail("Timeout elapsed without a call to fulfill()")
                return
            }
        }
    }

    fun await() {
        await(25000L)
    }
}
