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
