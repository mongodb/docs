package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test

class RealmFileLocationTest : RealmTest() {
    @Test
    fun testGetRealmFileLocation() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()

            // :snippet-start: get-realm-file-location
            val realm = Realm.getInstance(config)
            Log.v("EXAMPLE", "Realm file path: ${realm.path}")
            // :snippet-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}