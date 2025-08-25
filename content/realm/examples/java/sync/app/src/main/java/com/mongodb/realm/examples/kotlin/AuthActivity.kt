package com.mongodb.realm.examples.kotlin;

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.auth.GoogleAuthType


class AuthActivity : AppCompatActivity() {
    lateinit var app: App

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        val appID = YOUR_APP_ID
        app = App(
            AppConfiguration.Builder(appID)
                .build()
        )
        loginWithGoogle()
    }

    // :snippet-start: google
    fun loginWithGoogle() {
        val gso = GoogleSignInOptions
            .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            // :remove-start:
            .requestIdToken("95080929124-rsqtfko567k2stoh0k7cm84t3tgl3270.apps.googleusercontent.com")
            // :remove-end: :uncomment-start:
            // .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
            // :uncomment-end:
            .build()
        val googleSignInClient = GoogleSignIn.getClient(this, gso)
        val signInIntent: Intent = googleSignInClient.signInIntent

        val resultLauncher: ActivityResultLauncher<Intent> =
            // Note: this activity MUST inherit from ComponentActivity or AppCompatActivity to use this API
            registerForActivityResult(ActivityResultContracts.StartActivityForResult())
            { result ->
                val task: Task<GoogleSignInAccount> =
                    GoogleSignIn.getSignedInAccountFromIntent(result.data)
                handleSignInResult(task)
            }
        resultLauncher.launch(signInIntent)
    }

    fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            if (completedTask.isSuccessful) {
                val account: GoogleSignInAccount? = completedTask.getResult(ApiException::class.java)
                val token: String = account?.idToken!!
                val googleCredentials: Credentials =
                    Credentials.google(token, GoogleAuthType.ID_TOKEN)
                app.loginAsync(googleCredentials) {
                    if (it.isSuccess) {
                        Log.v(
                            "AUTH",
                            "Successfully logged in to MongoDB Realm using Google OAuth."
                        )
                    } else {
                        Log.e("AUTH",
                            "Failed to log in to MongoDB Realm", it.error)
                    }
                }
            } else {
                Log.e("AUTH", "Google Auth failed: ${completedTask.exception}")
            }

        } catch (e: ApiException) {
            Log.e("AUTH", "Failed to authenticate using Google OAuth: " + e.message);
        }
    }
    // :snippet-end:
}
