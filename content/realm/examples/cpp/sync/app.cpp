// :replace-start: {
//   "terms": {
//     "FlexibleSync_": ""
//   }
// }
#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("test custom headers compile", "[realm][sync]") {
  // :snippet-start: set-custom-headers-for-app
  std::map<std::string, std::string> customHttpHeaders;
  customHttpHeaders.emplace("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE");

  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  appConfig.custom_http_headers = customHttpHeaders;
  auto app = realm::App(appConfig);
  // :snippet-end:

  app.get_sync_manager().set_log_level(realm::logger::level::warn);

  auto user = app.login(realm::App::credentials::anonymous()).get();
  // :snippet-start: set-custom-headers-for-sync-config
  std::map<std::string, std::string> customHeaders;
  customHeaders.emplace("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE");

  auto syncConfig = user.flexible_sync_configuration();
  syncConfig.set_custom_http_headers(customHeaders);
  // :snippet-end:
  REQUIRE(user.is_logged_in());
  user.log_out().get();
  REQUIRE(user.access_token().empty());
}

TEST_CASE("test proxy config compiles", "[realm][sync]") {
  // :snippet-start: set-proxy-config
  auto proxyConfig = realm::proxy_config();
  proxyConfig.port = 8080;
  proxyConfig.address = "127.0.0.1";
  proxyConfig.username_password = {"username", "password"};

  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  appConfig.proxy_configuration = proxyConfig;
  // :remove-start:
  // Skipping the rest of this test because of the complexity
  // involved in setting up a proxy we can use in the CI.
  // It's not a good use of docs time to test this properly.
  // But maintaining this example in the test suite does give us
  // compiler checking for code correctness.
  SKIP();
  // :remove-end:
  auto app = realm::App(appConfig);

  auto user = app.get_current_user();
  auto syncConfig = user->flexible_sync_configuration();
  syncConfig.set_proxy_config(proxyConfig);
  auto syncedRealm = realm::db(syncConfig);
  // :snippet-end:
}

namespace realm {
struct FlexibleSync_Dog {
  realm::primary_key<object_id> _id{object_id::generate()};
  std::string name;
  int64_t age;
};
REALM_SCHEMA(FlexibleSync_Dog, _id, name, age)
}  // namespace realm

TEST_CASE("test metadata encryption", "[realm][sync]") {
  // :snippet-start: encrypt-metadata
  // Check if we already have a key stored in the platform's secure storage.
  // If we don't, generate a new one.
  // Use your preferred method to generate a key. This example key is
  // NOT representative of a secure encryption key. It only exists to
  // illustrate the form your key might take.
  std::array<char, 64> exampleKey = {
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
      0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0,
      0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0};

  // Create and populate an App configuration.
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  // Specify the metadata key.
  appConfig.metadata_encryption_key = exampleKey;

  // Use the configuration when you open the app.
  auto app = realm::App(appConfig);
  // :snippet-end:

  // The code from here down isn't relevant to the example - just confirming
  // we can open and write to a realm whose metadata is encrypted.
  app.get_sync_manager().set_log_level(realm::logger::level::warn);

  auto user = app.login(realm::App::credentials::anonymous()).get();
  REQUIRE(user.is_logged_in());

  auto syncConfig = user.flexible_sync_configuration();

  auto syncedRealm = realm::db(syncConfig);

  syncedRealm.subscriptions()
      .update([](realm::mutable_sync_subscription_set &subs) {
        subs.add<realm::FlexibleSync_Dog>(
            "puppies", [](auto &obj) { return obj.age < 3; });
      })
      .get();

  auto objectId = realm::object_id::generate();
  auto maui = realm::FlexibleSync_Dog();
  maui._id = objectId;
  maui.name = "Maui";
  maui.age = 2;

  syncedRealm.write([&] { syncedRealm.add(std::move(maui)); });

  auto syncSession = syncedRealm.get_sync_session();
  syncSession->wait_for_upload_completion().get();

  auto dogs = syncedRealm.objects<realm::FlexibleSync_Dog>();
  REQUIRE(dogs.size() == 1);
  auto dogsNamedMaui = dogs.where([](auto &dog) { return dog.name == "Maui"; });
  auto persistedMaui = dogsNamedMaui[0];

  syncedRealm.write([&] { syncedRealm.remove(persistedMaui); });

  auto managedDogsAfterDelete = syncedRealm.objects<realm::FlexibleSync_Dog>();
  REQUIRE(managedDogsAfterDelete.size() == 0);

  syncSession->wait_for_upload_completion().get();

  user.log_out().get();
  REQUIRE(user.access_token().empty());
}
// :replace-end: