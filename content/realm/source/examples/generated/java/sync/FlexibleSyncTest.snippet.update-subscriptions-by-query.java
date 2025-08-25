realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
    @Override
    public void update(MutableSubscriptionSet subscriptions) {
        // to update an unnamed subscription, remove it from the
        // subscription set, then add your new query to the set
        Subscription mySubscription = subscriptions.find(realm.where(Frog.class)
                .equalTo("species",
                        "cane toad"));
        subscriptions.remove(mySubscription);

        subscriptions.addOrUpdate(
                Subscription.create(
                        realm.where(Frog.class)
                                .equalTo("species",
                                        "albino cane toad")));
    }
});
