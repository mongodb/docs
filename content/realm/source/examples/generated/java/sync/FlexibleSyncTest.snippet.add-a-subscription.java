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
