package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.UpdatePolicy
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.MutableRealmInt
import io.realm.kotlin.types.RealmAny
import io.realm.kotlin.types.RealmList
import org.mongodb.kbson.ObjectId
import kotlin.test.*

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
** Snippets used on Update page **
** Object models defined in Schema.kt **
*/

class UpdateTest: RealmTest() {

    @Test
    fun updateRealmObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val PRIMARY_KEY_VALUE = ObjectId()

            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: update-a-realm-object
            // Query and update a realm object in a single write transaction
            realm.write {
                val liveFrog = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(liveFrog._id, PRIMARY_KEY_VALUE) // :remove:
                liveFrog.name = "Michigan J. Frog"
                liveFrog.age += 1
            }
            // :snippet-end:
            // :snippet-start: fetch-latest-to-update-object
            val frozenFrog = realm.query<ExampleRealmObject_Frog>().find().first()
            assertEquals("Michigan J. Frog", frozenFrog.name) // :remove:
            assertEquals(43, frozenFrog.age) // :remove:

            // Open a write transaction
            realm.write {
                // Get the live frog object with findLatest(), then update it
                findLatest(frozenFrog)?.let { liveFrog ->
                    liveFrog.name = "Kermit"
                    liveFrog.age -= 1
                }
            }
            // :snippet-end:
            realm.write {
                val updatedFrog = query<ExampleRealmObject_Frog>().find().first()
                assertEquals("Kermit", updatedFrog.name)
                assertEquals(42, updatedFrog.age)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateEmbeddedObject() {
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

            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Contact().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Frog" }
                        street = "123 Pond St"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    }
                })
                val currentContact = query<ExampleRelationship_Contact>().find().first()
                assertEquals("Kermit", currentContact.name)
                assertEquals("Mr. Frog", currentContact.address?.propertyOwner?.name)
                assertEquals("123 Pond St", currentContact.address?.street)
                assertEquals("United States", currentContact.address?.country?.name)
            }
            // :snippet-start: update-embedded-object
            realm.write {
                val parentObject = query<ExampleRelationship_Contact>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                val embeddedChildObject = parentObject.address

                // Update a property through the embedded child object
                embeddedChildObject?.propertyOwner?.name = "Michigan J. Frog"
                assertEquals("Michigan J. Frog", embeddedChildObject?.propertyOwner?.name) // :remove:
                // Update a property through the parent object
                parentObject.address?.country?.name = "Brazil"
                assertEquals("Brazil", parentObject.address?.country?.name) // :remove:

                // Update multiple properties
                val embeddedAddress = query<ExampleRelationship_EmbeddedAddress>("street == $0", "123 Pond St").find().first()
                embeddedAddress.apply {
                    propertyOwner?.name = "Kermit Sr."
                    street = "456 Lily Pad Ln"
                    country?.name = "Canada"
                }
                assertEquals("Kermit Sr.", embeddedAddress.propertyOwner?.name) // :remove:
                assertEquals("456 Lily Pad Ln", embeddedAddress.street) // :remove:
                assertEquals("Canada", embeddedAddress.country?.name) // :remove:
            }
            // :snippet-end:
            // :snippet-start: overwrite-embedded-object
            realm.write {
                val parentObject = query<ExampleRelationship_Contact>("_id == $0", PRIMARY_KEY_VALUE).find().first()

                val newAddress = ExampleRelationship_EmbeddedAddress().apply {
                    propertyOwner = ExampleRelationship_Contact().apply { name = "Michigan J. Frog" }
                    street = "456 Lily Pad Ln"
                    country = ExampleRelationship_EmbeddedCountry().apply { name = "Canada" }
                }
                // Overwrite the embedded object with the new instance (deletes the existing object)
                parentObject.address = newAddress
            }
            // :snippet-end:
            realm.write {
                val deleteContact = query<ExampleRelationship_Contact>().find().first()
                assertEquals("Kermit", deleteContact.name)
                assertEquals("Michigan J. Frog", deleteContact.address?.propertyOwner?.name)
                assertEquals("456 Lily Pad Ln", deleteContact.address?.street)
                assertEquals("Canada", deleteContact.address?.country?.name)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateMutableRealmInt() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm(RealmObjectProperties_Frog().apply {
                    name = "Michigan J. Frog"
                    _id = PRIMARY_KEY_VALUE
                    fliesEaten = MutableRealmInt.create(1)
                })
            }
            // :snippet-start: update-mutablerealm-property
            // Open a write transaction
            realm.write {
                // Get the live object
                val frog = query<RealmObjectProperties_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                val counter: MutableRealmInt? = frog.fliesEaten
                counter?.get() // 1
                assertEquals(1, counter?.get()) // :remove:

                // Increment the value of the MutableRealmInt property
                // ** Note use of decrement() with negative value **
                counter?.increment(0) // 1
                counter?.increment(5) // 6
                counter?.decrement(-2) // 8
                assertEquals(8, counter?.get()) // :remove:

                // Decrement the value of the MutableRealmInt property
                // ** Note use of increment() with negative value **
                counter?.decrement(0) // 8
                counter?.decrement(2) // 6
                counter?.increment(-1) // 5
                assertEquals(5, counter?.get()) // :remove:

                // Set the value of the MutableRealmInt property
                // ** Use set() with caution **
                counter?.set(0)// 0
                assertEquals(0, counter?.get()) // :remove:
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun updateRealmAny(){
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(RealmObjectProperties_Frog().apply {
                    name = "Kermit"
                    favoriteThings = realmListOf(
                        RealmAny.create(42),
                        RealmAny.create("rainbows"),
                        RealmAny.create(RealmObjectProperties_Frog().apply {
                            name = "Kermit Jr."
                        })
                    )
                })
            }
            // :snippet-start: update-realmany-property
            // Find favoriteThing that is an Int
            // Convert the value to Double and update the favoriteThing property
            realm.write {
            val kermit = query<RealmObjectProperties_Frog>().find().first()
            val realmAny: RealmList<RealmAny?> = kermit.favoriteThings

                for (i in realmAny.indices) {
                    val thing = realmAny[i]
                    if (thing?.type == RealmAny.Type.INT) {
                        val intValue = thing.asInt()
                        val doubleValue = intValue.toDouble()
                           realmAny[i] = RealmAny.create(doubleValue)
                    }
                }
            }
            assertEquals(42.0, realm.query<RealmObjectProperties_Frog>().find().first().favoriteThings[0]?.asDouble()) // :remove:

            // Overwrite all existing favoriteThing properties
            // ** Null clears the property value **
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                val realmAny: RealmList<RealmAny?> = frog.favoriteThings

                realmAny[0] = RealmAny.create("sunshine")
                realmAny[1] = RealmAny.create(RealmObjectProperties_Frog().apply { name = "Kermit Sr." })
                realmAny[2] = null
            }
            // :snippet-end:
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                assertEquals("sunshine", frog.favoriteThings[0]?.asString())
                assertEquals("Kermit Sr.", frog.favoriteThings[1]?.asRealmObject<RealmObjectProperties_Frog>()?.name)
                assertNull(frog.favoriteThings[2])
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateRealmCollection() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Wirt"
                    age = 1
                    owner = "L'oric"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Mr. Toad"
                    age = 2
                    owner = "Kenneth Grahame"
                })
            }
            // :snippet-start: update-a-collection
                val tadpoles = realm.query<ExampleRealmObject_Frog>("age <= $0", 2)
                for (tadpole in tadpoles.find()) {
                    realm.write {
                        findLatest(tadpole)?.name = tadpole.name + " Jr."
                    }
                }
            // :snippet-end:
            realm.write {
                val updated = query<ExampleRealmObject_Frog>("age <= $0", 2).find()
                assertEquals(2, updated.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateRealmList() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(
                ExampleRealmList_Frog::class, ExampleRealmList_Pond::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
               copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Kermit"
                    favoritePonds.addAll(realmListOf(
                        ExampleRealmList_Pond().apply { name = "Big Little Pond" },
                        ExampleRealmList_Pond().apply { name = "Blue Pond" }
                    ))
                })
            }
            // :snippet-start: update-realm-list
            realm.write {
                // Get the live object
                val realmList = query<ExampleRealmList_Frog>("name = $0", "Kermit").first().find()!!.favoritePonds
                realmList[0].name = "Picnic Pond"
                realmList.set(1, ExampleRealmList_Pond().apply { name = "Big Pond" })
            }
            // :snippet-end:
            realm.write {
                val kermit = query<ExampleRealmList_Frog>("name = $0", "Kermit").find().first()
                assertEquals("Picnic Pond", kermit.favoritePonds[0].name)
                assertEquals("Big Pond", kermit.favoritePonds[1].name)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateRealmSet() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmSet_Frog::class, ExampleRealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll() // :remove:
                copyToRealm(ExampleRealmSet_Frog().apply {
                    name = "Kermit"
                    favoriteSnacks.addAll(setOf(
                        ExampleRealmSet_Snack().apply { name = "flies" },
                        ExampleRealmSet_Snack().apply { name = "crickets" },
                        ExampleRealmSet_Snack().apply { name = "worms" }
                    ))})
                copyToRealm(ExampleRealmSet_Frog().apply {
                    name = "Froggy the Frog"
                    favoriteWeather.add("rain")
                })
            }
            // :snippet-start: update-realm-set
            // Find a frog in the realm
            val kermit = realm.query<ExampleRealmSet_Frog>("name = $0", "Kermit").find().first()
            val realmSet = kermit.favoriteSnacks
            // Update the name of each snack in the set
            for (snack in realmSet) {
                realm.write {
                    findLatest(snack)?.name = snack.name.uppercase()
                }
            }

            realm.write {
                // Find all frogs who like rain
                val frogsWhoLikeRain = realm.query<ExampleRealmSet_Frog>("favoriteWeather CONTAINS $0", "rain").find()
                // Add thunderstorms to their favoriteWeather set
                for (frog in frogsWhoLikeRain) {
                    val latestFrog = findLatest(frog)
                    latestFrog?.favoriteWeather?.add("thunderstorms")
                }
            }
            // :snippet-end:
            realm.write {
                assertEquals(3, realmSet.size)
                val updatedRealmSet = realm.query<ExampleRealmSet_Frog>("name = $0", "Kermit").first().find()!!.favoriteSnacks
                for (snack in updatedRealmSet) {
                    val expectedName = snack.name.uppercase()
                    assertEquals(expectedName, snack.name)
                }
                val froggy = realm.query<ExampleRealmSet_Frog>("name = $0", "Froggy the Frog").find().first()
                assertTrue(froggy.favoriteWeather.contains("thunderstorms"))
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmDictionary_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()
                copyToRealm(RealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-start: update-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val thisFrog = realm.query<RealmDictionary_Frog>("favoritePondsByForest.@count > 1").find().first()
            // :remove-start:
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood"))
            // :remove-end:
            // Update the value for a key if it exists
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                realm.write {
                    findLatest(thisFrog)?.favoritePondsByForest?.set("Lothlorien", "Lily Pad Pond")
                }
            }
            // Add a new key-value pair
            realm.write {
                findLatest(thisFrog)?.favoritePondsByForest?.put("Sherwood Forest", "Miller Pond")
            }
            // :snippet-end:
            val thisFrogUpdated = realm.query<RealmDictionary_Frog>("favoritePondsByForest.@count > 1").find().first()
            assertTrue(thisFrogUpdated.favoritePondsByForest.containsValue("Lily Pad Pond"))
            assertTrue(thisFrogUpdated.favoritePondsByForest.containsKey("Sherwood Forest"))
            assertTrue(thisFrogUpdated.favoritePondsByForest["Sherwood Forest"] == "Miller Pond")
            realm.write {
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun upsertAnObjectTest() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val PRIMARY_KEY_VALUE = ObjectId()

            // :snippet-start: upsert-an-object
            realm.write {
                // :remove-start:
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                })
                val frogObjectId = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find()
                assertEquals(frogObjectId.first()._id, PRIMARY_KEY_VALUE)
                assertEquals(1, frogObjectId.size)
                // :remove-end:
                val existingFrog = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(existingFrog.name, "Kermit")

                // Use copyToRealm() to insert the object with the primary key
                // ** UpdatePolicy determines whether to update or throw an error if object already exists**
                copyToRealm(ExampleRealmObject_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Wirt"
                    age = 4
                    species = "Greyfrog"
                    owner = "L'oric"
                }, UpdatePolicy.ALL)

                val upsertFrog = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(upsertFrog.name, "Wirt")
            }
            // :snippet-end:
            val updatedFrogsMatchingId = realm.query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find()
            assertEquals(1, updatedFrogsMatchingId.count())
            assertEquals(4, updatedFrogsMatchingId.first().age)
            assertEquals("Greyfrog", updatedFrogsMatchingId.first().species)
            assertEquals("L'oric", updatedFrogsMatchingId.first().owner)

            val thrownException = assertFailsWith<Exception> {
                realm.write {
                    copyToRealm(ExampleRealmObject_Frog().apply {
                        _id = PRIMARY_KEY_VALUE
                        name = "Froggy the Frog"
                        age = 4
                        species = "Tree Frog"
                        owner = "Jim"
                    }, UpdatePolicy.ERROR)
                    deleteAll()
                }
            }
            assertTrue(thrownException.message!!.contains("[RLM_ERR_OBJECT_ALREADY_EXISTS]"), "Exception message did not match expected value.")
            realm.close()
        }
    }

    @Test
    fun updateInverseRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_User::class, ExampleRelationship_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                val post1 = ExampleRelationship_Post().apply { title = "Forest Life" }
                val post2 = ExampleRelationship_Post().apply { title = "Top Ponds of the Year!" }
                copyToRealm(ExampleRelationship_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                })
            }
            // :snippet-start: update-inverse-relationship
            realm.write {
                // Update child objects through the parent
                val parent = query<ExampleRelationship_User>().find().first()
                parent.posts[0].title = "Forest Life Vol. 2"
                parent.posts.add(ExampleRelationship_Post().apply { title = "Forest Life Vol. 3" })

                // Update child objects (Realm automatically updates the backlink collection)
                val child = query<ExampleRelationship_Post>("title == $0", "Top Ponds of the Year!").find().first()
                child.title = "Top Ponds of the Year! Vol. 2"
                assertEquals("Top Ponds of the Year! Vol. 2", parent.posts[1].title)
                // Update the parent object through the child
                child.user[0].name = "Kermit Sr."

                // ** You CANNOT directly modify the backlink collection **
                val readOnlyBacklink: RealmResults<ExampleRelationship_User> = child.user
            }
            // :snippet-end:
            realm.write {
                val updatedParent = query<ExampleRelationship_User>().find().first()
                assertEquals("Forest Life Vol. 2", updatedParent.posts[0].title)
                assertEquals("Forest Life Vol. 3", updatedParent.posts[2].title)
                assertEquals("Kermit Sr.", updatedParent.name)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateToOneRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Frog().apply {
                    name = "Kermit"
                    age = 12
                    favoritePond = ExampleRelationship_Pond().apply { name = "Picnic Pond" }
                    bestFriend = ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                })
            }
            // :snippet-start: update-to-one-relationship
            realm.write {
                val kermit = query<ExampleRelationship_Frog>("name == $0", "Kermit").find().first()
                // Update a property on the related object
                kermit.favoritePond?.name = "Big Pond"

                // Assign a new related object
                val newBestFriend = ExampleRelationship_Frog().apply { name = "Froggy Jr." }
                kermit.bestFriend = newBestFriend
            }
            // :snippet-end:
            realm.write {
                val kermit = query<ExampleRelationship_Frog>("name == $0", "Kermit").find().first()
                assertEquals("Big Pond", kermit.favoritePond?.name)
                val froggyJr = query<ExampleRelationship_Frog>("name == $0", "Froggy Jr.").find().first()
                assertEquals(froggyJr, kermit.bestFriend)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun updateToManyRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Forest::class, ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Froggy Forest"
                    frogsThatLiveHere = realmSetOf(
                        ExampleRelationship_Frog().apply { name = "Kermit" },
                        ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                    )
                    nearbyPonds = realmListOf(
                        ExampleRelationship_Pond().apply { name = "Small Picnic Pond" },
                        ExampleRelationship_Pond().apply { name = "Big Pond" }
                    ) })
            }
            // :snippet-start: update-to-many-relationship
            realm.write {
                val forest = query<ExampleRelationship_Forest>().find().first()
                // Update a property on a related object in the set
                forest.frogsThatLiveHere.first().name = "Kermit Sr."
                // Add a new related object to the list
                forest.frogsThatLiveHere.add(ExampleRelationship_Frog().apply { name = "Froggy Jr." })
            }
            // :snippet-end:
            realm.write {
                val forest = query<ExampleRelationship_Forest>().find().first()
                assertEquals("Kermit Sr.", forest.frogsThatLiveHere.first().name)
                assertEquals("Froggy Jr.", forest.frogsThatLiveHere.last().name)
                deleteAll()
            }
            realm.close()
        }
    }
}

// :replace-end: