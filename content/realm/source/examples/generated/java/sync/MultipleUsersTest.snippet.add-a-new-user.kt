val appID: String = YOUR_APP_ID // replace this with your App ID
val app = App(AppConfiguration.Builder(appID).build())
// Log in as Joe
val joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword)
app.loginAsync(joeCredentials) {
    if (it.isSuccess) {
        // The active user is now Joe
        val joe = it.get()
        assert(joe === app.currentUser())
    } else {
        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
    }
}

// Log in as Emma
val emmaCredentials = Credentials.emailPassword(secondUserEmail, secondUserPassword)
app.loginAsync(emmaCredentials) {
    if (it.isSuccess) {
        // The active user is now Emma
        val emma = it.get()
        assert(emma === app.currentUser())
    } else {
        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
    }
}
