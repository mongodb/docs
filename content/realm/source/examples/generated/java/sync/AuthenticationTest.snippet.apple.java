String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

// fetch apple token using Apple SDK

Credentials appleCredentials = Credentials.apple("<token>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(appleCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using Sign-in with Apple.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
