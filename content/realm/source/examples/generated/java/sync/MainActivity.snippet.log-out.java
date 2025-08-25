app.currentUser().logOutAsync(result -> {
    if (result.isSuccess()) {
        Log.v("QUICKSTART", "Successfully logged out.");
    } else {
        Log.e("QUICKSTART", "Failed to log out, error: " + result.getError());
    }
});
