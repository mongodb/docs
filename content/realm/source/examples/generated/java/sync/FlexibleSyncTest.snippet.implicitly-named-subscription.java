SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser())
        .initialSubscriptions(new SyncConfiguration.InitialFlexibleSyncSubscriptions() {
            @Override
            public void configure(Realm realm, MutableSubscriptionSet subscriptions) {
                // add a subscription without assigning a name
                subscriptions.add(Subscription.create(
                        realm.where(Frog.class)
                                .equalTo("species", "spring peeper")));
            }
        })
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.");
        // later, you can look up this subscription by query
        Subscription subscription = realm.getSubscriptions().find(realm.where(Frog.class)
                .equalTo("species", "spring peeper"));
    }
});
