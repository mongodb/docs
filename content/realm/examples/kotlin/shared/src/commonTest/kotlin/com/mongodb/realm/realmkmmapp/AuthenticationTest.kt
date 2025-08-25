package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.annotations.ExperimentalRealmSerializerApi
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.*
import io.realm.kotlin.mongodb.User
import io.realm.kotlin.mongodb.exceptions.ServiceException
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.customDataAsBsonDocument
import io.realm.kotlin.mongodb.ext.profileAsBsonDocument
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.mongodb.kbson.BsonArray
import org.mongodb.kbson.BsonDocument
import org.mongodb.kbson.BsonInt32
import org.mongodb.kbson.BsonString
import kotlin.test.*

// :replace-start: {
//   "terms": {
//     "updatedUserData2": "updatedUserData",
//     "hideNotReusingAnonymousUser": "Credentials.anonymous()",
//     "TESTER_APP_ID": "YOUR_APP_ID"
//   }
// }
class AuthenticationTest: RealmTest() {

    private val hideNotReusingAnonymousUser = Credentials.anonymous(reuseExisting = false)
    private val email = getRandom()
    private val password = getRandom()


    /*
    ** Tests for Create and Authenticate Users page **
     */
    @Test
    fun createNewUserTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        // :snippet-start: create-new-user
        // Instantiate your App Services App
        val app = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            // Log in the user with the credentials associated
            // with the authentication provider
            // If successful, returns an authenticated `User` object
            val user = app.login(credentials)

            // ... work with the user ...
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
            user.delete() // :remove:
        }
        // :snippet-end:
    }

    @Test
    fun anonymousAuthTest() {
        // :snippet-start: anonymous-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val anonymousCredentials = hideNotReusingAnonymousUser
            val user = app.login(anonymousCredentials)
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
        }
        // :snippet-end:
        val user = app.currentUser
        runBlocking {
            // :snippet-start: anonymous-authentication-reuse-existing
            // Logs in with an anonymous user
            val anonUser = app.login(Credentials.anonymous())
            assertEquals(User.State.LOGGED_IN, anonUser.state)// :remove:
            assertEquals(user, anonUser) // :remove:

            // Logs in with a new, different anonymous user
            val otherAnonUser =
                app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-end:
            assertEquals(User.State.LOGGED_IN, otherAnonUser.state)
            assertNotEquals(anonUser, otherAnonUser)
            anonUser.delete()
            otherAnonUser.delete()
        }
        app.close()
    }

    @Test
    fun emailPasswordAuthTest() {
        // :snippet-start: email-password-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password) // :remove:
            val emailPasswordCredentials = Credentials.emailPassword(email, password)
            val user = app.login(emailPasswordCredentials)
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:
            user.delete() // :remove:
        }
        // :snippet-end:
        app.close()
    }

    @Test
    fun apiKeyAuthTest() {
        val randomKeyString = getRandom()
        // :snippet-start: api-key-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            // :remove-start:
            // Register and login a temporary user to create an API key
            app.emailPasswordAuth.registerUser(email, password)
            val tempUser = app.login(Credentials.emailPassword(email, password))
            assertEquals(User.State.LOGGED_IN, tempUser.state)
            val apiKey = tempUser.apiKeyAuth.create(randomKeyString)
            // API Key value in string form
            val key = apiKey.value!!
            // :remove-end:
            val user = app.login(Credentials.apiKey(key))
            // :remove-start:
            assertEquals(User.State.LOGGED_IN, user.state)
            assertEquals(apiKey.name, randomKeyString)
            assertTrue(apiKey.enabled)
            // delete the key so we're not constantly creating new user api keys
            // The line below worked in 1.11.0 but fails in 1.12.0 with client error 403
            // tempUser.apiKeyAuth.delete(apiKey.id)
            tempUser.delete()
            // :remove-end:
        }
        // :snippet-end:
        app.close()
    }

    @Test
    fun appleAuthTest() {
        val idToken = getRandom()
        // :snippet-start: apple-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "token contains an invalid number of segments", block = { // :remove:
        runBlocking {
            // Registration is handled by Apple
            val appleCredentials = Credentials.apple(idToken)
            val user = app.login(appleCredentials)
        }
        // :snippet-end:
        } )
        app.close()
    }

    @Ignore
    fun facebookAuthTest() {
        // Dependent on Android runtime. Tested in MainActivity.
    }

    @Ignore
    fun googleAuthTest() {
        // Dependent on Play Services. Tested in MainActivity.
    }

    @Test
    fun jwtAuthTest() {
        val jwtToken = getRandom()
        // :snippet-start: jwt-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        assertFails(message = "token contains an invalid number of segments", block = { // :remove:
        runBlocking {
            // Registration is handled by the JWT provider
            val jwtCredentials = Credentials.jwt(jwtToken)
            val user = app.login(jwtCredentials)
        }
        // :snippet-end:
        } )
        app.close()
    }

    @Test
    fun accessTokenTest() {
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: access-token-get
            val token = user.accessToken
            // :snippet-end:
            assertNotNull(token)
            // :snippet-start: access-token-refresh
            // Gets the current refresh token for the user
            fun getRefreshToken(): String {
                return user.refreshToken
            }
            // :snippet-end:
            val refreshToken = getRefreshToken()
            assertNotNull(refreshToken)
            user.delete()
        }
        app.close()
    }

    @Test
    fun customFunctionTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            // :snippet-start: custom-function-authentication
            // Create custom arguments for your Atlas Function
            val customCredentials = Credentials.customFunction(
                payload = mapOf("username" to "bob")
            )
            val user = app.login(customCredentials)
            // :snippet-end:
            assertEquals(User.State.LOGGED_IN, user.state)
            assertNotNull(user)
            user.delete()
        }
        app.close()
    }

    @Test
    fun currentUserTest() {
        runBlocking {
            val app: App = App.create(YOUR_APP_ID)
            val loginUser = app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: retrieve-current-user
            val user = app.currentUser
            // :snippet-end:
            loginUser.delete()
            app.close()
        }
    }

    @Test
    fun logoutTest() {
        val email = getRandom()
        val password = getRandom()
        // :snippet-start: log-out
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            // :remove-start:
            // This has to be an email/password user because logging out an anonymous user
            // sets their state to REMOVED instead of LOGGED_OUT
            app.emailPasswordAuth.registerUser(email, password)
            val credentials = Credentials.emailPassword(email, password)
            // :remove-end:
            val user = app.login(credentials)

            // ... work with logged-in user ...

            // Ensure all local updates are uploaded
            // before logging out
            user.logOut()
            assertEquals(User.State.LOGGED_OUT, user.state) // :remove:
        }
        // :snippet-end:
        app.close()
    }

    @Test
    fun authAsFlowTest() {
        val email = getRandom()
        val password = getRandom()
        var appActivityFunCalled = false
        var loginActivityFunCalled = false
        fun proceedToAppActivity(user: User) {
            // Placeholder func for example
            Log.v("User ${user.id.toString()} is logged in")
            appActivityFunCalled = true
        }
        fun proceedToLoginActivity(user: User) {
            // Placeholder func for example
            Log.v("User ${user.id.toString()} is logged out")
            loginActivityFunCalled = true
        }
        fun proceedToRemovedUserActivity(user: User) {
            // Placeholder func for example
        }
        val app: App = App.create(YOUR_APP_ID)
        runBlocking {
            // flow.collect() is blocking -- for this example we run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                // :snippet-start: auth-change-listener
                // Create a Flow of AuthenticationChange objects
                app.authenticationChangeAsFlow().collect {
                    change: AuthenticationChange ->
                        when (change) {
                            is LoggedIn -> proceedToAppActivity(change.user)
                            is LoggedOut -> proceedToLoginActivity(change.user)
                            is Removed -> proceedToRemovedUserActivity(change.user)
                        }
                }
                // :snippet-end:
            }
            app.emailPasswordAuth.registerUser(email, password)
            val user = app.login(Credentials.emailPassword(email, password))
            delay(10)
            assertTrue(appActivityFunCalled)
            user.logOut()
            delay(20)
            assertTrue(loginActivityFunCalled)
            job.cancel()
            user.remove()
        }
        app.close()
    }

    /*
    ** Tests for Link Users Identities page **
     */
    @Test
    fun linkCredentialsTest() {
        // :snippet-start: link-credentials
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        runBlocking {
            val user = app.login(hideNotReusingAnonymousUser) // logs in with an anonymous user
            // registers an email/password user
            app.emailPasswordAuth.registerUser(email, password)
            // links anonymous user with email/password credentials
            user.linkCredentials(Credentials.emailPassword(email, password))
            // :remove-start:
            // Login with the email/password user, and confirm it is the same user as the anonymous user
            val emailPasswordUser = app.login(Credentials.emailPassword(email, password))
            assertEquals(user, emailPasswordUser)
            emailPasswordUser.delete()
            // :remove-end:
        }
        // :snippet-end:
        app.close()
    }

    /*
    ** Tests for Custom User Data page **
     */
    @Test
    fun customUserDataTest() {
        val app: App = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.login(Credentials.anonymous(reuseExisting = false))
            // :snippet-start: read-custom-user-data
            val user = app.currentUser!!
            val customUserData = user.customDataAsBsonDocument()
            // :snippet-end:
            // At this point, there is no custom user data
            assertNull(customUserData)
            // :snippet-start: refresh-custom-user-data
            // Update the custom data object
            user.refreshCustomData()

            // Now when you access the custom data, it's the
            // updated data object
            val updatedUserData = user.customDataAsBsonDocument()
            // :snippet-end:
            // Still no custom user data because we haven't written it
            assertNull(updatedUserData)

            // :snippet-start: write-custom-user-data
            // Write the custom user data through a call
            // to the `writeCustomUserData` function
            val functionResponse = user.functions
                .call<BsonDocument>("writeCustomUserData",
                    mapOf("userId" to user.id, "favoriteColor" to "blue")
                )

            assertIs<BsonDocument>(functionResponse) // :remove:
            // Refreshed custom user data contains updated
            // `favoriteColor` value added in above Atlas Function call
            user.refreshCustomData()
            val updatedUserData2 = user.customDataAsBsonDocument()
            // :snippet-end:
            assertNotNull(updatedUserData2)
            assertEquals(BsonString("blue"), updatedUserData2["favoriteColor"])
            // :snippet-start: delete-custom-user-data
            val deleteResponse = user.functions
                .call<BsonDocument>("deleteCustomUserData")
            // :snippet-end:
            assertNotNull(deleteResponse)
            assertEquals(BsonInt32(1), deleteResponse["deletedCount"])
            user.delete()
        }
        app.close()
    }

    /*
    ** Tests for User Metadata page **
     */

    @Test
    fun userMetaData() {
        val email = getRandomEmail()
        val password = getRandom()
        val app = App.create(FLEXIBLE_APP_ID)
        runBlocking {
            app.emailPasswordAuth.registerUser(email, password)

            // :snippet-start: get-user-metadata
            // Log in a user
            val user = app.login(Credentials.emailPassword(email, password))

            // Access the user's metadata
            val userEmail = user.profileAsBsonDocument()["email"]
            Log.i("The logged-in user's email is: $userEmail")
            // :snippet-end:
            assertEquals(email, userEmail?.asString()?.value)
            user.delete()
            app.close()
        }
    }

    /*
    ** Tests for Delete Users page **
     */
    @Test
    fun removeUserTest() {
        // :snippet-start: remove-user
        val app = App.create(YOUR_APP_ID) // Replace with your App ID
        runBlocking {
            // :remove-start:
            app.emailPasswordAuth.registerUser(email, password)
            val credentials = Credentials.emailPassword(email, password)
            // :remove-end:
            // Log user in
            val user = app.login(credentials)
            assertEquals(User.State.LOGGED_IN, user.state) // :remove:

            // Work with logged-in user ...

            // Remove the user from the device
            // If the user is logged in, they are logged out first
            // DOES NOT delete user from the App Services App
            user.remove()
            assertEquals(User.State.REMOVED, user.state) // :remove:
        }
        // :snippet-end:
        app.close()
    }

    @OptIn(ExperimentalRealmSerializerApi::class)
    @Test
    fun deleteUserTest() {
        // :snippet-start: delete-user
        val app: App = App.create(TESTER_APP_ID)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false) // :remove:
            // Log user in
            val user = app.login(credentials)
            // :remove-start:
            assertEquals(User.State.LOGGED_IN, user.state)
            val userId = user.id
            assertEquals(userId, app.currentUser!!.id)
            val getUserResponse = user.functions
                .call<BsonDocument>("getAUser"){
                    val bsonDocument = BsonDocument("userID", BsonString(userId))
                    val bsonArray = BsonArray(listOf(bsonDocument))
                    add(bsonArray)
                }
            assertTrue(getUserResponse is BsonDocument)
            // :remove-end:

            // Work with logged-in user ...

            // Delete the logged-in user from the device
            // and the Atlas App Services App
            user.delete()
            // :remove-start:
            assertEquals(User.State.REMOVED, user.state)
            val exception = assertFailsWith<ServiceException> { user.functions
                .call<BsonDocument>("getAUser") {
                    val bsonDocument = BsonDocument("userID", BsonString(userId))
                    val bsonArray = BsonArray(listOf(bsonDocument))
                    add(bsonArray)
                }
            }
            assertTrue(exception.message!!.contains("invalid session: No user found for session for user id"))
            // :remove-end:
        }
        // :snippet-end:
        app.close()
    }

/*
** Tests for Multi-User Applications page **
*/

    private val app = App.create(YOUR_APP_ID)
    val joeEmail = getRandomEmail()
    val emmaEmail = getRandom()
    val joePassword = getRandomEmail()
    val emmaPassword = getRandom()
    val joeCredentials = Credentials.emailPassword(joeEmail, joePassword)
    val emmaCredentials = Credentials.emailPassword(emmaEmail, emmaPassword)

    @Test
    fun addMultipleUsersTest () {

        // :snippet-start: add-a-new-user
        val app = App.create(YOUR_APP_ID) // Replace with your App ID
        runBlocking {
            // Log in as Joe
            app.emailPasswordAuth.registerUser(joeEmail, joePassword) // :remove:
            val joeCredentials = Credentials.emailPassword(joeEmail, joePassword)
            try {
                val joe = app.login(joeCredentials)
                // The active user is now Joe
                val user = app.currentUser
                Log.v("Successfully logged in. User state: ${joe.state}. Current user is now: ${user?.id}")
                assertEquals(joe, user)
            } catch (e: Exception) {
                Log.e("Failed to log in: ${e.message}")
            }

            // Log in as Emma
            app.emailPasswordAuth.registerUser(emmaEmail, emmaPassword) // :remove:
            val emmaCredentials = Credentials.emailPassword(emmaEmail, emmaPassword)
            try {
                val emma = app.login(emmaCredentials)
                // The active user is now Emma
                val user = app.currentUser
                Log.v("Successfully logged in. User state: ${emma.state}. Current user is now: ${user?.id}")
                assertEquals(emma, user)
            } catch (e: Exception) {
                Log.e("Failed to log in: ${e.message}")
            }
        }
        // :snippet-end:
        runBlocking {
            val joe = app.login(joeCredentials)
            joe.delete()
            val emma = app.login(emmaCredentials)
            emma.delete()
        }
        app.close()
    }

    @Test
    fun listMultipleUsersTest () {
        runBlocking {
            app.emailPasswordAuth.registerUser(joeEmail, joePassword)
            app.emailPasswordAuth.registerUser(emmaEmail, emmaPassword)
            val device = app.currentUser?.deviceId
            val loginJoe = app.login(joeCredentials)
            val loginEmma = app.login(emmaCredentials)
            // :snippet-start: list-all-users
            // Get all known users on device
            val allUsers = app.allUsers()
            for ((key) in allUsers) {
                Log.v("User on Device $device: $key")
            }
            // :snippet-end:
            assertEquals(loginEmma, app.currentUser)
            assertTrue(allUsers.containsKey(loginEmma.id))
            assertTrue(allUsers.containsKey(loginJoe.id))
            loginJoe.delete()
            loginEmma.delete()
        }
        app.close()
    }

    @Test
    fun manageMultipleUsersTest () {
        runBlocking {
            app.emailPasswordAuth.registerUser(joeEmail, joePassword)
            app.emailPasswordAuth.registerUser(emmaEmail, emmaPassword)
            val loginEmma = app.login(emmaCredentials)
            val joe = app.login(joeCredentials)
            assertEquals(joe, app.currentUser)
            // :snippet-start: log-out-a-user
            try {
                joe.logOut()
                Log.v("Successfully logged out user. User state: ${joe.state}. Current user is now: ${app.currentUser?.id}")
                assertFalse(joe.loggedIn) // :remove:
            } catch (e: Exception) {
                Log.e("Failed to log out: ${e.message}")
            }
            val joeIsAUser = app.allUsers().containsKey(joe.id)
            assertTrue(joeIsAUser)
            // :snippet-end:

            val deleteJoe = app.login(joeCredentials)
            deleteJoe.delete()
            val noJoe = app.allUsers()
            assertFalse(noJoe.containsKey(deleteJoe.id))
            assertTrue(app.allUsers().containsKey(loginEmma.id))

            val emma = app.login(emmaCredentials)
            // :snippet-start: remove-a-user
            assertEquals(emma, app.currentUser)
            try {
                emma.remove()
                Log.v("Successfully removed user. User state: ${emma.state}. Current user is now: ${app.currentUser?.id}")
            } catch (e: Exception) {
                Log.e("Failed to remove user: ${e.message}")
            }
            val emmaIsAUser = app.allUsers().containsKey(emma.id)
            assertFalse(emmaIsAUser)
            // :snippet-end:
            val deleteEmma = app.login(emmaCredentials)
            deleteEmma.delete()
            assertFalse(app.allUsers().containsKey(deleteEmma.id))
        }
        app.close()
    }
}
// :replace-end:
