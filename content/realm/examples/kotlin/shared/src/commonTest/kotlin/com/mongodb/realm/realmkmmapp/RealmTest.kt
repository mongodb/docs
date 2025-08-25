package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.mongodb.AppConfiguration
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.newSingleThreadContext
import kotlinx.coroutines.test.setMain
import kotlinx.coroutines.withTimeout
import kotlin.random.Random
import kotlin.test.BeforeTest
import kotlin.time.Duration
import kotlin.time.Duration.Companion.seconds

/*
 * RealmTest -- base class that provides utilities/setup for all other test classes
 */
open class RealmTest {
    fun getRandom(): String {
        return Random.nextLong(from = 100000, until = 100000000000).toString()
    }

    fun getRandomEmail(): String {
        val allowedChars = ('a'..'z') + ('0'..'9')
        val randomString = (1..10)
            .map { allowedChars.random() }
            .joinToString("")
        return "$randomString@example.com"
    }

    fun getEncryptionKey(seed: Long? = null): ByteArray {
        // generate a new 64-byte encryption key
        val key = ByteArray(64)
        if (seed != null) {
            // If there is a seed provided, create a random number with that seed and fill the byte array with random bytes
            Random(seed).nextBytes(key)
        } else {
            // fill the byte array with random bytes
            Random.nextBytes(key)
        }
        return key
    }

    val SYNCED_REALM_SCHEMA = setOf(Frog::class, Sample::class)
    val YOUR_APP_ID: String = "kmm-example-testers-viybt"
    val EDGE_SERVER_APP_ID = "sync-edge-server-cskhoow"
    val yourAppId = AppConfiguration.Builder(YOUR_APP_ID).syncRootDirectory("tmp/sync/".plus(getRandom())).build()

    val TESTER_APP_ID: String = "example-testers-kvjdy"

    val FLEXIBLE_APP_ID = "kotlin-flexible-tijhx"
    val yourFlexAppId = AppConfiguration.Builder(FLEXIBLE_APP_ID).syncRootDirectory("tmp/sync/".plus(getRandom())).build()
    val PARTITION = getRandom()
    val TMP_PATH = "tmp"
    val mainThreadSurrogate = newSingleThreadContext("UI thread")
    val defaultRealmConfiguration = RealmConfiguration.Builder(setOf())
        .inMemory()
        .directory(TMP_PATH)
        .name(getRandom())
        .build()

    suspend fun <T : Any?> Channel<T>.receiveOrFail(timeout: Duration = 30.seconds): T {
        return withTimeout(timeout) {
            receive()
        }
    }

    // kotlin test framework doesn't support "before class" on jvm, so... before each test
    @BeforeTest
    internal fun setUp() {
        Dispatchers.setMain(mainThreadSurrogate) // set a fake "ui thread" for the jvm
        //Napier.base(DebugAntilog()) // initialize napier
        // log is getting really spammy -- probably because napier is initialized multiple times. Testing commenting this out.
    }
}
