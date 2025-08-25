package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.internal.platform.runBlocking
import kotlin.random.Random
import co.touchlab.kermit.Kermit
import kotlin.test.*


class UserAPIKeysTest : RealmTest() {
    private val random = Random
    private val app = App.create(YOUR_APP_ID)
    private var email: String? = null
    private var password: String? = null
    private val kermit = Kermit()

    @BeforeTest
    fun setup() {
        email = "api-key-user@example.com" + random.nextInt(10000000)
        password = "123456"
        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            app.emailPasswordAuth.registerUser(email!!, password!!)
            kermit.i { "setup: user logged in with $email and $password" }
        }
    }

    @Test
    fun createApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: create-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth

            // Create an API key for the logged-in user
            val key = provider.create("apiKeyName")
// :snippet-end:
            user.delete()
        }
    }

    @Test
    fun fetchApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: fetch-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("foo")
            val key1 = provider.create("foo1")
            val key2 = provider.create("foo2")
            // :remove-end:

            // Get all keys for the logged-in user
            val apiKeys = provider.fetchAll()

            // Get a specific key by its ID
            val apiKey = provider.fetch(key.id)
// :snippet-end:
            user.delete()
        }
    }

    @Test
    fun disableApiKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: enable-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("anotherApiKey")
            // :remove-end:

            // ... fetch the key to enable or disable

            // Enable an API key that's currently disabled
            provider.enable(key.id)

            // Disable an API key that's currently enabled
            provider.disable(key.id)
// :snippet-end:
            user.delete()
        }
    }

    @Test
    fun deleteKeyTest() {
        runBlocking {
            val credentials = Credentials.emailPassword(email!!, password!!)
            app.login(credentials)

// :snippet-start: delete-api-key
            val user = app.currentUser!!
            val provider = user.apiKeyAuth
            // :remove-start:
            val key = provider.create("foo")
            // :remove-end:

            // ... fetch the key to delete

            // Delete the specified API key
            provider.delete(key.id)
// :snippet-end:
            user.delete()
        }
    }
}