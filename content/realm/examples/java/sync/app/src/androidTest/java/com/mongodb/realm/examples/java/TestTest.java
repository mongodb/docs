// :snippet-start: test-integration-testing
package com.mongodb.realm.examples.java;

import android.app.Activity;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.test.core.app.ActivityScenario;

import com.mongodb.realm.examples.BasicActivity;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class TestTest {
    @Test
    public void testTesting() {
        // :snippet-start: initialize-realm-with-context
        AtomicReference<Activity> testActivity = new AtomicReference<Activity>();
        ActivityScenario<BasicActivity> scenario = ActivityScenario.launch(BasicActivity.class);

        // create a latch to force blocking for an async call to initialize realm
        CountDownLatch setupLatch = new CountDownLatch(1);

        scenario.onActivity(activity -> {
            Realm.init(activity);
            testActivity.set(activity);
            setupLatch.countDown(); // unblock the latch await
        });

        // block until we have an activity to run tests on
        try {
            Assert.assertTrue(setupLatch.await(1, TimeUnit.SECONDS));
        } catch (InterruptedException e) {
            Log.e("EXAMPLE", e.getMessage());
        }
        // :snippet-end:

        // :snippet-start: wait-for-async
        CountDownLatch testLatch = new CountDownLatch(1);

        // :snippet-start: test-logic-looper
        testActivity.get().runOnUiThread(() -> {
            // instantiate an app connection
            String appID = YOUR_APP_ID; // replace this with your test application App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // authenticate a user
            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // open a synced realm
                    SyncConfiguration config = new SyncConfiguration.Builder(
                            app.currentUser(),
                            getRandomPartition()) // replace this with a valid partition
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();
                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(@NonNull Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm.");
                            // read and write to realm here via transactions
                            testLatch.countDown();
                            realm.executeTransaction(new Realm.Transaction() {
                                @Override
                                public void execute(@NonNull Realm realm) {
                                    realm.createObjectFromJson(Frog.class,
                                            "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\", _id: 0 }");
                                }
                            });
                            realm.close();
                        }
                        @Override
                        public void onError(@NonNull Throwable exception) {
                            Log.e("EXAMPLE", "Failed to open the realm: " + exception.getLocalizedMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        // :snippet-end:

        // block until the async calls in the test succeed or error out
        try {
            Assert.assertTrue(testLatch.await(5, TimeUnit.SECONDS));
        } catch (InterruptedException e) {
            Log.e("EXAMPLE", e.getMessage());
        }
        // :snippet-end:
    }
}
// :snippet-end: