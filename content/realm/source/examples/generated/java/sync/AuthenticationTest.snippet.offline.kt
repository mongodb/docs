// Log the user into the backend app.
// The first time you login, the user must have a network connection.
val appID = YOUR_APP_ID // replace this with your App ID
val app = App(
    AppConfiguration.Builder(appID)
        .build()
)
// Check for an existing user.
// If the user is offline but credentials are
// cached, this returns the existing user.
val user =
    AtomicReference<User?>()
user.set(app.currentUser())
if (user.get() == null) {
    // If the device has no cached user
    // credentials, log them in.
    val anonymousCredentials =
        Credentials.anonymous()
    app.loginAsync(
        anonymousCredentials
    ) { it: App.Result<User?> ->
        if (it.isSuccess) {
            Log.v("AUTH", "Successfully authenticated anonymously.")
            user.set(app.currentUser())
        } else {
            Log.e("AUTH", it.error.toString())
        }
    }
}
