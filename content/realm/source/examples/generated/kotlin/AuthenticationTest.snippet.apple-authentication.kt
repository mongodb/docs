val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    // Registration is handled by Apple
    val appleCredentials = Credentials.apple(idToken)
    val user = app.login(appleCredentials)
}
