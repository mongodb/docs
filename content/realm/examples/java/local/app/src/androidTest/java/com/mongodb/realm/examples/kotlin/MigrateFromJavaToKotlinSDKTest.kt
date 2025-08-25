package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Sample
import io.realm.DynamicRealm
import io.realm.DynamicRealmObject
import io.realm.OrderedCollectionChangeSet
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmResults
import io.realm.RealmSchema
import io.realm.Sort
import io.realm.exceptions.RealmFileException
import java.util.*
import java.util.concurrent.Executors
import org.junit.Test

class MigrateFromJavaToKotlinSDKTest : RealmTest() {
    @Test
    fun testOpenARealm() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :snippet-start: open-a-realm
            val config = RealmConfiguration.Builder()
                .build()
            var realm: Realm
            realm = Realm.getInstance(config)
            Log.v(
                "EXAMPLE",
                "Successfully opened a realm: "
                        + realm.path
            )
            // :snippet-end:
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testAsyncWrite() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                Log.v(
                    "EXAMPLE",
                    "Successfully opened a realm: "
                                    + realm.path
                )
                // :snippet-start: write-async
                realm.executeTransactionAsync {
                        transactionRealm: Realm ->
                    val sample: Sample =
                        Sample()
                    sample.stringField = "Sven"
                    transactionRealm.copyToRealm(
                        sample
                    )
                }
                // :snippet-end:
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testSyncWrite() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                // :snippet-start: write-sync
                realm.executeTransaction {
                        transactionRealm: Realm ->
                    val sample: Sample =
                        Sample()
                    sample.stringField = "Sven"
                    transactionRealm.copyToRealm(
                        sample
                    )
                }
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testQuery() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                // :snippet-start: query-filters
                val samples =
                    realm.where(
                        Sample::class.java
                    ).findAll()
                val samplesThatBeginWithN =
                    realm.where(
                        Sample::class.java
                    )
                        .beginsWith(
                            "stringField",
                            "N"
                        ).findAll()
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testQuerySortLimitDistinct() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                // :snippet-start: query-sort-limit-distinct
                val aggregates =
                    realm.where(
                        Sample::class.java
                    )
                        .distinct("stringField")
                        .sort(
                            "stringField",
                            Sort.ASCENDING
                        )
                        .limit(2)
                        .findAll()
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testDeletes() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                realm.executeTransaction {
                        transactionRealm: Realm ->
                    val sample: Sample =
                        Sample()
                    sample.stringField = "Sven"
                    transactionRealm.copyToRealm(
                        sample
                    )
                    sample.stringField = "not sven"
                    transactionRealm.copyToRealm(
                        sample
                    )
                }
                // :snippet-start: deletes
                val sample =
                    realm.where(
                        Sample::class.java
                    ).findFirst()

                // delete one object synchronously
                realm.executeTransaction {
                        transactionRealm: Realm? ->
                    sample!!.deleteFromRealm()
                }

                // delete a query result asynchronously
                realm.executeTransactionAsync {
                        backgroundRealm: Realm ->
                    backgroundRealm.where(
                        Sample::class.java
                    ).findFirst()!!.deleteFromRealm()
                }
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testNotifications() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                realm = Realm.getInstance(config)
                realm.executeTransaction { realm ->
                    val sample =
                        Sample()
                    sample.stringField = "Sven"
                    realm.copyToRealm(sample)
                    sample.stringField = "not sven"
                    realm.copyToRealm(sample)
                }
                // :snippet-start: notifications
                realm.where(Sample::class.java)
                    .findAllAsync()
                    .addChangeListener {
                            samples: RealmResults<Sample>?,
                            changeSet: OrderedCollectionChangeSet ->
                        // log change description
                        Log.v(
                            "EXAMPLE",
                            ("Results changed. " +
                                "change ranges: " +
                                Arrays.toString(
                                    changeSet
                                        .changeRanges
                                ) +
                                ", insertion ranges: " +
                                Arrays.toString(
                                    changeSet
                                        .insertionRanges
                                ) +
                                ", deletion ranges: " +
                                Arrays.toString(
                                    changeSet
                                        .deletionRanges
                                ))
                        )
                    }
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testThreading() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .name(getRandom())
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            var realm: Realm
            try {
                // :snippet-start: threading
                realm = Realm.getInstance(config)
                // :remove-start:
                realm.executeTransaction { realm ->
                    val sample =
                        Sample()
                    sample.stringField = "Sven"
                    realm.copyToRealm(sample)
                    sample.stringField = "not sven"
                    realm.copyToRealm(sample)
                }
                // :remove-end:
                val sample =
                    realm.where(
                        Sample::class.java
                    ).findFirst()
                // save sample field in a
                // separate variable
                // for access on another thread
                val sampleStringField =
                    sample!!.stringField
                val executorService =
                    Executors.newFixedThreadPool(4)
                executorService.execute {
                    // cannot pass a realm
                    // into another thread,
                    // so get a new instance
                    // for separate thread
                    val threadRealm =
                        Realm.getInstance(config)
                    // cannot access original
                    // sample on another
                    // thread, use
                    // sampleStringField instead
                    val threadSample =
                        threadRealm.where(
                            Sample::class.java
                        )
                            .equalTo(
                                "stringField",
                                sampleStringField
                            ).findFirst()
                    Log.v(
                        "EXAMPLE",
                        "Separate thread sample: " +
                                threadSample
                    )
                }
                // :snippet-end:
                Log.v(
                    "EXAMPLE", (
                            "Successfully opened a realm: "
                                    + realm.path)
                )
            } catch (ex: RealmFileException) {
                Log.v(
                    "EXAMPLE",
                    "Error opening the realm."
                )
                Log.v(
                    "EXAMPLE",
                    ex.toString()
                )
            }
            realm = Realm.getInstance(config)
            realm.close()
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testMigration() {
        val expectation = Expectation()
        activity!!.runOnUiThread {

            // :snippet-start: migrations
            val config =
                RealmConfiguration.Builder()
                .name(getRandom()) // :remove:
                .migration { realm: DynamicRealm,
                             oldVersion: Long,
                             newVersion: Long ->
                    val schema: RealmSchema =
                        realm.schema
                    if (oldVersion == 0L) {
                        // perform schema migration
                        schema.get("Sample")
                            ?.addField(
                                "new_field",
                                String::class.java
                            )
                    }

                    // migrate data
                    schema.get("Sample")
                        ?.transform {
                                obj: DynamicRealmObject ->
                            obj.set(
                                "longField",
                                42L
                            )
                        }
                }.build()
            val realm: Realm =
                Realm.getInstance(config)
            Log.v(
                "EXAMPLE",
                "Successfully opened a realm: "
                        + realm.path
            )
            // :snippet-end:
            expectation.fulfill()
        }
        expectation.await()
    }
}