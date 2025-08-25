val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    val user = app.login(Credentials.anonymous()) // logs in with an anonymous user
    // registers an email/password user
    app.emailPasswordAuth.registerUser(email, password)
    // links anonymous user with email/password credentials
    user.linkCredentials(Credentials.emailPassword(email, password))
}
