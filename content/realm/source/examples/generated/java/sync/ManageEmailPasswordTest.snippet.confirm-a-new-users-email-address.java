// token and tokenId are query parameters in the confirmation
// link sent in the confirmation email.
app.getEmailPassword().confirmUserAsync(token, tokenId, it -> {
    if (it.isSuccess()) {
        Log.i("EXAMPLE", "Successfully confirmed new user.");
    } else {
        Log.e("EXAMPLE", "Failed to confirm user: " + it.getError().getErrorMessage());
    }
});
