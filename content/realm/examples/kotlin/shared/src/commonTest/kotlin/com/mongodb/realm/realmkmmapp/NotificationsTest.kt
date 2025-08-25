package com.mongodb.realm.realmkmmapp
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.notifications.DeletedList
import io.realm.kotlin.notifications.DeletedObject
import io.realm.kotlin.notifications.InitialList
import io.realm.kotlin.notifications.InitialObject
import io.realm.kotlin.notifications.ListChange
import io.realm.kotlin.notifications.PendingObject
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.notifications.SingleQueryChange
import io.realm.kotlin.notifications.UpdatedList
import io.realm.kotlin.notifications.UpdatedObject
import io.realm.kotlin.notifications.UpdatedResults
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch
import kotlin.test.assertEquals
import kotlin.test.assertIs

class NotificationsTest: RealmTest() {
    // :snippet-start: sample-data-models
    class Character(): RealmObject {
        @PrimaryKey
        var name: String = ""
        var species: String = ""
        var age: Int = 0
        constructor(name: String, species: String, age: Int) : this() {
            this.name = name
            this.species = species
            this.age = age
        }
    }
    class Fellowship() : RealmObject {
        @PrimaryKey
        var name: String = ""
        var members: RealmList<Character> = realmListOf()
        constructor(name: String, members: RealmList<Character>) : this() {
            this.name = name
            this.members = members
        }
    }
    // :snippet-end:

    fun seedSampleData(realmName: String) {
        runBlocking {
            // :snippet-start: sample-data-seed
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/") // :remove:
                .name(realmName)
                .build()
            val realm = Realm.open(config)

            val frodo = Character("Frodo", "Hobbit", 51)
            val samwise = Character("Samwise", "Hobbit", 39)
            val aragorn = Character("Aragorn", "Dúnedain", 87)
            val legolas = Character("Legolas", "Elf", 2931)
            val gimli = Character("Gimli", "Dwarf", 140)
            val gollum = Character("Gollum", "Hobbit", 589)

            val fellowshipOfTheRing = Fellowship(
                "Fellowship of the Ring",
                realmListOf(frodo, samwise, aragorn, legolas, gimli))

            realm.writeBlocking{
                this.copyToRealm(fellowshipOfTheRing)
                this.copyToRealm(gollum) // not in fellowship
            }

            realm.close()
            // :snippet-end:
        }
    }

    @Test
    fun queryChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/") // default location for jvm is... in the project root
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: query-change-listener
            // Listen for changes on whole collection
            val characters = realm.query(Character::class)

            // flow.collect() is blocking -- run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                // create a Flow from that collection, then add a listener to the Flow
                val charactersFlow = characters.asFlow()
                val subscription = charactersFlow.collect { changes: ResultsChange<Character> ->
                    when (changes) {
                        // UpdatedResults means this change represents an update/insert/delete operation
                        is UpdatedResults -> {
                            changes.insertions // indexes of inserted objects
                            changes.insertionRanges // ranges of inserted objects
                            changes.changes // indexes of modified objects
                            changes.changeRanges // ranges of modified objects
                            changes.deletions // indexes of deleted objects
                            changes.deletionRanges // ranges of deleted objects
                            changes.list // the full collection of objects
                        }
                        else -> {
                            // types other than UpdatedResults are not changes -- ignore them
                        }
                    }
                }
            }
            // :remove-start:
            job.cancel() // cancelling job to keep from hanging (no active changes in this test)
            // :remove-end:
            // Listen for changes on RealmResults
            val hobbits = realm.query(Character::class, "species == 'Hobbit'")
            val hobbitJob = CoroutineScope(Dispatchers.Default).launch {
                val hobbitsFlow = hobbits.asFlow()
                val hobbitsSubscription = hobbitsFlow.collect { changes: ResultsChange<Character> ->
                    // ... all the same data as above
                }
            }
            // :snippet-end:
            hobbitJob.cancel() // cancelling job to keep from hanging  (no active changes in this test)
            realm.close()
        }
    }

    @Test
    fun realmObjectChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: realm-object-change-listener
            // query for the specific object you intend to listen to
            val frodo = realm.query(Character::class, "name == 'Frodo'").first()
            // flow.collect() is blocking -- run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                val frodoFlow = frodo.asFlow()
                frodoFlow.collect { changes: SingleQueryChange<Character> ->
                    when (changes) {
                        is UpdatedObject -> {
                            changes.changedFields // the changed properties
                            changes.obj // the object in its newest state
                            changes.isFieldChanged("name") // check if a specific field changed in value
                        }
                        is DeletedObject -> {
                            // if the object has been deleted
                            changes.obj // returns null for deleted objects -- always reflects newest state
                        }
                        is InitialObject -> {
                            // Initial event observed on a RealmObject or EmbeddedRealmObject flow.
                            // It contains a reference to the starting object state.
                            changes.obj
                        }
                        is PendingObject -> {
                            // Describes the initial state where a query result does not contain any elements.
                            changes.obj
                        }
                    }
                }
            }
            // :snippet-end:
            job.cancel() // cancelling job to keep from hanging  (no active changes in this test)
            realm.close()
        }
    }

    @Test
    fun realmListChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: realm-list-change-listener
            // query for the specific object you intend to listen to
            val fellowshipOfTheRing = realm.query(Fellowship::class, "name == 'Fellowship of the Ring'").first().find()!!
            val members = fellowshipOfTheRing.members
            // flow.collect() is blocking -- run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                val membersFlow = members.asFlow()
                membersFlow.collect { changes: ListChange<Character> ->
                    when (changes) {
                        is UpdatedList -> {
                            changes.insertions // indexes of inserted objects
                            changes.insertionRanges // ranges of inserted objects
                            changes.changes // indexes of modified objects
                            changes.changeRanges // ranges of modified objects
                            changes.deletions // indexes of deleted objects
                            changes.deletionRanges // ranges of deleted objects
                            changes.list // the full collection of objects
                        }
                        is DeletedList -> {
                            // if the list was deleted
                        }
                        is InitialList -> {
                            // Initial event observed on a RealmList flow. It contains a reference
                            // to the starting list state.
                            changes.list
                        }
                    }
                }
            }
            // :snippet-end:
            job.cancel() // cancelling job to keep from hanging  (no active changes in this test)
            realm.close()
        }
    }

    @Test
    fun cancelChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        runBlocking {
            val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: cancel-change-listener
            // query for the specific object you intend to listen to
            val fellowshipOfTheRing = realm.query(Fellowship::class, "name == 'Fellowship of the Ring'").first().find()!!
            val members = fellowshipOfTheRing.members
            // flow.collect() is blocking -- run it in a background context
            val job = CoroutineScope(Dispatchers.Default).launch {
                val membersFlow = members.asFlow()
                membersFlow.collect { changes: ListChange<Character> ->
                    // change listener stuff in here
                }
            }
            job.cancel() // cancel the coroutine containing the listener
            // :snippet-end:

            realm.close()
        }
    }

    @Test
    fun keyPathChangeListenerTest() {
        val REALM_NAME = getRandom()
        val channel = Channel<SingleQueryChange<Character>>(1)
        val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
                .directory("/tmp/")
                .name(REALM_NAME)
                .build()
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")
        // :snippet-start: realm-object-keypath-listener
        runBlocking {
            // Query for the specific object you intend to listen to.
            val frodoQuery = realm.query(Character::class, "name == 'Frodo'").first()
            val observer = async {
                val frodoFlow = frodoQuery.asFlow(listOf("age"))
                frodoFlow.collect { changes: SingleQueryChange<Character> ->
                    // Change listener stuff in here.
                    channel.send(changes) // :remove:
                }
            }
            // :remove-start:
            channel.receiveOrFail().let { objChange ->
                assertIs<PendingObject<*>>(objChange)
            }
            val frodoObject = realm.writeBlocking {
                copyToRealm(Character("Frodo", "Hobbit", 51))
            }
            channel.receiveOrFail().let { objChange ->
                assertIs<InitialObject<*>>(objChange)
            }
            // :remove-end:
            // Changing a property whose key path you're not observing does not trigger a notification.
            realm.writeBlocking {
                findLatest(frodoObject)!!.species = "Ring Bearer"
            }

            // Changing a property whose key path you are observing triggers a notification.
            realm.writeBlocking {
                findLatest(frodoObject)!!.age = 52
            }
            // :remove-start:
            val updatedFrodoObject = realm.query(Character::class, "name == 'Frodo'").first().find()
            assertEquals(52, updatedFrodoObject!!.age)
            // :remove-end:
            // For this example, we send the object change to a Channel where we can verify the
            // changes we expect. In your application code, you might use the notification to
            // update the UI or take some other action based on your business logic.
            channel.receiveOrFail().let { objChange ->
                assertIs<UpdatedObject<*>>(objChange)
                assertEquals(1, objChange.changedFields.size)
                // Because we are observing only the `age` property, the change to
                // the `species` property does not trigger a notification.
                // The first notification we receive is a change to the `age` property.
                assertEquals("age", objChange.changedFields.first())
            }
            observer.cancel()
            channel.close()
        }
        // :snippet-end:
        realm.close()
    }

    @Test
    fun nestedKeyPathChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        val channel = Channel<SingleQueryChange<Fellowship>>(1)
        val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
            .directory("/tmp/")
            .name(REALM_NAME)
            .build()
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")
        // :snippet-start: nested-keypath-listener
        runBlocking {
            // Query for the specific object you intend to listen to.
            val fellowshipQuery = realm.query(Fellowship::class).first()
            val observer = async {
                val fellowshipFlow = fellowshipQuery.asFlow(listOf("members.age"))
                fellowshipFlow.collect { changes: SingleQueryChange<Fellowship> ->
                    // Change listener stuff in here.
                    channel.send(changes) // :remove:
                }
            }
            // :remove-start:
            realm.writeBlocking {
                findLatest(fellowshipQuery.find()!!.members.first())!!.species = "Ring Bearer"
            }
            channel.receiveOrFail().let { objChange ->
                assertIs<InitialObject<*>>(objChange)
            }
            // :remove-end:

            // Changing a property whose nested key path you are observing triggers a notification.
            val fellowship = fellowshipQuery.find()!!
            realm.writeBlocking {
                findLatest(fellowship)!!.members[0].age = 52
            }
            // :remove-start:
            val updatedFrodoObject = realm.query(Character::class, "name == 'Frodo'").first().find()
            assertEquals(52, updatedFrodoObject!!.age)
            // :remove-end:
            // For this example, we send the object change to a Channel where we can verify the
            // changes we expect. In your application code, you might use the notification to
            // update the UI or take some other action based on your business logic.
            channel.receiveOrFail().let { objChange ->
                assertIs<UpdatedObject<*>>(objChange)
                assertEquals(1, objChange.changedFields.size)
                // While you can watch for updates to a nested property, the notification
                // only reports the change on the top-level property. In this case, there
                // was a change to one of the elements in the `members` property, so `members`
                // is what the notification reports - not `age`.
                assertEquals("members", objChange.changedFields.first())
            }
            observer.cancel()
            channel.close()
        }
        // :snippet-end:
        realm.close()
    }

    @Test
    fun wildcardKeyPathChangeListenerTest() {
        val REALM_NAME = getRandom()
        seedSampleData(REALM_NAME)
        val channel = Channel<SingleQueryChange<Fellowship>>(1)
        val config = RealmConfiguration.Builder(setOf(Fellowship::class, Character::class))
            .directory("/tmp/")
            .name(REALM_NAME)
            .build()
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")
        // :snippet-start: wildcard-keypath-listener
        runBlocking {
            // Query for the specific object you intend to listen to.
            val fellowshipQuery = realm.query(Fellowship::class).first()
            val observer = async {
                // Use a wildcard to observe changes to any key path at the level of the wildcard.
                val fellowshipFlow = fellowshipQuery.asFlow(listOf("members.*"))
                fellowshipFlow.collect { changes: SingleQueryChange<Fellowship> ->
                    // Change listener stuff in here.
                    channel.send(changes) // :remove:
                }
            }
            // :remove-start:
            realm.writeBlocking {
                findLatest(fellowshipQuery.find()!!.members.first())!!.species = "Ring Bearer"
            }
            channel.receiveOrFail().let { objChange ->
                assertIs<InitialObject<*>>(objChange)
            }
            // :remove-end:

            // Changing any property at the level of the key path wild card triggers a notification.
            val fellowship = fellowshipQuery.find()!!
            realm.writeBlocking {
                findLatest(fellowship)!!.members[0].age = 52
            }
            // :remove-start:
            val updatedFrodoObject = realm.query(Character::class, "name == 'Frodo'").first().find()
            assertEquals(52, updatedFrodoObject!!.age)
            // :remove-end:
            // For this example, we send the object change to a Channel where we can verify the
            // changes we expect. In your application code, you might use the notification to
            // update the UI or take some other action based on your business logic.
            channel.receiveOrFail().let { objChange ->
                assertIs<UpdatedObject<*>>(objChange)
                assertEquals(1, objChange.changedFields.size)
                // While you can watch for updates to a nested property, the notification
                // only reports the change on the top-level property. In this case, there
                // was a change to one of the elements in the `members` property, so `members`
                // is what the notification reports - not `age`.
                assertEquals("members", objChange.changedFields.first())
            }
            observer.cancel()
            channel.close()
        }
        // :snippet-end:
        realm.close()
    }
}