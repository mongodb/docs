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
