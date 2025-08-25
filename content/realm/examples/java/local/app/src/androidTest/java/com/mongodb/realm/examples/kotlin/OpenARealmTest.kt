package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test
import io.realm.exceptions.RealmFileException;

class OpenARealmTest : RealmTest() {
    @Test
    fun testAllowReadsWritesOnUIThread() {
        val expectation : Expectation = Expectation()
        activity!!.runOnUiThread {
            // :snippet-start: open-a-realm-local
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
            } catch(ex: RealmFileException) {
                Log.v("EXAMPLE", "Error opening the realm.")
                Log.v("EXAMPLE", ex.toString())
            }
            // :snippet-end:
            realm = Realm.getInstance(config)
            // :snippet-start: close-a-realm-local
            realm.close()
            // :snippet-end:

            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun configureARealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            // :snippet-start: configure-a-realm-local
            val config = RealmConfiguration.Builder()
                .name("alternate-realm")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .compactOnLaunch()
                .build()
            val realm = Realm.getInstance(config)
            Log.v("EXAMPLE", "Successfully opened a realm at: ${realm.path}")
            // :snippet-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun setAndUseDefaultRealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            // :snippet-start: set-default-realm
            val config = RealmConfiguration.Builder()
                .name("default-realm")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .compactOnLaunch()
                .inMemory()
                .build()
            // set this config as the default realm
            Realm.setDefaultConfiguration(config) // :emphasize:
            // :snippet-end:

            // :snippet-start: use-default-realm
            val realm = Realm.getDefaultInstance()
            Log.v("EXAMPLE","Successfully opened the default realm at: ${realm.path}")
            // :snippet-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}