package com.mongodb.realm.examples.java;

import android.util.Log;

import androidx.test.core.app.ActivityScenario;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.RuntimeExecutionException;
import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.Document;
import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class AuthenticationTest extends RealmTest {

    @Test
    public void testOfflineLogin() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: offline
            // Log the user into the backend app.
            // The first time you login, the user must have a network connection.
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            // Check for an existing user.
            // If the user is offline but credentials are
            // cached, this returns the existing user.
            AtomicReference<User> user = new AtomicReference<User>();
            user.set(app.currentUser());
            if (user.get() == null) {
                // If the device has no cached user
                // credentials, log them in.
                Credentials anonymousCredentials = Credentials.anonymous();

                app.loginAsync(anonymousCredentials, it -> {
                    // :remove-start:
                    Assert.assertEquals(true, it.isSuccess());
                    // :remove-end:
                    if (it.isSuccess()) {
                        Log.v("AUTH", "Successfully authenticated anonymously.");
                        user.set(app.currentUser());
                    } else {
                        Log.e("AUTH", it.getError().toString());
                    }
                });
            }
            // :remove-start:
            expectation.fulfill();
            // :remove-end:
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testAnonymous() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: anonymous
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(anonymousCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(true, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated anonymously.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testEmailPassword() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: email-password
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials emailPasswordCredentials = Credentials.emailPassword("<email>", "<password>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(emailPasswordCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an email and password.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testAPIKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: api-key
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials apiKeyCredentials = Credentials.apiKey("<key>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(apiKeyCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using an API Key.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testCustomFunction() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: custom-function
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials customFunctionCredentials =
                    Credentials.customFunction(new org.bson.Document("username", "bob"));

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customFunctionCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom function.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testCustomJWT() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: custom-jwt
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch JWT from custom provider
            Credentials customJWTCredentials = Credentials.jwt("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(customJWTCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using a custom JWT.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testFacebookOAuth() {
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID;
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());
            String YOUR_FACEBOOK_SDK_APP_ID = "960466841104579";
            // :snippet-start: facebook
            FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID);
            FacebookSdk.sdkInitialize(activity);
            CallbackManager callbackManager = CallbackManager.Factory.create();
            LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<LoginResult>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        // Signed in successfully, forward credentials to MongoDB Realm.
                        AccessToken accessToken = loginResult.getAccessToken();
                        Credentials facebookCredentials = Credentials.facebook(accessToken.getToken());
                        app.loginAsync(facebookCredentials, it -> {
                            if (it.isSuccess()) {
                                Log.v("AUTH", "Successfully logged in to MongoDB Realm using Facebook OAuth.");
                            } else {
                                Log.e("AUTH", "Failed to log in to MongoDB Realm", it.getError());
                            }
                        });
                    }
                    
                    @Override
                    public void onCancel() {
                        Log.v("AUTH", "Facebook authentication cancelled.");
                    }
                    
                    @Override
                    public void onError(FacebookException exception) {
                        Log.e("AUTH", "Failed to authenticate using Facebook: " + exception.getMessage());
                    }
                }
            );
            LoginManager.getInstance().logIn(activity, null);
            // :snippet-end:
        });
    }

    @Test
    public void testGoogleOAuth() {
        Expectation expectation = new Expectation();

        // TODO: WARNING! THIS TEST REQUIRES INTERACTION. UNCOMMENT THIS NEXT LINE TO RUN LOCALLY.
        // Log.v("EXAMPLE", ActivityScenario.launch(AuthActivity.class).getResult().toString());
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                            .build());

            Log.v("EXAMPLE", app.currentUser().toString());
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testSignInWithApple() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // :snippet-start: apple
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            // fetch apple token using Apple SDK

            Credentials appleCredentials = Credentials.apple("<token>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(appleCredentials, it -> {
                // :remove-start:
                Assert.assertEquals(false, it.isSuccess());
                // :remove-end:
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.");
                    user.set(app.currentUser());
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                // :remove-start:
                expectation.fulfill();
                // :remove-end:
            });
            // :snippet-end:
        });
        expectation.await();
    }

    @Test
    public void testLogOut() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            AtomicReference<User> user = new AtomicReference<User>();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("AUTH", "Successfully authenticated anonymously.");
                    user.set(app.currentUser());
                    // :snippet-start: log-out
                    user.get().logOutAsync( result -> {
                        // :remove-start:
                        Assert.assertEquals(true, result.isSuccess());
                        // :remove-end:
                        if (result.isSuccess()) {
                            Log.v("AUTH", "Successfully logged out.");
                        } else {
                            Log.e("AUTH", result.getError().toString());
                        }
                        // :remove-start:
                        expectation.fulfill();
                        // :remove-end:
                    });
                    // :snippet-end:
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
            });

        });
        expectation.await();
    }
    // :snippet-start: get-valid-access-token
    // Gets a valid user access token to authenticate requests
    public String getValidAccessToken(User user) {
        // An already logged in user's access token might be stale. To
        // guarantee that the token is valid, refresh it if necessary.
        user.refreshCustomData();
        return user.getAccessToken();
    }
    // :snippet-end:
    @Test
    public void testGetUserAccessToken(){

        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials emailPasswordCredentials = Credentials.emailPassword("<email>", "<password>");

            AtomicReference<User> user = new AtomicReference<User>();
            app.loginAsync(emailPasswordCredentials, it -> {
                if (it.isSuccess()) {
                    String accessToken = getValidAccessToken(app.currentUser());
                    Assert.assertTrue(accessToken instanceof String);
                } else {
                    Log.e("AUTH", it.getError().toString());
                }
                expectation.fulfill();
            });
        });
        expectation.await();
    }
}
