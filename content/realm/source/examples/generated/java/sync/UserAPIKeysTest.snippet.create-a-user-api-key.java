User user = app.currentUser();
user.getApiKeys().createAsync("Name-of-the-API-Key", result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Successfully created API key: " + result.get().getValue());
    } else {
        Log.e("EXAMPLE", "Error creating API key: " + result.getError().getErrorMessage());
    }
});
