package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.java.FrogAny
import com.mongodb.realm.examples.model.java.FrogEnum
import com.mongodb.realm.examples.model.java.FrogState
import com.mongodb.realm.examples.model.java.GroupOfPeople
import com.mongodb.realm.examples.model.kotlin.*
import io.realm.*
import org.junit.Assert
import org.junit.Test
import java.util.*

class DataTypesTest : RealmTest() {
    @Test
    fun testRealmAny() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("realmany-test-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)

            realm.executeTransaction {
                // :replace-start: {
                //    "terms": {
                //       "FrogAnyKt": "Frog"
                //    }
                // }
                // :snippet-start: realmany
                val frog = realm.createObject(FrogAnyKt::class.java)
                frog.name = "George Washington"

                // set RealmAny field to a null value

                // set RealmAny field to a null value
                frog.bestFriend = RealmAny.nullValue()
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

                // possible types for RealmAny are defined in RealmAny.Type
                Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.NULL)

                // set RealmAny field to a string with RealmAny.valueOf a string value
                frog.bestFriend = RealmAny.valueOf("Greg")
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

                // RealmAny instances change type as you reassign to different values
                Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.STRING)

                // set RealmAny field to a realm object, also with valueOf
                val person = Person("Jason Funderburker")

                frog.bestFriend = RealmAny.valueOf(person)
                Log.v("EXAMPLE", "Best friend: " + frog.bestFriendToString())

                // You can also extract underlying Realm Objects from RealmAny with asRealmModel
                val bestFriendObject = frog.bestFriend?.asRealmModel(Person::class.java)
                Log.v("EXAMPLE", "Best friend: " + bestFriendObject?.name)

                // RealmAny fields referring to any Realm Object use the OBJECT type
                Assert.assertEquals(frog.bestFriend?.type, RealmAny.Type.OBJECT)

                // you can't put a RealmList in a RealmAny field directly,
                // ...but you can set a RealmAny field to a RealmObject that contains a list
                val persons = GroupOfPeople()
                // GroupOfPeople contains a RealmList of people
                persons.people.add("Rand")
                persons.people.add("Perrin")
                persons.people.add("Mat")

                frog.bestFriend = RealmAny.valueOf(persons)
                Log.v("EXAMPLE", "Best friend: " +
                        frog.bestFriend?.asRealmModel(GroupOfPeople::class.java)
                                ?.people.toString())
                // :snippet-end:
                // :replace-end:
                expectation.fulfill()
            }
        }
        expectation.await()
    }

    @Test
    fun testRealmEnum() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("realmenum-test-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            realm.executeTransaction { r: Realm? ->
                // :replace-start: {
                //    "terms": {
                //       "FrogEnumKt": "Frog",
                //       "FrogStateKt": "FrogState"
                //    }
                // }
                // :snippet-start: realmenum
                val frog = realm.createObject(FrogEnumKt::class.java)
                frog.name = "Jonathan Livingston Applesauce"
                // set the state using the enum
                frog.stateEnum = FrogStateKt.FROG

                // fetching the state returns an enum
                val currentJonathanState: FrogStateKt = frog.stateEnum
                // :snippet-end:
                // :replace-end:
                expectation.fulfill()
            }
        }
        expectation.await()
    }

    @Test
    fun testRealmAnyNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmany-notification-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build()
            val realm = Realm.getInstance(config)

            // :replace-start: {
            //    "terms": {
            //       "FrogAnyKt": "Frog"
            //    }
            // }
            // :snippet-start: realmany-notifications
            var frog: FrogAnyKt? = null

            realm.executeTransaction { r: Realm? ->
                frog = realm.createObject(FrogAnyKt::class.java)
                frog?.name = "Jonathan Livingston Applesauce"
            }

            val objectChangeListener
                    = RealmObjectChangeListener<FrogAnyKt> { frog, changeSet ->
                if (changeSet != null) {
                    Log.v("EXAMPLE", "Changes to fields: " +
                            changeSet.changedFields)
                    if (changeSet.isFieldChanged("best_friend")) {
                        Log.v("EXAMPLE", "RealmAny best friend field changed to : " +
                                frog.bestFriendToString())
                    }
                }
            }

            frog?.addChangeListener(objectChangeListener)

            realm.executeTransaction { r: Realm? ->
                // set RealmAny field to a null value
                frog?.bestFriend = RealmAny.nullValue()
                Log.v("EXAMPLE", "Best friend: " + frog?.bestFriendToString())

                // set RealmAny field to a string with RealmAny.valueOf a string value
                frog?.bestFriend = RealmAny.valueOf("Greg")
                expectation.fulfill() // :remove:
            }
            // :snippet-end:
            // :replace-end:
        }
        expectation.await()
    }


    @Test
    fun testRealmSet() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("realmset-test-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            realm.executeTransaction {
                // :replace-start: {
                //    "terms": {
                //       "FrogSetKt": "Frog",
                //       "SnackKt": "Snack"
                //    }
                // }
                // :snippet-start: realmSet
                val frog = realm.createObject(FrogSetKt::class.java)
                frog.name = "Jonathan Livingston Applesauce"

                // get the RealmSet field from the object we just created
                val set = frog.favoriteSnacks

                // add value to the RealmSet
                val flies = realm.createObject(SnackKt::class.java)
                flies.name = "flies"
                set.add(flies)

                // add multiple values to the RealmSet
                val water = realm.createObject(SnackKt::class.java)
                water.name = "water"
                val verySmallRocks = realm.createObject(SnackKt::class.java)
                verySmallRocks.name = "verySmallRocks"
                set.addAll(listOf(water, verySmallRocks))

                // check for the presence of a key with contains
                Assert.assertTrue(set.contains(flies))

                // check for the presence of multiple keys with containsAll
                val biscuits = realm.createObject(SnackKt::class.java)
                biscuits.name = "biscuits"
                Assert.assertTrue(set.containsAll(Arrays.asList(water, biscuits)) == false)

                // remove string from a set
                set.remove(verySmallRocks)

                // set no longer contains that string
                Assert.assertTrue(set.contains(verySmallRocks) == false)

                // deleting a Realm object also removes it from any RealmSets
                val sizeOfSetBeforeDelete = set.size
                flies.deleteFromRealm()
                // deleting flies object reduced the size of the set by one
                Assert.assertTrue(sizeOfSetBeforeDelete == set.size + 1)
                // :snippet-end:
                // :replace-end:
                expectation.fulfill()
            }
        }
        expectation.await()
    }

    @Test
    fun testRealmSetNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmset-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build()
            val realm = Realm.getInstance(config)

            // :replace-start: {
            //    "terms": {
            //       "FrogSetKt": "Frog",
            //       "SnackKt": "Snack"
            //    }
            // }
            // :snippet-start: realmset-notifications
            var frog :FrogSetKt? = null
            realm.executeTransaction { r: Realm? ->
                frog = realm.createObject(FrogSetKt::class.java)
                frog?.name = "Jonathan Livingston Applesauce"
            }

            val setChangeListener: SetChangeListener<SnackKt>
                    = SetChangeListener<SnackKt> { set, changes ->
                Log.v("EXAMPLE", "Set changed: " +
                        changes.numberOfInsertions + " new items, " +
                        changes.numberOfDeletions + " items removed.")
            }
            frog?.favoriteSnacks?.addChangeListener(setChangeListener)

            realm.executeTransaction { r: Realm? ->
                // get the RealmSet field from the object we just created
                val set = frog!!.favoriteSnacks

                // add value to the RealmSet
                val flies = realm.createObject(SnackKt::class.java)
                flies.name = "flies"
                set.add(flies)

                // add multiple values to the RealmSet
                val water = realm.createObject(SnackKt::class.java)
                water.name = "water"
                val verySmallRocks = realm.createObject(SnackKt::class.java)
                verySmallRocks.name = "verySmallRocks"
                set.addAll(Arrays.asList(water, verySmallRocks))
                expectation.fulfill() // :remove:
            }
            // :snippet-end:
            // :replace-end:
        }
        expectation.await()
    }

    @Test
    fun testRealmDictionary() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("realmdictionary-test-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            realm.executeTransaction { r: Realm? ->
                // :replace-start: {
                //    "terms": {
                //       "FrogDictionaryKt": "Frog"
                //    }
                // }
                // :snippet-start: realmDictionary
                val frog =
                    realm.createObject(FrogDictionaryKt::class.java)
                frog.name = "George Washington"

                // get the RealmDictionary field from the object we just created
                val dictionary = frog.nicknamesToFriends

                // add key/value to the dictionary
                val wirt =
                    realm.createObject(FrogDictionaryKt::class.java)
                wirt.name = "Wirt"
                dictionary["tall frog"] = wirt

                // add multiple keys/values to the dictionary
                val greg =
                    realm.createObject(FrogDictionaryKt::class.java)
                greg.name = "Greg"
                val beatrice =
                    realm.createObject(FrogDictionaryKt::class.java)
                beatrice.name = "Beatrice"
                dictionary.putAll(mapOf<String, FrogDictionaryKt>(
                    Pair("small frog", greg),
                    Pair("feathered frog", beatrice)))

                // check for the presence of a key
                Assert.assertTrue(dictionary.containsKey("small frog"))

                // check for the presence of a value
                Assert.assertTrue(dictionary.containsValue(greg))

                // remove a key
                dictionary.remove("feathered frog")
                Assert.assertFalse(dictionary.containsKey("feathered frog"))

                // deleting a Realm object does NOT remove it from the dictionary
                val sizeOfDictionaryBeforeDelete = dictionary.size
                greg.deleteFromRealm()
                // deleting greg object did not reduce the size of the dictionary
                Assert.assertEquals(
                    sizeOfDictionaryBeforeDelete.toLong(),
                    dictionary.size.toLong()
                )
                // but greg object IS now null:
                Assert.assertEquals(dictionary["small frog"], null)
                // :snippet-end:
                // :replace-end:
                expectation.fulfill()
            }
        }
        expectation.await()
    }

    @Test
    fun testRealmDictionaryNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                    .inMemory()
                    .name("realmdictionary-test-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build()
            val realm = Realm.getInstance(config)

            // :replace-start: {
            //    "terms": {
            //       "FrogDictionaryKt": "Frog"
            //    }
            // }
            // :snippet-start: realmdictionary-notifications
            var frog: FrogDictionaryKt? = null
            realm.executeTransaction { r: Realm? ->
                frog = realm.createObject(FrogDictionaryKt::class.java)
                frog?.name = "Jonathan Livingston Applesauce"
            }

            val mapChangeListener: MapChangeListener<String, FrogDictionaryKt>
                    = MapChangeListener<String, FrogDictionaryKt> { map, changes ->
                for (insertion in changes.insertions) {
                    Log.v("EXAMPLE",
                            "Inserted key:  $insertion, Inserted value: ${map[insertion]!!.name}")
                }
            }

            frog?.nicknamesToFriends?.addChangeListener(mapChangeListener)

            realm.executeTransaction { r: Realm? ->
                // get the RealmDictionary field from the object we just created
                val dictionary = frog!!.nicknamesToFriends

                // add key/value to the dictionary
                val wirt = realm.createObject(FrogDictionaryKt::class.java)
                wirt.name = "Wirt"
                dictionary["tall frog"] = wirt

                // add multiple keys/values to the dictionary
                val greg = realm.createObject(FrogDictionaryKt::class.java)
                greg.name = "Greg"
                val beatrice = realm.createObject(FrogDictionaryKt::class.java)
                beatrice.name = "Beatrice"
                dictionary.putAll(mapOf<String, FrogDictionaryKt>(
                        Pair("small frog", greg),
                        Pair("feathered frog", beatrice)))
                expectation.fulfill() // :remove:
            }
            // :snippet-end:
            // :replace-end:
        }
        expectation.await()
    }
}
