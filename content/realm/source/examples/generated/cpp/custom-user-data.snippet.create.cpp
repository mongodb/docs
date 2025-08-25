auto user = app.login(realm::App::credentials::anonymous()).get();

// Functions take a string argument. Any quotes within the array must be
// escaped.
auto customData =
    "[{\"userId\":\"" + user.identifier() + "\",\"favoriteColor\":\"gold\"}]";

// Call an Atlas Function to insert custom data for the user
auto result = user.call_function("updateCustomUserData", customData).get();
