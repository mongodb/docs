package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Before;
import org.junit.Test;

import java.util.Random;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class LinkUserIdentitiesTest extends RealmTest {

    String firstUserEmail;
    String secondUserEmail;
    String firstUserPassword;
    String secondUserPassword;

    @Before
    public void setUpUserAndKey() {
        Random random = new Random();
        firstUserEmail = "firstUser" + random.nextInt(100000);
        firstUserPassword = "testtest";
        secondUserEmail = "secondUser" + random.nextInt(100000);
        secondUserPassword = "testtest";

        Expectation firstUserIsRegistered = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            app.getEmailPassword().registerUserAsync(firstUserEmail, firstUserPassword, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully registered user.");
                    firstUserIsRegistered.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
                }
            });
        });
        firstUserIsRegistered.await();

        Expectation secondUserIsRegistered = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            app.getEmailPassword().registerUserAsync(secondUserEmail, secondUserPassword, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully registered user.");
                    secondUserIsRegistered.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
                }
            });
        });
        secondUserIsRegistered.await();
    }

    //@Test
    public void linkUsers() {
        //Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            try {
                String appID = YOUR_APP_ID; // replace this with your App ID
                App app = new App(new AppConfiguration.Builder(appID).build());
                Credentials joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword);
                app.loginAsync(joeCredentials, it -> {
                    if (it.isSuccess()) {
                        // The active user is now Joe
                        User user = it.get();
                        String email = secondUserEmail;
                        String password = secondUserPassword;

                        // link joe to another existing user
                        // :snippet-start: link-users
                        // The user has previously created an email/password account
                        user.linkCredentialsAsync(
                            Credentials.emailPassword(email, password), result -> {
                            // :remove-start:
                            //expectation.fulfill();
                            // :remove-end:
                            if (result.isSuccess()) {
                                Log.v("EXAMPLE", "Successfully linked existing user " + 
                                   "identity with email/password user: " + result.get());
                            } else {
                                Log.e("EXAMPLE", "Failed to link user identities with: " + 
                                   result.getError());
                            }
                        });
                        // :snippet-end:
                    } else {
                        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                    }
                });
            } catch (Exception e) {
                Log.e("EXAMPLE", "Failed with exception: " + e.getMessage());
            }
        });
        // expectation.await();  // TODO: Figure out why this only works *sometimes*
    }
}
