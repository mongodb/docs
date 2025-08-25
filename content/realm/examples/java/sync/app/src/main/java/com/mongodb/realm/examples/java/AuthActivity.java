package com.mongodb.realm.examples.java;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.auth.GoogleAuthType;

import static com.mongodb.realm.examples.CustomApplicationKt.YOUR_APP_ID;

public class AuthActivity extends AppCompatActivity {
    App app;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String appID = YOUR_APP_ID; // replace this with your App ID
        app = new App(new AppConfiguration.Builder(appID)
                .build());
        signInWithGoogle();
    }

    // :snippet-start: google
    private void signInWithGoogle() {
        GoogleSignInOptions gso = new GoogleSignInOptions
                .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                // :remove-start:
                .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
                // :remove-end: :uncomment-start:
                // .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
                // :uncomment-end:
                .build();
        GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(this, gso);
        Intent signInIntent = googleSignInClient.getSignInIntent();

        ActivityResultLauncher<Intent> resultLauncher =
                // Note: this activity MUST inherit from ComponentActivity or AppCompatActivity to use this API
                registerForActivityResult(
                        new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        Task<GoogleSignInAccount> task =
                                GoogleSignIn.getSignedInAccountFromIntent(result.getData());
                        handleSignInResult(task);
                    }
                });

        resultLauncher.launch(signInIntent);
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            if (completedTask.isSuccessful()) {
                GoogleSignInAccount account = completedTask.getResult(ApiException.class);
                String token = account.getIdToken();
                Credentials googleCredentials =
                        Credentials.google(token, GoogleAuthType.ID_TOKEN);
                app.loginAsync(googleCredentials, it -> {
                    if (it.isSuccess()) {
                        Log.v("AUTH",
                                "Successfully logged in to MongoDB Realm using Google OAuth.");
                    } else {
                        Log.e("AUTH",
                                "Failed to log in to MongoDB Realm: ", it.getError());
                    }
                });
            } else {
                Log.e("AUTH", "Google Auth failed: "
                        + completedTask.getException().toString());
            }
        } catch (ApiException e) {
            Log.w("AUTH", "Failed to log in with Google OAuth: " + e.getMessage());
        }
    }
    // :snippet-end:
}
