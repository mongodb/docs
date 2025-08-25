#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <future>
#include <string>

static const std::string APP_ID = "cpp-tester-uliix";

TEST_CASE("call a function", "[realm][sync]") {
  // :snippet-start: call-a-function
  // Connect to an App Services App and authenticate a user
  // :snippet-start: connect-app-services
  auto appConfig = realm::App::configuration();
  appConfig.app_id = APP_ID;
  auto app = realm::App(appConfig);
  // :snippet-end:
  auto user = app.login(realm::App::credentials::anonymous()).get();
  auto sync_config = user.flexible_sync_configuration();

  // If the function takes arguments, pass them as a string array.
  // Any quotes within the array must be escaped.
  auto argArray = "[\"john.smith\", \"@companyemail.com\"]";

  // Call an App Services function as the logged-in user
  auto result = user.call_function("concatenate", argArray).get();

  // Verify that the result has a value
  CHECK(result);
  auto functionResult = result.value();

  // Prints "Calling the concatenate function returned
  // "john.smith@companyemail.com"."
  std::cout << "Calling the concatenate function returned " << functionResult
            << ".\n";
  // :snippet-end:
  REQUIRE(functionResult == "\"john.smith@companyemail.com\"");
}
