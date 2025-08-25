// token and tokenId are query parameters in the confirmation
// link sent in the password reset email.
app.getEmailPassword().resetPasswordAsync(token, tokenId, newPassword, it -> {
    if (it.isSuccess()) {
        Log.i("EXAMPLE", "Successfully updated password for user.");
    } else {
        Log.e("EXAMPLE", "Failed to reset user's password: " + it.getError().getErrorMessage());
    }
});
