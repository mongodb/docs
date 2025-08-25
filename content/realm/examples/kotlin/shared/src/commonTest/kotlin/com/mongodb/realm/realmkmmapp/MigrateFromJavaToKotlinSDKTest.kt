package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import io.realm.kotlin.dynamic.DynamicMutableRealm
import io.realm.kotlin.dynamic.DynamicMutableRealmObject
import io.realm.kotlin.dynamic.DynamicRealm
import io.realm.kotlin.dynamic.DynamicRealmObject
import io.realm.kotlin.ext.query
import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.migration.AutomaticSchemaMigration
import io.realm.kotlin.notifications.InitialResults
import io.realm.kotlin.notifications.ResultsChange
import io.realm.kotlin.notifications.UpdatedResults
import io.realm.kotlin.query.RealmResults
import io.realm.kotlin.query.Sort
import org.mongodb.kbson.ObjectId
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.Index
import io.realm.kotlin.types.annotations.PrimaryKey
import kotlin.test.Test
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.async
import kotlinx.coroutines.launch

// :snippet-start: realm-object-model
class Sample : RealmObject {
    @PrimaryKey
    var stringField: String = "Realm"
    var byteField: Byte = 0xA
    var charField: Char = 'a'
    var shortField: Short = 17
    var intField: Int = 42
    @Index
    var longField: Long = 256L
    var booleanField: Boolean = true
    var floatField: Float = 3.14f
    var doubleField: Double = 1.19840122
    var timestampField: RealmInstant =
        RealmInstant.from(
            100,
            1000)
    var objectIdField: ObjectId = ObjectId()
}
// :snippet-end:

// :snippet-start: one-to-one-relationship
class Child : RealmObject {
    var frog: Frog? = null
}
// :snippet-end:

// :snippet-start: one-to-many-relationship
class Kid : RealmObject {
    var frogs: RealmList<Frog> =
        realmListOf()
}
// :snippet-end:

// :snippet-start: schema-types
class Student : RealmObject {
    var notes: RealmList<String> =
        realmListOf()
    var nullableNotes: RealmList<String?> =
        realmListOf()
}
// :snippet-end:

class MigrateFromJavaToKotlinSDKTest: RealmTest() {
    // disabling this test because using the "default.realm" default
    // flexible sync realm name conflicts with other tests...
    // but it's still a useful example. It's small so NBD.
    //@Test
    fun openARealmTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            // :snippet-start: open-a-realm
            val config = RealmConfiguration.create(
                setOf(Frog::class, Sample::class))
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    "${realm.configuration.name}")
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun openARealmBuilderTest() {
        val REALM_NAME = getRandom()
        val PATH = TMP_PATH
        val KEY = ByteArray(64)

        runBlocking {
            // :snippet-start: open-a-realm-advanced
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .deleteRealmIfMigrationNeeded()
                .directory(PATH)
                .encryptionKey(KEY)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    realm.configuration.name
            )
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun asyncWriteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm:" +
                    realm.configuration.name
            )
            // :snippet-start: write-async
            realm.write {
                // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun syncWriteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: write-sync
            realm.writeBlocking {
                // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
            }
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun queryTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: query-filters
            val samples: RealmResults<Sample> =
                realm.query<Sample>().find()

            val samplesThatBeginWithN:
                    RealmResults<Sample> =
                realm.query<Sample>(
                    "stringField BEGINSWITH 'N'"
                ).find()
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun querySortLimitDistinctTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            // :snippet-start: query-sort-limit-distinct
            val aggregates: RealmResults<Sample> =
                realm.query<Sample>()
                    .distinct(Sample::stringField.name)
                    .sort(Sample::stringField.name,
                        Sort.ASCENDING)
                    .limit(2)
                    .find()
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun deleteTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }
            // :snippet-start: deletes
            val sample: Sample? =
                realm.query<Sample>()
                    .first().find()

            // delete one object synchronously
            realm.writeBlocking {
                if (sample != null) {
                    findLatest(sample)
                        ?.also { delete(it) }
                }
            }

            // delete a query result asynchronously
            GlobalScope.launch {
                realm.write {
                    query<Sample>()
                        .first()
                        .find()
                        ?.also { delete(it) }
                }
            }
            // :snippet-end:
            // synchronous operation to block realm from closing too early
            realm.writeBlocking {
                if (sample != null) {
                    findLatest(sample)
                        ?.also { delete(it) }
                }
            }
            realm.close()
        }
    }

    @Test
    fun notificationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()
            val realm = Realm.open(config)
            Log.v("Successfully opened realm: ${realm.configuration.name}")
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }

            val asyncQuery = async {
                // :snippet-start: notifications
                // in a coroutine or a suspend function
                realm.query<Sample>().asFlow().collect {
                        results: ResultsChange<Sample> ->
                    when (results) {
                        is InitialResults<Sample> -> {
                            // do nothing with the
                            // initial set of results
                        }
                        is UpdatedResults<Sample> -> {
                            // log change description
                            Log.v("Results changed. " +
                                "change ranges: " +
                                results.changeRanges +
                                ", insertion ranges: " +
                                results.insertionRanges +
                                ", deletion ranges: " +
                                results.deletionRanges
                            )
                        }
                    }
                }
                // :snippet-end:
            }
            asyncQuery.cancel()
            realm.close()
        }
    }

    @Test
    fun threadingTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()

            // :snippet-start: threading
            val realm = Realm.open(config)
            // :remove-start:
            realm.writeBlocking { // this: MutableRealm
                val sample = Sample()
                sample.stringField = "Sven"
                this.copyToRealm(sample)
                sample.stringField = "not sven"
                this.copyToRealm(sample)
            }
            // :remove-end:
            val sample: Sample? =
                realm.query<Sample>()
                    .first()
                    .find()

            launch(Dispatchers.Unconfined) {
                // can access the realm opened on
                // a different thread
                realm.query<Sample>().find()
                // can access realm object queried
                // on a different thread
                Log.v(sample!!.stringField)
            }.join()
            // :snippet-end:
            realm.close()
        }
    }

    @Test
    fun migrationTest() {
        val REALM_NAME = getRandom()

        runBlocking {
            val config = RealmConfiguration.Builder(
                setOf(Frog::class, Sample::class))
                .name(REALM_NAME)
                .directory(TMP_PATH)
                .build()

            // :snippet-start: migrations
            // A Realm migration that performs
            // automatic schema migration
            // and allows additional custom
            // migration of data.
            RealmConfiguration.Builder(
                schema = setOf(Sample::class))
                .migration(AutomaticSchemaMigration {
                        context:
                            AutomaticSchemaMigration.MigrationContext ->
                    val oldRealm:
                            DynamicRealm =
                        context.oldRealm
                    val newRealm:
                            DynamicMutableRealm =
                        context.newRealm
                    // dynamic realm gives access
                    // to realm data
                    // through a generic string
                    // based API
                    context.enumerate("Sample") {
                            oldObject:
                            DynamicRealmObject,
                            newObject:
                                DynamicMutableRealmObject? ->
                        newObject?.set("longField",
                                        42L)
                    }
                })
                .build()
            val realm = Realm.open(config)
            // :snippet-end:
            realm.close()
        }
    }
}