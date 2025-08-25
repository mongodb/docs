String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

Credentials apiKeyCredentials = Credentials.apiKey("<key>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(apiKeyCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using an API Key.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
