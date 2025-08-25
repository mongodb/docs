package com.mongodb.realm.realmkmmapp

//import kotlinx.coroutines.runBlocking

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.ext.realmSetOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmObject
import kotlinx.datetime.Instant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull


// :snippet-start: timestamp-workaround
// model class that stores an Instant (kotlinx-datetime) field as a RealmInstant via a conversion
class RealmInstantConversion : RealmObject {
    private var _timestamp: RealmInstant = RealmInstant.from(0, 0)
    public var timestamp: Instant
        get() {
            return _timestamp.toInstant()
        }
        set(value) {
            _timestamp = value.toRealmInstant()
        }
}

fun RealmInstant.toInstant(): Instant {
    val sec: Long = this.epochSeconds
    // The value always lies in the range `-999_999_999..999_999_999`.
    // minus for timestamps before epoch, positive for after
    val nano: Int = this.nanosecondsOfSecond

    return if (sec >= 0) { // For positive timestamps, conversion can happen directly
        Instant.fromEpochSeconds(sec, nano.toLong())
    } else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        Instant.fromEpochSeconds(sec - 1, 1_000_000 + nano.toLong())
    }
}

fun Instant.toRealmInstant(): RealmInstant {
    val sec: Long = this.epochSeconds
    // The value is always positive and lies in the range `0..999_999_999`.
    val nano: Int = this.nanosecondsOfSecond

    return if (sec >= 0) { // For positive timestamps, conversion can happen directly
        RealmInstant.from(sec, nano)
    } else {
        // For negative timestamps, RealmInstant starts from the higher value with negative
        // nanoseconds, while Instant starts from the lower value with positive nanoseconds
        // TODO This probably breaks at edge cases like MIN/MAX
        RealmInstant.from(sec + 1, -1_000_000 + nano)
    }
}
// :snippet-end:

class SchemaTest : RealmTest() {
    /*
    ** Object types defined in Schema.kt **
     */
    @Test
    fun createRealmObjectsTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class, ExampleRealmSet_Frog::class, ExampleRealmSet_Snack::class, ExampleRealmDictionary_Frog::class, ExampleEmbeddedObject_EmbeddedForest::class, ExampleRealmList_Frog::class, ExampleRealmList_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()

