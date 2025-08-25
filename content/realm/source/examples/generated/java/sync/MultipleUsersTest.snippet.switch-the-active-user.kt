// Joe is already logged in and is the currently active user
val joe = app.currentUser()
// Log in as Emma
val emmaCredentials = Credentials.emailPassword(
    secondUserEmail,
    secondUserPassword
)
app.loginAsync(emmaCredentials) { result ->
    if (result.isSuccess) {
        // The active user is now Emma
        val emma = result.get()
        assert(emma === app.currentUser())
        // Switch active user back to Joe
        app.switchUser(joe)
        assert(joe === app.currentUser())
    } else {
        Log.e("EXAMPLE", "Failed to log in: ${result.error.errorMessage}")
    }
}
