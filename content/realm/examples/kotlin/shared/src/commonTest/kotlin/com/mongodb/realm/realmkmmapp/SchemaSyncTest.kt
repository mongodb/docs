package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.mongodb.syncSession
import kotlinx.coroutines.runBlocking
import org.mongodb.kbson.ObjectId
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.time.Duration.Companion.seconds

class SchemaSyncTest : RealmTest() {
    /*
    ** Object types defined in SchemaSync.kt **
     */
    @Test
    fun syncRealmObjectTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(ExampleSyncObject_Frog::class, ExampleSyncRelationship_Pond::class))
                .initialSubscriptions { realm ->
                    add(realm.query<ExampleSyncObject_Frog>(), "all-frogs")
                    add(realm.query<ExampleSyncRelationship_Pond>(), "all-ponds")
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            val frogId = ObjectId()
            val pondId = ObjectId()
            syncRealm.write {
                val existingFrogs = query<ExampleSyncObject_Frog>().find()
                delete(existingFrogs)
                val existingPonds = query<ExampleSyncRelationship_Pond>().find()
                delete(existingPonds)
                copyToRealm(ExampleSyncObject_Frog().apply {
                    _id = frogId
                    name = "Kermit"
                    age = 42
                })
                copyToRealm(ExampleSyncRelationship_Pond().apply {
                    _id = pondId
                    name = "Frog Pond"

                })
            }
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            syncRealm.write {
                val frog = query<ExampleSyncObject_Frog>("_id == $0", frogId).find().first()
                val pond = query<ExampleSyncRelationship_Pond>("_id == $0", pondId).find().first()
                delete(frog)
                delete(pond)
            }
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun syncToOneRelationshipTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(ExampleSyncRelationship_Frog::class, ExampleSyncRelationship_Pond::class))
                .initialSubscriptions { realm ->
                    add(realm.query<ExampleSyncRelationship_Frog>())
                    add(realm.query<ExampleSyncRelationship_Pond>())
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            val frogId = ObjectId()
            val pondId = ObjectId()
            syncRealm.write {
                val existingFrogs = query<ExampleSyncRelationship_Frog>().find()
                delete(existingFrogs)
                val existingPonds = query<ExampleSyncRelationship_Pond>().find()
                delete(existingPonds)
                copyToRealm(ExampleSyncRelationship_Frog().apply {
                    _id = frogId
                    name = "Kermit"
                    age = 42
                    favoritePond = copyToRealm(ExampleSyncRelationship_Pond().apply {
                        _id = pondId
                        name = "Frog Pond"
                    })
                })
            }
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            syncRealm.write {
                val frog = query<ExampleSyncRelationship_Frog>("_id == $0", frogId).find().first()
                val pond = query<ExampleSyncRelationship_Pond>("_id == $0", pondId).find().first()
                delete(frog)
                delete(pond)
            }
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun syncToManyRelationshipTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(ExampleSyncRelationship_Many_Frog::class, ExampleSyncRelationship_Pond::class))
                .initialSubscriptions { realm ->
                    add(realm.query<ExampleSyncRelationship_Many_Frog>())
                    add(realm.query<ExampleSyncRelationship_Pond>())
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            val frogId = ObjectId()
            val pondId = ObjectId()
            syncRealm.write {
                val existingFrogs = query<ExampleSyncRelationship_Many_Frog>().find()
                delete(existingFrogs)
                val existingPonds = query<ExampleSyncRelationship_Pond>().find()
                delete(existingPonds)
                copyToRealm(ExampleSyncRelationship_Many_Frog().apply {
                    _id = frogId
                    name = "Kermit"
                    age = 42
                    favoritePonds = realmListOf(copyToRealm(ExampleSyncRelationship_Pond().apply {
                        _id = pondId
                        name = "Frog Pond"
                    }))
                })
            }
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            syncRealm.write {
                val frog = query<ExampleSyncRelationship_Many_Frog>("_id == $0", frogId).find().first()
                val pond = query<ExampleSyncRelationship_Pond>("_id == $0", pondId).find().first()
                delete(frog)
                delete(pond)
            }
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun syncInverseRelationshipTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(ExampleSyncRelationship_Inverse_Frog::class, ExampleSyncRelationship_Inverse_Pond::class))
                .initialSubscriptions { realm ->
                    add(realm.query<ExampleSyncRelationship_Inverse_Frog>())
                    add(realm.query<ExampleSyncRelationship_Inverse_Pond>())
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            val frogId = ObjectId()
            val pondId = ObjectId()
            syncRealm.write {
                val existingFrogs = query<ExampleSyncRelationship_Inverse_Frog>().find()
                delete(existingFrogs)
                val existingPonds = query<ExampleSyncRelationship_Inverse_Pond>().find()
                delete(existingPonds)
                copyToRealm(ExampleSyncRelationship_Inverse_Frog().apply {
                    _id = frogId
                    name = "Kermit"
                    age = 42
                    favoritePonds = realmListOf(copyToRealm(ExampleSyncRelationship_Inverse_Pond().apply {
                        _id = pondId
                        name = "Frog Pond"
                    }))
                })
            }
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            syncRealm.write {
                val frog = query<ExampleSyncRelationship_Inverse_Frog>("_id == $0", frogId).find().first()
                val pond = query<ExampleSyncRelationship_Inverse_Pond>("_id == $0", pondId).find().first()
                assertEquals(pond.frog.first(), frog)
                delete(frog)
                delete(pond)
            }
            user.delete()
            syncRealm.close()
        }
    }

    @Test
    fun syncEmbeddedRelationshipTest() {
        val credentials = Credentials.anonymous(reuseExisting = false)
        runBlocking {
            val app = App.create(FLEXIBLE_APP_ID)
            val user = app.login(credentials)
            val flexSyncConfig = SyncConfiguration.Builder(user, setOf(ExampleSyncRelationship_Embedded_Frog::class, ExampleSyncRelationship_Embedded_Forest::class, ExampleSyncRelationship_EmbeddedPond::class))
                .initialSubscriptions { realm ->
                    add(realm.query<ExampleSyncRelationship_Embedded_Frog>())
                    add(realm.query<ExampleSyncRelationship_Embedded_Forest>())
                }
                .build()
            val syncRealm = Realm.open(flexSyncConfig)
            Log.v("Successfully opened realm: ${syncRealm.configuration}")

            val frogId = ObjectId()
            val forestId = ObjectId()
            syncRealm.write {
                val existingFrogs = query<ExampleSyncRelationship_Embedded_Frog>().find()
                delete(existingFrogs)
                val existingForests = query<ExampleSyncRelationship_Embedded_Forest>().find()
                delete(existingForests)
                val existingPonds = query<ExampleSyncRelationship_EmbeddedPond>().find()
                delete(existingPonds)
                copyToRealm(ExampleSyncRelationship_Embedded_Frog().apply {
                    _id = frogId
                    name = "Kermit"
                    age = 42
                    favoritePond = ExampleSyncRelationship_EmbeddedPond().apply {
                        name = "Frog Pond"
                    }
                })
                copyToRealm(ExampleSyncRelationship_Embedded_Forest().apply {
                    _id = forestId
                    name = "Frog Forest"
                    forestPonds = realmListOf(ExampleSyncRelationship_EmbeddedPond().apply {
                        name = "Frog Pond"
                    })
                })
            }
            syncRealm.syncSession.uploadAllLocalChanges(30.seconds)
            syncRealm.write {
                val frog = query<ExampleSyncRelationship_Embedded_Frog>("_id == $0", frogId).find().first()
                val forest = query<ExampleSyncRelationship_Embedded_Forest>("_id == $0", forestId).find().first()
                assertEquals(frog.favoritePond?.name, "Frog Pond")
                assertEquals(forest.forestPonds.first().name, "Frog Pond")
                delete(frog)
                delete(forest)
            }
            user.delete()
            syncRealm.close()
        }
    }
}