Credentials anonymousCredentials = Credentials.anonymous();
app.loginAsync(anonymousCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("EXAMPLE", "Successfully authenticated anonymously.");
        User user = app.currentUser();
        Document customUserData = user.getCustomData();
        Log.v("EXAMPLE", "Fetched custom user data: " + customUserData);
    } else {
        Log.e("EXAMPLE", it.getError().toString());
    }
});
