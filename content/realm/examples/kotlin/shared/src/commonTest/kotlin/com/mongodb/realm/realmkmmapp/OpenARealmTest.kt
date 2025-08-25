package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

// :replace-start: {
//   "terms": {
//     "TMP_PATH": "\"my-directory-path\"",
//     "local2": "local",
//     "yourFlexAppId": "YOUR_APP_ID"
//   }
// }

class OpenARealmTest: RealmTest() {
    // :snippet-start: open-realm-object-schemas
    class Frog : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
    }

    class Person : RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
    }
    // :snippet-end:

    @Test
    fun openAndCloseDefaultRealmTest() {
        runBlocking {
            // :snippet-start: open-a-default-realm
            // Creates a realm with default configuration values
            val config = RealmConfiguration.create(
                // Pass object classes for the realm schema
                schema = setOf(Frog::class, Person::class)
            )

            // Open the realm with the configuration object
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // ... use the open realm ...
            // :snippet-end:
            assertEquals("default.realm", config.name)
            assertTrue(config.schema.contains(Frog::class))
            // :snippet-start: close-a-realm
            realm.close()
            // :snippet-end:
            assertTrue(realm.isClosed())
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun openConfiguredRealmTest() {
        runBlocking {
            val myEncryptionKey = getEncryptionKey()
            // :snippet-start: open-a-realm
            // Create a realm configuration with configuration builder
            // and pass all optional arguments
            val config = RealmConfiguration.Builder(
                schema = setOf(Frog::class, Person::class)
            )
                .name("myRealmName.realm")
                .directory(TMP_PATH)
                .encryptionKey(myEncryptionKey)
                .build()

            // Open the realm with the configuration object
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // ... use the open realm ...
            // :snippet-end:
            // :snippet-start: find-realm-path
            val realmPath = realm.configuration.path
            Log.v("Realm path: $realmPath")
            // :snippet-end:
            assertTrue(realmPath.contains("tmp"))
            assertEquals(myEncryptionKey, config.encryptionKey)
            assertEquals("myRealmName.realm", config.name)
            realm.close()
            assertTrue(realm.isClosed())
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun deleteRealmIfMigrationNeeded() {
        runBlocking {
            // :snippet-start: delete-realm-if-migration-needed
            val config = RealmConfiguration.Builder(
                schema = setOf(Frog::class)
            )
                .deleteRealmIfMigrationNeeded()
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-end:
            assertTrue(config.deleteRealmIfMigrationNeeded)
            realm.close()
            assertTrue(realm.isClosed())
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun openAnInMemoryRealmTest() {
        runBlocking {
            // :snippet-start: open-an-in-memory-realm
            // Create the in-memory realm configuration
            val config = RealmConfiguration.Builder(
                schema = setOf(Frog::class, Person::class)
            )
                .inMemory()
                .build()

            // Open the realm with the configuration object
            val realm = Realm.open(config)
            Log.v("Successfully opened an in-memory realm")

            // ... use the open realm ...
            // :snippet-end:
            assertTrue(config.inMemory)
            realm.close()
            assertTrue(realm.isClosed())
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun initialDataCallbackTest() {
        runBlocking {
            // :snippet-start: initial-data-callback
            val config = RealmConfiguration.Builder(
                schema = setOf(Frog::class, Person::class)
            )
                .initialData {
                    copyToRealm(Frog().apply { name = "Kermit" })
                    copyToRealm(Person().apply { name = "Jim Henson" })
                }
                .inMemory() // :remove:
                .build()

            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")

            // Opened realm includes the initial data
            val initialFrog = realm.query<Frog>().find().first()
            val initialPerson = realm.query<Person>().find().first()
            Log.v("Realm initialized with: ${initialFrog.name} and ${initialPerson.name}")
            // :snippet-end:
            assertEquals(1, realm.query<Frog>().find().size)
            assertEquals("Kermit", initialFrog.name)
            assertEquals(1, realm.query<Person>().find().size)
            assertEquals("Jim Henson", initialPerson.name)
            realm.close()
            assertTrue(realm.isClosed())
            Realm.deleteRealm(config)
        }
    }

    @Test
    fun syncToLocalRealm() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        // :snippet-start: sync-to-local-realm
        // Instantiate the synced realm with your App ID
        val app = App.create(yourFlexAppId)

        runBlocking {
            val user = app.login(credentials)
            // Create the synced realm configuration
            val syncConfig = SyncConfiguration.Builder(user, setOf(Frog::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Frog>(),"all-frogs")
                }
                .build()

            // Open the synced realm and add data to it
            val syncRealm = Realm.open(syncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration.name}")

            syncRealm.write {
                this.copyToRealm(Frog().apply {
                    name = "Kermit"
                })
            }
            // Wait for write to sync
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            // :remove-start:
            val syncFrog = syncRealm.query<Frog>().find().first()
            assertEquals("Kermit", syncFrog.name)
            // :remove-end:

            // Create the local realm
            val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("local.realm")
                .build()
            // Copy data from synced realm to the new realm
            syncRealm.writeCopyTo(localConfig)
            // Close the synced realm when you're done copying
            syncRealm.close()

            // Open the new local realm
            val localRealm = Realm.open(localConfig)

            // Copied Frog object is available in the new realm
            val frog = localRealm.query<Frog>().find().first()
            Log.v("Copied Frog: ${frog.name}")
            assertEquals("Kermit", frog.name) // :remove:

            localRealm.close()
            // :remove-start:
            assertTrue(syncRealm.isClosed())
            assertTrue(localRealm.isClosed())
            app.close()
            Realm.deleteRealm(localConfig)
            //Realm.deleteRealm(syncConfig) // [RLM_ERR_DELETE_OPENED_REALM]: Cannot delete files of an open Realm
            // :remove-end:
        }
        // :snippet-end:
    }
    @Test
    fun inMemoryToLocalRealm() {
        // :snippet-start: in-memory-to-local-realm
        runBlocking {
            // Create the in-memory realm
            val inMemoryConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("inMemory.realm")
                .inMemory()
                .build()

            // Open the realm and add data to it
            val inMemoryRealm = Realm.open(inMemoryConfig)
            assertTrue(inMemoryRealm.configuration.inMemory) // :remove:

            inMemoryRealm.write {
                this.copyToRealm(Frog().apply {
                    name = "Kermit"
                })
            }
            // :remove-start:
            val inMemoryFrog = inMemoryRealm.query<Frog>().find().first()
            assertEquals("Kermit", inMemoryFrog.name)
            // :remove-end:

            // Create the local realm
            val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("local2.realm")
                .build()
            // Copy data from `inMemoryRealm` to the new realm
            inMemoryRealm.writeCopyTo(localConfig)
            // Close the original realm when you're done copying
            inMemoryRealm.close()

            // Open the new local realm
            val localRealm = Realm.open(localConfig)

            // Copied Frog object is available in the new realm
            val frog = localRealm.query<Frog>().find().first()
            Log.v("Copied Frog: ${frog.name}")
            assertEquals("Kermit", frog.name) // :remove:

            localRealm.close()
            // :remove-start:
            assertTrue(inMemoryRealm.isClosed())
            assertTrue(localRealm.isClosed())
            Realm.deleteRealm(inMemoryConfig)
            Realm.deleteRealm(localConfig)
            // :remove-end:
        }
        // :snippet-end:
    }
    @Test
    fun unencryptedToEncryptedRealm() {
        val encryptionKey = getEncryptionKey()
        // :snippet-start: unencrypted-to-encrypted-realm
        runBlocking {
            // Create the unencrypted realm
            val unencryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("unencrypted.realm")
                .build()

            // Open the realm and add data to it
            val unencryptedRealm = Realm.open(unencryptedConfig)

            unencryptedRealm.write {
                this.copyToRealm(Frog().apply {
                    name = "Kermit"
                })
            }

            // ... Generate encryption key ...

            // Create the encrypted realm
            val encryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
                .name("encrypted.realm")
                .encryptionKey(encryptionKey)
                .build()

            // Copy data from `unencryptedRealm` to the new realm
            // Data is encrypted as part of the copy process
            unencryptedRealm.writeCopyTo(encryptedConfig)

            // Close the original realm when you're done copying
            unencryptedRealm.close()

            // Open the new encrypted realm
            val encryptedRealm = Realm.open(encryptedConfig)

            // Copied Frog object is available in the new realm
            val frog = encryptedRealm.query<Frog>().find().first()
            Log.v("Copied Frog: ${frog.name}")
            // :remove-start:
            assertEquals("Kermit", frog.name)
            assertEquals(encryptionKey, encryptedRealm.configuration.encryptionKey)
            // :remove-end:

            encryptedRealm.close()
            // :remove-start:
            assertTrue(encryptedRealm.isClosed())
            assertTrue(unencryptedRealm.isClosed())
            Realm.deleteRealm(unencryptedConfig)
            Realm.deleteRealm(encryptedConfig)
            // :remove-end:
        }
        // :snippet-end:
    }
}
 // :replace-end: