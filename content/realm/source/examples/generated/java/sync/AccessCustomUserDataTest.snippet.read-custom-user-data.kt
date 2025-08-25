val anonymousCredentials: Credentials = Credentials.anonymous()
app.loginAsync(anonymousCredentials) {
    if (it.isSuccess) {
        Log.v("EXAMPLE", "Successfully authenticated anonymously.")
        val user = app.currentUser()
        val customUserData : Document? = user?.customData
        Log.v("EXAMPLE", "Fetched custom user data: $customUserData")
    } else {
        Log.e("EXAMPLE", it.error.toString())
    }
}
