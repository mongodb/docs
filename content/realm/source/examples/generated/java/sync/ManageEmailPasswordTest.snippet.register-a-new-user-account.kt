app.emailPassword.registerUserAsync(email, password) {
    if (it.isSuccess) {
        Log.i("EXAMPLE","Successfully registered user.")
    } else {
        Log.e("EXAMPLE","Failed to register user: ${it.error}")
    }
}
