package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.annotations.ExperimentalRealmSerializerApi
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.annotations.ExperimentalAsymmetricSyncApi
import io.realm.kotlin.mongodb.ext.call
import io.realm.kotlin.mongodb.ext.insert
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds


// :replace-start: {
//   "terms": {
//     "yourFlexAppId": "YOUR_APP_ID"
//   }
// }

/*
** Snippets used on Stream Data to Atlas, Define, and CRUD pages **
** Object model defined in Schema.kt **
 */
class AsymmetricSyncTest : RealmTest() {

    @OptIn(ExperimentalAsymmetricSyncApi::class, ExperimentalRealmSerializerApi::class)
    @Test
    fun asymmetricObjectTest() = runBlocking {
        val credentials = Credentials.anonymous(reuseExisting = false)
        // :snippet-start: connect-and-authenticate
        val app = App.create(yourFlexAppId)
        val user = app.login(credentials)
        // :snippet-end:
        // :snippet-start: open-asymmetric-sync-realm
        val config = SyncConfiguration.create(user, setOf(WeatherSensor::class))
        val realm = Realm.open(config)
        Log.v("Successfully opened realm: ${realm.configuration.name}")
        // :snippet-end:

        val oid = ObjectId()
        // :snippet-start: create-asymmetric-object
        // Open a write transaction
        realm.write {
            // Create a new asymmetric object
            val weatherSensor = WeatherSensor().apply {
                id = oid //:remove:
                deviceId = "WX1278UIT"
                temperatureInFarenheit = 6.7F
                barometricPressureInHg = 29.65F
                windSpeedInMph = 2
            }
            // Insert the object into the realm with the insert() extension method
            insert(weatherSensor)

        // WeatherSensor object is inserted into the realm, then synced to the
        // App Services backend. You CANNOT access the object locally because it's
        // deleted from the local realm after sync is complete.
        }
        // :snippet-end:
        // Add a delay to give the document time to sync
        realm.syncSession.run {
            resume()
            uploadAllLocalChanges(30.seconds)
        }
        // Check that the asymmetric data was inserted, then delete by ID
        // Because we don't have MongoClient, we have to use a function
        val deletedCount = user.functions
            .call<Int>("deleteAsymmetricSyncData") {
                add(oid)
            }
        assertEquals(1, deletedCount)
        realm.close()
    }
}
// :replace-end: