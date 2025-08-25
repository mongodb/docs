package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.auth.ApiKey
import org.junit.Before
import org.junit.Test
import java.util.*

class UserAPIKeysTest : RealmTest() {
    var email: String? = null
    var password: String? = null
    var apiKey: ApiKey? = null

    @Before
    fun setUpUserAndKey() {
        val random = Random()
        email = "test" + random.nextInt(10000000)
        password = "testtest"

        val userIsRegistered = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            app.emailPassword.registerUserAsync(email, password) {
                if (it.isSuccess) {
                    Log.i("EXAMPLE", "Successfully registered user.")
                    userIsRegistered.fulfill()
                } else {
                    Log.e("EXAMPLE", "Failed to register user: ${it.error}")
                }
            }
        }
        userIsRegistered.await()

        val apiKeyIsCreated = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated user.")
                    val user = app.currentUser()
                    user!!.apiKeys.createAsync("Name_of_the_API_Key") { result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully created API key: ${result.get().value}")
                            apiKeyIsCreated.fulfill()
                            apiKey = result.get()
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: ${result.error}")
                        }
                    }
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            }
        }
        apiKeyIsCreated.await()
    }

    @Test
    fun testCreateAUserAPIKey() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated user.")
                    // :snippet-start: create-a-user-api-key
                    val user = app.currentUser()
                    user!!.apiKeys.createAsync("Name-of-the-API-Key") { result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully created API key: ${result.get().value}")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: ${result.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testLookUpAUsersAPIKeys() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :snippet-start: look-up-a-users-api-keys
                    val user = app.currentUser()
                    user!!.apiKeys
                        .fetchAll { result ->
                            if (result.isSuccess) {
                                Log.v("EXAMPLE", "Successfully fetched API keys: ${result.get().toTypedArray()}")
                                // :remove-start:
                                expectation.fulfill()
                                // :remove-end:
                            } else {
                                Log.e("EXAMPLE", "Error fetching API keys: ${result.error}")
                            }
                        }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: {$it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testLookUpASpecificUserAPIKey() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val api_key_id = apiKey!!.id
                    // :snippet-start: look-up-a-specific-user-api-key
                    val user = app.currentUser()
                    user!!.apiKeys.fetchAsync(api_key_id) { result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully fetched API key: ${result.get()}")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: ${result.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testEnableUserAPIKey() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val api_key_id = apiKey!!.id
                    // :snippet-start: enable-user-api-key
                    val user = app.currentUser()
                    user!!.apiKeys.enableAsync(api_key_id) { result ->
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully enabled API key.")
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: ${result.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testDisableUserAPIKey() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val api_key_id = apiKey!!.id
                    // :snippet-start: disable-user-api-key
                    val user = app.currentUser()
                    user!!.apiKeys.disableAsync(api_key_id) { result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully disabled API key.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error disabling API key: ${result.error}")
                            // :remove-start:
                            // TODO: Fix this test so that it actually disables an API Key! (currently fails at "error processing request" for unknown reasons)
                            expectation.fulfill()
                            // :remove-end:
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error}")
                }
            }
        }
        expectation.await()
    }

    @Test
    fun testDeleteUserAPIKey() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val credentials = Credentials.emailPassword(email, password)
            app.loginAsync(credentials) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    val api_key_id = apiKey!!.id
                    // :snippet-start: delete-user-api-key
                    val user = app.currentUser()
                    user!!.apiKeys.deleteAsync(api_key_id) { result ->
                        if (result.isSuccess) {
                            Log.v("EXAMPLE", "Successfully deleted API key.")
                            // :remove-start:
                            expectation.fulfill()
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error deleting API key: ${result.error}")
                        }
                    }
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: ${it.error}")
                }
            }
        }
        expectation.await()
    }
}