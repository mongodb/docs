val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    val emailPasswordCredentials = Credentials.emailPassword(email, password)
    val user = app.login(emailPasswordCredentials)
}
