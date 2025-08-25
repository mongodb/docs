package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Item
import io.realm.Realm
import io.realm.RealmChangeListener
import io.realm.RealmConfiguration
import io.realm.RealmResults
import io.realm.kotlin.createObject
import io.realm.kotlin.executeTransactionAwait
import io.realm.kotlin.toFlow
import io.realm.kotlin.where
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import org.junit.Test

class AsyncTest : RealmTest() {
    @Test
    fun testRealmCallback() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()

            // :snippet-start: realm-callback
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance.")
                }

                fun onError(e: java.lang.Exception) {
                    Log.e("EXAMPLE", "Failed to get realm instance: $e")
                }
            })
            // :snippet-end:
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testRealmAsyncTask() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance")

                    // :snippet-start: realm-async-task
                    // using class instances for transaction, success, error
                    realm.executeTransactionAsync(Realm.Transaction { transactionRealm ->
                            val item: Item = transactionRealm.createObject<Item>()
                    }, Realm.Transaction.OnSuccess {
                            Log.v("EXAMPLE", "Successfully completed the transaction")
                    }, Realm.Transaction.OnError { error ->
                            Log.e("EXAMPLE", "Failed the transaction: $error")
                    })

                    // transaction logic, success notification, error handler all via lambdas
                    realm.executeTransactionAsync(
                        { transactionRealm ->
                            val item = transactionRealm.createObject<Item>()
                        },
                        { Log.v("EXAMPLE", "Successfully completed the transaction") },
                        { error ->
                            Log.e("EXAMPLE", "Failed the transaction: $error")
                        })
                    // :snippet-end:
                }

                fun onError(e: java.lang.Exception) {
                    Log.e("EXAMPLE", "Failed to get realm instance: $e")
                }
            })
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testRealmResults() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()

            // open a realm asynchronously
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance")

                    // :snippet-start: realm-results
                    val items = realm.where<Item>().findAllAsync()
                    // length of items is zero when initially returned
                    items.addChangeListener(RealmChangeListener {
                        Log.v("EXAMPLE", "Completed the query.")
                        // items results now contains all matched objects (more than zero)
                    })
                    // :snippet-end:
                }

                fun onError(e: java.lang.Exception) {
                    Log.e("EXAMPLE", "Failed to get realm instance: $e")
                }
            })
            expectation.fulfill()
        }
        expectation.await()
    }

    @Test
    fun testKotlinExtensions() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()

            // :snippet-start: coroutines
            // open a realm asynchronously
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance")

                    CoroutineScope(Dispatchers.Main).launch {
                        // asynchronous transaction
                        realm.executeTransactionAwait(Dispatchers.IO) { transactionRealm: Realm ->
                            if (isActive) {
                                val item = transactionRealm.createObject<Item>()
                            }
                        }
                    }
                    // asynchronous query
                    val items: Flow<RealmResults<Item>> = realm.where<Item>().findAllAsync().toFlow()
                }

                fun onError(e: Exception) {
                    Log.e("EXAMPLE", "Failed to get realm instance: $e")
                }
            })
            // :snippet-end:
            expectation.fulfill()
        }
        expectation.await()
    }
}