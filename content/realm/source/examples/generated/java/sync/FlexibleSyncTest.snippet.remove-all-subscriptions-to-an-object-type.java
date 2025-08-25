realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
    @Override
    public void update(MutableSubscriptionSet subscriptions) {
        subscriptions.removeAll(Frog.class);
    }
});
