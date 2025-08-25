val app: App = App.create(YOUR_APP_ID)
runBlocking {
    // Log user in
    val user = app.login(credentials)

    // Work with logged-in user ...

    // Delete the logged-in user from the device
    // and the Atlas App Services App
    user.delete()
}
