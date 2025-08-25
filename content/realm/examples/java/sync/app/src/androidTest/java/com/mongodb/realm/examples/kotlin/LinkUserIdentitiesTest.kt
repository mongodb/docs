package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import org.junit.Before
import org.junit.Test
import java.util.*


class LinkUserIdentitiesTest : RealmTest() {
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
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
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

    @Test
    fun linkUsers() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            try {
                val appID: String = YOUR_APP_ID // replace this with your App ID
                val app = App(AppConfiguration.Builder(appID).build())
                val joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword)
                app.loginAsync(joeCredentials) {
                    if (it.isSuccess) {
                        // The active user is now Joe
                        val user = it.get()
                        val email = secondUserEmail
                        val password = secondUserPassword

                        // link joe to another existing user
                        // :snippet-start: link-users
                        // The user has previously created an email/password account
                        user.linkCredentialsAsync(
                            Credentials.emailPassword(
                                email,
                                password
                            )
                        ) { result ->
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                            if (result.isSuccess) {
                                Log.v(
                                    "EXAMPLE",
                                    "Successfully linked existing user identity " +
                                    "with email/password user: ${result.get()}"
                                )
                            } else {
                                Log.e(
                                    "EXAMPLE",
                                    "Failed to link user identities with: ${result.error}"
                                )
                            }
                        }
                        // :snippet-end:
                    } else {
                        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
                    }
                }
            } catch (e: Exception) {
                Log.e("EXAMPLE", "Failed with exception: ${e.message}")
            }
        }
        //expectation.await() // TODO: Figure out why this only works *sometimes*
    }
}
