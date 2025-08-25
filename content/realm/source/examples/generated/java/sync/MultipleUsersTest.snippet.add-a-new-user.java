String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID).build());
// Log in as Joe
Credentials joeCredentials = Credentials.emailPassword(firstUserEmail, firstUserPassword);
app.loginAsync(joeCredentials, it -> {
    if (it.isSuccess()) {
        // The active user is now Joe
        User joe = it.get();
        assert joe == app.currentUser();
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});
// Log in as Emma
Credentials emmaCredentials = Credentials.emailPassword(secondUserEmail, secondUserPassword);
app.loginAsync(emmaCredentials, it -> {
    if (it.isSuccess()) {
        // The active user is now Emma
        User emma = it.get();
        assert emma == app.currentUser();
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});
