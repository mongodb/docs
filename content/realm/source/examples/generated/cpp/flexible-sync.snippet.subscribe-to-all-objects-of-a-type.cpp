auto updateSubscriptionSuccess =
    syncedRealm.subscriptions()
        .update([](realm::mutable_sync_subscription_set &subs) {
          subs.add<realm::Dog>("dogs");
        })
        .get();
// The .update() function returns a bool, which confirms whether or not the
// update succeeded
REQUIRE(updateSubscriptionSuccess == true);
// You can check the .size() of the subscription set, which tells you the
// number of sync_subscription objects in the set
CHECK(syncedRealm.subscriptions().size() == 1);
