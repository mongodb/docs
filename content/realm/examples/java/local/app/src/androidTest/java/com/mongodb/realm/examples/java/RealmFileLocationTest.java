package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class RealmFileLocationTest extends RealmTest {
    @Test
    public void testGetRealmFileLocation() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            // :snippet-start: get-realm-file-location
            Realm realm = Realm.getInstance(config);
            Log.v("EXAMPLE", "Realm file path: " + realm.getPath());
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
