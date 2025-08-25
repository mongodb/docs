String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

// fetch JWT from custom provider
Credentials customJWTCredentials = Credentials.jwt("<token>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(customJWTCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using a custom JWT.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
