package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.types.RealmAny
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
** Snippets used on Delete page **
** Object models defined in Schema.kt **
*/
class DeleteTest: RealmTest() {

    @Test
    fun fetchLatestToDeleteObject() {
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
                    species = "tree frog"
                    age = 12
                })
            }
            // :snippet-start: fetch-latest-to-delete-object
            val frozenFrog = realm.query<ExampleRealmObject_Frog>("name == $0", "Kermit").find().firstOrNull()
            frozenFrog?.isFrozen()?.let { assertTrue(it) } // :remove:

            // Open a write transaction
            realm.writeBlocking {
                // Get the live frog object with findLatest(), then delete it
                if (frozenFrog != null) {
                    findLatest(frozenFrog)
                        ?.also { delete(it) }
                }
            }
            // :snippet-end:
            assertEquals(0, realm.query<ExampleRealmObject_Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun deleteRealmObjects() {
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
                    species = "tree frog"
                    age = 12
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Froggy"
                    age = 2
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Mr. Toad"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Mr. Frog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Michigan J. Frog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Big BullFrog"
                    age = 1
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Another Frog"
                    age = 1
                })
                assertEquals(7, query<ExampleRealmObject_Frog>().find().size)
                assertEquals(6, query<ExampleRealmObject_Frog>("species == 'bullfrog'").find().size)
            }
            // :snippet-start: delete-one-realm-object
            // Open a write transaction
            realm.write {
                // Query the Frog type and filter by primary key value
                val frogToDelete: ExampleRealmObject_Frog = query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(PRIMARY_KEY_VALUE, frogToDelete._id) // :remove:
                // Pass the query results to delete()
                delete(frogToDelete)
                assertFalse(frogToDelete.isValid()) // :remove:
                assertTrue(query<ExampleRealmObject_Frog>().find().size == 6) // :remove:
            }
            // :snippet-end:
            // :snippet-start: delete-multiple-realm-objects
            // Open a write transaction
            realm.write {
                // Query by species and limit to 3 results
                val bullfrogsToDelete: RealmResults<ExampleRealmObject_Frog> = query<ExampleRealmObject_Frog>("species == 'bullfrog' LIMIT(3)").find()
                // Pass the query results to delete()
                delete(bullfrogsToDelete)
                assertTrue(query<ExampleRealmObject_Frog>("species == 'bullfrog'").find().size == 3) // :remove:
            }
            // :snippet-end:
            // :snippet-start: delete-all-realm-object-types
            // Open a write transaction
            realm.write {
                // Query Frog type with no filter to return all frog objects
                val frogsLeftInTheRealm = query<ExampleRealmObject_Frog>().find()
                // Pass the query results to delete()
                delete(frogsLeftInTheRealm)
                assertTrue(frogsLeftInTheRealm.size == 0) // :remove:
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteAllObjects() {
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
                    species = "tree frog"
                    age = 12
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    species = "bullfrog"
                    name = "Froggy"
                    age = 2
                })
            }
            // :snippet-start: delete-all-realm-objects
            // Open a write transaction
            realm.write {
                // Delete all objects from the realm
                deleteAll()
            }
            // :snippet-end:
            assertEquals(0, realm.query<ExampleRealmObject_Frog>().find().size)
            realm.close()
        }
    }

    @Test
    fun deleteRealmObjectWithRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
                    ExampleRealmList_Frog::class,
                    ExampleRealmList_Pond::class,
                    ExampleEmbeddedObject_EmbeddedForest::class
                )
            )
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmList_Frog().apply {
                    _id = PRIMARY_KEY_VALUE
                    name = "Kermit"
                    favoritePonds.addAll(
                        realmListOf(
                            ExampleRealmList_Pond().apply { name = "Picnic Pond" },
                            ExampleRealmList_Pond().apply { name = "Big Pond" },
                        )
                    )
                })
            }
            // :snippet-start: delete-realm-object-with-related-objects
            // Open a write transaction
            realm.write {
                // Query for the parent frog object with ponds
                val parentObject = query<ExampleRealmList_Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
                assertEquals(PRIMARY_KEY_VALUE, parentObject._id) // :remove:
                assertEquals(2, parentObject.favoritePonds.size)

                // Delete the frog and all references to ponds
                delete(parentObject)
                assertFalse(parentObject.isValid()) // :remove:

                // Confirm pond objects are still in the realm
                val ponds = query<ExampleRealmList_Pond>().find()
                assertEquals(2, ponds.size)
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmList() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
                    ExampleRelationship_Forest::class,
                    ExampleRelationship_Frog::class,
                    ExampleRelationship_Pond::class
                )
            )
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Hundred Acre Wood"
                    nearbyPonds.addAll(realmListOf(
                        ExampleRelationship_Pond().apply { name = "Frog Corner" },
                        ExampleRelationship_Pond().apply { name = "The Pond" },
                        ExampleRelationship_Pond().apply { name = "Enchanted Pool" },
                        ExampleRelationship_Pond().apply { name = "Bubbling Spring" },
                        ExampleRelationship_Pond().apply { name = "Big Spring" }
                    ))
                })
            }
            // :snippet-start: remove-items-from-list
            // Open a write transaction
            realm.write {
                // Query for the parent forest object
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                val forestPonds = forest.nearbyPonds
                assertEquals(5, forestPonds.size)

                // Remove the first pond in the list
                val removeFirstPond = forestPonds.first()
                forestPonds.remove(removeFirstPond)
                assertEquals(4, forestPonds.size)

                // Remove the pond at index 2 in the list
                forestPonds.removeAt(2)
                assertEquals(3, forestPonds.size)

                // Remove the remaining three ponds in the list
                forestPonds.removeAll(forestPonds)
                assertEquals(0, forestPonds.size)
            }
            // :snippet-end:
            realm.write {
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                val ponds = query<ExampleRelationship_Pond>().find()
                forest.nearbyPonds.addAll(ponds)
            }
            // :snippet-start: list-clear
            // Open a write transaction
            realm.write {
                val forest = query<ExampleRelationship_Forest>("name == $0", "Hundred Acre Wood").find().first()
                val forestPonds = forest.nearbyPonds
                assertEquals(5, forestPonds.size)

                // Clear all ponds from the list
                forestPonds.clear()
                assertEquals(0, forestPonds.size)
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmSetType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmSet_Frog::class, RealmSet_Snack::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(RealmSet_Frog().apply {
                    name = "Kermit"
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Flies" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Crickets" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Worms" })
                })
            }
            // :snippet-start: remove-item-from-set
            // Open a write transaction
            realm.write {
                // Query for the parent frog object
                val myFrog = query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = myFrog.favoriteSnacks
                assertEquals(3, snackSet.size)

                // Remove one snack from the set
                snackSet.remove(snackSet.first { it.name == "Flies" })
                assertEquals(2, snackSet.size)

                // Remove the remaining two snacks from the set
                val allSnacks = findLatest(myFrog)!!.favoriteSnacks
                snackSet.removeAll(allSnacks)
                // :remove-start:
                // TODO update test once https://github.com/realm/realm-kotlin/issues/1097 is fixed in v1.11.0
                // assertTrue(set.isEmpty())
                snackSet.removeAll(allSnacks) // have to call twice to actually remove all items until bug is fixed
                // :remove-end:
                assertEquals(0, snackSet.size)
            }
            // :snippet-end:
            // :snippet-start: clear-set
            realm.write {
                val myFrog = realm.query<RealmSet_Frog>("name == $0", "Kermit").find().first()
                val snackSet = findLatest(myFrog)!!.favoriteSnacks
                snackSet.addAll(query<RealmSet_Snack>().find()) // :remove:
                assertEquals(3, snackSet.size)

                // Clear all snacks from the set
                snackSet.clear()
                assertEquals(0, snackSet.size)
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmDictionaryType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmDictionary_Frog::class, ExampleEmbeddedObject_EmbeddedForest::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmDictionary_Frog().apply {
                    name = "Kermit"
                    favoritePondsByForest =
                        realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
                })
            }
            // :snippet-start: delete-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val thisFrog = realm.query<ExampleRealmDictionary_Frog>("favoritePondsByForest.@count > 1").find().first()
            // :remove-start:
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood"))
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Lothlorien"))
            // :remove-end:
            // Set an optional value for a key to null if the key exists
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                realm.write {
                    val mutableFrog = findLatest(thisFrog)
                    if (mutableFrog != null) {
                        mutableFrog.favoritePondsByForest["Hundred Acre Wood"] = null
                    }
                }
            }
            realm.write {
                // Remove a key and its value
                findLatest(thisFrog)?.favoritePondsByForest?.remove("Lothlorien")
                // :remove-start:
                val thisFrogUpdated = query<ExampleRealmDictionary_Frog>().find().first()
                assertFalse(thisFrogUpdated.favoritePondsByForest.containsKey("Lothlorien"))
                assertTrue(thisFrogUpdated.favoritePondsByForest.containsKey("Hundred Acre Wood"))
                assertFalse(thisFrogUpdated.favoritePondsByForest.containsValue("Picnic Pond"))
                // :remove-end:
                // Remove all keys and values
                findLatest(thisFrog)?.favoritePondsByForest?.clear()
                assertTrue(thisFrogUpdated.favoritePondsByForest.isEmpty())
                deleteAll() // :remove:
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteEmbeddedObject() {
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
            realm.write {
                deleteAll()
                copyToRealm(ExampleRelationship_Contact().apply {
                    name = "Kermit"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Frog" }
                        street = "123 Pond St"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    }
                })
                copyToRealm(ExampleRelationship_Contact().apply {
                    name = "Froggy J. Frog"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Toad" }
                        street = "456 Lily Pad Ln"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    }
                })
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
                copyToRealm(business)
            }
            // :snippet-start: delete-embedded-object
            // Delete an embedded object directly
            realm.write {
                val addressToDelete = query<ExampleRelationship_EmbeddedAddress>("street == $0", "456 Lily Pad Ln").find().first()
                // Delete the embedded object (nullifies the parent property)
                delete(addressToDelete)
                val parent = query<ExampleRelationship_Contact>("name == $0", "Froggy J. Frog").find().first() // :remove:
                assertNull(parent.address) // :remove:
            }
            // Delete an embedded object through the parent
            realm.write {
                val propertyToClear = query<ExampleRelationship_Contact>("name == $0", "Kermit").find().first()
                // Clear the parent property (deletes the embedded object instance)
                propertyToClear.address = null
                assertNull(propertyToClear.address) // :remove:
            }
            // :snippet-end:
            // :snippet-start: delete-embedded-object-through-parent
            // Delete the parent object
            realm.write {
                val businessToDelete = query<ExampleRelationship_Business>("name == $0", "Big Frog Corp.").find().first()
                assertEquals(2, businessToDelete.addresses.size) // :remove:
                // Delete the parent object (deletes all embedded objects)
                delete(businessToDelete)
            }
            // :snippet-end:
            realm.write {
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun chainDeleteRealmList() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
                    ExampleRealmList_Frog::class,
                    ExampleRealmList_Pond::class,
                    ExampleEmbeddedObject_EmbeddedForest::class
                )
            )
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")

            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Kermit"
                    favoritePonds.addAll(
                        realmListOf(
                            ExampleRealmList_Pond().apply { name = "1" },
                            ExampleRealmList_Pond().apply { name = "2" },
                            ExampleRealmList_Pond().apply { name = "3" },
                            ExampleRealmList_Pond().apply { name = "4" },
                        )
                    )
                })
            }
            // :snippet-start: chain-delete-realm-list
            realm.write {
                // Query for the parent frog object with ponds
                val frog = query<ExampleRealmList_Frog>("name == $0", "Kermit").find().first()
                val ponds = frog.favoritePonds
                assertEquals(4, ponds.size) // :remove:
                // Iterate over the list and delete each pond object
                if (ponds.isNotEmpty()) {
                    ponds.forEach { pond ->
                        delete(pond)
                    }
                }
                // Delete the parent frog object
                val frogToDelete = findLatest(frog)
                if (frogToDelete != null) {
                    delete(frogToDelete)
                }
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteRealmAny() {
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
            // :snippet-start: delete-realmany-property
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                frog.favoriteThings[0] = null
            }
            // :snippet-end:
            realm.write {
                val frog = query<RealmObjectProperties_Frog>().find().first()
                assertNull(frog.favoriteThings[0])
                assertEquals("rainbows", frog.favoriteThings[1]?.asString())
                assertEquals("Kermit Jr.", frog.favoriteThings[2]?.asRealmObject<RealmObjectProperties_Frog>()?.name)
                deleteAll()
            }
            realm.close()
        }
    }
}

// :replace-end:
