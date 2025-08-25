#include <catch2/catch_test_macros.hpp>
#include <future>
// :snippet-start: include-header
#include <cpprealm/sdk.hpp>
// :snippet-end:

// :replace-start: {
//   "terms": {
//     "Local_": "",
//     "Sync_": ""
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

namespace realm {
struct Local_Todo {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  std::string status;
};
REALM_SCHEMA(Local_Todo, _id, name, status);
}  // namespace realm

// :snippet-start: model
namespace realm {
struct Sync_Todo {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string name;
  std::string status;
  // The ownerId property stores the user.identifier() of a
  // logged-in user. Omit this property for the non-sync example.
  std::string ownerId;
};
REALM_SCHEMA(Sync_Todo, _id, name, status, ownerId);
}  // namespace realm
// :snippet-end:

TEST_CASE("non-sync quick start", "[realm][write]") {
  auto relative_realm_path_directory = "quick-start/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("project_and_item_objects");
  path = path.replace_extension("realm");
  // :snippet-start: realm-open
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = realm::db(std::move(config));
  // :snippet-end:

  // :snippet-start: create-todo
  auto todo = realm::Local_Todo{.name = "Create my first todo item",
                                .status = "In Progress"};

  realm.write([&] { realm.add(std::move(todo)); });
  // :snippet-end:

  // :snippet-start: get-all-todos
  auto todos = realm.objects<realm::Local_Todo>();
  // :snippet-end:

  CHECK(todos.size() == 1);

  // :snippet-start: filter
  auto todosInProgress = todos.where(
      [](auto const& todo) { return todo.status == "In Progress"; });
  // :snippet-end:
  CHECK(todosInProgress.size() == 1);

  auto specificTodo = todos[0];
  // :snippet-start: watch-for-changes
  auto token = specificTodo.observe([&](auto&& change) {
    try {
      if (change.error) {
        rethrow_exception(change.error);
      }
      if (change.is_deleted) {
        std::cout << "The object was deleted.\n";
      } else {
        for (auto& propertyChange : change.property_changes) {
          std::cout << "The object's " << propertyChange.name
                    << " property has changed.\n";
          CHECK(propertyChange.name == "status");  // :remove:
        }
      }
    } catch (std::exception const& e) {
      std::cerr << "Error: " << e.what() << "\n";
    }
  });
  // :snippet-end:

  // :snippet-start: modify-write-block
  auto todoToUpdate = todosInProgress[0];
  realm.write([&] { todoToUpdate.status = "Complete"; });
  // :snippet-end:
  CHECK(todoToUpdate.status == "Complete");

  // :snippet-start: delete
  realm.write([&] { realm.remove(specificTodo); });
  // :snippet-end:
  token.unregister();
}

// This test seems to be flaky. Sometimes I am getting an EXC BAD ACCESS
// thread-related error with exit code 9 after all the tests pass.
// After skipping and then un-skipping this test with #if 0/#endif, I can't
// seem to replicate the issue. May require debugging in the future.
TEST_CASE("sync quick start", "[realm][write][sync][sync-logger]") {
  // :snippet-start: connect-to-backend
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  // :snippet-end:
  // :snippet-start: set-sync-log-level
  auto logLevel = realm::logger::level::info;
  app.get_sync_manager().set_log_level(logLevel);
  // :snippet-end:
  // :snippet-start: authenticate-user
  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-end:
  // :snippet-start: open-synced-realm
  auto syncConfig = user.flexible_sync_configuration();
  auto realm = realm::db(syncConfig);
  // :remove-start:
  realm.get_sync_session()->wait_for_download_completion().get();
  realm.refresh();
  // Remove any existing subscriptions before adding the one for this example
  auto clearInitialSubscriptions =
      realm.subscriptions().update([](auto& subs) { subs.clear(); }).get();
  CHECK(clearInitialSubscriptions == true);
  CHECK(realm.subscriptions().size() == 0);
  // :remove-end:
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
  // :snippet-end:
  CHECK(updateSubscriptionSuccess == true);
  // :snippet-start: write-to-synced-realm
  auto todo = realm::Sync_Todo{.name = "Create a Sync todo item",
                               .status = "In Progress",
                               .ownerId = userId};

  realm.write([&] { realm.add(std::move(todo)); });

  auto todos = realm.objects<realm::Sync_Todo>();
  // :snippet-end:
  CHECK(todos.size() == 1);
  auto specificTodo = todos[0];
  realm.write([&] { realm.remove(specificTodo); });
  realm.get_sync_session()->wait_for_upload_completion().get();
}

// :replace-end:
