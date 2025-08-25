package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.DefinitelyNotJavaTask;
import com.mongodb.realm.examples.model.java.Cat;
import com.mongodb.realm.examples.model.java.Human;

import org.junit.Assert;
import org.junit.Test;

import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class RealmQueryTest extends RealmTest {
    @Test
    public void testFindObjectByPrimaryKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: find-object-by-primary-key
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    Log.v(
                            "EXAMPLE",
                            "Successfully opened a realm with reads and writes allowed on the UI thread."
                    );

                    // :remove-start:
                    AtomicReference<String> PRIMARY_KEY_VALUE  = new AtomicReference<String>();
                    realm.executeTransaction( transactionRealm -> {
                        DefinitelyNotJavaTask newTask = new DefinitelyNotJavaTask("test task" + new Random().nextLong());
                        transactionRealm.insert(newTask);
                        PRIMARY_KEY_VALUE.set(newTask.getName());
                    });
                    // :remove-end:

                    realm.executeTransaction( transactionRealm -> {
                        DefinitelyNotJavaTask task = transactionRealm.where(DefinitelyNotJavaTask.class).equalTo("name", PRIMARY_KEY_VALUE.get()).findFirst();
                        Log.v("EXAMPLE", "Fetched object by primary key: " + task);
                        // :remove-start:
                        Assert.assertEquals(task.getName(), PRIMARY_KEY_VALUE.get());
                        // :remove-end:
                    });
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    realm.close();
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testQueryARelationship() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: query-a-relationship
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    Log.v(
                            "EXAMPLE",
                            "Successfully opened a realm with reads and writes allowed on the UI thread."
                    );

                    // :remove-start:
                    realm.executeTransaction(transactionRealm -> {
                        Cat newCat = new Cat("bucky");
                        Human newHuman = new Human("steven");
                        newHuman.setCat(newCat);
                        transactionRealm.insert(newHuman);
                    });
                    // :remove-end:

                    realm.executeTransaction(transactionRealm -> {
                        Human owner = transactionRealm.where(Human.class).equalTo("cat.name", "bucky").findFirst();
                        Cat cat = owner.getCat();
                        Log.v("EXAMPLE", "Queried for humans with cats named 'bucky'. Found " + owner.getName() + ", who owns " + cat.getName());
                        // :remove-start:
                        Assert.assertEquals(owner.getName(), "steven");
                        Assert.assertEquals(cat.getName(), "bucky");
                        // :remove-end:
                    });
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    realm.close();
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testQueryAnInverseRelationship() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: query-an-inverse-relationship
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(Realm realm) {
                    Log.v("EXAMPLE", "Successfully opened a realm.");

                    // :remove-start:
                    realm.executeTransaction(transactionRealm -> {
                        Cat newCat = new Cat("bucky");
                        Human newHuman = new Human("steven");
                        newHuman.setCat(newCat);
                        transactionRealm.insert(newHuman);
                    });
                    // :remove-end:

                    realm.executeTransaction(transactionRealm -> {
                        Cat cat = transactionRealm.where(Cat.class).equalTo("owner.name", "steven").findFirst();
                        Human owner = cat.getOwner().first();
                        Log.v("EXAMPLE", "Queried for cats with owners named 'steven'. Found " + cat.getName() + ", owned by " + owner.getName());
                        // :remove-start:
                        Assert.assertEquals(cat.getName(), "bucky");
                        Assert.assertEquals(owner.getName(), "steven");
                        // :remove-end:
                    });
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                    realm.close();
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }
}

