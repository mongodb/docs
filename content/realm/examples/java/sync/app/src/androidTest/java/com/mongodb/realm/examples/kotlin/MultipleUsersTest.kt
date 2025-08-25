package com.mongodb.realm.examples.kotlin

import android.os.AsyncTask
import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.junit.Before
import org.junit.Test
import java.util.*


class MultipleUsersTest : RealmTest() {
    var firstUserEmail: String? = null
    var secondUserEmail: String? = null
    var firstUserPassword: String? = null
    var secondUserPassword: String? = null

    @Before
    fun setUpUserAndKey() {
        val random = Random()
        firstUserEmail = "firstUser" + random.nextInt(100000)
        firstUserPassword = "testtest"
        secondUserEmail = "secondUser" + random.nextInt(100000)
        secondUserPassword = "testtest"

        val firstUserIsRegistered = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            app.emailPassword.registerUserAsync(firstUserEmail, firstUserPassword) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully registered user.")
                    firstUserIsRegistered.fulfill()
                } else {
                    Log.e("EXAMPLE", "Failed to register user: ${it.error.errorMessage}")
                }
            }
        }
        firstUserIsRegistered.await()

        val secondUserIsRegistered = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            app.emailPassword.registerUserAsync(secondUserEmail, secondUserPassword) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully registered user.")
                    secondUserIsRegistered.fulfill()
                } else {
                    Log.e("EXAMPLE", "Failed to register user: ${it.error.errorMessage}")
                }
            }
        }
        secondUserIsRegistered.await()
    }

    //@Test
    fun addANewUserToADevice() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            try {
            // :snippet-start: add-a-new-user
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            // Log in as Joe
            val joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword)
            app.loginAsync(joeCredentials) {
                if (it.isSuccess) {
                    // The active user is now Joe
                    val joe = it.get()
                    assert(joe === app.currentUser())
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                }
            }

            // Log in as Emma
            val emmaCredentials = Credentials.emailPassword(secondUserEmail, secondUserPassword)
            app.loginAsync(emmaCredentials) {
                if (it.isSuccess) {
                    // The active user is now Emma
                    val emma = it.get()
                    assert(emma === app.currentUser())
                    // :remove-start:
                    expectation.fulfill()
                    // :remove-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                }
            }
            // :snippet-end:
            } catch (e: Exception) {
                Log.v("EXAMPLE", "Failed with exception: ${e.message}")
            }
        }
        expectation.await()
    }

    //@Test
    fun listAllOnDeviceUsers() {
        activity!!.runOnUiThread {
            try {
                val appID: String = YOUR_APP_ID // replace this with your App ID
                val app = App(AppConfiguration.Builder(appID).build())
                // :snippet-start: list-all-on-device-users
                val users = app.allUsers()
                for ((key) in users) {
                    Log.v("EXAMPLE", "User: $key")
                }
                // :snippet-end:
            } catch (e: Exception) {
                Log.v("EXAMPLE", "Failed with exception: ${e.message}")
            }
        }
    }

    //@Test
    fun switchTheActiveUser() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())

            // Log in as Joe
            val joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword)
            app.loginAsync(joeCredentials) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    // :snippet-start: switch-the-active-user
                    // Joe is already logged in and is the currently active user
                    val joe = app.currentUser()
                    // Log in as Emma
                    val emmaCredentials = Credentials.emailPassword(
                        secondUserEmail,
                        secondUserPassword
                    )
                    app.loginAsync(emmaCredentials) { result ->
                        if (result.isSuccess) {
                            // The active user is now Emma
                            val emma = result.get()
                            assert(emma === app.currentUser())
                            // Switch active user back to Joe
                            app.switchUser(joe)
                            assert(joe === app.currentUser())
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Failed to log in: ${result.error.errorMessage}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                }
            }
        }
        // expectation.await() // TODO: Figure out why this doesn't always work!
    }

    //@Test TODO: Figure out this flakey test
    fun removeAUserFromDevice() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            try {
                val appID: String = YOUR_APP_ID // replace this with your App ID
                val app = App(AppConfiguration.Builder(appID).build())
                // Log in as Joe
                val credentials = Credentials.emailPassword(firstUserEmail, firstUserPassword)
                // :snippet-start: remove-a-user-from-device
                app.loginAsync(credentials) {
                    if (it.isSuccess) {
                        val user = it.get()
                        user.removeAsync { result: App.Result<User?> ->
                            if (result.isSuccess) {
                                Log.v("EXAMPLE",
                                    "Successfully removed user from device.")
                                // :remove-start:
                                expectation.fulfill()
                                // :remove-end:
                            } else {
                                Log.e("EXAMPLE", "Failed to remove user from device.")
                            }
                        }
                    } else {
                        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                    }
                }
                // :snippet-end:
            } catch (e: Exception ) {
                Log.v("EXAMPLE", "Failed with exception: ${e.message}");
            }
        }
        expectation.await()
    }
}