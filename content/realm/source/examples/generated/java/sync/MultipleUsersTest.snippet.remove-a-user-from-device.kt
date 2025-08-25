app.loginAsync(credentials) {
    if (it.isSuccess) {
        val user = it.get()
        user.removeAsync { result: App.Result<User?> ->
            if (result.isSuccess) {
                Log.v("EXAMPLE",
                    "Successfully removed user from device.")
            } else {
                Log.e("EXAMPLE", "Failed to remove user from device.")
            }
        }
    } else {
        Log.e("EXAMPLE", "Failed to log in: ${it.error.errorMessage}")
    }
}
