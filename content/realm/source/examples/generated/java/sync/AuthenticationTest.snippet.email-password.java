String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());

Credentials emailPasswordCredentials = Credentials.emailPassword("<email>", "<password>");

AtomicReference<User> user = new AtomicReference<User>();
app.loginAsync(emailPasswordCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("AUTH", "Successfully authenticated using an email and password.");
        user.set(app.currentUser());
    } else {
        Log.e("AUTH", it.getError().toString());
    }
});
