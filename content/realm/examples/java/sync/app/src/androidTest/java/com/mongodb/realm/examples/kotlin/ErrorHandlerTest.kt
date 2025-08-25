package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.getRandomPartition
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.sync.SyncConfiguration
import org.junit.Test

class ErrorHandlerTest : RealmTest()  {
    @Test
    fun openASyncedRealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val partition = getRandomPartition()
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) {
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated.")
                    // :snippet-start: error-handler
                    val user = app.currentUser()
                    val config = SyncConfiguration.Builder(user, partition)
                        .errorHandler { session, error ->
                            // do some error handling
                        }
                        .build()
                    // :snippet-end:
                } else {
                    Log.e( "EXAMPLE", "Failed login: ${it.error.errorMessage}")
                }
            expectation.fulfill() // TODO: trigger a sync error and test this code!
            }
        }
        expectation.await()
    }
}