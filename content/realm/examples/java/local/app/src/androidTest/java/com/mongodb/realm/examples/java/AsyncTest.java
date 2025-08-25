package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Item;

import org.jetbrains.annotations.NotNull;
import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmChangeListener;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

public class AsyncTest extends RealmTest {
    @Test
    public void testRealmCallback() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            // :snippet-start: realm-callback
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(@NotNull Realm realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance.");
                }
                public void onError(Exception e) {
                    Log.e("EXAMPLE", "Failed to get realm instance: " + e);
                }
            });
            // :snippet-end:
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testRealmAsyncTask() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(@NotNull Realm realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance");

                    // :snippet-start: realm-async-task
                    // transaction logic, success notification, error handler all via lambdas
                    realm.executeTransactionAsync(transactionRealm -> {
                        Item item = transactionRealm.createObject(Item.class);
                    }, () -> {
                        Log.v("EXAMPLE", "Successfully completed the transaction");
                    }, error -> {
                        Log.e("EXAMPLE", "Failed the transaction: " + error);
                    });

                    // using class instances for transaction, success, error
                    realm.executeTransactionAsync(new Realm.Transaction() {
                        @Override
                        public void execute(Realm transactionRealm) {
                            Item item = transactionRealm.createObject(Item.class);
                        }
                    }, new Realm.Transaction.OnSuccess() {
                        @Override
                        public void onSuccess() {
                            Log.v("EXAMPLE", "Successfully completed the transaction");
                        }
                    }, new Realm.Transaction.OnError() {
                        @Override
                        public void onError(Throwable error) {
                            Log.e("EXAMPLE", "Failed the transaction: " + error);
                        }
                    });
                    // :snippet-end:
                }
                public void onError(Exception e) {
                    Log.e("EXAMPLE", "Failed to get realm instance: " + e);
                }
            });
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testRealmResults() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            // open a realm asynchronously
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(@NotNull Realm realm) {
                    Log.v("EXAMPLE", "Successfully fetched realm instance");

                    // :snippet-start: realm-results
                    RealmResults<Item> items = realm.where(Item.class).findAllAsync();
                    // length of items is zero when initially returned
                    items.addChangeListener(new RealmChangeListener<RealmResults<Item>>() {
                        @Override
                        public void onChange(RealmResults<Item> items) {
                            Log.v("EXAMPLE", "Completed the query.");
                            // items results now contains all matched objects (more than zero)
                        }
                    });
                    // :snippet-end:
                }
                public void onError(Exception e) {
                    Log.e("EXAMPLE", "Failed to get realm instance: " + e);
                }
            });
            expectation.fulfill();
        });
        expectation.await();
    }
}
