app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = it.get();
        user.removeAsync(result -> {
            if (result.isSuccess()) {
                Log.v("EXAMPLE", "Successfully removed user from device.");
            } else {
                Log.e("EXAMPLE", "Failed to remove user from device.");
            }
        });
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});
