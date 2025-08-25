#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

// :replace-start: {
//   "terms": {
//     "Local_": "",
//     "Sync_": ""
//   }
// }

namespace realm {
struct Sync_Todo {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  std::string status;
  std::string ownerId;
};
REALM_SCHEMA(Sync_Todo, _id, name, status, ownerId);
}  // namespace realm

TEST_CASE("sync session", "[realm][write][sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto syncConfig = user.flexible_sync_configuration();
  auto realm = realm::db(syncConfig);
  // :snippet-start: sync-session
  auto syncSession = realm.get_sync_session();
  // :snippet-end:
  // :snippet-start: sync-state
  syncSession->state();
  // :snippet-end:
  // :snippet-start: wait-for-download
  syncSession->wait_for_download_completion().get();
  realm.refresh();
  // :snippet-end:
  // Remove any existing subscriptions before adding the one for this example
  auto clearInitialSubscriptions =
      realm.subscriptions().update([](auto& subs) { subs.clear(); }).get();
  CHECK(clearInitialSubscriptions == true);
  CHECK(realm.subscriptions().size() == 0);
  // For this example, get the userId for the Flexible Sync query
  auto userId = user.identifier();
  auto subscriptions = realm.subscriptions();
  auto updateSubscriptionSuccess =
      subscriptions
          .update([&](realm::mutable_sync_subscription_set& subs) {
            subs.add<realm::Sync_Todo>("todos", [&userId](auto& obj) {
              // For this example, get only Sync_Todo items where the ownerId
              // property value is equal to the userId of the logged-in user.
              return obj.ownerId == userId;
            });
          })
          .get();
  CHECK(updateSubscriptionSuccess == true);
  auto todo = realm::Sync_Todo{.name = "Create a Sync todo item",
                               .status = "In Progress",
                               .ownerId = userId};

  realm.write([&] { realm.add(std::move(todo)); });

  // :snippet-start: pause
  syncSession->pause();
  // :snippet-end:
  // :snippet-start: connection-state
  syncSession->connection_state();
  // :snippet-end:
  CHECK(syncSession->connection_state() ==
        realm::internal::bridge::sync_session::connection_state::disconnected);
  auto todos = realm.objects<realm::Sync_Todo>();
  CHECK(todos.size() == 1);
  auto specificTodo = todos[0];
  realm.write([&] { realm.remove(specificTodo); });
  // :snippet-start: resume
  syncSession->resume();
  // :snippet-end:
  // :snippet-start: observe-connection-change
  auto connectionToken = syncSession->observe_connection_change(
      [&](enum realm::sync_session::connection_state,
          enum realm::sync_session::connection_state new_state) {
        // Register a block to execute when connection state changes.
      });
  // :snippet-end:
  // :snippet-start: reconnect
  syncSession->reconnect();
  // :snippet-end:
  // :snippet-start: unregister-observation-token
  syncSession->unregister_connection_change_observer(connectionToken);
  // :snippet-end:
  // :snippet-start: wait-for-upload
  syncSession->wait_for_upload_completion().get();
  // :snippet-end:
}
// :replace-end:
