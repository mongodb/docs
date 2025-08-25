assertEquals(emma, app.currentUser)
try {
    emma.remove()
    Log.v("Successfully removed user. User state: ${emma.state}. Current user is now: ${app.currentUser?.id}")
} catch (e: Exception) {
    Log.e("Failed to remove user: ${e.message}")
}
val emmaIsAUser = app.allUsers().containsKey(emma.id)
assertFalse(emmaIsAUser)
