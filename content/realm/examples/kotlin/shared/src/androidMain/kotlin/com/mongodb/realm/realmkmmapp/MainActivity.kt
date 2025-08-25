package com.mongodb.realm.realmkmmapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.FacebookSdk
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.GoogleAuthType

class MainActivity : ComponentActivity() {
    val YOUR_APP_ID = "YOUR APP ID"
    val activity = MainActivity()
    // :snippet-start: google-authentication
    fun loginWithGoogle() {
        val gso = GoogleSignInOptions
            .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
            .build()
        val googleSignInClient = GoogleSignIn.getClient(activity, gso)
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
                val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
                runBlocking {
                    val user = app.login(Credentials.google(token, GoogleAuthType.ID_TOKEN))
                }
            } else {
                Log.e("AUTH", "Google Auth failed: ${completedTask.exception}")
            }
        } catch (e: ApiException) {
            Log.e("AUTH", "Failed to authenticate using Google OAuth: " + e.message);
        }
    }
    // :snippet-end:

    fun loginWithFacebook() {
        val YOUR_FACEBOOK_SDK_APP_ID = "YOUR FACEBOOK SDK APP ID"
        // :snippet-start: facebook-authentication
        val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
        FacebookSdk.setApplicationId(YOUR_FACEBOOK_SDK_APP_ID)
        FacebookSdk.sdkInitialize(activity)
        val callbackManager = CallbackManager.Factory.create()
        LoginManager.getInstance().registerCallback(
            callbackManager,
            object : FacebookCallback<LoginResult> {
                override fun onSuccess(loginResult: LoginResult) {
                    // Signed in successfully, forward credentials to MongoDB Realm.
                    val accessToken = loginResult.accessToken
                    runBlocking {
                        val user = app.login(Credentials.facebook(accessToken.token))
                    }
                }
                override fun onCancel() {
                    Log.v("AUTH", "Cancelled Facebook login")
                }
                override fun onError(exception: FacebookException) {
                    Log.e("AUTH", "Failed to authenticate with Facebook: ${exception.message}")
                }
            })
        // :snippet-end:
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}