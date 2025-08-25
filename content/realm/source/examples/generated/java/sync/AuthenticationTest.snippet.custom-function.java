String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID).build());

Credentials customFunctionCredentials =
        Credentials.customFunction(new org.bson.Document("username", "bob"));

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(customFunctionCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using a custom function.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
