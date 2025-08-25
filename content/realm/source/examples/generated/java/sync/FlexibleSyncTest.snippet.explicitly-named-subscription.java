SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
        .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
            @Override
            public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                // add a subscription with a name
                subscriptions.add(Subscription.create("frogSubscription",
                        realm.where(Frog.class)
                            .equalTo("species", "spring peeper")));
            }
        })
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");
        // later, you can look up this subscription by name
        Subscription subscription = realm.getSubscriptions().find("frogSubscription");
    }
});
