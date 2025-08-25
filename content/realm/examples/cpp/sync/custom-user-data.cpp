#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <future>
#include <nlohmann/json.hpp>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("custom user data", "[realm][sync]") {
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);

  // :snippet-start: create
  auto user = app.login(realm::App::credentials::anonymous()).get();

  // Functions take a string argument. Any quotes within the array must be
  // escaped.
  auto customData =
      "[{\"userId\":\"" + user.identifier() + "\",\"favoriteColor\":\"gold\"}]";

  // Call an Atlas Function to insert custom data for the user
  auto result = user.call_function("updateCustomUserData", customData).get();
  // :snippet-end:
  CHECK(result);

  // :snippet-start: read
  // Custom user data could be stale, so refresh it before reading it
  user.refresh_custom_user_data().get();
  auto userData = user.custom_data().value();

  /* Parse the string custom data to use it more easily in your code.
     In this example, we're using the nlohmann/json library, but use whatever
     works with your application's constraints. */
  auto userDataObject = nlohmann::json::parse(userData);
  CHECK(userDataObject["favoriteColor"] == "gold");
  //  :snippet-end:

  // :snippet-start: update
  // Functions take a string argument. Any quotes within the array must be
  // escaped.
  auto updatedData = "[{\"userId\":\"" + user.identifier() +
                     "\",\"favoriteColor\":\"black\"}]";

  // Call an Atlas Function to update custom data for the user
  auto updateResult =
      user.call_function("updateCustomUserData", updatedData).get();

  // Refresh the custom user data before reading it to verify it succeeded
  user.refresh_custom_user_data().get();
  auto updatedUserData = user.custom_data().value();

  /* Parse the string custom data to use it more easily in your code.
     In this example, we're using the nlohmann/json library, but use whatever
     works with your application's constraints. */
  auto updatedUserDataObject = nlohmann::json::parse(updatedUserData);
  CHECK(updatedUserDataObject["favoriteColor"] == "black");
  // :snippet-end:
  // :snippet-start: delete
  auto deleteResult = user.call_function("deleteCustomUserData", "[]").get();
  // :snippet-end:
  CHECK(deleteResult);
}
