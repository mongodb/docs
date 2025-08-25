package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.ext.call
import kotlin.test.Test
import kotlin.test.assertEquals

class FunctionsTest: RealmTest() {

    @Test
    fun callFunction() {
        val appID = FLEXIBLE_APP_ID
        val credentials = Credentials.anonymous(reuseExisting = false)

        // :snippet-start: call-function
        runBlocking {
            val app: App = App.create(appID)
            val user = app.login(credentials)

            // Access the Atlas Function through the authenticated user
            // Pass the Function name and all arguments
            val response = user.functions.call<Int>("sum", 1, 2)

            print(response) // prints: 3
            assertEquals(3, response) // :remove:
        }
        // :snippet-end:
    }
}