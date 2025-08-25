package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Frog
import com.mongodb.realm.examples.model.kotlin.HauntedHouseKt
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream

class WritesTest : RealmTest() {
    @Test
    fun testCreateObjectFromJSON() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .name("create-object-from-json")
                .build()
            val realm = Realm.getInstance(config)
            try {
                // :snippet-start: create-an-object-json
                // Insert from a string
                realm.executeTransaction { realm ->
                    realm.createObjectFromJson(
                        Frog::class.java,
                        "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }"
                    )
                }

                // Insert multiple items using an InputStream
                realm.executeTransaction { realm ->
                    try {
                        val inputStream: InputStream =
                            FileInputStream(File("path_to_file"))
                        realm.createAllFromJson(Frog::class.java, inputStream)
                    } catch (e: IOException) {
                        throw RuntimeException(e)
                    }
                }
                // :snippet-end:
            } catch (e: Exception) { // this should throw when "path_to_file" doesn't resolve to a real file
                expectation.fulfill()
            }
            realm.close()
        }
        expectation.await()
    }
  
    @Test
    fun testIterate() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name("writes-test-iterate")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .build()
            val realm = Realm.getInstance(config)
            // :snippet-start: iterate
            val frogs = realm.where(Frog::class.java)
                .equalTo("species", "bullfrog")
                .findAll()

            // Use an iterator to rename the species of all bullfrogs
            realm.executeTransaction {
                for (frog in frogs) {
                    frog.species = "Lithobates catesbeiana"
                }
            }

            // Use a snapshot to rename the species of all bullfrogs
            realm.executeTransaction {
                val frogsSnapshot = frogs.createSnapshot()
                for (i in frogsSnapshot.indices) {
                    frogsSnapshot[i]!!.species = "Lithobates catesbeiana"
                }
            }
            // :snippet-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testCounter() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name("writes-test-counter")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .inMemory()
                .build()
            val realm = Realm.getInstance(config)
            realm.executeTransaction { r: Realm? ->
                realm.createObject(
                    HauntedHouseKt::class.java
                )
            }
            // :replace-start: {
            //    "terms": {
            //       "HauntedHouseKt": "HauntedHouse"
            //    }
            // }
            // :snippet-start: counter-increment-decrement
            val house = realm.where(HauntedHouseKt::class.java)
                .findFirst()!!
            realm.executeTransaction {
                Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 0
                house.ghosts.increment(1)
                Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 1
                house.ghosts.increment(5)
                Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 6
                house.ghosts.decrement(2)
                Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 4
            }
            // :snippet-end:

            // :snippet-start: counter-set
            realm.executeTransaction {
                house!!.ghosts.set(42)
            }
            // :snippet-end:
            // :replace-end:
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}