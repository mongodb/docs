package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.*
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.InitialResults
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.query.Sort
import io.realm.kotlin.query.max
import io.realm.kotlin.types.RealmAny
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PersistedName
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.flow.Flow
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
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
//       "RealmEmbeddedObject_": "",
//       "ExamplePropertyAnnotations_": ""
//    }
// }

/*
** Snippets used on Read page **
** Object models defined in Schema.kt **
 */


class ReadTest: RealmTest() {

    @Test
    fun readRealmObject() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory() // :remove:
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
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: read-realm-object
            // Pass the object type as <T> parameter and filter by property
            val findFrogs = realm.query<ExampleRealmObject_Frog>("age > 1")
                // Chain another query filter
                .query("owner == $0 AND name CONTAINS $1", "Jim Henson", "K")
                // Sort results by property
                .sort("age", Sort.ASCENDING)
                // Run the query
                .find()
            // ... work with the results
            // :snippet-end:
            assertEquals(3, findFrogs.size)
            val frozenFrogs = findFrogs
            val frog = frozenFrogs.first()
            // :snippet-start: check-frozen
            val isFrozen = frog.isFrozen()
            // :snippet-end:
            // :snippet-start: find-latest-version
            // Open a write transaction to access the MutableRealm
            realm.write {  // this: MutableRealm
                for (frog in frozenFrogs) {
                    // Call 'findLatest()' on an earlier query's frozen results
                    // to return the latest live objects that you can modify
                    // within the current write transaction
                    findLatest(frog)?.also { liveFrog ->  // :emphasize:
                        copyToRealm(liveFrog.apply { age += 1 })
                        println(liveFrog.name + " is now " + liveFrog.age + " years old")
                    }
                }
            }
            // :snippet-end:
            assertTrue(frozenFrogs.first().isFrozen())
            val thrownException = assertFailsWith<Exception> {
            // :snippet-start: frozen-vs-live-results
            // 'Realm.query()' results are always frozen
            val frozenResults = realm.query<ExampleRealmObject_Frog>("age > $0", 50).find()

                // :remove-start:
                // assert SDK throws 'IllegalStateException'
                frozenResults.first().age += 1
            }
            assertTrue(
                thrownException.message!!.contains("[RLM_ERR_WRONG_TRANSACTION_STATE]"),
                "Trying to modify database while in read transaction"
            )
            // :remove-end:
            // 'MutableRealm.query()' results are live within the current write transaction
            realm.write { // this: MutableRealm
                val liveResults = this.query<ExampleRealmObject_Frog>("age > $0", 50).find()
                // :snippet-end:
                // assert you can modify queried object
                liveResults.first().age += 1
                assertEquals(102, liveResults.first().age)
            }
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun synchronousQuery() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.writeBlocking {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            realm.writeBlocking{
                // :snippet-start: synchronous-query
                val queryAllFrogs = realm.query<ExampleRealmObject_Frog>()
                val queryAllLiveFrogs = this.query<ExampleRealmObject_Frog>() // this: MutableRealm

                // Calling 'find()' on the query returns a RealmResults collection
                // Can be called on a `Realm.query()` or `MutableRealm.query()`
                val allFrogs: RealmResults<ExampleRealmObject_Frog> = queryAllFrogs.find()
                val allLiveFrogs: RealmResults<ExampleRealmObject_Frog> = queryAllLiveFrogs.find()

                // Calling 'asFlow()' on the query returns a ResultsChange Flow
                // Can ONLY be called on a `Realm.query()`
                val allFrogsFlow: Flow<ResultsChange<ExampleRealmObject_Frog>> = queryAllFrogs.asFlow()
                // :snippet-end:
                // assert SDK throws exception
                val thrownException = assertFailsWith<Exception> {
                    val allLiveFrogsFlow: Flow<ResultsChange<ExampleRealmObject_Frog>> = queryAllLiveFrogs.asFlow()
                }
                assertTrue(thrownException.message!!.contains("Observing changes are not supported by this Realm"))
                assertEquals(3, allFrogs.size)
                assertEquals(3, allLiveFrogs.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun queryByObjectType() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            val PRIMARY_KEY_VALUE = ObjectId()
            realm.write {
                deleteAll()
                copyToRealm( ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    _id = PRIMARY_KEY_VALUE
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: query-by-object-type
            // Query all Frog objects in the database
            val queryAllFrogs = realm.query<ExampleRealmObject_Frog>()
            val allFrogs = queryAllFrogs.find()
            // :snippet-end:
            assertEquals(3, allFrogs.size)
            // :snippet-start: query-single-object
            val querySingleFrog = realm.query<ExampleRealmObject_Frog>().first()
            val singleFrog = querySingleFrog.find()

            if (singleFrog != null) {
                println("${singleFrog.name} is a frog.")
            } else {
                println("No frogs found.")
            }
            // :snippet-end:
            assertEquals("Jim Henson", singleFrog?.owner)
            // :snippet-start: find-by-primary-key
            val filterByPrimaryKey = realm.query<ExampleRealmObject_Frog>("_id == $0", PRIMARY_KEY_VALUE)
            val findPrimaryKey = filterByPrimaryKey.find().first()
            // :snippet-end:
            assertEquals(PRIMARY_KEY_VALUE, findPrimaryKey._id)
            // :snippet-start: query-by-property
            val filterByProperty = realm.query<ExampleRealmObject_Frog>("name == $0", "Kermit")
            val frogsNamedKermit = filterByProperty.find()
            // :snippet-end:
            assertEquals(1, frogsNamedKermit.size)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryEmbeddedObjects() {
        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(
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
                copyToRealm( ExampleRelationship_Contact().apply {
                    name = "Kermit"
                    address = ExampleRelationship_EmbeddedAddress().apply {
                        propertyOwner = ExampleRelationship_Contact().apply { name = "Mr. Frog" }
                        street = "123 Pond St"
                        country = ExampleRelationship_EmbeddedCountry().apply { name = "United States" }
                    } })
            }
            // :snippet-start: find-embedded-object
            val queryAllEmbeddedAddresses = realm.query<ExampleRelationship_EmbeddedAddress>()
            val allEmbeddedAddresses = queryAllEmbeddedAddresses.find()
            // :snippet-end:
            assertEquals(1, allEmbeddedAddresses.size)
            val embeddedObject = allEmbeddedAddresses.first()
            // :snippet-start: get-parent
            val getParent = embeddedObject.parent<ExampleRelationship_Contact>()
            // :snippet-end:
            assertEquals("Kermit", getParent.name)
            // :snippet-start: query-embedded-object-property
            // Use dot notation to access the embedded object properties as if it
            // were in a regular nested object
            val filterEmbeddedObjectProperty =
                realm.query<ExampleRelationship_Contact>("address.street == '123 Pond St'")

            // You can also access properties nested within the embedded object
            val queryNestedProperty = realm.query<ExampleRelationship_Contact>()
                .query("address.propertyOwner.name == $0", "Mr. Frog")
            // :snippet-end:
            val findEmbeddedObjectProperty = filterEmbeddedObjectProperty.find().first()
            val findNestedProperty = queryNestedProperty.find().first()
            assertEquals("123 Pond St", findEmbeddedObjectProperty.address?.street)
            assertEquals("Mr. Frog", findNestedProperty.address?.propertyOwner?.name)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryRealmAnyProperty() {
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
                    favoriteThing = RealmAny.create(42)
                })
                copyToRealm(RealmObjectProperties_Frog().apply {
                    name = "Kermit Jr."
                    favoriteThing = RealmAny.create("rainbow")
                })
            }
            realm.write {
                // :snippet-start: query-realmany-property
                val filterByRealmAnyInt = realm.query<RealmObjectProperties_Frog>("favoriteThing.@type == 'int'")
                val findFrog = filterByRealmAnyInt.find().first()
                // :snippet-end:
                // :snippet-start: get-realmany-property
                val frogsFavoriteThing = findFrog.favoriteThing // Int

                // Using the correct getter method returns the value
                val frogsFavoriteNumber = frogsFavoriteThing?.asInt()
                println("${findFrog.name} likes the number $frogsFavoriteNumber")
                // :snippet-end:
                assertEquals(42, frogsFavoriteNumber)

                val thrownException = assertFailsWith<Exception> {
                // assert that wrong getter throws an exception
                    val frogsFavoriteUUID = frogsFavoriteThing?.asRealmUUID()
                }
                assertTrue(thrownException.message!!.contains("RealmAny type mismatch"))
                val frogsFavoriteThings = filterByRealmAnyInt.find().map { it.favoriteThing }
                // :snippet-start: polymorphism
                // Handle possible types with a 'when' statement
                frogsFavoriteThings.forEach { realmAny ->
                    if (realmAny != null) {
                        when (realmAny.type) {
                            RealmAny.Type.INT -> {
                                val intValue = realmAny.asInt()
                                // Do something with intValue ...
                            }
                            RealmAny.Type.STRING -> {
                                val stringValue = realmAny.asString()
                                // Do something with stringValue ...
                            }
                            RealmAny.Type.OBJECT -> {
                                val objectValue = realmAny.asRealmObject(RealmObjectProperties_Frog::class)
                                // Do something with objectValue ...
                            }
                            // Handle other possible types...
                            else -> {
                                // Debug or perform a default action for unhandled types
                                Log.d("Unhandled type: ${realmAny.type}")
                            }
                        }
                    }
                }
                // :snippet-end:
            }
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryProperties() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExamplePropertyAnnotations_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                copyToRealm(ExamplePropertyAnnotations_Frog().apply {
                    name = "Kermit"
                    age = 42 // Ignored
                    species = "Muppetarium Amphibius" // Persisted name
                    physicalDescription = "Small green frog muppet with bulging eyes and skinny limbs." // FTS index
                })
                copyToRealm(ExamplePropertyAnnotations_Frog().apply {
                    name = "Kermit, Jr."
                    species = "Muppetarium Amphibius"
                    physicalDescription = "Tiny green frog that plays a small banjo. Extremely cute and friendly muppet. Is always under a rainbow."
                })
                copyToRealm(
                    ExamplePropertyAnnotations_Frog().apply {
                        name = "Kermit, Sr."
                        species = "Muppetarium Amphibius"
                        physicalDescription = "Big, mean, old, brown frog. Is technically a puppet that avoids the rain."
                    })
            }
            // :snippet-start: query-remapped-property
            val filterByKotlinName = realm.query<ExamplePropertyAnnotations_Frog>("species == $0", "Muppetarium Amphibius")
            val findSpecies = filterByKotlinName.find().first()

            val filterByRemappedName = realm.query<ExamplePropertyAnnotations_Frog>("latin_name == $0", "Muppetarium Amphibius")
            val find_latin_name = filterByRemappedName.find().first()

            // Both queries return the same object
            assertEquals(findSpecies, find_latin_name)
            // :snippet-end:
            // :snippet-start: query-fts-property
            // Filter by FTS property value using 'TEXT'

            // Find all frogs with "green" in the physical description
            val onlyGreenFrogs =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "green").find()
            assertEquals(2, onlyGreenFrogs.size) // :remove:

            // Find all frogs with "green" but not "small" in the physical description
            val onlyBigGreenFrogs =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "green -small").find()
            assertEquals(0, onlyBigGreenFrogs.size) // :remove:

            // Find all frogs with "muppet-" and "rain-" in the physical description
            val muppetsInTheRain =
                realm.query<ExamplePropertyAnnotations_Frog>("physicalDescription TEXT $0", "muppet* rain*").find()
            // :snippet-end:
            assertEquals(1, muppetsInTheRain.size)
            realm.write{ deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryRealmList(){
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
                        ExampleRealmList_Pond().apply { name = "Picnic Pond" },
                        ExampleRealmList_Pond().apply { name = "Big Pond" }
                    ))
                })
                copyToRealm(ExampleRealmList_Frog().apply {
                    name = "Kermit, Jr."
                    favoritePonds.addAll(realmListOf(
                        ExampleRealmList_Pond().apply { name = "Tiny Pond" },
                        ExampleRealmList_Pond().apply { name = "Small Pond" }
                    ))
                })
            }
            realm.writeBlocking {
                // :snippet-start: read-realm-list
                // Find frogs with a favorite pond
                val allFrogs = query<ExampleRealmList_Frog>().find()
                val frogsWithFavoritePond = allFrogs.query("favoritePonds.@size > $0", 0).find()

                // Check if the list contains a value
                for (frog in frogsWithFavoritePond) {
                    val likesBigPond = frog.favoritePonds.any { pond -> pond.name == "Big Pond" }
                    if (likesBigPond) {
                        Log.v("${frog.name} likes Big Pond")
                    } else {
                        Log.v("${frog.name} does not like Big Pond")
                    }
                }
                // :snippet-end:
                assertEquals(2, frogsWithFavoritePond.size)
                val actual = frogsWithFavoritePond.query("favoritePonds.name == $0", "Big Pond").find()
                assertEquals(1, actual.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun readRealmSetType() {
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
                copyToRealm(RealmSet_Frog().apply {
                    name = "Kermit, Jr."
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Flies" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Crickets" })
                    favoriteSnacks.add(RealmSet_Snack().apply { name = "Gnats" })
                })
            }
            realm.write {
                // :snippet-start: read-realm-set
                // Find frogs with flies and crickets as a favorite snack
                val filterBySnackSet = query<RealmSet_Frog>("favoriteSnacks.name CONTAINS $0 AND favoriteSnacks.name CONTAINS $1", "Flies", "Crickets")
                val potentialFrogs = filterBySnackSet.find()

                // Check if the set contains a value
                val frogsThatLikeWorms = potentialFrogs.filter { frog ->
                    val requiredSnacks = query<RealmSet_Snack>("name == $0", "Worms")
                    frog.favoriteSnacks.contains(requiredSnacks.find().first())
                }
                for (frog in frogsThatLikeWorms) {
                    Log.v("${frog.name} likes both Flies, Worms, and Crickets")
                }
                // :snippet-end:
                assertEquals(2, potentialFrogs.size)
                assertEquals(1, frogsThatLikeWorms.size)
                deleteAll()
            }
            realm.close()
        }
    }

    @Test
    fun readRealmDictionaryType() {
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
                    favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya") })
            }
            // :snippet-start: read-realm-dictionary
            // Find frogs who have forests with favorite ponds
            val frogs = realm.query<ExampleRealmDictionary_Frog>().find()
            val frogsWithFavoritePonds = frogs.query("favoritePondsByForest.@count > $0", 1).find()
            val thisFrog = frogsWithFavoritePonds.first()

            // Iterate through the map and log each key-value pair
            for (forestName in thisFrog.favoritePondsByForest.keys) {
                val pondName = thisFrog.favoritePondsByForest[forestName]
                Log.v("Forest: $forestName, Pond: $pondName")
            }

            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) // :remove:
            // Check if the dictionary contains a key
            assertTrue(thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) // :remove:
            if (thisFrog.favoritePondsByForest.containsKey("Hundred Acre Wood")) {
                Log.v("${thisFrog.name}'s favorite pond in Hundred Acre Wood is ${thisFrog.favoritePondsByForest["Hundred Acre Wood"]}")
            }
            // Check if the dictionary contains a value
            assertTrue(thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) // :remove:
            if (thisFrog.favoritePondsByForest.containsValue("Picnic Pond")) {
                Log.v("${thisFrog.name} lists Picnic Pond as a favorite pond")
            }
            // :snippet-end:
            assertEquals(2, thisFrog.favoritePondsByForest.size)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun queryRelationships() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_Forest::class, ExampleRelationship_Frog::class, ExampleRelationship_Pond::class))
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
                copyToRealm(ExampleRelationship_Forest().apply {
                    name = "Froggy Forest"
                    frogsThatLiveHere = realmSetOf(
                        ExampleRelationship_Frog().apply { name = "Kermit" },
                        ExampleRelationship_Frog().apply { name = "Froggy Jay" }
                    )
                    nearbyPonds = realmListOf(
                        ExampleRelationship_Pond().apply { name = "Small Picnic Pond" },
                        ExampleRelationship_Pond().apply { name = "Big Pond" }
                    )
                })
            }
            realm.write {
                // :snippet-start: query-to-one-relationship
                // Find frogs who have a favorite pond
                val allFrogs = query<ExampleRelationship_Frog>().find()
                val frogsWithFavoritePond = allFrogs.query("favoritePond.@count == $0", 1).find()

                // Iterate through the results
                for (frog in frogsWithFavoritePond) {
                    Log.v("${frog.name} likes ${frog.favoritePond?.name}")
                }
                // :snippet-end:
                val kermit = frogsWithFavoritePond.query("name == $0", "Kermit").find().first()
                val picnicPond = query<ExampleRelationship_Pond>("name == $0", "Picnic Pond").find().first()
                assertEquals(kermit.favoritePond, picnicPond)
                // :snippet-start: query-to-many-relationship
                // Find all forests with at least one nearby pond
                val allForests = query<ExampleRelationship_Forest>().find()
                val forestsWithPonds = allForests.query("nearbyPonds.@count > $0", 0).find()

                // Iterate through the results
                for (forest in forestsWithPonds) {
                    val bigPond = query<ExampleRelationship_Pond>("name == $0", "Big Pond").find().first()
                    if (forest.nearbyPonds.contains(bigPond)) {
                        Log.v("${forest.name} has a nearby pond named ${bigPond.name}")
                    } else {
                        Log.v("${forest.name} does not have a big pond nearby")
                    }
                }
                // :snippet-end:
                deleteAll()
            }
            realm.close()
        }
    }


    @Test
    fun queryInverseRelationship() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(ExampleRelationship_User::class, ExampleRelationship_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                val post1 = ExampleRelationship_Post().apply {
                    title = "Forest Life"
                    date = RealmInstant.from(1677628500, 0) // Feb 28 2023
                }
                val post2 = ExampleRelationship_Post().apply {
                    title = "Top Ponds of the Year!"
                    date = RealmInstant.from(1677628800, 0) // Mar 1 2023
                }
                val user = ExampleRelationship_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                }
                copyToRealm(user)
            }
            realm.write {
                val today = RealmInstant.now()
                // :snippet-start: query-inverse-relationship
                // Query the parent object
                val filterByUserName = query<ExampleRelationship_User>("name == $0", "Kermit")
                val kermit = filterByUserName.find().first()

                // Use dot notation to access child objects
                val myFirstPost = kermit.posts[0]
                assertEquals("Forest Life", myFirstPost.title) // :remove:

                // Iterate through the backlink collection property
                kermit.posts.forEach { post ->
                    Log.v("${kermit.name}'s Post: ${post.date} - ${post.title}")
                }

                // Filter posts through the parent's backlink property
                // using `@links.<ObjectType>.<PropertyName>` syntax
                val oldPostsByKermit = realm.query<ExampleRelationship_Post>("date < $0", today)
                    .query("@links.ExampleRelationship_User.posts.name == $0", "Kermit")
                    .find()
                assertEquals(2, oldPostsByKermit.size) // :remove:

                // Query the child object to access the parent
                val post1 = query<ExampleRelationship_Post>("title == $0", "Forest Life").find().first()
                val post2 = query<ExampleRelationship_Post>("title == $0", "Top Ponds of the Year!").find().first()
                val parent = post1.user.first()
                // :snippet-end:
                assertTrue(kermit.posts.containsAll(listOf(post1, post2)))
                assertEquals("Kermit", parent.name)
                deleteAll()
            }
            realm.close()
        }
    }

    // :snippet-start: persisted-name-inverse
    @PersistedName(name = "Blog_Author")
    class RealmObjectProperties_User : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
        var posts: RealmList<RealmObjectProperties_Post> = realmListOf()
    }
    // :snippet-end:
    class RealmObjectProperties_Post : RealmObject {
        var title: String = ""
        var date: RealmInstant = RealmInstant.now()
        val user: RealmResults<RealmObjectProperties_User> by backlinks(RealmObjectProperties_User::posts)
    }

    @Test
    fun queryInverseRelationshipWithPersistedName() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_User::class, RealmObjectProperties_Post::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.path}")
            realm.write {
                deleteAll()
                val post1 = RealmObjectProperties_Post().apply { title = "Forest Life" }
                val post2 = RealmObjectProperties_Post().apply { title = "Top Ponds of the Year!" }
                val user = RealmObjectProperties_User().apply {
                    name = "Kermit"
                    posts = realmListOf(post1, post2)
                }
                copyToRealm(user)
            }
            // :snippet-start: query-inverse-persisted-name
            // Filter by the remapped object type name
            // using `@links.<RemappedObjectType>.<PropertyName>` syntax
            val postsByKermit = realm.query<RealmObjectProperties_Post>()
                .query("@links.Blog_Author.posts.name == $0", "Kermit")
                .find()
            // :snippet-end:
            assertEquals(2, postsByKermit.size)
            realm.write {deleteAll() }
            realm.close()
        }
    }

    @Test
    fun sortResults() {
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
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: sort-results
            // Query for all frogs owned by Jim Henson, then:
            // 1. Sort results by age in descending order
            // 2. Limit results to only distinct names
            // 3. Limit results to only the first 2 objects

            val organizedWithMethods = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")
                // :emphasize-start:
                .sort("age", Sort.DESCENDING)
                .distinct("name")
                .limit(2)
                // :emphasize-end:
                .find()
            organizedWithMethods.forEach { frog ->
                Log.v("Method sort: ${frog.name} is ${frog.age}")
            }

            val organizedWithRql = realm.query<ExampleRealmObject_Frog>()
                .query("owner == $0 SORT(age DESC) DISTINCT(name) LIMIT(2)", "Jim Henson") // :emphasize:
                .find()
            organizedWithRql.forEach { frog ->
                Log.v("RQL sort: ${frog.name} is ${frog.age}")
            }
            assertEquals(organizedWithMethods, organizedWithRql) // :remove:

            val organizedWithBoth = realm.query<ExampleRealmObject_Frog>()
                // :emphasize-start:
                .query("owner == $0 SORT(age DESC)", "Jim Henson")
                .distinct("name")
                .limit(2)
                // :emphasize-end:
                .find()
            organizedWithBoth.forEach { frog ->
                Log.v("Combined sort: ${frog.name} is ${frog.age}")
            }
            // :snippet-end:
            assertEquals(organizedWithMethods, organizedWithBoth)
        }
    }

    @Test
    fun aggregateResults() {
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(RealmObjectProperties_Frog::class, ExampleRealmObject_Frog::class))
                .inMemory()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.write {
                deleteAll()
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit"
                    age = 42
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: aggregate-results
            val jimHensonsFrogs = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")

            // Find the total number of frogs owned by Jim Henson
            val numberOfJimsFrogs = jimHensonsFrogs.count().find()
            assertEquals(3, numberOfJimsFrogs) // :remove:

            // Find the oldest frog owned by Jim Henson
            val maxAge = jimHensonsFrogs.max<Int>("age").find()
            val oldestFrog = jimHensonsFrogs.query("age == $0", maxAge).find().first()
            // :snippet-end:
            assertEquals(100, oldestFrog.age)
            realm.write { deleteAll() }
            realm.close()
        }
    }

    @Test
    fun iterateResultsWithFlow() {
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
                    name = "Kermit, Jr."
                    age = 10
                    owner = "Jim Henson"
                })
                copyToRealm(ExampleRealmObject_Frog().apply {
                    name = "Kermit, Sr."
                    age = 100
                    owner = "Jim Henson"
                })
            }
            // :snippet-start: iteration
            // Get a Flow of all frogs in the database
            val allFrogsQuery = realm.query<ExampleRealmObject_Frog>()
            val frogsFlow: Flow<ResultsChange<ExampleRealmObject_Frog>> = allFrogsQuery.asFlow()

            // Iterate through the Flow with 'collect()'
            val frogsObserver: Deferred<Unit> = async {
                frogsFlow.collect { results ->
                    when (results) {
                        is InitialResults<ExampleRealmObject_Frog> -> {
                            for (frog in results.list) {
                                Log.v("Frog: $frog")
                            }
                        }
                        else -> { /* no-op */ }
                    }
                }
            }

            // ... Later, cancel the Flow, so you can safely close the database
            frogsObserver.cancel()
            realm.write { deleteAll() } // :remove:
            realm.close()
            // :snippet-end:
        }
    }
}
// :replace-end:
