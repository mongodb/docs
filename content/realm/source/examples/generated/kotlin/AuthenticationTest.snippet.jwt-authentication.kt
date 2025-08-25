val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    // Registration is handled by the JWT provider
    val jwtCredentials = Credentials.jwt(jwtToken)
    val user = app.login(jwtCredentials)
}
