// token and tokenId are query parameters in the confirmation
// link sent in the confirmation email.
app.emailPassword.confirmUserAsync(token, tokenId) {
    if (it.isSuccess) {
        Log.i("EXAMPLE", "Successfully confirmed new user.")
    } else {
        Log.e("EXAMPLE", "Failed to register user: ${it.error}")
    }
}
