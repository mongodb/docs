val app = App.create(YOUR_APP_ID) // Replace with your App ID
runBlocking {
    // Log user in
    val user = app.login(credentials)

    // Work with logged-in user ...

    // Remove the user from the device
    // If the user is logged in, they are logged out first
    // DOES NOT delete user from the App Services App
    user.remove()
}
