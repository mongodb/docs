val app = App.create(YOUR_APP_ID) // Replace with your App ID
runBlocking {
    // Log in as Joe
    val joeCredentials = Credentials.emailPassword(joeEmail, joePassword)
    try {
        val joe = app.login(joeCredentials)
        // The active user is now Joe
        val user = app.currentUser
        Log.v("Successfully logged in. User state: ${joe.state}. Current user is now: ${user?.id}")
        assertEquals(joe, user)
    } catch (e: Exception) {
        Log.e("Failed to log in: ${e.message}")
    }

    // Log in as Emma
    val emmaCredentials = Credentials.emailPassword(emmaEmail, emmaPassword)
    try {
        val emma = app.login(emmaCredentials)
        // The active user is now Emma
        val user = app.currentUser
        Log.v("Successfully logged in. User state: ${emma.state}. Current user is now: ${user?.id}")
        assertEquals(emma, user)
    } catch (e: Exception) {
        Log.e("Failed to log in: ${e.message}")
    }
}
