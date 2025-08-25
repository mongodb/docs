private void signInWithGoogle() {
    GoogleSignInOptions gso = new GoogleSignInOptions
            .Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken("YOUR WEB APPLICATION CLIENT ID FOR GOOGLE AUTH")
            .build();
    GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(this, gso);
    Intent signInIntent = googleSignInClient.getSignInIntent();

    ActivityResultLauncher<Intent> resultLauncher =
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
