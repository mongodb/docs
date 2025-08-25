auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);
auto user = app.login(realm::App::credentials::anonymous()).get();
auto dbConfig = user.flexible_sync_configuration();
auto syncRealm = realm::db(dbConfig);
// Add subscription
auto subscriptionUpdateSuccess =
    syncRealm.subscriptions()
        .update([](realm::mutable_sync_subscription_set &subs) {
          // Get Items from Atlas that match this query.
          // Uses the queryable field `complexity`.
          // Sync Item objects with complexity less than or equal to 4.
          subs.add<realm::Item>(
              "simple items", [](auto &obj) { return obj.complexity <= 4; });
        })
        .get();
