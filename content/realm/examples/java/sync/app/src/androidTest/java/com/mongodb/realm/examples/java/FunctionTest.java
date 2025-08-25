package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.functions.Functions;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class FunctionTest extends RealmTest {
    @Test
    public void testCallAFunction() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: call-a-function
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    User user = app.currentUser();
                    assert user != null;
                    Functions functionsManager = app.getFunctions(user);
                    List<Integer> args = Arrays.asList(1, 2);
                    functionsManager.callFunctionAsync("sum", args, Integer.class, result -> {
                        if (result.isSuccess()) {
                            // :remove-start:
                            Assert.assertTrue(it.isSuccess());
                            // :remove-end:
                            Log.v("EXAMPLE", "Sum value: " + result.get());
                        } else {
                            Log.e("EXAMPLE", "failed to call sum function with: " + result.getError());
                        }
                        // :remove-start:
                        expectation.fulfill();
                        // :remove-end:
                    });
                } else {
                    Log.e("EXAMPLE", "Error logging into the Realm app. Make sure that anonymous authentication is enabled. Error: " + it.getError());
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }
}
