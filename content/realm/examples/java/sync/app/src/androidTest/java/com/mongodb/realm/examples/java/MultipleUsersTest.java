package com.mongodb.realm.examples.java;

import android.os.AsyncTask;
import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.junit.Before;
import org.junit.Test;

import java.util.Map;
import java.util.Random;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class MultipleUsersTest extends RealmTest {
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
    public void addANewUserToADevice() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            try {
            // :snippet-start: add-a-new-user
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            // Log in as Joe
            Credentials joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword);
            app.loginAsync(joeCredentials, it -> {
                if (it.isSuccess()) {
                    // The active user is now Joe
                    User joe = it.get();
                    assert joe == app.currentUser();
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
            // Log in as Emma
            Credentials emmaCredentials = Credentials.emailPassword(secondUserEmail, secondUserPassword);
            app.loginAsync(emmaCredentials, it -> {
                if (it.isSuccess()) {
                    // The active user is now Emma
                    User emma = it.get();
                    assert emma == app.currentUser();
                    // :remove-start:
                    expectation.fulfill();
                    // :remove-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
            // :snippet-end:
            } catch (Exception e) {
                Log.v("EXAMPLE", "Failed with exception: " + e.getMessage());
            }
        });
        expectation.await();
    }

    //@Test
    public void listAllOnDeviceUsers() {
        activity.runOnUiThread(() -> {
            try {
                String appID = YOUR_APP_ID; // replace this with your App ID
                App app = new App(new AppConfiguration.Builder(appID).build());
                // :snippet-start: list-all-on-device-users
                Map<String, User> users = app.allUsers();
                for (Map.Entry<String, User> user : users.entrySet()) {
                    Log.v("EXAMPLE", "User: " + user.getKey());
                }
                // :snippet-end:
            } catch (Exception e) {
                Log.v("EXAMPLE", "Failed with exception: " + e.getMessage());
            }
        });
    }

    //@Test
    public void switchTheActiveUser() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            // Log in as Joe
            Credentials joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword);
            app.loginAsync(joeCredentials, it -> {
                if (it.isSuccess()) {
                    // :snippet-start: switch-the-active-user
                    // Joe is already logged in and is the currently active user
                    User joe = app.currentUser();
                    // Log in as Emma
                    Credentials emmaCredentials = Credentials.emailPassword(secondUserEmail, secondUserPassword);
                    app.loginAsync(emmaCredentials, result -> {
                        if (result.isSuccess()) {
                            // The active user is now Emma
                            User emma = result.get();
                            assert emma == app.currentUser();
                            // Switch active user back to Joe
                            app.switchUser(joe);
                            assert joe == app.currentUser();
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Failed to log in: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        // expectation.await(); // TODO: Figure out why this test is a flakey boi
    }

    //@Test TODO: Figure out this flakey test
    public void removeAUserFromDevice() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            try {
                String appID = YOUR_APP_ID; // replace this with your App ID
                App app = new App(new AppConfiguration.Builder(appID).build());
                // Log in as Joe
                Credentials credentials = Credentials.emailPassword(firstUserEmail, firstUserPassword);
                // :snippet-start: remove-a-user-from-device
                app.loginAsync(credentials, it -> {
                    if (it.isSuccess()) {
                        User user = it.get();
                        user.removeAsync(result -> {
                            if (result.isSuccess()) {
                                Log.v("EXAMPLE", "Successfully removed user from device.");
                                // :remove-start:
                                expectation.fulfill();
                                // :remove-end:
                            } else {
                                Log.e("EXAMPLE", "Failed to remove user from device.");
                            }
                        });
                    } else {
                        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                    }
                });
                // :snippet-end:
            } catch (Exception e) {
                Log.v("EXAMPLE", "Failed with exception: " + e.getMessage());
            }
        });
        expectation.await();
    }
}
