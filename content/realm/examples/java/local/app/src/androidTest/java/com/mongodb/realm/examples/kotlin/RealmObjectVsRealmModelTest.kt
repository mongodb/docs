package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.FrogObjectExampleKt
import com.mongodb.realm.examples.model.kotlin.FrogRealmModelExampleKt
import io.realm.*
import org.junit.Test


class RealmObjectVsRealmModelTest : RealmTest() {
    @Test
    fun testRealmObjectVsRealmModel() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name("realmobject.vs.realmmodel.kt")
                .inMemory()
                .allowWritesOnUiThread(true)
                .allowQueriesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            val listener: RealmObjectChangeListener<RealmModel> =
                RealmObjectChangeListener { realmModel, changeSet ->
                    Log.v(
                        "EXAMPLE",
                        "This will never be called"
                    )
                }
            var frogRealmObject : FrogObjectExampleKt? = null
            var frogRealmModel : FrogRealmModelExampleKt? = null
            realm.executeTransaction {
                frogRealmObject = realm.createObject(FrogObjectExampleKt::class.java)
                frogRealmModel = realm.createObject(FrogRealmModelExampleKt::class.java)
            }

            // :snippet-start: realm-object-vs-realm-model
            // :replace-start: {
            //    "terms": {
            //       "FrogRealmModelExampleKt": "Frog"
            //    }
            // }
            // With RealmObject
            frogRealmObject?.isValid
            frogRealmObject?.addChangeListener(listener)

            // With RealmModel
            RealmObject.isValid(frogRealmModel)
            RealmObject.addChangeListener(frogRealmModel, listener)
            // :replace-end:
            // :snippet-end:


            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }
}