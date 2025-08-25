try {
    joe.logOut()
    Log.v("Successfully logged out user. User state: ${joe.state}. Current user is now: ${app.currentUser?.id}")
} catch (e: Exception) {
    Log.e("Failed to log out: ${e.message}")
}
val joeIsAUser = app.allUsers().containsKey(joe.id)
assertTrue(joeIsAUser)
