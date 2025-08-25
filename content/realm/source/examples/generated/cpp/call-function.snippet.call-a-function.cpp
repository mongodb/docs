// Connect to an App Services App and authenticate a user
auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);
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
