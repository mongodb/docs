auto syncConfig = user.flexible_sync_configuration();
auto realm = realm::db(syncConfig);
// For this example, get the userId for the Flexible Sync query
auto userId = user.identifier();
auto subscriptions = realm.subscriptions();
auto updateSubscriptionSuccess =
    subscriptions
        .update([&](realm::mutable_sync_subscription_set& subs) {
          subs.add<realm::Todo>("todos", [&userId](auto& obj) {
            // For this example, get only Todo items where the ownerId
            // property value is equal to the userId of the logged-in user.
            return obj.ownerId == userId;
          });
        })
        .get();
