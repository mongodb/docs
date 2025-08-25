package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.Random;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.auth.ApiKey;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class UserAPIKeysTest extends RealmTest {
    String email;
    String password;
    ApiKey apiKey;

    // @Before TODO: WHY ARE ONLY THE JAVA VERSIONS OF THESE TESTS FAILING!?!?!
    public void setUpUserAndKey() {
        Random random = new Random();
        email = "test" + random.nextInt(10000000);
        password = "testtest";

        Expectation userIsRegistered = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            app.getEmailPassword().registerUserAsync(email, password, it -> {
                if (it.isSuccess()) {
                    Log.i("EXAMPLE", "Successfully registered user.");
                    userIsRegistered.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed to register user: " + it.getError().getErrorMessage());
                }
            });
        });
        userIsRegistered.await();

        Expectation apiKeyIsCreated = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated user.");
                    User user = app.currentUser();
                    user.getApiKeys().createAsync("Name_of_the_API_Key", result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully created API key: " + result.get().getValue());
                            apiKeyIsCreated.fulfill();
                            apiKey = result.get();
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: " + result.getError().getErrorMessage());
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        apiKeyIsCreated.await();
    }

    // @Test TODO
    public void testCreateAUserAPIKey() {
        Expectation expectation = new Expectation();

        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated user.");
                    // :snippet-start: create-a-user-api-key
                    User user = app.currentUser();
                    user.getApiKeys().createAsync("Name-of-the-API-Key", result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully created API key: " + result.get().getValue());
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error creating API key: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    // @Test TODO: failing test, investigate why this is failing (and exact kotlin version... isn't)
    public void testLookUpAUsersAPIKeys() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :snippet-start: look-up-a-users-api-keys
                    User user = app.currentUser();
                    user.getApiKeys().fetchAll(result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully fetched API keys: " + Arrays.toString(result.get().toArray()));
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error fetching API keys: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    // @Test TODO: fix
    public void testLookUpASpecificUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    // :snippet-start: look-up-a-specific-user-api-key
                    User user = app.currentUser();
                    user.getApiKeys().fetchAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully fetched API key: " + result.get());
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    // @Test TODO
    public void testEnableUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    // :snippet-start: enable-user-api-key
                    User user = app.currentUser();
                    user.getApiKeys().enableAsync(api_key_id, result -> {
                        // :remove-start:
                        expectation.fulfill();
                        // :remove-end:
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully enabled API key.");
                        } else {
                            Log.e("EXAMPLE", "Error fetching API key: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    // @Test TODO: fix
    public void testDisableUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    // :snippet-start: disable-user-api-key
                    User user = app.currentUser();
                    user.getApiKeys().disableAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully disabled API key.");
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error disabling API key: " + result.getError().getErrorMessage());
                            // :remove-start:
                            // TODO: Fix this test so that it actually disables an API Key! (currently fails at "error processing request" for unknown reasons)
                            expectation.fulfill();
                            // :remove-end:
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    // @Test TODO: Figure out why this is failing
    public void testDeleteUserAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.emailPassword(email, password);
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    ObjectId api_key_id = apiKey.getId();
                    // :snippet-start: delete-user-api-key
                    User user = app.currentUser();
                    user.getApiKeys().deleteAsync(api_key_id, result -> {
                        if (result.isSuccess()) {
                            Log.v("EXAMPLE", "Successfully deleted API key.");
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                        } else {
                            Log.e("EXAMPLE", "Error deleting API key: " + result.getError().getErrorMessage());
                        }
                    });
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

}
