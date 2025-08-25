package com.mongodb.realm.realmkmmapp

import com.mongodb.realm.realmkmmapp.RealmTest
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class Compacting: RealmTest() {

    class King: RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        var name: String = ""
    }
    @Test
    fun compactOnLaunchTest() {

        // :snippet-start: compactOnLaunch
        // Set a max file size equal to 100MB in bytes
        val maxFileSize = 100 * 1024 * 1024

        val config = RealmConfiguration.Builder(setOf(King::class))
            .compactOnLaunch{ totalBytes, usedBytes ->
                // totalBytes refers to the size of the file on disk in bytes (data + free space)
                // usedBytes refers to the number of bytes used by data in the file

                // Compact if the file is over the max file size and less than 50% 'used'
                (totalBytes > maxFileSize) && ((usedBytes / totalBytes) < 0.5)
            }
            // :remove-start:
            .directory("/tmp/")
            // :remove-end:
            .build()

        val realm: Realm = Realm.open(config)
        // :snippet-end:

        // check to make sure custom compaction standards are set
        var custom = false
        if (Realm.DEFAULT_COMPACT_ON_LAUNCH_CALLBACK != config.compactOnLaunchCallback) {
            custom = true
        }

        assertTrue(custom)

        realm.close()
    }

    @Test
    fun compactRealmTest() {
        // :snippet-start: compactRealm
        val config = RealmConfiguration.create(schema = setOf(Item::class))
        var compacted = Realm.compactRealm(config)
        // :snippet-end:

        if (compacted) {
            println("Compaction did succeed.")
        }
        else {
            println("Compaction did not succeed.")
        }

    }

}

