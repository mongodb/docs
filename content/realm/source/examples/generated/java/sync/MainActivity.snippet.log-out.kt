app.currentUser()?.logOutAsync() {
    if (it.isSuccess) {
        Log.v("QUICKSTART", "Successfully logged out.")
    } else {
        Log.e("QUICKSTART", "Failed to log out, error: ${it.error}")
    }
}
