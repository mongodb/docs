#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

namespace realm {

struct FlexibleSync_Dog {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  int64_t age;
};
REALM_SCHEMA(FlexibleSync_Dog, _id, name, age)

}  // namespace realm

TEST_CASE("Recover unsynced changes example", "[write]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  // :snippet-start: before-after-blocks
  /* You can define blocks to call before and after the client reset occur
     if you need to execute specific logic, such as reporting or debugging. */
  auto beforeReset = [&](realm::db before) {
    /* A block called after a client reset error is detected, but before the
       client recovery process is executed. You could use this block for any
       custom logic, reporting, debugging etc. You have access to the database
       before the client reset occurs in this block. */
  };

  auto afterReset = [&](realm::db device, realm::db server) {
    /* A block called after the client recovery process has executed.
       This block could be used for custom recovery, reporting, debugging etc.
       You have access to the database that is currently on the device - the
       one that can no longer sync - and the new database that has been
       restored from the server. */
  };
  // :snippet-end:

  // :snippet-start: recover-unsynced-changes
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();

  // Set the client reset handler with your preferred client reset mode.
  syncConfig.set_client_reset_handler(
      realm::client_reset::recover_unsynced_changes(beforeReset, afterReset));

  auto syncedRealm = realm::db(syncConfig);
  // :snippet-end:

  // Not actually attempting to test a client reset here as the SDK handles
  // that. Just confirming we can write to the server with this config.
  auto updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update(
              [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
          .get();
  CHECK(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 0);

  updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.add<realm::FlexibleSync_Dog>(
                "puppies", [](auto &obj) { return obj.age < 3; });
          })
          .get();
  REQUIRE(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 1);

  auto syncSession = syncedRealm.get_sync_session();

  auto dog = realm::FlexibleSync_Dog{.name = "Maui", .age = 2};

  syncedRealm.write([&] { syncedRealm.add(std::move(dog)); });

  auto managedDogs = syncedRealm.objects<realm::FlexibleSync_Dog>();
  auto specificDog = managedDogs[0];
  REQUIRE(specificDog.name == "Maui");
  REQUIRE(specificDog.age == static_cast<long long>(2));
  REQUIRE(managedDogs.size() == 1);

  syncedRealm.write([&] { syncedRealm.remove(specificDog); });

  auto managedDogsAfterDelete = syncedRealm.objects<realm::FlexibleSync_Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
  syncSession->wait_for_upload_completion().get();
}

TEST_CASE("Discard unsynced changes example", "[write]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  auto beforeReset = [&](realm::db before) {
    // A block called after a client reset error is detected, but before the
  };

  auto afterReset = [&](realm::db device, realm::db server) {
    // A block called after the client recovery process has executed.
  };

  // :snippet-start: discard-unsynced-changes
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();

  // Set the client reset handler with your preferred client reset mode.
  syncConfig.set_client_reset_handler(
      realm::client_reset::discard_unsynced_changes(beforeReset, afterReset));

  auto syncedRealm = realm::db(syncConfig);
  // :snippet-end:

  // Not actually attempting to test a client reset here as the SDK handles
  // that. Just confirming we can write to the server with this config.
  auto updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update(
              [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
          .get();
  CHECK(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 0);

  updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.add<realm::FlexibleSync_Dog>(
                "puppies", [](auto &obj) { return obj.age < 3; });
          })
          .get();
  REQUIRE(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 1);

  auto syncSession = syncedRealm.get_sync_session();

  auto dog = realm::FlexibleSync_Dog{.name = "Maui", .age = 2};

  syncedRealm.write([&] { syncedRealm.add(std::move(dog)); });

  auto managedDogs = syncedRealm.objects<realm::FlexibleSync_Dog>();
  auto specificDog = managedDogs[0];
  REQUIRE(specificDog.name == "Maui");
  REQUIRE(specificDog.age == static_cast<long long>(2));
  REQUIRE(managedDogs.size() == 1);

  syncedRealm.write([&] { syncedRealm.remove(specificDog); });

  auto managedDogsAfterDelete = syncedRealm.objects<realm::FlexibleSync_Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
  syncSession->wait_for_upload_completion().get();
}

TEST_CASE("Manual example", "[write]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  // :snippet-start: manual-client-reset
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();

  // Set the client reset handler to manual client reset mode.
  syncConfig.set_client_reset_handler(realm::client_reset::manual());

  // Define a Sync error handler for handling the client reset.
  syncConfig.sync_config().set_error_handler(
      [&](realm::sync_session session, realm::sync_error error) {
        if (error.is_client_reset_requested()) {
          /* You might use this for reporting or to instruct the user to delete
             and re-install the app. */
        };
      });

  auto syncedRealm = realm::db(syncConfig);
  // :snippet-end:

  // Not actually attempting to test a client reset here as the SDK handles
  // that. Just confirming we can write to the server with this config.
  auto updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update(
              [](realm::mutable_sync_subscription_set &subs) { subs.clear(); })
          .get();
  CHECK(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 0);

  updateSubscriptionSuccess =
      syncedRealm.subscriptions()
          .update([](realm::mutable_sync_subscription_set &subs) {
            subs.add<realm::FlexibleSync_Dog>(
                "puppies", [](auto &obj) { return obj.age < 3; });
          })
          .get();
  REQUIRE(updateSubscriptionSuccess == true);
  CHECK(syncedRealm.subscriptions().size() == 1);

  auto syncSession = syncedRealm.get_sync_session();

  auto dog = realm::FlexibleSync_Dog{.name = "Maui", .age = 2};

  syncedRealm.write([&] { syncedRealm.add(std::move(dog)); });

  auto managedDogs = syncedRealm.objects<realm::FlexibleSync_Dog>();
  auto specificDog = managedDogs[0];
  REQUIRE(specificDog.name == "Maui");
  REQUIRE(specificDog.age == static_cast<long long>(2));
  REQUIRE(managedDogs.size() == 1);

  syncedRealm.write([&] { syncedRealm.remove(specificDog); });

  auto managedDogsAfterDelete = syncedRealm.objects<realm::FlexibleSync_Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);
  syncSession->wait_for_upload_completion().get();
}
