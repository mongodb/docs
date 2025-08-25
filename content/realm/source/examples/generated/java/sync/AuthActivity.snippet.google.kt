fun loginWithGoogle() {
    val gso = GoogleSignInOptions
        .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
        .build()
    val googleSignInClient = GoogleSignIn.getClient(this, gso)
    val signInIntent: Intent = googleSignInClient.signInIntent

    val resultLauncher: ActivityResultLauncher<Intent> =
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
