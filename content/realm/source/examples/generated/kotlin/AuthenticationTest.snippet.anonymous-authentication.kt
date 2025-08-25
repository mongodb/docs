val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    val anonymousCredentials = Credentials.anonymous()
    val user = app.login(anonymousCredentials)
}
