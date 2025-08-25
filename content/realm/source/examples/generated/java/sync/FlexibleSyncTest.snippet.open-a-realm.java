// instantiate a Realm App connection
String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .build());
// authenticate a user
Credentials credentials = Credentials.anonymous();
app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = it.get();
        // add an initial subscription to the sync configuration
        SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
                .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
                    @Override
                    public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                        subscriptions.add(Subscription.create("subscriptionName",
                                realm.where(Frog.class)
                                    .equalTo("species", "spring peeper")));
                    }
                })
                .build();

        // instantiate a realm instance with the flexible sync configuration
        Realm.getInstanceAsync(config, new Realm.Callback() {
            @Override
            public void onSuccess(Realm realm) {
                Log.v("EXAMPLE", "Successfully opened a realm.");
            }
        });
    } else {
        Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
    }
});
