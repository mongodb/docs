package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.FacebookSdk
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import org.junit.Assert
import org.junit.Test
import java.util.concurrent.atomic.AtomicReference


class AuthenticationTest : RealmTest() {

    @Test
    fun testOfflineLogin() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :snippet-start: offline
            // Log the user into the backend app.
            // The first time you login, the user must have a network connection.
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            // Check for an existing user.
            // If the user is offline but credentials are
            // cached, this returns the existing user.
            val user =
                AtomicReference<User?>()
            user.set(app.currentUser())
            if (user.get() == null) {
                // If the device has no cached user
                // credentials, log them in.
                val anonymousCredentials =
                    Credentials.anonymous()
                app.loginAsync(
                    anonymousCredentials
                ) { it: App.Result<User?> ->
                    // :remove-start:
                    Assert.assertEquals(true, it.isSuccess)
                    // :remove-end:
                    if (it.isSuccess) {
                        Log.v("AUTH", "Successfully authenticated anonymously.")
                        user.set(app.currentUser())
                    } else {
                        Log.e("AUTH", it.error.toString())
                    }
                }
            }
            // :remove-start:
            expectation.fulfill()
            // :remove-end:
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testAnonymous() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: anonymous
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            var user: User?
            app.loginAsync(anonymousCredentials) {
                // :remove-start:
                Assert.assertEquals(true, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated anonymously.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testEmailPassword() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: email-password
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val emailPasswordCredentials: Credentials = Credentials.emailPassword(
                "<email>",
                "<password>"
            )

            var user: User? = null
            app.loginAsync(emailPasswordCredentials) {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", it.error.toString())
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testAPIKey() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: api-key
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val apiKeyCredentials: Credentials = Credentials.apiKey("<key>")

            var user: User? = null
            app.loginAsync(apiKeyCredentials) {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testCustomFunction() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: custom-function
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val customFunctionCredentials:
                    Credentials = Credentials.customFunction(org.bson.Document("username", "bob"))

            var user: User? = null
            app.loginAsync(customFunctionCredentials) {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testCustomJWT() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: custom-jwt
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch JWT from custom provider

            val customJWTCredentials: Credentials = Credentials.jwt("<token>")

            var user: User? = null
            app.loginAsync(customJWTCredentials) {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testFacebookOAuth() {
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val YOUR_FACEBOOK_SDK_APP_ID = "960466841104579"
            // :snippet-start: facebook
            FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID)
            FacebookSdk.sdkInitialize(activity)
            val callbackManager = CallbackManager.Factory.create()
            LoginManager.getInstance().registerCallback(
                callbackManager,
                object : FacebookCallback<LoginResult> {
                    override fun onSuccess(loginResult: LoginResult) {
                        // Signed in successfully, forward credentials to MongoDB Realm.
                        val accessToken = loginResult.accessToken
                        val facebookCredentials: Credentials =
                            Credentials.facebook(accessToken.token)
                        app.loginAsync(facebookCredentials) {
                            // :remove-start:
                            Assert.assertEquals(false, it.isSuccess)
                            // :remove-end:
                            if (it.isSuccess) {
                                Log.v(
                                    "AUTH",
                                    "Successfully logged in to MongoDB Realm using Facebook OAuth."
                                )
                            } else {
                                Log.e("AUTH", "Failed to log in to MongoDB Realm", it.error)
                            }
                        }
                    }

                    override fun onCancel() {
                        Log.v("AUTH", "Cancelled Facebook login")
                    }

                    override fun onError(exception: FacebookException) {
                        Log.e("AUTH", "Failed to authenticate with Facebook: ${exception.message}")
                    }
                })
            // :snippet-end:
        }
        LoginManager.getInstance().logIn(activity, null)
    }

    @Test fun testGoogleOAuth() {
        val expectation : Expectation = Expectation()

        // TODO: WARNING! THIS TEST REQUIRES INTERACTION. UNCOMMENT THIS NEXT LINE TO RUN LOCALLY.
        // Log.v("EXAMPLE", ActivityScenario.launch(AuthActivity::class.java).result.toString())
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            Log.v("EXAMPLE", app.currentUser().toString())
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test fun testSignInWithApple() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: apple
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            // fetch IDToken using Apple SDK

            val appleCredentials: Credentials = Credentials.apple("<token>")

            var user: User? = null
            app.loginAsync(appleCredentials) {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess)
                // :remove-end:
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.")
                    user = app.currentUser()
                } else {
                    Log.e("AUTH", "Error logging in: ${it.error.toString()}")
                }
                // :remove-start:
                expectation.fulfill()
                // :remove-end:
            }
            // :snippet-end:
        }
        expectation.await()
    }

    @Test fun testLogOut() {
        var expectation : Expectation = Expectation()
        activity?.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app: App = App(
                AppConfiguration.Builder(appID)
                    .build()
            )

            val anonymousCredentials: Credentials = Credentials.anonymous()

            var user: User? = null
            app.loginAsync(anonymousCredentials) {
                if (it.isSuccess) {
                    Log.v("AUTH", "Successfully authenticated anonymously.")
                    user = app.currentUser()
                    // :snippet-start: log-out
                    user?.logOutAsync {
                        // :remove-start:
                        Assert.assertEquals(true, it.isSuccess)
                        // :remove-end:
                        if (it.isSuccess) {
                            Log.v("AUTH", "Successfully logged out.")
                        } else {
                            Log.e("AUTH", it.error.toString())
                        }
                        // :remove-start:
                        expectation.fulfill()
                        // :remove-end:
                    }
                    // :snippet-end:
                } else {
                    Log.e("AUTH", it.error.toString())
                }

            }
        }
        expectation.await()
    }

    // :snippet-start: get-valid-access-token
    // Gets a valid user access token to authenticate requests
    fun getValidAccessToken(user: User?): String {
        // An already logged in user's access token might be stale. To
        // guarantee that the token is valid, refresh it if necessary.
        user!!.refreshCustomData()
        return user.accessToken
    }

    // :snippet-end:
    @Test
    fun testGetUserAccessToken() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID = YOUR_APP_ID // replace this with your App ID
            val app = App(
                AppConfiguration.Builder(appID)
                    .build()
            )
            val emailPasswordCredentials =
                Credentials.emailPassword("<email>", "<password>")
            val user =
                AtomicReference<User>()
            app.loginAsync(
                emailPasswordCredentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    val accessToken = getValidAccessToken(app.currentUser())
                    Assert.assertTrue(accessToken is String)
                } else {
                    Log.e("AUTH", it.error.toString())
                }
                expectation.fulfill()
            }
        }
        expectation.await()
    }
}
