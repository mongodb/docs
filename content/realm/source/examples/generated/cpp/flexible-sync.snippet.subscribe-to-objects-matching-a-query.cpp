updateSubscriptionSuccess =
    syncedRealm.subscriptions()
        .update([](realm::mutable_sync_subscription_set &subs) {
          subs.add<realm::Dog>(
              "puppies", [](auto &obj) { return obj.age < 3; });
        })
        .get();
REQUIRE(updateSubscriptionSuccess == true);
CHECK(syncedRealm.subscriptions().size() == 1);
