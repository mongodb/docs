String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID).build());

Credentials credentials = Credentials.anonymous();
app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = app.currentUser();
        assert user != null;
        Functions functionsManager = app.getFunctions(user);
        List<Integer> args = Arrays.asList(1, 2);
        functionsManager.callFunctionAsync("sum", args, Integer.class, result -> {
            if (result.isSuccess()) {
                Log.v("EXAMPLE", "Sum value: " + result.get());
            } else {
                Log.e("EXAMPLE", "failed to call sum function with: " + result.getError());
            }
        });
    } else {
        Log.e("EXAMPLE", "Error logging into the Realm app. Make sure that anonymous authentication is enabled. Error: " + it.getError());
    }
});
