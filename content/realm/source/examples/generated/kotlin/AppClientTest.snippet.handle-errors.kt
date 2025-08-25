val app = App.create(YOUR_APP_ID)
runCatching {
    app.login(Credentials.emailPassword(email, password))
}.onSuccess {
    Log.v("Successfully logged in")
    // transition to another activity, load a fragment, to display logged-in user information here
}.onFailure { ex: Throwable ->
    when (ex) {
        is InvalidCredentialsException -> {
            Log.v("Failed to login due to invalid credentials: ${ex.message}")
            Toast.makeText(baseContext,
                "Invalid username or password. Please try again.", Toast.LENGTH_LONG).show()
        }
        is ConnectionException -> {
            Log.e("Failed to login due to a connection error: ${ex.message}")
            Toast.makeText(baseContext,
                "Login failed due to a connection error. Check your network connection and try again.", Toast.LENGTH_LONG).show()
        }
        else -> {
            Log.e("Failed to login: ${ex.message}")
            // generic error message for niche and unknown fail cases
            Toast.makeText(baseContext,
                "Login failed. Please try again.", Toast.LENGTH_LONG).show()
        }
    }
}
