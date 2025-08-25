package com.mongodb.realm.examples.java;

import android.util.Log;
import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.HauntedHouse;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import io.realm.OrderedRealmCollectionSnapshot;
import io.realm.RealmResults;
import io.realm.Realm;
import io.realm.RealmConfiguration;

public class WritesTest extends RealmTest {
    @Test
    public void testCreateObjectFromJSON() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .name("create-object-from-json")
                    .build();
            Realm realm = Realm.getInstance(config);
            try {
                // :snippet-start: create-an-object-json
                // Insert from a string
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        realm.createObjectFromJson(Frog.class,
                                "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\" }");
                    }
                });

                // Insert multiple items using an InputStream
                realm.executeTransaction(new Realm.Transaction() {
                    @Override
                    public void execute(Realm realm) {
                        try {
                            InputStream inputStream = new FileInputStream(
                                    new File("path_to_file"));
                            realm.createAllFromJson(Frog.class, inputStream);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                });
                // :snippet-end:
            } catch (Exception e) { // this should throw when "path_to_file" doesn't resolve to a real file
                expectation.fulfill();
            }
            realm.close();
        });
        expectation.await();
    }
                              
    @Test
    public void testIterate() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("writes-test-iterate")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .build();
            Realm realm = Realm.getInstance(config);
            // :snippet-start: iterate
            RealmResults<Frog> frogs = realm.where(Frog.class)
                    .equalTo("species", "bullfrog")
                    .findAll();

            // Use an iterator to rename the species of all bullfrogs
            realm.executeTransaction(r -> {
                for (Frog frog : frogs) {
                    frog.setSpecies("Lithobates catesbeiana");
                }
            });

            // Use a snapshot to rename the species of all bullfrogs
            realm.executeTransaction(r -> {
                OrderedRealmCollectionSnapshot<Frog> frogsSnapshot = frogs.createSnapshot();
                for (int i = 0; i < frogsSnapshot.size(); i++) {
                    frogsSnapshot.get(i).setSpecies("Lithobates catesbeiana");
                }
            });

            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testCounter() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("writes-test-counter")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .inMemory()
                    .build();
            Realm realm = Realm.getInstance(config);
            realm.executeTransaction(r -> realm.createObject(HauntedHouse.class));
            // :snippet-start: counter-increment-decrement
            HauntedHouse house = realm.where(HauntedHouse.class)
                    .findFirst();
            realm.executeTransaction(r -> {
                Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 0
                house.getGhosts().increment(1);
                Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 1
                house.getGhosts().increment(5);
                Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 6
                house.getGhosts().decrement(2);
                Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 4
            });
            // :snippet-end:

            // :snippet-start: counter-set
            realm.executeTransaction(r -> {
                house.getGhosts().set(42);
            });
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
