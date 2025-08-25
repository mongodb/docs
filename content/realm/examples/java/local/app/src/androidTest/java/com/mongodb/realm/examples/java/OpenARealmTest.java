package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.exceptions.RealmFileException;

public class OpenARealmTest extends RealmTest {
    @Test
    public void testOpenAndCloseARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: open-a-realm-local
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            
            Realm realm;
            try {
                realm = Realm.getInstance(config);
                Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
            } catch (RealmFileException ex) {
                Log.v("EXAMPLE", "Error opening the realm.");
                Log.v("EXAMPLE", ex.toString());
            }
            // :snippet-end:
            realm = Realm.getInstance(config);
            // :snippet-start: close-a-realm-local
            realm.close();
            // :snippet-end:
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void configureARealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: configure-a-realm-local
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("alternate-realm")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .compactOnLaunch()
                    .build();

            Realm realm = Realm.getInstance(config);
            Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }


    @Test
    public void setAndUseDefaultRealm() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: set-default-realm
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("default-realm")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .compactOnLaunch()
                    .inMemory()
                    .build();
            // set this config as the default realm
            Realm.setDefaultConfiguration(config); // :emphasize:
            // :snippet-end:

            // :snippet-start: use-default-realm
            Realm realm = Realm.getDefaultInstance();
            Log.v("EXAMPLE","Successfully opened the default realm at: " + realm.getPath());
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
