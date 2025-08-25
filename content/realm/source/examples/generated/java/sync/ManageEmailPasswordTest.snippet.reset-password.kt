// token and tokenId are query parameters in the confirmation
// link sent in the password reset email.
app.emailPassword.resetPasswordAsync(token, tokenId, newPassword) {
    if (it.isSuccess) {
        Log.i("EXAMPLE", "Successfully updated password for user.")
    } else {
        Log.e("EXAMPLE", "Failed to reset user's password: $it.error")
    }
}
