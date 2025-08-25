String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

Credentials anonymousCredentials = Credentials.anonymous();

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(anonymousCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated anonymously.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
