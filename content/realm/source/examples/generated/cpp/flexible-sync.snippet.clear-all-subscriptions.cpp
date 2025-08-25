// You can use .clear() inside a mutable_sync_subscription_set to clear all
// sync_subscription objects from the set
auto updateSubscriptionSuccess =
    syncedRealm.subscriptions()
        .update(
            [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
        .get();
CHECK(updateSubscriptionSuccess == true);
CHECK(syncedRealm.subscriptions().size() == 0);
