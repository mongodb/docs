// Instantiate your App Services App
val app = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    // Log in the user with the credentials associated
    // with the authentication provider
    // If successful, returns an authenticated `User` object
    val user = app.login(credentials)

    // ... work with the user ...
}
