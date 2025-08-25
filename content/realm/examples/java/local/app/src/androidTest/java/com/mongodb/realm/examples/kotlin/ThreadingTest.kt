package com.mongodb.realm.examples.kotlin

import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Assert
import org.junit.Test

class ThreadingTest : RealmTest() {
    @Test
    fun testRefreshRealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .name("refresh-realm")
                .build()
            val realm = Realm.getInstance(config)
            // :snippet-start: refresh-realm
            if (!realm.isAutoRefresh) {
                // manually refresh
                realm.refresh()
            }
            // :snippet-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testFreezeObjects() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .name("freeze-object")
                .build()
            val insertRealm = Realm.getInstance(config)
            insertRealm.executeTransaction {
                insertRealm.createObject(
                    Frog::class.java
                )
            }

            // :snippet-start: freeze-objects
            val realm = Realm.getInstance(config)

            // Get an immutable copy of the realm that can be passed across threads
            val frozenRealm = realm.freeze()
            Assert.assertTrue(frozenRealm.isFrozen)
            val frogs = realm.where(Frog::class.java).findAll()
            // You can freeze collections
            val frozenFrogs = frogs.freeze()
            Assert.assertTrue(frozenFrogs.isFrozen)

            // You can still read from frozen realms
            val frozenFrogs2 =
                frozenRealm.where(Frog::class.java).findAll()
            Assert.assertTrue(frozenFrogs2.isFrozen)
            val frog: Frog = frogs.first()!!
            Assert.assertTrue(!frog.realm.isFrozen)

            // You can freeze objects
            val frozenFrog: Frog = frog.freeze()
            Assert.assertTrue(frozenFrog.isFrozen)
            Assert.assertTrue(frozenFrog.realm.isFrozen)
            // :snippet-end:
            expectation.fulfill()
            realm.close()
        }
        expectation.await()
    }
}