                // create basic frog object
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 12
                    species = "bullfrog"
                    owner = "Gonzo"
                })
                val frog = query<ExampleRealmObject_Frog>().find().first()
                assertEquals("Kermit", frog.name)
                delete(frog)
                assertEquals(0, query<ExampleRealmObject_Frog>().find().size)

                // create realm list object
                copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Timerk"
                    favoritePonds.add(ExampleRealmList_Pond().apply {
                        name = "Pond1"
                    })
                    favoritePonds.add(ExampleRealmList_Pond().apply {
                        name = "Pond2"
                    })
                    favoriteForests.add(ExampleEmbeddedObject_EmbeddedForest().apply {
                        name = "Forest1"
                    })
                    favoriteForests.add(ExampleEmbeddedObject_EmbeddedForest().apply {
                        name = "Forest2"
                    })
                    favoriteWeather.add("rain")
                    favoriteWeather.add("snow")
                })
                val realmListFrog = query<ExampleRealmList_Frog>().find().first()
                assertEquals("Timerk", realmListFrog.name)
                assertEquals(2, realmListFrog.favoritePonds.size)
                assertEquals(2, realmListFrog.favoriteForests.size)
                assertEquals(2, realmListFrog.favoriteWeather.size)
                delete(realmListFrog)
                assertEquals(0, query<ExampleRealmList_Frog>().find().size)

                // create realm set object
                copyToRealm(ExampleRealmSet_Frog().apply {
                    name = "Kermit2"
                    favoriteSnacks.add(ExampleRealmSet_Snack().apply {
                        name = "some flies"
                    })
                    favoriteSnacks.add(ExampleRealmSet_Snack().apply {
                        name = "some worms"
                    })
                    favoriteWeather.add("rain")
                })
                val realmSetFrog = query<ExampleRealmSet_Frog>().find().first()
                assertEquals("Kermit2", realmSetFrog.name)
                assertEquals(2, realmSetFrog.favoriteSnacks.size)
                assertEquals(1, realmSetFrog.favoriteWeather.size)
                delete(realmSetFrog)
                assertEquals(0, query<ExampleRealmSet_Frog>().find().size)

                // create realm dictionary object
                copyToRealm(ExampleRealmDictionary_Frog().apply {
                    name = "Kermit3"
                    favoriteFriendsByPond["Pond1"] = ExampleRealmDictionary_Frog().apply {
                        name = "Frog1"
                    }
                    favoriteTreesInForest["Forest1"] = ExampleEmbeddedObject_EmbeddedForest().apply {
                        name = "Tree1"
                    }
                    favoritePondsByForest["Forest2"] = "Pond1"

                })
                val realmDictionaryFrog = query<ExampleRealmDictionary_Frog>().find().first()
                assertEquals("Kermit3", realmDictionaryFrog.name)
                assertEquals(1, realmDictionaryFrog.favoriteFriendsByPond.size)
                assertEquals("Frog1", realmDictionaryFrog.favoriteFriendsByPond["Pond1"]?.name)
                assertEquals(1, realmDictionaryFrog.favoriteTreesInForest.size)
                assertEquals("Tree1", realmDictionaryFrog.favoriteTreesInForest["Forest1"]?.name)
                assertEquals(1, realmDictionaryFrog.favoritePondsByForest.size)
                assertEquals("Pond1", realmDictionaryFrog.favoritePondsByForest["Forest2"])
                delete(query<ExampleRealmDictionary_Frog>().find())
                assertEquals(0, query<ExampleRealmDictionary_Frog>().find().size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createRealmRelationshipsTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(ExampleRelationship_Frog::class, ExampleRelationship_Pond::class, ExampleRelationship_Forest::class,))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()

                // ** To-One Relationships between frogs & ponds **
                val pond1 = copyToRealm(ExampleRelationship_Pond().apply {
                    name = "Pond1"
                })
                val pond2 = copyToRealm(ExampleRelationship_Pond().apply {
                    name = "Pond2"
                })
                val frog1 = copyToRealm(ExampleRelationship_Frog().apply {
                    name = "Frog1"
                    age = 12
                    favoritePond = pond1
                })
                val frog2 = copyToRealm(ExampleRelationship_Frog().apply {
                    name = "Frog2"
                    favoritePond = pond2
                    bestFriend = frog1
                })
                val frog1Query = query<ExampleRelationship_Frog>().find().first()
                val frog2Query = query<ExampleRelationship_Frog>().find().last()
                assertEquals("Frog1", frog1Query.name)
                assertNull(frog1Query.bestFriend)
                assertEquals("Frog1", frog2Query.bestFriend?.name)
                assertEquals("Pond1", frog1Query.favoritePond?.name)
                assertEquals("Pond2", frog2Query.favoritePond?.name)

                // ** To-Many Relationships between frogs, forests, & ponds **
                val forest1 = copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Forest1"
                    frogsThatLiveHere.addAll(setOf(frog1, frog2))
                    nearbyPonds.addAll(listOf(pond1, pond2))
                })
                assertEquals(2, forest1.frogsThatLiveHere.size)
                assertEquals(2, forest1.nearbyPonds.size)
                assertEquals("Pond1", forest1.nearbyPonds[0].name)
                assertEquals("Pond2", forest1.nearbyPonds[1].name)
                assertEquals("Frog1", forest1.frogsThatLiveHere.first().name)
                assertEquals("Frog2", forest1.frogsThatLiveHere.last().name)
                delete(frog1)
                assertEquals(1, forest1.frogsThatLiveHere.size)
                deleteAll()
                assertEquals(0, query<ExampleRelationship_Frog>().find().size)
            }
            realm.close()
        }
    }

    @Test
    fun createInverseRelationshipsTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_User::class, ExampleRelationship_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()

                // ** Inverse Relationship between users & posts **
                val post1 = copyToRealm(ExampleRelationship_Post().apply {
                    title = "Post1"
                })
                val post2 = copyToRealm(ExampleRelationship_Post().apply {
                    title = "Post2"
                })
                val post3 = copyToRealm(ExampleRelationship_Post().apply {
                    title = "Post3"
                })
                val user1 = copyToRealm(ExampleRelationship_User().apply {
                    name = "User1"
                    posts.add(post1)
                    favoritePosts.addAll(realmSetOf(post1, post3))
                    postByYear["2021"] = post1
                })
                val user2 = copyToRealm(ExampleRelationship_User().apply {
                    name = "User2"
                    posts.add(post2)
                    favoritePosts.add(post2)
                    postByYear.putAll(setOf("2022" to post2, "2023" to post3))
                })
                assertEquals(1, user1.posts.size)
                assertEquals(2, user1.favoritePosts.size)
                assertEquals("2021", user1.postByYear.keys.first())
                assertEquals(post1, user1.postByYear.values.first())
                assertEquals(1, user2.posts.size)
                assertEquals(1, user2.favoritePosts.size)
                assertEquals("2022", user2.postByYear.keys.first())
                assertEquals(post2, user2.postByYear.values.first())
                assertEquals("2023", user2.postByYear.keys.last())
                assertEquals(post3, user2.postByYear.values.last())
                deleteAll()
                assertEquals(0, query<ExampleRelationship_User>().find().size)
            }
            realm.close()
        }
    }

    @Test
    fun createEmbeddedRelationshipsTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(ExampleRelationship_Contact::class, ExampleRelationship_EmbeddedAddress::class, ExampleRelationship_Business::class, ExampleRelationship_EmbeddedCountry::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()

                // ** Embedded Relationships between contacts, businesses, & addresses **
                val contact1 = copyToRealm(ExampleRelationship_Contact().apply {
                    name = "Contact1"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        street = "123 Fake St"
                        country = ExampleRelationship_EmbeddedCountry().apply {
                            name = "USA"
                        }
                    }
                })
                val business1 = copyToRealm(ExampleRelationship_Business().apply {
                    name = "Business1"
                    addresses = realmListOf(ExampleRelationship_EmbeddedAddress().apply {
                        street = "123 Fake St"
                        country = ExampleRelationship_EmbeddedCountry().apply {
                            name = "USA"
                        }
                    })
                    addressByYear["2021"] = ExampleRelationship_EmbeddedAddress().apply {
                        street = "456 Main Ave"
                        country = ExampleRelationship_EmbeddedCountry().apply {
                            name = "USA"
                        }
                    }
                })
                val contact1Query = query<ExampleRelationship_Contact>().find().first()
                val business1Query = query<ExampleRelationship_Business>().find().first()
                assertEquals("Contact1", contact1Query.name)
                assertEquals("123 Fake St", contact1Query.address?.street)
                assertEquals("USA", contact1Query.address?.country?.name)
                assertEquals("Business1", business1Query.name)
                assertEquals(1, business1Query.addresses.size)
                assertEquals("123 Fake St", business1Query.addresses.first().street)
                assertEquals("USA", business1Query.addresses.first().country?.name)
                assertEquals("456 Main Ave", business1Query.addressByYear["2021"]?.street)
                assertEquals("USA", business1Query.addressByYear["2021"]?.country?.name)
                deleteAll()
                assertEquals(0, query<ExampleRelationship_Contact>().find().size)
            }
            realm.close()
        }
    }
}