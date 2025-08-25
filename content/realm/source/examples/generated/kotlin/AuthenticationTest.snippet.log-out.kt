val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
runBlocking {
    val user = app.login(credentials)

    // ... work with logged-in user ...

    // Ensure all local updates are uploaded
    // before logging out
    user.logOut()
}
