updateSubscriptionSuccess =
    syncedRealm.subscriptions()
        .update([](realm::mutable_sync_subscription_set &subs) {
          subs.update_subscription<realm::Dog>(
              "puppies", [](auto &obj) { return obj.age < 2; });
        })
        .get();
REQUIRE(updateSubscriptionSuccess == true);
