package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.MutableRealm
import io.realm.kotlin.Realm
import io.realm.kotlin.TypedRealm
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.log.LogLevel
import io.realm.kotlin.log.RealmLog
import io.realm.kotlin.log.RealmLogger
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.exceptions.ClientResetRequiredException
import io.realm.kotlin.mongodb.ext.subscribe
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.*
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.query.RealmResults
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

// :replace-start: {
//   "terms": {
//     "yourAppId": "YOUR_APP_ID",
//     "yourFlexAppId": "YOUR_APP_ID",
//      "strategy2": "clientResetStrategy",
//      "strategy3": "clientResetStrategy",
//     "hideNotReusingAnonymousUser": "Credentials.anonymous()",
//      "ExampleSyncObject_": "",
//      "SyncTask": "Task"
//   }
// }
class SyncTest: RealmTest() {
    private val hideNotReusingAnonymousUser = Credentials.anonymous(reuseExisting = false)
    @Test
    fun addSyncToAppTest() {
        // :snippet-start: connect-to-backend
        // Replace `YOUR_APP_ID` with your Atlas App ID
        val app = App.create(yourFlexAppId)
        // :snippet-end:
        runBlocking {
            // :snippet-start: authenticate-user
            // Authenticate the Atlas App Services user
            val myAuthenticatedUser = app.login(hideNotReusingAnonymousUser)
            // :snippet-end:
            // :snippet-start: define-synced-realm
            // Define the configuration for the synced realm
            val config =
                // Pass the authenticated user and the set of
                // all objects types you want to be able to sync
                SyncConfiguration.Builder(
                    user = myAuthenticatedUser,
                    schema = setOf(ExampleSyncObject_List::class, ExampleSyncObject_Item::class)
                )
                    // Define an initial subscription with queries that include
                    // the user's lists with incomplete items
                    .initialSubscriptions{ realm ->
                        add(realm.query<ExampleSyncObject_List>("ownerId == $0", myAuthenticatedUser.id),
                            name = "user-lists"
                        )
                        add(realm.query<ExampleSyncObject_Item>("complete = false"),
                            name = "incomplete-items"
                        )
                    }
                    .build()
            // :snippet-end:

            // :snippet-start: open-synced-realm
            // Open the synced realm with the defined configuration
            val realm = Realm.open(config)
            Log.v("Successfully opened synced realm: ${realm.configuration.name}")
            // Wait for initial subscriptions to sync to Atlas
            realm.subscriptions.waitForSynchronization()
            // :snippet-end:
            val oid = ObjectId()
            // :snippet-start: write-to-synced-realm
            // Write ExampleSyncObject_List and ExampleSyncObject_Item objects to the synced realm
            // Objects that match the subscription query are synced to Atlas
            realm.write {
                val list = ExampleSyncObject_List().apply {
                    _id = oid // :remove:
                    name = "My Todo List"
                    ownerId = myAuthenticatedUser.id
                    items.add(ExampleSyncObject_Item().apply {
                        name = "Check email"
                        complete = false
                    })
                }
                copyToRealm(list)
            }
            realm.syncSession.uploadAllLocalChanges(30.seconds)
            // :snippet-end:
            realm.write {
                val todo = query<ExampleSyncObject_List>().find()
                assertEquals(oid, todo[0]._id)
                assertEquals(1, todo.size)
                assertEquals("Check email", todo[0].items[0].name)
                delete(todo)
                assertEquals(0, todo.size)
            }
            myAuthenticatedUser.delete()
            realm.close()
            app.close()
        }
    }

    @Test
    fun openASyncedRealmTest() {
        // :snippet-start: open-a-synced-realm
        val app = App.create(yourAppId)
        runBlocking {
            val user = app.login(hideNotReusingAnonymousUser)
            val config =
                SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                    // specify name so realm doesn't just use the "default.realm" file for this user
                    .name(PARTITION)
                    .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.close()
            assertEquals(PARTITION + ".realm", realm.configuration.name) // :remove:
        }
        // :snippet-end:
    }

    @Test
    fun configureASyncedRealmTest() {
        // :snippet-start: configure-a-synced-realm
        val app = App.create(yourAppId)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config =
                SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
                    .maxNumberOfActiveVersions(10)
                    .waitForInitialRemoteData()
                    .name("realm name")
                    .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :snippet-end:
    }

    @Test
    fun openAFlexibleSyncRealmTest() {
        // :snippet-start: open-a-flexible-sync-realm
        val app = App.create(yourFlexAppId)
        // use constants for query names so you can edit or remove them later
        val NAME_QUERY = "NAME_QUERY"
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "name value"
                        ),
                        "subscription name"
                    )
                }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.close()
        }
        // :snippet-end:
    }

    @Test
    fun configureAFlexibleSyncRealmTest() {
        // :snippet-start: configure-a-flexible-sync-realm
        val app = App.create(yourFlexAppId)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .maxNumberOfActiveVersions(10)
                .name("realm name")
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "name value"
                        ),
                        "subscription name"
                    )
                }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.close()
        }
        // :snippet-end:
    }

    @Test
    fun openRealmWaitForInitialDownloadTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val setupUser = app.login(Credentials.anonymous(reuseExisting = false))
            val setupConfig = SyncConfiguration.Builder(setupUser, setOf(Toad::class))
                .waitForInitialRemoteData(60.seconds)
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "Jeremiah"
                        ),
                        "subscription name"
                    )
                }
                .build()
            val setupRealm = Realm.open(setupConfig)
            Log.v("Successfully opened realm: ${setupRealm.configuration}")
            setupRealm.syncSession.downloadAllServerChanges(30.seconds)
            // Delete frogs to make this test successful on consecutive reruns
            setupRealm.write {
                // fetch all frogs from the realm
                val toads: RealmResults<Toad> = this.query<Toad>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(toads)
                assertEquals(0, toads.size)
            }

            // Create an object to set up the test
            setupRealm.write {
                this.copyToRealm(Toad().apply {
                    name = "Jeremiah"
                })
            }

            setupRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val toads: RealmResults<Toad> = setupRealm.query<Toad>().find()
            assertEquals(1, toads.size)
            setupRealm.close()

            val email = getRandom()
            val password = getRandom()
            app.emailPasswordAuth.registerUser(email, password)
            // :snippet-start: wait-for-initial-download
            val user = app.login(Credentials.emailPassword(email, password))
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .waitForInitialRemoteData(60.seconds)
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "Jeremiah"
                        ),
                        "toads_named_jeremiah"
                    )
                }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")

            // Query the realm we opened after waiting for data to download, and see that it contains data
            val downloadedToads: RealmResults<Toad> = realm.query<Toad>().find()
            Log.v("After downloading initial data, downloadedToads.size is ${downloadedToads.size}")
            assertEquals(1, downloadedToads.size) // :remove:
            realm.close()
            // :snippet-end:
        }
    }

    @Test
    fun openRealmConditionallyDownloadChangesTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val email = getRandom()
            val password = getRandom()
            app.emailPasswordAuth.registerUser(email, password)
            // :snippet-start: conditionally-wait-for-initial-download
            val user = app.login(Credentials.emailPassword(email, password))
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "Lollihops"
                        ),
                        "toads_named_lollihops"
                    )
                }
                .build()

            // :remove-start:
            val setupRealm = Realm.open(config)
            // If we don't call `downloadAllServerChanges` twice, it does not download any existing
            // relevant objects. Calling it once when there is no existing realm doesn't actually
            // seem to download data. Will ping SDK team about this.
            setupRealm.syncSession.downloadAllServerChanges(30.seconds)
            setupRealm.syncSession.downloadAllServerChanges(30.seconds)
            // Delete frogs to make this test successful on consecutive reruns
            setupRealm.write {
                // fetch all frogs from the realm
                val toads: RealmResults<Toad> = this.query<Toad>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(toads)
                assertEquals(0, toads.size)
            }

            // Create an object to set up the test
            setupRealm.write {
                this.copyToRealm(Toad().apply {
                    name = "Lollihops"
                })
            }

            setupRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val toads: RealmResults<Toad> = setupRealm.query<Toad>().find()
            assertEquals(1, toads.size)
            setupRealm.close()

            // Set a value for our conditional check so we can show the logic in the example
            val downloadData = true
            // :remove-end:
            val realm = Realm.open(config)
            // Conditionally download data before using the realm based on some business logic
            if (downloadData) {
                realm.syncSession.downloadAllServerChanges(30.seconds)
            }

            // Query the realm we opened after waiting for data to download, and see that it contains data
            val downloadedToads: RealmResults<Toad> = realm.query<Toad>().find()
            Log.v("After conditionally downloading data, downloadedToads.size is ${downloadedToads.size}")
            assertEquals(1, downloadedToads.size) // :remove:
            realm.close()
            // :snippet-end:
        }
    }

    @Test
    fun openRealmOfflineTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val setupUser = app.login(Credentials.anonymous(reuseExisting = false))
            val config = SyncConfiguration.Builder(setupUser, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(
                        realm.query<Toad>(
                            "name == $0",
                            "Mr. Toad"
                        ),
                        "toads_named_mr_toad"
                    )
                }
                .build()
            val setupRealm = Realm.open(config)
            Log.v("Successfully opened realm: ${setupRealm.configuration}")
            setupRealm.syncSession.downloadAllServerChanges(30.seconds)
            // Delete frogs to make this test successful on consecutive reruns
            setupRealm.write {
                // fetch all frogs from the realm
                val toads: RealmResults<Toad> = this.query<Toad>().find()
                // call delete on the results of a query to delete those objects permanently
                delete(toads)
                assertEquals(0, toads.size)
                // Create an object to set up the test
                this.copyToRealm(Toad().apply {
                    name = "Mr. Toad"
                })
            }

            setupRealm.syncSession.uploadAllLocalChanges(30.seconds)
            val updatedToads: RealmResults<Toad> = setupRealm.query<Toad>().find()
            assertEquals(1, updatedToads.size)
            setupRealm.close()

            val email = getRandom()
            val password = getRandom()
            // :snippet-start: open-realm-offline
            // You can only open a synced realm offline if there is a cached user credential. If
            // there is no app.currentUser, you must log them in, which requires a network connection.
            if (app.currentUser == null) {
                app.login(Credentials.emailPassword(email, password))
            }
            // If the app.currentUser isn't null, you can use the cached credential to open the synced
            // realm even if the user is offline.
            val user = app.currentUser!!
            // :remove-start:
            assertEquals(setupUser, user)
            // There isn't a simple way to simulate an offline connection in a Kotlin unit test -
            // doing this seems to involve mocking a server. So we trust that the SDK has tests
            // this and aren't actually testing this with an offline connection.
            // :remove-end:
            val realm = Realm.open(config)

            // Query the realm we opened, and see that it contains data
            val offlineToads: RealmResults<Toad> = realm.query<Toad>().find()
            Log.v("After opening a realm offline, offlineToads.size is ${offlineToads.size}")
            assertEquals(1, offlineToads.size) // :remove:
            realm.close()
            // :snippet-end:
            val teardownRealm = Realm.open(config)
            teardownRealm.write {
                deleteAll()
            }
            val teardownToads: RealmResults<Toad> = teardownRealm.query<Toad>().find()
            teardownRealm.syncSession.downloadAllServerChanges(30.seconds)
            teardownRealm.syncSession.uploadAllLocalChanges(30.seconds)
            assertEquals(0, teardownToads.size)
        }
    }

    @Test
    fun addASubscriptionTest() {
        runBlocking {
            val app = App.create(yourFlexAppId)
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Team::class, SyncTask::class))
                .initialSubscriptions {realm -> add(realm.query<SyncTask>("progressMinutes >= 60")) }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: add-a-subscription
            realm.subscriptions.update {
                add(
                    realm.query<SyncTask>("progressMinutes >= $0",60)
                )
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(1, subscriptionCount)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun addASubscriptionQueryTest() {
        runBlocking {
            val app = App.create(yourFlexAppId)
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            // :snippet-start: initialize-subscribe-query-realm-app
            // Bootstrap the realm with an initial query to subscribe to
            val flexSyncConfig =
                SyncConfiguration.Builder(user, setOf(Team::class, SyncTask::class))
                    .initialSubscriptions { realm ->
                        add(
                            realm.query<Team>("$0 IN members", "Bob Smith"),
                            "bob_smith_teams"
                        )
                    }
                    .build()
            // :snippet-end:
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: subscribe-unnamed-query
            // Subscribe to a specific query
            val realmResults = realm.query<SyncTask>("progressMinutes >= $0", 60)
                .subscribe()

            // Subscribe to all objects of a specific type
            val realmQuery = realm.query<Team>()
            realmQuery.subscribe()
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(3, subscriptionCount)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun addANamedSubscriptionTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(yourFlexAppId)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Team::class, SyncTask::class))
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: add-a-named-subscription
            // Add a subscription named "team_dev_ed"
            realm.subscriptions.update { realm ->
                    add(
                        realm.query<Team>("teamName == $0", "Developer Education"),
                        name = "team_dev_ed"
                    )
                }
            // :snippet-end:
            // :snippet-start: subscribe-named-query
            // Add a subscription named "team_developer_education"
            val results = realm.query<Team>("teamName == $0", "Developer Education")
                .subscribe("team_developer_education")
            // :snippet-end:
            val subscriptions = realm.subscriptions.size
            assertEquals(2, subscriptions)
            val namedSubscription1 = realm.subscriptions.findByName("team_developer_education")
            assertEquals("team_developer_education", namedSubscription1?.name)
            val namedSubscription2 = realm.subscriptions.findByName("team_dev_ed")
            assertEquals("team_dev_ed", namedSubscription2?.name)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun waitForSubscriptionChangesTest() {
        val app = App.create(yourFlexAppId)
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { realm -> add(realm.query<Team>()) }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            realm.write { copyToRealm(Team().apply {
                teamName = "Bob Smith's Team"
                members = realmListOf("Bob Smith", "Jane Doe") })}
            realm.syncSession.uploadAllLocalChanges(30.seconds)
            // :snippet-start: wait-for-subscription-changes
            // Update the list of subscriptions
            realm.subscriptions.update {
                add(
                    realm.query<Team>("$0 IN members", "Jane Doe"),
                    "jane_doe_teams"
                )
            }
            // Wait for subscription to fully synchronize changes
            realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
            // :snippet-end:
            // :snippet-start: subscribe-wait-for-sync
            val results = realm.query<Team>("$0 IN members", "Bob Smith")
                .subscribe("bob_smith_teams", updateExisting = false, WaitForSync.ALWAYS)

            // After waiting for sync, the results set contains all the objects
            // that match the query - in our case, 1
            println("The number of teams that have Bob Smith as a member is ${results.size}")
            // :snippet-end:
            assertEquals(1, results.size)
            val subscriptionCount = realm.subscriptions.size
            assertEquals(3, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertEquals("\"Bob Smith\" == members", namedSubscription1?.queryDescription)
            val namedSubscription2 = realm.subscriptions.findByName("jane_doe_teams")
            assertEquals("\"Jane Doe\" == members", namedSubscription2?.queryDescription)
            realm.write {
                val deleteTeam = query<Team>("teamName == $0", "Bob Smith's Team").find()
                delete(deleteTeam)
            }
            user.delete()
            realm.close()
        }
    }

    @Test
    fun updateSubscriptionByNameTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { realm -> add(realm.query<Team>("$0 IN members", "Bob Smith"), "bob_smith_teams") }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: update-subscriptions-by-name
            // Create a subscription named "bob_smith_teams"
            realm.subscriptions.update {
                add(
                    realm.query<Team>("$0 IN members", "Bob Smith"),
                    "bob_smith_teams"
                )
            }

            // Set `updateExisting` to true to replace the existing
            // "bob_smith_teams" subscription
            realm.subscriptions.update {
                add(
                    realm.query<Team>("$0 IN members AND $1 IN members", "Bob Smith", "Jane Doe"),
                    "bob_smith_teams", updateExisting = true
                )
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(1, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertEquals("\"Bob Smith\" == members and \"Jane Doe\" == members", namedSubscription1?.queryDescription)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun updateSubscribeAPIByNameTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { it.query<Team>().subscribe() }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: update-query-by-name
            // Create a subscription named "bob_smith_teams"
            val results = realm.query<Team>("$0 IN members", "Bob Smith")
                .subscribe("bob_smith_teams")

            // Add another subscription with the same name with `updateExisting` set to true
            // to replace the existing subscription
            val updateResults =
                    realm.query<Team>("$0 IN members AND teamName == $1", "Bob Smith", "QA")
                        .subscribe("bob_smith_teams", updateExisting = true)
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(2, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertEquals("\"Bob Smith\" == members and teamName == \"QA\"", namedSubscription1?.queryDescription)
            user.delete()
            realm.close()
        }
    }


    @Test
    fun updateSubscriptionByQueryTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions {it.query<Team>("teamName == $0", "Developer Education").subscribe() }
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: update-subscriptions-by-query
            // Search for the subscription by query
            val subscription =
                realm.subscriptions.findByQuery(
                    realm.query<Team>("teamName == $0", "Developer Education")
                )

            // Remove the returned subscription and add the updated query
            if (subscription != null) {
                realm.subscriptions.update {
                    remove(subscription)
                    add(
                        realm.query<Team>("teamName == $0", "DevEd"),
                        "team_developer_education"
                    )
                }
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(1, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("team_developer_education")
            assertEquals("teamName == \"DevEd\"", namedSubscription1?.queryDescription)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun removeSingleSubscriptionTest() {
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            // :snippet-start: open-flex-sync-app
            // Login with authorized user and define a Flexible Sync SyncConfiguration
            val app = App.create(yourFlexAppId)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions {
                    // Define the initial subscription set for the realm ...
                   realm -> add(realm.query<Team>("$0 IN members", "Bob Smith"), "bob_smith_teams") // :remove:
                }
                .build()
            // Open the synced realm and manage subscriptions
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-end:
            // :snippet-start: remove-single-subscription
            realm.subscriptions.update {
                add(
                    realm.query<Team>("$0 IN members", "Bob Smith"),
                    "bob_smith_teams"
                )
            }

            // Wait for synchronization to complete before updating subscriptions
            realm.subscriptions.waitForSynchronization(Duration.parse("10s"))
            // :remove-start:
            val initialSubscriptionCount = realm.subscriptions.size
            assertEquals(1, initialSubscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertEquals("\"Bob Smith\" == members", namedSubscription1?.queryDescription)
            // :remove-end:

            // Remove subscription by name
            realm.subscriptions.update {
                remove("bob_smith_teams")
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(0, subscriptionCount)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun removeSubscriptionsOfTypeTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { realm -> add(realm.query<SyncTask>() ) }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            // :snippet-start: remove-all-subscriptions-to-an-object-type
            realm.subscriptions.update {
                add(
                    realm.query<Team>("$0 IN members", "Bob Smith"),
                    "bob_smith_teams")
            }

            // Wait for synchronization to complete before updating subscriptions
            realm.subscriptions.waitForSynchronization(Duration.parse("10s"))

            // :remove-start:
            val initialSubscriptionCount = realm.subscriptions.size
            assertEquals(2, initialSubscriptionCount)
            // :remove-end:
            // Remove all subscriptions to type Team
            realm.subscriptions.update {
                removeAll(Team::class)
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(1, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertNull(namedSubscription1?.name)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun removeAllSubscriptionsTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { realm -> add(realm.query<Team>()) }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")
            val initialSubscriptionCount = realm.subscriptions.size
            assertEquals(1, initialSubscriptionCount)
            // :snippet-start: remove-all-subscriptions
            // Remove all subscriptions
            realm.subscriptions.update {
                removeAll()
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(0, subscriptionCount)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun removeAllUnnamedSubscriptionsTest() {
        val app = App.create(yourFlexAppId)
        runBlocking {
            val credentials = Credentials.anonymous(reuseExisting = false)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(SyncTask::class, Team::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Team>("$0 IN members", "Bob Smith"), "bob_smith_teams") }
                .build()
            val realm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${realm.configuration}")

            val unnamedSubscription = realm.query<Team>("$0 IN members", "Jane Doe").subscribe()
            val initialSubscriptionCount = realm.subscriptions.size
            assertEquals(2, initialSubscriptionCount)
            // :snippet-start: remove-all-unnamed-subscriptions
            // Remove all unnamed (anonymous) subscriptions
            realm.subscriptions.update {
                removeAll(anonymousOnly = true)
            }
            // :snippet-end:
            val subscriptionCount = realm.subscriptions.size
            assertEquals(1, subscriptionCount)
            val namedSubscription1 = realm.subscriptions.findByName("bob_smith_teams")
            assertEquals("\"Bob Smith\" == members", namedSubscription1?.queryDescription)
            user.delete()
            realm.close()
        }
    }

    @Test
    fun setLogLevelLogger() {
        val email = getRandom()
        val password = getRandom()

        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :snippet-start: set-log-level-realmlog
            // Set a log level using the global RealmLog singleton
            RealmLog.level = LogLevel.TRACE

            // Access your app and use realm
            val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
            // :remove-start:
            app.emailPasswordAuth.registerUser(email, password)
            // :remove-end:
            val user = app.login(Credentials.emailPassword(email, password))
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Toad>("name == $0", "name value"), "sync subscription")
                }
                .build()
            val realm = Realm.open(config)

            // You can change the log level at any point in your app's lifecycle as needed
            RealmLog.level = LogLevel.INFO
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun setLogLevelCustomLogger() {
        val email = getRandom()
        val password = getRandom()

        // :snippet-start: define-custom-logger
        class MyLogger() : RealmLogger {
            override val tag: String = "CUSTOM_LOG_ENTRY"
            override val level: LogLevel = LogLevel.DEBUG
            override fun log(
                level: LogLevel,
                throwable: Throwable?,
                message: String?,
                vararg args: Any?
            ) {
                println(message) // Custom handling
            }
        }
        // :snippet-end:

        runBlocking { // use runBlocking sparingly -- it can delay UI interactions
            // :snippet-start: set-custom-realmlog-logger
            // Set an instance of a custom logger
            val myCustomLogger = MyLogger()
            RealmLog.add(myCustomLogger)

            // You can remove a specific logger
            RealmLog.remove(myCustomLogger)

            // Or remove all loggers, including the default system logger
            RealmLog.removeAll()
            // :snippet-end:
        }
    }

    @Test
    fun setLogLevelTestDeprecated() {
        val credentials = Credentials.anonymous()
        runBlocking {
            // :snippet-start: set-log-level-deprecated
            // Access your app
            val app = App.create(yourFlexAppId)
            val user = app.login(credentials)

            // Access the configuration builder for the app
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))

                // Set the logger to provide debug log
                // Must be set BEFORE you open a synced realm
                .log(LogLevel.DEBUG)

                .initialSubscriptions { realm ->
                    add(realm.query<Toad>(), "sync subscription")
                }
                .build()

            // Open the synced realm
            // Synced realm writes logs according to the log level set above
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun setCustomLoggerTestDeprecated() {
        class CustomLogger : RealmLogger {
            override var tag: String = ""
            override val level: LogLevel = LogLevel.NONE
            var logLevel: LogLevel = LogLevel.NONE
            var message: String? = null

            override fun log(
                level: LogLevel,
                throwable: Throwable?,
                message: String?,
                vararg args: Any?
            ) {
                this.logLevel = level
                this.message = message
            }
        }

        val credentials = Credentials.anonymous()

        runBlocking {
            // :snippet-start: set-custom-logger-deprecated
            val customLogger = CustomLogger()
            customLogger.tag = "Engineering debugging"
            customLogger.message = "${customLogger.logLevel}: ${customLogger.message}"

            // Access your app
            val app = App.create(yourFlexAppId)
            val user = app.login(credentials)

            // Access the configuration builder for the app
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))

                // Set the custom logger and applicable log level
                // Must be set BEFORE you open a synced realm
                .log(LogLevel.ALL, customLoggers = listOf(customLogger))

                .initialSubscriptions { realm ->
                    add(realm.query<Toad>(), "sync subscription")
                }
                .build()

            // Open the synced realm with the custom logger
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun syncErrorHandlerTest() {
        val credentials = Credentials.anonymous()
        val app = App.create(yourFlexAppId)
        // :snippet-start: sync-error-handler
        val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
            Log.e("Error message" + error.message.toString())
        }
        runBlocking {
            val user = app.login(credentials)
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Toad>(), "subscription name")
                }
                .errorHandler(syncErrorHandler) // Specify a sync error handler
                .build()
            // Proceed to open a realm...
        }
        // :snippet-end:
    }

    @Test
    fun clientResetTest() {
        fun manuallyRecoverUnsyncedData(before: TypedRealm, after: MutableRealm) {
            // Placeholder function to illustrate test
        }
        fun closeAllRealmInstances() {
            // Placeholder function to illustrate test
        }
        fun handleBackup(filePath: String) {
            // Placeholder function to illustrate test
        }
        val credentials = Credentials.anonymous()
        val app = App.create(yourFlexAppId)
        // :snippet-start: recover-discard
        val clientResetStrategy = object : RecoverOrDiscardUnsyncedChangesStrategy {
            override fun onBeforeReset(realm: TypedRealm) {
                Log.i("Client reset: attempting to automatically recover unsynced changes")
            }
            // Executed before the client reset begins.
            // Can be used to notify the user that a reset will happen.

            override fun onAfterRecovery(before: TypedRealm, after: MutableRealm) {
                Log.i("Client reset: successfully recovered all unsynced changes")
            }
            // Executed if and only if the automatic recovery has succeeded.

            override fun onAfterDiscard(before: TypedRealm, after: MutableRealm) {
                Log.i("Client reset: recovery unsuccessful, attempting to manually recover any changes")
                // ... Try to manually recover any unsynced data
                manuallyRecoverUnsyncedData(before, after)
            }
            // Executed if the automatic recovery has failed,
            // but the discard unsynced changes fallback has completed successfully.

            override fun onManualResetFallback(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                Log.i("Client reset: manual reset required")
                // ... Handle the reset manually here
            }
            // Automatic reset failed.
        }
        // :snippet-end:

        // :snippet-start: recover
        val strategy2 = object : RecoverUnsyncedChangesStrategy {
            override fun onBeforeReset(realm: TypedRealm) {
                Log.i("Client reset: attempting to automatically recover unsynced changes")
            }
            // Executed before the client reset begins.
            // Can be used to notify the user that a reset will happen.

            override fun onAfterReset(before: TypedRealm, after: MutableRealm) {
                Log.i("Client reset: successfully recovered all unsynced changes")
            }
            // Executed after the client reset is complete.
            // Can be used to notify the user that the reset is done.

            override fun onManualResetFallback(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                Log.i("Client reset: manual reset required")
                // ... Handle the reset manually here
            }
            // Automatic reset failed.
        }
        // :snippet-end:

        // :snippet-start: discard
        val strategy3 = object : DiscardUnsyncedChangesStrategy {
            override fun onBeforeReset(realm: TypedRealm) {
                Log.i("Client reset: attempting to discard any unsynced changes")
            }
            // Executed before the client reset begins.
            // Can be used to notify the user that a reset will happen.

            override fun onAfterReset(before: TypedRealm, after: MutableRealm) {
                Log.i("Client reset: attempting to manually recover any unsynced changes")
                // ...Try to manually recover any unsynced data 
                manuallyRecoverUnsyncedData(before, after)
            }
            // Executed after the client reset is complete.
            // Can be used to notify the user that the reset is done.

            override fun onManualResetFallback(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                Log.i("Client reset: manual reset required")
                // ... Handle the reset manually here
            }
            // Automatic reset failed.

            override fun onError(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                // No-op
            }
            // Deprecated. onManualResetFallback() used instead.
        }
        // :snippet-end:
        val manualReset = object : DiscardUnsyncedChangesStrategy {
            val recoveryFilePath = ""
            override fun onBeforeReset(realm: TypedRealm) {
                Log.i("Client reset: attempting to discard any unsynced changes")
            }
            // Executed before the client reset begins.
            // Can be used to notify the user that a reset will happen.
            override fun onAfterReset(before: TypedRealm, after: MutableRealm) {
                Log.i("Client reset: attempting to manually recover any unsynced changes")
                // ...Try to manually recover any unsynced data
                manuallyRecoverUnsyncedData(before, after)
            }
            override fun onError(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                // No-op
            }
            // :snippet-start: fallback
            override fun onManualResetFallback(
                session: SyncSession,
                exception: ClientResetRequiredException
            ) {
                Log.i("Client reset: manual reset required")

                // You *MUST* close any open Realm instance
                closeAllRealmInstances();

                // `executeClientReset()` creates a backup
                exception.executeClientReset();

                // (Optional) Send backup for analysis
                handleBackup(recoveryFilePath);

                // ... Restore the App state by reopening the realm 
                // or restarting the app
            }
            // :snippet-end:
        }

        runBlocking {
            val user = app.login(credentials)
            // :snippet-start: client-reset-strategy
            // Specify your client reset strategy in the SyncConfiguration
            // If you don't specify, defaults to RecoverOrDiscardUnsyncedChangesStrategy
            val config = SyncConfiguration.Builder(user, setOf(Toad::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Toad>(), "subscription name")
                }
                .syncClientResetStrategy(clientResetStrategy) // Set your client reset strategy
                .build()
            // :snippet-end:
            val realm = Realm.open(config)

            realm.close()
        }
    }
}
// :replace-end: