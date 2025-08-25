package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.MutableRealmInt
import io.realm.kotlin.types.RealmAny
import io.realm.kotlin.types.RealmInstant
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

// :replace-start: {
//    "terms": {
//       "ExampleRealmObject_": "",
//       "RealmObjectProperties_": "",
//       "ExampleEmbeddedObject_": "",
//       "ExampleRelationship_": "",
//       "ExampleRealmList_": "",
//       "ExampleRealmDictionary_": "",
//       "ExampleRealmSet_": "",
//       "RealmEmbeddedObject_": ""
//    }
// }

/*
** Snippets used on Create page **
** Object models defined in Schema.kt **
 */

class CreateTest: RealmTest() {

    @Test
    fun createRealmObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-new-realm-object
            // Open a write transaction
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object
                val unmanagedFrog = ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                }
                assertFalse(unmanagedFrog.isManaged())

                // Copy the object to realm to return a managed instance
                val managedFrog = copyToRealm(unmanagedFrog)
                assertTrue(managedFrog.isManaged())

                // Work with the managed object ...
            }
            // :snippet-end:
            realm.write {
                val deleteFrog = query<ExampleRealmObject_Frog>().find().first()
                assertEquals("Kermit", deleteFrog.name)
                delete(deleteFrog)
            }
            realm.close()
        }
    }

    @Test
    fun createEmbeddedObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
                    ExampleRelationship_Business::class,
                    ExampleRelationship_Contact::class,
                    ExampleRelationship_EmbeddedCountry::class,
                    ExampleRelationship_EmbeddedAddress::class
                )
            )
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-one-embedded-object
            realm.write {
                deleteAll() // :remove:
                // Instantiate a parent object with one embedded address
                val contact = ExampleRelationship_Contact().apply {
                    name = "Kermit"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Frog" }
                        street = "123 Pond St"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    }
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(contact)
            }
            // :snippet-end:
            // :snippet-start: create-many-embedded-objects
            realm.write {
                // Instantiate a parent object with multiple embedded addresses
                val localOffice = ExampleRelationship_EmbeddedAddress().apply {
                    propertyOwner = ExampleRelationship_Contact().apply { name = "Michigan J. Frog" }
                    street = "456 Lily Pad Ln"
                    country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                }
                val remoteOffice = ExampleRelationship_EmbeddedAddress().apply {
                    propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Toad" }
                    street = "789 Leaping Frog Ave"
                    country = ExampleRelationship_EmbeddedCountry().apply { name = "Ireland" }
                }
                val business = ExampleRelationship_Business().apply {
                    name = "Big Frog Corp."
                    addresses = realmListOf(localOffice, remoteOffice)
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(business)
            }
            // :snippet-end:
            realm.write {
                val deleteContact = query<ExampleRelationship_Contact>().find().first()
                assertEquals("Kermit", deleteContact.name)
                delete(deleteContact)
                val deleteBusiness = query<ExampleRelationship_Business>().find().first()
                assertEquals("Big Frog Corp.", deleteBusiness.name)
                assertEquals("Michigan J. Frog", deleteBusiness.addresses.first().propertyOwner?.name)
                assertEquals("456 Lily Pad Ln", deleteBusiness.addresses.first().street)
                assertEquals("789 Leaping Frog Ave", deleteBusiness.addresses.last().street)
                assertEquals("Mr. Toad", deleteBusiness.addresses.last().propertyOwner?.name)
                delete(deleteBusiness)
            }
            realm.close()
        }
    }

    @Test
    fun createRealmInstant() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: create-realminstant-property
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with a RealmInstant property
                val frog = RealmObjectProperties_Frog().apply {
                    name = "Kermit"
                    // Set an initial value with RealmInstant.from() or RealmInstant.now()
                    birthdate = RealmInstant.from(1_577_996_800, 0)
                }
                // Copy the object to the realm to return a managed instance
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                assertEquals(1_577_996_800, frog.birthdate?.epochSeconds)
                delete(frog)
            }
            realm.close()
        }
    }

    @Test
    fun createMutableRealmInt() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-mutablerealm-property
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with a MutableRealmInt property
                val frog = RealmObjectProperties_Frog().apply {
                    name = "Michigan J. Frog"
                    // Set an initial value with MutableRealmInt.create()
                    fliesEaten = MutableRealmInt.create(200)
                }
                // Copy the object to the realm to return a managed instance
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                assertEquals(200, frog.fliesEaten?.get())
                frog.fliesEaten?.increment(1)
                assertEquals(201, frog.fliesEaten?.get())
                frog.fliesEaten?.decrement(1)
                assertEquals(200, frog.fliesEaten?.get())
                delete(frog)
            }
            realm.close()
        }
    }

    @Test
    fun createRealmAny() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: create-realmany-property
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with a RealmAny property
                val frog = RealmObjectProperties_Frog().apply {
                    name = "Kermit"
                    // Set initial values with RealmAny.create()
                    favoriteThings = realmListOf(
                        RealmAny.create(42),
                        RealmAny.create("rainbows"),
                        RealmAny.create(RealmObjectProperties_Frog().apply {
                            name = "Kermit Jr."
                        })
                    )
                }
                // Copy the object to the realm to return a managed instance
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                assertEquals(42, frog.favoriteThings.first()?.asInt())
                assertEquals("rainbows", frog.favoriteThings[1]?.asString())
                assertEquals("Kermit Jr.", frog.favoriteThings[2]?.asRealmObject<RealmObjectProperties_Frog>()?.name)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createRealmList(){
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(
                ExampleRealmList_Frog::class, ExampleRealmList_Pond::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: create-realm-list
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with a RealmList property
                val frog = ExampleRealmList_Frog().apply {
                    name = "Kermit"
                    // Set values for each unmanaged list
                    favoritePonds.addAll(realmListOf(
                        ExampleRealmList_Pond().apply { name = "Picnic Pond" },
                        ExampleRealmList_Pond().apply { name = "Big Pond" }
                    ))
                    favoriteForests.add(ExampleEmbeddedObject_EmbeddedForest().apply { name = "Hundred Acre Wood" })
                    favoriteWeather = realmListOf("rain", "snow")
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.writeBlocking {
                val kermit = query<ExampleRealmList_Frog>("name = $0", "Kermit").find().first()
                assertEquals("Picnic Pond", kermit.favoritePonds[0].name)
                assertEquals("Big Pond", kermit.favoritePonds[1].name)
                assertEquals("Hundred Acre Wood", kermit.favoriteForests[0].name)
                assertEquals("rain", kermit.favoriteWeather[0])
                assertEquals("snow", kermit.favoriteWeather[1])
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createRealmSet() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmSet_Frog::class, ExampleRealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            // :snippet-start: create-realm-set
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with RealmSet properties
                val frog = ExampleRealmSet_Frog().apply {
                    name = "Kermit"
                    // Set initial values to each unmanaged set
                    favoriteSnacks.addAll(setOf(
                        ExampleRealmSet_Snack().apply { name = "flies" },
                        ExampleRealmSet_Snack().apply { name = "crickets" },
                        ExampleRealmSet_Snack().apply { name = "worms" }
                    ))
                    favoriteWeather.add("rain")
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.writeBlocking {
                val kermit = query<ExampleRealmSet_Frog>("name = $0", "Kermit").find().first()
                assertEquals(3, kermit.favoriteSnacks.size)
                val snacks = kermit.favoriteSnacks.toList()
                assertEquals("flies", snacks[0].name)
                assertEquals("crickets", snacks[1].name)
                assertEquals("worms", snacks[2].name)
                assertTrue(kermit.favoriteWeather.contains("rain"))
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmDictionary_Frog::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // :snippet-start: create-dictionary
            realm.write {
                deleteAll() // :remove:
                val frog = ExampleRealmDictionary_Frog().apply {
                    name = "Kermit"
                    // Set initial key-values to each unmanaged dictionary
                    favoriteFriendsByPond = realmDictionaryOf(
                        "Picnic Pond" to ExampleRealmDictionary_Frog().apply { name = "Froggy Jay" },
                        "Big Pond" to ExampleRealmDictionary_Frog().apply { name = "Mr. Toad" }
                    )
                    favoriteTreesInForest["Maple"] = ExampleEmbeddedObject_EmbeddedForest().apply {
                        name = "Hundred Acre Wood"
                    }
                    favoritePondsByForest.putAll(
                        mapOf(
                            "Silver Pond" to "Big Forest",
                            "Big Lake" to "Elm Wood",
                            "Trout Pond" to "Sunny Wood"
                        )
                    )
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.write {
                val frogs = query<ExampleRealmDictionary_Frog>().find().first()
                assertEquals("Froggy Jay", frogs.favoriteFriendsByPond["Picnic Pond"]?.name)
                assertEquals("Maple", frogs.favoriteTreesInForest.keys.first())
                assertEquals("Big Forest", frogs.favoritePondsByForest["Silver Pond"])
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createRealmDictionaryPercentEncodedDisallowedCharacter() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmDictionary_Frog::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // :snippet-start: percent-encode-disallowed-characters
            // Percent encode . or $ characters to use them in map keys
            val mapKey = "Hundred Acre Wood.Northeast"
            val encodedMapKey = "Hundred Acre Wood%2ENortheast"
            // :snippet-end:

            // Round-trip an object with a percent-encoded map key just to confirm it works
            // Not testing encoding/decoding here because (Dachary) could not figure out how to add java.net as a dependency
            // This functionality seems to be provided by java.net.URLEncoder/URLDecoder
            realm.write {
                deleteAll()
                val frog = ExampleRealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoriteTreesInForest[encodedMapKey] = ExampleEmbeddedObject_EmbeddedForest().apply {
                        name = "Hundred Acre Wood"
                    }
                }
                val savedEncodedMapKey = frog.favoriteTreesInForest.keys.first()
                assertEquals(encodedMapKey, savedEncodedMapKey)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createToOneRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-to-one-realm-relationship
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Frog object with to-one
                // relationship with a Realm object
                val frog = ExampleRelationship_Frog().apply {
                    name = "Kermit"
                    age = 12
                    favoritePond = ExampleRelationship_Pond().apply { name = "Picnic Pond" }
                    bestFriend = ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(frog)
            }
            // :snippet-end:
            realm.write {
                val kermit = query<ExampleRelationship_Frog>("name == $0", "Kermit").find().first()
                assertEquals("Picnic Pond", kermit.favoritePond?.name)
                val froggyJay = query<ExampleRelationship_Frog>("name == $0", "Froggy Jay").find().first()
                assertEquals(froggyJay, kermit.bestFriend)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createToManyRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Forest::class, ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-to-many-realm-relationship
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged Forest object with to-many
                // relationship with multiple Realm objects
                val forest = ExampleRelationship_Forest().apply {
                    name = "Froggy Forest"
                    frogsThatLiveHere = realmSetOf(
                        ExampleRelationship_Frog().apply { name = "Kermit" },
                        ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                    )
                    nearbyPonds = realmListOf(
                        ExampleRelationship_Pond().apply { name = "Small Picnic Pond" },
                        ExampleRelationship_Pond().apply { name = "Big Pond" }
                    )
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(forest)
            }
            // :snippet-end:
            realm.write {
                val forest = query<ExampleRelationship_Forest>().find().first()
                assertEquals(2, forest.frogsThatLiveHere.size)
                assertEquals(2, forest.nearbyPonds.size)
                val kermit = query<ExampleRelationship_Frog>("name == $0", "Kermit").find().first()
                assertTrue(forest.frogsThatLiveHere.contains(kermit))
                val bigPond = query<ExampleRelationship_Pond>("name == $0", "Big Pond").find().first()
                assertTrue(forest.nearbyPonds.contains(bigPond))
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createInverseRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_User::class, ExampleRelationship_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            // :snippet-start: create-inverse-realm-relationship
            realm.write {
                deleteAll() // :remove:
                // Instantiate a new unmanaged User object with to-many
                // relationship with multiple Realm objects
                val post1 = ExampleRelationship_Post().apply {
                    title = "Forest Life"
                }
                val post2 = ExampleRelationship_Post().apply {
                    title = "Top Ponds of the Year!"
                }

                val user = ExampleRelationship_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                }
                // Copy all objects to the realm to return managed instances
                copyToRealm(user)
            }
            // :snippet-end:
            realm.write {
                val user = query<ExampleRelationship_User>().find().first()
                assertEquals(2, user.posts.size)
                val post1 = query<ExampleRelationship_Post>("title == $0", "Forest Life").find().first()
                val post2 = query<ExampleRelationship_Post>("title == $0", "Top Ponds of the Year!").find().first()
                assertTrue(user.posts.containsAll(listOf(post1, post2)))
                assertTrue(post1.user.contains(user))
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun createUnmanagedCopy() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Pond::class, ExampleRealmObject_Frog::class))
                .inMemory()
                .name("create-unmanaged-copy")
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.writeBlocking {
                copyToRealm(ExampleRealmObject_Pond().apply {
                    name = "Big Pond"
                    frogsThatLiveHere = realmListOf(
                        ExampleRealmObject_Frog().apply { name = "Kermit" },
                        ExampleRealmObject_Frog().apply { name = "Froggy Jay" }
                    )
                })
            }

            // :snippet-start: create-unmanaged-copy
            realm.writeBlocking {
                // Fetch the managed object you want to copy
                val managedPond = query<ExampleRealmObject_Pond>("name == $0", "Big Pond").find().first()
                assertTrue(managedPond.isManaged())

                // Create an unmanaged copy of the object
                val unmanagedPond = copyFromRealm(managedPond)
                assertFalse(unmanagedPond.isManaged())
                Log.v("Unmanaged pond name: ${unmanagedPond.name}")

                // Confirm the unmanaged copy contains all elements
                // in the copied object's RealmList
                val unmanagedFrogs = unmanagedPond.frogsThatLiveHere
                assertFalse(unmanagedFrogs[0].isManaged())
                assertFalse(unmanagedFrogs[1].isManaged())
                assertEquals(2, unmanagedFrogs.size)
                Log.v("Unmanaged frogs: ${unmanagedFrogs[0].name}, ${unmanagedFrogs[1].name}")
            }
            // :snippet-end:
            realm.write {
                deleteAll()
            }
            realm.close()
        }
    }
}
// :replace-end: