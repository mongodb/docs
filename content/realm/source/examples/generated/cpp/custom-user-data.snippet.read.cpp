// Custom user data could be stale, so refresh it before reading it
user.refresh_custom_user_data().get();
auto userData = user.custom_data().value();

/* Parse the string custom data to use it more easily in your code.
   In this example, we're using the nlohmann/json library, but use whatever
   works with your application's constraints. */
auto userDataObject = nlohmann::json::parse(userData);
CHECK(userDataObject["favoriteColor"] == "gold");
