package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.ext.query
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class EncryptARealmTest : RealmTest() {
    @Test
    fun encryptARealm() {
        // :snippet-start: encrypt-a-realm
        // return a random key from the given seed
        fun getRandomKey(seed: Long? = null): ByteArray {
            // generate a new 64-byte encryption key
            val key = ByteArray(64)
            if (seed != null) {
                // If there is a seed provided, create a random number with that seed
                // and fill the byte array with random bytes
                Random(seed).nextBytes(key)
            } else {
                // fill the byte array with random bytes
                Random.nextBytes(key)
            }
            return key
        }
        // :remove-start:
        assertTrue(getRandomKey().size == 64)
        val generatedKey = getRandomKey()
        // :remove-end:

        runBlocking {
            // Create the configuration
            val config = RealmConfiguration.Builder(setOf(Frog::class))
                // :remove-start:
                .deleteRealmIfMigrationNeeded()
                .directory("temp/encrypted")
                // :remove-end:
                // Specify the encryption key
                .encryptionKey(generatedKey)
                .build()
            // Open the realm with the configuration
            val realm = Realm.open(config)
            Log.v("Successfully opened encrypted realm: ${realm.configuration.name}")
            // :remove-start:
            assertEquals(generatedKey, realm.configuration.encryptionKey)
            realm.close()
            Realm.deleteRealm(config)
            // :remove-end:
        }
        // :snippet-end:
    }

    @Test
    fun encryptSyncedRealm() {
        val generatedKey = getEncryptionKey()
        val app = App.create(yourFlexAppId)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            // :snippet-start: encrypt-synced-realm
            val syncConfig = SyncConfiguration.Builder(user, setOf(Frog::class))
                .initialSubscriptions { realm ->
                    add(realm.query<Frog>())
                }
                // Specify the encryption key
                .encryptionKey(generatedKey)
                .build()
            val realm = Realm.open(syncConfig)
            Log.v("Successfully opened encrypted realm: ${realm.configuration.name}")
            // :snippet-end:
            assertEquals(generatedKey, realm.configuration.encryptionKey)
            realm.close()
            user.delete()
        }
    }
}